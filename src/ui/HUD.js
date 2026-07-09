import * as THREE from 'three';

/**
 * Heads-up display.
 *
 * DOM-based (not WebGL): text stays crisp at any resolution, layout is
 * driven by CSS with safe-area support, and the browser compositor renders
 * it for free alongside the canvas.
 *
 * Performance rules:
 *  - bars update via `transform: scaleX()` (compositor-only, no layout)
 *  - text nodes only touch the DOM when the displayed value actually changes
 */
export class HUD {
  /** @param {import('../core/Game.js').Game} game */
  constructor(game) {
    this.game = game;

    const root = document.getElementById('ui-root');
    this.el = document.createElement('div');
    this.el.className = 'hud';
    this.el.innerHTML = `
      <div class="hud-status hud-panel">
        <div class="row">
          <div class="row-head"><span class="hud-label">Hull</span><span class="hud-value" data-el="hullText">100</span></div>
          <div class="hud-bar"><div class="fill hull" data-el="hullBar"></div></div>
        </div>
        <div class="row">
          <div class="row-head"><span class="hud-label">Shield</span><span class="hud-value" data-el="shieldText">100</span></div>
          <div class="hud-bar"><div class="fill shield" data-el="shieldBar"></div></div>
        </div>
      </div>

      <div class="hud-location">
        <div class="place" data-el="place">Deep Space</div>
        <div class="sub" data-el="placeSub"></div>
        <div class="credits">&#9672; <span data-el="credits">0</span> cr</div>
        <div class="resources">&#9671; <span data-el="resources">0</span></div>
        <div class="cargo" data-el="cargo"></div>
        <div class="fleet" data-el="fleet"></div>
        <div class="contacts" data-el="contacts"></div>
      </div>

      <div class="hud-flight">
        <div class="speed"><span data-el="speed">0</span> <small>m/s</small></div>
        <div class="alt" data-el="alt"></div>
      </div>

      <div class="hud-meters">
        <div class="meter">
          <div class="meter-head"><span class="hud-label">Boost</span></div>
          <div class="hud-bar"><div class="fill boost" data-el="boostBar"></div></div>
        </div>
        <div class="meter">
          <div class="meter-head"><span class="hud-label">Weapons</span></div>
          <div class="hud-bar"><div class="fill heat" data-el="heatBar"></div></div>
        </div>
      </div>

      <div class="hud-crosshair">
        <span class="side-l"></span><span class="side-r"></span><span class="dot"></span>
      </div>
      <div class="hud-hitmarker" data-el="hitmarker"><span></span><span></span><span></span><span></span></div>

      <div class="hud-banner" data-el="banner">
        <div class="title" data-el="bannerTitle"></div>
        <div class="subtitle" data-el="bannerSub"></div>
      </div>
      <div class="hud-alert" data-el="alert"></div>
      <div class="hud-prompt" data-el="prompt"></div>
      <div class="hud-warp" data-el="warp"></div>
      <div class="hud-landhint" data-el="landHint"></div>

      <canvas class="hud-radar" data-el="radar" width="236" height="236"></canvas>

      <div class="damage-vignette" data-el="vignette"></div>
      <div class="entry-glow" data-el="entryGlow"></div>
      <div class="underwater" data-el="underwater"></div>
      <div class="air-meter" data-el="airMeter"></div>
      <div class="reinforce-popup fleetcall-popup" data-el="fleetcallPopup">
        <div class="rp-title">Summon Your Fleet</div>
        <div class="rp-sub">Pick the ships that answer (max 50 total)</div>
        <div class="fc-rows" data-el="fleetcallRows"></div>
        <div class="rp-sub" data-el="fleetcallTotal">0 / 50 ships</div>
        <div class="rp-row">
          <button class="rp-btn primary" data-el="fleetcallGo">Summon</button>
          <button class="rp-btn" data-el="fleetcallCancel">Cancel</button>
        </div>
      </div>
      <div class="reinforce-popup" data-el="reinforcePopup">
        <div class="rp-title">Call Reinforcements</div>
        <div class="rp-sub">How many allied ships should answer? (1–40)</div>
        <input type="number" min="1" max="40" value="10" data-el="reinforceCount">
        <div class="rp-row">
          <button class="rp-btn primary" data-el="reinforceGo">Call them in</button>
          <button class="rp-btn" data-el="reinforceCancel">Cancel</button>
        </div>
      </div>
      <div class="hud-debug" data-el="debug"></div>
    `;
    root.appendChild(this.el);

    /** @type {Record<string, HTMLElement>} */
    this.refs = {};
    for (const node of this.el.querySelectorAll('[data-el]')) {
      this.refs[node.dataset.el] = node;
    }

    // Cached last-written values to avoid redundant DOM writes.
    this._last = {};
    this._bannerTimer = 0;
    this._vignette = 0;
    this._entryGlow = 0;
    this._radial = new THREE.Vector3();

    this.debugEnabled = new URLSearchParams(location.search).has('debug');
    if (!this.debugEnabled) this.refs.debug.style.display = 'none';

    game.events.on('player:hit', () => { this._vignette = Math.min(1, this._vignette + 0.55); });
    game.events.on('combat:hit-confirmed', (info) => this._popHitmarker(info?.killed));
    game.events.on('poi:discovered', (poi) => this.showBanner(poi.title, poi.subtitle));
    game.events.on('poi:signal', () => {
      this.showBanner('Unknown Signal Detected', 'investigate nearby coordinates', 3.5);
    });
    game.events.on('combat:contact', ({ count }) => {
      this.showBanner('Hostile Contacts', `${count} signatures approaching`, 3);
    });
    game.events.on('leviathan:contact', () => {
      this.showBanner('⚠ OBSIDIAN LEVIATHAN ⚠', 'enemy fortress — its garrison is endless', 5);
    });
    game.events.on('leviathan:destroyed', () => {
      this.showBanner('★ THE LEVIATHAN HAS FALLEN ★', 'the enemy hub is destroyed', 6);
    });
    game.events.on('combat:reward', ({ credits, name }) => {
      if (credits > 0) this.showBanner(`+${credits} cr`, `${name} destroyed`, 1.6);
    });
    this._missileWarn = false;
    game.events.on('missile:incoming', () => {
      this._missileWarn = true;
      game.audio?.playTone?.({ type: 'square', freq: 880, freqEnd: 880, duration: 0.12, gain: 0.16 });
    });
    game.events.on('missile:cleared', () => { this._missileWarn = false; });
    game.events.on('missile:destroyed', () => {
      this.showBanner('Missile Intercepted', '', 1.2);
    });
    game.events.on('fleet:launched', (n) => this.showBanner('Attack Ships Deployed', `${n} craft launched — Deploy/G again to recall · Focus/V directs fire`, 2.8));
    // Teach the fleet key: whenever the player boards a carrier-class hull.
    game.events.on('ship:changed', (v) => {
      if ((v?.hangar ?? 0) > 0) {
        this.showBanner('Fleet Ready', 'press G — your ships deploy as a protective fleet around you', 3.6);
      }
    });
    game.events.on('game:started', () => {
      if ((game.player?.statMult?.hangar ?? 0) > 0) {
        this.showBanner('Fleet Ready', 'press G — your ships deploy as a protective fleet around you', 3.6);
      }
    });
    // Star Destroyer: the G-key fleet-composition call (pick ships, max 50).
    const FLEET_ROWS = [
      ['aethelred', 'SF-200 Aethelred', 1], ['carrier', 'SF-110 Vanguard', 3],
      ['battleship', 'SF-85 Dreadnought', 5], ['sovereign', 'SF-100 Sovereign', 20],
      ['battlecruiser', 'SF-70 Bastion', 20], ['frigate', 'SF-50 Aegis', 20],
      ['explorer', 'SF-20 Gunship', 25], ['starter', 'SF-10 Sentinel', 50],
    ];
    this.refs.fleetcallRows.innerHTML = FLEET_ROWS.map(([id, name, max]) => `
      <label class="fc-row"><span>${name} <small>(max ${max})</small></span>
        <input type="number" min="0" max="${max}" value="0" data-fleet="${id}" data-max="${max}">
      </label>`).join('');
    const fcInputs = [...this.refs.fleetcallRows.querySelectorAll('input')];
    const fcTotal = () => fcInputs.reduce((sum, inp) => {
      const max2 = parseInt(inp.dataset.max, 10);
      const v = Math.max(0, Math.min(max2, parseInt(inp.value, 10) || 0));
      return sum + v;
    }, 0);
    const fcRefresh = () => {
      const t = fcTotal();
      this.refs.fleetcallTotal.textContent = `${t} / 50 ships${t > 50 ? ' — TOO MANY' : ''}`;
      this.refs.fleetcallTotal.style.color = t > 50 ? '#ff5d6c' : '';
    };
    for (const inp of fcInputs) inp.addEventListener('input', fcRefresh);
    game.events.on('fleetcall:prompt', () => {
      this.refs.fleetcallPopup.classList.add('visible');
      game.paused = true;
      fcRefresh();
    });
    const closeFleetcall = () => {
      this.refs.fleetcallPopup.classList.remove('visible');
      game.paused = false;
    };
    this.refs.fleetcallGo.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      const variants = [];
      let budget = 50;
      for (const inp of fcInputs) {
        const max2 = parseInt(inp.dataset.max, 10);
        let v = Math.max(0, Math.min(max2, parseInt(inp.value, 10) || 0));
        v = Math.min(v, budget);
        budget -= v;
        for (let i = 0; i < v; i++) variants.push(inp.dataset.fleet);
      }
      if (!variants.length) { closeFleetcall(); return; }
      closeFleetcall();
      game.events.emit('fleetcall:call', { variants });
      this.showBanner('Fleet Answering', `${variants.length} ships jumping to your position`, 3.2);
    });
    this.refs.fleetcallCancel.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      closeFleetcall();
    });

    // Night Hawk: the G-key reinforcement call popup.
    game.events.on('reinforce:prompt', () => {
      this.refs.reinforcePopup.classList.add('visible');
      game.paused = true;
      setTimeout(() => this.refs.reinforceCount.focus(), 50);
    });
    const closeReinforce = () => {
      this.refs.reinforcePopup.classList.remove('visible');
      game.paused = false;
    };
    this.refs.reinforceGo.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      const n = Math.max(1, Math.min(40, parseInt(this.refs.reinforceCount.value, 10) || 10));
      closeReinforce();
      game.events.emit('reinforce:call', { count: n });
      this.showBanner('Reinforcements Inbound', `${n} allied ships answering your call`, 3);
    });
    this.refs.reinforceCancel.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      closeReinforce();
    });
    game.events.on('mission:allcomplete', () => {
      this.showBanner('★ ALL 75 MISSIONS COMPLETE ★', 'the entire reward hangar is yours', 6);
    });
    game.events.on('mission:shipunlock', ({ name }) => {
      this.showBanner(`★ ${name.toUpperCase()} UNLOCKED ★`, 'your free ship is waiting in the Ships tab', 6);
    });
    game.events.on('mission:progress', ({ left, total }) => {
      this.showBanner('Mission Progress', `${total - left}/${total} targets destroyed`, 1.6);
    });
    game.events.on('system:entered', ({ name, from }) => {
      this.showBanner(`Entering the ${name} System`, `leaving ${from} behind — new worlds ahead`, 4.5);
    });
    game.events.on('mission:started', (m) => {
      this.showBanner(`Mission ${m.index + 1}`, `${m.label} — it just warped in ahead of you!`, 3.6);
    });
    game.events.on('mission:completed', ({ reward, label }) => {
      this.showBanner(`Mission Complete · +${reward} cr`, label, 3.4);
    });
    game.events.on('mission:lost', () => {
      this.showBanner('Mission Target Lost', 'restart it from the Exchange (T → Missions)', 3);
    });
    game.events.on('nav:toggled', (hidden) => {
      this.showBanner(hidden ? 'Navigation Markers Hidden' : 'Navigation Markers Shown', 'press N to toggle', 1.6);
    });
    // Underwater: blue wash + a breath meter of popping bubbles.
    game.events.on('onfoot:air', ({ air01, under }) => {
      this.refs.underwater.classList.toggle('visible', under);
      const meter = this.refs.airMeter;
      if (!under && air01 >= 1) {
        meter.classList.remove('visible');
      } else {
        meter.classList.add('visible');
        const total = 8;
        const filled = Math.ceil(air01 * total);
        let html = '';
        for (let i = 0; i < total; i++) {
          html += `<span class="bubble${i < filled ? ' full' : ''}"></span>`;
        }
        meter.innerHTML = html;
      }
    });
    game.events.on('onfoot:drowned', () => {
      this.showBanner('You Drowned', 'your ore floats where you sank — swim back for the amber marker', 4);
    });
    game.events.on('onfoot:left', () => {
      this.refs.underwater.classList.remove('visible');
      this.refs.airMeter.classList.remove('visible');
    });
    game.events.on('fleet:focus', (t) => this.showBanner('Fleet: Focus Fire', `wing attacking Lv${t.stats?.level ?? '?'} ${t.stats?.displayName ?? 'hostile'}`, 2.4));
    game.events.on('fleet:free', () => this.showBanner('Fleet: Free Engage', 'wing hunting on its own', 2));
    game.events.on('fleet:no-wing', () => this.showBanner('No Wing Deployed', 'press Deploy (G) to launch attack ships first', 2.2));
    game.events.on('fleet:recalled', () => this.showBanner('Attack Ships Recalled', 'wing docked', 1.8));
    game.events.on('fleet:ship-lost', () => this.showBanner('Attack Ship Down', 'a fighter was destroyed', 2));
    game.events.on('fleet:denied', () => this.showBanner('No Hangar', 'only a Dreadnought or Carrier can deploy attack ships', 2.4));
    game.events.on('fleet:empty', () => this.showBanner('Hangar Empty', 'buy attack craft at the Exchange — press T, Hangar tab', 3));
    game.events.on('onfoot:prompt', (text) => this.setPrompt(text));
    game.events.on('landing:hint', (text) => {
      this.refs.landHint.textContent = text;
      this.refs.landHint.classList.toggle('visible', text.length > 0);
    });
    game.events.on('player:autolanded', (planet) => {
      this.showBanner('Touchdown', `${planet.descriptor.name} — press E to disembark`, 2.5);
    });
    game.events.on('warp:dropped', ({ reason, planet }) => {
      if (reason === 'arrival' && planet) {
        this.showBanner('Hyperdrive Drop', `Arriving at ${planet.descriptor.name}`, 2);
      }
    });
    game.events.on('onfoot:entered', (planet) => {
      this.showBanner('Disembarked', `Exploring ${planet.descriptor.name} on foot`, 2.5);
    });
    game.events.on('nature:full', () => {
      this.showBanner('Planet Full', 'this world has reached its 500-prop limit — X removes props', 2.5);
    });
    game.events.on('onfoot:left', () => {
      this.setPrompt('');
      this.showBanner('Aboard', 'Systems nominal', 1.8);
    });
  }

  _setText(key, value) {
    if (this._last[key] === value) return;
    this._last[key] = value;
    this.refs[key].textContent = value;
  }

  _setBar(key, fraction) {
    const q = Math.max(0, Math.min(1, fraction));
    const rounded = Math.round(q * 200) / 200; // quantize: fewer style writes
    if (this._last[key] === rounded) return;
    this._last[key] = rounded;
    this.refs[key].style.transform = `scaleX(${rounded})`;
  }

  _popHitmarker(killed) {
    const marker = this.refs.hitmarker;
    marker.classList.remove('pop');
    marker.classList.toggle('kill', !!killed);
    // Force restart of the CSS animation.
    void marker.offsetWidth;
    marker.classList.add('pop');
  }

  /** Show a large center-screen banner (discoveries, warnings). */
  showBanner(title, subtitle = '', seconds = 4) {
    this.refs.bannerTitle.textContent = title;
    this.refs.bannerSub.textContent = subtitle;
    this.refs.banner.classList.add('visible');
    this._bannerTimer = seconds;
  }

  /** Show/hide the blinking alert line (empty string hides). */
  setAlert(text) {
    if (this._last.alertText === text) return;
    this._last.alertText = text;
    this.refs.alert.textContent = text;
    this.refs.alert.classList.toggle('active', text.length > 0);
  }

  /** Show/hide the contextual interaction prompt (empty string hides). */
  setPrompt(text) {
    if (this._last.promptText === text) return;
    this._last.promptText = text;
    this.refs.prompt.textContent = text;
    this.refs.prompt.classList.toggle('visible', text.length > 0);
  }

  update(dt) {
    const player = this.game.player;
    if (!player) return;

    this._setText('speed', String(Math.round(player.speed)));
    this._setText('hullText', String(Math.ceil(player.hull)));
    this._setText('shieldText', String(Math.ceil(player.shield)));
    this._setText('resources', String(player.resources));
    this._setText('credits', this.game.creative ? '∞' : String(player.credits));
    // Cargo (mined rocks) — only shown while there's something to carry.
    const onfoot = this.game.mode === 'onfoot';
    const cargo = this.game.onfoot ? this.game.onfoot.carrying : 0;
    this._setText('cargo', cargo > 0 ? `▰ ${cargo} ore` : '');
    const wing = this.game.fleet?.escorts.length ?? 0;
    this._setText('fleet', wing > 0 ? `⬡ wing ${wing}` : '');
    this._setBar('hullBar', player.hull01);
    this._setBar('shieldBar', player.shield01);
    this._setBar('boostBar', player.boost01);

    const weapons = this.game.weapons;
    this._setBar('heatBar', weapons ? 1 - weapons.playerHeat01 : 1);

    // Location + altitude are supplied by the universe system when present.
    const uni = this.game.universe;
    const near = uni?.playerContext;
    if (onfoot && this.game.onfoot?.planet) {
      this._setText('place', this.game.onfoot.planet.descriptor.name);
      this._setText('placeSub', 'On Foot');
      this._setText('alt', '');
    } else if (near && near.planet) {
      this._setText('place', near.planet.descriptor.name);
      this._setText('placeSub', near.inAtmosphere ? 'Atmosphere' : 'Orbital Space');
      this._setText('alt', `ALT ${formatDistance(near.altitude)}`);
    } else {
      this._setText('place', 'Deep Space');
      this._setText('placeSub', '');
      this._setText('alt', '');
    }

    // Nearby hostile count.
    let contacts = 0;
    if (this.game.enemies) {
      for (const enemy of this.game.enemies.enemies) {
        if (enemy.position.distanceTo(player.position) < 3500) contacts++;
      }
    }
    this._setText('contacts', contacts > 0 ? `▲ ${contacts} hostile${contacts > 1 ? 's' : ''}` : '');

    // Alerts, most urgent first: missiles, terrain, hull, shields.
    let alert = '';
    const incoming = this.game.weapons?.incoming?.length || 0;
    if (this._missileWarn && incoming > 0 && player.alive) {
      alert = incoming > 1 ? `⚠ ${incoming} Missiles — press C` : '⚠ Missile Incoming — press C';
    }
    if (!alert && near && near.planet && player.alive && near.altitude < 380) {
      this._radial.copy(player.position).sub(near.planet.group.position).normalize();
      if (player.velocity.dot(this._radial) < -70) alert = 'Terrain — Pull Up';
    }
    if (!alert && player.alive && player.shield <= 0 && player.hull01 < 0.6) {
      alert = player.hull01 < 0.3 ? 'Hull Critical' : 'Shields Down';
    }
    this.setAlert(alert);

    // Hyperdrive readout (flight only).
    const warp = this.game.warp;
    if (!onfoot && warp && warp.target) {
      const name = warp.target.descriptor.name;
      if (warp.state === 'charging') {
        this._setText('warp', `⟢ HYPERDRIVE CHARGING ${Math.round(warp.charge01 * 100)}%`);
      } else if (warp.engaged) {
        this._setText('warp', `⟢ HYPERDRIVE ${(player.speed / 1000).toFixed(1)} km/s — steer with the nose · [J] drop`);
      } else {
        const d = Math.max(0, warp.targetDistance);
        this._setText('warp', `◎ ${name} · ${formatDistance(d)} · [J] hyperdrive · [B] next planet`);
      }
    } else {
      this._setText('warp', '');
    }

    // Banner lifetime.
    if (this._bannerTimer > 0) {
      this._bannerTimer -= dt;
      if (this._bannerTimer <= 0) this.refs.banner.classList.remove('visible');
    }

    // Damage vignette decay.
    if (this._vignette > 0.005) {
      this._vignette *= Math.exp(-2.4 * dt);
      this.refs.vignette.style.opacity = this._vignette.toFixed(3);
    } else if (this._last.vignetteZero !== true) {
      this.refs.vignette.style.opacity = '0';
    }
    this._last.vignetteZero = this._vignette <= 0.005;

    // Atmospheric-entry glow (driven by universe system via game.entryHeat).
    const heat = this.game.entryHeat || 0;
    if (Math.abs(heat - this._entryGlow) > 0.01) {
      this._entryGlow = heat;
      this.refs.entryGlow.style.opacity = heat.toFixed(3);
    }

    if (this.debugEnabled) {
      const q = this.game.quality;
      this.refs.debug.textContent =
        `fps ${q.fps.toFixed(0)}  scale ${q.scale.toFixed(2)}  ` +
        `draws ${this.game.engine.renderer.info.render.calls}  ` +
        `tris ${(this.game.engine.renderer.info.render.triangles / 1000).toFixed(0)}k`;
    }
  }
}

/** 1234 → "1.2 km", 320 → "320 m" */
function formatDistance(meters) {
  if (meters >= 10000) return `${(meters / 1000).toFixed(0)} km`;
  if (meters >= 1000) return `${(meters / 1000).toFixed(1)} km`;
  return `${Math.round(meters)} m`;
}
