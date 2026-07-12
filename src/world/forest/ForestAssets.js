import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { applyAtmosphericHaze } from '../hazeShader.js';

/**
 * Photorealistic forest assets: Poly Haven CC0 photogrammetry scans (fir,
 * island broadleafs, jacaranda, quiver tree, snags, log, stump, fern) plus
 * the ez-tree MIT grass card, compressed to meshopt GLB in
 * public/models-glb/trees/ (see docs/ASSET_LICENSES.md).
 *
 * Each tree GLB carries TWO detail levels as sibling nodes: LOD0 (the full
 * scan) and LOD1 (meshopt-simplified, shares the textures). The forest
 * builder instances LOD0 near the landing point and LOD1 further out.
 *
 * All materials are shared singletons patched once with:
 *  - an instancing-safe WIND vertex shader (trunk sway + leaf flutter,
 *    phase from the instance translation so every tree moves differently;
 *    bark and leaves of one tree share the same sway term so the canopy
 *    never tears off its trunk)
 *  - the game's atmospheric haze (with an added instanceMatrix fix — the
 *    stock injection ignores instancing, which would fog every tree as if
 *    it stood at the patch origin)
 *
 * Loading is lazy and idempotent: kicked off at game start, joined by the
 * first SurfaceScatter that needs it.
 */

/**
 * Species registry. heights = min/max in-game tree height (m); trunkR =
 * walk-blocking collider radius at scale 1 (0 = walk-through); leafMats =
 * material-name fragments treated as foliage (wind flutter + tint jitter).
 */
export const SPECIES = {
  fir: {
    url: 'models-glb/trees/fir.glb', heights: [13, 23], trunkR: 0.45,
    wind: { sway: 0.35, flutter: 0.10 },
  },
  island1: {
    url: 'models-glb/trees/island1.glb', heights: [5.5, 10], trunkR: 0.28,
    wind: { sway: 0.28, flutter: 0.08 },
  },
  island2: {
    url: 'models-glb/trees/island2.glb', heights: [4, 7.5], trunkR: 0.25,
    wind: { sway: 0.24, flutter: 0.08 },
  },
  jacaranda: {
    url: 'models-glb/trees/jacaranda.glb', heights: [14, 20], trunkR: 0.7,
    wind: { sway: 0.45, flutter: 0.10 },
  },
  hero: {
    url: 'models-glb/trees/hero.glb', heights: [7.2, 8.4], trunkR: 0.42,
    wind: { sway: 0.16, flutter: 0.05 },
  },
  quiver: {
    url: 'models-glb/trees/quiver.glb', heights: [3.2, 5.5], trunkR: 0.12,
    wind: { sway: 0.10, flutter: 0.03 },
  },
  snag: {
    url: 'models-glb/trees/snag.glb', heights: [4, 7], trunkR: 0.1,
    wind: { sway: 0.06, flutter: 0 },
  },
  log: {
    url: 'models-glb/trees/log.glb', heights: [0.25, 0.4], trunkR: 0,
    wind: { sway: 0, flutter: 0 },
  },
  stump: {
    url: 'models-glb/trees/stump.glb', heights: [0.5, 0.75], trunkR: 0.5,
    wind: { sway: 0, flutter: 0 },
  },
  fern: {
    url: 'models-glb/trees/fern.glb', heights: [0.35, 0.7], trunkR: 0,
    wind: { sway: 0, flutter: 0.06 },
  },
  grass: {
    url: 'models-glb/trees/grass.glb', heights: [0.7, 1.3], trunkR: 0,
    wind: { sway: 0, flutter: 0.09 },
  },
};

const LEAF_HINTS = ['leaves', 'twig', 'fern', 'grass'];

