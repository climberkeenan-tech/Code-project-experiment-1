import * as THREE from 'three';
import { ObjectPool } from '../core/ObjectPool.js';
import { getBoltTexture } from '../fx/textures.js';
import { clamp } from '../core/math/noise.js';

/**
 * Laser combat for every ship in the game.
 *
 * One system owns all bolts (pooled crossed-plane meshes), fires for both
 * the player (input-driven, with a heat model) and enemies (AI trigger +
 * per-class cadence and aim jitter), and resolves hits with swept
 * segment-vs-sphere tests so fast bolts can't tunnel through targets.
 *
 * Events emitted:
 *   'combat:hit-confirmed' { target, killed }  player's bolt landed (HUD marker)
 *   'player:hit'           { damage }          player took a hit (vignette)
 *   'ship:destroyed'       { ship, byPlayer }  any ship reached zero hull
 */

const BOLT_LIFETIME = 1.6;
const PLAYER_BOLT_SPEED = 950;
const ENEMY_BOLT_SPEED = 620;
const PLAYER_FIRE_INTERVAL = 0.13;
const PLAYER_DAMAGE = 9;
const HEAT_PER_SHOT = 5.5;
const HEAT_COOL_RATE = 26;
const OVERHEAT_LOCK_UNTIL = 30;
const NEAR_MISS_DIST = 20;

const MISSILE_SPEED = 300;
const MISSILE_LIFETIME = 6;
const MISSILE_TURN_RATE = 1.6; // rad/s homing agility (dodgeable)
const MISSILE_HIT_RADIUS = 6; // proximity fuse

