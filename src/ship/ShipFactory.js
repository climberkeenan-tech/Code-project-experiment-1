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
 * Standard material set for a ship, tinted per faction/class.
 */
function createMaterials({ hullColor, accentColor, glowColor }) {
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
 * The player's ship: a sleek twin-engine interceptor.
 * @returns {ShipRig}
 */
export function createPlayerShip() {
  const group = new THREE.Group();
  const glowColor = new THREE.Color(0.9, 2.6, 5.2); // hot blue, HDR
  const mats = createMaterials({
    hullColor: 0xb9c6d6,
    accentColor: 0x24303f,
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
  addFin(group, mats.accent, { height: 0.95, rootLength: 1.15, rake: 0.55, z: 2.25 });
  const engines = addNacelles(group, mats.hull, mats.glow, {
    x: 0.78, y: -0.02, z: 1.55, radius: 0.34, length: 1.7,
  });
  const hardpoints = addCannons(group, mats.accent, { x: 2.75, y: -0.06, z: 1.0, length: 1.3 });

  for (const child of group.children) {
    child.castShadow = true;
    child.receiveShadow = true;
  }

  return { group, engines, hardpoints, radius: 3.2, glowColor };
}

/**
 * Enemy ship classes. Each has a distinct silhouette and threat color so
 * players can read the danger level at a glance.
 *
 * @param {'scout'|'fighter'|'heavy'} type
 * @returns {ShipRig}
 */
export function createEnemyShip(type) {
  const group = new THREE.Group();
  let rig;

  if (type === 'scout') {
    // Small, dart-like, single fin — fast and fragile.
    const glowColor = new THREE.Color(5.0, 1.4, 0.5); // hot orange
    const mats = createMaterials({ hullColor: 0x6e7787, accentColor: 0x3d2f2a, glowColor });
    addFuselage(group, mats.hull, {
      length: 3.2, rearRadius: 0.45, noseRadius: 0.16, flatten: 0.66, noseLength: 1.5,
    });
    addWing(group, mats.accent, {
      span: 1.9, rootChordZ0: 0.1, rootChordZ1: 1.35, tipChordZ0: 1.2, tipChordZ1: 1.55,
      thickness: 0.07, y: 0,
    });
    addFin(group, mats.accent, { height: 0.8, rootLength: 0.9, rake: 0.5, z: 0.7 });
    const engines = addNacelles(group, mats.hull, mats.glow, {
      x: 0.42, y: 0, z: 1.3, radius: 0.24, length: 1.1,
    });
    const hardpoints = addCannons(group, mats.accent, { x: 1.8, y: -0.04, z: 1.05, length: 0.9 });
    rig = { group, engines, hardpoints, radius: 2.2, glowColor };
  } else if (type === 'heavy') {
    // Broad gunship: wide fuselage, twin fins, four engines.
    const glowColor = new THREE.Color(5.2, 0.7, 0.9); // menacing red
    const mats = createMaterials({ hullColor: 0x4c5361, accentColor: 0x27221f, glowColor });
    addFuselage(group, mats.hull, {
      length: 6.4, rearRadius: 1.1, noseRadius: 0.55, flatten: 0.55, noseLength: 1.9,
    });
    addCanopy(group, mats.glass, { z: -2.0, width: 0.5, height: 0.5, length: 1.2 });
    addWing(group, mats.accent, {
      span: 3.6, rootChordZ0: -0.9, rootChordZ1: 2.4, tipChordZ0: 1.4, tipChordZ1: 2.6,
      thickness: 0.14, y: -0.12,
    });
    addFin(group, mats.accent, { height: 1.1, rootLength: 1.5, rake: 0.7, z: 2.6, x: 0.7 });
    addFin(group, mats.accent, { height: 1.1, rootLength: 1.5, rake: 0.7, z: 2.6, x: -0.77 });
    const enginesInner = addNacelles(group, mats.hull, mats.glow, {
      x: 0.85, y: -0.1, z: 2.6, radius: 0.4, length: 1.9,
    });
    const enginesOuter = addNacelles(group, mats.hull, mats.glow, {
      x: 1.65, y: -0.05, z: 2.7, radius: 0.32, length: 1.6,
    });
    const hardpoints = addCannons(group, mats.accent, { x: 3.4, y: -0.1, z: 1.5, length: 1.5 });
    rig = { group, engines: [...enginesInner, ...enginesOuter], hardpoints, radius: 4.4, glowColor };
  } else {
    // 'fighter' — the baseline adversary, mirrored planform to the player.
    const glowColor = new THREE.Color(4.6, 1.1, 0.4); // amber
    const mats = createMaterials({ hullColor: 0x596273, accentColor: 0x2f2721, glowColor });
    addFuselage(group, mats.hull, {
      length: 4.4, rearRadius: 0.6, noseRadius: 0.26, flatten: 0.62, noseLength: 1.6,
    });
    addCanopy(group, mats.glass, { z: -1.05, width: 0.32, height: 0.4, length: 1.0 });
    addWing(group, mats.accent, {
      span: 2.7, rootChordZ0: 0.3, rootChordZ1: 1.9, tipChordZ0: -0.4, tipChordZ1: 0.9,
      thickness: 0.09, y: -0.08, // forward-swept: instantly reads as hostile
    });
    addFin(group, mats.accent, { height: 0.9, rootLength: 1.05, rake: 0.5, z: 2.1 });
    const engines = addNacelles(group, mats.hull, mats.glow, {
      x: 0.72, y: 0, z: 1.5, radius: 0.3, length: 1.5,
    });
    const hardpoints = addCannons(group, mats.accent, { x: 2.55, y: -0.05, z: -0.1, length: 1.1 });
    rig = { group, engines, hardpoints, radius: 3.0, glowColor };
  }

  for (const child of rig.group.children) {
    child.castShadow = true;
    child.receiveShadow = true;
  }
  return rig;
}
