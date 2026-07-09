import * as THREE from 'three';

/**
 * Quadtree cube-sphere terrain with streamed level-of-detail.
 *
 * The planet is six quadtrees (one per cube face) projected onto the
 * sphere. Each node covers a UV square of its face; when the camera gets
 * within `splitFactor × nodeWorldSize`, the node subdivides. Leaves render
 * as (res×res)-vertex patches displaced by the terrain sampler.
 *
 * Streaming rules that keep the surface hole-free and the frame smooth:
 *  - a parent patch stays visible until all four children have meshes
 *  - children stay visible until a merging parent has its mesh back
 *  - patch builds run through a priority queue with a per-frame time
 *    budget (closest patches first), so descending at boost never stalls
 *    the frame — detail simply sharpens over a few frames
 *  - patch geometries are pooled and rewritten in place: after the first
 *    minute of flight, terrain streaming allocates almost nothing
 *
 * Crack handling: every patch carries a skirt (edge ring extruded toward
 * the planet center) so neighboring patches at different LOD levels never
 * show gaps. Normals are computed from a one-ring extended height grid, so
 * lighting is continuous across patch borders.
 */

/** Cube-face basis: [normal, tangentU, tangentV] per face. */
const FACES = [
  { n: new THREE.Vector3(1, 0, 0), u: new THREE.Vector3(0, 0, -1), v: new THREE.Vector3(0, 1, 0) },
  { n: new THREE.Vector3(-1, 0, 0), u: new THREE.Vector3(0, 0, 1), v: new THREE.Vector3(0, 1, 0) },
  { n: new THREE.Vector3(0, 1, 0), u: new THREE.Vector3(1, 0, 0), v: new THREE.Vector3(0, 0, -1) },
  { n: new THREE.Vector3(0, -1, 0), u: new THREE.Vector3(1, 0, 0), v: new THREE.Vector3(0, 0, 1) },
  { n: new THREE.Vector3(0, 0, 1), u: new THREE.Vector3(1, 0, 0), v: new THREE.Vector3(0, 1, 0) },
  { n: new THREE.Vector3(0, 0, -1), u: new THREE.Vector3(-1, 0, 0), v: new THREE.Vector3(0, 1, 0) },
];

const _dir = new THREE.Vector3();

/** Map face UV in [0,1]² to a unit sphere direction. */
function faceUvToDir(face, u, v, target) {
  const f = FACES[face];
  const a = u * 2 - 1;
  const b = v * 2 - 1;
  target.copy(f.n).addScaledVector(f.u, a).addScaledVector(f.v, b);
  return target.normalize();
}

class TerrainNode {
  constructor(tree, face, level, u0, v0, size) {
    this.tree = tree;
    this.face = face;
    this.level = level;
    this.u0 = u0;
    this.v0 = v0;
    this.size = size;

    this.centerDir = faceUvToDir(face, u0 + size / 2, v0 + size / 2, new THREE.Vector3());
    const h = tree.sampler.height(this.centerDir.x, this.centerDir.y, this.centerDir.z);
    /** Node center on the actual surface (planet-local). */
    this.centerPos = this.centerDir.clone().multiplyScalar(tree.radius + h);
    /** Approximate world-space edge length of this node's patch. */
    this.worldSize = tree.radius * (Math.PI / 2) * size;

    /** @type {THREE.Mesh|null} */
    this.mesh = null;
    /** @type {TerrainNode[]|null} */
    this.children = null;
    this.queued = false;
    this.lastWantedFrame = -1;
    /** Set when this node is pruned from the tree; blocks queued builds. */
    this.dead = false;
  }

  get meshReady() {
    return this.mesh !== null;
  }

  createChildren() {
    const half = this.size / 2;
    this.children = [
      new TerrainNode(this.tree, this.face, this.level + 1, this.u0, this.v0, half),
      new TerrainNode(this.tree, this.face, this.level + 1, this.u0 + half, this.v0, half),
      new TerrainNode(this.tree, this.face, this.level + 1, this.u0, this.v0 + half, half),
      new TerrainNode(this.tree, this.face, this.level + 1, this.u0 + half, this.v0 + half, half),
    ];
  }

  /** Recursively drop meshes of this node's descendants back to the pool. */
  releaseChildren() {
    if (!this.children) return;
    for (const child of this.children) {
      child.releaseChildren();
      child.releaseMesh();
      // The node object is discarded (a future split creates fresh nodes);
      // flag it so a stale build-queue entry can't resurrect an orphan.
      child.dead = true;
    }
    this.children = null;
  }

