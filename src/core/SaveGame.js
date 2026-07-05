/**
 * Lightweight persistence via localStorage.
 *
 * Saves the progression that matters across sessions — resources, ship
 * upgrades, and which sites have been discovered — and restores it at
 * boot. Writes are debounced so pickup streams don't hammer storage.
 */

const KEY = 'starfall-frontier-save-v1';

export class SaveGame {
  /** @param {import('./Game.js').Game} game */
  constructor(game) {
    this.game = game;
    this._pending = null;

    // Progression-changing moments trigger a (debounced) save.
    for (const event of ['poi:discovered', 'enemy:killed', 'player:respawned', 'pickup:collected']) {
      game.events.on(event, () => this.requestSave());
    }
  }

  /** Restore saved progression into live systems. Call after bootstrap. */
  load() {
    let data;
    try {
      data = JSON.parse(localStorage.getItem(KEY) ?? 'null');
    } catch {
      data = null;
    }
    if (!data) return;

    const player = this.game.player;
    if (typeof data.resources === 'number') player.resources = data.resources;
    if (data.upgrades) {
      for (const key of ['engine', 'shield', 'weapon']) {
        if (typeof data.upgrades[key] === 'number') {
          player.upgrades[key] = data.upgrades[key];
        }
      }
    }
    if (Array.isArray(data.discovered) && this.game.poi) {
      this.game.poi.restoreDiscovered(data.discovered);
    }
  }

  requestSave() {
    if (this._pending) return;
    this._pending = setTimeout(() => {
      this._pending = null;
      this._write();
    }, 1500);
  }

  _write() {
    const player = this.game.player;
    if (!player) return;
    const data = {
      resources: player.resources,
      upgrades: player.upgrades,
      discovered: this.game.poi
        ? this.game.poi.sites.filter((s) => s.discovered).map((s) => s.id)
        : [],
    };
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch {
      // Storage full or blocked (private browsing) — play on without saves.
    }
  }
}
