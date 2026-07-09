import * as THREE from 'three';
import { ShipBase } from '../ship/ShipBase.js';
import { createPlayerShip, PLAYER_SHIP_BY_ID } from '../ship/ShipFactory.js';
import { EngineGlow } from '../fx/EngineGlow.js';
import { ShieldEffect } from '../fx/ShieldEffect.js';
import { clamp, damp } from '../core/math/noise.js';

/**
 * Ambient friendly traffic: a handful of allied ships cruising around the
 * player's neighbourhood, the way pirates sometimes drift by — space feels
 * inhabited by more than hostiles. They read as friendly via blue HUD
 * brackets (TargetOverlay), blue radar blips, and natural hulls.
 *
 * They are COMBATANTS on your side: when hostiles come near them or near the
 * player, allies engage — lock-till-kill, fromPlayer bolts (kills credit the
 * player) — and enemy fire can hurt and destroy them (WeaponSystem sweeps
 * them; CombatSystem routes their deaths back here).
 *
 * Each ship wanders between waypoints picked near the player, so traffic
 * "hangs around" instead of drifting off; ships that fall far behind (warp,
 * long cruises) despawn and fresh ones appear ahead.
 */

const TRAFFIC_CAP = 5;
const CHECK_INTERVAL = 3; // seconds between population checks
const SPAWN_MIN = 2500;
const SPAWN_MAX = 7000;
const DESPAWN_RANGE = 16000;
const ALLY_ENGAGE_SELF = 1600; // fight hostiles this close to the ally…
const ALLY_DEFEND_PLAYER = 1300; // …or this close to the player ("protect me")
const ALLY_LEASH = 4500; // give up a chase this far from the player
const ALLY_FIRE_INTERVAL = 0.55;
const ALLY_BASE_DAMAGE = 7; // lighter than wing craft — helpful, not a win button

/** Friendly hulls seen in the wild — mostly small craft, capitals are rare. */
const CIVILIAN_VARIANTS = ['starter', 'starter', 'explorer', 'explorer', 'interceptor', 'frigate'];
const RARE_VARIANTS = ['battlecruiser', 'battleship', 'carrier'];
/** Callsigns shown on the blue bracket. */
const CALLSIGNS = ['Trader', 'Hauler', 'Patrol', 'Escort', 'Surveyor', 'Courier', 'Miner'];

class TrafficShip extends ShipBase {
  /** @param {import('../core/Game.js').Game} game */
  constructor(game, variantId, callsign) {
    super(createPlayerShip(variantId));
    this.game = game;
    this.isFriendly = true;
    this.callsign = callsign;
    this.cruise = 70 + Math.random() * 90; // leisurely, per-ship
    this.combatSpeed = 260; // wakes up when defending
    this.waypoint = new THREE.Vector3();
    /** The hostile this ally is locked onto — kept until it dies. */
    this.target = null;
    this._retarget = 0;
    this._seed = Math.random() * 10;
    this._fireCooldown = Math.random() * ALLY_FIRE_INTERVAL;
    this._desired = new THREE.Vector3();
    this._dir = new THREE.Vector3();
    this._away = new THREE.Vector3();
    this._muzzle = new THREE.Vector3();
    this._lead = new THREE.Vector3();
    this._q = new THREE.Quaternion();

    const v = PLAYER_SHIP_BY_ID[variantId] ?? PLAYER_SHIP_BY_ID.starter;
    this.hullMax = this.hull = Math.round(90 * v.hull);
    this.shieldMax = this.shield = Math.round(90 * v.shield);
    this.shieldRegenRate = 7;
    this.shieldRegenDelay = 4.5;
    this.fireDamage = ALLY_BASE_DAMAGE * (v.weapon ?? 1);

    this.glow = new EngineGlow(this.visual, this.engines, this.glowColor, this.engineScale);
    this.shieldFx = new ShieldEffect(this.object3D, this.radius * 1.4);
    game.engine.scene.add(this.object3D);
  }