  releaseMesh() {
    if (!this.mesh) return;
    this.tree.group.remove(this.mesh);
    this.tree.geometryPool.push(this.mesh.geometry);
    this.mesh = null;
  }
}

export class QuadtreeSphere {
  /**
   * @param {object} opts
   * @param {number} opts.radius sea-level radius
   * @param {ReturnType<import('../terrainHeight.js').createTerrainSampler>} opts.sampler
   * @param {THREE.Material} opts.material shared terrain material
   * @param {THREE.Vector3} opts.up planet polar axis (for biome latitude)
   * @param {number} [opts.resolution] vertices per patch edge
   * @param {number} [opts.maxDepth]
   * @param {number} [opts.splitFactor]
   * @param {number} [opts.buildBudgetMs]
   */
  constructor({
    radius, sampler, material, up,
    resolution = 17, maxDepth = 8, splitFactor = 3.0, buildBudgetMs = 3.5,
  }) {
    this.radius = radius;
    this.sampler = sampler;
    this.material = material;
    this.up = up;
    this.resolution = resolution;
    this.maxDepth = maxDepth;
    this.splitFactor = splitFactor;
    this.buildBudgetMs = buildBudgetMs;

    /** Parent group; the Planet adds this to its own group. */
    this.group = new THREE.Group();

    this.roots = FACES.map((_, face) => new TerrainNode(this, face, 0, 0, 0, 1));

    /** @type {TerrainNode[]} build queue (re-prioritized each frame) */
    this.queue = [];
    /** @type {THREE.BufferGeometry[]} recycled patch geometries */
    this.geometryPool = [];

    this.frame = 0;

    // Shared index buffer (identical for every patch).
    this.sharedIndex = buildPatchIndex(resolution);

    // Scratch buffers for patch building (one-ring extended grid).
    const ext = resolution + 2;
    this._heights = new Float32Array(ext * ext);
    this._dirs = new Float32Array(ext * ext * 3);
    this._positions = new Float32Array(ext * ext * 3);

    this._camLocal = new THREE.Vector3();
    this._scratchColor = new THREE.Color();
    this._scratchNormal = new THREE.Vector3();
    this._va = new THREE.Vector3();
    this._vb = new THREE.Vector3();
  }

  /**
   * Force-rebuild every patch overlapping a region (terrain sculpting).
   * Released meshes re-enter the normal build queue on the next LOD pass,
   * closest-first — a sculpted hill pops into shape within a few frames.
   * @param {THREE.Vector3} centerLocal planet-local point on the surface
   * @param {number} worldRadius affected radius in world units
   */
  invalidateRegion(centerLocal, worldRadius) {
    const visit = (node) => {
      if (node.centerPos.distanceTo(centerLocal) > node.worldSize * 1.3 + worldRadius) return;
      node.releaseMesh();
      if (node.children) for (const child of node.children) visit(child);
    };
    for (const root of this.roots) visit(root);
  }

  /**
   * Per-frame LOD update.
   * @param {THREE.Vector3} cameraLocal camera position in planet-local space
   */
  update(cameraLocal) {
    this.frame++;
    this._camLocal.copy(cameraLocal);
    for (const root of this.roots) {
      this._visit(root);
    }
    this._processQueue();
  }

  _visit(node) {
    node.lastWantedFrame = this.frame;
    const dist = this._camLocal.distanceTo(node.centerPos);
    const wantSplit = node.level < this.maxDepth && dist < node.worldSize * this.splitFactor;

    if (wantSplit) {
      if (!node.children) node.createChildren();
      const allReady = node.children.every((c) => c.meshReady || c.children);
      if (allReady) {
        // Children cover us: hide our patch and recurse.
        if (node.mesh) node.mesh.visible = false;
        for (const child of node.children) this._visit(child);
      } else {
        // Keep our patch on screen while children build.
        this._ensureMesh(node);
        if (node.mesh) node.mesh.visible = true;
        for (const child of node.children) {
          child.lastWantedFrame = this.frame;
          this._ensureMesh(child);
        }
      }
    } else {
      this._ensureMesh(node);
      if (node.mesh) {
        node.mesh.visible = true;
        // Our own mesh is live again — descendants can be recycled.
        node.releaseChildren();
      } else if (node.children) {
        // Merging but our mesh isn't rebuilt yet: children keep covering.
        for (const child of node.children) this._visit(child);
      }
    }
  }

  _ensureMesh(node) {
    if (node.mesh || node.queued) return;
    node.queued = true;
    this.queue.push(node);
  }

