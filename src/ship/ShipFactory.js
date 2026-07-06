import * as THREE from 'three';

/**
 * Procedural ship meshes.
 *
 * Every ship in the game is assembled at runtime from primitive geometry —
 * no model files. Ships are deliberately low-poly with flat shading and
 * PBR materials: the silhouette reads clearly at gameplay distances, the
 * style is cohesive, and the vertex cost is trivial for mobile.
 *
 * Conventions:
 *  - Ship forward is local -Z (matches three.js camera convention).
 *  - Ship up is +Y.
 *  - The factory returns the group plus gameplay metadata: engine nozzle
 *    anchors (for glow/trails), weapon hardpoints, and a bounding radius.
 *
 * @typedef {object} ShipRig
 * @property {THREE.Group} group
 * @property {THREE.Vector3[]} engines    nozzle positions in ship space
 * @property {THREE.Vector3[]} hardpoints laser muzzle positions in ship space
 * @property {number} radius              bounding sphere radius
 * @property {THREE.Color} glowColor      engine glow tint
 */

/** Shared geometry cache — ships of the same class reuse geometry. */
const geometryCache = new Map();

function cached(key, build) {
  if (!geometryCache.has(key)) geometryCache.set(key, build());
  return geometryCache.get(key);
}

/**
 * A tapered, flattened hexagonal fuselage along -Z with a nose cone,
 * merged into the parent group as two meshes.
 */
function addFuselage(group, material, { length, rearRadius, noseRadius, flatten, noseLength }) {
  const key = `fus:${length}:${rearRadius}:${noseRadius}:${flatten}:${noseLength}`;
  const bodyGeom = cached(key, () => {
    const g = new THREE.CylinderGeometry(rearRadius, noseRadius, length, 6);
    g.rotateX(Math.PI / 2); // axis Y → Z; wide end (+Y) becomes rear (+Z)
    g.scale(1, flatten, 1);
    return g;
  });
  const body = new THREE.Mesh(bodyGeom, material);
  group.add(body);

  const noseGeom = cached(`${key}:nose`, () => {
    const g = new THREE.ConeGeometry(noseRadius, noseLength, 6);
    g.rotateX(-Math.PI / 2); // cone tip (+Y) → -Z (forward)
    g.scale(1, flatten, 1);
    return g;
  });
  const nose = new THREE.Mesh(noseGeom, material);
  nose.position.z = -(length / 2 + noseLength / 2 - 0.01);
  group.add(nose);
}

/**
 * A symmetric delta wing crossing the fuselage, built from an extruded
 * planform shape. `span` is the half-span; `sweep` pushes tips rearward.
 */
function addWing(group, material, { span, rootChordZ0, rootChordZ1, tipChordZ0, tipChordZ1, thickness, y }) {
  const key = `wing:${span}:${rootChordZ0}:${rootChordZ1}:${tipChordZ0}:${tipChordZ1}:${thickness}`;
  const geom = cached(key, () => {
    // Shape is drawn in (x, z) planform space then rotated flat.
    const shape = new THREE.Shape();
    shape.moveTo(-span, tipChordZ0);
    shape.lineTo(0, rootChordZ0);
    shape.lineTo(span, tipChordZ0);
    shape.lineTo(span, tipChordZ1);
    shape.lineTo(0, rootChordZ1);
    shape.lineTo(-span, tipChordZ1);
    shape.closePath();
    const g = new THREE.ExtrudeGeometry(shape, { depth: thickness, bevelEnabled: false });
    g.rotateX(Math.PI / 2); // planform (x, y→z), thickness now vertical
    g.computeVertexNormals();
    return g;
  });
  const wing = new THREE.Mesh(geom, material);
  wing.position.y = y;
  group.add(wing);
}

