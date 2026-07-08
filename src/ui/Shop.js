import { RARITIES, rarityValue } from '../economy/Rarity.js';
import { CrewManager, crewCost } from '../crew/CrewManager.js';
import { PLAYER_SHIPS } from '../ship/ShipFactory.js';

/**
 * Outpost Exchange — the economy sink.
 *
 * A paused, DOM-based modal (same overlay grain as Screens) where the player
 * sells mined ore for credits, buys permanent ship upgrades, and repairs the
 * hull. Hailable from anywhere with T / the on-screen HAIL button (an interim
 * for the physical callable outpost carrier that a later phase will add; the
 * carrier will simply reuse this same modal on dock).
 *
 * Registered as a system so it can watch for the hail key while playing; all
 * interaction while open is DOM-driven (the sim is paused, so update() won't
 * run — buttons and an Esc listener drive it instead).
 */

const UPGRADE_STEP = 0.15;
const UPGRADES = [
  { key: 'engine', label: 'Engines', blurb: 'Thrust + top speed' },
  { key: 'weapon', label: 'Weapons', blurb: 'Laser damage' },
  { key: 'shield', label: 'Shields', blurb: 'Shield capacity + regen' },
];

export class Shop {
  /** @param {import('../core/Game.js').Game} game */
  constructor(game) {
    this.game = game;
    this.isOpen = false;
    this.tab = 'sell';
    /** Rotating recruit pool for the Crew tab. */
    this.recruits = [];

    const root = document.getElementById('ui-root');

    // Floating "hail" button (works on desktop + touch).
    this.fab = document.createElement('button');
    this.fab.className = 'trade-fab';
    this.fab.textContent = '⛃ Trade';
    this.fab.addEventListener('pointerdown', (e) => { e.preventDefault(); this.open(); });
    root.appendChild(this.fab);
    this._setFab(false);

    // Modal overlay.
    this.el = document.createElement('div');
    this.el.className = 'shop-screen hidden';
    this.el.innerHTML = `
      <div class="shop-panel">
        <div class="shop-head">
          <div class="shop-title">Outpost Exchange</div>
          <div class="shop-credits">◈ <span data-el="shopCredits">0</span> cr</div>
          <button class="shop-close" data-el="shopClose">✕</button>
        </div>
        <div class="shop-tabs">
          <button class="shop-tab" data-tab="sell">Sell Ore</button>
          <button class="shop-tab" data-tab="upgrades">Upgrades</button>
          <button class="shop-tab" data-tab="ships">Ships</button>
          <button class="shop-tab" data-tab="crew">Crew</button>
          <button class="shop-tab" data-tab="repair">Repair</button>
        </div>
        <div class="shop-body" data-el="shopBody"></div>
      </div>
    `;
    root.appendChild(this.el);

    this.refs = {};
    for (const node of this.el.querySelectorAll('[data-el]')) this.refs[node.dataset.el] = node;

    this.refs.shopClose.addEventListener('pointerdown', (e) => { e.preventDefault(); this.close(); });
    for (const tabBtn of this.el.querySelectorAll('.shop-tab')) {
      tabBtn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.tab = tabBtn.dataset.tab;
        this._render();
      });
    }
    // Delegated action buttons in the body.
    this.refs.shopBody.addEventListener('pointerdown', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      e.preventDefault();
      this._action(btn.dataset.action, btn.dataset.arg);
    });

    this._onKey = (e) => { if (e.code === 'Escape') this.close(); };

    // FAB visibility follows the play state.
    game.events.on('game:started', () => this._setFab(true));
    game.events.on('player:died', () => this._setFab(false));
    game.events.on('player:respawned', () => this._setFab(true));
    game.events.on('shop:open', () => this.open());
  }

  update() {
    // Only runs while playing (systems are gated on !paused). Watch for hail.
    if (this.isOpen) return;
    if (this.game.input.consumeTrade()) this.open();
  }

  open() {
    if (this.isOpen || this.game.paused) return; // never over start/death screens
    if (this.recruits.length === 0) this._refillRecruits();
    this.isOpen = true;
    this.game.paused = true;
    this._setFab(false);
    this.el.classList.remove('hidden');
    window.addEventListener('keydown', this._onKey);
    this.game.audio?.playTone?.({ type: 'sine', freq: 440, freqEnd: 620, duration: 0.16, gain: 0.14 });
    this._render();
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.game.paused = false;
    this._setFab(true);
    this.el.classList.add('hidden');
    window.removeEventListener('keydown', this._onKey);
    this.game.audio?.playTone?.({ type: 'sine', freq: 620, freqEnd: 440, duration: 0.16, gain: 0.12 });
    this.game.events.emit('shop:closed');
  }

  _setFab(visible) {
    this.fab.classList.toggle('visible', visible);
  }

  // --- Rendering ---

  _render() {
    const player = this.game.player;
    this.refs.shopCredits.textContent = this.game.creative ? '∞' : String(player.credits);
    for (const t of this.el.querySelectorAll('.shop-tab')) {
      t.classList.toggle('active', t.dataset.tab === this.tab);
    }
    if (this.tab === 'sell') this.refs.shopBody.innerHTML = this._renderSell();
    else if (this.tab === 'upgrades') this.refs.shopBody.innerHTML = this._renderUpgrades();
    else if (this.tab === 'ships') this.refs.shopBody.innerHTML = this._renderShips();
    else if (this.tab === 'crew') this.refs.shopBody.innerHTML = this._renderCrew();
    else this.refs.shopBody.innerHTML = this._renderRepair();
  }

  _renderShips() {
    const player = this.game.player;
    return PLAYER_SHIPS.map((s) => {
      const owned = player.ships.owned.includes(s.id);
      const active = player.ships.active === s.id;
      const afford = this._afford(s.cost);
      const btn = active ? `<button class="shop-btn disabled">Active</button>`
        : owned ? `<button class="shop-btn" data-action="selectShip" data-arg="${s.id}">Select</button>`
          : `<button class="shop-btn ${afford ? 'primary' : 'disabled'}" data-action="buyShip" data-arg="${s.id}">Buy · ${s.cost} cr</button>`;
      return `
        <div class="shop-row">
          <span class="shop-row-name">${s.name} <small>Lv ${s.level}</small></span>
          <span class="shop-row-meta">hull ×${s.hull} · shd ×${s.shield} · crew ${s.crew}${s.turrets ? ` · ⌖${s.turrets} turrets` : ''}${s.hangar ? ` · ⬡${s.hangar} hangar` : ''}</span>
          ${btn}
        </div>`;
    }).join('');
  }

  _renderSell() {
    const inv = this.game.player.inventory;
    const rows = RARITIES.filter((r) => (inv[r.id] || 0) > 0).map((r) => {
      const count = inv[r.id];
      const worth = count * r.value;
      return `
        <div class="shop-row">
          <span class="ore-dot" style="background:#${r.color.toString(16).padStart(6, '0')}"></span>
          <span class="shop-row-name">${r.name}</span>
          <span class="shop-row-meta">×${count} · ${r.value} cr ea</span>
          <button class="shop-btn" data-action="sell" data-arg="${r.id}">Sell ${worth} cr</button>
        </div>`;
    }).join('');
    const total = RARITIES.reduce((s, r) => s + (inv[r.id] || 0) * r.value, 0);
    if (!rows) return `<div class="shop-empty">No ore in the hold. Land on a planet, disembark (E) and mine.</div>`;
    return rows + `
      <div class="shop-row shop-total">
        <span class="shop-row-name">Sell Everything</span>
        <span class="shop-row-meta"></span>
        <button class="shop-btn primary" data-action="sellAll" data-arg="">Sell All · ${total} cr</button>
      </div>`;
  }

  _renderUpgrades() {
    const player = this.game.player;
    return UPGRADES.map((u) => {
      const mult = player.upgrades[u.key];
      const level = Math.round((mult - 1) / UPGRADE_STEP);
      const cost = this._upgradeCost(level);
      const afford = this._afford(cost);
      return `
        <div class="shop-row">
          <span class="shop-row-name">${u.label} <small>Lv ${level}</small></span>
          <span class="shop-row-meta">${u.blurb} · ×${mult.toFixed(2)}</span>
          <button class="shop-btn ${afford ? '' : 'disabled'}" data-action="upgrade" data-arg="${u.key}">
            ${afford ? `Upgrade · ${cost} cr` : `${cost} cr`}
          </button>
        </div>`;
    }).join('');
  }

  _refillRecruits() {
    this.recruits = Array.from({ length: 4 }, () => CrewManager.makeRecruit());
  }

  _stars(n) {
    return '★'.repeat(n) + '<span style="opacity:.3">' + '★'.repeat(5 - n) + '</span>';
  }

  _renderCrew() {
    const crew = this.game.crew;
    const roster = crew ? crew.roster : [];
    const cap = crew ? crew.capacity : 0;

    const hired = roster.length
      ? roster.map((c) => `
        <div class="shop-row">
          <span class="shop-row-name">${cap ? '' : ''}${cname(c.role)} <small>${c.name}</small></span>
          <span class="shop-row-meta">${this._stars(c.stars)}</span>
          <button class="shop-btn" data-action="fireCrew" data-arg="${c.id}">Dismiss</button>
        </div>`).join('')
      : `<div class="shop-empty">No crew aboard. Hire an Engineer to auto-repair, or a Gunner to auto-fire.</div>`;

    const full = roster.length >= cap;
    const recruits = this.recruits.map((r, i) => {
      const cost = crewCost(r.stars);
      const afford = this._afford(cost) && !full;
      return `
        <div class="shop-row">
          <span class="shop-row-name">${cname(r.role)} <small>${r.name}</small></span>
          <span class="shop-row-meta">${this._stars(r.stars)}</span>
          <button class="shop-btn ${afford ? '' : 'disabled'}" data-action="hireCrew" data-arg="${i}">
            ${full ? 'Full' : `Hire · ${cost} cr`}
          </button>
        </div>`;
    }).join('');

    return `<div class="shop-section">Aboard (${roster.length}/${cap})</div>${hired}
      <div class="shop-section">Available Recruits</div>${recruits}`;
  }

  _renderRepair() {
    const player = this.game.player;
    const missing = Math.ceil(player.hullMax - player.hull);
    const cost = Math.ceil(missing * 0.8);
    if (missing <= 0) return `<div class="shop-empty">Hull is at full integrity.</div>`;
    const afford = this._afford(cost);
    return `
      <div class="shop-row">
        <span class="shop-row-name">Hull Repair</span>
        <span class="shop-row-meta">${Math.ceil(player.hull)}/${player.hullMax} · ${missing} dmg</span>
        <button class="shop-btn ${afford ? '' : 'disabled'}" data-action="repair" data-arg="">
          ${afford ? `Repair · ${cost} cr` : `${cost} cr`}
        </button>
      </div>`;
  }

  _upgradeCost(level) {
    return 40 + level * 35;
  }

  /** Creative (free-build) mode: everything is affordable and costs nothing. */
  _afford(cost) { return this.game.creative || this.game.player.credits >= cost; }

  /** Deduct a price — a no-op in creative mode so credits never run down. */
  _spend(cost) { if (!this.game.creative) this.game.player.credits -= cost; }

  // --- Actions ---

  _action(action, arg) {
    const player = this.game.player;
    if (action === 'sell') this._sell(arg);
    else if (action === 'sellAll') this._sellAll();
    else if (action === 'upgrade') this._upgrade(arg);
    else if (action === 'repair') this._repair();
    else if (action === 'hireCrew') this._hireCrew(Number(arg));
    else if (action === 'fireCrew') this._fireCrew(Number(arg));
    else if (action === 'buyShip') this._buyShip(arg);
    else if (action === 'selectShip') this._selectShip(arg);
    this._render();
  }

  _buyShip(id) {
    const player = this.game.player;
    const variant = PLAYER_SHIPS.find((s) => s.id === id);
    if (!variant || player.ships.owned.includes(id)) return;
    if (!this._afford(variant.cost)) { this._deny(); return; }
    this._spend(variant.cost);
    player.ships.owned.push(id);
    player.setShip(id); // new purchase becomes the active ship
    this._chime();
    this.game.events.emit('shop:purchase');
  }

  _selectShip(id) {
    const player = this.game.player;
    if (!player.ships.owned.includes(id)) { this._deny(); return; }
    player.setShip(id);
    this._chime();
    this.game.events.emit('shop:purchase');
  }

  _hireCrew(index) {
    const crew = this.game.crew;
    const recruit = this.recruits[index];
    if (!crew || !recruit) return;
    const cost = crewCost(recruit.stars);
    if (!this._afford(cost) || crew.roster.length >= crew.capacity) { this._deny(); return; }
    if (!crew.hire(recruit)) { this._deny(); return; }
    this._spend(cost);
    this.recruits.splice(index, 1);
    if (this.recruits.length < 2) this._refillRecruits();
    this._chime();
    this.game.events.emit('shop:purchase');
  }

  _fireCrew(id) {
    if (!this.game.crew) return;
    this.game.crew.fire(id);
    this._chime();
    this.game.events.emit('crew:changed');
  }

  _sell(rarityId) {
    const player = this.game.player;
    const count = player.inventory[rarityId] || 0;
    if (count <= 0) return;
    player.credits += count * rarityValue(rarityId);
    player.inventory[rarityId] = 0;
    this._chime();
    this.game.events.emit('shop:purchase');
  }

  _sellAll() {
    const player = this.game.player;
    let gained = 0;
    for (const r of RARITIES) {
      const count = player.inventory[r.id] || 0;
      gained += count * r.value;
      player.inventory[r.id] = 0;
    }
    if (gained <= 0) return;
    player.credits += gained;
    this._chime();
    this.game.events.emit('shop:purchase');
  }

  _upgrade(key) {
    const player = this.game.player;
    const level = Math.round((player.upgrades[key] - 1) / UPGRADE_STEP);
    const cost = this._upgradeCost(level);
    if (!this._afford(cost)) { this._deny(); return; }
    this._spend(cost);
    player.upgrades[key] += UPGRADE_STEP;
    if (key === 'shield') player.applyUpgrades();
    this._chime();
    this.game.events.emit('shop:purchase');
    this.game.events.emit('ship:changed');
  }

  _repair() {
    const player = this.game.player;
    const missing = Math.ceil(player.hullMax - player.hull);
    const cost = Math.ceil(missing * 0.8);
    if (missing <= 0 || !this._afford(cost)) { this._deny(); return; }
    this._spend(cost);
    player.hull = player.hullMax;
    this._chime();
    this.game.events.emit('shop:purchase');
  }

  _chime() {
    this.game.audio?.playTone?.({ type: 'triangle', freq: 660, freqEnd: 990, duration: 0.14, gain: 0.16 });
  }

  _deny() {
    this.game.audio?.playTone?.({ type: 'square', freq: 180, freqEnd: 120, duration: 0.16, gain: 0.12 });
  }
}

/** Display name for a crew role. */
function cname(role) {
  return role === 'engineer' ? 'Engineer' : role === 'gunner' ? 'Gunner' : role;
}
