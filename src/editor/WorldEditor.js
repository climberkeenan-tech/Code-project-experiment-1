import * as THREE from 'three';
import { PROPS, MAX_PER_PLANET } from '../world/NatureEditor.js';

/**
 * The WORLD EDITOR — a standalone design tool, launched from its own start
 * screen button (playtest: "the planetary editor is for me so I can use it,
 * it shouldn't be an in-game experience. I want to use it like Unreal
 * Engine").
 *
 * It works like a game-engine viewport:
 *  - free-flying editor camera: RIGHT-DRAG to look, WASD to fly, E/Q up and
 *    down, SHIFT for speed, mouse WHEEL adjusts fly speed
 *  - a green ground cursor follows the mouse across the terrain
 *  - LEFT-CLICK plants the selected prop at the cursor, X deletes the
 *    nearest prop to the cursor, 1-8 pick from the palette
 *  - [ and ] hop between planets (arriving on the day side)
 *
 * No enemies, no allies, no combat — every spawner checks game.editorMode.
 * The player ship rides along invisibly under the camera so terrain LOD,
 * origin rebasing and every streaming system keep working untouched.
 * Everything placed saves to the shared nature store and appears in the
 * real game when you land there.
 */

const CURSOR_MAX = 6000; // how far the ground cursor reaches

export class WorldEditor {
  /** @param {import('../core/Game.js').Game} game */
  constructor(game) {
    this.game = game;
    game.worldEditor = this;

    this.active = false;
    this.selected = 0;
    this.planetIndex = 0;
    /** @type {import('../world/Planet.js').Planet|null} */
    this.planet = null;
    this.flySpeed = 120; // u/s, wheel-adjustable

    this._pos = new THREE.Vector3();
    this._quat = new THREE.Quaternion();
    this._move = new THREE.Vector3();
    this._axis = new THREE.Vector3();
    this._ray = new THREE.Vector3();
    this._point = new THREE.Vector3();
    this._up = new THREE.Vector3();
    this._q = new THREE.Quaternion();
    this._ndc = new THREE.Vector3();
    this._mouse = { x: 0, y: 0 };
    this._looking = false;
    this._cursorValid = false;
    this._cursorPoint = new THREE.Vector3();

    game.origin.onShift((delta) => this._pos.sub(delta));
    game.events.on('editor:enter', () => this._enter());

    this._buildBar();
    this._bindInput();
  }

  // ------------------------------------------------------------------
  // Lifecycle
  // ------------------------------------------------------------------

  _enter() {
    const game = this.game;
    this.active = true;
    game.editorMode = true;
    game.mode = 'editor';
    game.input.mode = 'foot'; // zeroes every flight control: no thrust, no fire
    game.player.object3D.visible = false;
    document.body.classList.add('editor-mode');

    // The editor camera is the streaming anchor: LOD + origin follow it.
    game.rebaseAnchor = this._pos;

    // Hide the combat HUD — this is a design tool, not a cockpit.
    const hud = game.systems.find((s) => s.name === 'hud')?.system;
    if (hud?.el) hud.el.style.display = 'none';

    // Ground cursor ring.
    this.cursor = new THREE.Mesh(
      new THREE.RingGeometry(1.6, 2.2, 24),
      new THREE.MeshBasicMaterial({
        color: 0x7dffa8, side: THREE.DoubleSide, transparent: true, opacity: 0.9,
        depthTest: false,
      }),
    );
    this.cursor.renderOrder = 30;
    this.cursor.visible = false;
    game.engine.scene.add(this.cursor);

    this.bar.classList.add('visible');
    this._gotoPlanet(0);
  }

  _gotoPlanet(index) {
    const planets = this.game.universe.planets;
    this.planetIndex = ((index % planets.length) + planets.length) % planets.length;
    this.planet = planets[this.planetIndex];
    const planet = this.planet;

    // Arrive over the DAY side, 300 m up, looking along the horizon.
    const dir = planet.sunDir.clone().normalize();
    this._pos.copy(planet.group.position).addScaledVector(dir, planet.radius + 600);
    const alt = planet.getAltitude(this._pos);
    this._pos.addScaledVector(dir, -(alt - 300));

    // Face tangentially with a slight downward tilt.
    const east = new THREE.Vector3(0, 1, 0).cross(dir);
    if (east.lengthSq() < 1e-4) east.set(1, 0, 0);
    east.normalize();
    const m = new THREE.Matrix4().lookAt(
      this._pos,
      this._pos.clone().addScaledVector(east, 100).addScaledVector(dir, -35),
      dir,
    );
    this._quat.setFromRotationMatrix(m);

    this._refreshLabels();
    this.game.natureEditor?._ensureBuilt(planet);
  }

