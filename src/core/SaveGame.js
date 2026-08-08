import { RARITY_IDS } from '../economy/Rarity.js';
import { PLAYER_SHIP_BY_ID } from '../ship/ShipFactory.js';

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
const SCHEMA_VERSION = 5; // v5: sqrt-scaled xp (v4 xp was credit-inflated and is discarded on load); v3: per-ship upgrades

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
      'shop:purchase', 'crew:changed', 'ship:changed', 'onfoot:left', 'fleet:ship-lost', 'mission:completed',
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

    if (Array.isArray(data.crew) && this.game.crew) this.game.crew.restore(data.crew);

    // Ship collection (validate every id against the live catalog).
    if (data.ships && Array.isArray(data.ships.owned)) {
      const owned = data.ships.owned.filter((id) => PLAYER_SHIP_BY_ID[id]);
      player.ships.owned = owned.length ? owned : ['starter'];
      const active = PLAYER_SHIP_BY_ID[data.ships.active]
        && player.ships.owned.includes(data.ships.active)
        ? data.ships.active : player.ships.owned[0];
      player.setShip(active);
    }

    if (data.hangarStock && typeof data.hangarStock === 'object') {
      for (const key of ['fighter', 'gunner']) {
        if (typeof data.hangarStock[key] === 'number') {
          player.hangarStock[key] = Math.max(0, Math.floor(data.hangarStock[key]));
        }
      }
    }

    // Upgrades (per ship since v3; restored after ships so the active alias
    // points at the right entry). Legacy saves stored one flat
    // {engine, shield, weapon} — migrate it onto the active ship.
    if (data.upgrades && typeof data.upgrades === 'object') {
      const keys = ['engine', 'shield', 'weapon'];
      if (typeof data.upgrades.engine === 'number') {
        const mine = player.upgradesFor(player.ships.active);
        for (const key of keys) {
          if (typeof data.upgrades[key] === 'number') mine[key] = data.upgrades[key];
        }
      } else {
        for (const [shipId, entry] of Object.entries(data.upgrades)) {
          if (!PLAYER_SHIP_BY_ID[shipId] || !entry || typeof entry !== 'object') continue;
          const mine = player.upgradesFor(shipId);
          for (const key of keys) {
            if (typeof entry[key] === 'number') mine[key] = entry[key];
          }
        }
      }
      player.upgrades = player.upgradesFor(player.ships.active);
    }

    // v4 stored credit-equal XP (a single apex bounty ≈ 50 levels) — those
    // totals would defeat the new pacing, so only v5+ XP is honoured.
    if ((data.version ?? 0) >= 5 && typeof data.xp === 'number' && this.game.progression) {
      this.game.progression.setXp(data.xp);
    }

    if (typeof data.missionIndex === 'number' && this.game.missions) {
      this.game.missions.index = Math.max(0, Math.floor(data.missionIndex));
    }

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
      upgrades: player.upgradesByShip, // per-ship since v3 (legacy flat shape migrated on load)
      crew: this.game.crew
        ? this.game.crew.roster.map((c) => ({ role: c.role, name: c.name, stars: c.stars }))
        : [],
      ships: { owned: [...player.ships.owned], active: player.ships.active },
      hangarStock: { ...player.hangarStock },
      xp: this.game.progression?.xp ?? 0,
      missionIndex: this.game.missions?.index ?? 0,
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
    // Creative sessions are a sandbox: NOTHING they do is persisted, so free
    // ships/credits can never leak into a survival save.
    if (this.game.creative) return;
    this.adapter.write(KEY, JSON.stringify(this.serialize()));
  }

  /** Wipe the save entirely (the start screen's "Reset progress"). */
  reset() {
    if (this._pending) { clearTimeout(this._pending); this._pending = null; }
    try {
      this.adapter.write(KEY, '');
      window.localStorage?.removeItem(KEY);
    } catch { /* storage unavailable — nothing to wipe */ }
  }
}
