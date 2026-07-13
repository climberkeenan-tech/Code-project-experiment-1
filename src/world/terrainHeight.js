import * as THREE from 'three';
import { SimplexNoise, smoothstep, clamp, lerp } from '../core/math/noise.js';
import { generateCraters } from './PlanetDescriptor.js';

/**
 * Terrain sampler: the single source of truth for a planet's surface.
 *
 * `createTerrainSampler(descriptor)` returns closures that map a unit
 * direction vector to height / normal / biome color. The LOD renderer,
 * the collision system and the AI ground-avoidance all call these same
 * functions, so what you see is exactly what you hit.
 *
 * The height recipe layers, in order:
 *   continents  — low-frequency fBm land/sea mask
 *   hills       — mid-frequency rolling ground
 *   mountains   — ridged multifractal, masked so ranges form in belts
 *   plateaus    — terraced mesas from quantized noise
 *   canyons     — deep cuts carved where a ridge field pinches
 *   craters     — analytic bowls with raised rims (airless worlds)
 *   detail      — high-frequency roughness
 *
 * All heights are in world units above (+) or below (−) sea level.
 */
export function createTerrainSampler(descriptor) {
  const t = descriptor.terrain;
  const relief = descriptor.relief;
  const oceanDepth = descriptor.oceanDepth;

  // Independent noise fields so each layer has its own character.
  const continentNoise = new SimplexNoise(`${descriptor.seed}:continent`);
  const hillNoise = new SimplexNoise(`${descriptor.seed}:hill`);
  const mountainNoise = new SimplexNoise(`${descriptor.seed}:mountain`);
  const maskNoise = new SimplexNoise(`${descriptor.seed}:mask`);
  const plateauNoise = new SimplexNoise(`${descriptor.seed}:plateau`);
  const canyonNoise = new SimplexNoise(`${descriptor.seed}:canyon`);
  const detailNoise = new SimplexNoise(`${descriptor.seed}:detail`);
  const biomeNoise = new SimplexNoise(`${descriptor.seed}:biome`);

  const craters = generateCraters(descriptor);

  /**
   * Height above sea level (world units) at a unit direction.
   * @param {number} x @param {number} y @param {number} z unit vector
   */
  function height(x, y, z) {
    // --- Continents: where land rises from the sea ---
    const c = continentNoise.fbm(
      x * t.continentFreq, y * t.continentFreq, z * t.continentFreq,
      t.continentOctaves,
    ) + t.seaLevelBias;
    // 0 = deep ocean … 1 = solid land, with a soft coastal shelf.
    const land = smoothstep(-0.12, 0.22, c);

    // Sea floor drops away from the coast.
    let h = lerp(-oceanDepth, 0, Math.min(1, land * 1.6));

    if (land > 0.02) {
      // --- Hills: rolling fBm, or folded billow noise for dune seas ---
      const hills = t.hillStyle === 'dunes'
        ? hillNoise.billow(x * t.hillFreq, y * t.hillFreq, z * t.hillFreq, 3) * 0.9 - 0.2
        : hillNoise.fbm(x * t.hillFreq, y * t.hillFreq, z * t.hillFreq, 4);
      h += hills * t.hillAmp * relief * land;

      // --- Mountain ranges (ridged, masked into belts) ---
      const beltMask = smoothstep(
        0.1, 0.55,
        maskNoise.fbm(x * t.mountainMaskFreq, y * t.mountainMaskFreq, z * t.mountainMaskFreq, 3),
      );
      if (beltMask > 0.01) {
        const ridge = mountainNoise.ridged(
          x * t.mountainFreq, y * t.mountainFreq, z * t.mountainFreq,
          t.mountainOctaves,
        );
        h += ridge * beltMask * land * t.mountainAmp * relief;
      }

      // --- Plateaus: terraced uplands ---
      if (t.plateauAmp > 0) {
        const p = plateauNoise.fbm(x * t.plateauFreq, y * t.plateauFreq, z * t.plateauFreq, 3)
          * 0.5 + 0.5;
        const stepped = terrace(p, t.plateauSteps);
        h += stepped * t.plateauAmp * relief * land;
      }

      // --- Canyons: carve where the canyon field pinches tight ---
      if (t.canyonDepth > 0) {
        const cn = canyonNoise.ridged(x * t.canyonFreq, y * t.canyonFreq, z * t.canyonFreq, 4);
        const cut = smoothstep(0.72, 0.95, cn);
        h -= cut * t.canyonDepth * relief * land;
      }
    }

    // --- Craters (airless/dead worlds) ---
    for (let i = 0; i < craters.length; i++) {
      const crater = craters[i];
      // Angular distance approximated by chord length (fine at these sizes).
      const dx = x - crater.dir.x;
      const dy = y - crater.dir.y;
      const dz = z - crater.dir.z;
      const chord = Math.sqrt(dx * dx + dy * dy + dz * dz);
      const rel = chord / crater.angRadius;
      if (rel < 1.6) {
        const depth = crater.depth * relief * 0.5;
        if (rel < 1) {
          // Parabolic bowl, full depth at center.
          h -= (1 - rel * rel) * depth;
        }
        // Raised rim just outside the bowl edge.
        const rimT = (rel - 1) / 0.22;
        const rim = Math.exp(-(rimT * rimT));
        h += rim * depth * 0.35;
      }
    }

    // --- High-frequency detail ---
    h += detailNoise.fbm(x * t.detailFreq, y * t.detailFreq, z * t.detailFreq, 3)
      * t.detailAmp * relief;

    return h;
  }

  const _va = new THREE.Vector3();
  const _vb = new THREE.Vector3();
  const _vc = new THREE.Vector3();
  const _tangent = new THREE.Vector3();
  const _bitangent = new THREE.Vector3();

  /**
   * Surface normal at a unit direction, from forward differences of the
   * height field along the local tangent frame. `spacing` should roughly
   * match the sampling density of the caller (vertex spacing for meshes).
   * @param {THREE.Vector3} dir unit direction
   * @param {number} spacing world-space offset for the difference
   * @param {THREE.Vector3} target
   */
  function normal(dir, spacing, target) {
    const eps = spacing / descriptor.radius;
    // Build a tangent frame around dir.
    _tangent.set(-dir.z, 0, dir.x);
    if (_tangent.lengthSq() < 1e-6) _tangent.set(1, 0, 0);
    _tangent.normalize();
    _bitangent.crossVectors(dir, _tangent);

    const h0 = height(dir.x, dir.y, dir.z);
    _va.copy(dir).addScaledVector(_tangent, eps).normalize();
    const ha = height(_va.x, _va.y, _va.z);
    _vb.copy(dir).addScaledVector(_bitangent, eps).normalize();
    const hb = height(_vb.x, _vb.y, _vb.z);

    // Positions of the three samples on the actual surface.
    const r0 = descriptor.radius + h0;
    _vc.copy(dir).multiplyScalar(r0);
    _va.multiplyScalar(descriptor.radius + ha).sub(_vc);
    _vb.multiplyScalar(descriptor.radius + hb).sub(_vc);
    return target.crossVectors(_va, _vb).normalize();
  }

  const _colorScratch = new THREE.Color();
  // Forest patches: vegetated worlds get continent-scale bands of deep green
  // so biomes read clearly from orbit (playtest: "can't see forests from
  // space"). Seeded noise keeps the pattern deterministic per planet.
  const _forest = new THREE.Color(0x1c4a24);
  const vegetated = descriptor.archetype === 'terran' || descriptor.archetype === 'ocean';

  /**
   * Biome color for a vertex.
   * @param {THREE.Vector3} dir unit direction (planet-local)
   * @param {number} h height above sea level
   * @param {number} slope 0 = flat … 1 = vertical
   * @param {THREE.Vector3} up planet's polar axis
   * @param {THREE.Color} target
   */
  function color(dir, h, slope, up, target) {
    const pal = descriptor.palette;
    const h01 = clamp(h / relief, -1, 1);
    const latitude = Math.abs(dir.dot(up));

    // Small per-vertex jitter breaks up banding.
    const jitter = biomeNoise.noise3(dir.x * 24, dir.y * 24, dir.z * 24) * 0.06;

    if (h01 < 0.005) {
      // Below/at sea level: shelf fading to dark depths.
      target.copy(pal.shallow).multiplyScalar(clamp(1 + h / oceanDepth, 0.25, 1));
    } else if (h01 < 0.05) {
      target.copy(pal.beach);
    } else {
      // Altitude bands with smooth crossfades.
      const toMid = smoothstep(0.08, 0.34, h01 + jitter);
      const toHigh = smoothstep(0.3, 0.62, h01 + jitter);
      target.copy(pal.low).lerp(pal.mid, toMid).lerp(pal.high, toHigh);
    }

    // Forest patches on vegetated lowlands (visible from orbit).
    if (vegetated && h01 > 0.03) {
      const mask = smoothstep(0.15, 0.6,
        biomeNoise.noise3(dir.x * 7 + 41, dir.y * 7 + 41, dir.z * 7 + 41));
      const band = smoothstep(0.03, 0.09, h01) * (1 - smoothstep(0.38, 0.58, h01));
      target.lerp(_forest, mask * band * 0.7);
      // Grassland mottle: mid-frequency luminance breakup so open ground
      // reads as living meadow instead of a flat green plane — darkened
      // toward soil inside the grass band so the carpet's peek-through
      // reads as shadowed earth, never bright bare green.
      const mottle = biomeNoise.noise3(dir.x * 61 + 7, dir.y * 61 + 7, dir.z * 61 + 7);
      target.multiplyScalar((0.93 + mottle * 0.1) * (1 - band * 0.24));
    }

    // Steep faces expose bare rock.
    const cliff = smoothstep(0.55, 0.8, slope);
    target.lerp(pal.steep, cliff * 0.85);

    // Snow: polar caps plus high summits, but not on cliffs.
    const capLine = pal.capThreshold - h01 * 0.28;
    const snow = Math.max(
      smoothstep(capLine, capLine + 0.09, latitude),
      smoothstep(0.68, 0.85, h01 + jitter),
    ) * (1 - cliff * 0.7);
    if (h01 > 0.005) target.lerp(_colorScratch.copy(pal.cap), snow);

    return target;
  }

  return { height, normal, color, craters };
}

/** Quantize x (0..1) into `steps` terraces with smoothed risers. */
function terrace(x, steps) {
  const scaled = x * steps;
  const base = Math.floor(scaled);
  const frac = scaled - base;
  // Sharpen the transition so tops are flat and risers are steep.
  const riser = smoothstep(0.7, 1.0, frac);
  return (base + riser) / steps;
}
