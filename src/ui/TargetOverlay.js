import * as THREE from 'three';

/**
 * Combat target overlay: red brackets around on-screen hostiles (with class,
 * level and a health pip), edge arrows toward off-screen ones, and orange
 * markers for incoming missiles. Solves the playtest problems "I couldn't
 * find enemies" and "I didn't know a missile was coming."
 *
 * A single full-screen 2D canvas drawn each frame from the shared perspective
 * camera — cheap, crisp, and consistent with the DOM/canvas HUD. Nothing is
 * drawn while paused, dead, or on foot.
 */

const MAX_RANGE = 12000;

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
    if (game.paused || game.mode !== 'flight' || !player || !player.alive) return;

    const cam = game.engine.camera;
    cam.getWorldDirection(this._fwd);
    const focal = (this.h / 2) / Math.tan((cam.fov * Math.PI / 180) / 2);

    // --- Hostiles ---
    for (const enemy of game.enemies?.enemies ?? []) {
      const dist = enemy.position.distanceTo(cam.position);
      if (dist > MAX_RANGE) continue;
      const p = this._screen(enemy.position, cam);
      if (p.onScreen) {
        this._drawBox(ctx, p.x, p.y, enemy, dist, focal, elapsed);
      } else {
        this._drawArrow(ctx, p.x, p.y, 'rgba(255,90,105,0.9)');
      }
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

    // --- Warp destination marker (navigation aid) ---
    const warp = game.warp;
    if (warp && warp.target) {
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

  _drawBox(ctx, sx, sy, enemy, dist, focal, elapsed) {
    const pixR = Math.max(10, Math.min(240, (enemy.radius / dist) * focal * 1.7));
    const isBoss = enemy.type === 'destroyer';
    const pulse = isBoss ? 0.6 + 0.4 * Math.sin(elapsed * 6) : 1;
    ctx.strokeStyle = `rgba(255,90,105,${(0.9 * pulse).toFixed(2)})`;
    ctx.lineWidth = isBoss ? 2.4 : 1.6;

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
    ctx.moveTo(10, 0);
    ctx.lineTo(-6, -6);
    ctx.lineTo(-6, 6);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}
