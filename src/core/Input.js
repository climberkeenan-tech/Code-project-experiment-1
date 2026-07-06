/**
 * Unified input system.
 *
 * All control sources (keyboard, mouse, and the on-screen touch controls)
 * write into one normalized control-state object that gameplay systems read.
 * The flight model never knows *how* the player is steering.
 *
 * Control-state semantics (all axes in [-1, 1]):
 *   pitch    +1 = nose up
 *   yaw      +1 = nose right
 *   roll     +1 = roll right (clockwise from the pilot's seat)
 *   throttle +1 = full forward thrust, -1 = full reverse
 *   strafeX  +1 = thrust right
 *   strafeY  +1 = thrust up
 *   boost    afterburner engaged
 *   brake    flight-assist braking (bleeds velocity quickly)
 *   fire     trigger held
 */
export class Input {
  constructor() {
    this.state = {
      pitch: 0,
      yaw: 0,
      roll: 0,
      throttle: 0,
      strafeX: 0,
      strafeY: 0,
      boost: false,
      brake: false,
      fire: false,
    };

    /**
     * On-foot control state, populated only in 'foot' mode.
     *   moveX +1 = step right, moveZ +1 = step forward
     *   lookX +1 = turn right, lookY +1 = look down (rate, joystick-style)
     *   jump/sprint = held
     */
    this.walk = {
      moveX: 0,
      moveZ: 0,
      lookX: 0,
      lookY: 0,
      jump: false,
      sprint: false,
    };

    /** Active control context, mirrors game.mode: 'flight' | 'foot'. */
    this.mode = 'flight';

    /** Edge-triggered "interact / mine / board / disembark" press. */
    this.interactQueued = false;

    /** Keys currently held, by KeyboardEvent.code. */
    this.keys = new Set();

    /** Mouse steering vector, normalized to [-1, 1] from screen center. */
    this.mouse = { x: 0, y: 0, active: false, buttons: 0 };

    /**
     * Virtual axes written by the touch UI. When a virtual source is active
     * it takes priority over mouse steering for that axis group.
     */
    this.virtual = {
      steer: { x: 0, y: 0, active: false },
      throttle: { value: 0, active: false },
      roll: { value: 0, active: false },
      boost: false,
      fire: false,
      // On-foot virtual axes (written by TouchControls in foot mode).
      walk: { x: 0, y: 0, active: false },
      look: { x: 0, y: 0, active: false },
      jump: false,
    };

    /** True once any touch input has been seen (drives UI layout). */
    this.touchActive = false;

    /** Extra single-shot actions keyed by name, consumed by systems. */
    this.actionQueue = [];

    this._onKeyDown = this._onKeyDown.bind(this);
    this._onKeyUp = this._onKeyUp.bind(this);
    this._onPointerMove = this._onPointerMove.bind(this);
    this._onPointerDown = this._onPointerDown.bind(this);
    this._onPointerUp = this._onPointerUp.bind(this);
    this._onBlur = this._onBlur.bind(this);

    window.addEventListener('keydown', this._onKeyDown);
    window.addEventListener('keyup', this._onKeyUp);
    window.addEventListener('pointermove', this._onPointerMove);
    window.addEventListener('pointerdown', this._onPointerDown);
    window.addEventListener('pointerup', this._onPointerUp);
    window.addEventListener('blur', this._onBlur);
  }

  dispose() {
    window.removeEventListener('keydown', this._onKeyDown);
    window.removeEventListener('keyup', this._onKeyUp);
    window.removeEventListener('pointermove', this._onPointerMove);
    window.removeEventListener('pointerdown', this._onPointerDown);
    window.removeEventListener('pointerup', this._onPointerUp);
    window.removeEventListener('blur', this._onBlur);
  }

  _onKeyDown(e) {
    // Don't fight the browser for shortcuts like cmd/ctrl combos.
    if (e.metaKey || e.ctrlKey) return;
    this.keys.add(e.code);
    if (e.code === 'Space') e.preventDefault();
    // Context action (interact / mine / board / disembark) — edge-triggered,
    // ignore auto-repeat so a held key fires once.
    if (e.code === 'KeyE' && !e.repeat) this.interactQueued = true;
  }

  _onKeyUp(e) {
    this.keys.delete(e.code);
  }

  _onPointerMove(e) {
    if (e.pointerType === 'touch') return; // touch is handled by TouchControls
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const radius = Math.min(window.innerWidth, window.innerHeight) * 0.42;
    this.mouse.x = clampAxis((e.clientX - cx) / radius);
    this.mouse.y = clampAxis((e.clientY - cy) / radius);
    this.mouse.active = true;
  }

  _onPointerDown(e) {
    if (e.pointerType === 'touch') {
      this.touchActive = true;
      return;
    }
    this.mouse.buttons |= 1 << e.button;
  }

  _onPointerUp(e) {
    if (e.pointerType === 'touch') return;
    this.mouse.buttons &= ~(1 << e.button);
  }

  _onBlur() {
    // Losing focus mid-flight must never leave thrust or fire latched on.
    this.keys.clear();
    this.mouse.buttons = 0;
  }

