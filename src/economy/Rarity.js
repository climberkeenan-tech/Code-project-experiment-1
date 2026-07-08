import * as THREE from 'three';

/**
 * Resource rarity model — the backbone of the mining → selling → upgrading
 * economy. Every collectable rock belongs to one rarity tier. Tiers carry a
 * credit value and a spawn weight (rarer tiers are worth more and appear
 * less often), so higher-value finds naturally reward deeper exploration.
 *
 * The values match the design bible's canonical table:
 *   gray 1 · green 2 · blue 10 · red 20 · purple 50 · white 100 · gold 500
 *
 * Kept data-only and framework-light so the shop, HUD, save system and the
 * surface scatter all read one source of truth.
 */

/**
 * @typedef {Object} Rarity
 * @property {string} id     stable key (used in inventory + save data)
 * @property {string} name   display name
 * @property {number} value  credits earned when sold
 * @property {number} weight relative spawn frequency (higher = more common)
 * @property {number} color  hex tint for the mesh + UI swatch
 * @property {number} emissive rough emissive intensity for the ore glow
 */

/** @type {Rarity[]} ordered common → legendary. */
export const RARITIES = [
  { id: 'gray',   name: 'Common Ore',   value: 1,   weight: 60,   color: 0x9aa3ab, emissive: 0.15 },
  { id: 'green',  name: 'Verdite',      value: 2,   weight: 30,   color: 0x4fd67a, emissive: 0.5 },
  { id: 'blue',   name: 'Cobalt Cryst', value: 10,  weight: 9,    color: 0x4aa8ff, emissive: 0.8 },
  { id: 'red',    name: 'Pyronite',     value: 20,  weight: 5.5,  color: 0xff5a48, emissive: 1.0 },
  { id: 'purple', name: 'Void Amethyst',value: 50,  weight: 3.0,  color: 0xb86cff, emissive: 1.3 },
  { id: 'white',  name: 'Lumen Shard',  value: 100, weight: 1.4, color: 0xf2f6ff, emissive: 1.8 },
  { id: 'gold',   name: 'Aurum Core',   value: 500, weight: 0.6,  color: 0xffcf4a, emissive: 2.2 }, // weight buffed: gold is findable now
];

/** Fast lookup by id. */
export const RARITY_BY_ID = Object.fromEntries(RARITIES.map((r) => [r.id, r]));

/** Ordered list of rarity ids (common → legendary). */
export const RARITY_IDS = RARITIES.map((r) => r.id);

const TOTAL_WEIGHT = RARITIES.reduce((sum, r) => sum + r.weight, 0);

/** Pre-tinted THREE colors, cached so the scatter doesn't reallocate. */
export const RARITY_COLOR = Object.fromEntries(
  RARITIES.map((r) => [r.id, new THREE.Color(r.color)]),
);

/**
 * Roll a rarity by weight.
 * @param {() => number} rand a [0,1) generator (seeded Rng.next or Math.random)
 * @param {number} [luck] multiplies the odds of rarer tiers (1 = neutral)
 * @returns {Rarity}
 */
export function rollRarity(rand, luck = 1) {
  // Bias the roll toward rarer tiers as luck rises by skewing the weights.
  let total = 0;
  const skewed = RARITIES.map((r, i) => {
    // Rarer tiers (higher index) get boosted when luck > 1.
    const w = r.weight * (luck === 1 ? 1 : Math.pow(luck, i / RARITIES.length));
    total += w;
    return w;
  });
  let roll = rand() * total;
  for (let i = 0; i < RARITIES.length; i++) {
    roll -= skewed[i];
    if (roll <= 0) return RARITIES[i];
  }
  return RARITIES[0];
}

/** Credits value of a rarity id (0 if unknown). */
export function rarityValue(id) {
  return RARITY_BY_ID[id]?.value ?? 0;
}

/**
 * Total credit value of an inventory map { rarityId: count }.
 * @param {Record<string, number>} inv
 */
export function inventoryValue(inv) {
  let total = 0;
  for (const id in inv) total += (inv[id] || 0) * rarityValue(id);
  return total;
}

/** Total number of rocks held across all tiers. */
export function inventoryCount(inv) {
  let n = 0;
  for (const id in inv) n += inv[id] || 0;
  return n;
}

// Reference so tree-shaking keeps TOTAL_WEIGHT meaningful for debugging.
export const _TOTAL_WEIGHT = TOTAL_WEIGHT;