/** A vertical stabilizer fin (extruded triangle) at the rear. */
function addFin(group, material, { height, rootLength, rake, z, thickness = 0.07, x = 0, tilt = 0 }) {
  const key = `fin:${height}:${rootLength}:${rake}:${thickness}`;
  const geom = cached(key, () => {
    // Drawn in (z, y) profile space: root along z, tip raked back.
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(rootLength, 0);
    shape.lineTo(rootLength + rake, height);
    shape.lineTo(rootLength * 0.55 + rake, height);
    shape.closePath();
    const g = new THREE.ExtrudeGeometry(shape, { depth: thickness, bevelEnabled: false });
    g.rotateY(-Math.PI / 2); // profile x → world -z... oriented along ship axis
    g.translate(thickness / 2, 0, 0);
    g.computeVertexNormals();
    return g;
  });
  const fin = new THREE.Mesh(geom, material);
  fin.position.set(x, 0, z);
  fin.rotation.z = tilt;
  group.add(fin);
}

/** Twin engine nacelles with emissive exhaust discs. Returns nozzle anchors. */
function addNacelles(group, hullMat, glowMat, { x, y, z, radius, length }) {
  const anchors = [];
  const nacelleGeom = cached(`nac:${radius}:${length}`, () => {
    const g = new THREE.CylinderGeometry(radius, radius * 0.82, length, 6);
    g.rotateX(Math.PI / 2);
    return g;
  });
  const discGeom = cached(`disc:${radius}`, () => new THREE.CircleGeometry(radius * 0.72, 12));
  for (const side of [-1, 1]) {
    const nacelle = new THREE.Mesh(nacelleGeom, hullMat);
    nacelle.position.set(side * x, y, z);
    group.add(nacelle);

    const disc = new THREE.Mesh(discGeom, glowMat);
    disc.position.set(side * x, y, z + length / 2 + 0.02);
    group.add(disc);

    anchors.push(new THREE.Vector3(side * x, y, z + length / 2 + 0.05));
  }
  return anchors;
}

/** Thin cannon barrels at wing tips. Returns muzzle hardpoints. */
function addCannons(group, material, { x, y, z, length }) {
  const points = [];
  const geom = cached(`cannon:${length}`, () => {
    const g = new THREE.CylinderGeometry(0.07, 0.09, length, 5);
    g.rotateX(Math.PI / 2);
    return g;
  });
  for (const side of [-1, 1]) {
    const barrel = new THREE.Mesh(geom, material);
    barrel.position.set(side * x, y, z);
    group.add(barrel);
    points.push(new THREE.Vector3(side * x, y, z - length / 2 - 0.1));
  }
  return points;
}

/** A canopy bubble of dark glass. */
function addCanopy(group, glassMat, { z, width, height, length }) {
  const geom = cached(`canopy:${width}:${height}:${length}`, () => {
    const g = new THREE.SphereGeometry(1, 10, 7);
    g.scale(width, height, length);
    return g;
  });
  const canopy = new THREE.Mesh(geom, glassMat);
  canopy.position.set(0, height * 0.75, z);
  group.add(canopy);
}

/**
 * Standard material set for a ship, tinted per faction/class. Cached so
 * every ship of a class shares one material set — enemies spawn and
 * despawn constantly, and per-ship materials would leak GPU programs.
 */
const materialCache = new Map();

function createMaterials({ hullColor, accentColor, glowColor }) {
  const key = `${hullColor}:${accentColor}:${glowColor.getHexString()}`;
  if (materialCache.has(key)) return materialCache.get(key);
  const materials = buildMaterials({ hullColor, accentColor, glowColor });
  materialCache.set(key, materials);
  return materials;
}

