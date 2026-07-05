/**
 * 3D simplex noise and fractal combinators.
 *
 * This is the backbone of all terrain and texture generation. The simplex
 * implementation is self-contained (public-domain algorithm by Ken Perlin /
 * Stefan Gustavson) and seedable, so each planet gets its own permutation
 * table and therefore a completely distinct noise field.
 *
 * The fractal helpers (fBm, ridged, billow) are pure functions of a
 * SimplexNoise instance, kept allocation-free for hot-path use in terrain
 * streaming.
 */

import { mulberry32, hash32 } from './rng.js';

const GRAD3 = new Float32Array([
  1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0,
  1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, -1,
  0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1,
]);

const F3 = 1 / 3;
const G3 = 1 / 6;

export class SimplexNoise {
  /** @param {string|number} seed */
  constructor(seed = 0) {
    const rand = mulberry32(hash32(seed));
    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) p[i] = i;
    // Fisher–Yates shuffle driven by the seeded stream.
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      const tmp = p[i];
      p[i] = p[j];
      p[j] = tmp;
    }
    // Doubled tables avoid index wrapping in the hot loop.
    this.perm = new Uint8Array(512);
    this.permMod12 = new Uint8Array(512);
    for (let i = 0; i < 512; i++) {
      this.perm[i] = p[i & 255];
      this.permMod12[i] = this.perm[i] % 12;
    }
  }

  /**
   * Sample 3D simplex noise.
   * @returns {number} value in approximately [-1, 1]
   */
  noise3(xin, yin, zin) {
    const { perm, permMod12 } = this;
    let n0 = 0, n1 = 0, n2 = 0, n3 = 0;

    const s = (xin + yin + zin) * F3;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    const k = Math.floor(zin + s);
    const t = (i + j + k) * G3;
    const x0 = xin - (i - t);
    const y0 = yin - (j - t);
    const z0 = zin - (k - t);

    // Determine simplex corner ordering.
    let i1, j1, k1, i2, j2, k2;
    if (x0 >= y0) {
      if (y0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
      else if (x0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1; }
      else { i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1; }
    } else {
      if (y0 < z0) { i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1; }
      else if (x0 < z0) { i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1; }
      else { i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
    }

    const x1 = x0 - i1 + G3, y1 = y0 - j1 + G3, z1 = z0 - k1 + G3;
    const x2 = x0 - i2 + 2 * G3, y2 = y0 - j2 + 2 * G3, z2 = z0 - k2 + 2 * G3;
    const x3 = x0 - 1 + 3 * G3, y3 = y0 - 1 + 3 * G3, z3 = z0 - 1 + 3 * G3;

    const ii = i & 255, jj = j & 255, kk = k & 255;

    let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
    if (t0 > 0) {
      const gi = permMod12[ii + perm[jj + perm[kk]]] * 3;
      t0 *= t0;
      n0 = t0 * t0 * (GRAD3[gi] * x0 + GRAD3[gi + 1] * y0 + GRAD3[gi + 2] * z0);
    }
    let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
    if (t1 > 0) {
      const gi = permMod12[ii + i1 + perm[jj + j1 + perm[kk + k1]]] * 3;
      t1 *= t1;
      n1 = t1 * t1 * (GRAD3[gi] * x1 + GRAD3[gi + 1] * y1 + GRAD3[gi + 2] * z1);
    }
    let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
    if (t2 > 0) {
      const gi = permMod12[ii + i2 + perm[jj + j2 + perm[kk + k2]]] * 3;
      t2 *= t2;
      n2 = t2 * t2 * (GRAD3[gi] * x2 + GRAD3[gi + 1] * y2 + GRAD3[gi + 2] * z2);
    }
    let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
    if (t3 > 0) {
      const gi = permMod12[ii + 1 + perm[jj + 1 + perm[kk + 1]]] * 3;
      t3 *= t3;
      n3 = t3 * t3 * (GRAD3[gi] * x3 + GRAD3[gi + 1] * y3 + GRAD3[gi + 2] * z3);
    }
    // Scale to roughly [-1, 1].
    return 32 * (n0 + n1 + n2 + n3);
  }

  /**
   * Fractal Brownian motion — layered noise for natural rolling terrain.
   * @param {number} octaves layer count
   * @param {number} lacunarity frequency multiplier per octave (~2)
   * @param {number} gain amplitude multiplier per octave (~0.5)
   */
  fbm(x, y, z, octaves = 4, lacunarity = 2, gain = 0.5) {
    let sum = 0;
    let amp = 1;
    let norm = 0;
    for (let o = 0; o < octaves; o++) {
      sum += amp * this.noise3(x, y, z);
      norm += amp;
      amp *= gain;
      x *= lacunarity; y *= lacunarity; z *= lacunarity;
    }
    return sum / norm;
  }

  /**
   * Ridged multifractal — sharp mountain ridges and crests.
   * Output in [0, 1], with 1 at ridge lines.
   */
  ridged(x, y, z, octaves = 4, lacunarity = 2.1, gain = 0.55) {
    let sum = 0;
    let amp = 0.6;
    let norm = 0;
    let prev = 1;
    for (let o = 0; o < octaves; o++) {
      let n = 1 - Math.abs(this.noise3(x, y, z));
      n *= n; // sharpen the ridge line
      sum += n * amp * prev;
      norm += amp;
      prev = n; // successive octaves are masked by the previous ridge
      amp *= gain;
      x *= lacunarity; y *= lacunarity; z *= lacunarity;
    }
    return sum / norm;
  }

  /**
   * Billow noise — puffy cloud-like accumulation, |noise| folded upward.
   * Output roughly in [0, 1].
   */
  billow(x, y, z, octaves = 4, lacunarity = 2, gain = 0.5) {
    let sum = 0;
    let amp = 1;
    let norm = 0;
    for (let o = 0; o < octaves; o++) {
      sum += amp * Math.abs(this.noise3(x, y, z));
      norm += amp;
      amp *= gain;
      x *= lacunarity; y *= lacunarity; z *= lacunarity;
    }
    return sum / norm;
  }
}

/**
 * Smoothstep — cubic hermite interpolation between edges.
 */
export function smoothstep(edge0, edge1, x) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/** Linear interpolation. */
export function lerp(a, b, t) {
  return a + (b - a) * t;
}

/** Clamp a value into [min, max]. */
export function clamp(x, min, max) {
  return x < min ? min : x > max ? max : x;
}

/**
 * Frame-rate independent exponential damping factor.
 * Use as: value = lerp(value, target, damp(rate, dt))
 * where `rate` is roughly "fraction converged per second at rate=1".
 */
export function damp(rate, dt) {
  return 1 - Math.exp(-rate * dt);
}