  _processQueue() {
    if (this.queue.length === 0) return;

    // Closest-first: priority = distance normalized by patch size.
    this.queue.sort((a, b) => {
      const pa = this._camLocal.distanceTo(a.centerPos) / a.worldSize;
      const pb = this._camLocal.distanceTo(b.centerPos) / b.worldSize;
      return pa - pb;
    });

    const start = performance.now();
    let built = 0;
    while (this.queue.length > 0) {
      // Always build at least one patch; stop when over budget.
      if (built > 0 && performance.now() - start > this.buildBudgetMs) break;
      const node = this.queue.shift();
      node.queued = false;
      // Stale request (camera moved on) or pruned node: drop it.
      if (node.dead || node.lastWantedFrame < this.frame - 1) continue;
      this._buildPatch(node);
      built++;
    }
  }

  /** Sample the extended grid and produce the node's mesh. */
  _buildPatch(node) {
    const res = this.resolution;
    const ext = res + 2;
    const { sampler, radius } = this;
    const step = node.size / (res - 1);

    // --- Sample heights + dirs on the extended grid (one-ring border) ---
    const heights = this._heights;
    const dirs = this._dirs;
    for (let j = 0; j < ext; j++) {
      const v = node.v0 + (j - 1) * step;
      for (let i = 0; i < ext; i++) {
        const u = node.u0 + (i - 1) * step;
        faceUvToDir(node.face, u, v, _dir);
        const idx = j * ext + i;
        dirs[idx * 3] = _dir.x;
        dirs[idx * 3 + 1] = _dir.y;
        dirs[idx * 3 + 2] = _dir.z;
        heights[idx] = sampler.height(_dir.x, _dir.y, _dir.z);
      }
    }

    // --- Positions (planet-local) for the extended grid ---
    const positions = this._positions;
    for (let idx = 0; idx < ext * ext; idx++) {
      const r = radius + heights[idx];
      positions[idx * 3] = dirs[idx * 3] * r;
      positions[idx * 3 + 1] = dirs[idx * 3 + 1] * r;
      positions[idx * 3 + 2] = dirs[idx * 3 + 2] * r;
    }

    // --- Acquire geometry (pooled) ---
    const vertexCount = res * res + res * 4;
    let geometry = this.geometryPool.pop();
    if (!geometry) {
      geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertexCount * 3), 3));
      geometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(vertexCount * 3), 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(vertexCount * 3), 3));
      geometry.setIndex(this.sharedIndex);
      geometry.boundingSphere = new THREE.Sphere();
    }

    const posAttr = geometry.getAttribute('position');
    const normAttr = geometry.getAttribute('normal');
    const colorAttr = geometry.getAttribute('color');

    // Patch origin: mesh sits at the node center so vertex coordinates stay
    // small (float32-friendly at planetary scale).
    const origin = node.centerPos;

    let minX = Infinity, minY = Infinity, minZ = Infinity;
    let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;

    const scratchNormal = this._scratchNormal;
    const scratchColor = this._scratchColor;
    const va = this._va;
    const vb = this._vb;

    for (let j = 0; j < res; j++) {
      for (let i = 0; i < res; i++) {
        const gi = (j + 1) * ext + (i + 1); // index into extended grid
        const vi = j * res + i; // index into patch vertices

        const px = positions[gi * 3] - origin.x;
        const py = positions[gi * 3 + 1] - origin.y;
        const pz = positions[gi * 3 + 2] - origin.z;
        posAttr.setXYZ(vi, px, py, pz);
        if (px < minX) minX = px; if (px > maxX) maxX = px;
        if (py < minY) minY = py; if (py > maxY) maxY = py;
        if (pz < minZ) minZ = pz; if (pz > maxZ) maxZ = pz;

        // Central-difference normal from the extended grid.
        const l = gi - 1, r = gi + 1, d = gi - ext, up2 = gi + ext;
        va.set(
          positions[r * 3] - positions[l * 3],
          positions[r * 3 + 1] - positions[l * 3 + 1],
          positions[r * 3 + 2] - positions[l * 3 + 2],
        );
        vb.set(
          positions[up2 * 3] - positions[d * 3],
          positions[up2 * 3 + 1] - positions[d * 3 + 1],
          positions[up2 * 3 + 2] - positions[d * 3 + 2],
        );
        scratchNormal.crossVectors(va, vb).normalize();
        // Ensure outward orientation regardless of face handedness.
        _dir.set(dirs[gi * 3], dirs[gi * 3 + 1], dirs[gi * 3 + 2]);
        if (scratchNormal.dot(_dir) < 0) scratchNormal.negate();
        normAttr.setXYZ(vi, scratchNormal.x, scratchNormal.y, scratchNormal.z);

        // Biome color.
        const slope = 1 - Math.max(0, scratchNormal.dot(_dir));
        sampler.color(_dir, heights[gi], slope, this.up, scratchColor);
        colorAttr.setXYZ(vi, scratchColor.r, scratchColor.g, scratchColor.b);
      }
    }

    // --- Skirt vertices: copies of the edge ring, sunk toward the center ---
    const skirtDepth = Math.max(2, node.worldSize * 0.06);
    let skirtIndex = res * res;
    const writeSkirt = (i, j) => {
      const gi = (j + 1) * ext + (i + 1);
      const vi = j * res + i;
      _dir.set(dirs[gi * 3], dirs[gi * 3 + 1], dirs[gi * 3 + 2]);
      posAttr.setXYZ(
        skirtIndex,
        posAttr.getX(vi) - _dir.x * skirtDepth,
        posAttr.getY(vi) - _dir.y * skirtDepth,
        posAttr.getZ(vi) - _dir.z * skirtDepth,
      );
      normAttr.setXYZ(skirtIndex, normAttr.getX(vi), normAttr.getY(vi), normAttr.getZ(vi));
      colorAttr.setXYZ(skirtIndex, colorAttr.getX(vi), colorAttr.getY(vi), colorAttr.getZ(vi));
      skirtIndex++;
    };
    for (let i = 0; i < res; i++) writeSkirt(i, 0); // top edge (v = 0)
    for (let i = 0; i < res; i++) writeSkirt(i, res - 1); // bottom edge
    for (let j = 0; j < res; j++) writeSkirt(0, j); // left edge
    for (let j = 0; j < res; j++) writeSkirt(res - 1, j); // right edge

    posAttr.needsUpdate = true;
    normAttr.needsUpdate = true;
    colorAttr.needsUpdate = true;

    // Bounding sphere from the AABB (skirts included via slack).
    geometry.boundingSphere.center.set((minX + maxX) / 2, (minY + maxY) / 2, (minZ + maxZ) / 2);
    geometry.boundingSphere.radius =
      Math.hypot(maxX - minX, maxY - minY, maxZ - minZ) / 2 + skirtDepth;

    const mesh = node.mesh ?? new THREE.Mesh(geometry, this.material);
    mesh.geometry = geometry;
    mesh.position.copy(origin);
    mesh.receiveShadow = true;
    node.mesh = mesh;
    this.group.add(mesh);
  }

  /** Total active patch count (debug/perf readout). */
  get patchCount() {
    return this.group.children.length;
  }
}

