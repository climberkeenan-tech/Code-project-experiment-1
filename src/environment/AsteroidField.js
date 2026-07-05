import * as THREE from 'three';
import { SimplexNoise } from '../core/math/noise.js';
import { Rng } from '../core/math/rng.js';
import { clamp } from '../core/math/noise.js';

/**
 * An instanced asteroid field: hundreds of tumbled rocks rendered in three
 * draw calls (one per shape variant), with a uniform-grid spatial hash for
 * cheap collision queries from the player and projectiles.
 *
 * Shooting a rock throws sparks and has a chance to shake loose salvage —
 * fields are hazards *and* mines.
 */
export class AsteroidField {
  /**
   * @param {import('../core/Game.js').Game} game
   * @param {object} opts
   * @param {THREE.Vector3} opts.center render-space center at creation
   * @param {number} opts.radius field extent
   * @param {number} opts.count rock count
   * @param {string|number} opts.seed
   * @param {'cluster'|'belt'} [opts.shape]
   */
  constructor(game, { center, radius, count, seed, shape = 'cluster' }) {
    this.game = game;
    this.center = center.clone();
    this.radius = radius;

    const rng = new Rng(`asteroids:${seed}`);
    this.group = new THREE.Group();
    this.group.position.copy(this.center);

    // --- Geometry variants: noise-displaced icosahedra ---
    const variants = [];
    for (let v = 0; v < 3; v++) {
      variants.push(createRockGeometry(`${seed}:rock${v}`, 1 + v));
    }
    const material = new THREE.MeshStandardMaterial({
      color: 0x8a8177,
      roughness: 0.95,
      metalness: 0.06,
      flatShading: true,
    });

    /**
     * CPU-side colliders in field-local space: {x, y, z, r}.
     * @type {Array<{x: number, y: number, z: number, r: number}>}
     */
    this.rocks = [];

    const perVariant = Math.ceil(count / variants.length);
    const matrix = new THREE.Matrix4();
    const quaternion = new THREE.Quaternion();
    const euler = new THREE.Euler();
    const scaleVec = new THREE.Vector3();
    const position = new THREE.Vector3();

    this.meshes = variants.map((geometry) => {
      const mesh = new THREE.InstancedMesh(geometry, material, perVariant);
      mesh.instanceMatrix.setUsage(THREE.StaticDrawUsage);
      // Start every slot at zero scale so unassigned instances (from ceil
      // rounding) can never appear as stray rocks at the field center.
      matrix.makeScale(0, 0, 0);
      for (let i = 0; i < perVariant; i++) mesh.setMatrixAt(i, matrix);
      this.group.add(mesh);
      return mesh;
    });

    for (let i = 0; i < count; i++) {
      if (shape === 'belt') {
        // A squashed torus: ring with vertical scatter.
        const angle = rng.range(0, Math.PI * 2);
        const ringRadius = radius * (0.75 + rng.gaussian() * 0.08);
        position.set(
          Math.cos(angle) * ringRadius,
          rng.gaussian() * radius * 0.05,
          Math.sin(angle) * ringRadius,
        );
      } else {
        // Cluster: gaussian ball, denser in the middle.
        position.set(rng.gaussian(), rng.gaussian() * 0.6, rng.gaussian())
          .multiplyScalar(radius * 0.34);
      }

      const scale = rng.range(3, 9) * (rng.chance(0.12) ? rng.range(2, 4.5) : 1);
      euler.set(rng.range(0, Math.PI * 2), rng.range(0, Math.PI * 2), rng.range(0, Math.PI * 2));
      quaternion.setFromEuler(euler);
      scaleVec.setScalar(scale);
      matrix.compose(position, quaternion, scaleVec);

      const mesh = this.meshes[i % this.meshes.length];
      mesh.setMatrixAt(Math.floor(i / this.meshes.length), matrix);

      this.rocks.push({ x: position.x, y: position.y, z: position.z, r: scale * 1.05 });
    }
    for (const mesh of this.meshes) {
      mesh.instanceMatrix.needsUpdate = true;
      mesh.computeBoundingSphere();
    }

    // --- Spatial hash: uniform grid keyed by cell coords ---
    this.cellSize = 96;
    /** @type {Map<string, number[]>} rock indices per cell */
    this.grid = new Map();
    this.rocks.forEach((rock, index) => {
      const minX = Math.floor((rock.x - rock.r) / this.cellSize);
      const maxX = Math.floor((rock.x + rock.r) / this.cellSize);
      const minY = Math.floor((rock.y - rock.r) / this.cellSize);
      const maxY = Math.floor((rock.y + rock.r) / this.cellSize);
      const minZ = Math.floor((rock.z - rock.r) / this.cellSize);
      const maxZ = Math.floor((rock.z + rock.r) / this.cellSize);
      for (let gx = minX; gx <= maxX; gx++) {
        for (let gy = minY; gy <= maxY; gy++) {
          for (let gz = minZ; gz <= maxZ; gz++) {
            const key = `${gx},${gy},${gz}`;
            let bucket = this.grid.get(key);
            if (!bucket) {
              bucket = [];
              this.grid.set(key, bucket);
            }
            bucket.push(index);
          }
        }
      }
    });

    game.engine.scene.add(this.group);
    game.origin.onShift((delta) => {
      this.center.sub(delta);
      this.group.position.copy(this.center);
    });

    this._local = new THREE.Vector3();
    this._normal = new THREE.Vector3();
    this._playerCooldown = 0;
  }