  /** Queue a named one-shot action (used by UI buttons, e.g. 'respawn'). */
  pushAction(name) {
    this.actionQueue.push(name);
  }

  /** Consume the edge-triggered interact press (true once per press). */
  consumeInteract() {
    const v = this.interactQueued;
    this.interactQueued = false;
    return v;
  }

  /** Drain and return queued one-shot actions. */
  drainActions() {
    const actions = this.actionQueue;
    this.actionQueue = [];
    return actions;
  }

  /**
   * Recompute the merged control state. Called once per frame before any
   * gameplay system updates.
   */
  update() {
    const s = this.state;
    const k = this.keys;
    const v = this.virtual;

    if (this.mode === 'foot') {
      this._updateWalk();
      // Suppress flight outputs so a parked ship never twitches or fires.
      s.pitch = s.yaw = s.roll = s.throttle = s.strafeX = s.strafeY = 0;
      s.boost = s.brake = s.fire = false;
      return;
    }

    // --- Steering (pitch / yaw) ---
    let pitch = 0;
    let yaw = 0;
    if (v.steer.active) {
      yaw = v.steer.x;
      pitch = -v.steer.y; // stick up (negative y) = nose up
    } else if (this.mouse.active) {
      yaw = applyResponse(this.mouse.x);
      pitch = -applyResponse(this.mouse.y);
    }
    // Keyboard steering overrides/adds for players who prefer keys.
    if (k.has('ArrowUp')) pitch = 1;
    if (k.has('ArrowDown')) pitch = -1;
    if (k.has('ArrowLeft')) yaw = -1;
    if (k.has('ArrowRight')) yaw = 1;
    s.pitch = clampAxis(pitch);
    s.yaw = clampAxis(yaw);

    // --- Roll ---
    let roll = 0;
    if (v.roll.active) roll = v.roll.value;
    if (k.has('KeyA')) roll -= 1;
    if (k.has('KeyD')) roll += 1;
    s.roll = clampAxis(roll);

    // --- Throttle ---
    let throttle = 0;
    if (v.throttle.active) throttle = v.throttle.value;
    if (k.has('KeyW')) throttle = 1;
    if (k.has('KeyS')) throttle = -1;
    s.throttle = clampAxis(throttle);

    // --- Strafe ---
    let strafeX = 0;
    let strafeY = 0;
    if (k.has('KeyQ')) strafeX -= 1;
    if (k.has('KeyE')) strafeX += 1;
    if (k.has('KeyR')) strafeY += 1;
    if (k.has('KeyF')) strafeY -= 1;
    s.strafeX = clampAxis(strafeX);
    s.strafeY = clampAxis(strafeY);

    // --- Buttons ---
    s.boost = v.boost || k.has('ShiftLeft') || k.has('ShiftRight');
    s.brake = k.has('KeyX');
    s.fire = v.fire || k.has('Space') || (this.mouse.buttons & 1) !== 0;
  }

  /** Merge the on-foot control state from keyboard, mouse and touch. */
  _updateWalk() {
    const w = this.walk;
    const k = this.keys;
    const v = this.virtual;

    // --- Movement (WASD / left touch stick) ---
    let mx = 0;
    let mz = 0;
    if (v.walk.active) {
      mx = v.walk.x;
      mz = -v.walk.y; // stick up (negative y) = forward
    }
    if (k.has('KeyW')) mz = 1;
    if (k.has('KeyS')) mz = -1;
    if (k.has('KeyA')) mx = -1;
    if (k.has('KeyD')) mx = 1;
    w.moveX = clampAxis(mx);
    w.moveZ = clampAxis(mz);

    // --- Look (mouse-as-rate / right touch stick / arrow keys) ---
    let lx = 0;
    let ly = 0;
    if (v.look.active) {
      lx = v.look.x;
      ly = v.look.y;
    } else if (this.mouse.active) {
      lx = applyResponse(this.mouse.x);
      ly = applyResponse(this.mouse.y);
    }
    if (k.has('ArrowLeft')) lx = -1;
    if (k.has('ArrowRight')) lx = 1;
    if (k.has('ArrowUp')) ly = -1;
    if (k.has('ArrowDown')) ly = 1;
    w.lookX = clampAxis(lx);
    w.lookY = clampAxis(ly);

    w.jump = v.jump || k.has('Space');
    w.sprint = k.has('ShiftLeft') || k.has('ShiftRight');
  }
}

/** Clamp an axis value into [-1, 1]. */
function clampAxis(x) {
  return x < -1 ? -1 : x > 1 ? 1 : x;
}

/**
 * Dead-zone + soft quadratic response for mouse steering so the ship flies
 * straight when the cursor rests near the center of the screen.
 */
function applyResponse(x) {
  const dead = 0.06;
  const a = Math.abs(x);
  if (a < dead) return 0;
  const t = Math.min(1, (a - dead) / (1 - dead));
  return Math.sign(x) * t * t * (3 - 2 * t); // smooth ramp to full deflection
}
