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
        <div class="resources">&#9671; <span data-el="resources">0</span></div>
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

    this.debugEnabled = new URLSearchParams(location.search).has('debug');
    if (!this.debugEnabled) this.refs.debug.style.display = 'none';

    game.events.on('player:hit', () => { this._vignette = Math.min(1, this._vignette + 0.55); });
    game.events.on('combat:hit-confirmed', (info) => this._popHitmarker(info?.killed));
    game.events.on('poi:discovered', (poi) => this.showBanner(poi.title, poi.subtitle));
    game.events.on('poi:signal', () => {
      this.showBanner('Unknown Signal Detected', 'investigate nearby coordinates', 3.5);
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

  update(dt) {
    const player = this.game.player;
    if (!player) return;

    this._setText('speed', String(Math.round(player.speed)));
    this._setText('hullText', String(Math.ceil(player.hull)));
    this._setText('shieldText', String(Math.ceil(player.shield)));
    this._setText('resources', String(player.resources));
    this._setBar('hullBar', player.hull01);
    this._setBar('shieldBar', player.shield01);
    this._setBar('boostBar', player.boost01);

    const weapons = this.game.weapons;
    this._setBar('heatBar', weapons ? 1 - weapons.playerHeat01 : 1);

    // Location + altitude are supplied by the universe system when present.
    const uni = this.game.universe;
    const near = uni?.playerContext;
    if (near && near.planet) {
      this._setText('place', near.planet.descriptor.name);
      this._setText('placeSub', near.inAtmosphere ? 'Atmosphere' : 'Orbital Space');
      this._setText('alt', `ALT ${formatDistance(near.altitude)}`);
    } else {
      this._setText('place', 'Deep Space');
      this._setText('placeSub', '');
      this._setText('alt', '');
    }

    // Shield-down alert.
    if (player.alive && player.shield <= 0 && player.hull01 < 0.6) {
      this.setAlert(player.hull01 < 0.3 ? 'Hull Critical' : 'Shields Down');
    } else {
      this.setAlert('');
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
