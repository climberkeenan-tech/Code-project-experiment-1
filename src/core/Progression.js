/**
 * Player XP / level progression — the ship-unlock ladder.
 *
 * Every ship in the catalog unlocks at a fixed PLAYER level (a new hull
 * every 10 levels; the SF-10 is free from level 1). XP flows from playing,
 * not shopping:
 *   - combat kills   → the enemy's credit reward, as XP
 *   - missions       → the contract reward, as XP
 *   - ore sales      → half the sale value, as XP (miners level too)
 *
 * Level curve: cumulative XP to REACH level L is 10·(L−1)² — level 10 needs
 * 810 XP (the first few fights and contracts), level 60 ≈ 35k, the SF-150
 * capstone at level 120 ≈ 142k: an endgame on par with the old full-hangar
 * credit grind. Level is DERIVED from total XP, so only `xp` persists in
 * the save and the curve can be retuned without migrations.
 *
 * Creative mode ignores locks entirely (the Shop checks), but XP still
 * accrues so a creative session shows honest numbers.
 */

/** Cumulative XP required to reach a level (level 1 = 0). */
export function xpForLevel(level) {
  return 10 * (level - 1) * (level - 1);
}

/** Level for a cumulative XP total. */
export function levelForXp(xp) {
  return Math.max(1, Math.floor(Math.sqrt(Math.max(0, xp) / 10)) + 1);
}

export class Progression {
  /** @param {import('./Game.js').Game} game */
  constructor(game) {
    this.game = game;
    game.progression = this;

    this.xp = 0;
    this.level = 1;

    game.events.on('combat:reward', ({ credits }) => {
      if (credits > 0) this.addXp(credits);
    });
    game.events.on('mission:completed', ({ reward }) => {
      if (reward > 0) this.addXp(reward);
    });
    game.events.on('ore:sold', ({ credits }) => {
      if (credits > 0) this.addXp(Math.round(credits / 2));
    });
  }

  update() {} // event-driven; registered as a system for lifecycle symmetry

  /** Grant XP and emit one `level:up` per level crossed (in order). */
  addXp(amount) {
    if (!(amount > 0)) return;
    this.xp += Math.round(amount);
    while (this.xp >= xpForLevel(this.level + 1)) {
      this.level += 1;
      this.game.events.emit('level:up', { level: this.level });
    }
  }

  /** Restore from a save (level derived, no events fired). */
  setXp(xp) {
    this.xp = Math.max(0, Math.round(xp || 0));
    this.level = levelForXp(this.xp);
  }

  /** Progress through the current level, 0..1 (for the HUD bar). */
  levelProgress() {
    const base = xpForLevel(this.level);
    const next = xpForLevel(this.level + 1);
    return Math.min(1, (this.xp - base) / Math.max(1, next - base));
  }
}
