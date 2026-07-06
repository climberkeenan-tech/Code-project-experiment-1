import * as THREE from 'three';
import { ShipBase } from './ShipBase.js';
import { createPlayerShip } from './ShipFactory.js';
import { EngineGlow } from '../fx/EngineGlow.js';
import { ShieldEffect } from '../fx/ShieldEffect.js';
import { damp, clamp, lerp } from '../core/math/noise.js';

/**
 * The player's ship: flight model, boost energy, and cosmetic banking.
 *
 * Flight feel philosophy — "physics-inspired, not simulation":
 *  - Thrust adds to velocity (real momentum, you drift through turns).
 *  - Gentle always-on damping acts like flight-assist, so releasing the
 *    controls slowly bleeds residual drift instead of leaving the player
 *    tumbling forever. A dedicated brake bleeds speed fast.
 *  - Rotation uses smoothed angular rates rather than torque physics:
 *    responsive enough for dogfights, inertial enough to feel massive.
 *  - Top speed is environment-scaled (`envSpeedScale`): near a planet's
 *    surface the ship handles like an atmospheric fighter; in deep space it
 *    opens up to cruise velocity so interplanetary travel stays snappy.
 */

const TUNING = {
  accelForward: 110,
  accelReverse: 60,
  accelStrafe: 70,
  boostAccelMult: 2.9,
  baseMaxSpeed: 240,
  boostMaxMult: 2.4,
  damping: 0.5, // 1/s velocity bleed with assist on
  brakeDamping: 3.4,
  pitchRate: 1.55, // rad/s at full deflection
  yawRate: 1.0,
  rollRate: 2.7,
  angularResponse: 9, // how fast rates chase the stick
  boostDrain: 30, // energy/s
  boostRegen: 17,
  boostRegenDelay: 0.9,
  boostMinEngage: 14,
};

export class PlayerShip extends ShipBase {
  /** @param {import('../core/Game.js').Game} game */
  constructor(game) {
    super(createPlayerShip());
    this.game = game;

    this.hullMax = this.hull = 100;
    this.shieldMax = this.shield = 100;
    this.shieldRegenRate = 10;
    this.shieldRegenDelay = 3.2;

    // Boost energy state.
    this.boostEnergy = 100;
    this.boostActive = false;
    this._sinceBoost = Infinity;

    /**
     * Environment speed scale, driven by the universe system: 1 near a
     * planet surface, rising smoothly toward `maxCruiseScale` in deep space.
     */
    this.envSpeedScale = 1;

    /** Set by the universe system each frame (gravity, atmosphere etc). */
    this.gravity = new THREE.Vector3();

    /** True while the auto-landing system is flying the ship. */
    this.autolanding = false;

    /** Resources collected from wrecks and discoveries (legacy soft counter). */
    this.resources = 0;

    /** Universal currency: earned from kills + selling mined rocks. */
    this.credits = 0;

    /**
     * Mined-rock inventory, keyed by rarity id → count. Filled on foot while
     * mining, emptied when sold at a shop. Lost with the ship on death.
     * @type {Record<string, number>}
     */
    this.inventory = {};

    /** Permanent upgrade multipliers, improved by exploration finds + shop. */
    this.upgrades = { engine: 1, shield: 1, weapon: 1 };

    this.glow = new EngineGlow(this.visual, this.engines, this.glowColor);
    this.shieldFx = new ShieldEffect(this.object3D, this.radius * 1.4);

    this._throttleSmooth = 0;
    this._boostBlend = 0;

    this._fwd = new THREE.Vector3();
    this._thrust = new THREE.Vector3();

    game.engine.scene.add(this.object3D);

    // Floating-origin: shift our position like everything else.
    game.origin.onShift((delta) => {
      this.position.sub(delta);
    });
  }

