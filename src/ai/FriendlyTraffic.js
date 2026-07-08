import * as THREE from 'three';
import { ShipBase } from '../ship/ShipBase.js';
import { createPlayerShip } from '../ship/ShipFactory.js';
import { EngineGlow } from '../fx/EngineGlow.js';
import { clamp, damp } from '../core/math/noise.js';

/**
 * Ambient friendly traffic: a handful of allied ships cruising around the
 * player's neighbourhood, the way pirates sometimes drift by — space feels
 * inhabited by more than hostiles. They are DECORATIVE: enemies ignore them,
 * weapons pass through them, and they never attack. They read as friendly via
 * blue HUD brackets (TargetOverlay), blue radar blips, and natural hulls.
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
    this.waypoint = new THREE.Vector3();
    this._retarget = 0;
    this._seed = Math.random() * 10;
    this._desired = new THREE.Vector3();
    this._dir = new THREE.Vector3();
    this._away = new THREE.Vector3();
    this._q = new THREE.Quaternion();
    this.glow = new EngineGlow(this.visual, this.engines, this.glowColor, this.engineScale);
    game.engine.scene.add(this.object3D);
  }

  update(dt) {
    const game = this.game;

    // Re-pick a destination near the player so traffic loiters in the area.
    this._retarget -= dt;
    if (this._retarget <= 0 || this.position.distanceToSquared(this.waypoint) < 200 * 200) {
      this._retarget = 18 + Math.random() * 20;
      this.waypoint.set(Math.random() - 0.5, (Math.random() - 0.5) * 0.4, Math.random() - 0.5)
        .normalize()
        .multiplyScalar(1200 + Math.random() * 4800)
        .add(game.player.position);
    }

    // Cruise toward the waypoint, easing in/out.
    this._desired.copy(this.waypoint).sub(this.position);
    const dist = this._desired.length();
    const speed = clamp(dist * 0.4, 30, this.cruise);
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

    this.velocity.lerp(this._desired, 1 - Math.exp(-1.4 * dt));
    this.position.addScaledVector(this.velocity, dt);

    // Face travel direction.
    if (this.velocity.lengthSq() > 4) {
      this._dir.copy(this.velocity).normalize();
      this._q.setFromUnitVectors(FORWARD, this._dir);
      this.quaternion.slerp(this._q, damp(2.2, dt));
    }

    this.glow.update(clamp(this.velocity.length() / this.cruise, 0.25, 1), 0, this._seed);
  }

  dispose() {
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
  }

  update(dt) {
    const game = this.game;
    const player = game.player;
    if (!player) return;

    for (const ship of this.ships) ship.update(dt);

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
