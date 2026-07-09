/**
 * Persistence for World Editor terrain sculpting. Own localStorage key
 * (like the nature-prop store): sculpted landscapes are world design, not
 * progression, so they survive save resets and carry between creative,
 * survival, and the editor.
 */

const STORE_KEY = 'starfall.sculpt.v1';
export const MAX_STROKES = 400; // per planet — keeps the height fn cheap

/** Load a planet's saved strokes into a live sampler `sculpts` array. */
export function loadSculpts(planetName, into) {
  try {
    const data = JSON.parse(localStorage.getItem(STORE_KEY) ?? '{}');
    for (const s of data[planetName] ?? []) {
      into.push({ ...s, r2: s.cr * s.cr });
    }
  } catch { /* corrupt/blocked storage: start clean */ }
}

/** Persist a planet's stroke list (r2 is derived — not stored). */
export function saveSculpts(planetName, strokes) {
  try {
    const data = JSON.parse(localStorage.getItem(STORE_KEY) ?? '{}');
    data[planetName] = strokes.map(({ x, y, z, cr, amt, flat, h0 }) => (
      { x, y, z, cr, amt, flat, h0 }
    ));
    localStorage.setItem(STORE_KEY, JSON.stringify(data));
  } catch { /* storage full/blocked: edits stay session-only */ }
}
