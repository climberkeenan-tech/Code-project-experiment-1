import * as THREE from 'three';
import { ShipBase } from '../ship/ShipBase.js';
import { createEnemyShip } from '../ship/ShipFactory.js';
import { EngineGlow } from '../fx/EngineGlow.js';
import { ShieldEffect } from '../fx/ShieldEffect.js';
import { Rng } from '../core/math/rng.js';
import { damp, clamp, lerp } from '../core/math/noise.js';

/**
 * Enemy ship classes. Stats shape behavior as much as durability: scouts
 * detect far, turn hard and dodge constantly but melt under fire; the Planet
 * Destroyer is a slow, near-unkillable boss you avoid until much later.
 *
 * Balance philosophy (from the design bible / playtest): enemies move slower
 * than the player's cruise so they never feel unfair to catch, are large
 * enough to hit, and actually land shots (per-class `accuracy`), scaling in
 * threat by `level`. `credits` is the kill reward; `weapon` selects laser vs
 * homing missile; `displayName` shows in target boxes.
 */
export const ENEMY_TYPES = {
  scout: {
    displayName: 'Scout', level: 10, credits: 20, weapon: 'bolt', accuracy: 0.6,
    hull: 28, shield: 12, accel: 90, maxSpeed: 150, turnRate: 1.9,
    fireRange: 300, fireInterval: 1.2, damage: 9, detectRange: 1200,
    evadeSkill: 0.4, attackRunTime: 4, resources: 2,
  },
  fighter: {
    displayName: 'Fighter', level: 20, credits: 50, weapon: 'bolt', accuracy: 0.7,
    hull: 50, shield: 25, accel: 80, maxSpeed: 140, turnRate: 1.4,
    fireRange: 360, fireInterval: 0.9, damage: 15, detectRange: 950,
    evadeSkill: 0.28, attackRunTime: 6, resources: 4,
  },
  heavy: {
    displayName: 'Heavy Assault', level: 40, credits: 160, weapon: 'bolt', accuracy: 0.8,
    hull: 150, shield: 70, accel: 60, maxSpeed: 105, turnRate: 0.8,
    fireRange: 460, fireInterval: 1.6, damage: 28, detectRange: 850,
    evadeSkill: 0.12, attackRunTime: 9, resources: 10,
  },
  cruiser: {
    displayName: 'Missile Cruiser', level: 60, credits: 420, weapon: 'missile', accuracy: 0.85,
    hull: 240, shield: 130, accel: 45, maxSpeed: 90, turnRate: 0.6,
    fireRange: 1100, fireInterval: 3.2, damage: 48, detectRange: 1400,
    evadeSkill: 0.08, attackRunTime: 14, resources: 16,
    kiteRange: 620, // prefers to hold this distance and lob missiles
  },
  destroyer: {
    displayName: 'Planet Destroyer', level: 100, credits: 10000, weapon: 'missile', accuracy: 0.9,
    hull: 2200, shield: 1000, accel: 22, maxSpeed: 55, turnRate: 0.22,
    fireRange: 1500, fireInterval: 2.4, damage: 70, detectRange: 2400,
    evadeSkill: 0.02, attackRunTime: 40, resources: 60,
    kiteRange: 900,
  },
  // --- Red-faction capitals (fleet-combat expansion) ---
  // `turret: true` = multi-directional fire: no nose alignment needed, so
  // these slow hulls stay dangerous from any angle.
  warship: {
    displayName: 'Battlecruiser', level: 75, credits: 1500, weapon: 'bolt', accuracy: 0.8,
    turret: true,
    hull: 900, shield: 400, accel: 30, maxSpeed: 70, turnRate: 0.3,
    fireRange: 700, fireInterval: 0.55, damage: 18, detectRange: 1600,
    evadeSkill: 0.02, attackRunTime: 30, resources: 30,
    kiteRange: 420,
  },
  // THE APEX: a roaming hunter dreadnought — the highest-level threat. It
  // always knows where you are and closes in slowly, forever. It shows on
  // the radar like a planet (a nav arc, not an arrow) and only earns threat
  // arrows once it's near enough to actually hit you. Avoid it — or bring a
  // fleet and end it for the biggest bounty in the game.
  apex: {
    displayName: 'Ravager Dreadnought', level: 120, credits: 25000, weapon: 'missile',
    accuracy: 0.92, turret: true, deploys: 'fighter', apex: true,
    hull: 6000, shield: 2500, accel: 20, maxSpeed: 58, turnRate: 0.2,
    fireRange: 1600, fireInterval: 2.0, damage: 85, detectRange: 1e9,
    evadeSkill: 0, attackRunTime: 9999, resources: 120,
    kiteRange: 900,
  },
  // Deploys escort fighters while it fights — kill the carrier to stop the flow.
  redcarrier: {
    displayName: 'Dreadcarrier', level: 90, credits: 4000, weapon: 'missile', accuracy: 0.85,
    turret: true, deploys: 'fighter',
    hull: 1500, shield: 700, accel: 24, maxSpeed: 60, turnRate: 0.24,
    fireRange: 1300, fireInterval: 3.5, damage: 55, detectRange: 2000,
    evadeSkill: 0.01, attackRunTime: 40, resources: 45,
    kiteRange: 800,
  },
};

