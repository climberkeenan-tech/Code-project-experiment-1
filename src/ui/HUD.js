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
    game.events.on('fleet:launched', (n) => this.showBanner('Fleet Launched', `${n} ships deployed — G recalls`, 2.5));
    game.events.on('fleet:recalled', () => this.showBanner('Fleet Docked', 'wing stored and repaired', 1.8));
    game.events.on('fleet:ship-lost', (id) => this.showBanner('Wingman Down', `${id} destroyed — removed from your fleet`, 3));
    game.events.on('fleet:denied', () => this.showBanner('No Hangar', 'a carrier-class ship is required to launch a fleet', 2.4));
    game.events.on('fleet:empty', () => this.showBanner('Hangar Empty', 'buy more ships to fill the hangar', 2.4));
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
    this._setText('credits', String(player.credits));
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
