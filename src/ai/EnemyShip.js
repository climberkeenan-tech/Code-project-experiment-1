import * as THREE from 'three';
import { ShipBase } from '../ship/ShipBase.js';
import { createEnemyShip } from '../ship/ShipFactory.js';
import { EngineGlow } from '../fx/EngineGlow.js';
import { ShieldEffect } from '../fx/ShieldEffect.js';
import { Rng } from '../core/math/rng.js';
import { damp, clamp, lerp } from '../core/math/noise.js';

/**
 * Enemy ship classes. Stats shape behavior as much as durability: scouts
 * detect far, turn hard and dodge constantly but melt under fire; heavies
 * barely evade yet hit like a truck.
 */
export const ENEMY_TYPES = {
  scout: {
    hull: 30, shield: 20, accel: 135, maxSpeed: 310, turnRate: 2.0,
    fireRange: 270, fireInterval: 1.0, damage: 4, detectRange: 1000,
    evadeSkill: 0.85, attackRunTime: 4, resources: 2,
  },
  fighter: {
    hull: 60, shield: 45, accel: 105, maxSpeed: 255, turnRate: 1.45,
    fireRange: 340, fireInterval: 0.7, damage: 7, detectRange: 800,
    evadeSkill: 0.55, attackRunTime: 6, resources: 4,
  },
  heavy: {
    hull: 150, shield: 100, accel: 72, maxSpeed: 195, turnRate: 0.85,
    fireRange: 440, fireInterval: 1.7, damage: 16, detectRange: 750,
    evadeSkill: 0.2, attackRunTime: 9, resources: 9,
  },
};

/** AI states — see `_updateAI` for the transition graph. */
const State = {
  PATROL: 'patrol',
  CHASE: 'chase',
  ATTACK: 'attack',
  EVADE: 'evade',
  RETREAT: 'retreat',
};

let nextEnemyId = 1;

/**
 * A hostile ship driven by a five-state combat FSM.
 *
 * Movement uses the same "smoothed angular rates + forward thrust" model as
 * the player, so enemies obey identical flight feel and can never cheat
 * physics. Steering converts a desired world direction into proportional
 * pitch/yaw commands in ship-local space, with sphere-obstacle deflection
 * (planets, asteroids) applied first.
 */
export class EnemyShip extends ShipBase {
  /**
   * @param {import('../core/Game.js').Game} game
   * @param {'scout'|'fighter'|'heavy'} type
   * @param {THREE.Vector3} homeCenter patrol anchor (render space)
   * @param {number} patrolRadius
   */
  constructor(game, type, homeCenter, patrolRadius = 600) {
    super(createEnemyShip(type));
    this.game = game;
    this.type = type;
    this.stats = ENEMY_TYPES[type];
    this.id = nextEnemyId++;

    this.hullMax = this.hull = this.stats.hull;
    this.shieldMax = this.shield = this.stats.shield;
    this.shieldRegenRate = 6;
    this.shieldRegenDelay = 5;

    this.state = State.PATROL;
    this.homeCenter = homeCenter.clone();
    this.patrolRadius = patrolRadius;

    this.rng = new Rng(`enemy:${this.id}:${Math.random()}`);

    // Patrol waypoint (regenerated on arrival).
    this.waypoint = new THREE.Vector3();
    this._pickPatrolWaypoint();

    // Combat timers.
    this.fireCooldown = this.rng.range(0, this.stats.fireInterval);
    this.stateTime = 0;
    this._lostSightTime = 0;
    this._evadeDir = new THREE.Vector3();
    this._evadeDuration = 0;
    this._attackRunTime = 0;

    /** Weapon system (Phase 4) reads this to spawn bolts. */
    this.triggerHeld = false;

    /** Encounter-director region this ship belongs to (null = scripted). */
    this.region = null;

    this.glow = new EngineGlow(this.visual, this.engines, this.glowColor);
    this.shieldFx = new ShieldEffect(
      this.object3D, this.radius * 1.35, new THREE.Color(1.6, 0.8, 0.4),
    );
    this._throttle = 0;

    // Scratch vectors (per-instance so ships can't corrupt each other).
    this._toTarget = new THREE.Vector3();
    this._desired = new THREE.Vector3();
    this._local = new THREE.Vector3();
    this._quatInv = new THREE.Quaternion();
    this._avoid = new THREE.Vector3();
    this._fwd = new THREE.Vector3();
  }

