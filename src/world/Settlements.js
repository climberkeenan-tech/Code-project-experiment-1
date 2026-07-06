import * as THREE from 'three';
import { Rng } from '../core/math/rng.js';
import { UNIVERSE_SEED } from './constants.js';

/**
 * Intelligent civilizations (bible): a few chosen worlds host settlements —
 * clusters of lit buildings on the surface. Most planets stay wild, so
 * finding one is a discovery moment.
 *
 * Seeded placement: three atmosphere-bearing planets get one settlement each
 * at a deterministic surface direction. Meshes build lazily when the player
 * is near the planet and sit on the true terrain (per-building height
 * sampling through the one sampler). Buildings are parented to the planet
 * group, inheriting origin shifts. Emissive windows make towns visible at
 * night — which now exists.
 */

const BUILD_RANGE_MULT = 3.0; // build when within radius × this of the planet

export class Settlements {
  /** @param {import('../core/Game.js').Game} game */
  constructor(game) {
    this.game = game;
    /** @type {Array<{planet: any, dir: THREE.Vector3, name: string, built: THREE.Group|null, discovered: boolean}>} */
    this.sites = [];
    this._tmp = new THREE.Vector3();

    const rng = new Rng(`${UNIVERSE_SEED}:civilizations`);
    const NAMES = ['Haven Reach', 'Port Meridian', 'New Solace', 'Kestrel Landing'];
    const candidates = (game.universe?.planets ?? [])
      .filter((p) => p.descriptor.hasAtmosphere);
    for (let i = 0; i < Math.min(3, candidates.length); i++) {
      const planet = candidates[Math.floor(rng.range(0, candidates.length)) % candidates.length];
      if (this.sites.some((s) => s.planet === planet)) continue;
      const [x, y, z] = rng.unitVector();
      this.sites.push({
        planet,
        dir: new THREE.Vector3(x, y, z).normalize(),
        name: NAMES[i % NAMES.length],
        built: null,
        discovered: false,
      });
    }
  }

  update() {
    const player = this.game.player;
    if (!player) return;
    for (const site of this.sites) {
      const planet = site.planet;
      const distToPlanet = this._tmp.copy(player.position)
        .sub(planet.group.position).length();
      if (!site.built && distToPlanet < planet.radius * BUILD_RANGE_MULT) {
        site.built = buildSettlement(planet, site.dir);
        planet.group.add(site.built);
      }
      // Discovery: flying near the settlement itself.
      if (site.built && !site.discovered) {
        this._tmp.copy(site.dir).multiplyScalar(planet.radius)
          .add(planet.group.position);
        if (player.position.distanceTo(this._tmp) < planet.radius * 0.5) {
          site.discovered = true;
          this.game.events.emit('poi:discovered', {
            site,
            title: 'Civilization Discovered',
            subtitle: `${site.name} — ${planet.descriptor.name}`,
          });
        }
      }
    }
  }
}

/** Assemble one settlement group in planet-local space. */
function buildSettlement(planet, dir) {
  const group = new THREE.Group();
  const rng = new Rng(`${UNIVERSE_SEED}:town:${planet.descriptor.name}`);

  const boxGeo = new THREE.BoxGeometry(1, 1, 1);
  const wallMat = new THREE.MeshStandardMaterial({ color: 0x9aa4b0, roughness: 0.85, flatShading: true });
  // HDR-ish emissive windows read at night.
  const litMat = new THREE.MeshStandardMaterial({
    color: 0x5a6472, roughness: 0.7, flatShading: true,
    emissive: new THREE.Color(1.6, 1.2, 0.5), emissiveIntensity: 0.5,
  });

  // Tangent basis at the site.
  const up = dir.clone();
  const t1 = new THREE.Vector3(0, 1, 0);
  if (Math.abs(up.dot(t1)) > 0.9) t1.set(1, 0, 0);
  t1.crossVectors(up, t1).normalize();
  const t2 = new THREE.Vector3().crossVectors(up, t1).normalize();

  const count = 12 + Math.floor(rng.range(0, 5));
  const p = new THREE.Vector3();
  const d = new THREE.Vector3();
  for (let i = 0; i < count; i++) {
    // Rough grid with jitter, ~140u across.
    const gx = ((i % 4) - 1.5) * 34 + rng.range(-8, 8);
    const gz = (Math.floor(i / 4) - 1.5) * 34 + rng.range(-8, 8);
    p.copy(dir).multiplyScalar(planet.radius)
      .addScaledVector(t1, gx)
      .addScaledVector(t2, gz);
    // Snap to terrain along the local radial.
    d.copy(p).normalize();
    const h = planet.sampler.height(d.x, d.y, d.z);
    if (planet.descriptor.hasOcean && h < 1) continue; // skip water lots
    p.copy(d).multiplyScalar(planet.radius + h);

    const height = rng.range(4, 15);
    const bldg = new THREE.Mesh(boxGeo, rng.chance(0.6) ? litMat : wallMat);
    bldg.scale.set(rng.range(5, 10), height, rng.range(5, 10));
    bldg.position.copy(p).addScaledVector(d, height * 0.45);
    bldg.quaternion.setFromUnitVectors(UP, d);
    bldg.castShadow = true;
    group.add(bldg);
  }

  // A tall beacon so the town is spottable from approach.
  const beacon = new THREE.Mesh(
    new THREE.CylinderGeometry(0.4, 0.6, 26, 5),
    litMat,
  );
  d.copy(dir);
  const hb = planet.sampler.height(d.x, d.y, d.z);
  beacon.position.copy(d).multiplyScalar(planet.radius + Math.max(hb, 1) + 13);
  beacon.quaternion.setFromUnitVectors(UP, d);
  group.add(beacon);

  return group;
}

const UP = new THREE.Vector3(0, 1, 0);