function buildMaterials({ hullColor, accentColor, glowColor }) {
  return {
    hull: new THREE.MeshStandardMaterial({
      color: hullColor,
      metalness: 0.72,
      roughness: 0.38,
      flatShading: true,
    }),
    accent: new THREE.MeshStandardMaterial({
      color: accentColor,
      metalness: 0.6,
      roughness: 0.45,
      flatShading: true,
    }),
    glass: new THREE.MeshStandardMaterial({
      color: 0x0a1626,
      metalness: 0.95,
      roughness: 0.12,
      flatShading: true,
    }),
    // HDR emissive color > 1.0 so the exhaust discs bloom.
    glow: new THREE.MeshBasicMaterial({ color: glowColor }),
  };
}

/**
 * Player ship catalog — the bible's ship-progression ladder (levels 10→100).
 * Owned ships form a collection; the active one is lost on destruction while
 * stored ones survive. Stat multipliers scale hull/shield/engine off the
 * baseline; `crew` is the roster capacity; visuals escalate via scale, an
 * extra engine pair, twin fins, and a per-tier livery.
 */
export const PLAYER_SHIPS = [
  { id: 'starter', name: 'SF-10 Sparrow', level: 10, cost: 0,
    hull: 1, shield: 1, engine: 1, crew: 2,
    scale: 1, hullColor: 0xb9c6d6, accentColor: 0x24303f, glow: [0.9, 2.6, 5.2] },
  { id: 'explorer', name: 'SF-20 Wayfarer', level: 20, cost: 600,
    hull: 1.25, shield: 1.2, engine: 1.08, crew: 3,
    scale: 1.08, hullColor: 0xc9d4c8, accentColor: 0x2e4034, glow: [0.8, 3.2, 3.4] },
  { id: 'interceptor', name: 'SF-30 Kestrel', level: 30, cost: 1500,
    hull: 1.5, shield: 1.45, engine: 1.18, crew: 3,
    scale: 1.14, hullColor: 0xd6c9b9, accentColor: 0x4a3524, glow: [3.6, 2.2, 0.7] },
  { id: 'frigate', name: 'SF-50 Aegis', level: 50, cost: 4200,
    hull: 2.2, shield: 2.1, engine: 1.28, crew: 4, twinFin: true,
    scale: 1.26, hullColor: 0xaebfd4, accentColor: 0x22344d, glow: [1.2, 2.2, 5.4] },
  { id: 'battlecruiser', name: 'SF-70 Bastion', level: 70, cost: 12500,
    hull: 3.4, shield: 3.1, engine: 1.38, crew: 5, twinFin: true, quadEngines: true,
    scale: 1.42, hullColor: 0x9aa8bd, accentColor: 0x40274d, glow: [3.2, 1.2, 5.2] },
  { id: 'sovereign', name: 'SF-100 Sovereign', level: 100, cost: 42000,
    hull: 5.2, shield: 4.6, engine: 1.5, crew: 7, twinFin: true, quadEngines: true,
    scale: 1.62, hullColor: 0xd8dde6, accentColor: 0x9a7b2e, glow: [4.6, 3.4, 1.0] },
];

export const PLAYER_SHIP_BY_ID = Object.fromEntries(PLAYER_SHIPS.map((s) => [s.id, s]));

/**
 * The player's ship, built from a catalog variant (default: the starter).
 * @param {string} [variantId]
 * @returns {ShipRig}
 */
