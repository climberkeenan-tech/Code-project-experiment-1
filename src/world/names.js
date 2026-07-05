/**
 * Procedural celestial names: pronounceable two-to-three syllable stems
 * with occasional classical designations. Seeded, so every universe names
 * its worlds the same way each visit.
 */

const ONSETS = ['K', 'V', 'Th', 'N', 'Z', 'S', 'M', 'R', 'D', 'L', 'X', 'Or', 'Az', 'El', 'Ur'];
const VOWELS = ['a', 'e', 'i', 'o', 'u', 'ae', 'ia', 'ei'];
const CODAS = ['n', 'r', 's', 'th', 'x', 'l', 'm', 'nd', 'rr', ''];
const DESIGNATIONS = ['Prime', 'Minor', 'II', 'III', 'IV', 'V', 'IX', ''];

/**
 * @param {import('../core/math/rng.js').Rng} rng
 * @returns {string} e.g. "Zarath Prime", "Veluria", "Korrin IV"
 */
export function generatePlanetName(rng) {
  let name = rng.pick(ONSETS);
  const syllables = rng.int(1, 2);
  for (let i = 0; i < syllables; i++) {
    name += rng.pick(VOWELS);
    // Middle consonants keep it flowing; codas end it.
    name += i < syllables - 1
      ? rng.pick(['r', 'l', 'n', 'v', 'th', 'z'])
      : rng.pick(CODAS);
  }
  name = name.charAt(0).toUpperCase() + name.slice(1);
  const designation = rng.pick(DESIGNATIONS);
  return designation ? `${name} ${designation}` : name;
}

/** Names for stations, wrecks, and anomalies. */
export function generateSiteName(rng, kind) {
  const greek = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Sigma', 'Tau', 'Omega'];
  const number = rng.int(2, 89);
  switch (kind) {
    case 'station':
      return `${rng.pick(greek)} Station ${number}`;
    case 'satellite':
      return `Relay ${rng.pick(greek)}-${number}`;
    case 'wreck':
      return `Wreck of the ${rng.pick(['Meridian', 'Cormorant', 'Halcyon', 'Vagrant', 'Auriga', 'Pallas'])}`;
    case 'anomaly':
      return `Anomaly ${rng.pick(greek)}-${number}`;
    default:
      return `Site ${number}`;
  }
}
