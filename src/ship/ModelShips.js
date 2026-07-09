import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';

/**
 * Hand-authored ship models (player-supplied Meshy assets).
 *
 * Each entry is fetched from /models at boot, normalized into the game's ship
 * convention (nose -Z, up +Y, centered, sized for its class), and cached as a
 * prototype. Rigs clone prototypes, so geometry and textures are shared
 * across the player hull and any escort copies.
 *
 * Loading is async; ShipFactory falls back to the procedural hull until a
 * prototype is ready, and main.js hot-swaps the flying ship on arrival.
 *
 * Size philosophy (bible): the flagship must be VASTLY larger than everything
 * else — it stores whole ships in its side hangars, so a fighter should read
 * like a toy next to it.
 */

const MODELS = {
  // "Nebula Sentinel" — the starter ship (design 1 of 4 in the progression).
  starter: {
    url: 'models-glb/starter.glb',
    targetLength: 9,
    yaw: -Math.PI / 2, // Meshy convention: authored nose along -X
    pitch: 0,
    // Thruster anchors measured from the mesh (rear-facing vertex clusters).
    anchors: [[-1.81, -0.66, 3.78], [1.81, -0.66, 3.78], [-1.25, -0.57, 3.84], [1.25, -0.57, 3.84], [-1.45, 0.54, 4.18], [1.45, 0.54, 4.18]],
  },
  // "Nebula Vanguard" gunship — the second ship in the progression.
  gunship: {
    url: 'models-glb/gunship.glb',
    targetLength: 11,
    yaw: -Math.PI / 2, // authored nose along -X → rotate onto -Z
    pitch: 0,
    // Thruster anchors measured from the mesh (rear-facing vertex clusters).
    anchors: [[-1.11, 0.19, 5.11], [1.11, 0.19, 5.11], [-1.01, -0.47, 5.05], [1.01, -0.47, 5.05]],
  },
  // "Obsidian Dreadnought" — the mid capital: bridges the 50→100 gap.
  // Big, but deliberately in the MIDDLE: it dwarfs the fighters yet is
  // clearly outclassed by the flagship parked next to it.
  dreadnought: {
    url: 'models-glb/dreadnought.glb',
    targetLength: 32,
    yaw: -Math.PI / 2, // Meshy convention: authored nose along -X
    pitch: 0,
    // Thruster anchors measured from the mesh (rear-facing vertex clusters).
    anchors: [[-8.47, -2.44, 14.79], [8.47, -2.44, 14.79], [-2.11, -3.85, 15.28], [2.11, -3.85, 15.28]],
  },
  // "Imperial Star Destroyer"-style flagship — the fleet carrier.
  flagship: {
    url: 'models-glb/flagship.glb',
    targetLength: 100, // vast: ~11x a fighter, dwarfs everything it stores
    yaw: -Math.PI / 2, // Meshy convention (verified on the turntable)
    pitch: 0,
    // Thruster anchors measured from the mesh (rear-facing vertex clusters).
    anchors: [[-10.54, -5.47, 45.25], [10.54, -5.47, 45.25], [-4.4, 2.35, 46.37], [4.4, 2.35, 46.37], [-2.59, -7.36, 47.01], [2.59, -7.36, 47.01]],
  },
  // "Aethelred" — the player-authored deep-space cruiser and new fleet apex.
  aethelred: {
    url: 'models-glb/aethelred.glb',
    targetLength: 300, // ~3x the flagship: the biggest hull in the game
    yaw: -Math.PI / 2, // Meshy convention: authored nose along -X
    pitch: 0,
    // Thruster anchors measured from the mesh (rear-facing vertex clusters).
    anchors: [[-27.19, -6.06, 134.18], [27.19, -6.06, 134.18], [-9.38, -10.18, 133.22], [9.38, -10.18, 133.22], [-9.2, 15.13, 134.25], [9.2, 15.13, 134.25]],
  },
  // "Obsidian Dreadnought" mk2 — the SF-50 Aegis gunner ship (player-authored).
  aegis: {
    url: 'models-glb/aegis.glb',
    targetLength: 16, // gunner ship: between the fighters (9-11) and mid capital (32)
    yaw: -Math.PI / 2, // Meshy convention: authored nose along -X
    pitch: 0,
    // Thruster anchors measured from the mesh (rear-facing vertex clusters).
    anchors: [[-4.04, 0.15, 7.59], [4.04, 0.15, 7.59], [-2.15, -0.37, 6.96], [2.15, -0.37, 6.96], [-1.09, 0.04, 7.79], [1.09, 0.04, 7.79], [-1.08, -0.85, 7.51], [1.08, -0.85, 7.51]],
  },
  // "Night Hawk" — the mission-reward interceptor (player-authored).
  nighthawk: {
    url: 'models-glb/nighthawk.glb',
    targetLength: 12, // agile interceptor, a touch bigger than the gunship
    yaw: -Math.PI / 2, // Meshy convention: authored nose along -X
    pitch: 0,
    // Thruster anchors measured from the mesh (rear-facing vertex clusters).
    anchors: [[-1.52, 0.62, 5.6], [1.52, 0.62, 5.6], [0, -0.6, 5.43]],
  },
  // "Imperial Star Destroyer" — mission-25 reward with the FLEET CALL power.
  stardestroyer: {
    url: 'models-glb/stardestroyer.glb',
    targetLength: 120,
    yaw: -Math.PI / 2, // Meshy convention: authored nose along -X
    pitch: 0,
    // Thruster anchors measured from the mesh (rear-facing vertex clusters).
    anchors: [[-12.2, 7.3, 56], [12.2, 7.3, 56], [-3.05, -6.6, 51.4], [3.05, -6.6, 51.4], [0, 6.7, 53.5]],
  },
  // "Millennium Falcon" — mission-40 reward freighter.
  falcon: {
    url: 'models-glb/falcon.glb',
    targetLength: 13,
    yaw: -Math.PI / 2, // Meshy convention: authored nose along -X
    pitch: 0,
    // The Falcon's iconic engine STRIP: a row of four across the stern.
    anchors: [[-0.9, 0.1, 5.7], [-0.3, 0.1, 5.75], [0.3, 0.1, 5.75], [0.9, 0.1, 5.7]],
  },
  // "Wedge of the Void" — mission-50 reward strike ship.
  wedge: {
    url: 'models-glb/wedge.glb',
    targetLength: 14,
    yaw: -Math.PI / 2, // Meshy convention: authored nose along -X
    pitch: 0,
    // Thruster anchors measured from the mesh (rear-facing vertex clusters).
    anchors: [[-0.7, 0.72, 6.68], [0.7, 0.72, 6.68], [-0.95, -0.35, 6.3], [0.95, -0.35, 6.3]],
  },
  // "Obsidian Leviathan" — the enemy HUB fortress (moon-sized, never moves).
  leviathan: {
    url: 'models-glb/leviathan.glb',
    targetLength: 2600,
    yaw: -Math.PI / 2, // Meshy convention: authored nose along -X
    pitch: 0,
  },
  // "Crimson Dreadnought" — the SF-70 Bastion gunner ship (player-authored).
  bastion: {
    url: 'models-glb/bastion.glb',
    targetLength: 20, // heavier gunner ship, still under the mid capital
    yaw: -Math.PI / 2, // Meshy convention: authored nose along -X
    pitch: 0,
    // Thruster anchors measured from the mesh (rear-facing vertex clusters).
    anchors: [[-1.03, 1.07, 8.74], [1.03, 1.07, 8.74], [-1.18, -0.07, 8.35], [1.18, -0.07, 8.35], [0, -0.01, 9.03]],
  },
};