/**
 * Index buffer shared by all patches: grid triangles + skirt walls.
 * Skirt vertex layout must match `_buildPatch`'s write order.
 */
function buildPatchIndex(res) {
  const indices = [];
  // Grid quads. With every face's tangent basis satisfying
  // cross(tangentU, tangentV) = +faceNormal, (a, b, c)/(b, d, c) winds
  // counter-clockwise seen from outside the sphere.
  for (let j = 0; j < res - 1; j++) {
    for (let i = 0; i < res - 1; i++) {
      const a = j * res + i;
      const b = a + 1;
      const c = a + res;
      const d = c + 1;
      indices.push(a, b, c, b, d, c);
    }
  }
  // Skirts: connect each edge vertex to its sunken copy. Emitted with both
  // windings — they're only visible through LOD cracks for a frame or two,
  // and double-siding them here is cheaper than reasoning about per-face
  // handedness.
  const skirtStart = res * res;
  const topRow = (i) => i; // v = 0
  const bottomRow = (i) => (res - 1) * res + i;
  const leftCol = (j) => j * res;
  const rightCol = (j) => j * res + (res - 1);
  const edges = [
    { edge: topRow, offset: skirtStart },
    { edge: bottomRow, offset: skirtStart + res },
    { edge: leftCol, offset: skirtStart + res * 2 },
    { edge: rightCol, offset: skirtStart + res * 3 },
  ];
  for (const { edge, offset } of edges) {
    for (let k = 0; k < res - 1; k++) {
      const e0 = edge(k);
      const e1 = edge(k + 1);
      const s0 = offset + k;
      const s1 = offset + k + 1;
      indices.push(e0, e1, s0, s0, e1, s1);
      indices.push(e0, s0, e1, e1, s0, s1);
    }
  }
  return new THREE.BufferAttribute(new Uint16Array(indices), 1);
}
