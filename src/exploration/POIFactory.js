import * as THREE from 'three';
import { createEnemyShip } from '../ship/ShipFactory.js';
import { getGlowTexture } from '../fx/textures.js';

/**
 * Procedural meshes for discoverable sites.
 *
 * Everything is assembled from primitives with shared materials, sized to
 * dwarf the player's fighter so arriving at one feels like an event.
 * Factories return `{ group, radius, animate(dt, elapsed) }` — the POI
 * system calls `animate` only while the site is instantiated nearby.
 */

const hullMat = new THREE.MeshStandardMaterial({
  color: 0x5a636e, metalness: 0.7, roughness: 0.45, flatShading: true,
});
const darkMat = new THREE.MeshStandardMaterial({
  color: 0x2c3138, metalness: 0.55, roughness: 0.6, flatShading: true,
});
const panelMat = new THREE.MeshStandardMaterial({
  color: 0x14243e, metalness: 0.85, roughness: 0.3, flatShading: true,
});
const wreckMat = new THREE.MeshStandardMaterial({
  color: 0x3a3d42, metalness: 0.5, roughness: 0.8, flatShading: true,
});

function beacon(color = new THREE.Color(4, 0.6, 0.5)) {
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: getGlowTexture(64, 2.6),
    color,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }));
  sprite.scale.setScalar(6);
  return sprite;
}

/** A dead orbital station: hub, habitat ring, spokes, panels, beacons. */
export function createStation() {
  const group = new THREE.Group();

  const hub = new THREE.Mesh(new THREE.CylinderGeometry(16, 16, 52, 8), hullMat);
  group.add(hub);

  const ring = new THREE.Mesh(new THREE.TorusGeometry(58, 7, 8, 24), hullMat);
  ring.rotation.x = Math.PI / 2;
  group.add(ring);

  for (let i = 0; i < 4; i++) {
    const spoke = new THREE.Mesh(new THREE.BoxGeometry(3.4, 3.4, 52), darkMat);
    const angle = (i / 4) * Math.PI * 2;
    spoke.position.set(Math.cos(angle) * 29, 0, Math.sin(angle) * 29);
    spoke.lookAt(Math.cos(angle) * 100, 0, Math.sin(angle) * 100);
    group.add(spoke);
  }

  for (const side of [-1, 1]) {
    const panel = new THREE.Mesh(new THREE.BoxGeometry(44, 0.8, 18), panelMat);
    panel.position.set(0, side * 34, 0);
    panel.rotation.z = side * 0.18;
    group.add(panel);
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 14, 6), darkMat);
    mast.position.set(0, side * 28, 0);
    group.add(mast);
  }

  const beaconA = beacon();
  beaconA.position.set(0, 30, 0);
  const beaconB = beacon(new THREE.Color(0.5, 2.4, 3.2));
  beaconB.position.set(58, 0, 0);
  group.add(beaconA, beaconB);

  return {
    group,
    radius: 78,
    animate(dt, elapsed) {
      group.rotation.y += dt * 0.02; // derelict spin, barely alive
      const pulse = (Math.sin(elapsed * 2.2) * 0.5 + 0.5) * 0.9 + 0.1;
      beaconA.material.opacity = pulse;
      beaconB.material.opacity = 1.1 - pulse;
    },
  };
}

/** A hulked warship, dark and tumbling, shedding debris. */
export function createWreck() {
  const group = new THREE.Group();

  const rig = createEnemyShip('heavy');
  rig.group.traverse((child) => {
    if (child.isMesh) child.material = wreckMat;
  });
  rig.group.scale.setScalar(2.6);
  rig.group.rotation.set(0.5, 1.2, 2.4);
  group.add(rig.group);

  // Sheared-off panels drifting nearby.
  for (let i = 0; i < 5; i++) {
    const shard = new THREE.Mesh(
      new THREE.BoxGeometry(2 + Math.random() * 6, 0.6, 3 + Math.random() * 4),
      wreckMat,
    );
    shard.position.set(
      (Math.random() - 0.5) * 44,
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 44,
    );
    shard.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
    group.add(shard);
  }

  return {
    group,
    radius: 30,
    animate(dt) {
      group.rotation.x += dt * 0.015;
      group.rotation.z += dt * 0.01;
    },
  };
}

/** An abandoned relay satellite: bus, dish, panel wings, blinking light. */
export function createSatellite() {
  const group = new THREE.Group();

  const bus = new THREE.Mesh(new THREE.BoxGeometry(4, 4, 6), hullMat);
  group.add(bus);

  const dish = new THREE.Mesh(new THREE.SphereGeometry(3.4, 10, 6, 0, Math.PI * 2, 0, 1.1), darkMat);
  dish.position.set(0, 0, -4.6);
  dish.rotation.x = Math.PI;
  group.add(dish);

  for (const side of [-1, 1]) {
    const wing = new THREE.Mesh(new THREE.BoxGeometry(14, 0.3, 4.4), panelMat);
    wing.position.x = side * 9;
    group.add(wing);
  }

  const light = beacon(new THREE.Color(3.2, 2.4, 0.5));
  light.position.set(0, 3.4, 0);
  light.scale.setScalar(3);
  group.add(light);

  return {
    group,
    radius: 12,
    animate(dt, elapsed) {
      group.rotation.y += dt * 0.12;
      light.material.opacity = Math.sin(elapsed * 3.5) > 0.4 ? 1 : 0.06;
    },
  };
}

/** A mysterious anomaly: counter-rotating rings around a pulsing core. */
export function createAnomaly() {
  const group = new THREE.Group();

  const coreMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(1.4, 3.6, 3.0) });
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(6, 1), coreMat);
  group.add(core);

  const ringMat = new THREE.MeshStandardMaterial({
    color: 0x1c2a33,
    metalness: 0.9,
    roughness: 0.25,
    emissive: new THREE.Color(0.1, 0.5, 0.45),
    flatShading: true,
  });
  const rings = [];
  for (let i = 0; i < 3; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(14 + i * 7, 0.9, 6, 40), ringMat);
    ring.rotation.set(Math.random() * 3, Math.random() * 3, 0);
    rings.push(ring);
    group.add(ring);
  }

  const halo = beacon(new THREE.Color(0.5, 1.8, 1.6));
  halo.scale.setScalar(48);
  group.add(halo);

  return {
    group,
    radius: 32,
    animate(dt, elapsed) {
      rings[0].rotation.x += dt * 0.7;
      rings[1].rotation.y += dt * 0.55;
      rings[2].rotation.z += dt * 0.42;
      const pulse = 0.75 + Math.sin(elapsed * 1.7) * 0.35;
      core.scale.setScalar(pulse);
      halo.material.opacity = 0.35 + pulse * 0.3;
    },
  };
}

/** A supply cache hidden among asteroids. */
export function createCache() {
  const group = new THREE.Group();

  const body = new THREE.Mesh(new THREE.BoxGeometry(7, 7, 12), hullMat);
  group.add(body);
  const strip = new THREE.Mesh(
    new THREE.BoxGeometry(7.3, 1.2, 12.3),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(3.2, 2.2, 0.4) }),
  );
  group.add(strip);

  return {
    group,
    radius: 10,
    animate(dt) {
      group.rotation.y += dt * 0.2;
      group.rotation.x += dt * 0.07;
    },
  };
}

export const POI_BUILDERS = {
  station: createStation,
  wreck: createWreck,
  satellite: createSatellite,
  anomaly: createAnomaly,
  cache: createCache,
};
