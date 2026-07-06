import { RARITY_IDS } from '../economy/Rarity.js';

/**
 * Progression persistence.
 *
 * Design for future cloud sync: the state is produced by one pure
 * `serialize()` snapshot and flushed through a swappable storage adapter
 * (`{ read, write }`). Today the adapter is localStorage; a network adapter
 * can be dropped in later with no gameplay changes. The snapshot carries a
 * `version`, a monotonic `rev`, and a `savedAt` timestamp so a server can do
 * last-write-wins / merge without redesigning the format.
 *
 * Writes are debounced so pickup/kill streams don't hammer storage, and a
 * final flush runs when the tab is hidden or closed.
 */

const KEY = 'starfall-frontier-save-v1';
const SCHEMA_VERSION = 2;

/** Default adapter: browser localStorage, no-op if blocked (private mode). */
class LocalStorageAdapter {
  read(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  }
  write(key, value) {
    try { localStorage.setItem(key, value); return true; } catch { return false; }
  }
}

export class SaveGame {
  /**
   * @param {import('./Game.js').Game} game
   * @param {{ read: Function, write: Function }} [adapter]
   */
  constructor(game, adapter = new LocalStorageAdapter()) {
    this.game = game;
    this.adapter = adapter;
    this._pending = null;
    this._rev = 0;

    // Progression-changing moments trigger a (debounced) save.
    const events = [
      'poi:discovered', 'enemy:killed', 'player:respawned', 'pickup:collected',
      'shop:purchase', 'crew:changed', 'ship:changed', 'onfoot:left',
    ];
    for (const event of events) {
      game.events.on(event, () => this.requestSave());
    }

    // Flush before the tab is backgrounded/closed so nothing is lost.
    window.addEventListener('visibilitychange', () => {
      if (document.hidden) this.flush();
    });
    window.addEventListener('pagehide', () => this.flush());
  }

  /** Restore saved progression into live systems. Call after bootstrap. */
  load() {
    let data;
    try {
      data = JSON.parse(this.adapter.read(KEY) ?? 'null');
    } catch {
      data = null;
    }
    if (!data) return;

    const player = this.game.player;
    if (typeof data.rev === 'number') this._rev = data.rev;
    if (typeof data.resources === 'number') player.resources = data.resources;
    if (typeof data.credits === 'number') player.credits = data.credits;

    if (data.inventory && typeof data.inventory === 'object') {
      player.inventory = {};
      for (const id of RARITY_IDS) {
        if (typeof data.inventory[id] === 'number') player.inventory[id] = data.inventory[id];
      }
    }

    if (data.upgrades) {
      for (const key of ['engine', 'shield', 'weapon']) {
        if (typeof data.upgrades[key] === 'number') {
          player.upgrades[key] = data.upgrades[key];
        }
      }
    }

    if (Array.isArray(data.crew) && this.game.crew) this.game.crew.restore(data.crew);

    // Accept both the legacy `discovered` and the v2 `discoveredSites`.
    const sites = Array.isArray(data.discoveredSites) ? data.discoveredSites
      : Array.isArray(data.discovered) ? data.discovered : null;
    if (sites && this.game.poi) this.game.poi.restoreDiscovered(sites);
  }

  /** Build a plain snapshot of everything worth persisting (pure). */
  serialize() {
    const player = this.game.player;
    return {
      version: SCHEMA_VERSION,
      rev: ++this._rev,
      savedAt: Date.now(),
      resources: player.resources,
      credits: player.credits,
      inventory: { ...player.inventory },
      upgrades: player.upgrades,
      crew: this.game.crew
        ? this.game.crew.roster.map((c) => ({ role: c.role, name: c.name, stars: c.stars }))
        : [],
      discoveredSites: this.game.poi
        ? this.game.poi.sites.filter((s) => s.discovered).map((s) => s.id)
        : [],
    };
  }

  requestSave() {
    if (this._pending) return;
    this._pending = setTimeout(() => {
      this._pending = null;
      this._write();
    }, 1500);
  }

  /** Force an immediate write (used on tab hide/close). */
  flush() {
    if (this._pending) { clearTimeout(this._pending); this._pending = null; }
    this._write();
  }

  _write() {
    const player = this.game.player;
    if (!player) return;
    this.adapter.write(KEY, JSON.stringify(this.serialize()));
  }
}
