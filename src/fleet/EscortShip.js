import * as THREE from 'three';
import { ShipBase } from '../ship/ShipBase.js';
import { createPlayerShip, PLAYER_SHIP_BY_ID } from '../ship/ShipFactory.js';
import { EngineGlow } from '../fx/EngineGlow.js';
import { ShieldEffect } from '../fx/ShieldEffect.js';
import { clamp, damp } from '../core/math/noise.js';

/**
 * A deployed friendly attack craft — a hangar ship launched from a capital
 * and flown by an AI wingman (fromPlayer bolts, so kill credits flow to the
 * player). Hangar craft are expendable: losing one costs nothing from the
 * player's owned-ship collection.
 *
 * Each craft flies one of two ROLES, assigned by FleetSystem at launch:
 *  - 'guard'  — holds a slot in the protective shell around the flagship and
 *    intercepts anything that threatens it.
 *  - 'scout'  — sweeps a wide patrol orbit well away from the flagship,
 *    hunting for hostiles before they get close.
 * Both roles use LOCK-TILL-KILL targeting: a craft picks the nearest hostile
 * that the fewest wingmates are already on (spreading the wing one-per-enemy),
 * then stays on that one target until it is destroyed.
 */

const COMMAND_RANGE = 5000; // ordered (V) targets are pursued much further
const CHASE_LEASH = 5200; // drop a locked target only past this far from the player
const GUARD_SELF_RANGE = 800; // guards engage hostiles this close to themselves…
const GUARD_DEFEND_RANGE = 1200; // …or anything this close to the flagship
const SCOUT_HUNT_RANGE = 2800; // scouts hunt anything this close to their patrol
const FIRE_INTERVAL = 0.42;
const ESCORT_SPEED = 330; // keeps pace with the flagship
const BASE_ESCORT_DAMAGE = 8; // a light fighter's per-bolt damage (×catalog weapon)

export class EscortShip extends ShipBase {
  /**
   * @param {import('../core/Game.js').Game} game
   * @param {string} variantId catalog id of the deployed ship
   * @param {number} slot formation slot index
   */
  constructor(game, variantId, slot) {
    super(createPlayerShip(variantId));
    this.game = game;
    this.variantId = variantId;
    this.slot = slot;
    this.isEscort = true;
    this.recalling = false;
    /** Set true once the escort has settled into its bay slot during a recall. */
    this.docked = false;
    /** Filled in by FleetSystem on launch: wing size + which port it flew from. */
    this.wingSize = 1;
    this.launchPort = 'side'; // 'side' (flanks) | 'bottom' (belly) | 'lowerside'
    /** Role in the wing (set by FleetSystem): 'guard' screens the flagship,
     * 'scout' patrols far out. roleIndex/roleCount space same-role craft. */
    this.role = 'guard';
    this.roleIndex = slot;
    this.roleCount = 1;
    /** The hostile this craft is locked onto — kept until it DIES. */
    this.target = null;
    this._orbitAng = Math.random() * Math.PI * 2;
    this._orbitRate = 0.16 + Math.random() * 0.08; // rad/s — a scout lap ≈ 30 s
    this._claims = new Map(); // scratch: enemy → #wingmates already on it

    const v = PLAYER_SHIP_BY_ID[variantId] ?? PLAYER_SHIP_BY_ID.starter;
    this.hullMax = this.hull = Math.round(100 * v.hull);
    this.shieldMax = this.shield = Math.round(100 * v.shield);
    this.shieldRegenRate = 8;
    this.shieldRegenDelay = 4;
    // Gun scales with the hull's catalog `weapon` mult, so a deployed gunner
    // ship (frigate, 1.5x) out-hits a light fighter.
    this.fireDamage = BASE_ESCORT_DAMAGE * (v.weapon ?? 1);

    this.glow = new EngineGlow(this.visual, this.engines, this.glowColor, this.engineScale);
    this.shieldFx = new ShieldEffect(this.object3D, this.radius * 1.4);

    this._fireCooldown = Math.random() * FIRE_INTERVAL;
    this._slotPos = new THREE.Vector3();
    this._desired = new THREE.Vector3();
    this._toTarget = new THREE.Vector3();
    this._dir = new THREE.Vector3();
    this._muzzle = new THREE.Vector3();
    this._q = new THREE.Quaternion();

    game.engine.scene.add(this.object3D);
  }