  /** @param {number} dt @param {number} elapsed */
  update(dt, elapsed) {
    this.shieldFx.update(dt);
    if (!this.alive) return;

    // Parked while the player is walking around on foot: hold station, bleed
    // any residual drift, and skip the flight model entirely.
    if (this.game.mode === 'onfoot') {
      this.velocity.multiplyScalar(Math.exp(-6 * dt));
      this.position.addScaledVector(this.velocity, dt);
      this.updateDefense(dt);
      return;
    }

    // Auto-landing: the landing system owns velocity + orientation; just
    // integrate position and keep the defense model ticking.
    if (this.autolanding) {
      this.angularRates.set(0, 0, 0);
      this.position.addScaledVector(this.velocity, dt);
      this.updateDefense(dt);
      this.glow.update(0.35, 0, elapsed);
      return;
    }

    const input = this.game.input.state;

    // Hyperdrive cruise: the warp system owns the velocity vector; the pilot
    // keeps damped steering authority so travel direction = look direction.
    const warping = !!(this.game.warp && this.game.warp.engaged);

    // --- Boost energy management (with engage hysteresis) ---
    const wantBoost = !warping && input.boost && input.throttle > 0;
    if (wantBoost && !this.boostActive && this.boostEnergy > TUNING.boostMinEngage) {
      this.boostActive = true;
      this.game.events.emit('player:boost-start');
    }
    if (this.boostActive) {
      this.boostEnergy -= TUNING.boostDrain * dt;
      this._sinceBoost = 0;
      if (!wantBoost || this.boostEnergy <= 0) {
        this.boostActive = false;
        this.boostEnergy = Math.max(0, this.boostEnergy);
        this.game.events.emit('player:boost-end');
      }
    } else {
      this._sinceBoost += dt;
      if (this._sinceBoost > TUNING.boostRegenDelay) {
        this.boostEnergy = Math.min(100, this.boostEnergy + TUNING.boostRegen * dt);
      }
    }

    // --- Rotation: smoothed angular rates chasing stick deflection ---
    const steer = warping ? 0.45 : 1; // heavier hands at light speed
    const response = damp(TUNING.angularResponse, dt);
    this.angularRates.x = lerp(this.angularRates.x, input.pitch * TUNING.pitchRate * steer, response);
    this.angularRates.y = lerp(this.angularRates.y, -input.yaw * TUNING.yawRate * steer, response);
    this.angularRates.z = lerp(this.angularRates.z, -input.roll * TUNING.rollRate * steer, response);

    if (!warping) {
      // --- Thrust ---
      const engineMult = this.upgrades.engine;
      const boostAccel = this.boostActive ? TUNING.boostAccelMult : 1;
      const forwardAccel = input.throttle >= 0
        ? input.throttle * TUNING.accelForward
        : input.throttle * TUNING.accelReverse;
      this._thrust.set(
        input.strafeX * TUNING.accelStrafe,
        input.strafeY * TUNING.accelStrafe,
        -forwardAccel, // ship forward is -Z
      ).multiplyScalar(boostAccel * engineMult);
      this._thrust.applyQuaternion(this.quaternion);
      this.velocity.addScaledVector(this._thrust, dt);

      // Gravity from the universe system (zero in deep space).
      this.velocity.addScaledVector(this.gravity, dt);

      // --- Damping & soft speed limit ---
      const dampingRate = input.brake ? TUNING.brakeDamping : TUNING.damping;
      this.velocity.multiplyScalar(Math.exp(-dampingRate * dt));

      const maxSpeed = TUNING.baseMaxSpeed * this.envSpeedScale * this.upgrades.engine
        * (this.boostActive ? TUNING.boostMaxMult : 1);
      const speed = this.velocity.length();
      if (speed > maxSpeed) {
        // Soft limit: squash the excess quickly but continuously, so crossing
        // the boundary (e.g. leaving boost) never snaps the camera.
        const over = speed / maxSpeed;
        this.velocity.multiplyScalar(Math.pow(over, -Math.min(1, 6 * dt)));
      }
    }

    this.integrate(dt);
    this.updateDefense(dt);

    // --- Cosmetics: banking + throttle smoothing for the exhaust ---
    this._throttleSmooth = lerp(this._throttleSmooth, Math.max(0, input.throttle), damp(6, dt));
    this._boostBlend = lerp(this._boostBlend, this.boostActive ? 1 : 0, damp(7, dt));

    // The visual mesh banks into yaw and dips with pitch — pure cosmetics,
    // the physics frame never tilts.
    this.visual.rotation.z = lerp(this.visual.rotation.z, this.angularRates.y * 0.55, damp(6, dt));
    this.visual.rotation.x = lerp(this.visual.rotation.x, this.angularRates.x * 0.1, damp(6, dt));

    this.glow.update(this._throttleSmooth, this._boostBlend, elapsed);
  }

  /**
   * Re-derive stat caps from the current upgrade multipliers. Engine/weapon
   * multipliers are read live each frame, but shield capacity/regen must be
   * baked into the defense model here. Call after load and after any purchase.
   */
  applyUpgrades() {
    const shieldMult = this.upgrades.shield;
    const prevMax = this.shieldMax;
    this.shieldMax = Math.round(100 * shieldMult);
    this.shieldRegenRate = 10 * shieldMult;
    // Top up proportionally so an upgrade never leaves the bar over-full.
    if (this.shieldMax > prevMax) this.shield += this.shieldMax - prevMax;
    this.shield = Math.min(this.shield, this.shieldMax);
  }

  /** Fraction accessors for the HUD. */
  get hull01() { return this.hull / this.hullMax; }
  get shield01() { return this.shield / this.shieldMax; }
  get boost01() { return this.boostEnergy / 100; }

  /** Reset after death. Position is chosen by the respawn logic in main. */
  respawn() {
    this.hull = this.hullMax;
    this.shield = this.shieldMax;
    this.boostEnergy = 100;
    this.velocity.set(0, 0, 0);
    this.angularRates.set(0, 0, 0);
    this.alive = true;
    this.object3D.visible = true;
  }
}
