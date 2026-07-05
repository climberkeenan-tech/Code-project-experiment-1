import * as THREE from 'three';

/**
 * Floating-origin manager.
 *
 * The universe spans hundreds of thousands of units. GPU vertex transforms
 * happen in 32-bit floats, so if the camera strayed 150,000 units from the
 * scene origin, nearby geometry would jitter by centimeters every frame.
 *
 * The classic fix: whenever the player gets far from the origin, shift the
 * *entire world* back so the player is near (0,0,0) again. Game logic runs in
 * JS doubles, so subtracting the shift is lossless; only the GPU ever sees
 * the small, rebased coordinates.
 *
 * Systems that own world-positioned state register a shift callback and
 * subtract the delta from every position they track (meshes, velocities are
 * unaffected, spawn points, waypoints, etc.).
 */
export class FloatingOrigin {
  /** @param {number} threshold rebase when the anchor exceeds this distance */
  constructor(threshold = 8192) {
    this.threshold = threshold;
    this.thresholdSq = threshold * threshold;

    /**
     * Total accumulated offset: absolutePosition = renderPosition + offset.
     * Only needed by systems that care about absolute universe coordinates
     * (the radar and universe generation work fine in render space).
     */
    this.offset = new THREE.Vector3();

    /** @type {Set<(delta: THREE.Vector3) => void>} */
    this.callbacks = new Set();

    this._delta = new THREE.Vector3();
  }

  /**
   * Register a shift handler. Returns an unsubscribe function.
   * @param {(delta: THREE.Vector3) => void} callback
   */
  onShift(callback) {
    this.callbacks.add(callback);
    return () => this.callbacks.delete(callback);
  }

  /**
   * Check the anchor (the player ship) and rebase the world if needed.
   * Called once per frame after physics but before rendering.
   * @param {THREE.Vector3} anchorPosition
   */
  update(anchorPosition) {
    if (anchorPosition.lengthSq() < this.thresholdSq) return;

    const delta = this._delta.copy(anchorPosition);
    for (const callback of this.callbacks) {
      callback(delta);
    }
    this.offset.add(delta);
  }
}
