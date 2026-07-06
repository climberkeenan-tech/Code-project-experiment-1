import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

/**
 * Hand-authored ship models (the first departure from procedural-only).
 *
 * The player supplied a Meshy AI "Nebula Vanguard" gunship FBX for the second
 * ship in the progression. It's fetched from /models at boot, normalized into
 * the game's ship convention (nose -Z, up +Y, centered, sized for its class),
 * and cached as a prototype. Rigs clone the prototype, so geometry and
 * textures are shared across the player hull and any escort copies.
 *
 * Loading is async; ShipFactory falls back to the procedural hull until the
 * prototype is ready, and main.js hot-swaps the flying ship on arrival.
 */

/** Nose-to-tail length for the gunship, in world units (class: 2nd ship). */
const TARGET_LENGTH = 11;

/**
 * Orientation fix from the model's authoring axes to the game convention
 * (nose along -Z). Calibrated with a four-angle turntable: the Meshy export
 * is authored nose along -X (gun barrel + tapered bow on -X, engine block on
 * +X), so a -90° yaw brings the nose onto -Z.
 */
const YAW = -Math.PI / 2;
const PITCH = 0;

let gunshipProto = null;
let loadPromise = null;

/** The normalized prototype group, or null while still loading/failed. */
export function getGunshipProto() {
  return gunshipProto;
}

/**
 * Kick off (or join) the model load. Resolves with the prototype or null on
 * failure — callers must keep working with procedural fallbacks either way.
 */
export function loadModelShips() {
  if (loadPromise) return loadPromise;
  loadPromise = new Promise((resolve) => {
    new FBXLoader().load(
      'models/gunship.fbx',
      (obj) => {
        try {
          gunshipProto = normalize(obj);
          resolve(gunshipProto);
        } catch (err) {
          console.warn('[models] gunship normalize failed:', err);
          resolve(null);
        }
      },
      undefined,
      (err) => {
        console.warn('[models] gunship load failed (procedural fallback stays):', err);
        resolve(null);
      },
    );
  });
  return loadPromise;
}

/** Center, orient, scale, and tag the raw FBX scene into a ship prototype. */
function normalize(obj) {
  obj.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(obj);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  // Inner group: recenter, re-axis, rescale the authored content.
  obj.position.sub(center);
  const inner = new THREE.Group();
  inner.add(obj);
  inner.rotation.set(PITCH, YAW, 0);
  const maxDim = Math.max(size.x, size.y, size.z, 1e-6);
  inner.scale.setScalar(TARGET_LENGTH / maxDim);

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