  update(dt) {
    this.shieldFx.update(dt);
    if (!this.alive) return;
    const game = this.game;
    this._fireCooldown -= dt;

    // Re-pick a destination near the player so traffic loiters in the area.
    this._retarget -= dt;
    if (this._retarget <= 0 || this.position.distanceToSquared(this.waypoint) < 200 * 200) {
      this._retarget = 18 + Math.random() * 20;
      this.waypoint.set(Math.random() - 0.5, (Math.random() - 0.5) * 0.4, Math.random() - 0.5)
        .normalize()
        .multiplyScalar(1200 + Math.random() * 4800)
        .add(game.player.position);
    }

    // --- Combat: allies defend themselves and the player ---
    const engaged = this._acquire();
    let goal = this.waypoint;
    let topSpeed = this.cruise;
    if (engaged) {
      // Push to a standoff point near the target — a real dogfight approach.
      this._desired.copy(this.position).sub(engaged.position).normalize();
      goal = this._away.copy(engaged.position).addScaledVector(this._desired, 110 + this._seed * 8);
      topSpeed = this.combatSpeed;
    }

    // Cruise toward the goal, easing in/out.
    this._desired.copy(goal).sub(this.position);
    const dist = this._desired.length();
    const speed = clamp(dist * (engaged ? 1.0 : 0.4), 30, topSpeed);
    if (dist > 1e-3) this._desired.divideScalar(dist).multiplyScalar(speed);

    // Stay out of planets/sun: soft push away from any obstacle sphere.
    for (const ob of game.obstacles) {
      this._away.copy(this.position).sub(ob.position);
      const d = this._away.length();
      const safe = ob.radius + 500;
      if (d < safe && d > 1e-3) {
        this._desired.addScaledVector(this._away.divideScalar(d), (safe - d) * 0.8);
      }
    }

    this.velocity.lerp(this._desired, 1 - Math.exp(-(engaged ? 2.4 : 1.4) * dt));
    this.position.addScaledVector(this.velocity, dt);

    // Face the target while fighting, else the travel direction.
    if (engaged) {
      this._dir.copy(engaged.position).sub(this.position).normalize();
      this._q.setFromUnitVectors(FORWARD, this._dir);
      this.quaternion.slerp(this._q, damp(3.2, dt));
    } else if (this.velocity.lengthSq() > 4) {
      this._dir.copy(this.velocity).normalize();
      this._q.setFromUnitVectors(FORWARD, this._dir);
      this.quaternion.slerp(this._q, damp(2.2, dt));
    }

    // Fire with velocity lead, like the wing craft.
    if (engaged && this._fireCooldown <= 0) {
      this._fireCooldown = ALLY_FIRE_INTERVAL;
      const hp = this.hardpoints[Math.floor(Math.random() * this.hardpoints.length)];
      this._muzzle.copy(hp).applyQuaternion(this.quaternion).add(this.position);
      const d = this._lead.copy(engaged.position).sub(this._muzzle).length();
      this._lead.copy(engaged.position)
        .addScaledVector(engaged.velocity, d / 950)
        .addScaledVector(this.velocity, -d / 950)
        .sub(this._muzzle).normalize();
      this._lead.x += (Math.random() - 0.5) * 0.025;
      this._lead.y += (Math.random() - 0.5) * 0.025;
      game.weapons.fire(this._muzzle, this._lead.normalize(), {
        fromPlayer: true, // hits enemies; kills credit the player
        damage: this.fireDamage,
        speed: 950,
        source: this,
        inheritVel: this.velocity,
      });
    }

    this.updateDefense(dt);
    this.glow.update(clamp(this.velocity.length() / topSpeed, 0.25, 1), 0, this._seed);
  }

  /**
   * Lock-till-kill: keep the current hostile until it dies (or the fight
   * drifts too far from the player). Fresh picks take the nearest hostile
   * threatening this ally or the player.
   */
  _acquire() {
    const player = this.game.player;
    if (this.target?.alive
      && this.target.position.distanceToSquared(player.position) < ALLY_LEASH * ALLY_LEASH) {
      return this.target;
    }
    this.target = null;
    let best = null;
    let bestSq = Infinity;
    const selfSq = ALLY_ENGAGE_SELF * ALLY_ENGAGE_SELF;
    const defendSq = ALLY_DEFEND_PLAYER * ALLY_DEFEND_PLAYER;
    for (const enemy of this.game.enemies?.enemies ?? []) {
      if (!enemy.alive) continue;
      const dSelf = enemy.position.distanceToSquared(this.position);
      const threat = dSelf < selfSq
        || enemy.position.distanceToSquared(player.position) < defendSq;
      if (threat && dSelf < bestSq) { bestSq = dSelf; best = enemy; }
    }
    this.target = best;
    return best;
  }

  dispose() {
    this.shieldFx.dispose();
    this.game.engine.scene.remove(this.object3D);
  }
}

export class FriendlyTraffic {
  /** @param {import('../core/Game.js').Game} game */
  constructor(game) {
    this.game = game;
    /** @type {TrafficShip[]} */
    this.ships = [];
    this._checkTimer = 0;
    this._spawnPos = new THREE.Vector3();
    game.traffic = this;

    game.origin.onShift((delta) => {
      for (const ship of this.ships) {
        ship.position.sub(delta);
        ship.waypoint.sub(delta);
      }
    });

    // The Night Hawk's special power: a called wave of allied ships.
    game.events.on('reinforce:call', ({ count }) => this.spawnReinforcements(count));
    // The Star Destroyer's power: a HAND-PICKED fleet (list of variant ids).
    game.events.on('fleetcall:call', ({ variants }) => this.spawnFleet(variants));
  }

