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

export class WeaponSystem {
  /** @param {import('../core/Game.js').Game} game */
  constructor(game) {
    this.game = game;

    // --- Bolt visuals: crossed additive planes, one geometry shared ---
    const geometry = buildBoltGeometry(0.55, 7.0);
    const playerMat = boltMaterial(new THREE.Color(0.5, 2.2, 3.2));
    const enemyMat = boltMaterial(new THREE.Color(3.4, 0.9, 0.35));

    /**
     * Pool entries: { mesh, velocity, life, damage, fromPlayer, source,
     * prevPos } — mesh carries current position.
     */
    this.pool = new ObjectPool(
      () => ({
        mesh: null, // assigned per-acquire (player/enemy material)
        playerMesh: new THREE.Mesh(geometry, playerMat),
        enemyMesh: new THREE.Mesh(geometry, enemyMat),
        velocity: new THREE.Vector3(),
        prevPos: new THREE.Vector3(),
        life: 0,
        damage: 0,
        fromPlayer: false,
        source: null,
        nearMissDone: false,
      }),
      (bolt) => {
        if (bolt.mesh) bolt.mesh.visible = false;
      },
      24,
    );
    // Attach all pooled meshes once.
    this.pool.free.forEach((bolt) => this._attachBolt(bolt));

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
    this.game.engine.scene.add(bolt.playerMesh, bolt.enemyMesh);
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
  fire(origin, direction, { fromPlayer, damage, speed, source, inheritVel = null }) {
    const bolt = this.pool.acquire();
    if (!bolt.playerMesh.parent) this._attachBolt(bolt);

    bolt.mesh = fromPlayer ? bolt.playerMesh : bolt.enemyMesh;
    bolt.mesh.visible = true;
    bolt.mesh.position.copy(origin);
    bolt.prevPos.copy(origin);
    bolt.velocity.copy(direction).multiplyScalar(speed);
    if (inheritVel) bolt.velocity.add(inheritVel);
    bolt.life = BOLT_LIFETIME;
    bolt.damage = damage;
    bolt.fromPlayer = fromPlayer;
    bolt.source = source;
    bolt.nearMissDone = false;

    // Orient the bolt's long axis (+Y) along its travel direction.
    bolt.mesh.quaternion.setFromUnitVectors(UP, this._dir.copy(bolt.velocity).normalize());
  }

  update(dt, elapsed) {
    this._soundBudget = Math.min(4, this._soundBudget + dt * 10);
    this._updatePlayerFire(dt);
    this._updateEnemyFire(dt);
    this._updateBolts(dt);
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

      // Fire from alternating hardpoints toward the player with lead + jitter.
      const hardpoint = enemy.hardpoints[Math.floor(Math.random() * enemy.hardpoints.length)];
      this._muzzle.copy(hardpoint).applyQuaternion(enemy.quaternion).add(enemy.position);

      // Aim at a lead point so bolts are dangerous but dodgeable.
      const dist = this._toTarget.copy(player.position).sub(this._muzzle).length();
      const leadTime = dist / ENEMY_BOLT_SPEED;
      this._toTarget.copy(player.position)
        .addScaledVector(player.velocity, leadTime * 0.85)
        .sub(this._muzzle)
        .normalize();

      // Angular jitter (~1.5°) keeps enemy fire fair.
      this._jitterEuler.set(
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05,
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
        if (distSq < player.radius * player.radius) {
          this._applyHit(bolt, player, false);
          return true;
        }
      }
    }

    // Bolts die against large bodies (planets, stations).
    for (const obstacle of game.obstacles) {
      const distSq = bolt.mesh.position.distanceToSquared(obstacle.position);
      if (distSq < obstacle.radius * obstacle.radius) return true;
    }

    return false;
  }

  _applyHit(bolt, target, targetIsEnemy) {
    const game = this.game;
    const result = target.applyDamage(bolt.damage);

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
