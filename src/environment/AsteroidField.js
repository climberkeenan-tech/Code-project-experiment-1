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
      const slot = Math.floor(i / this.meshes.length);
      mesh.setMatrixAt(slot, matrix);

      this.rocks.push({
        x: position.x, y: position.y, z: position.z, r: scale * 1.05,
        hp: 55 + scale * 16, // shootable: a few bolts crack a small rock
        mesh, slot, dead: false,
      });
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
    this._zeroMatrix = new THREE.Matrix4().makeScale(0, 0, 0);

    // --- Drifters: a few free-roaming rocks that wander the field ---
    // (playtest: "there should be asteroids that move around"). Individual
    // meshes, so they can actually translate; shoot them to break them.
    /** @type {Array<object>} local-space records, also probed by sphereHit */
    this.drifters = [];
    const driftCount = Math.min(6, Math.floor((this.rocks.length || 0) / 30));
    for (let d = 0; d < driftCount; d++) {
      const r = rng.range(6, 14);
      const mesh = new THREE.Mesh(variants[d % variants.length], material);
      mesh.scale.setScalar(r / 1.05);
      const drifter = {
        x: rng.gaussian() * radius * 0.3,
        y: rng.gaussian() * radius * 0.15,
        z: rng.gaussian() * radius * 0.3,
        vx: rng.range(-7, 7), vy: rng.range(-3, 3), vz: rng.range(-7, 7),
        rx: rng.range(-0.4, 0.4), ry: rng.range(-0.4, 0.4),
        r, hp: 55 + r * 16, mesh, drifter: true, dead: false,
      };
      mesh.position.set(drifter.x, drifter.y, drifter.z);
      this.group.add(mesh);
      this.drifters.push(drifter);
    }
  }

  /**
   * Sphere query against the rocks (static + drifting).
   * @param {THREE.Vector3} worldPos
   * @param {number} radius
   * @returns {object|null} hit rock record (local coords)
   */
  sphereHit(worldPos, radius) {
    this._local.copy(worldPos).sub(this.group.position);
    // Cheap reject: outside the field bounds entirely.
    if (this._local.lengthSq() > (this.radius + 200) ** 2) return null;

    // Query EVERY cell the sphere overlaps (a single-cell probe used to miss
    // most contacts — big hulls plowed straight through rocks).
    const minX = Math.floor((this._local.x - radius) / this.cellSize);
    const maxX = Math.floor((this._local.x + radius) / this.cellSize);
    const minY = Math.floor((this._local.y - radius) / this.cellSize);
    const maxY = Math.floor((this._local.y + radius) / this.cellSize);
    const minZ = Math.floor((this._local.z - radius) / this.cellSize);
    const maxZ = Math.floor((this._local.z + radius) / this.cellSize);
    for (let gx = minX; gx <= maxX; gx++) {
      for (let gy = minY; gy <= maxY; gy++) {
        for (let gz = minZ; gz <= maxZ; gz++) {
          const bucket = this.grid.get(`${gx},${gy},${gz}`);
          if (!bucket) continue;
          for (const index of bucket) {
            const rock = this.rocks[index];
            if (rock.dead) continue;
            const dx = this._local.x - rock.x;
            const dy = this._local.y - rock.y;
            const dz = this._local.z - rock.z;
            const sum = rock.r + radius;
            if (dx * dx + dy * dy + dz * dz < sum * sum) return rock;
          }
        }
      }
    }
    // Drifters roam outside the hash — linear probe (there are ≤6).
    for (const rock of this.drifters) {
      if (rock.dead) continue;
      const dx = this._local.x - rock.x;
      const dy = this._local.y - rock.y;
      const dz = this._local.z - rock.z;
      const sum = rock.r + radius;
      if (dx * dx + dy * dy + dz * dz < sum * sum) return rock;
    }
    return null;
  }

  /**
   * A weapon bolt struck a rock: spark, chip salvage, and — enough damage —
   * BREAK it (the rock disappears in a burst; drifters stop being a threat).
   */
  damageRock(rock, damage, worldPos, fromPlayer) {
    const game = this.game;
    if (game.explosions) game.explosions.spawn(worldPos, 0.28);
    if (fromPlayer && game.pickups && Math.random() < 0.14) {
      game.pickups.spawnBurst(worldPos, 1);
    }
    rock.hp -= damage;
    if (rock.hp > 0 || rock.dead) return;
    rock.dead = true;
    if (rock.drifter) {
      this.group.remove(rock.mesh);
    } else {
      rock.mesh.setMatrixAt(rock.slot, this._zeroMatrix);
      rock.mesh.instanceMatrix.needsUpdate = true;
    }
    if (game.explosions) game.explosions.spawn(worldPos, 0.9);
    if (fromPlayer && game.pickups) {
      game.pickups.spawnBurst(worldPos, 2 + Math.round(rock.r / 6));
    }
    game.audio?.playNoise?.({ duration: 0.4, gain: 0.3, filterFreq: 500, filterEnd: 70 });
  }

  update(dt) {
    // Drifters wander slowly, tumbling; they turn back at the field edge.
    for (const d of this.drifters) {
      if (d.dead) continue;
      d.x += d.vx * dt; d.y += d.vy * dt; d.z += d.vz * dt;
      if (d.x * d.x + d.y * d.y + d.z * d.z > this.radius * this.radius) {
        d.vx = -d.vx; d.vy = -d.vy; d.vz = -d.vz;
      }
      d.mesh.position.set(d.x, d.y, d.z);
      d.mesh.rotation.x += d.rx * dt;
      d.mesh.rotation.y += d.ry * dt;
    }

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