  /** Summon an exact fleet composition (Star Destroyer's call, ≤50 ships). */
  spawnFleet(variants) {
    const game = this.game;
    const list = (variants ?? []).slice(0, 50);
    list.forEach((variantId, i) => {
      const ship = new TrafficShip(game, variantId, 'Fleet');
      ship.reinforcement = true;
      ship.life = 200;
      const ang = (i / Math.max(1, list.length)) * Math.PI * 2;
      const r = 240 + ship.radius * 1.6 + (i % 5) * 80;
      ship.position.copy(game.player.position);
      ship.position.x += Math.cos(ang) * r;
      ship.position.y += ((i % 3) - 1) * 90;
      ship.position.z += Math.sin(ang) * r;
      ship.waypoint.copy(ship.position);
      ship._retarget = 0;
      this.ships.push(ship);
    });
    game.audio?.playTone?.({ type: 'sine', freq: 300, freqEnd: 760, duration: 0.7, gain: 0.22 });
  }

  /**
   * Warp in `count` (1-40) allied reinforcements around the player. They are
   * full combat allies (same AI as traffic) with a service life — once the
   * area has been quiet for a while they cruise off and despawn.
   */
  spawnReinforcements(count) {
    const game = this.game;
    const n = Math.max(1, Math.min(40, Math.floor(count) || 1));
    for (let i = 0; i < n; i++) {
      const variant = i % 6 === 5 ? 'frigate' : (i % 3 === 2 ? 'explorer' : 'starter');
      const ship = new TrafficShip(game, variant, 'Reinforcement');
      ship.reinforcement = true;
      ship.life = 150; // seconds of service (extended while fighting)
      const ang = (i / n) * Math.PI * 2;
      const r = 180 + (i % 5) * 70;
      ship.position.copy(game.player.position);
      ship.position.x += Math.cos(ang) * r;
      ship.position.y += ((i % 3) - 1) * 60;
      ship.position.z += Math.sin(ang) * r;
      ship.waypoint.copy(ship.position);
      ship._retarget = 0;
      this.ships.push(ship);
    }
    game.audio?.playTone?.({ type: 'sine', freq: 420, freqEnd: 880, duration: 0.5, gain: 0.2 });
  }

  update(dt) {
    const game = this.game;
    const player = game.player;
    if (!player) return;

    for (const ship of this.ships) {
      ship.update(dt);
      // Reinforcements serve a tour then leave (never mid-fight).
      if (ship.reinforcement) {
        ship.life -= dt;
        if (ship.life <= 0 && !ship.target?.alive) {
          ship.dispose();
          this.ships.splice(this.ships.indexOf(ship), 1);
        }
      }
    }

    this._checkTimer -= dt;
    if (this._checkTimer > 0) return;
    this._checkTimer = CHECK_INTERVAL;

    // Despawn traffic that fell far behind (warp jumps, long cruises).
    for (let i = this.ships.length - 1; i >= 0; i--) {
      if (this.ships[i].position.distanceToSquared(player.position) > DESPAWN_RANGE * DESPAWN_RANGE) {
        this.ships[i].dispose();
        this.ships.splice(i, 1);
      }
    }

    if (this.ships.length >= TRAFFIC_CAP) return;
    this._spawnOne();
  }

  /** An ally was shot down (routed here by CombatSystem). */
  onTrafficDestroyed(ship) {
    const i = this.ships.indexOf(ship);
    if (i !== -1) this.ships.splice(i, 1);
    ship.dispose();
  }

  _spawnOne() {
    const game = this.game;
    // A capital shows up now and then; mostly it's small civilian craft.
    const variant = Math.random() < 0.12
      ? RARE_VARIANTS[Math.floor(Math.random() * RARE_VARIANTS.length)]
      : CIVILIAN_VARIANTS[Math.floor(Math.random() * CIVILIAN_VARIANTS.length)];

    // Find a clear spawn spot (outside every obstacle sphere).
    for (let attempt = 0; attempt < 6; attempt++) {
      this._spawnPos.set(Math.random() - 0.5, (Math.random() - 0.5) * 0.5, Math.random() - 0.5)
        .normalize()
        .multiplyScalar(SPAWN_MIN + Math.random() * (SPAWN_MAX - SPAWN_MIN))
        .add(game.player.position);
      let clear = true;
      for (const ob of game.obstacles) {
        if (this._spawnPos.distanceTo(ob.position) < ob.radius + 600) { clear = false; break; }
      }
      if (!clear) continue;
      const ship = new TrafficShip(game, variant,
        CALLSIGNS[Math.floor(Math.random() * CALLSIGNS.length)]);
      ship.position.copy(this._spawnPos);
      ship.waypoint.copy(this._spawnPos); // retargets on first update
      ship._retarget = 0;
      this.ships.push(ship);
      return;
    }
  }
}

const FORWARD = new THREE.Vector3(0, 0, -1);