export class WeaponSystem {
  /** @param {import('../core/Game.js').Game} game */
  constructor(game) {
    this.game = game;

    // --- Bolt visuals: crossed additive planes, one geometry shared ---
    const geometry = buildBoltGeometry(0.55, 7.0);
    const playerMat = boltMaterial(new THREE.Color(0.5, 2.2, 3.2));
    const enemyMat = boltMaterial(new THREE.Color(4.0, 0.35, 0.28)); // hostile red

    // Missile visual: a stubby glowing warhead (long axis +Y, like bolts).
    const missileGeom = buildMissileGeometry();
    const missileMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(5.0, 1.6, 0.5) });

    /**
     * Pool entries carry a bolt mesh (player/enemy laser) AND a missile mesh;
     * `mesh` is whichever is active this shot. Homing missiles set `homing`,
     * `target`, `turnRate` and `isMissile`.
     */
    this.pool = new ObjectPool(
      () => ({
        mesh: null, // assigned per-acquire
        playerMesh: new THREE.Mesh(geometry, playerMat),
        enemyMesh: new THREE.Mesh(geometry, enemyMat),
        missileMesh: new THREE.Mesh(missileGeom, missileMat),
        velocity: new THREE.Vector3(),
        prevPos: new THREE.Vector3(),
        life: 0,
        damage: 0,
        fromPlayer: false,
        source: null,
        nearMissDone: false,
        homing: false,
        isMissile: false,
        target: null,
        turnRate: 0,
        speed: 0,
      }),
      (bolt) => {
        if (bolt.mesh) bolt.mesh.visible = false;
      },
      24,
    );
    // Attach all pooled meshes once.
    this.pool.free.forEach((bolt) => this._attachBolt(bolt));

    /** Live homing missiles bearing on the player (read by HUD/overlay). */
    this.incoming = [];

    // Player fire state.
    this.playerCooldown = 0;
    this.playerHeat = 0;
    this.overheated = false;
    this._muzzleIndex = 0;

    // Sound rate limiting: at most N zaps per short window.
    this._soundBudget = 0;

    // Scratch objects.
    this._dir = new THREE.Vector3();
    this._muzzle = new THREE.Vector3();
    this._toTarget = new THREE.Vector3();
    this._closest = new THREE.Vector3();
    this._segment = new THREE.Vector3();
    this._jitterQuat = new THREE.Quaternion();
    this._jitterEuler = new THREE.Euler();

    game.origin.onShift((delta) => {
      this.pool.forEachActive((bolt) => {
        bolt.mesh.position.sub(delta);
        bolt.prevPos.sub(delta);
      });
    });
  }

  _attachBolt(bolt) {
    bolt.playerMesh.visible = false;
    bolt.enemyMesh.visible = false;
    bolt.missileMesh.visible = false;
    this.game.engine.scene.add(bolt.playerMesh, bolt.enemyMesh, bolt.missileMesh);
  }

  get playerHeat01() {
    return this.playerHeat / 100;
  }

  /**
   * Spawn one bolt.
   * @param {THREE.Vector3} origin muzzle world position
   * @param {THREE.Vector3} direction normalized firing direction
   * @param {object} opts { fromPlayer, damage, speed, source, inheritVel }
   */
  fire(origin, direction, {
    fromPlayer, damage, speed, source, inheritVel = null,
    missile = false, target = null, life = null,
  }) {
    const bolt = this.pool.acquire();
    if (!bolt.playerMesh.parent) this._attachBolt(bolt);

    bolt.isMissile = missile;
    bolt.homing = missile && !!target;
    bolt.target = target;
    bolt.turnRate = missile ? MISSILE_TURN_RATE : 0;
    bolt.mesh = missile ? bolt.missileMesh : (fromPlayer ? bolt.playerMesh : bolt.enemyMesh);
    bolt.mesh.visible = true;
    bolt.mesh.position.copy(origin);
    bolt.prevPos.copy(origin);
    bolt.velocity.copy(direction).multiplyScalar(speed);
    if (inheritVel) bolt.velocity.add(inheritVel);
    bolt.speed = speed;
    bolt.life = life ?? BOLT_LIFETIME;
    bolt.damage = damage;
    bolt.fromPlayer = fromPlayer;
    bolt.source = source;
    bolt.nearMissDone = false;

    // Orient the mesh's long axis (+Y) along its travel direction.
    bolt.mesh.quaternion.setFromUnitVectors(UP, this._dir.copy(bolt.velocity).normalize());
  }

  update(dt, elapsed) {
    this._soundBudget = Math.min(4, this._soundBudget + dt * 10);
    this._updatePlayerFire(dt);
    this._updateEnemyFire(dt);
    this._updateBolts(dt);
    this._trackIncoming();
    if (this.game.input.consumeCounter()) this._fireCountermeasure();
  }

  /** Refresh the list of live homing missiles bearing on the player. */
  _trackIncoming() {
    const player = this.game.player;
    const prevCount = this.incoming.length;
    this.incoming.length = 0;
    if (!player || !player.alive) return;
    this.pool.forEachActive((bolt) => {
      if (bolt.isMissile && !bolt.fromPlayer && bolt.target === player) {
        this.incoming.push(bolt);
      }
    });
    // Announce the first missile of a fresh wave (HUD warning + alarm).
    if (this.incoming.length > prevCount && prevCount === 0) {
      this.game.events.emit('missile:incoming', { count: this.incoming.length });
    } else if (this.incoming.length === 0 && prevCount > 0) {
      this.game.events.emit('missile:cleared');
    }
  }

  /** Point-defense: destroy the nearest incoming missile. */
  _fireCountermeasure() {
    const player = this.game.player;
    if (!player || this.incoming.length === 0) return;
    let nearest = null;
    let nearestSq = Infinity;
    for (const m of this.incoming) {
      const d = m.mesh.position.distanceToSquared(player.position);
      if (d < nearestSq) { nearestSq = d; nearest = m; }
    }
    if (!nearest) return;
    if (this.game.explosions) this.game.explosions.spawn(nearest.mesh.position, 0.6);
    this.game.audio?.playNoise?.({ duration: 0.25, gain: 0.4, filterFreq: 2200, filterEnd: 300 });
    this.game.events.emit('missile:destroyed');
    this.pool.release(nearest);
    const i = this.incoming.indexOf(nearest);
    if (i !== -1) this.incoming.splice(i, 1);
  }

  // ------------------------------------------------------------------
  // Firing
  // ------------------------------------------------------------------

  _updatePlayerFire(dt) {
    const player = this.game.player;
    this.playerCooldown -= dt;

    // Heat dissipation & overheat recovery.
    this.playerHeat = Math.max(0, this.playerHeat - HEAT_COOL_RATE * dt);
    if (this.overheated && this.playerHeat <= OVERHEAT_LOCK_UNTIL) {
      this.overheated = false;
      this.game.audio.playTone({ type: 'sine', freq: 660, freqEnd: 880, duration: 0.12, gain: 0.12 });
    }

    if (!player || !player.alive) return;
    if (!this.game.input.state.fire || this.playerCooldown > 0 || this.overheated) return;

    // Alternate wingtip cannons for the classic strobe effect.
    this._muzzleIndex = (this._muzzleIndex + 1) % player.hardpoints.length;
    const hardpoint = player.hardpoints[this._muzzleIndex];
    this._muzzle.copy(hardpoint).applyQuaternion(player.quaternion).add(player.position);
    player.getForward(this._dir);

    this.fire(this._muzzle, this._dir, {
      fromPlayer: true,
      damage: PLAYER_DAMAGE * player.upgrades.weapon,
      speed: PLAYER_BOLT_SPEED,
      source: player,
      inheritVel: player.velocity,
    });

    this.playerCooldown = PLAYER_FIRE_INTERVAL;
    this.playerHeat += HEAT_PER_SHOT;
    if (this.playerHeat >= 100) {
      this.overheated = true;
      this.game.audio.playTone({ type: 'sawtooth', freq: 320, freqEnd: 90, duration: 0.5, gain: 0.2 });
    }

    if (this._soundBudget >= 1) {
      this._soundBudget -= 1;
      this.game.audio.playTone({
        type: 'square', freq: 1150, freqEnd: 240, duration: 0.14, gain: 0.16,
        detune: (Math.random() - 0.5) * 60,
      });
    }
  }

  _updateEnemyFire(dt) {
    const enemies = this.game.enemies;
    const player = this.game.player;
    if (!enemies || !player) return;

    for (const enemy of enemies.enemies) {
      if (!enemy.alive || !enemy.triggerHeld || enemy.fireCooldown > 0) continue;

      enemy.fireCooldown = enemy.stats.fireInterval * (0.85 + Math.random() * 0.3);

      const hardpoint = enemy.hardpoints[Math.floor(Math.random() * enemy.hardpoints.length)];
      this._muzzle.copy(hardpoint).applyQuaternion(enemy.quaternion).add(enemy.position);
      const dist = this._toTarget.copy(player.position).sub(this._muzzle).length();

      if (enemy.stats.weapon === 'missile') {
        // Launch a homing missile roughly toward the player; it does the
        // tracking. Fired forward-ish so it clears the hull, then homes.
        enemy.getForward(this._dir);
        this._toTarget.copy(player.position).sub(this._muzzle).normalize();
        this._dir.lerp(this._toTarget, 0.5).normalize();
        this.fire(this._muzzle, this._dir, {
          fromPlayer: false,
          damage: enemy.stats.damage,
          speed: MISSILE_SPEED,
          source: enemy,
          inheritVel: enemy.velocity,
          missile: true,
          target: player,
          life: MISSILE_LIFETIME,
        });
        this.game.audio?.playTone?.({ type: 'sawtooth', freq: 260, freqEnd: 520, duration: 0.3, gain: 0.16 });
        continue;
      }

      // Lasers: aim at a lead point with per-class-accuracy jitter.
      const leadTime = dist / ENEMY_BOLT_SPEED;
      this._toTarget.copy(player.position)
        .addScaledVector(player.velocity, leadTime * 1.0)
        .sub(this._muzzle)
        .normalize();

      const jitter = (1 - (enemy.stats.accuracy ?? 0.7)) * 0.06;
      this._jitterEuler.set(
        (Math.random() - 0.5) * jitter,
        (Math.random() - 0.5) * jitter,
        0,
      );
      this._jitterQuat.setFromEuler(this._jitterEuler);
      this._toTarget.applyQuaternion(this._jitterQuat);

      this.fire(this._muzzle, this._toTarget, {
        fromPlayer: false,
        damage: enemy.stats.damage,
        speed: ENEMY_BOLT_SPEED,
        source: enemy,
        inheritVel: enemy.velocity,
      });

      // Distance-attenuated enemy laser report.
      const gain = clamp(1 - dist / 1600, 0, 1) * 0.14;
      if (gain > 0.01 && this._soundBudget >= 1) {
        this._soundBudget -= 1;
        this.game.audio.playTone({
          type: 'sawtooth', freq: 620, freqEnd: 150, duration: 0.18, gain,
          detune: (Math.random() - 0.5) * 80,
        });
      }
    }
  }

  // ------------------------------------------------------------------
  // Simulation & hit resolution
  // ------------------------------------------------------------------

  _updateBolts(dt) {
    this.pool.forEachActive((bolt) => {
      bolt.life -= dt;
      if (bolt.life <= 0) {
        this.pool.release(bolt);
        return;
      }

      // Homing missiles bend their velocity toward the target, capped by a
      // turn rate so a jinking player can shake or outrun them.
      if (bolt.homing && bolt.target && bolt.target.alive) {
        this._toTarget.copy(bolt.target.position).sub(bolt.mesh.position);
        const dist = this._toTarget.length();
        if (dist > 1e-3) {
          this._toTarget.divideScalar(dist);
          this._dir.copy(bolt.velocity).normalize();
          const maxCos = Math.cos(bolt.turnRate * dt);
          const dot = clamp(this._dir.dot(this._toTarget), -1, 1);
          if (dot < maxCos) {
            // Rotate _dir toward target by the turn-rate step (slerp-ish).
            this._dir.lerp(this._toTarget, 1 - Math.cos(bolt.turnRate * dt)).normalize();
          } else {
            this._dir.copy(this._toTarget);
          }
          bolt.velocity.copy(this._dir).multiplyScalar(bolt.speed);
          bolt.mesh.quaternion.setFromUnitVectors(UP, this._dir);
        }
      }

      bolt.prevPos.copy(bolt.mesh.position);
      bolt.mesh.position.addScaledVector(bolt.velocity, dt);

      if (this._resolveHit(bolt)) {
        this.pool.release(bolt);
      }
    });
  }

  /**
   * Swept test of this frame's segment against valid targets.
   * @returns {boolean} true if the bolt should be destroyed
   */
  _resolveHit(bolt) {
    const game = this.game;

    if (bolt.fromPlayer) {
      const enemies = game.enemies?.enemies;
      if (enemies) {
        for (const enemy of enemies) {
          if (!enemy.alive) continue;
          const distSq = this._segmentPointDistanceSq(
            bolt.prevPos, bolt.mesh.position, enemy.position,
          );
          const hitRadius = enemy.radius;
          if (distSq < hitRadius * hitRadius) {
            this._applyHit(bolt, enemy, true);
            return true;
          }
          if (!bolt.nearMissDone && distSq < NEAR_MISS_DIST * NEAR_MISS_DIST) {
            bolt.nearMissDone = true;
            enemy.notifyNearMiss();
          }
        }
      }
    } else {
      const player = game.player;
      if (player && player.alive) {
        const distSq = this._segmentPointDistanceSq(
          bolt.prevPos, bolt.mesh.position, player.position,
        );
        // Missiles carry a proximity fuse (larger detonation radius).
        const hitR = bolt.isMissile ? MISSILE_HIT_RADIUS : player.radius;
        if (distSq < hitR * hitR) {
          this._applyHit(bolt, player, false);
          return true;
        }
      }
    }

    // Bolts die against large bodies. Planets get a precise terrain test
    // once inside the padded sphere (bolts must survive low-altitude
    // dogfights over mountains); plain spheres handle everything else.
    for (const obstacle of game.obstacles) {
      const distSq = bolt.mesh.position.distanceToSquared(obstacle.position);
      if (distSq >= obstacle.radius * obstacle.radius) continue;
      if (!obstacle.planet) return true;
      if (obstacle.planet.getAltitude(bolt.mesh.position) <= 0) return true;
    }

    // Bolts chip asteroids: spark burst, chance of shaking salvage loose.
    // Sampled at three points along this frame's travel so fast bolts
    // can't tunnel through small rocks.
    for (const field of game.asteroidFields) {
      let rock = field.sphereHit(bolt.mesh.position, 1.2);
      if (!rock) {
        this._closest.lerpVectors(bolt.prevPos, bolt.mesh.position, 0.5);
        rock = field.sphereHit(this._closest, 1.2)
          ?? field.sphereHit(bolt.prevPos, 1.2);
      }
      if (rock) {
        if (game.explosions) game.explosions.spawn(bolt.mesh.position, 0.28);
        if (bolt.fromPlayer && game.pickups && Math.random() < 0.14) {
          game.pickups.spawnBurst(bolt.mesh.position, 1);
        }
        return true;
      }
    }

    return false;
  }

  _applyHit(bolt, target, targetIsEnemy) {
    const game = this.game;
    const result = target.applyDamage(bolt.damage);

    // Missiles detonate with a visible blast on impact.
    if (bolt.isMissile && game.explosions) {
      game.explosions.spawn(bolt.mesh.position, 0.7);
    }

    // Shield flash at the impact point.
    if (result.shieldAbsorbed > 0 && target.shieldFx) {
      target.shieldFx.flash(bolt.mesh.position, 0.8);
    }

    if (targetIsEnemy) {
      target.notifyHit();
      game.events.emit('combat:hit-confirmed', { target, killed: result.destroyed });
      if (this._soundBudget >= 0.5) {
        this._soundBudget -= 0.5;
        game.audio.playTone({
          type: 'triangle', freq: 1900, freqEnd: 1100, duration: 0.06, gain: 0.08,
        });
      }
    } else {
      game.events.emit('player:hit', { damage: bolt.damage });
      game.events.emit('camera:shake', 0.22);
      if (result.shieldAbsorbed > 0 && result.hullDamage === 0) {
        game.audio.playTone({ type: 'sine', freq: 480, freqEnd: 300, duration: 0.22, gain: 0.3 });
      } else {
        game.audio.playNoise({ duration: 0.3, gain: 0.4, filterFreq: 1400, filterEnd: 160 });
      }
    }

    if (result.destroyed) {
      game.events.emit('ship:destroyed', { ship: target, byPlayer: bolt.fromPlayer });
    }
  }

  /** Squared distance from point to segment AB. */
  _segmentPointDistanceSq(a, b, point) {
    this._segment.copy(b).sub(a);
    const lengthSq = this._segment.lengthSq();
    if (lengthSq < 1e-8) return a.distanceToSquared(point);
    let t = this._closest.copy(point).sub(a).dot(this._segment) / lengthSq;
    t = clamp(t, 0, 1);
    this._closest.copy(a).addScaledVector(this._segment, t);
    return this._closest.distanceToSquared(point);
  }
}

