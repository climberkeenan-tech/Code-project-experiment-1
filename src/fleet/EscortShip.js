import * as THREE from 'three';
import { ShipBase } from '../ship/ShipBase.js';
import { createPlayerShip, PLAYER_SHIP_BY_ID } from '../ship/ShipFactory.js';
import { EngineGlow } from '../fx/EngineGlow.js';
import { ShieldEffect } from '../fx/ShieldEffect.js';
import { clamp, damp } from '../core/math/noise.js';

/**
 * A deployed friendly attack fighter — a light hangar craft launched from a
 * capital ship and flown by an AI wingman. It holds a formation slot beside
 * the flagship and pours fire into any hostile in range (fromPlayer bolts, so
 * kill credits flow to the player). Hangar fighters are expendable: losing one
 * costs nothing from the player's owned-ship collection.
 */

const ENGAGE_RANGE = 1300;
const COMMAND_RANGE = 5000; // ordered targets are pursued much further
const FIRE_INTERVAL = 0.42;
const ESCORT_SPEED = 330; // keeps pace with the flagship

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

    const v = PLAYER_SHIP_BY_ID[variantId] ?? PLAYER_SHIP_BY_ID.starter;
    this.hullMax = this.hull = Math.round(100 * v.hull);
    this.shieldMax = this.shield = Math.round(100 * v.shield);
    this.shieldRegenRate = 8;
    this.shieldRegenDelay = 4;

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

    // --- Formation slot: staggered wedge behind/beside the flagship ---
    const side = this.slot % 2 === 0 ? -1 : 1;
    const rank = Math.floor(this.slot / 2) + 1;
    this._slotPos.set(
      side * (player.radius + 26 + rank * 18),
      8 + rank * 5,
      player.radius + 20 + rank * 24, // behind (+Z in ship space)
    ).applyQuaternion(player.quaternion).add(player.position);

    // Engaged escorts break formation and push to a standoff point near
    // their target — real dogfights, and they naturally draw enemy fire
    // instead of hiding behind the flagship.
    const engaged = this.recalling ? null : this._acquire();
    let goal = this.recalling ? player.position : this._slotPos;
    if (engaged) {
      this._desired.copy(this.position).sub(engaged.position).normalize();
      goal = this._slotPos.copy(engaged.position)
        .addScaledVector(this._desired, 90 + this.slot * 14); // spread standoffs
    }

    // --- Steering: velocity chases the slot, softly ---
    this._desired.copy(goal).sub(this.position);
    const dist = this._desired.length();
    const speed = clamp(dist * 1.1, 0, ESCORT_SPEED * (this.recalling ? 1.4 : 1));
    if (dist > 1e-3) this._desired.divideScalar(dist).multiplyScalar(speed);
    this.velocity.lerp(this._desired, 1 - Math.exp(-2.6 * dt));
    this.position.addScaledVector(this.velocity, dt);

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
        damage: 8,
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
   * wing converges on the commanded hostile, pursuing well beyond normal
   * engagement range. With no order they hunt on their own initiative —
   * nearest live hostile in range, no command needed.
   */
  _acquire() {
    const ordered = this.game.fleet?.focusTarget;
    if (ordered?.alive
      && ordered.position.distanceToSquared(this.position) < COMMAND_RANGE * COMMAND_RANGE) {
      return ordered;
    }
    let best = null;
    let bestSq = ENGAGE_RANGE * ENGAGE_RANGE;
    for (const enemy of this.game.enemies?.enemies ?? []) {
      if (!enemy.alive) continue;
      const d = enemy.position.distanceToSquared(this.position);
      if (d < bestSq) { bestSq = d; best = enemy; }
    }
    return best;
  }

  dispose() {
    this.shieldFx.dispose();
    this.game.engine.scene.remove(this.object3D);
  }
}

const FORWARD = new THREE.Vector3(0, 0, -1);
