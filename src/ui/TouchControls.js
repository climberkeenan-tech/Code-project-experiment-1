/**
 * Touch flight controls.
 *
 * Two dynamic virtual sticks plus FIRE/BOOST buttons:
 *  - Left half of the screen: steering stick (pitch/yaw). The stick spawns
 *    where the thumb lands — no reaching for a fixed widget.
 *  - Right half: thrust stick (vertical = throttle, horizontal = roll).
 *  - Both sticks spring back to neutral on release.
 *
 * The layer stays hidden until the first touch, so desktop players never
 * see phantom buttons.
 */
export class TouchControls {
  /** @param {import('../core/Game.js').Game} game */
  constructor(game) {
    this.game = game;
    this.input = game.input;

    const root = document.getElementById('ui-root');
    this.layer = document.createElement('div');
    this.layer.className = 'touch-layer';
    this.layer.innerHTML = `
      <div class="touch-zone left" data-zone="steer"></div>
      <div class="touch-zone right" data-zone="thrust"></div>
      <div class="touch-stick" data-stick="steer"><div class="knob"></div></div>
      <div class="touch-stick" data-stick="thrust"><div class="knob"></div></div>
      <button class="touch-btn fire" data-btn="fire">Fire</button>
      <button class="touch-btn boost" data-btn="boost">Boost</button>
      <button class="touch-btn interact" data-btn="interact">Use</button>
      <button class="touch-btn jump" data-btn="jump">Jump</button>
    `;
    root.appendChild(this.layer);

    // Switch the touch layer between flight and on-foot button sets.
    game.events.on('onfoot:entered', () => this.layer.classList.add('foot'));
    game.events.on('onfoot:left', () => this.layer.classList.remove('foot'));

    this.sticks = {
      steer: {
        zone: this.layer.querySelector('[data-zone="steer"]'),
        el: this.layer.querySelector('[data-stick="steer"]'),
        knob: this.layer.querySelector('[data-stick="steer"] .knob'),
        pointerId: null,
        cx: 0,
        cy: 0,
      },
      thrust: {
        zone: this.layer.querySelector('[data-zone="thrust"]'),
        el: this.layer.querySelector('[data-stick="thrust"]'),
        knob: this.layer.querySelector('[data-stick="thrust"] .knob'),
        pointerId: null,
        cx: 0,
        cy: 0,
      },
    };

    this.stickRadius = 46; // px of knob travel

    // Reveal touch UI on first touch anywhere.
    window.addEventListener(
      'pointerdown',
      (e) => {
        if (e.pointerType === 'touch') this.layer.classList.add('enabled');
      },
      { once: false },
    );

    for (const name of ['steer', 'thrust']) {
      const stick = this.sticks[name];
      stick.zone.addEventListener('pointerdown', (e) => this._stickDown(name, e));
      stick.zone.addEventListener('pointermove', (e) => this._stickMove(name, e));
      stick.zone.addEventListener('pointerup', (e) => this._stickUp(name, e));
      stick.zone.addEventListener('pointercancel', (e) => this._stickUp(name, e));
    }

    // Held buttons (flight: fire/boost; foot: jump) toggle a virtual flag.
    for (const btnName of ['fire', 'boost', 'jump']) {
      const btn = this.layer.querySelector(`[data-btn="${btnName}"]`);
      const set = (value) => {
        this.input.virtual[btnName] = value;
        btn.classList.toggle('held', value);
      };
      btn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        btn.setPointerCapture(e.pointerId);
        set(true);
      });
      btn.addEventListener('pointerup', () => set(false));
      btn.addEventListener('pointercancel', () => set(false));
      btn.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    // Interact is edge-triggered (mine / board / disembark).
    const interactBtn = this.layer.querySelector('[data-btn="interact"]');
    interactBtn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      this.input.interactQueued = true;
      interactBtn.classList.add('held');
    });
    const releaseInteract = () => interactBtn.classList.remove('held');
    interactBtn.addEventListener('pointerup', releaseInteract);
    interactBtn.addEventListener('pointercancel', releaseInteract);
    interactBtn.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  _stickDown(name, e) {
    if (e.pointerType !== 'touch') return;
    const stick = this.sticks[name];
    if (stick.pointerId !== null) return;
    stick.pointerId = e.pointerId;
    stick.zone.setPointerCapture(e.pointerId);
    stick.cx = e.clientX;
    stick.cy = e.clientY;
    stick.el.style.left = `${e.clientX - 55}px`;
    stick.el.style.top = `${e.clientY - 55}px`;
    stick.el.classList.add('visible');
    this._applyStick(name, 0, 0);
  }

  _stickMove(name, e) {
    const stick = this.sticks[name];
    if (stick.pointerId !== e.pointerId) return;
    let dx = (e.clientX - stick.cx) / this.stickRadius;
    let dy = (e.clientY - stick.cy) / this.stickRadius;
    const len = Math.hypot(dx, dy);
    if (len > 1) {
      dx /= len;
      dy /= len;
    }
    this._applyStick(name, dx, dy);
    stick.knob.style.transform =
      `translate(${dx * this.stickRadius}px, ${dy * this.stickRadius}px)`;
  }

  _stickUp(name, e) {
    const stick = this.sticks[name];
    if (stick.pointerId !== e.pointerId) return;
    stick.pointerId = null;
    stick.el.classList.remove('visible');
    stick.knob.style.transform = 'translate(0, 0)';
    this._releaseStick(name);
  }

  _applyStick(name, x, y) {
    const v = this.input.virtual;
    const foot = this.game.mode === 'onfoot';
    if (name === 'steer') {
      if (foot) {
        // Left stick = walk (x strafe, y forward/back).
        v.walk.x = x;
        v.walk.y = y;
        v.walk.active = true;
      } else {
        v.steer.x = x;
        v.steer.y = y;
        v.steer.active = true;
      }
    } else if (foot) {
      // Right stick = look (yaw/pitch).
      v.look.x = x;
      v.look.y = y;
      v.look.active = true;
    } else {
      v.throttle.value = -y; // drag up = thrust forward
      v.throttle.active = true;
      v.roll.value = x;
      v.roll.active = true;
    }
  }

  _releaseStick(name) {
    const v = this.input.virtual;
    if (name === 'steer') {
      v.steer.x = 0;
      v.steer.y = 0;
      v.steer.active = false;
      v.walk.x = 0;
      v.walk.y = 0;
      v.walk.active = false;
    } else {
      v.throttle.value = 0;
      v.throttle.active = false;
      v.roll.value = 0;
      v.roll.active = false;
      v.look.x = 0;
      v.look.y = 0;
      v.look.active = false;
    }
  }
}
