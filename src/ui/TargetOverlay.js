import * as THREE from 'three';

/**
 * Combat target overlay: red brackets around on-screen hostiles (with class,
 * level and a health pip), BLUE brackets around friendlies (wing craft +
 * ambient allied traffic), edge arrows toward off-screen hostiles, and orange
 * markers for incoming missiles. Solves the playtest problems "I couldn't
 * find enemies" and "I didn't know a missile was coming."
 *
 * A single full-screen 2D canvas drawn each frame from the shared perspective
 * camera — cheap, crisp, and consistent with the DOM/canvas HUD. Nothing is
 * drawn while paused, dead, or on foot.
 */

const MAX_RANGE = 12000;
// Friendly brackets fade out beyond this — allies are ambience, not targets.
const FRIENDLY_RANGE = 6000;
// The apex hunter stays invisible to the overlay until it could actually
// hit you (fire range 1600 + margin) — before that it exists only as the
// planet-like arc on the radar, so avoiding it is a real choice.
const APEX_REVEAL = 2600;

export class TargetOverlay {
  /** @param {import('../core/Game.js').Game} game */
  constructor(game) {
    this.game = game;
    const root = document.getElementById('ui-root');
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'hud-targets';
    root.insertBefore(this.canvas, root.firstChild); // under the text HUD
    this.ctx = this.canvas.getContext('2d');

    this._resize = this._resize.bind(this);
    window.addEventListener('resize', this._resize);
    this._resize();

    // N toggles the navigation markers (planet name + destination circle) —
    // per playtest they can get in the way when you just want to fly.
    window.addEventListener('keydown', (e) => {
      if (e.code !== 'KeyN' || e.repeat || e.ctrlKey || e.metaKey) return;
      game.navHidden = !game.navHidden;
      game.events.emit('nav:toggled', game.navHidden);
    });

    this._v = new THREE.Vector3();
    this._fwd = new THREE.Vector3();
    this._toObj = new THREE.Vector3();
  }

  _resize() {
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.canvas.width = this.w;
    this.canvas.height = this.h;
  }

  update(dt, elapsed) {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.w, this.h);

    const game = this.game;
    const player = game.player;
    if (game.paused || !player || !player.alive) return;

    // On foot: the overlay's jobs are "where did I park?" and "where did my
    // ore sink?" — markers plus edge arrows so explorers never get lost.
    if (game.mode === 'onfoot') {
      const cam = game.engine.camera;
      const p = this._screen(player.position, cam);
      const style = 'rgba(134,231,255,0.9)';
      if (p.onScreen) {
        ctx.strokeStyle = style;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 10 + 2 * Math.sin(elapsed * 3), 0, Math.PI * 2);
        ctx.stroke();
        const dist = player.position.distanceTo(cam.position);
        this._label(ctx, p.x, p.y - 18, `YOUR SHIP · ${Math.round(dist)} m`, style, 0);
      } else {
        this._drawArrow(ctx, p.x, p.y, style);
        this._label(ctx, this.w / 2, 34, '⬥ ship is off-screen — follow the arrow', style, 0);
      }

