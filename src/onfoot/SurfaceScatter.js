import * as THREE from 'three';
import { RARITIES, RARITY_COLOR, rollRarity } from '../economy/Rarity.js';

/**
 * Procedural surface dressing spawned around the player when they disembark:
 * mineable ore rocks (rarity-tiered) plus instanced trees and grass so a
 * planet reads as "teeming with life" up close.
 *
 * Everything is parented to `planet.group`, so it inherits the planet's
 * floating-origin shifts (and any future rotation) for free — no separate
 * onShift bookkeeping, and props stay welded to the world. Built on
 * disembark, disposed on board, so only one landing site's worth of geometry
 * exists at a time (mobile-friendly).
 */

const SCATTER_RADIUS = 420; // how far props spread around the landing point
const ROCK_COUNT = 60;
const TREE_COUNT = 420; // dense enough to read as a real forest (playtest)
const GRASS_COUNT = 800;

export class SurfaceScatter {
  /**
   * @param {import('../core/Game.js').Game} game
   * @param {import('../world/Planet.js').Planet} planet
   * @param {THREE.Vector3} centerWorld world-space point to scatter around
   */
  constructor(game, planet, centerWorld) {
    this.game = game;
    this.planet = planet;
    this.center = planet.group.position; // render-space planet center

    /** @type {Array<{mesh: THREE.Mesh, rarity: import('../economy/Rarity.js').Rarity, localPos: THREE.Vector3}>} */
    this.rocks = [];
    this._group = new THREE.Group();
    planet.group.add(this._group);

    // Shared materials per rarity (never per-rock — avoids GPU program leaks).
    this._rockMats = RARITIES.map((r) => new THREE.MeshStandardMaterial({
      color: r.color,
      emissive: RARITY_COLOR[r.id].clone().multiplyScalar(r.emissive * 0.4),
      roughness: 0.7,
      metalness: 0.15,
      flatShading: true,
    }));
    this._rockGeo = new THREE.DodecahedronGeometry(1, 0);

    this._buildRocks(centerWorld);
    this._buildTrees(centerWorld);
    this._buildGrass(centerWorld);

    this._tmp = new THREE.Vector3();
  }

  /** True if a world point is on solid ground above any ocean. */
  _isLand(worldPoint) {
    const groundDist = worldPoint.distanceTo(this.center) - this.planet.radius;
    // On ocean worlds, getAltitude clamps sea floor to ~0.5; treat the shore
    // band and below as water so props don't stand in the sea.
    return !this.planet.descriptor.hasOcean || groundDist > 1.0;
  }

  /**
   * Sample a surface point near `centerWorld` at a random offset. Returns the
   * world-space point ON the surface plus the radial up there, or null over water.
   */
  _sampleSurface(centerWorld, minR, maxR) {
    const up0 = this._up0 || (this._up0 = new THREE.Vector3());
    up0.copy(centerWorld).sub(this.center).normalize();
    // Two tangent basis vectors at the landing point.
    const t1 = this._t1 || (this._t1 = new THREE.Vector3());
    const t2 = this._t2 || (this._t2 = new THREE.Vector3());
    t1.set(0, 1, 0);
    if (Math.abs(up0.dot(t1)) > 0.9) t1.set(1, 0, 0);
    t1.crossVectors(up0, t1).normalize();
    t2.crossVectors(up0, t1).normalize();

    const ang = Math.random() * Math.PI * 2;
    const dist = minR + Math.sqrt(Math.random()) * (maxR - minR);
    const p = new THREE.Vector3()
      .copy(centerWorld)
      .addScaledVector(t1, Math.cos(ang) * dist)
      .addScaledVector(t2, Math.sin(ang) * dist);

    // Project onto the actual terrain surface along the radial.
    const alt = this.planet.getAltitude(p);
    const dir = this._tmpDir || (this._tmpDir = new THREE.Vector3());
    dir.copy(p).sub(this.center).normalize();
    p.addScaledVector(dir, -alt); // now p sits on the surface
    if (!this._isLand(p)) return null;
    return { point: p, up: dir.clone() };
  }

  /** Build an orientation matrix that stands `+Y` along `up` with random yaw. */
  _standMatrix(point, up, scale, mat) {
    const q = this._q || (this._q = new THREE.Quaternion());
    q.setFromUnitVectors(UP, up);
    // Random spin around the local up so props don't all face the same way.
    const spin = this._spin || (this._spin = new THREE.Quaternion());
    spin.setFromAxisAngle(up, Math.random() * Math.PI * 2);
    q.premultiply(spin);
    // Position/scale are in planet-local space (parented to planet.group).
    const localPoint = this._lp || (this._lp = new THREE.Vector3());
    localPoint.copy(point).sub(this.center);
    mat.compose(localPoint, q, scale);
    return localPoint;
  }

  _buildRocks(centerWorld) {
    const scaleV = new THREE.Vector3();
    const mat4 = new THREE.Matrix4();
    for (let i = 0; i < ROCK_COUNT; i++) {
      const s = this._sampleSurface(centerWorld, 8, SCATTER_RADIUS);
      if (!s) continue;
      const rarity = rollRarity(Math.random);
      const size = 0.7 + Math.random() * 1.3;
      const mesh = new THREE.Mesh(this._rockGeo, this._rockMats[RARITIES.indexOf(rarity)]);
      scaleV.set(size, size * (0.7 + Math.random() * 0.5), size);
      const localPoint = this._standMatrix(s.point, s.up, scaleV, mat4);
      mesh.applyMatrix4(mat4);
      // Sink slightly so it reads as embedded in the ground.
      mesh.position.copy(localPoint).addScaledVector(s.up, -size * 0.25);
      mesh.castShadow = true;
      this._group.add(mesh);
      this.rocks.push({ mesh, rarity, localPos: localPoint.clone() });
    }
  }