/**
 * Optional per-model exhaust-nozzle tuning (fractions), applied on top of the
 * bounds-based default in ShipFactory. x = spread (× full width), y = height
 * offset (× full height, + is up), z = how far back (× stern Z). Tuned by eye
 * against a rear render of each hull so the blue flame sits on the thrusters.
 */
const NOZZLES = {
  starter: { x: 0.16, y: 0.02, z: 0.9 },
  gunship: { x: 0.28, y: 0.0, z: 0.86 },
  dreadnought: { x: 0.2, y: 0.05, z: 0.92 },
  flagship: { x: 0.22, y: 0.04, z: 0.94 },
  aethelred: { x: 0.24, y: 0.06, z: 0.9 }, // wide multi-engine stern cluster
};

const protos = {};
const enemyProtos = {};
let loadPromise = null;
const loadListeners = [];

/**
 * Subscribe to per-model arrival (fires as EACH model finishes, not when
 * all do — on a slow connection the fleet upgrades hull by hull). Models
 * already loaded are replayed immediately.
 */
export function onModelLoaded(cb) {
  loadListeners.push(cb);
  for (const id of Object.keys(protos)) cb(id);
}

/** How many hulls the registry will load (for the start-screen gate). */
export function getModelTotal() {
  return Object.keys(MODELS).length;
}

