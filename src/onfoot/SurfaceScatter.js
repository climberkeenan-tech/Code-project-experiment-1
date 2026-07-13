import * as THREE from 'three';
import { RARITIES, RARITY_COLOR, rollRarity } from '../economy/Rarity.js';
import { SimplexNoise, smoothstep } from '../core/math/noise.js';
import { getForestAssets, SPECIES } from '../world/forest/ForestAssets.js';

/**
 * Surface dressing spawned around the player when they disembark: mineable
 * ore rocks (rarity-tiered) plus a PHOTOREALISTIC instanced forest — Poly
 * Haven photogrammetry scans (see src/world/forest/ForestAssets.js) placed
 * by the same biome noise that paints the forest bands visible from orbit,
 * so the woods you land in are the woods you saw from space.
 *
 * Everything is parented to `planet.group`, so it inherits the planet's
 * floating-origin shifts (and any future rotation) for free — no separate
 * onShift bookkeeping, and props stay welded to the world. Built on
 * disembark, disposed on board, so only one landing site's worth of geometry
 * exists at a time (mobile-friendly).
 */

const SCATTER_RADIUS = 420; // how far props spread around the landing point
const ROCK_COUNT = 60;
const TREE_GRID = 7; // deterministic tree lattice pitch (m) — one slot per cell
const RING0 = 62; // full-detail photogrammetry within this range of the center
const RING1 = 140; // simplified LOD to here; baked impostors beyond
const FLIGHT_RING1 = 120; // flight-grade patches: LOD1 to here, no LOD0 at all
const HERO_LOD_DIST = 150; // the 877k-tri hero swaps to its LOD past this
// Walking this far from the patch center re-centers the detail rings. Must
// stay under RING0 so the player never reaches simplified trees before the
// rebuild fires.
const REBUILD_STRAY = 55;

/**
 * Per-archetype forest recipes. Cell spawn probability =
 * pFloor + pMask × (orbital forest-band mask) — vegetated worlds get dense
 * woods inside the bands that are visible from space and open meadows
 * between them. `mix` = weighted species table with altitude/shore gates
 * (h01 = height / relief, matching the terrain colour bands).
 */
const FOREST_PLANS = {
  terran: {
    pFloor: 0.16, pMask: 0.84, hero: true, undergrowth: true,
    mix: [
      { id: 'fir', w: 24, minH01: 0.15 },
      { id: 'island1', w: 26, maxH01: 0.36 },
      { id: 'island2', w: 19, maxH01: 0.32 },
      { id: 'jacaranda', w: 9, maxH01: 0.28 },
      { id: 'quiver', w: 7, shoreOnly: true },
      { id: 'snag', w: 6 },
      { id: 'log', w: 7 },
      { id: 'stump', w: 2 },
    ],
  },
  ocean: {
    pFloor: 0.14, pMask: 0.76, hero: true, undergrowth: true,
    mix: [
      { id: 'fir', w: 16, minH01: 0.18 },
      { id: 'island1', w: 28, maxH01: 0.36 },
      { id: 'island2', w: 22, maxH01: 0.32 },
      { id: 'jacaranda', w: 8, maxH01: 0.28 },
      { id: 'quiver', w: 12, shoreOnly: true },
      { id: 'snag', w: 5 },
      { id: 'log', w: 7 },
      { id: 'stump', w: 2 },
    ],
  },
  ice: {
    pFloor: 0.14, pMask: 0, hero: false, undergrowth: false,
    leafTint: [0.82, 0.92, 1.1], barkTint: [0.9, 0.95, 1.05],
    mix: [{ id: 'fir', w: 68 }, { id: 'snag', w: 22 }, { id: 'log', w: 10 }],
  },
  desert: {
    pFloor: 0.055, pMask: 0, hero: false, undergrowth: false,
    mix: [{ id: 'quiver', w: 58 }, { id: 'snag', w: 26 }, { id: 'log', w: 16 }],
  },
  volcanic: {
    pFloor: 0.04, pMask: 0, hero: false, undergrowth: false,
    leafTint: [0.8, 0.76, 0.72], barkTint: [0.72, 0.7, 0.68],
    mix: [{ id: 'snag', w: 48 }, { id: 'log', w: 30 }, { id: 'quiver', w: 22 }],
  },
  rocky: {
    pFloor: 0.03, pMask: 0, hero: false, undergrowth: false,
    mix: [{ id: 'quiver', w: 40 }, { id: 'snag', w: 35 }, { id: 'log', w: 25 }],
  },
};

