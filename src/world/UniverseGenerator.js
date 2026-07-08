import * as THREE from 'three';
import { Rng } from '../core/math/rng.js';
import { Planet } from './Planet.js';
import { AsteroidField } from '../environment/AsteroidField.js';
import { createTerranDescriptor } from './PlanetDescriptor.js';
import { generatePlanetName } from './names.js';
import { UNIVERSE_SEED, PLAYER_SPAWN } from './constants.js';

/**
 * Universe generation: turns the master seed into a populated star system.
 *
 * Layout: planets sit on a loose spiral of orbits between 55k and 235k
 * units from the sun, golden-angle spaced so no two share a bearing, with
 * mild inclination so the system feels three-dimensional. The hand-tuned
 * terran homeworld anchors the inner system near the player spawn.
 *
 * Each world rolls an archetype from a curated deck (guaranteeing variety
 * across a single universe) and then jitters every parameter — size,
 * relief, palette hues, atmosphere tint, cloud coverage, crater density —
 * from its own child seed.
 */

/**
 * Curated deck: one of each personality, then wildcards. The last four are
 * the OUTER worlds (index ≥ 8) — they spiral far beyond the classic rim so
 * the system reads bigger (playtest: "the map feels small").
 */
const ARCHETYPE_DECK = ['ocean', 'ice', 'desert', 'volcanic', 'rocky', 'terran', 'ice', 'desert',
  'terran', 'ocean', 'volcanic', 'rocky'];

/**
 * @param {import('../core/Game.js').Game} game
 * @param {import('./Universe.js').Universe} universe
 */
export function generateUniverse(game, universe) {
  const rng = new Rng(`${UNIVERSE_SEED}:layout`);

  // --- Homeworld (hand-tuned showcase, anchors the spawn) ---
  universe.addPlanet(new Planet(
    game, createTerranDescriptor(), new THREE.Vector3(11200, 1600, 37500),
  ));

  // --- Generated worlds on a golden-angle spiral ---
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const baseAngle = rng.range(0, Math.PI * 2);
  ARCHETYPE_DECK.forEach((archetype, index) => {
    // Divisor stays 7 (the original deck) so the first eight worlds keep
    // their exact historical orbits; the four outer worlds land beyond the
    // old 235k rim, stretching the system to ~340k.
    const distance = 55000 + (index / 7) * 180000
      * rng.range(0.92, 1.08);
    const angle = baseAngle + goldenAngle * (index + 1);
    const inclination = rng.gaussian() * 0.09;
    const center = new THREE.Vector3(
      Math.cos(angle) * distance,
      Math.sin(inclination) * distance * 0.35,
      Math.sin(angle) * distance,
    );
    const descriptor = generateDescriptor(`${UNIVERSE_SEED}:planet:${index}`, archetype);
    universe.addPlanet(new Planet(game, descriptor, center));
  });

  // --- Asteroid fields: the inner mining cluster + two outer belts ---
  const fields = [];
  fields.push(new AsteroidField(game, {
    center: PLAYER_SPAWN.clone().add(new THREE.Vector3(3400, 300, -2600)),
    radius: 1500,
    count: 320,
    seed: `${UNIVERSE_SEED}:field:inner`,
    shape: 'cluster',
  }));
  for (let i = 0; i < 2; i++) {
    const angle = rng.range(0, Math.PI * 2);
    const distance = rng.range(80000, 190000);
    fields.push(new AsteroidField(game, {
      center: new THREE.Vector3(
        Math.cos(angle) * distance,
        rng.gaussian() * 4000,
        Math.sin(angle) * distance,
      ),
      radius: rng.range(2600, 4200),
      count: 420,
      seed: `${UNIVERSE_SEED}:field:${i}`,
      shape: rng.chance(0.5) ? 'belt' : 'cluster',
    }));
  }
  for (const field of fields) {
    game.asteroidFields.push(field);
    game.addSystem(`asteroids:${fields.indexOf(field)}`, field);
  }
}

/**
 * Roll a full descriptor for one world.
 * @param {string} seed
 * @param {string} archetype
 * @returns {import('./PlanetDescriptor.js').PlanetDescriptor}
 */