      // Dropped ore (drowning): amber marker where the bag floats.
      const bag = game.onfoot?.oreBag;
      if (bag && bag.planet === game.onfoot.planet) {
        this._toObj.copy(bag.local).add(bag.planet.group.position);
        const pb = this._screen(this._toObj, cam);
        const amber = 'rgba(255,205,90,0.95)';
        if (pb.onScreen) {
          ctx.strokeStyle = amber;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.arc(pb.x, pb.y, 9 + 2.5 * Math.sin(elapsed * 4), 0, Math.PI * 2);
          ctx.stroke();
          const d = this._toObj.distanceTo(cam.position);
          this._label(ctx, pb.x, pb.y - 16, `YOUR ORE · ${Math.round(d)} m`, amber, 0);
        } else {
          this._drawArrow(ctx, pb.x, pb.y, amber);
        }
      }
      return;
    }
    if (game.mode !== 'flight') return;

    const cam = game.engine.camera;
    cam.getWorldDirection(this._fwd);
    const focal = (this.h / 2) / Math.tan((cam.fov * Math.PI / 180) / 2);

    // --- Hostiles ---
    const assist = game.weapons?.assistTarget ?? null;
    for (const enemy of game.enemies?.enemies ?? []) {
      if (enemy.hitFlash > 0) enemy.hitFlash -= dt;
      const dist = enemy.position.distanceTo(cam.position);
      if (dist > MAX_RANGE) continue;
      if (enemy.stats?.apex && dist > APEX_REVEAL) continue;
      const p = this._screen(enemy.position, cam);
      if (p.onScreen) {
        this._drawBox(ctx, p.x, p.y, enemy, dist, focal, elapsed, enemy === assist);
      } else {
        this._drawArrow(ctx, p.x, p.y, 'rgba(255,90,105,0.9)');
      }
    }

    // --- Friendlies: blue brackets so your side reads at a glance ---
    // Deployed wing craft + ambient allied traffic. No off-screen arrows
    // (arrows are reserved for threats/objectives) and no health bars —
    // just a calm blue box + name.
    for (const friend of this._friendlies()) {
      const dist = friend.position.distanceTo(cam.position);
      if (dist > FRIENDLY_RANGE) continue;
      const p = this._screen(friend.position, cam);
      if (!p.onScreen) continue;
      this._drawFriendlyBox(ctx, p.x, p.y, friend, dist, focal);
    }

    // --- Aim reticle: follows the cursor so "shoot where I point" is visible ---
    const mouse = game.input.mouse;
    if (mouse.active && !game.input.touchActive) {
      const style = assist ? 'rgba(255,120,130,0.95)' : 'rgba(134,231,255,0.85)';
      ctx.strokeStyle = style;
      ctx.fillStyle = style;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(mouse.px, mouse.py, assist ? 11 : 8, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(mouse.px, mouse.py, 1.6, 0, Math.PI * 2);
      ctx.fill();
    }

    // --- Incoming missiles ---
    for (const m of game.weapons?.incoming ?? []) {
      const p = this._screen(m.mesh.position, cam);
      if (p.onScreen) {
        this._drawMissileMark(ctx, p.x, p.y, elapsed);
      } else {
        this._drawArrow(ctx, p.x, p.y, 'rgba(255,170,60,0.95)');
      }
    }

    // --- The enemy HUB: always-on red fortress marker (N hides it) ---
    // Players could never FIND the Leviathan without this — it sits ~590 km
    // out with nothing pointing at it. Within bracket range the normal
    // hostile target box takes over.
    const hub = game.leviathan?.hub;
    if (hub?.alive && !game.navHidden) {
      const hubDist = hub.position.distanceTo(cam.position);
      if (hubDist > APEX_REVEAL) {
        const p = this._screen(hub.position, cam);
        const style = 'rgba(255,86,100,0.95)';
        const label = `☠ LEVIATHAN ${hubDist > 2000 ? Math.round(hubDist / 1000) + ' km' : Math.round(hubDist) + ' m'}`;
        if (!p.onScreen) {
          this._drawArrow(ctx, p.x, p.y, style);
          this._label(ctx, p.x, p.y, label, style, 16);
        } else {
          ctx.strokeStyle = style;
          ctx.lineWidth = 1.4;
          const r = 10 + 2 * Math.sin(elapsed * 3);
          ctx.beginPath(); // diamond, so it never reads as the cyan warp ring
          ctx.moveTo(p.x, p.y - r);
          ctx.lineTo(p.x + r, p.y);
          ctx.lineTo(p.x, p.y + r);
          ctx.lineTo(p.x - r, p.y);
          ctx.closePath();
          ctx.stroke();
          this._label(ctx, p.x, p.y - 20, label, style, 0);
        }
      }
    }

    // --- Warp destination marker (navigation aid; N hides it) ---
    const warp = game.warp;
    if (warp && warp.target && !game.navHidden) {
      const p = this._screen(warp.target.group.position, cam);
      const style = 'rgba(134,231,255,0.95)';
      if (!p.onScreen) {
        this._drawArrow(ctx, p.x, p.y, style);
        this._label(ctx, p.x, p.y, warp.target.descriptor.name, style, 16);
      } else {
        ctx.strokeStyle = style;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 12 + 2 * Math.sin(elapsed * 3), 0, Math.PI * 2);
        ctx.stroke();
        this._label(ctx, p.x, p.y - 20, warp.target.descriptor.name, style, 0);
      }
    }
  }

  /** Every allied ship that should get a blue bracket. */
  * _friendlies() {
    for (const esc of this.game.fleet?.escorts ?? []) {
      if (esc.alive) yield esc;
    }
    for (const ship of this.game.traffic?.ships ?? []) yield ship;
  }

  _drawFriendlyBox(ctx, sx, sy, ship, dist, focal) {
    const pixR = Math.max(10, Math.min(160, (ship.radius / dist) * focal * 1.7));
    ctx.strokeStyle = 'rgba(96,170,255,0.85)';
    ctx.lineWidth = 1.4;

    // Corner brackets (same shape as hostiles, calm blue).
    const c = pixR * 0.4;
    for (const [dx, dy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
      const cx = sx + dx * pixR;
      const cy = sy + dy * pixR;
      ctx.beginPath();
      ctx.moveTo(cx, cy - dy * c);
      ctx.lineTo(cx, cy);
      ctx.lineTo(cx - dx * c, cy);
      ctx.stroke();
    }

    // Name only when reasonably close, to keep the sky uncluttered.
    if (dist < 3200) {
      const label = ship.isEscort
        ? (ship.role === 'scout' ? 'SCOUT' : 'GUARD')
        : (ship.callsign ?? 'ALLY').toUpperCase();
      ctx.font = '10px ui-monospace, monospace';
      ctx.fillStyle = 'rgba(140,195,255,0.9)';
      ctx.textAlign = 'center';
      ctx.fillText(label, sx, sy - pixR - 6);
    }
  }

  _label(ctx, x, y, text, style, dy) {
    ctx.font = '11px ui-monospace, monospace';
    ctx.fillStyle = style;
    ctx.textAlign = 'center';
    ctx.fillText(text, x, y + dy);
  }

  /** Project a world point to screen; returns {x,y,onScreen}. */
  _screen(worldPos, cam) {
    this._v.copy(worldPos).project(cam);
    let x = this._v.x;
    let y = this._v.y;
    const behind = this._v.z > 1;
    if (behind) { x = -x; y = -y; }
    const onScreen = !behind && x >= -1 && x <= 1 && y >= -1 && y <= 1;
    if (onScreen) {
      return { onScreen: true, x: (x * 0.5 + 0.5) * this.w, y: (-y * 0.5 + 0.5) * this.h };
    }
    // Clamp to a margin box for the edge arrow.
    const m = 0.92;
    const len = Math.max(Math.abs(x), Math.abs(y), 1e-3);
    x = (x / len) * m;
    y = (y / len) * m;
    return { onScreen: false, x: (x * 0.5 + 0.5) * this.w, y: (-y * 0.5 + 0.5) * this.h };
  }

  _drawBox(ctx, sx, sy, enemy, dist, focal, elapsed, locked = false) {
    const pixR = Math.max(14, Math.min(240, (enemy.radius / dist) * focal * 1.7));
    const isBoss = enemy.type === 'destroyer' || enemy.stats?.apex;
    const pulse = isBoss ? 0.6 + 0.4 * Math.sin(elapsed * 6) : 1;
    // White-hot flash on a confirmed hit; bright solid when aim-locked.
    const flashing = (enemy.hitFlash ?? 0) > 0;
    ctx.strokeStyle = flashing ? 'rgba(255,245,235,1)'
      : locked ? 'rgba(255,150,160,1)'
        : `rgba(255,90,105,${(0.9 * pulse).toFixed(2)})`;
    ctx.lineWidth = flashing ? 3.2 : locked ? 2.6 : isBoss ? 2.4 : 1.6;

    // Corner brackets.
    const c = pixR * 0.4;
    for (const [dx, dy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
      const cx = sx + dx * pixR;
      const cy = sy + dy * pixR;
      ctx.beginPath();
      ctx.moveTo(cx, cy - dy * c);
      ctx.lineTo(cx, cy);
      ctx.lineTo(cx - dx * c, cy);
      ctx.stroke();
    }

    // Label + health pip above the box.
    const label = `Lv${enemy.stats.level} ${enemy.stats.displayName}`;
    ctx.font = '11px ui-monospace, monospace';
    ctx.fillStyle = `rgba(255,140,150,${(0.95 * pulse).toFixed(2)})`;
    ctx.textAlign = 'center';
    ctx.fillText(label, sx, sy - pixR - 8);

    const barW = Math.max(30, pixR * 1.4);
    const frac = Math.max(0, enemy.hull / enemy.hullMax);
    ctx.fillStyle = 'rgba(255,90,105,0.25)';
    ctx.fillRect(sx - barW / 2, sy - pixR - 5, barW, 3);
    ctx.fillStyle = 'rgba(255,90,105,0.9)';
    ctx.fillRect(sx - barW / 2, sy - pixR - 5, barW * frac, 3);
  }

  _drawMissileMark(ctx, sx, sy, elapsed) {
    const r = 8 + 2 * Math.sin(elapsed * 12);
    ctx.strokeStyle = 'rgba(255,170,60,0.95)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(sx, sy - r); ctx.lineTo(sx + r, sy);
    ctx.lineTo(sx, sy + r); ctx.lineTo(sx - r, sy);
    ctx.closePath();
    ctx.stroke();
  }

  _drawArrow(ctx, sx, sy, style) {
    const cx = this.w / 2;
    const cy = this.h / 2;
    const ang = Math.atan2(sy - cy, sx - cx);
    ctx.save();
    ctx.translate(sx, sy);
    ctx.rotate(ang);
    ctx.fillStyle = style;
    ctx.beginPath();
    ctx.moveTo(14, 0);
    ctx.lineTo(-9, -8);
    ctx.lineTo(-9, 8);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}