/** The normalized prototype for a model id, or null while loading/failed. */
export function getModelProto(id) {
  return protos[id] ?? null;
}

/**
 * Enemy variant of a model: the SAME geometry and NATURAL colours as the
 * player's hull — no red repaint. Hostiles are told apart by the HUD target
 * brackets, the red radar blips and their engine glow, not by a tinted hull.
 * Materials are still cloned once into a faction-local set (shared by every
 * enemy clone, no per-ship leaks) so nothing here can bleed onto the player.
 */
export function getEnemyModelProto(id) {
  if (enemyProtos[id]) return enemyProtos[id];
  const base = protos[id];
  if (!base) return null;
  const clone = base.clone(true);
  const matCache = new Map();
  clone.traverse((c) => {
    if (!c.isMesh) return;
    const arr = Array.isArray(c.material) ? c.material : [c.material];
    const mats = arr.map((m) => {
      if (!m) return m;
      if (!matCache.has(m.uuid)) matCache.set(m.uuid, m.clone());
      return matCache.get(m.uuid);
    });
    c.material = Array.isArray(c.material) ? mats : mats[0];
  });
  clone.userData.shipBounds = base.userData.shipBounds;
  enemyProtos[id] = clone;
  return clone;
}

/** Kick off (or join) loading of all registered models. */
export function loadModelShips() {
  if (loadPromise) return loadPromise;
  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);
  loadPromise = Promise.all(Object.entries(MODELS).map(([id, spec]) =>
    new Promise((resolve) => {
      loader.load(
        spec.url,
        (gltf) => {
          try {
            protos[id] = normalize(gltf.scene, spec);
            if (NOZZLES[id]) protos[id].userData.nozzles = NOZZLES[id];
            // Authored per-thruster anchors (proto space, measured from the
            // real geometry) — supports hulls with any number of nozzles.
            if (spec.anchors) protos[id].userData.nozzleAnchors = spec.anchors;
            for (const cb of loadListeners) cb(id);
          } catch (err) {
            console.warn(`[models] ${id} normalize failed:`, err);
          }
          resolve();
        },
        undefined,
        (err) => {
          console.warn(`[models] ${id} load failed (procedural fallback stays):`, err);
          resolve();
        },
      );
    }),
  )).then(() => protos);
  return loadPromise;
}

/** Center, orient, scale, and tag a raw FBX scene into a ship prototype. */
function normalize(obj, spec) {
  obj.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(obj);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  // Inner group: recenter, re-axis, rescale the authored content.
  obj.position.sub(center);
  const inner = new THREE.Group();
  inner.add(obj);
  inner.rotation.set(spec.pitch, spec.yaw, 0);
  const maxDim = Math.max(size.x, size.y, size.z, 1e-6);
  inner.scale.setScalar(spec.targetLength / maxDim);

  const proto = new THREE.Group();
  proto.add(inner);

  proto.traverse((child) => {
    if (!child.isMesh) return;
    child.castShadow = true;
    child.receiveShadow = true;
    // FBX materials arrive as Phong; keep them (they carry the baked
    // textures) but make sure they play nice with the HDR pipeline.
    const mats = Array.isArray(child.material) ? child.material : [child.material];
    for (const m of mats) {
      if (!m) continue;
      m.side = THREE.FrontSide;
      if ('shininess' in m) m.shininess = Math.min(m.shininess ?? 30, 60);
    }
  });

  // Post-normalization bounds drive gameplay anchors for the rig.
  const nbox = new THREE.Box3().setFromObject(proto);
  const nsize = nbox.getSize(new THREE.Vector3());
  proto.userData.shipBounds = {
    length: nsize.z,
    width: nsize.x,
    height: nsize.y,
    rearZ: nbox.max.z,
    noseZ: nbox.min.z,
  };
  return proto;
}
