/**
 * Player XP / level progression — the ship-unlock ladder.
 *
 * Every ship in the catalog unlocks at a fixed PLAYER level (a new hull
 * every 10 levels; the SF-10 is free from level 1). XP flows from playing,
 * not shopping, and is SQRT-SCALED off credit value so one huge payday
 * can't skip dozens of levels (playtest: XP used to equal credits — a
 * single 25k apex bounty jumped straight to level 50 and "most of the
 * ships" were unlocked by the first play session):
 *   - combat kills → 8·√(credit reward)   (scout ≈ 36 XP … apex ≈ 1.3k,
 *     the Leviathan's 150k bounty ≈ 3.1k XP — a chunk, never the ladder)
 *   - missions     → 6·√(reward)          (early rungs ≈ 40–90 XP)
 *   - ore sales    → 2·√(sale value)      (miners level too, slowly)
 *
 * Level curve: cumulative XP to REACH level L is 28·(L−1)^1.8 —
 * level 10 ≈ 1.5k (a solid first session: the SF-20, nothing more),
 * level 50 ≈ 31k, the SF-150 capstone at level 120 ≈ 152k (a full
 * campaign). Level is DERIVED from total XP, so only `xp` persists in the
 * save and the curve can be retuned without migrations.
 *
 * Creative mode ignores locks entirely (the Shop checks), but XP still
 * accrues so a creative session shows honest numbers.
 */

/** Cumulative XP required to reach a level (level 1 = 0). */
export function xpForLevel(level) {
  return Math.round(28 * Math.pow(Math.max(0, level - 1), 1.8));
}

/** Level for a cumulative XP total (numeric inverse of the power curve). */
export function levelForXp(xp) {
  const clamped = Math.max(0, xp);
  let level = Math.max(1, Math.floor(Math.pow(clamped / 28, 1 / 1.8)) + 1);
  while (xpForLevel(level + 1) <= clamped) level += 1;
  while (level > 1 && xpForLevel(level) > clamped) level -= 1;
  return level;
}

export class Progression {
  /** @param {import('./Game.js').Game} game */
  constructor(game) {
    this.game = game;
    game.progression = this;

    this.xp = 0;
    this.level = 1;

    game.events.on('combat:reward', ({ credits }) => {
      if (credits > 0) this.addXp(8 * Math.sqrt(credits));
    });
    game.events.on('mission:completed', ({ reward }) => {
      if (reward > 0) this.addXp(6 * Math.sqrt(reward));
    });
    game.events.on('ore:sold', ({ credits }) => {
      if (credits > 0) this.addXp(2 * Math.sqrt(credits));
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