  _pickPatrolWaypoint() {
    const [x, y, z] = this.rng.unitVector();
    this.waypoint.copy(this.homeCenter).add(
      new THREE.Vector3(x, y, z).multiplyScalar(this.rng.range(0.3, 1) * this.patrolRadius),
    );
  }

  /** Called by combat when this ship takes a hit. */
  notifyHit() {
    if (!this.alive) return;
    // Getting shot mid-patrol is an instant aggro.
    if (this.state === State.PATROL) this._setState(State.CHASE);
    // Skilled pilots juke after taking damage.
    else if (this.state !== State.RETREAT && this.rng.chance(this.stats.evadeSkill * 0.7)) {
      this._startEvade();
    }
  }

  /** Called by combat when player fire passes close by. */
  notifyNearMiss() {
    if (!this.alive || this.state === State.RETREAT) return;
    if ((this.state === State.CHASE || this.state === State.ATTACK)
      && this.rng.chance(this.stats.evadeSkill * 0.4)) {
      this._startEvade();
    }
  }

  _startEvade() {
    // Dodge perpendicular to the line of sight, random handedness.
    const player = this.game.player;
    this._toTarget.copy(player.position).sub(this.position).normalize();
    const [ux, uy, uz] = this.rng.unitVector();
    this._evadeDir.set(ux, uy, uz).cross(this._toTarget);
    if (this._evadeDir.lengthSq() < 0.05) this._evadeDir.set(0, 1, 0);
    this._evadeDir.normalize();
    this._evadeDuration = this.rng.range(0.7, 1.6);
    this._setState(State.EVADE);
  }

  _setState(state) {
    if (this.state === state) return;
    this.state = state;
    this.stateTime = 0;
  }

  update(dt, elapsed) {
    this.shieldFx.update(dt);
    if (!this.alive) return;
    this.stateTime += dt;
    this.fireCooldown -= dt;

    const player = this.game.player;
    const playerAlive = player && player.alive;
    const distToPlayer = playerAlive
      ? this._toTarget.copy(player.position).sub(this.position).length()
      : Infinity;

    this._updateAI(dt, distToPlayer, playerAlive);

    // Common integration + defense.
    this.integrate(dt);
    this.updateDefense(dt);
    this.glow.update(this._throttle, this.state === State.RETREAT ? 0.6 : 0, elapsed + this.id);
  }

  /**
   * State transition + steering logic.
   *
   *  PATROL --sees player / shot--> CHASE
   *  CHASE --in range & aligned--> ATTACK   --run expires--> EVADE
   *  ATTACK/CHASE --hit & skilled--> EVADE  --timer--> CHASE
   *  any --hull < 28%--> RETREAT --safe distance--> PATROL
   */
  _updateAI(dt, distToPlayer, playerAlive) {
    const stats = this.stats;
    const player = this.game.player;
    this.triggerHeld = false;

    // Universal retreat check.
    if (this.state !== State.RETREAT && this.hull / this.hullMax < 0.28) {
      this._setState(State.RETREAT);
      this.game.events.emit('enemy:retreating', this);
    }

    let speedFactor = 0.45; // patrol cruise
    let target = this.waypoint;

    switch (this.state) {
      case State.PATROL: {
        if (this.position.distanceTo(this.waypoint) < 60) this._pickPatrolWaypoint();
        if (playerAlive && distToPlayer < stats.detectRange) {
          this._setState(State.CHASE);
          this.game.events.emit('enemy:detected-player', this);
        }
        break;
      }

      case State.CHASE: {
        if (!playerAlive) { this._setState(State.PATROL); break; }
        target = player.position;
        speedFactor = 1;
        // Lose interest if the player outruns detection for a while.
        if (distToPlayer > stats.detectRange * 1.8) {
          this._lostSightTime += dt;
          if (this._lostSightTime > 5) {
            this._lostSightTime = 0;
            this._setState(State.PATROL);
          }
        } else {
          this._lostSightTime = 0;
        }
        if (distToPlayer < stats.fireRange && this._isAlignedWithPlayer(0.93)) {
          this._setState(State.ATTACK);
          this._attackRunTime = stats.attackRunTime;
        }
        break;
      }

      case State.ATTACK: {
        if (!playerAlive) { this._setState(State.PATROL); break; }
        target = player.position;
        // Arrive: bleed speed when close so we don't overshoot into orbit.
        speedFactor = clamp(distToPlayer / 220, 0.35, 1);
        this._attackRunTime -= dt;

        const aligned = this._isAlignedWithPlayer(0.988);
        this.triggerHeld = aligned && distToPlayer < stats.fireRange;

        if (distToPlayer < 70 || this._attackRunTime <= 0) {
          // Break off the run: peel away, then come back around.
          this._startEvade();
        } else if (distToPlayer > stats.fireRange * 1.35) {
          this._setState(State.CHASE);
        }
        break;
      }

      case State.EVADE: {
        speedFactor = 1;
        if (this.stateTime > this._evadeDuration) {
          this._setState(playerAlive ? State.CHASE : State.PATROL);
        }
        break;
      }

      case State.RETREAT: {
        speedFactor = 1.1; // adrenaline
        if (!playerAlive || distToPlayer > 1400) {
          this._setState(State.PATROL);
          this._pickPatrolWaypoint();
        }
        break;
      }
    }

    // --- Desired direction ---
    if (this.state === State.EVADE) {
      this._desired.copy(this._evadeDir);
    } else if (this.state === State.RETREAT && playerAlive) {
      this._desired.copy(this.position).sub(player.position).normalize();
    } else {
      this._desired.copy(target).sub(this.position);
      const dist = this._desired.length();
      if (dist > 1e-3) this._desired.divideScalar(dist);
      else this._desired.set(0, 0, -1);
      // Lead the player slightly while attacking so bolts connect.
      if (this.state === State.ATTACK && playerAlive) {
        this._desired.addScaledVector(player.velocity, clamp(dist / 900, 0, 0.4) / 900)
          .normalize();
      }
    }

    this._avoidObstacles();
    this._steerToward(this._desired, dt);
    this._applyThrust(speedFactor, dt);
  }

