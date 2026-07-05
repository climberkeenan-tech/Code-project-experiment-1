/**
 * Generic object pool.
 *
 * Mobile GPUs and JS garbage collectors both hate churn. Everything that is
 * spawned frequently — projectiles, explosion bursts, muzzle flashes,
 * pickups — is pooled so gameplay allocates (almost) nothing per frame.
 */
export class ObjectPool {
  /**
   * @param {() => T} create factory producing a fresh, inactive instance
   * @param {(item: T) => void} [reset] called when an item is released
   * @param {number} [prewarm] instances to allocate up front
   * @template T
   */
  constructor(create, reset = null, prewarm = 0) {
    this.create = create;
    this.reset = reset;
    /** @type {T[]} */
    this.free = [];
    /** @type {Set<T>} */
    this.active = new Set();
    for (let i = 0; i < prewarm; i++) {
      this.free.push(this.create());
    }
  }

  /** Acquire an instance (recycled if available, freshly created otherwise). */
  acquire() {
    const item = this.free.length > 0 ? this.free.pop() : this.create();
    this.active.add(item);
    return item;
  }

  /** Return an instance to the pool. Safe to call once per acquire. */
  release(item) {
    if (!this.active.delete(item)) return; // double-release guard
    if (this.reset) this.reset(item);
    this.free.push(item);
  }

  /** Release every active instance (e.g. on respawn / scene reset). */
  releaseAll() {
    for (const item of [...this.active]) {
      this.release(item);
    }
  }

  /** Iterate active items; the callback may release the current item. */
  forEachActive(fn) {
    for (const item of [...this.active]) {
      fn(item);
    }
  }

  get activeCount() {
    return this.active.size;
  }
}