export function generateDescriptor(seed, archetype) {
  const rng = new Rng(seed);
  const name = generatePlanetName(rng);
  const radius = rng.range(1900, 4600);

  /** Base descriptor all archetypes refine. */
  const d = {
    seed,
    name,
    archetype,
    radius,
    relief: radius * rng.range(0.03, 0.05),
    gravity: 14 + (radius / 4600) * 18 * rng.range(0.85, 1.15),
    hasOcean: false,
    oceanDepth: radius * 0.025,
    oceanColor: new THREE.Color(0.03, 0.16, 0.24),
    oceanRoughness: 0.12,
    hasAtmosphere: true,
    atmosphereHeight: radius * rng.range(0.09, 0.13),
    scatterColor: new THREE.Vector3(0.18, 0.4, 0.85),
    hazeColor: new THREE.Color(0.5, 0.68, 0.9),
    hazeDensity: 1.0,
    axialTilt: rng.range(-0.6, 0.6),
    terrain: {
      continentFreq: rng.range(0.9, 1.6),
      continentOctaves: 4,
      seaLevelBias: rng.range(-0.05, 0.12),
      hillFreq: rng.range(3.5, 6.5),
      hillAmp: rng.range(0.15, 0.3),
      hillStyle: 'rolling',
      mountainFreq: rng.range(2.4, 4.2),
      mountainOctaves: 5,
      mountainAmp: rng.range(0.7, 1.15),
      mountainMaskFreq: rng.range(1.3, 2.2),
      plateauFreq: rng.range(2.0, 3.4),
      plateauAmp: rng.range(0.0, 0.35),
      plateauSteps: rng.int(3, 5),
      canyonFreq: rng.range(1.8, 3.0),
      canyonDepth: rng.range(0.1, 0.45),
      detailFreq: rng.range(36, 60),
      detailAmp: rng.range(0.03, 0.07),
      craterCount: 0,
      craterMaxRadius: 0.06,
    },
    palette: null, // set per archetype below
    clouds: null,
  };

  const jitterColor = (r, g, b, amount = 0.05) => new THREE.Color(
    Math.max(0, r + rng.range(-amount, amount)),
    Math.max(0, g + rng.range(-amount, amount)),
    Math.max(0, b + rng.range(-amount, amount)),
  );

  switch (archetype) {
    case 'terran': {
      d.hasOcean = true;
      d.terrain.seaLevelBias = rng.range(0.0, 0.1);
      d.palette = {
        shallow: jitterColor(0.13, 0.38, 0.42),
        beach: jitterColor(0.62, 0.56, 0.4),
        low: jitterColor(0.2, 0.4, 0.17, 0.08),
        mid: jitterColor(0.12, 0.28, 0.12, 0.06),
        high: jitterColor(0.42, 0.38, 0.34),
        steep: jitterColor(0.3, 0.27, 0.25),
        cap: new THREE.Color(0.92, 0.94, 0.97),
        capThreshold: rng.range(0.55, 0.75),
      };
      d.clouds = { coverage: rng.range(0.4, 0.55), color: new THREE.Color(1, 1, 1), speed: 0.004 };
      break;
    }

    case 'ocean': {
      d.hasOcean = true;
      d.terrain.seaLevelBias = rng.range(-0.3, -0.16); // scattered islands
      d.terrain.mountainAmp *= 0.7;
      d.oceanColor = jitterColor(0.02, 0.12, 0.28);
      d.oceanDepth = radius * 0.035;
      d.scatterColor.set(0.15, 0.35, 0.9);
      d.hazeColor = new THREE.Color(0.45, 0.65, 0.95);
      d.palette = {
        shallow: jitterColor(0.1, 0.42, 0.48),
        beach: jitterColor(0.72, 0.68, 0.52),
        low: jitterColor(0.3, 0.46, 0.25),
        mid: jitterColor(0.2, 0.34, 0.18),
        high: jitterColor(0.45, 0.42, 0.38),
        steep: jitterColor(0.32, 0.3, 0.28),
        cap: new THREE.Color(0.92, 0.94, 0.97),
        capThreshold: rng.range(0.6, 0.8),
      };
      d.clouds = { coverage: rng.range(0.5, 0.65), color: new THREE.Color(1, 1, 1), speed: 0.006 };
      break;
    }

    case 'ice': {
      d.hasOcean = true; // frozen sheet
      d.oceanColor = jitterColor(0.55, 0.68, 0.78);
      d.oceanRoughness = 0.45;
      d.terrain.seaLevelBias = rng.range(-0.1, 0.05);
      d.terrain.craterCount = rng.int(6, 16);
      d.gravity *= 0.85;
      d.scatterColor.set(0.3, 0.5, 0.8);
      d.hazeColor = new THREE.Color(0.62, 0.72, 0.88);
      d.hazeDensity = 0.6;
      d.atmosphereHeight *= 0.8;
      d.palette = {
        shallow: jitterColor(0.5, 0.62, 0.72),
        beach: jitterColor(0.7, 0.78, 0.85),
        low: jitterColor(0.75, 0.82, 0.9),
        mid: jitterColor(0.62, 0.7, 0.82),
        high: jitterColor(0.5, 0.55, 0.66),
        steep: jitterColor(0.36, 0.42, 0.55),
        cap: new THREE.Color(0.95, 0.97, 1.0),
        capThreshold: 0.2, // snow nearly everywhere
      };
      d.clouds = rng.chance(0.6)
        ? { coverage: rng.range(0.25, 0.4), color: new THREE.Color(0.95, 0.97, 1), speed: 0.008 }
        : null;
      break;
    }

    case 'desert': {
      d.hasOcean = false;
      d.terrain.hillStyle = 'dunes';
      d.terrain.hillFreq = rng.range(6, 10);
      d.terrain.hillAmp = rng.range(0.18, 0.3);
      d.terrain.canyonDepth = rng.range(0.35, 0.6); // slot canyons
      d.terrain.plateauAmp = rng.range(0.25, 0.45); // mesas
      d.terrain.craterCount = rng.int(3, 10);
      d.scatterColor.set(0.55, 0.38, 0.18);
      d.hazeColor = new THREE.Color(0.85, 0.62, 0.38);
      d.hazeDensity = 0.85;
      d.palette = {
        shallow: jitterColor(0.45, 0.3, 0.18),
        beach: jitterColor(0.72, 0.55, 0.32),
        low: jitterColor(0.76, 0.58, 0.34, 0.08),
        mid: jitterColor(0.65, 0.44, 0.26),
        high: jitterColor(0.5, 0.32, 0.2),
        steep: jitterColor(0.38, 0.24, 0.16),
        cap: jitterColor(0.8, 0.68, 0.55), // pale dust, not snow
        capThreshold: 0.95,
      };
      d.clouds = rng.chance(0.35)
        ? { coverage: rng.range(0.12, 0.25), color: new THREE.Color(0.9, 0.8, 0.65), speed: 0.01 }
        : null;
      break;
    }

    case 'volcanic': {
      d.hasOcean = true; // lava sea
      d.oceanColor = new THREE.Color(2.4, 0.5, 0.08); // HDR: glows + blooms
      d.oceanRoughness = 0.55;
      d.oceanDepth = radius * 0.02;
      d.terrain.seaLevelBias = rng.range(-0.16, -0.06);
      d.terrain.mountainAmp *= 1.25;
      d.terrain.detailAmp *= 1.6;
      d.gravity *= 1.1;
      d.scatterColor.set(0.5, 0.22, 0.1);
      d.hazeColor = new THREE.Color(0.55, 0.28, 0.16);
      d.hazeDensity = 1.4;
      d.palette = {
        shallow: new THREE.Color(1.4, 0.35, 0.05), // cooling crust rim
        beach: jitterColor(0.25, 0.14, 0.1),
        low: jitterColor(0.2, 0.15, 0.13),
        mid: jitterColor(0.16, 0.12, 0.11),
        high: jitterColor(0.3, 0.22, 0.18),
        steep: jitterColor(0.1, 0.08, 0.08),
        cap: jitterColor(0.35, 0.3, 0.28),
        capThreshold: 0.97,
      };
      d.clouds = { coverage: rng.range(0.3, 0.5), color: new THREE.Color(0.32, 0.26, 0.24), speed: 0.012 };
      break;
    }

    case 'rocky':
    default: {
      d.hasOcean = false;
      d.hasAtmosphere = false;
      d.terrain.craterCount = rng.int(22, 40);
      d.terrain.craterMaxRadius = 0.09;
      d.terrain.canyonDepth *= 0.5;
      d.terrain.detailAmp *= 1.4;
      d.gravity *= 0.7;
      const base = rng.range(0.35, 0.55);
      d.palette = {
        shallow: new THREE.Color(base * 0.5, base * 0.48, base * 0.46),
        beach: new THREE.Color(base * 0.8, base * 0.76, base * 0.72),
        low: new THREE.Color(base, base * 0.95, base * 0.88),
        mid: new THREE.Color(base * 0.85, base * 0.8, base * 0.75),
        high: new THREE.Color(base * 1.15, base * 1.1, base * 1.05),
        steep: new THREE.Color(base * 0.6, base * 0.57, base * 0.54),
        cap: new THREE.Color(base * 1.2, base * 1.18, base * 1.16),
        capThreshold: 0.98,
      };
      d.clouds = null;
      break;
    }
  }

  return d;
}