/** Integer hash of a planet-local lattice cell (deterministic tree slots). */
function hashCell(x, y, z, seed) {
  let h = (Math.imul(x, 374761393) + Math.imul(y, 668265263)
    + Math.imul(z, 1274126177) + seed) | 0;
  h = Math.imul(h ^ (h >>> 13), 1103515245);
  return (h ^ (h >>> 16)) >>> 0;
}

/** Tiny deterministic float stream (mulberry32) seeded from a cell hash. */
function cellRng(seed) {
  let a = seed | 0;
  return () => {
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** String → int seed for the cell hash. */
function seedInt(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619);
  return h | 0;
}

export class SurfaceScatter {
  /**
   * @param {import('../core/Game.js').Game} game
   * @param {import('../world/Planet.js').Planet} planet
   * @param {THREE.Vector3} centerWorld world-space point to scatter around
   * @param {'full'|'flight'} mode flight patches carry trees only (LOD1 +
   *   impostors, no undergrowth/hero) — they are seen from the air and are
   *   rebuilt every 300 m of flight; disembarking upgrades via
   *   setFullDetail(). 'full' is the on-foot grade.
   */
  constructor(game, planet, centerWorld, mode = 'full') {
    this.game = game;
    this.planet = planet;
    this._mode = mode;
    this.center = planet.group.position; // render-space planet center

    /** @type {Array<{mesh: THREE.Mesh, rarity: import('../economy/Rarity.js').Rarity, localPos: THREE.Vector3}>} */
    this.rocks = [];
    /**
     * Solid props the avatar cannot walk through: planet-local base points +
     * radii. Trees, palms and ore rocks all register here.
     * @type {Array<{local: THREE.Vector3, r: number, dead?: boolean}>}
     */
    this.colliders = [];
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

    /** Live forest meshes (instanced), torn down on dispose/re-center. */
    this._forestMeshes = [];
    this._disposed = false;
    this._heroPlaced = false;

    this._buildRocks(centerWorld);
    this._rockColliderCount = this.colliders.length;
    this._buildForest(centerWorld);
    this._buildWildlife(centerWorld);

    this._tmp = new THREE.Vector3();
    this._wUp = new THREE.Vector3();
    this._wT1 = new THREE.Vector3();
    this._wT2 = new THREE.Vector3();
    this._wQuat = new THREE.Quaternion();
    this._yawQ = new THREE.Quaternion();
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
      const collider = { local: localPoint.clone(), r: size * 1.15 };
      this.colliders.push(collider);
      this.rocks.push({ mesh, rarity, localPos: localPoint.clone(), collider });
    }
  }

  /**
   * Terrain slope (rise/run) at a planet-local unit direction, from two
   * tangent probes. Trees and undergrowth use it to skip cliff faces and to
   * sink their bases so nothing hovers on a hillside.
   */
  _slopeAt(dir, h, t1, t2) {
    const R = this.planet.radius;
    const e = 2.5;
    const d = this._slopeDir || (this._slopeDir = new THREE.Vector3());
    d.copy(dir).multiplyScalar(R).addScaledVector(t1, e).normalize();
    const h1 = this.planet.sampler.height(d.x, d.y, d.z);
    d.copy(dir).multiplyScalar(R).addScaledVector(t2, e).normalize();
    const h2 = this.planet.sampler.height(d.x, d.y, d.z);
    return Math.hypot(h1 - h, h2 - h) / e;
  }

  /**
   * The photoreal forest. Tree slots live on a DETERMINISTIC 8 m lattice in
   * planet-local space: each cell hashes to existence, species, size, yaw
   * and tint, so any rebuild — walking past REBUILD_STRAY, low-flight patch
   * hops, or re-landing — reproduces the exact same trees and only their
   * detail representation changes. Three rings around the patch center:
   * full photogrammetry scans (≤ RING0), meshopt-simplified LOD (≤ RING1),
   * and 4-triangle baked impostors out to the patch edge — which is what
   * lets the canopy read as an unbroken forest from the air. Density follows
   * the SAME biome noise that paints the orbital forest bands, so the woods
   * you land in are the woods you saw from space.
   */
  _buildForest(centerWorld) {
    const d = this.planet.descriptor;
    if (!d.hasAtmosphere) return; // airless worlds: no forests
    const plan = FOREST_PLANS[d.archetype] ?? FOREST_PLANS.rocky;
    const assets = getForestAssets();
    if (!assets.ready) {
      // First landing before the GLBs finish streaming: build when ready
      // (the patch tolerates trees popping in a moment after touchdown).
      const center = centerWorld.clone();
      assets.load().then(() => { if (!this._disposed) this._buildForest(center); });
      return;
    }
    assets.bindPlanet(this.planet);
    assets.ensureImpostors(this.game.engine.renderer);
    this._centerLocal = centerWorld.clone().sub(this.center);
    this._plan = plan;

    const planet = this.planet;
    const R = planet.radius;
    const biomeNoise = this._biomeNoise
      || (this._biomeNoise = new SimplexNoise(`${d.seed}:biome`));
    const planetSeed = seedInt(d.seed ?? d.name);
    const vegetated = d.archetype === 'terran' || d.archetype === 'ocean';
    const hotShore = d.hasOcean
      && (d.archetype === 'desert' || d.archetype === 'terran' || d.archetype === 'volcanic');
    const totalW = plan.mix.reduce((a, e) => a + e.w, 0);
    const barkBase = plan.barkTint ?? [1, 1, 1];
    const leafBase = plan.leafTint ?? [1, 1, 1];

    // Tangent frame at the patch center (planet-local).
    const up0 = this._centerLocal.clone().normalize();
    const t1 = new THREE.Vector3(0, 1, 0);
    if (Math.abs(up0.dot(t1)) > 0.9) t1.set(1, 0, 0);
    t1.crossVectors(up0, t1).normalize();
    const t2 = new THREE.Vector3().crossVectors(up0, t1).normalize();

    /** id → {recs0, recs1, recs2} — instance records per detail ring. */
    const buckets = new Map();
    const seen = new Set();
    const lp = new THREE.Vector3();
    const dir = new THREE.Vector3();
    const surfLocal = new THREE.Vector3();

    const n = Math.ceil(SCATTER_RADIUS / TREE_GRID);
    for (let i = -n; i <= n; i++) {
      for (let j = -n; j <= n; j++) {
        const rr = Math.hypot(i, j) * TREE_GRID;
        if (rr > SCATTER_RADIUS || rr < 7) continue; // keep the landing pad clear

        // Quantize to the planet-local lattice — the cell key and everything
        // derived from it is independent of where this patch is centered.
        lp.copy(this._centerLocal)
          .addScaledVector(t1, i * TREE_GRID)
          .addScaledVector(t2, j * TREE_GRID);
        const kx = Math.round(lp.x / TREE_GRID);
        const ky = Math.round(lp.y / TREE_GRID);
        const kz = Math.round(lp.z / TREE_GRID);
        const key = `${kx},${ky},${kz}`;
        if (seen.has(key)) continue;
        seen.add(key);
        const rand = cellRng(hashCell(kx, ky, kz, planetSeed));

        // Jittered slot position inside the cell, projected onto the terrain.
        lp.set(kx * TREE_GRID, ky * TREE_GRID, kz * TREE_GRID)
          .addScaledVector(t1, (rand() - 0.5) * TREE_GRID * 0.9)
          .addScaledVector(t2, (rand() - 0.5) * TREE_GRID * 0.9);
        dir.copy(lp).normalize();
        const h = planet.sampler.height(dir.x, dir.y, dir.z);
        if (d.hasOcean && h <= 1.0) continue; // never in the sea
        const h01 = Math.max(0, Math.min(1, h / d.relief));
        const inShore = hotShore && h >= 1.0 && h <= 5.5;

        // Density: orbital forest-band mask on vegetated worlds + floor.
        let p = plan.pFloor;
        if (vegetated && plan.pMask > 0) {
          const mask = smoothstep(0.15, 0.6,
            biomeNoise.noise3(dir.x * 7 + 41, dir.y * 7 + 41, dir.z * 7 + 41));
          const band = smoothstep(0.03, 0.09, h01) * (1 - smoothstep(0.38, 0.58, h01));
          p += plan.pMask * mask * band;
        }
        if (rand() > p) continue;

        // Weighted species pick honoring altitude/shore gates.
        let pick = null;
        for (let tries = 0; tries < 4 && !pick; tries++) {
          let roll = rand() * totalW;
          let candidate = plan.mix[plan.mix.length - 1];
          for (const e of plan.mix) { roll -= e.w; if (roll <= 0) { candidate = e; break; } }
          if (candidate.shoreOnly && !inShore) continue;
          if (candidate.minH01 !== undefined && h01 < candidate.minH01) continue;
          if (candidate.maxH01 !== undefined && h01 > candidate.maxH01) continue;
          pick = candidate;
        }
        if (!pick) continue;
        const sp = assets.species[pick.id];
        if (!sp) continue;

        // Cliffs stay bare — and on walkable slopes the tree sinks with the
        // gradient so its root disc never hovers off the downhill side.
        const slope = this._slopeAt(dir, h, t1, t2);
        if (slope > 0.55) continue;

        surfLocal.copy(dir).multiplyScalar(R + h);
        const ring = this._mode === 'flight'
          ? (rr <= FLIGHT_RING1 ? 1 : 2)
          : (rr <= RING0 ? 0 : (rr <= RING1 ? 1 : 2));
        if (ring === 2 && !sp.impostor) continue; // no sprite → not worth a far slot
        this._placeTree(pick.id, surfLocal, dir, ring, rand, buckets, barkBase, leafBase, slope, 0);
      }
    }

    // Undergrowth (on-foot patches only): bushes between the trunks, ferns
    // on the forest floor, and a grass carpet dense enough to hide the bare
    // terrain — clumps share one terrain sample per cell so the ~30k tufts
    // stay affordable to place.
    if (plan.undergrowth && this._mode === 'full') {
      this._buildUndergrowth('bush', 6, 130, 55, 0.28, 0.30, planetSeed + 303,
        t1, t2, biomeNoise, buckets, barkBase, leafBase);
      this._buildUndergrowth('fern', 9, 130, 45, 0.55, 0.14, planetSeed + 101,
        t1, t2, biomeNoise, buckets, barkBase, leafBase);
      // Grass climbs well past the treeline band (hi 0.6→0.85) — bare
      // crests above the woods still read as alpine meadow, not bald green.
      this._buildUndergrowth('grass', 3.2, 200, 200, 0.05, 0.95, planetSeed + 202,
        t1, t2, biomeNoise, buckets, barkBase, leafBase, 30, 2.4, 0.6, 0.85);
    }

    // One HERO tree per landing site: the full 877k-triangle photogrammetry
    // master near the touchdown point. Survives re-centers (never re-placed).
    if (plan.hero && this._mode === 'full' && assets.species.hero && !this._heroPlaced) {
      this._placeHero(assets, centerWorld);
    }

    // Bake the buckets into InstancedMeshes (one per species-part-ring).
    // Ground cover skips the shadow pass — its self-shadowing is noise at a
    // 2K map and the instance counts are huge.
    for (const [id, rings] of buckets) {
      const sp = assets.species[id];
      const lod1Parts = sp.parts1.length ? sp.parts1 : sp.parts0;
      this._bakeRing(sp.parts0, rings.recs0, id !== 'grass' && id !== 'fern');
      this._bakeRing(lod1Parts, rings.recs1, false);
      if (rings.recs2.length && sp.impostor) {
        this._bakeRing(
          [{ geometry: assets.impostorGeo, material: sp.impostor.material, leaf: true }],
          rings.recs2, false,
        );
      }
    }
  }

  /**
   * Undergrowth lattice: like the tree lattice but finer, radius-limited,
   * with its own LOD split (full fern ≤ lodR, simplified beyond).
   */
  _buildUndergrowth(id, grid, maxR, lodR, pMask, pFloor, seed,
    t1, t2, biomeNoise, buckets, barkBase, leafBase, clumpN = 1, clumpR = 0,
    hi0 = 0.38, hi1 = 0.58) {
    const assets = getForestAssets();
    if (!assets.species[id]) return;
    const planet = this.planet;
    const d = planet.descriptor;
    const lp = new THREE.Vector3();
    const memberLp = new THREE.Vector3();
    const dir = new THREE.Vector3();
    const surfLocal = new THREE.Vector3();
    const seen = new Set();
    const slopeCache = new Map(); // ~8 m blocks — plenty for ground cover
    const maxSlope = id === 'grass' ? 0.85 : 0.55;
    const n = Math.ceil(maxR / grid);
    for (let i = -n; i <= n; i++) {
      for (let j = -n; j <= n; j++) {
        const rr = Math.hypot(i, j) * grid;
        if (rr > maxR || rr < 3) continue;
        lp.copy(this._centerLocal).addScaledVector(t1, i * grid).addScaledVector(t2, j * grid);
        const kx = Math.round(lp.x / grid);
        const ky = Math.round(lp.y / grid);
        const kz = Math.round(lp.z / grid);
        const key = `${kx},${ky},${kz}`;
        if (seen.has(key)) continue;
        seen.add(key);
        const rand = cellRng(hashCell(kx, ky, kz, seed));
        lp.set(kx * grid, ky * grid, kz * grid)
          .addScaledVector(t1, (rand() - 0.5) * grid * 1.4)
          .addScaledVector(t2, (rand() - 0.5) * grid * 1.4);
        dir.copy(lp).normalize();
        const h = planet.sampler.height(dir.x, dir.y, dir.z);
        if (d.hasOcean && h <= 1.0) continue;
        const h01 = Math.max(0, Math.min(1, h / d.relief));
        const mask = smoothstep(0.15, 0.6,
          biomeNoise.noise3(dir.x * 7 + 41, dir.y * 7 + 41, dir.z * 7 + 41));
        const band = smoothstep(0.03, 0.09, h01) * (1 - smoothstep(hi0, hi1, h01));
        if (rand() > (pFloor + pMask * mask) * band) continue;
        const bk = `${Math.round(kx * grid / 8)},${Math.round(ky * grid / 8)},${Math.round(kz * grid / 8)}`;
        let slope = slopeCache.get(bk);
        if (slope === undefined) { slope = this._slopeAt(dir, h, t1, t2); slopeCache.set(bk, slope); }
        if (slope > maxSlope) continue;
        const ring = rr <= lodR ? 0 : 1;
        // Clump members share this cell's terrain sample (the species sink
        // hides the small slope error) — that is what makes a ~30k-instance
        // grass carpet placeable in milliseconds. Density tapers past 95 m.
        const members = clumpN === 1 ? 1
          : rr < 95 ? clumpN
            : rr < 150 ? Math.max(2, Math.round(clumpN / 3)) : 2;
        for (let c = 0; c < members; c++) {
          const o1 = (rand() - 0.5) * 2 * clumpR;
          const o2 = (rand() - 0.5) * 2 * clumpR;
          memberLp.copy(lp).addScaledVector(t1, o1).addScaledVector(t2, o2);
          dir.copy(memberLp).normalize();
          surfLocal.copy(dir).multiplyScalar(planet.radius + h);
          // Members reuse the cell's height sample — sink by slope × offset
          // so the carpet hugs hillsides instead of hovering off them.
          this._placeTree(id, surfLocal, dir, ring, rand, buckets, barkBase,
            leafBase, slope, Math.hypot(o1, o2));
        }
      }
    }
  }

  /** Compose one deterministic instance record (matrix + tints + collider). */
  _placeTree(id, surfLocal, up, ring, rand, buckets, barkBase, leafBase,
    slope = 0, offDist = 0) {
    const assets = getForestAssets();
    const sp = assets.species[id];
    const spec = SPECIES[id];
    const targetH = spec.heights[0] + rand() * (spec.heights[1] - spec.heights[0]);
    const k = targetH / sp.nativeH;

    const q = this._q2 || (this._q2 = new THREE.Quaternion());
    const spin = this._spin2 || (this._spin2 = new THREE.Quaternion());
    q.setFromUnitVectors(UP, up);
    spin.setFromAxisAngle(up, rand() * Math.PI * 2);
    q.premultiply(spin);

    const scaleV = this._scaleV || (this._scaleV = new THREE.Vector3());
    if (ring === 2) {
      // Impostor cross-quad: x/z carry the sprite's width, y its height.
      scaleV.set(targetH * (sp.impostor?.aspect ?? 1), targetH, targetH * (sp.impostor?.aspect ?? 1));
    } else if (spec.wide) {
      // Ground cover spreads broad — width scales past height for coverage.
      const w = k * (spec.wide[0] + rand() * (spec.wide[1] - spec.wide[0]));
      scaleV.set(w, k, w);
    } else {
      scaleV.setScalar(k);
    }

    // Seat the base below grade so root flares meet slopes cleanly. Three
    // extra burial terms kill floaters: slope × root-disc radius (hillside
    // hover), slope × clump offset (members reuse their cell's height), and
    // a flat term on the far rings (the rendered far terrain is a coarser
    // LOD mesh that can sit below the analytic height trees are placed on).
    const footR = Math.min(2, Math.max(0.4, targetH * 0.1));
    let sink = (spec.sink ?? 0.06 * Math.sqrt(targetH))
      + slope * (footR + offDist)
      + (ring === 1 ? 0.3 : ring === 2 ? 0.9 : 0);
    const seated = surfLocal.clone().addScaledVector(up, -sink);
    const mat4 = new THREE.Matrix4().compose(seated, q, scaleV);

    // Natural per-instance variation: brightness on bark, hue on foliage.
    const bv = 0.88 + rand() * 0.17;
    const barkTint = new THREE.Color(barkBase[0] * bv, barkBase[1] * bv, barkBase[2] * bv);
    const leafTint = new THREE.Color(
      leafBase[0] * (0.82 + rand() * 0.28),
      leafBase[1] * (0.88 + rand() * 0.24),
      leafBase[2] * (0.8 + rand() * 0.25),
    );

    let bucket = buckets.get(id);
    if (!bucket) { bucket = { recs0: [], recs1: [], recs2: [] }; buckets.set(id, bucket); }
    (ring === 0 ? bucket.recs0 : ring === 1 ? bucket.recs1 : bucket.recs2)
      .push({ mat4, barkTint, leafTint });

    // Colliders only where the player can actually reach before a re-center.
    if (spec.trunkR > 0 && ring < 2) {
      this.colliders.push({ local: surfLocal.clone(), r: spec.trunkR * k });
    }
  }

  /** Instantiate one detail ring of a species from its records. */
  _bakeRing(parts, recs, castShadow) {
    if (!recs.length) return;
    for (const part of parts) {
      const im = new THREE.InstancedMesh(part.geometry, part.material, recs.length);
      for (let i = 0; i < recs.length; i++) {
        im.setMatrixAt(i, recs[i].mat4);
        im.setColorAt(i, part.leaf ? recs[i].leafTint : recs[i].barkTint);
      }
      im.castShadow = castShadow;
      im.receiveShadow = true;
      // Instances spread across the whole patch; the geometry's own bounds
      // would cull them wrongly.
      im.frustumCulled = false;
      this._group.add(im);
      this._forestMeshes.push(im);
    }
  }

  /** The single full-resolution hero scan with a distance LOD swap. */
  _placeHero(assets, centerWorld) {
    const sp = assets.species.hero;
    const spec = SPECIES.hero;
    for (let i = 0; i < 20; i++) {
      const s = this._sampleSurface(centerWorld, 18, 42);
      if (!s) continue;
      // The showpiece gets flat ground: measure the local gradient and
      // reject slopes; sink with what remains so the root flare beds in.
      const dirLocal = s.point.clone().sub(this.center).normalize();
      const h = s.point.distanceTo(this.center) - this.planet.radius;
      const slope = this._slopeAt(dirLocal, h, this._t1, this._t2);
      if (slope > 0.3 && i < 15) continue; // last tries take what they get
      const targetH = spec.heights[0]
        + Math.random() * (spec.heights[1] - spec.heights[0]);
      const k = targetH / sp.nativeH;

      const makeLevel = (parts) => {
        const g = new THREE.Group();
        for (const part of parts) {
          const mesh = new THREE.Mesh(part.geometry, part.material);
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          g.add(mesh);
        }
        return g;
      };
      const lod = new THREE.LOD();
      lod.addLevel(makeLevel(sp.parts0), 0);
      if (sp.parts1.length) lod.addLevel(makeLevel(sp.parts1), HERO_LOD_DIST);

      const localPoint = s.point.clone().sub(this.center);
      lod.position.copy(localPoint)
        .addScaledVector(s.up, -(0.12 + slope * targetH * 0.12));
      lod.quaternion.setFromUnitVectors(UP, s.up);
      lod.rotateY(Math.random() * Math.PI * 2);
      lod.scale.setScalar(k);
      this._group.add(lod);
      this._heroMesh = lod;
      this._heroPlaced = true;
      this._heroCollider = { local: localPoint.clone(), r: spec.trunkR * k };
      this.colliders.push(this._heroCollider);
      return;
    }
  }

  /**
   * Re-center the forest on a new point (the avatar walked REBUILD_STRAY
   * from the patch center). The lattice is deterministic, so every tree
   * stays exactly where it was — only its detail ring can change.
   */
  _recenterForest(anchorWorld) {
    for (const obj of this._forestMeshes) {
      this._group.remove(obj);
      if (obj.isInstancedMesh) obj.dispose();
    }
    this._forestMeshes.length = 0;
    // Rock colliders sit at the front of the array (pushed first); forest
    // colliders are everything after — truncate and re-add the hero's.
    this.colliders.length = this._rockColliderCount;
    if (this._heroCollider) this.colliders.push(this._heroCollider);
    this._buildForest(anchorWorld);
  }

  /**
   * Upgrade a flight-grade patch to the on-foot grade at the landing point:
   * same deterministic trees, plus the LOD0 ring, undergrowth and the hero.
   */
  setFullDetail(anchorWorld) {
    if (this._mode === 'full' || this._disposed) return;
    this._mode = 'full';
    this._recenterForest(anchorWorld);
  }

  _buildWildlife(centerWorld) {
    this.critters = [];
    this.birds = [];
    if (!this.planet.descriptor.hasAtmosphere) return; // airless = lifeless

    // Grazers: simple two-box creatures that wander and flee the player.
    const bodyGeo = new THREE.BoxGeometry(0.7, 0.55, 1.3);
    const headGeo = new THREE.BoxGeometry(0.4, 0.4, 0.5);
    const mat = new THREE.MeshStandardMaterial({ color: 0x8a6f4d, roughness: 0.9, flatShading: true });
    this._critterAssets = [bodyGeo, headGeo, mat];
    for (let i = 0; i < 40 && this.critters.length < 10; i++) {
      const s = this._sampleSurface(centerWorld, 20, SCATTER_RADIUS * 0.8);
      if (!s) continue;
      const mesh = new THREE.Group();
      const body = new THREE.Mesh(bodyGeo, mat);
      body.position.y = 0.6;
      const head = new THREE.Mesh(headGeo, mat);
      head.position.set(0, 0.95, -0.75);
      mesh.add(body, head);
      const local = s.point.clone().sub(this.center);
      mesh.position.copy(local);
      this._group.add(mesh);
      this.critters.push({
        mesh, local, heading: Math.random() * Math.PI * 2,
        speed: 1.2 + Math.random() * 1.4, panic: 0, turnTimer: Math.random() * 3,
      });
    }

    // Birds: cones circling above the site.
    const birdGeo = new THREE.ConeGeometry(0.35, 1.1, 4);
    birdGeo.rotateX(Math.PI / 2);
    const birdMat = new THREE.MeshStandardMaterial({ color: 0x3a3f4a, roughness: 0.8, flatShading: true });
    this._birdAssets = [birdGeo, birdMat];
    const centerLocal = centerWorld.clone().sub(this.center);
    for (let i = 0; i < 6; i++) {
      const mesh = new THREE.Mesh(birdGeo, birdMat);
      this._group.add(mesh);
      this.birds.push({
        mesh, centerLocal,
        phase: Math.random() * Math.PI * 2,
        r: 40 + Math.random() * 90,
        h: 30 + Math.random() * 35,
        speed: 0.25 + Math.random() * 0.3,
      });
    }
  }

  /**
   * Animate wildlife. Called by whoever owns the patch (on-foot controller
   * passes the avatar position so critters flee; flight passes null).
   * @param {number} dt
   * @param {THREE.Vector3|null} avatarWorld
   */
  update(dt, avatarWorld = null) {
    // Wind clock + per-frame haze mirror for the shared foliage materials.
    getForestAssets().update(dt);

    // Walked far from the patch center? Re-center the detail rings around
    // the avatar (deterministic lattice: same trees, upgraded detail).
    if (avatarWorld && this._centerLocal) {
      this._tmp.copy(avatarWorld).sub(this.center);
      if (this._tmp.distanceTo(this._centerLocal) > REBUILD_STRAY) {
        this._recenterForest(avatarWorld);
      }
    }

    const R = this.planet.radius;
    for (const c of this.critters ?? []) {
      // Wander: drift the heading; flee: run from the avatar.
      c.turnTimer -= dt;
      if (c.turnTimer <= 0) {
        c.turnTimer = 1.5 + Math.random() * 3;
        c.headingTarget = (c.headingTarget ?? c.heading) + (Math.random() - 0.5) * 1.6;
      }
      // Ease toward the target heading instead of snapping (playtest:
      // "they move really weird").
      if (c.headingTarget !== undefined) {
        let dh = c.headingTarget - c.heading;
        while (dh > Math.PI) dh -= Math.PI * 2;
        while (dh < -Math.PI) dh += Math.PI * 2;
        c.heading += dh * Math.min(1, dt * 2.5);
      }
      this._wUp.copy(c.local).normalize();

      // Tangent basis at the critter.
      this._wT1.set(0, 1, 0);
      if (Math.abs(this._wUp.dot(this._wT1)) > 0.9) this._wT1.set(1, 0, 0);
      this._wT1.crossVectors(this._wUp, this._wT1).normalize();
      this._wT2.crossVectors(this._wUp, this._wT1).normalize();

      // Flee: run directly away from a close avatar (heading in basis terms).
      if (avatarWorld) {
        this._tmp.copy(avatarWorld).sub(this.center); // avatar planet-local
        if (this._tmp.distanceTo(c.local) < 16) {
          this._tmp.subVectors(c.local, this._tmp); // away vector
          c.heading = Math.atan2(this._tmp.dot(this._wT2), this._tmp.dot(this._wT1));
          c.headingTarget = c.heading;
          c.panic = 2.2;
        }
      }
      c.panic = Math.max(0, c.panic - dt);
      const speed = c.speed * (c.panic > 0 ? 3 : 1);
      this._tmp.copy(this._wT1).multiplyScalar(Math.cos(c.heading))
        .addScaledVector(this._wT2, Math.sin(c.heading));
      c.local.addScaledVector(this._tmp, speed * dt);

      // Snap to the terrain along the radial (the one true sampler).
      this._wUp.copy(c.local).normalize();
      const h = this.planet.sampler.height(this._wUp.x, this._wUp.y, this._wUp.z);
      c.local.copy(this._wUp).multiplyScalar(R + Math.max(h, 0.5));
      c.mesh.position.copy(c.local);
      // Stand upright AND face the travel direction (they used to slide
      // sideways — up-alignment only, no yaw).
      this._wQuat.setFromUnitVectors(UP, this._wUp);
      const yaw = -c.heading + Math.PI / 2; // rotate local -Z (the head) onto travel
      this._yawQ.setFromAxisAngle(this._wUp, yaw);
      c.mesh.quaternion.copy(this._wQuat).premultiply(this._yawQ);
    }

    for (const b of this.birds ?? []) {
      b.phase += b.speed * dt;
      this._wUp.copy(b.centerLocal).normalize();
      this._wT1.set(0, 1, 0);
      if (Math.abs(this._wUp.dot(this._wT1)) > 0.9) this._wT1.set(1, 0, 0);
      this._wT1.crossVectors(this._wUp, this._wT1).normalize();
      this._wT2.crossVectors(this._wUp, this._wT1).normalize();
      b.mesh.position.copy(b.centerLocal)
        .addScaledVector(this._wUp, b.h)
        .addScaledVector(this._wT1, Math.cos(b.phase) * b.r)
        .addScaledVector(this._wT2, Math.sin(b.phase) * b.r);
      // Nose along the circular travel direction (cone tip is local +Z).
      this._tmp.copy(this._wT1).multiplyScalar(-Math.sin(b.phase))
        .addScaledVector(this._wT2, Math.cos(b.phase)).normalize();
      this._wQuat.setFromUnitVectors(FORWARD_Z, this._tmp);
      b.mesh.quaternion.copy(this._wQuat);
    }
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

  /** Remove a mined rock from the world (and its collider). */
  removeRock(rock) {
    const i = this.rocks.indexOf(rock);
    if (i === -1) return;
    this._group.remove(rock.mesh);
    this.rocks.splice(i, 1);
    if (rock.collider) rock.collider.dead = true;
  }

  /** Tear down all scattered geometry. */
  dispose() {
    this._disposed = true;
    this.planet.group.remove(this._group);
    for (const rock of this.rocks) this._group.remove(rock.mesh);
    this.rocks.length = 0;
    this._rockGeo.dispose();
    this._rockMats.forEach((m) => m.dispose());
    // Forest geometry/materials are SHARED singletons owned by ForestAssets;
    // only the per-patch instance buffers are released here.
    for (const obj of this._forestMeshes) {
      if (obj.isInstancedMesh) obj.dispose();
    }
    this._forestMeshes.length = 0;
    if (this._critterAssets) this._critterAssets.forEach((a) => a.dispose());
    if (this._birdAssets) this._birdAssets.forEach((a) => a.dispose());
  }
}

const UP = new THREE.Vector3(0, 1, 0);
const FORWARD_Z = new THREE.Vector3(0, 0, 1);
