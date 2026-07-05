/**
 * Adaptive quality controller.
 *
 * Watches the real frame time and nudges the engine's dynamic resolution
 * scale up or down to hold a target frame rate. This is the single most
 * effective mobile optimization in the game: fill rate dominates on phone
 * GPUs, and rendering at 80% scale is visually subtle but ~35% cheaper.
 *
 * Adjustments are damped (evaluation windows + cooldown) so a single GC
 * hitch never causes a visible resolution pump.
 */
export class QualityManager {
  /** @param {import('./Engine.js').Engine} engine */
  constructor(engine) {
    this.engine = engine;

    this.minScale = 0.55;
    this.maxScale = engine.isMobile ? 0.9 : 1.0;
    this.scale = engine.resolutionScale;

    // Frame-time accumulation window.
    this._accumTime = 0;
    this._accumFrames = 0;
    this._cooldown = 0;

    // Smoothed FPS exposed for the HUD/debug readout.
    this.fps = 60;
  }

  /** @param {number} dt frame delta time in seconds */
  update(dt) {
    this.fps += (1 / Math.max(dt, 1e-4) - this.fps) * 0.05;

    this._accumTime += dt;
    this._accumFrames++;
    if (this._cooldown > 0) this._cooldown -= dt;

    // Evaluate once per second of gameplay.
    if (this._accumTime < 1 || this._cooldown > 0) return;

    const avgFrame = this._accumTime / this._accumFrames;
    this._accumTime = 0;
    this._accumFrames = 0;

    if (avgFrame > 1 / 42 && this.scale > this.minScale) {
      // Struggling: drop resolution decisively.
      this.scale = Math.max(this.minScale, this.scale - 0.1);
      this.engine.setResolutionScale(this.scale);
      this._cooldown = 2;
    } else if (avgFrame < 1 / 57 && this.scale < this.maxScale) {
      // Comfortable: creep back up slowly.
      this.scale = Math.min(this.maxScale, this.scale + 0.05);
      this.engine.setResolutionScale(this.scale);
      this._cooldown = 3;
    }
  }
}