  update(dt) {
    this.shieldFx.update(dt);
    if (!this.alive) return;
    const game = this.game;
    const player = game.player;
    this._fireCooldown -= dt;

    // --- Formation by role ---
    const n = Math.max(1, this.roleCount);
    if (this.role === 'scout') {
      // Scouts sweep a wide, slowly-circling patrol orbit far from the hull —
      // the fleet's eyes, out where enemies appear first. World-aligned (not
      // ship-relative) so they genuinely sweep the surrounding space.
      this._orbitAng += dt * this._orbitRate;
      const R = 1300 + this.roleIndex * 160;
      this._slotPos.set(
        Math.cos(this._orbitAng) * R,
        Math.sin(this._orbitAng * 0.6) * R * 0.25,
        Math.sin(this._orbitAng) * R,
      ).add(player.position);
    } else {
      // Guards form the protective shell: a ring of slots around the hull on
      // every side, over three fore/aft depths — the flagship's screen.
      const ang = (this.roleIndex / n) * Math.PI * 2;
      const ringR = player.radius + 22 + (this.roleIndex % 2) * 12;
      this._slotPos.set(
        Math.cos(ang) * ringR,
        Math.sin(ang) * ringR,
        ((this.roleIndex % 3) - 1) * 18,
      ).applyQuaternion(player.quaternion).add(player.position);
    }

    // Recall: return to the launch port (carrier flank / battleship belly) and
    // dock there, rather than merging into the hull centre.
    if (this.recalling) {
      const dside = this.slot % 2 === 0 ? -1 : 1;
      const drank = Math.floor(this.slot / 2);
      const R = player.radius;
      if (this.launchPort === 'bottom') {
        this._slotPos.set(dside * R * 0.22, -R * 0.7, R * 0.1 + drank * 3);
      } else if (this.launchPort === 'lowerside') {
        this._slotPos.set(dside * R * 0.7, -R * 0.3, R * 0.05 + drank * 3);
      } else {
        this._slotPos.set(dside * R * 0.85, 0, R * 0.05 + drank * 3);
      }
      this._slotPos.applyQuaternion(player.quaternion).add(player.position);
    }

    // Engaged escorts break formation and push to a standoff point near
    // their target — real dogfights, and they naturally draw enemy fire
    // instead of hiding behind the flagship.
    const engaged = this.recalling ? null : this._acquire();
    let goal = this._slotPos;
    if (engaged) {
      this._desired.copy(this.position).sub(engaged.position).normalize();
      goal = this._slotPos.copy(engaged.position)
        .addScaledVector(this._desired, 90 + this.slot * 14); // spread standoffs
    }

    // --- Steering: velocity chases the slot, softly ---
    this._desired.copy(goal).sub(this.position);
    const dist = this._desired.length();
    const roleSpeed = this.role === 'scout' ? 1.15 : 1; // scouts run hotter
    const speed = clamp(dist * 1.1, 0, ESCORT_SPEED * roleSpeed * (this.recalling ? 1.4 : 1));
    if (dist > 1e-3) this._desired.divideScalar(dist).multiplyScalar(speed);
    this.velocity.lerp(this._desired, 1 - Math.exp(-2.6 * dt));
    this.position.addScaledVector(this.velocity, dt);

    // Reached the bay slot while recalling → ready for the FleetSystem to dock.
    this.docked = this.recalling && dist < 12;

    // --- Face travel direction (or the target while engaging) ---
    const target = engaged;
    this._dir.copy(target ? target.position : goal).sub(this.position);
    if (this._dir.lengthSq() > 1) {
      this._dir.normalize();
      this._q.setFromUnitVectors(FORWARD, this._dir);
      this.quaternion.slerp(this._q, damp(3.5, dt));
    }

    // --- Turret fire at the acquired hostile ---
    if (target && this._fireCooldown <= 0) {
      this._fireCooldown = FIRE_INTERVAL;
      const hp = this.hardpoints[Math.floor(Math.random() * this.hardpoints.length)];
      this._muzzle.copy(hp).applyQuaternion(this.quaternion).add(this.position);
      const d = this._toTarget.copy(target.position).sub(this._muzzle).length();
      this._toTarget.copy(target.position)
        .addScaledVector(target.velocity, d / 950)
        .addScaledVector(this.velocity, -d / 950)
        .sub(this._muzzle).normalize();
      // Slight spread so a wing doesn't beam like a laser wall.
      this._toTarget.x += (Math.random() - 0.5) * 0.02;
      this._toTarget.y += (Math.random() - 0.5) * 0.02;
      game.weapons.fire(this._muzzle, this._toTarget.normalize(), {
        fromPlayer: true, // hits enemies; kills credit the player
        damage: this.fireDamage,
        speed: 950,
        source: this,
        inheritVel: this.velocity,
      });
    }

    this.updateDefense(dt);
    this.glow.update(clamp(this.velocity.length() / ESCORT_SPEED, 0.2, 1), 0, this.slot * 3);
  }