  _buildTrees(centerWorld) {
    if (!this.planet.descriptor.hasAtmosphere) return; // airless worlds: no forests
    const trunkGeo = new THREE.CylinderGeometry(0.28, 0.42, 5, 5);
    trunkGeo.translate(0, 2.5, 0); // base at origin
    const leafGeo = new THREE.ConeGeometry(2.4, 6, 6);
    leafGeo.translate(0, 7.2, 0);
    const foliageTint = this.planet.descriptor.foliageColor
      || pickFoliage(this.planet.descriptor);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5a4632, roughness: 0.9, flatShading: true });
    const leafMat = new THREE.MeshStandardMaterial({ color: foliageTint, roughness: 0.8, flatShading: true });

    const trunks = new THREE.InstancedMesh(trunkGeo, trunkMat, TREE_COUNT);
    const leaves = new THREE.InstancedMesh(leafGeo, leafMat, TREE_COUNT);
    trunks.castShadow = leaves.castShadow = true;

    const scaleV = new THREE.Vector3();
    const mat4 = new THREE.Matrix4();
    let placed = 0;
    for (let i = 0; i < TREE_COUNT * 2 && placed < TREE_COUNT; i++) {
      const s = this._sampleSurface(centerWorld, 14, SCATTER_RADIUS);
      if (!s) continue;
      const h = 0.75 + Math.random() * 0.8;
      scaleV.set(h * (0.8 + Math.random() * 0.4), h, h * (0.8 + Math.random() * 0.4));
      this._standMatrix(s.point, s.up, scaleV, mat4);
      trunks.setMatrixAt(placed, mat4);
      leaves.setMatrixAt(placed, mat4);
      placed++;
    }
    trunks.count = leaves.count = placed;
    trunks.instanceMatrix.needsUpdate = leaves.instanceMatrix.needsUpdate = true;
    this._group.add(trunks, leaves);
    this._trees = [trunks, leaves];
  }

  _buildGrass(centerWorld) {
    if (!this.planet.descriptor.hasAtmosphere) return;
    const bladeGeo = new THREE.ConeGeometry(0.14, 1.1, 3);
    bladeGeo.translate(0, 0.55, 0);
    const tint = this.planet.descriptor.foliageColor || pickFoliage(this.planet.descriptor);
    const grassMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(tint).multiplyScalar(0.85),
      roughness: 0.9,
      flatShading: true,
    });
    const grass = new THREE.InstancedMesh(bladeGeo, grassMat, GRASS_COUNT);
    const scaleV = new THREE.Vector3();
    const mat4 = new THREE.Matrix4();
    let placed = 0;
    for (let i = 0; i < GRASS_COUNT * 2 && placed < GRASS_COUNT; i++) {
      const s = this._sampleSurface(centerWorld, 4, SCATTER_RADIUS);
      if (!s) continue;
      const h = 0.6 + Math.random() * 1.1;
      scaleV.set(1, h, 1);
      this._standMatrix(s.point, s.up, scaleV, mat4);
      grass.setMatrixAt(placed, mat4);
      placed++;
    }
    grass.count = placed;
    grass.instanceMatrix.needsUpdate = true;
    this._group.add(grass);
    this._grass = grass;
  }

  /**
   * Find the nearest mineable rock within `range` of a world position.
   * @returns {{ rock: object, dist: number } | null}
   */
  nearestRock(worldPos, range) {
    let best = null;
    let bestDist = range;
    for (const rock of this.rocks) {
      this._tmp.copy(this.center).add(rock.localPos);
      const d = this._tmp.distanceTo(worldPos);
      if (d < bestDist) {
        bestDist = d;
        best = rock;
      }
    }
    return best ? { rock: best, dist: bestDist } : null;
  }

  /** Remove a mined rock from the world. */
  removeRock(rock) {
    const i = this.rocks.indexOf(rock);
    if (i === -1) return;
    this._group.remove(rock.mesh);
    this.rocks.splice(i, 1);
  }

  /** Tear down all scattered geometry. */
  dispose() {
    this.planet.group.remove(this._group);
    for (const rock of this.rocks) this._group.remove(rock.mesh);
    this.rocks.length = 0;
    this._rockGeo.dispose();
    this._rockMats.forEach((m) => m.dispose());
    if (this._trees) this._trees.forEach((t) => { t.geometry.dispose(); t.material.dispose(); });
    if (this._grass) { this._grass.geometry.dispose(); this._grass.material.dispose(); }
  }
}

const UP = new THREE.Vector3(0, 1, 0);

/** A pleasant foliage tint per planet archetype. */
function pickFoliage(descriptor) {
  switch (descriptor.archetype) {
    case 'ice': return 0x8fb6c4;
    case 'desert': return 0x9fa055;
    case 'volcanic': return 0x6b5340;
    default: return 0x3f8f4a;
  }
}
