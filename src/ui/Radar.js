/**
 * Radar / minimap.
 *
 * Ship-oriented 2D projection drawn on the HUD's circular canvas at 20 Hz:
 * world offsets are rotated into the ship's frame, X/Z map to the disc
 * (forward = up), and the Y component draws as a small vertical stalk so
 * altitude relationships stay readable — the classic Elite solution.
 *
 * Blips: enemies red (stalked), undiscovered signals pulse cyan, discovered
 * sites dim, planets render as rim arcs colored by archetype.
 */

const RANGE = 3200; // world units to disc edge
const PLANET_RANGE = 40000;

const PLANET_COLORS = {
  terran: '#5fae6b',
  ocean: '#4f8fd0',
  ice: '#a8c6e0',
  desert: '#cf9a55',
  volcanic: '#d05a3a',
  rocky: '#9a938c',
};

/** Radar blip radius by enemy class — bigger threats read bigger. */
const ENEMY_BLIP = { scout: 2.4, fighter: 2.8, heavy: 3.6, cruiser: 4.6, destroyer: 6.5, warship: 5.4, redcarrier: 6.2 };

export class Radar {
  /**
   * @param {import('../core/Game.js').Game} game
   * @param {HTMLCanvasElement} canvas
   */
  constructor(game, canvas) {
    this.game = game;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this._accumulator = 0;

    this._quatInv = null; // lazily borrowed THREE objects from the player
    this._local = null;
  }

  update(dt, elapsed) {
    this._accumulator += dt;
    if (this._accumulator < 0.05) return; // 20 Hz redraw
    this._accumulator = 0;

    const game = this.game;
    const player = game.player;
    if (!player) return;

    if (!this._quatInv) {
      this._quatInv = player.quaternion.clone();
      this._local = player.position.clone();
    }
    this._quatInv.copy(player.quaternion).invert();

    const ctx = this.ctx;
    const size = this.canvas.width;
    const half = size / 2;
    ctx.clearRect(0, 0, size, size);

    // --- Grid chrome ---
    ctx.strokeStyle = 'rgba(134, 231, 255, 0.18)';
    ctx.lineWidth = 1;
    for (const r of [0.33, 0.66, 0.98]) {
      ctx.beginPath();
      ctx.arc(half, half, half * r, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(half, 4);
    ctx.lineTo(half, size - 4);
    ctx.moveTo(4, half);
    ctx.lineTo(size - 4, half);
    ctx.stroke();

    // Forward wedge.
    ctx.fillStyle = 'rgba(134, 231, 255, 0.3)';
    ctx.beginPath();
    ctx.moveTo(half, 10);
    ctx.lineTo(half - 5, 20);
    ctx.lineTo(half + 5, 20);
    ctx.fill();

    // --- Planets as rim arcs ---
    for (const planet of game.universe?.planets ?? []) {
      this._toLocal(planet.group.position, player);
      const distance = Math.hypot(this._local.x, this._local.y, this._local.z);
      if (distance - planet.radius > PLANET_RANGE) continue;
      const angle = Math.atan2(this._local.x, -this._local.z);
      const color = PLANET_COLORS[planet.descriptor.archetype] ?? '#888';
      ctx.strokeStyle = color;
      ctx.lineWidth = 3.4;
      const arcHalf = Math.min(0.7, Math.atan2(planet.radius, distance) * 1.4 + 0.06);
      ctx.beginPath();
      ctx.arc(half, half, half - 3,
        angle - Math.PI / 2 - arcHalf, angle - Math.PI / 2 + arcHalf);
      ctx.stroke();
    }

    // --- POI blips ---
    const pulse = 0.55 + Math.sin(elapsed * 5) * 0.45;
    for (const site of game.poi?.sites ?? []) {
      if (!site.signalSent) continue; // undetected sites stay hidden
      this._toLocal(site.position, player);
      const alpha = site.discovered ? 0.4 : pulse;
      this._blip(ctx, half, `rgba(134, 231, 255, ${alpha.toFixed(2)})`, 2.6, true);
    }

    // --- Enemies (blip scales with class threat) ---
    for (const enemy of game.enemies?.enemies ?? []) {
      if (enemy.stats?.apex) continue; // drawn as a rim arc below, like a planet
      this._toLocal(enemy.position, player);
      const size2 = ENEMY_BLIP[enemy.type] ?? 2.6;
      this._blip(ctx, half, 'rgba(255, 93, 108, 0.95)', size2, false);
    }

    // --- The apex hunter: a planet-like deep-red rim arc, visible at ANY
    // distance. No arrows, no bracket — just a presence on the nav system
    // that slowly grows as it closes in. Avoidable by design.
    for (const enemy of game.enemies?.enemies ?? []) {
      if (!enemy.stats?.apex) continue;
      this._toLocal(enemy.position, player);
      const distance = Math.hypot(this._local.x, this._local.y, this._local.z);
      const angle = Math.atan2(this._local.x, -this._local.z);
      const throb = 0.75 + Math.sin(elapsed * 2.2) * 0.25;
      ctx.strokeStyle = `rgba(255, 47, 63, ${throb.toFixed(2)})`;
      ctx.lineWidth = 5;
      const arcHalf = Math.min(0.6, Math.atan2(2600, Math.max(distance, 1)) * 1.4 + 0.09);
      ctx.beginPath();
      ctx.arc(half, half, half - 3,
        angle - Math.PI / 2 - arcHalf, angle - Math.PI / 2 + arcHalf);
      ctx.stroke();
    }

    // --- Friendly escorts (green) ---
    for (const esc of game.fleet?.escorts ?? []) {
      this._toLocal(esc.position, player);
      this._blip(ctx, half, 'rgba(143, 225, 176, 0.95)', 2.6, false);
    }

    // --- Ambient allied traffic (blue) ---
    for (const ship of game.traffic?.ships ?? []) {
      this._toLocal(ship.position, player);
      this._blip(ctx, half, 'rgba(96, 170, 255, 0.9)', 2.6, false);
    }

    // Center: the ship.
    ctx.fillStyle = '#cfeeff';
    ctx.beginPath();
    ctx.arc(half, half, 2.4, 0, Math.PI * 2);
    ctx.fill();
  }

  /** Rotate a world position into the ship frame, stored in _local. */
  _toLocal(worldPos, player) {
    this._local.copy(worldPos).sub(player.position).applyQuaternion(this._quatInv);
  }

  /**
   * Draw the blip currently held in _local (clamped to the rim), with an
   * altitude stalk. `diamond` renders POIs as rotated squares.
   */
  _blip(ctx, half, style, size, diamond) {
    let x = this._local.x / RANGE;
    let y = -this._local.z / RANGE; // forward = up
    const length = Math.hypot(x, y);
    const clamped = length > 0.95;
    if (clamped) {
      x = (x / length) * 0.95;
      y = (y / length) * 0.95;
    }
    const px = half + x * half;
    const py = half - y * half;

    ctx.fillStyle = style;
    ctx.strokeStyle = style;

    // Altitude stalk (only for in-range blips).
    if (!clamped) {
      const stalk = Math.max(-14, Math.min(14, (this._local.y / RANGE) * 40));
      if (Math.abs(stalk) > 2) {
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px, py + stalk);
        ctx.stroke();
      }
    }

    ctx.beginPath();
    if (diamond) {
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(Math.PI / 4);
      ctx.fillRect(-size, -size, size * 2, size * 2);
      ctx.restore();
    } else {
      ctx.arc(px, py, size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