class ForestAssets {
  constructor() {
    this.ready = false;
    this._promise = null;

    /** Wind clock shared by every foliage program. */
    this.windUniforms = { uWindTime: { value: 0 } };

    /**
     * Haze uniforms owned here (materials are shared across planets, so the
     * live per-planet uniforms are copied in each frame via update()).
     */
    this.hazeUniforms = {
      uHazeColor: { value: new THREE.Color(0.5, 0.7, 0.9) },
      uHazeDensity: { value: 0 },
      uPlanetCenter: { value: new THREE.Vector3() },
      uSunDirPlanet: { value: new THREE.Vector3(0, 1, 0) },
    };
    this._planet = null;

    /**
     * id → {parts0, parts1, nativeH, baseY} where partsN is
     * Array<{geometry, material, leaf}> (LOD1 empty for small props).
     * @type {Object<string, object>}
     */
    this.species = {};
  }

  /** Idempotent async load of every species GLB. */
  load() {
    if (this._promise) return this._promise;
    const loader = new GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);
    this._promise = Promise.all(Object.entries(SPECIES).map(async ([id, spec]) => {
      try {
        const gltf = await loader.loadAsync(spec.url);
        this.species[id] = this._prepare(id, spec, gltf.scene);
      } catch (err) {
        console.warn(`[forest] ${id} failed to load — species skipped`, err);
      }
    })).then(() => { this.ready = true; });
    return this._promise;
  }

  /**
   * Split a loaded scene into LOD0/LOD1 part lists, bake stray node
   * transforms into the geometry, normalize the base to y=0, and patch the
   * materials (shared per species-part) with wind + haze.
   */
  _prepare(id, spec, scene) {
    scene.updateMatrixWorld(true);
    const parts0 = [];
    const parts1 = [];
    const box = new THREE.Box3();
    const matCache = new Map();

    scene.traverse((n) => {
      if (!n.isMesh) return;
      const inLod1 = n.name === 'LOD1' || n.parent?.name === 'LOD1';
      let geometry = n.geometry;
      // Bake any node transform so instancing math starts from raw verts.
      // meshopt-quantized GLBs store positions as normalized int16 with the
      // dequant scale in the node matrix — writing baked world coords back
      // into that attribute clamps to [-1,1] and collapses the mesh into a
      // unit box, so positions must become plain float32 FIRST.
      const m = n.matrixWorld;
      if (m.determinant() !== 1 || m.elements[12] || m.elements[13] || m.elements[14]) {
        geometry = geometry.clone();
        const pos = geometry.getAttribute('position');
        if (pos.normalized || !(pos.array instanceof Float32Array)) {
          const out = new Float32Array(pos.count * 3);
          for (let i = 0; i < pos.count; i++) {
            out[i * 3] = pos.getX(i);
            out[i * 3 + 1] = pos.getY(i);
            out[i * 3 + 2] = pos.getZ(i);
          }
          geometry.setAttribute('position', new THREE.BufferAttribute(out, 3));
        }
        geometry.applyMatrix4(m);
        geometry.computeBoundingSphere();
      }
      if (!inLod1) box.expandByObject(n);

      let material = matCache.get(n.material);
      if (!material) {
        material = n.material;
        const leaf = LEAF_HINTS.some((h) => (material.name || '').toLowerCase().includes(h));
        material.side = THREE.DoubleSide;
        material.envMapIntensity = 0.3;
        // ez-tree's grass sprite is grayscale, authored to be tinted.
        if (id === 'grass') material.color.setHex(0x55803a);
        if (material.transparent) { // any BLEND stragglers → alpha test
          material.transparent = false;
          material.alphaTest = Math.max(material.alphaTest, 0.4);
          material.depthWrite = true;
        }
        material.userData.leaf = leaf;
        matCache.set(n.material, material);
      }
      (inLod1 ? parts1 : parts0).push({ geometry, material, leaf: material.userData.leaf });
    });

    const nativeH = Math.max(box.max.y - box.min.y, 1e-3);
    const baseY = box.min.y;
    // Patch every unique material once, sized to this species.
    for (const mat of new Set([...parts0, ...parts1].map((p) => p.material))) {
      this._patchMaterial(mat, spec, nativeH);
    }
    return { parts0, parts1, nativeH, baseY };
  }

  /**
   * Wind + haze in one onBeforeCompile. Wind displaces `transformed` in
   * object space (so the instance matrix scales/rotates it consistently for
   * every part of a tree); haze is the stock planet injection with an added
   * instancing-aware world position.
   */
  _patchMaterial(mat, spec, nativeH) {
    applyAtmosphericHaze(mat, this.hazeUniforms);
    const hazeHook = mat.onBeforeCompile;
    const leaf = !!mat.userData.leaf;
    const sway = spec.wind.sway.toFixed(3);
    const flutter = (leaf ? spec.wind.flutter : 0).toFixed(3);
    const treeH = nativeH.toFixed(3);

    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uWindTime = this.windUniforms.uWindTime;
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', '#include <common>\nuniform float uWindTime;')
        .replace('#include <begin_vertex>', `#include <begin_vertex>
        {
          vec3 wInstPos = vec3(0.0);
          #ifdef USE_INSTANCING
            wInstPos = vec3(instanceMatrix[3][0], instanceMatrix[3][1], instanceMatrix[3][2]);
          #endif
          float wPhase = wInstPos.x * 0.317 + wInstPos.z * 0.471 + wInstPos.y * 0.181;
          float wH = clamp(transformed.y / ${treeH}, 0.0, 1.0);
          float wSway = ${sway} * wH * wH
            * (sin(uWindTime * 0.9 + wPhase) + 0.55 * sin(uWindTime * 1.63 + wPhase * 1.7));
          transformed.x += wSway;
          transformed.z += wSway * 0.62;
          ${flutter !== '0.000' ? `
          float wFl = ${flutter} * (0.35 + 0.65 * wH)
            * sin(uWindTime * 3.9 + wPhase * 2.3 + transformed.x * 1.9 + transformed.y * 1.3);
          transformed += objectNormal * wFl;` : ''}
        }`);
      hazeHook(shader);
      // The stock haze varying ignores instancing — every instanced tree
      // would fog as if it stood at the mesh origin. Patch it.
      shader.vertexShader = shader.vertexShader.replace(
        'vHazeWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;',
        `vec4 hazeWP = vec4(transformed, 1.0);
        #ifdef USE_INSTANCING
          hazeWP = instanceMatrix * hazeWP;
        #endif
        vHazeWorldPos = (modelMatrix * hazeWP).xyz;`,
      );
    };
    mat.customProgramCacheKey = () => `foliage:${treeH}:${sway}:${flutter}:${leaf}`;
    mat.needsUpdate = true;
  }

  /**
   * Bake distant-tree impostors: each tree species is rendered once (full
   * LOD0, albedo only) into a transparent 256² target, applied to a static
   * cross-quad. Thousands of far trees then cost 4 triangles each — that is
   * what makes the forest read as ENDLESS from the air instead of a dotted
   * disc. Requires the live renderer, so it runs on first patch build.
   */
  ensureImpostors(renderer) {
    if (this._impostorsReady) return;
    this._impostorsReady = true;

    this.impostorGeo = buildCrossQuad();
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera();
    const prevTarget = renderer.getRenderTarget();
    const prevToneMapping = renderer.toneMapping;
    const prevClearColor = new THREE.Color();
    renderer.getClearColor(prevClearColor);
    const prevClearAlpha = renderer.getClearAlpha();
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.setClearColor(0x000000, 0);

    for (const id of ['fir', 'island1', 'island2', 'jacaranda', 'quiver', 'snag']) {
      const sp = this.species[id];
      if (!sp) continue;
      // Albedo-only stand-ins: the real materials carry haze/wind/lighting
      // that must not bake into the sprite.
      const group = new THREE.Group();
      const bakeMats = [];
      for (const part of sp.parts0) {
        const bm = new THREE.MeshBasicMaterial({
          map: part.material.map ?? null,
          // Strong dim ≈ the self-shadowing/AO a lit canopy shows; without
          // it the flat sprite reads far paler than the real trees beside it.
          color: 0x6e6e6e,
          alphaTest: Math.max(part.material.alphaTest, 0.35),
          side: THREE.DoubleSide,
        });
        bakeMats.push(bm);
        group.add(new THREE.Mesh(part.geometry, bm));
      }
      scene.add(group);
      const box = new THREE.Box3().setFromObject(group);
      const size = box.getSize(new THREE.Vector3());
      const w = Math.max(size.x, size.z);
      camera.left = -w / 2;
      camera.right = w / 2;
      camera.top = box.max.y;
      camera.bottom = box.min.y;
      camera.near = 0.1;
      camera.far = w * 4;
      camera.position.set(0, 0, w * 2);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();

      const rt = new THREE.WebGLRenderTarget(256, 256, { depthBuffer: true });
      rt.texture.generateMipmaps = true;
      rt.texture.minFilter = THREE.LinearMipmapLinearFilter;
      renderer.setRenderTarget(rt);
      renderer.clear();
      renderer.render(scene, camera);

      const mat = new THREE.MeshLambertMaterial({
        map: rt.texture,
        // A face-on quad catches full sun where a real canopy self-occludes;
        // dim the response so the sprite ring matches the LOD ring beside it.
        color: 0x9a9a9a,
        alphaTest: 0.3,
        side: THREE.DoubleSide,
      });
      applyAtmosphericHaze(mat, this.hazeUniforms);
      mat.customProgramCacheKey = () => 'impostor-haze';
      sp.impostor = { material: mat, aspect: w / size.y };

      scene.remove(group);
      bakeMats.forEach((m) => m.dispose());
    }

    renderer.setRenderTarget(prevTarget);
    renderer.toneMapping = prevToneMapping;
    renderer.setClearColor(prevClearColor, prevClearAlpha);
  }

  /** The forest patch on `planet` drives haze from that planet's uniforms. */
  bindPlanet(planet) {
    this._planet = planet;
  }

  /** Advance the wind clock and mirror the bound planet's live haze. */
  update(dt) {
    this.windUniforms.uWindTime.value += dt;
    const p = this._planet;
    if (p) {
      const u = p.hazeUniforms;
      this.hazeUniforms.uHazeColor.value.copy(u.uHazeColor.value);
      this.hazeUniforms.uHazeDensity.value = u.uHazeDensity.value;
      this.hazeUniforms.uPlanetCenter.value.copy(u.uPlanetCenter.value);
      this.hazeUniforms.uSunDirPlanet.value.copy(u.uSunDirPlanet.value);
    }
  }
}

/** Two unit quads crossed at 90°, base at y=0 — the impostor canvas. */
function buildCrossQuad() {
  const pos = [];
  const nor = [];
  const uv = [];
  const addQuad = (nx, nz) => {
    // Perpendicular-to-normal quad, width/height 1, centered on the axis.
    const tx = -nz;
    const tz = nx;
    const corners = [
      [-0.5 * tx, 0, -0.5 * tz, 0, 0], [0.5 * tx, 0, 0.5 * tz, 1, 0],
      [0.5 * tx, 1, 0.5 * tz, 1, 1], [-0.5 * tx, 0, -0.5 * tz, 0, 0],
      [0.5 * tx, 1, 0.5 * tz, 1, 1], [-0.5 * tx, 1, -0.5 * tz, 0, 1],
    ];
    for (const [x, y, z, u, v] of corners) {
      pos.push(x, y, z);
      nor.push(nx, 0, nz);
      uv.push(u, v);
    }
  };
  addQuad(0, 1);
  addQuad(1, 0);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  return geo;
}

let singleton = null;

/** @returns {ForestAssets} */
export function getForestAssets() {
  if (!singleton) singleton = new ForestAssets();
  return singleton;
}