  _refreshLabels() {
    if (!this.planet) return;
    this._planetEl.textContent = this.planet.descriptor.name;
    const list = this.game.natureEditor?.placed.get(this.planet.descriptor.name) ?? [];
    this._countEl.textContent = `${list.length}/${MAX_PER_PLANET} props`;
  }

  // ------------------------------------------------------------------
  // Per-frame: camera + ghost ship + ground cursor
  // ------------------------------------------------------------------

  update(dt) {
    if (!this.active) return;
    const game = this.game;
    const cam = game.engine.camera;
    const keys = game.input.keys;

    // Fly: WASD on the camera frame, E/Q along the planet radial.
    const speed = this.flySpeed * (keys.has('ShiftLeft') || keys.has('ShiftRight') ? 5 : 1);
    this._move.set(
      (keys.has('KeyD') ? 1 : 0) - (keys.has('KeyA') ? 1 : 0),
      0,
      (keys.has('KeyS') ? 1 : 0) - (keys.has('KeyW') ? 1 : 0),
    );
    if (this._move.lengthSq() > 0) {
      this._move.normalize().applyQuaternion(this._quat);
      this._pos.addScaledVector(this._move, speed * dt);
    }
    const lift = (keys.has('KeyE') ? 1 : 0) - (keys.has('KeyQ') ? 1 : 0);
    if (lift !== 0 && this.planet) {
      this._up.copy(this._pos).sub(this.planet.group.position).normalize();
      this._pos.addScaledVector(this._up, lift * speed * dt);
    }

    // Never sink below the terrain.
    if (this.planet) {
      const alt = this.planet.getAltitude(this._pos);
      if (alt < 3) {
        this._up.copy(this._pos).sub(this.planet.group.position).normalize();
        this._pos.addScaledVector(this._up, 3 - alt);
      }
    }

    // The editor OWNS the camera (registered after ChaseCamera, so this wins).
    cam.position.copy(this._pos);
    cam.quaternion.copy(this._quat);

    // Ghost ship rides along: streaming/LOD anchor, kept safe and inert.
    const player = game.player;
    player.position.copy(this._pos);
    player.velocity.set(0, 0, 0);
    player.hull = player.hullMax;
    player.shield = player.shieldMax;
    player.alive = true;

    this._updateCursor();
  }

  _updateCursor() {
    if (!this.planet || !this.cursor) return;
    const cam = this.game.engine.camera;
    this._ndc.set(
      (this._mouse.x / window.innerWidth) * 2 - 1,
      -(this._mouse.y / window.innerHeight) * 2 + 1,
      0.5,
    );
    this._ray.copy(this._ndc.unproject(cam)).sub(cam.position).normalize();

    this._cursorValid = false;
    let step = 1;
    for (let t = 2; t < CURSOR_MAX; t += step) {
      this._point.copy(cam.position).addScaledVector(this._ray, t);
      const alt = this.planet.getAltitude(this._point);
      if (alt <= 0) {
        this._up.copy(this._point).sub(this.planet.group.position).normalize();
        this._point.addScaledVector(this._up, -alt);
        this._cursorPoint.copy(this._point);
        this._cursorValid = true;
        break;
      }
      // Adaptive march: far from the ground, stride by the altitude.
      step = Math.max(0.75, Math.min(alt * 0.5, 60));
    }

    this.cursor.visible = this._cursorValid;
    if (this._cursorValid) {
      this.cursor.position.copy(this._cursorPoint).addScaledVector(this._up, 0.4);
      this._q.setFromUnitVectors(FORWARD_Z, this._up);
      this.cursor.quaternion.copy(this._q);
    }
  }

  // ------------------------------------------------------------------
  // Input
  // ------------------------------------------------------------------