export function createPlayerShip(variantId = 'starter') {
  const v = PLAYER_SHIP_BY_ID[variantId] ?? PLAYER_SHIPS[0];
  const group = new THREE.Group();
  const glowColor = new THREE.Color(...v.glow);
  const mats = createMaterials({
    hullColor: v.hullColor,
    accentColor: v.accentColor,
    glowColor,
  });

  addFuselage(group, mats.hull, {
    length: 4.6, rearRadius: 0.62, noseRadius: 0.3, flatten: 0.6, noseLength: 1.7,
  });
  addCanopy(group, mats.glass, { z: -1.15, width: 0.34, height: 0.42, length: 1.05 });
  addWing(group, mats.accent, {
    span: 2.9, rootChordZ0: -0.5, rootChordZ1: 1.7, tipChordZ0: 1.15, tipChordZ1: 1.85,
    thickness: 0.09, y: -0.1,
  });
  if (v.twinFin) {
    addFin(group, mats.accent, { height: 0.95, rootLength: 1.15, rake: 0.55, z: 2.25, x: 0.5 });
    addFin(group, mats.accent, { height: 0.95, rootLength: 1.15, rake: 0.55, z: 2.25, x: -0.57 });
  } else {
    addFin(group, mats.accent, { height: 0.95, rootLength: 1.15, rake: 0.55, z: 2.25 });
  }
  const engines = addNacelles(group, mats.hull, mats.glow, {
    x: 0.78, y: -0.02, z: 1.55, radius: 0.34, length: 1.7,
  });
  if (v.quadEngines) {
    engines.push(...addNacelles(group, mats.hull, mats.glow, {
      x: 1.35, y: 0.05, z: 1.65, radius: 0.26, length: 1.4,
    }));
  }
  const hardpoints = addCannons(group, mats.accent, { x: 2.75, y: -0.06, z: 1.0, length: 1.3 });

  const k = v.scale;
  if (k !== 1) {
    group.scale.setScalar(k);
    for (const hp of hardpoints) hp.multiplyScalar(k);
  }

  for (const child of group.children) {
    child.castShadow = true;
    child.receiveShadow = true;
  }

  return { group, engines, hardpoints, radius: 3.2 * k, glowColor };
}

/** A boxy weapon/sensor pod, mirrored on both sides. Returns its anchors. */
function addPods(group, material, { x, y, z, w, h, l }) {
  const anchors = [];
  const geom = cached(`pod:${w}:${h}:${l}`, () => new THREE.BoxGeometry(w, h, l));
  for (const side of [-1, 1]) {
    const pod = new THREE.Mesh(geom, material);
    pod.position.set(side * x, y, z);
    group.add(pod);
    anchors.push(new THREE.Vector3(side * x, y, z - l / 2 - 0.1));
  }
  return anchors;
}

/**
 * Playtest fix: enemies read too small at combat distance. Each class gets a
 * uniform scale-up applied to the whole rig — the group is scaled (cached
 * geometry untouched), the hardpoints are scaled to match (they're used in
 * world-space math without the group transform), and the collision radius
 * grows with it, making ships both more visible and easier to hit.
 */
const ENEMY_SCALE = { scout: 1.6, fighter: 1.5, heavy: 1.4, cruiser: 1.35, destroyer: 1.0 };

/**
 * Enemy ship classes. Each has a distinct silhouette and threat color so
 * players can read the danger level at a glance. Assembled by a per-type
 * builder map (keys match ENEMY_TYPES) so adding a class is one entry.
 *
 * @param {'scout'|'fighter'|'heavy'|'cruiser'|'destroyer'} type
 * @returns {ShipRig}
 */
export function createEnemyShip(type) {
  const build = ENEMY_BUILDERS[type] || ENEMY_BUILDERS.fighter;
  const rig = build();
  const k = ENEMY_SCALE[type] ?? 1.4;
  if (k !== 1) {
    rig.group.scale.setScalar(k);
    for (const hp of rig.hardpoints) hp.multiplyScalar(k);
    rig.radius *= k;
  }
  for (const child of rig.group.children) {
    child.castShadow = true;
    child.receiveShadow = true;
  }
  return rig;
}