  /**
   * Sphere query against the rocks.
   * @param {THREE.Vector3} worldPos
   * @param {number} radius
   * @returns {{x:number,y:number,z:number,r:number}|null} hit rock (local coords)
   */
  sphereHit(worldPos, radius) {
    this._local.copy(worldPos).sub(this.group.position);
    // Cheap reject: outside the field bounds entirely.
    if (this._local.lengthSq() > (this.radius + 200) ** 2) return null;

    const gx = Math.floor(this._local.x / this.cellSize);
    const gy = Math.floor(this._local.y / this.cellSize);
    const gz = Math.floor(this._local.z / this.cellSize);
    const bucket = this.grid.get(`${gx},${gy},${gz}`);
    if (!bucket) return null;

    for (const index of bucket) {
      const rock = this.rocks[index];
      const dx = this._local.x - rock.x;
      const dy = this._local.y - rock.y;
      const dz = this._local.z - rock.z;
      const sum = rock.r + radius;
      if (dx * dx + dy * dy + dz * dz < sum * sum) return rock;
    }
    return null;
  }

  update(dt) {
    // Player-vs-rock collision (with a short cooldown to avoid grinding).
    this._playerCooldown -= dt;
    const player = this.game.player;
    if (!player || !player.alive || this._playerCooldown > 0) return;

    const rock = this.sphereHit(player.position, player.radius);
    if (!rock) return;

    this._playerCooldown = 0.5;
    const speed = player.speed;
    const damage = clamp(speed * 0.1, 6, 35);
    const result = player.applyDamage(damage);
    if (player.shieldFx) player.shieldFx.flash(player.position, 1);

    // Bounce: reflect velocity off the rock's surface normal.
    this._normal.copy(player.position)
      .sub(this.group.position)
      .sub(this._local.set(rock.x, rock.y, rock.z))
      .normalize();
    const into = player.velocity.dot(this._normal);
    if (into < 0) {
      player.velocity.addScaledVector(this._normal, -into * 1.6);
    }
    player.position.addScaledVector(this._normal, 2);

    this.game.events.emit('player:hit', { damage });
    this.game.events.emit('camera:shake', 0.45);
    this.game.audio.playNoise({ duration: 0.5, gain: 0.5, filterFreq: 700, filterEnd: 90 });

    if (result.destroyed) {
      this.game.events.emit('ship:destroyed', { ship: player, byPlayer: false });
    }
  }
}

/** Lumpy rock geometry: icosahedron displaced by fBm. */
function createRockGeometry(seed, detail) {
  const noise = new SimplexNoise(seed);
  const geometry = new THREE.IcosahedronGeometry(1, Math.min(2, detail));
  const positions = geometry.getAttribute('position');
  const vertex = new THREE.Vector3();
  for (let i = 0; i < positions.count; i++) {
    vertex.fromBufferAttribute(positions, i);
    const n = noise.fbm(vertex.x * 1.3, vertex.y * 1.3, vertex.z * 1.3, 3);
    vertex.multiplyScalar(1 + n * 0.42);
    positions.setXYZ(i, vertex.x, vertex.y, vertex.z);
  }
  geometry.computeVertexNormals();
  return geometry;
}
