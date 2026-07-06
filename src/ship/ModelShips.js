import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

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
  // "Nebula Vanguard" gunship — the second ship in the progression.
  gunship: {
    url: 'models/gunship.fbx',
    targetLength: 11,
    yaw: -Math.PI / 2, // authored nose along -X → rotate onto -Z
    pitch: 0,
  },
  // "Imperial Star Destroyer"-style flagship — the fleet carrier.
  flagship: {
    url: 'models/flagship.fbx',
    targetLength: 60, // vast: ~7x a fighter, dwarfs everything it stores
    yaw: -Math.PI / 2, // Meshy convention (verified on the turntable)
    pitch: 0,
  },
};

const protos = {};
let loadPromise = null;

/** The normalized prototype for a model id, or null while loading/failed. */
export function getModelProto(id) {
  return protos[id] ?? null;
}

/** Kick off (or join) loading of all registered models. */
export function loadModelShips() {
  if (loadPromise) return loadPromise;
  const loader = new FBXLoader();
  loadPromise = Promise.all(Object.entries(MODELS).map(([id, spec]) =>
    new Promise((resolve) => {
      loader.load(
        spec.url,
        (obj) => {
          try {
            protos[id] = normalize(obj, spec);
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
