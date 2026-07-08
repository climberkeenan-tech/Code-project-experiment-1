import * as THREE from 'three';
import { ObjectPool } from '../core/ObjectPool.js';
import { clamp } from '../core/math/noise.js';

/**
 * Salvage pickups: glowing resource shards left behind by destroyed ships
 * (and seeded at some discovery sites).
 *
 * Shards drift from the wreck, then magnet toward the player when close and
 * chime on collection. Pooled octahedron meshes with an HDR emissive core.
 */

const MAGNET_RANGE = 160;
const COLLECT_RANGE = 10;
const LIFETIME = 50;

export class Pickups {
  /** @param {import('../core/Game.js').Game} game */
  constructor(game) {
    this.game = game;

    const geometry = new THREE.OctahedronGeometry(0.9, 0);
    const material = new THREE.MeshStandardMaterial({
      color: 0x4a3823,
      emissive: new THREE.Color(1.7, 0.85, 0.28), // warm ember (was cyan)
      metalness: 0.4,
      roughness: 0.3,
      flatShading: true,
    });

    this.pool = new ObjectPool(
      () => ({
        mesh: new THREE.Mesh(geometry, material),
        velocity: new THREE.Vector3(),
        life: 0,
        value: 1,
        spin: Math.random() * 2 + 1,
      }),
      (shard) => {
        shard.mesh.visible = false;
      },
      12,
    );
    this.pool.free.forEach((shard) => {
      shard.mesh.visible = false;
      game.engine.scene.add(shard.mesh);
    });

    this._toPlayer = new THREE.Vector3();

    game.events.on('ship:destroyed', ({ ship, byPlayer }) => {
      // Only enemy wrecks drop salvage (the player's wreck is... the player).
      if (ship !== game.player) {
        this.spawnBurst(ship.position, ship.stats?.resources ?? 3);
      }
    });

    game.origin.onShift((delta) => {
      this.pool.forEachActive((shard) => shard.mesh.position.sub(delta));
    });
  }

  /**
   * Scatter shards from a point.
   * @param {THREE.Vector3} position
   * @param {number} count
   */
  spawnBurst(position, count) {
    for (let i = 0; i < count; i++) {
      const shard = this.pool.acquire();
      if (!shard.mesh.parent) this.game.engine.scene.add(shard.mesh);
      shard.mesh.visible = true;
      shard.mesh.position.copy(position);
      shard.velocity.set(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5,
      ).normalize().multiplyScalar(14 + Math.random() * 22);
      shard.life = LIFETIME;
      shard.value = 1;
    }
  }

  update(dt, elapsed) {
    const player = this.game.player;
    this.pool.forEachActive((shard) => {
      shard.life -= dt;
      if (shard.life <= 0) {
        this.pool.release(shard);
        return;
      }

      // Drift with drag; twinkle-spin for visibility.
      shard.velocity.multiplyScalar(Math.exp(-0.8 * dt));
      shard.mesh.rotation.y += shard.spin * dt;
      shard.mesh.rotation.x += shard.spin * 0.6 * dt;

      if (player && player.alive) {
        this._toPlayer.copy(player.position).sub(shard.mesh.position);
        const dist = this._toPlayer.length();
        if (dist < COLLECT_RANGE + player.radius) {
          this._collect(shard);
          return;
        }
        if (dist < MAGNET_RANGE) {
          // Acceleration ramps hard as the shard closes in.
          const pull = 220 * (1 - dist / MAGNET_RANGE) + 40;
          shard.velocity.addScaledVector(this._toPlayer.normalize(), pull * dt);
        }
      }

      shard.mesh.position.addScaledVector(shard.velocity, dt);
    });
  }

  _collect(shard) {
    const game = this.game;
    game.player.resources += shard.value;
    this.pool.release(shard);
    // Rising chime, slight random pitch so streams of pickups arpeggiate.
    const base = 880 + Math.random() * 220;
    game.audio.playTone({ type: 'sine', freq: base, freqEnd: base * 1.6, duration: 0.18, gain: 0.18 });
    game.events.emit('pickup:collected');
  }
}