  _bindInput() {
    window.addEventListener('mousemove', (e) => {
      this._mouse.x = e.clientX;
      this._mouse.y = e.clientY;
      if (this.active && this._looking) {
        // Unreal-style right-drag look: yaw around the planet radial,
        // pitch around the camera's right axis.
        const yaw = -e.movementX * 0.0032;
        const pitch = -e.movementY * 0.0032;
        if (this.planet) {
          this._up.copy(this._pos).sub(this.planet.group.position).normalize();
        } else {
          this._up.set(0, 1, 0);
        }
        this._q.setFromAxisAngle(this._up, yaw);
        this._quat.premultiply(this._q);
        this._axis.set(1, 0, 0).applyQuaternion(this._quat);
        this._q.setFromAxisAngle(this._axis, pitch);
        this._quat.premultiply(this._q).normalize();
      }
    });
    window.addEventListener('mousedown', (e) => {
      if (!this.active) return;
      if (e.button === 2) { this._looking = true; return; }
      if (e.button !== 0) return;
      if (e.target && e.target.closest?.('.nature-bar')) return; // UI click
      if (this._cursorValid && this.planet) {
        this.game.natureEditor?.placeProp(this.planet, this._cursorPoint, this.selected);
        this._refreshLabels();
      }
    });
    window.addEventListener('mouseup', (e) => {
      if (e.button === 2) this._looking = false;
    });
    window.addEventListener('contextmenu', (e) => {
      if (this.active) e.preventDefault();
    });
    window.addEventListener('wheel', (e) => {
      if (!this.active) return;
      this.flySpeed = Math.min(2400, Math.max(20, this.flySpeed * (e.deltaY > 0 ? 0.85 : 1.18)));
      this._speedEl.textContent = `${Math.round(this.flySpeed)} u/s`;
    });
    window.addEventListener('keydown', (e) => {
      if (!this.active || e.repeat) return;
      if (e.code.startsWith('Digit')) {
        const n = Number(e.code.slice(5)) - 1;
        if (n >= 0 && n < PROPS.length) this._select(n);
      }
      if (e.code === 'KeyX' && this._cursorValid && this.planet) {
        if (this.game.natureEditor?.removeNearest(this.planet, this._cursorPoint)) {
          this._refreshLabels();
        }
      }
      if (e.code === 'BracketRight') this._gotoPlanet(this.planetIndex + 1);
      if (e.code === 'BracketLeft') this._gotoPlanet(this.planetIndex - 1);
    });
  }

  // ------------------------------------------------------------------
  // UI
  // ------------------------------------------------------------------

  _buildBar() {
    const bar = document.createElement('div');
    bar.className = 'nature-bar';
    bar.innerHTML = `
      <div class="nb-title">WORLD EDITOR</div>
      <div class="we-row">
        <button class="we-btn" data-el="prev">◀</button>
        <span class="we-planet" data-el="planet">—</span>
        <button class="we-btn" data-el="next">▶</button>
        <span class="we-meta" data-el="count"></span>
        <span class="we-meta" data-el="speed">120 u/s</span>
        <button class="we-btn we-exit" data-el="exit">EXIT</button>
      </div>
      <div class="nb-row">${PROPS.map((p, i) => `
        <button class="nb-item" data-i="${i}"><span class="nb-icon">${p.icon}</span>${i + 1}·${p.name}</button>`).join('')}
      </div>
      <div class="nb-hint">RIGHT-DRAG look · WASD fly · E/Q up/down · SHIFT fast · WHEEL speed ·
        CLICK plant · <b>X</b> delete · <b>[ ]</b> planet</div>
    `;
    document.body.appendChild(bar);
    this.bar = bar;
    this._planetEl = bar.querySelector('[data-el="planet"]');
    this._countEl = bar.querySelector('[data-el="count"]');
    this._speedEl = bar.querySelector('[data-el="speed"]');
    for (const btn of bar.querySelectorAll('.nb-item')) {
      btn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this._select(Number(btn.dataset.i));
      });
    }
    bar.querySelector('[data-el="prev"]').addEventListener('pointerdown', () => this._gotoPlanet(this.planetIndex - 1));
    bar.querySelector('[data-el="next"]').addEventListener('pointerdown', () => this._gotoPlanet(this.planetIndex + 1));
    bar.querySelector('[data-el="exit"]').addEventListener('pointerdown', () => location.reload());
    this._select(0);
  }

  _select(i) {
    this.selected = i;
    for (const btn of this.bar.querySelectorAll('.nb-item')) {
      btn.classList.toggle('active', Number(btn.dataset.i) === i);
    }
  }
}

const FORWARD_Z = new THREE.Vector3(0, 0, 1); // RingGeometry faces +Z