const ENEMY_BUILDERS = {
  // Small, dart-like, single fin — fast and fragile. Sized to be hittable.
  scout() {
    const group = new THREE.Group();
    const glowColor = new THREE.Color(5.0, 1.4, 0.5); // hot orange
    const mats = createMaterials({ hullColor: 0x97a3b8, accentColor: 0x9a4b2e, glowColor });
    addFuselage(group, mats.hull, {
      length: 3.6, rearRadius: 0.5, noseRadius: 0.18, flatten: 0.66, noseLength: 1.6,
    });
    addWing(group, mats.accent, {
      span: 2.2, rootChordZ0: 0.1, rootChordZ1: 1.4, tipChordZ0: 1.2, tipChordZ1: 1.6,
      thickness: 0.08, y: 0,
    });
    addFin(group, mats.accent, { height: 0.85, rootLength: 0.95, rake: 0.5, z: 0.7 });
    const engines = addNacelles(group, mats.hull, mats.glow, {
      x: 0.46, y: 0, z: 1.45, radius: 0.26, length: 1.2,
    });
    const hardpoints = addCannons(group, mats.accent, { x: 2.05, y: -0.04, z: 1.05, length: 0.9 });
    return { group, engines, hardpoints, radius: 3.0, glowColor };
  },

  // Baseline adversary, forward-swept planform reads instantly hostile.
  fighter() {
    const group = new THREE.Group();
    const glowColor = new THREE.Color(4.6, 1.1, 0.4); // amber
    const mats = createMaterials({ hullColor: 0x8792ab, accentColor: 0xa35a2a, glowColor });
    addFuselage(group, mats.hull, {
      length: 4.6, rearRadius: 0.62, noseRadius: 0.26, flatten: 0.62, noseLength: 1.6,
    });
    addCanopy(group, mats.glass, { z: -1.05, width: 0.32, height: 0.4, length: 1.0 });
    addWing(group, mats.accent, {
      span: 2.8, rootChordZ0: 0.3, rootChordZ1: 1.9, tipChordZ0: -0.4, tipChordZ1: 0.9,
      thickness: 0.1, y: -0.08,
    });
    addFin(group, mats.accent, { height: 0.95, rootLength: 1.05, rake: 0.5, z: 2.1 });
    const engines = addNacelles(group, mats.hull, mats.glow, {
      x: 0.74, y: 0, z: 1.55, radius: 0.31, length: 1.5,
    });
    const hardpoints = addCannons(group, mats.accent, { x: 2.65, y: -0.05, z: -0.1, length: 1.1 });
    return { group, engines, hardpoints, radius: 3.2, glowColor };
  },

  // Broad gunship: wide fuselage, twin fins, four engines.
  heavy() {
    const group = new THREE.Group();
    const glowColor = new THREE.Color(5.2, 0.7, 0.9); // menacing red
    const mats = createMaterials({ hullColor: 0x7d8798, accentColor: 0x8f3b2b, glowColor });
    addFuselage(group, mats.hull, {
      length: 6.6, rearRadius: 1.15, noseRadius: 0.58, flatten: 0.55, noseLength: 2.0,
    });
    addCanopy(group, mats.glass, { z: -2.0, width: 0.5, height: 0.5, length: 1.2 });
    addWing(group, mats.accent, {
      span: 3.8, rootChordZ0: -0.9, rootChordZ1: 2.4, tipChordZ0: 1.4, tipChordZ1: 2.6,
      thickness: 0.15, y: -0.12,
    });
    addFin(group, mats.accent, { height: 1.1, rootLength: 1.5, rake: 0.7, z: 2.6, x: 0.7 });
    addFin(group, mats.accent, { height: 1.1, rootLength: 1.5, rake: 0.7, z: 2.6, x: -0.77 });
    const enginesInner = addNacelles(group, mats.hull, mats.glow, {
      x: 0.9, y: -0.1, z: 2.7, radius: 0.42, length: 2.0,
    });
    const enginesOuter = addNacelles(group, mats.hull, mats.glow, {
      x: 1.7, y: -0.05, z: 2.8, radius: 0.34, length: 1.7,
    });
    const hardpoints = addCannons(group, mats.accent, { x: 3.5, y: -0.1, z: 1.5, length: 1.5 });
    return { group, engines: [...enginesInner, ...enginesOuter], hardpoints, radius: 4.6, glowColor };
  },

  // Missile Cruiser: bulky standoff platform with big side missile pods.
  cruiser() {
    const group = new THREE.Group();
    const glowColor = new THREE.Color(3.4, 0.8, 5.0); // cold violet
    const mats = createMaterials({ hullColor: 0x837b9c, accentColor: 0x6a4fae, glowColor });
    addFuselage(group, mats.hull, {
      length: 8.4, rearRadius: 1.35, noseRadius: 0.7, flatten: 0.7, noseLength: 2.2,
    });
    addCanopy(group, mats.glass, { z: -2.7, width: 0.55, height: 0.5, length: 1.3 });
    addWing(group, mats.accent, {
      span: 4.4, rootChordZ0: -0.6, rootChordZ1: 2.2, tipChordZ0: 0.8, tipChordZ1: 2.0,
      thickness: 0.2, y: -0.1,
    });
    // Missile pods along the wings — the class's signature launch hardpoints.
    const hardpoints = addPods(group, mats.accent, { x: 2.6, y: 0.05, z: 0.2, w: 0.7, h: 0.6, l: 2.6 });
    addFin(group, mats.accent, { height: 1.4, rootLength: 1.8, rake: 0.9, z: 3.2, x: 0.9 });
    addFin(group, mats.accent, { height: 1.4, rootLength: 1.8, rake: 0.9, z: 3.2, x: -0.98 });
    const engines = addNacelles(group, mats.hull, mats.glow, {
      x: 1.1, y: -0.05, z: 3.4, radius: 0.5, length: 2.2,
    });
    return { group, engines, hardpoints, radius: 6.5, glowColor };
  },

  // Planet Destroyer: a slow, colossal capital ship — a boss to avoid early.
  destroyer() {
    const group = new THREE.Group();
    const glowColor = new THREE.Color(6.0, 0.5, 0.4); // deep angry red
    const mats = createMaterials({ hullColor: 0x6b7382, accentColor: 0x66302a, glowColor });
    // Long central spine assembled from stacked fuselage segments.
    addFuselage(group, mats.hull, {
      length: 26, rearRadius: 3.4, noseRadius: 1.4, flatten: 0.62, noseLength: 6,
    });
    // Dorsal ridge + command tower.
    const towerGeom = cached('destroyerTower', () => new THREE.BoxGeometry(2.2, 2.6, 5));
    const tower = new THREE.Mesh(towerGeom, mats.accent);
    tower.position.set(0, 2.0, 4);
    group.add(tower);
    addCanopy(group, mats.glass, { z: 1.8, width: 0.9, height: 0.7, length: 2.0 });
    // Broad flat wings/sponsons bristling with weapon pods.
    addWing(group, mats.accent, {
      span: 12, rootChordZ0: -5, rootChordZ1: 7, tipChordZ0: 0, tipChordZ1: 5,
      thickness: 0.6, y: -0.3,
    });
    const hardpoints = [
      ...addPods(group, mats.accent, { x: 5.5, y: 0.4, z: -3, w: 1.4, h: 1.2, l: 3.4 }),
      ...addPods(group, mats.accent, { x: 8.5, y: 0.2, z: 1, w: 1.2, h: 1.0, l: 3.0 }),
    ];
    addFin(group, mats.accent, { height: 4.2, rootLength: 6, rake: 3, z: 8, x: 2.4 });
    addFin(group, mats.accent, { height: 4.2, rootLength: 6, rake: 3, z: 8, x: -2.8 });
    // A bank of engines across the stern.
    const e1 = addNacelles(group, mats.hull, mats.glow, { x: 2.2, y: 0, z: 12, radius: 1.3, length: 4 });
    const e2 = addNacelles(group, mats.hull, mats.glow, { x: 5.0, y: -0.2, z: 12, radius: 1.1, length: 3.6 });
    return { group, engines: [...e1, ...e2], hardpoints, radius: 26, glowColor };
  },
};
