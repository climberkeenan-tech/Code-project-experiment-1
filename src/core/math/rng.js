/**
 * Deterministic pseudo-random utilities.
 *
 * Everything procedural in the game (universe layout, planet descriptors,
 * terrain, names, encounter placement) flows from these functions so that a
 * given universe seed always reproduces the exact same galaxy.
 */

/**
 * 32-bit string/number hash (FNV-1a variant). Useful for deriving child seeds
 * from a parent seed plus a label, e.g. `hash32(seed + ':terrain')`.
 * @param {string|number} input
 * @returns {number} unsigned 32-bit integer
 */
export function hash32(input) {
  const str = String(input);
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/**
 * Mulberry32 — a small, fast, high-quality 32-bit PRNG.
 * @param {number} seed unsigned 32-bit integer seed
 * @returns {() => number} function producing floats in [0, 1)
 */
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function next() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Convenience wrapper bundling common random helpers around a seeded stream.
 * Create one per procedural domain so consumption order in one system can
 * never perturb another system's results.
 */
export class Rng {
  /** @param {string|number} seed */
  constructor(seed) {
    this.next = mulberry32(hash32(seed));
  }

  /** Float in [min, max). */
  range(min, max) {
    return min + this.next() * (max - min);
  }

  /** Integer in [min, max] inclusive. */
  int(min, max) {
    return min + Math.floor(this.next() * (max - min + 1));
  }

  /** True with probability p. */
  chance(p) {
    return this.next() < p;
  }

  /** Random element of an array. */
  pick(array) {
    return array[Math.floor(this.next() * array.length)];
  }

  /** Random unit vector components as [x, y, z]. */
  unitVector() {
    // Marsaglia method: uniform distribution on the sphere.
    let x, y, s;
    do {
      x = this.range(-1, 1);
      y = this.range(-1, 1);
      s = x * x + y * y;
    } while (s >= 1 || s === 0);
    const factor = 2 * Math.sqrt(1 - s);
    return [x * factor, y * factor, 1 - 2 * s];
  }

  /** Gaussian-ish sample via central limit (mean 0, roughly unit variance). */
  gaussian() {
    return (this.next() + this.next() + this.next() + this.next() - 2) * 1.73;
  }
}