// Playtest: "the game is really easy — make the enemy ships more dangerous,
// raise their power by 25%." A flat buff to every hostile's hull, shield,
// and gun, applied once at load so every spawn path gets it.
for (const stats of Object.values(ENEMY_TYPES)) {
  stats.hull = Math.round(stats.hull * 1.25);
  stats.shield = Math.round(stats.shield * 1.25);
  stats.damage = Math.round(stats.damage * 1.25);
}

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

    /**
     * Who this ship is hunting: the player, a deployed escort, or an allied
     * traffic ship (playtest: "have them be killing some blue ships and even
     * my ships"). A third of every class prefers the blue ships; re-picked
     * every second or two so locks stay sticky but never stale.
     */
    this.victim = null;
    this._victimTimer = this.rng.range(0, 1.2);

    /** Encounter-director region this ship belongs to (null = scripted). */
    this.region = null;

    this.glow = new EngineGlow(this.visual, this.engines, this.glowColor, this.engineScale);
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

  /**
   * Swap the procedural stand-in hull for the real red-tinted model once it
   * finishes streaming in (slow connections spawn enemies before the FBX
   * downloads land). No-op when the ship already wears its model.
   */
  refreshVisual() {
    if (this.rigModeled || !this.alive) return;
    const rig = createEnemyShip(this.type);
    if (rig.modeled === false) return; // model still not ready
    this.object3D.remove(this.visual);
    this.shieldFx.dispose();
    this.visual = rig.group;
    this.object3D.add(this.visual);
    this.radius = rig.radius;
    this.engines = rig.engines;
    this.hardpoints = rig.hardpoints;
    this.glowColor = rig.glowColor;
    this.engineScale = rig.engineScale ?? 1;
    this.rigModeled = true;
    this.glow = new EngineGlow(this.visual, this.engines, this.glowColor, this.engineScale);
    this.shieldFx = new ShieldEffect(
      this.object3D, this.radius * 1.35, new THREE.Color(1.6, 0.8, 0.4),
    );
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

  /**
   * Choose who to hunt. The player is the default prey, but allied ships
   * are fair game: each candidate is scored by distance with a per-ship
   * bias — ally-hunters (every third ship) see blue ships as "closer",
   * everyone else needs an ally to be genuinely nearer to switch. The apex
   * only ever hunts the player.
   */
  _pickVictim(dt, playerAlive) {
    const game = this.game;
    const player = game.player;
    if (this.stats.apex) {
      this.victim = playerAlive ? player : null;
      return this.victim;
    }
    this._victimTimer -= dt;
    const current = this.victim;
    const currentValid = current
      && (current === player ? playerAlive : current.alive);
    if (currentValid && this._victimTimer > 0) return current;
    if (!currentValid) this.victim = null;
    this._victimTimer = 1.2 + this.rng.range(0, 0.8);

    const allyBias = this.id % 3 === 0 ? 0.55 : 1.6;
    let best = playerAlive ? player : null;
    let bestScore = playerAlive
      ? this.position.distanceToSquared(player.position) : Infinity;
    const consider = (ship) => {
      if (!ship || !ship.alive) return;
      const score = this.position.distanceToSquared(ship.position) * allyBias * allyBias;
      if (score < bestScore) { bestScore = score; best = ship; }
    };
    for (const esc of game.fleet?.escorts ?? []) consider(esc);
    for (const ally of game.traffic?.ships ?? []) consider(ally);
    this.victim = best;
    return best;
  }

  _startEvade() {
    // Dodge perpendicular to the line of sight, random handedness.
    const from = this.victim ?? this.game.player;
    this._toTarget.copy(from.position).sub(this.position).normalize();
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
    const victim = this._pickVictim(dt, playerAlive);
    const distToVictim = victim
      ? this._toTarget.copy(victim.position).sub(this.position).length()
      : Infinity;

    this._updateAI(dt, distToVictim, !!victim);

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
  _updateAI(dt, distToVictim, victimAlive) {
    const stats = this.stats;
    const victim = this.victim;
    this.triggerHeld = false;

    // The apex never patrols, never loses you, never retreats.
    if (stats.apex && victimAlive && this.state === State.PATROL) {
      this._setState(State.CHASE);
    }

    // Universal retreat check (apex excluded: it does not know fear; the
    // Leviathan's garrison sets `fearless` — it defends to the death).
    if (!stats.apex && !this.fearless
      && this.state !== State.RETREAT && this.hull / this.hullMax < 0.28) {
      this._setState(State.RETREAT);
      this.game.events.emit('enemy:retreating', this);
    }

    let speedFactor = 0.45; // patrol cruise
    let target = this.waypoint;

    switch (this.state) {
      case State.PATROL: {
        if (this.position.distanceTo(this.waypoint) < 60) this._pickPatrolWaypoint();
        if (victimAlive && distToVictim < stats.detectRange) {
          this._setState(State.CHASE);
          this.game.events.emit('enemy:detected-player', this);
        }
        break;
      }

      case State.CHASE: {
        if (!victimAlive) { this._setState(State.PATROL); break; }
        target = victim.position;
        speedFactor = 1;
        // Lose interest if the prey outruns detection for a while.
        if (distToVictim > stats.detectRange * 1.8) {
          this._lostSightTime += dt;
          if (this._lostSightTime > 5) {
            this._lostSightTime = 0;
            this._setState(State.PATROL);
          }
        } else {
          this._lostSightTime = 0;
        }
        // Turret ships open fire from any angle; gunships must line up first.
        if (distToVictim < stats.fireRange && (stats.turret || this._isAlignedWith(victim, 0.93))) {
          this._setState(State.ATTACK);
          this._attackRunTime = stats.attackRunTime;
        }
        break;
      }

      case State.ATTACK: {
        if (!victimAlive) { this._setState(State.PATROL); break; }
        target = victim.position;
        this._attackRunTime -= dt;

        if (stats.weapon === 'missile') {
          // Missile boats kite: hold at range and lob homing warheads.
          // Aim is forgiving because the missile does the tracking; turret
          // hulls launch from any facing.
          const kite = stats.kiteRange || 600;
          speedFactor = distToVictim < kite ? 0.45 : 0.85;
          this.triggerHeld = distToVictim < stats.fireRange
            && (stats.turret || this._isAlignedWith(victim, 0.72));
          if (this._attackRunTime <= 0) this._startEvade();
          else if (distToVictim > stats.fireRange * 1.4) this._setState(State.CHASE);
        } else if (stats.turret) {
          // Turret gun platforms: hold station near kite range, fire freely.
          const kite = stats.kiteRange || 400;
          speedFactor = distToVictim < kite ? 0.3 : 0.7;
          this.triggerHeld = distToVictim < stats.fireRange;
          if (distToVictim > stats.fireRange * 1.5) this._setState(State.CHASE);
        } else {
          // Gunships close in and strafe. Bleed speed near the merge.
          speedFactor = clamp(distToVictim / 220, 0.35, 1);
          // Loosened from 0.988 so enemies actually land shots (playtest fix).
          this.triggerHeld = this._isAlignedWith(victim, 0.965) && distToVictim < stats.fireRange;
          if (distToVictim < 70 || this._attackRunTime <= 0) {
            this._startEvade();
          } else if (distToVictim > stats.fireRange * 1.35) {
            this._setState(State.CHASE);
          }
        }

        // Carriers launch escorts while engaged (capped so the swarm stays fair).
        if (stats.deploys) {
          this._deployCooldown = (this._deployCooldown ?? 2) - dt;
          if (this._deployCooldown <= 0 && this.game.enemies.enemies.length < 14) {
            this._deployCooldown = 9;
            const spawnPos = this.position.clone();
            spawnPos.x += (Math.random() - 0.5) * 60;
            spawnPos.y += 20;
            const fighter = this.game.enemies.spawn(stats.deploys, spawnPos, this.homeCenter);
            fighter.region = this.region;
            fighter.state = State.CHASE; // launches hot
          }
        }
        break;
      }

      case State.EVADE: {
        speedFactor = 1;
        if (this.stateTime > this._evadeDuration) {
          this._setState(victimAlive ? State.CHASE : State.PATROL);
        }
        break;
      }

      case State.RETREAT: {
        speedFactor = 1.1; // adrenaline
        if (!victimAlive || distToVictim > 1400) {
          this._setState(State.PATROL);
          this._pickPatrolWaypoint();
        }
        break;
      }
    }

    // --- Desired direction ---
    const kiteAway = this.state === State.ATTACK && stats.weapon === 'missile'
      && victimAlive && distToVictim < (stats.kiteRange || 600) * 0.8;
    if (this.state === State.EVADE) {
      this._desired.copy(this._evadeDir);
    } else if ((this.state === State.RETREAT || kiteAway) && victimAlive) {
      this._desired.copy(this.position).sub(victim.position).normalize();
    } else {
      this._desired.copy(target).sub(this.position);
      const dist = this._desired.length();
      if (dist > 1e-3) this._desired.divideScalar(dist);
      else this._desired.set(0, 0, -1);
      // Lead the prey slightly while attacking so bolts connect.
      if (this.state === State.ATTACK && victimAlive) {
        this._desired.addScaledVector(victim.velocity, clamp(dist / 900, 0, 0.4) / 900)
          .normalize();
      }
    }

    this._avoidObstacles();
    this._steerToward(this._desired, dt);
    this._applyThrust(speedFactor, dt);
  }

  /** True when the nose points near the given ship. */
  _isAlignedWith(ship, minDot) {
    this.getForward(this._fwd);
    this._toTarget.copy(ship.position).sub(this.position).normalize();
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

  /**
   * Release per-instance GPU resources. Geometry and class materials are
   * shared caches and stay alive; only the shield bubble is per-ship.
   */
  dispose() {
    this.shieldFx.dispose();
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
