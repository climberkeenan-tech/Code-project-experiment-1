/**
 * Minimal synchronous publish/subscribe event bus.
 *
 * Systems communicate through named events instead of holding direct
 * references to each other, which keeps the dependency graph shallow:
 * combat emits 'ship:destroyed', and the explosion FX, audio, pickups and
 * HUD systems each react without knowing who fired the event.
 *
 * Event names used across the game are documented where they are emitted.
 */
export class EventBus {
  constructor() {
    /** @type {Map<string, Set<Function>>} */
    this.listeners = new Map();
  }

  /**
   * Subscribe to an event.
   * @param {string} event
   * @param {Function} handler
   * @returns {() => void} unsubscribe function
   */
  on(event, handler) {
    let set = this.listeners.get(event);
    if (!set) {
      set = new Set();
      this.listeners.set(event, set);
    }
    set.add(handler);
    return () => set.delete(handler);
  }

  /**
   * Subscribe to a single occurrence of an event.
   * @param {string} event
   * @param {Function} handler
   */
  once(event, handler) {
    const off = this.on(event, (payload) => {
      off();
      handler(payload);
    });
    return off;
  }

  /**
   * Emit an event synchronously to all subscribers.
   * Handlers are copied first so a handler may safely unsubscribe itself.
   * @param {string} event
   * @param {*} [payload]
   */
  emit(event, payload) {
    const set = this.listeners.get(event);
    if (!set || set.size === 0) return;
    for (const handler of [...set]) {
      handler(payload);
    }
  }
}