  /**
   * Target selection. A focus-fire order (V) overrides everything: the whole
   * wing converges on the commanded hostile. Otherwise LOCK-TILL-KILL:
   *  1. If this craft already has a live target, keep chasing IT — no
   *     switching — until it dies (or flees past the leash).
   *  2. When picking fresh, take the nearest hostile in role range that the
   *     FEWEST wingmates are already locked onto, so the wing spreads out
   *     one-ship-per-enemy before anyone doubles up.
   * Role ranges: guards react to threats near themselves or the flagship;
   * scouts hunt everything near their far patrol orbit.
   */
  _acquire() {
    const fleet = this.game.fleet;
    const player = this.game.player;
    const ordered = fleet?.focusTarget;
    if (ordered?.alive
      && ordered.position.distanceToSquared(this.position) < COMMAND_RANGE * COMMAND_RANGE) {
      return ordered;
    }

    // Sticky lock: stay on the same hostile until it is destroyed.
    if (this.target?.alive
      && this.target.position.distanceToSquared(player.position) < CHASE_LEASH * CHASE_LEASH) {
      return this.target;
    }
    this.target = null;

    const enemies = this.game.enemies?.enemies ?? [];
    if (!enemies.length) return null;

    // Tally which hostiles wingmates are already locked onto.
    const claims = this._claims;
    claims.clear();
    for (const esc of fleet?.escorts ?? []) {
      if (esc !== this && esc.alive && esc.target?.alive) {
        claims.set(esc.target, (claims.get(esc.target) ?? 0) + 1);
      }
    }

    // Nearest least-claimed hostile within this role's reach.
    const selfRangeSq = (this.role === 'scout' ? SCOUT_HUNT_RANGE : GUARD_SELF_RANGE) ** 2;
    const defendSq = GUARD_DEFEND_RANGE * GUARD_DEFEND_RANGE;
    let best = null;
    let bestClaims = Infinity;
    let bestSq = Infinity;
    for (const enemy of enemies) {
      if (!enemy.alive) continue;
      const dSelf = enemy.position.distanceToSquared(this.position);
      const threat = dSelf < selfRangeSq
        || (this.role === 'guard' && enemy.position.distanceToSquared(player.position) < defendSq);
      if (!threat) continue;
      const c = claims.get(enemy) ?? 0;
      if (c < bestClaims || (c === bestClaims && dSelf < bestSq)) {
        bestClaims = c;
        bestSq = dSelf;
        best = enemy;
      }
    }
    this.target = best;
    return best;
  }

  dispose() {
    this.shieldFx.dispose();
    this.game.engine.scene.remove(this.object3D);
  }
}

const FORWARD = new THREE.Vector3(0, 0, -1);