  /** True when the nose points near the player. */
  _isAlignedWithPlayer(minDot) {
    const player = this.game.player;
    this.getForward(this._fwd);
    this._toTarget.copy(player.position).sub(this.position).normalize();
    return this._fwd.dot(this._toTarget) > minDot;
  }

  /**
   * Deflect the desired direction around registered sphere obstacles
   * (planets and large bodies publish into `game.obstacles`).
   */
  _avoidObstacles() {
    const obstacles = this.game.obstacles;
    if (!obstacles) return;
    for (const obstacle of obstacles) {
      const margin = obstacle.radius * 1.15 + 120;
      this._avoid.copy(this.position).sub(obstacle.position);
      const dist = this._avoid.length();
      if (dist > margin * 2.5) continue;
      // Blend in a radial push that dominates as we approach the surface.
      const push = clamp(1 - (dist - margin) / margin, 0, 1);
      if (push > 0) {
        this._avoid.divideScalar(Math.max(dist, 1e-3));
        this._desired.addScaledVector(this._avoid, push * 2.2).normalize();
      }
    }
  }

  /** Proportional controller: world direction → pitch/yaw/roll rates. */
  _steerToward(worldDir, dt) {
    const stats = this.stats;
    this._quatInv.copy(this.quaternion).invert();
    this._local.copy(worldDir).applyQuaternion(this._quatInv);

    // Forward is -Z: derive angular errors.
    const yawError = Math.atan2(this._local.x, -this._local.z);
    const horiz = Math.hypot(this._local.x, this._local.z);
    const pitchError = Math.atan2(this._local.y, horiz);

    const response = damp(6, dt);
    this.angularRates.x = lerp(
      this.angularRates.x, clamp(pitchError * 2.5, -stats.turnRate, stats.turnRate), response,
    );
    this.angularRates.y = lerp(
      this.angularRates.y, clamp(-yawError * 2.5, -stats.turnRate * 0.85, stats.turnRate * 0.85), response,
    );
    // Bank into the turn — reads naturally and hides yaw slip.
    this.angularRates.z = lerp(
      this.angularRates.z, clamp(-yawError * 1.4, -2.2, 2.2), response,
    );
  }

  _applyThrust(speedFactor, dt) {
    const stats = this.stats;
    this.getForward(this._fwd);
    this.velocity.addScaledVector(this._fwd, stats.accel * dt);
    this.velocity.multiplyScalar(Math.exp(-0.6 * dt));

    const maxSpeed = stats.maxSpeed * speedFactor;
    const speed = this.velocity.length();
    if (speed > maxSpeed) {
      this.velocity.multiplyScalar(Math.pow(speed / maxSpeed, -Math.min(1, 8 * dt)));
    }
    this._throttle = clamp(speed / stats.maxSpeed, 0, 1);
  }
}
