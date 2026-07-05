import * as THREE from 'three';
import { Rng } from '../core/math/rng.js';

/**
 * PlanetDescriptor — the complete recipe for one world.
 *
 * A descriptor is pure data derived deterministically from a seed. Terrain,
 * colors, ocean, atmosphere and clouds are all expressed here so that the
 * renderer, the collision system and the HUD all read from one source of
 * truth. Phase 6 uses a hand-tuned terran world; Phase 7's universe
 * generator produces varied descriptors from the same schema.
 *
 * @typedef {object} PlanetDescriptor
 * @property {string} seed
 * @property {string} name
 * @property {'terran'|'ocean'|'ice'|'desert'|'volcanic'|'rocky'} archetype
 * @property {number} radius        sea-level radius (world units)
 * @property {number} relief        max terrain height above sea level
 * @property {number} gravity       surface gravity (units/s²)
 * @property {boolean} hasOcean
 * @property {boolean} hasAtmosphere
 * @property {number} atmosphereHeight  shell thickness above radius
 * @property {THREE.Vector3} scatterColor  per-channel scattering strength
 * @property {THREE.Color} hazeColor     terrain aerial-perspective tint
 * @property {number} hazeDensity
 * @property {object} terrain       noise recipe (see terrainHeight.js)
 * @property {object} palette       biome colors (THREE.Color each)
 * @property {object|null} clouds   { coverage, color, speed } or null
 * @property {number} oceanDepth    how far the seabed drops below sea level
 * @property {THREE.Color} oceanColor
 * @property {number} axialTilt     radians, tilts the polar axis
 */

/**
 * Hand-tuned lush terran world — the Phase 6 showcase planet and the
 * quality bar for every generated world that follows.
 * @returns {PlanetDescriptor}
 */
export function createTerranDescriptor(seed = 'veridian-prime') {
  const rng = new Rng(seed);
  return {
    seed,
    name: 'Veridian Prime',
    archetype: 'terran',
    radius: 3200,
    relief: 130,
    gravity: 26,
    hasOcean: true,
    oceanDepth: 90,
    oceanColor: new THREE.Color(0.03, 0.16, 0.24),
    hasAtmosphere: true,
    atmosphereHeight: 340,
    scatterColor: new THREE.Vector3(0.18, 0.4, 0.85),
    hazeColor: new THREE.Color(0.5, 0.68, 0.9),
    hazeDensity: 1.0,
    axialTilt: 0.35,
    terrain: {
      continentFreq: 1.1,
      continentOctaves: 4,
      seaLevelBias: 0.06, // shifts land/water balance
      hillFreq: 5.0,
      hillAmp: 0.22,
      mountainFreq: 3.2,
      mountainOctaves: 5,
      mountainAmp: 1.0,
      mountainMaskFreq: 1.7,
      plateauFreq: 2.6,
      plateauAmp: 0.25,
      plateauSteps: 4,
      canyonFreq: 2.4,
      canyonDepth: 0.35,
      detailFreq: 46,
      detailAmp: 0.045,
      craterCount: 0,
      craterMaxRadius: 0,
    },
    palette: {
      shallow: new THREE.Color(0.13, 0.38, 0.42), // shelf under shallow water
      beach: new THREE.Color(0.62, 0.56, 0.4),
      low: new THREE.Color(0.22, 0.4, 0.19), // grasslands
      mid: new THREE.Color(0.13, 0.28, 0.13), // forest
      high: new THREE.Color(0.42, 0.38, 0.34), // bare rock
      steep: new THREE.Color(0.3, 0.27, 0.25), // cliff faces
      cap: new THREE.Color(0.92, 0.94, 0.97), // snow
      capThreshold: 0.62, // |latitude| where polar caps begin
    },
    clouds: {
      coverage: 0.48,
      color: new THREE.Color(1, 1, 1),
      speed: 0.004,
    },
  };
}

/**
 * Derive the per-planet crater list (analytic bowls stamped into the height
 * field). Kept here so both the terrain sampler and any future minimap
 * share the same data.
 * @param {PlanetDescriptor} descriptor
 * @returns {Array<{dir: THREE.Vector3, angRadius: number, depth: number}>}
 */
export function generateCraters(descriptor) {
  const craters = [];
  const { craterCount, craterMaxRadius } = descriptor.terrain;
  if (!craterCount) return craters;
  const rng = new Rng(`${descriptor.seed}:craters`);
  for (let i = 0; i < craterCount; i++) {
    const [x, y, z] = rng.unitVector();
    craters.push({
      dir: new THREE.Vector3(x, y, z),
      angRadius: rng.range(0.015, craterMaxRadius),
      depth: rng.range(0.25, 1),
    });
  }
  return craters;
}