const UP = new THREE.Vector3(0, 1, 0);

/** Two crossed planes sharing one geometry, long axis +Y. */
function buildBoltGeometry(width, length) {
  const planeA = new THREE.PlaneGeometry(width, length);
  const planeB = planeA.clone().rotateY(Math.PI / 2);
  const merged = mergeGeometries(planeA, planeB);
  planeA.dispose();
  planeB.dispose();
  return merged;
}

/** Minimal two-geometry merge (positions/uvs/normals, non-indexed). */
function mergeGeometries(a, b) {
  const geomA = a.toNonIndexed();
  const geomB = b.toNonIndexed();
  const posA = geomA.getAttribute('position');
  const posB = geomB.getAttribute('position');
  const uvA = geomA.getAttribute('uv');
  const uvB = geomB.getAttribute('uv');

  const positions = new Float32Array((posA.count + posB.count) * 3);
  positions.set(posA.array, 0);
  positions.set(posB.array, posA.count * 3);
  const uvs = new Float32Array((uvA.count + uvB.count) * 2);
  uvs.set(uvA.array, 0);
  uvs.set(uvB.array, uvA.count * 2);

  const merged = new THREE.BufferGeometry();
  merged.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  merged.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  geomA.dispose();
  geomB.dispose();
  return merged;
}

function boltMaterial(color) {
  return new THREE.MeshBasicMaterial({
    map: getBoltTexture(64),
    color,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
}

/** A small warhead: a cone body (tip along -Y so +Y is travel/back). */
function buildMissileGeometry() {
  const g = new THREE.ConeGeometry(0.45, 2.4, 6);
  // Cone tip points +Y by default; travel orientation aligns +Y to velocity,
  // so flip it so the pointed nose leads.
  g.rotateX(Math.PI);
  return g;
}
