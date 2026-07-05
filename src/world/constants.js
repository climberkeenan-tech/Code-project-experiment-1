import * as THREE from 'three';

/**
 * Universe layout constants (absolute coordinates, in world units).
 *
 * The whole game takes place in one star system: a single sun at the
 * absolute origin, planets in shells tens of thousands of units out, and
 * the player starting in the inner system. Render space equals absolute
 * space at boot; afterwards the floating origin accumulates the offset
 * (absolute = render + origin.offset).
 */

/** The sun sits at the absolute origin of the universe. */
export const SUN_POSITION = new THREE.Vector3(0, 0, 0);

/** Visual radius of the sun's disc. */
export const SUN_RADIUS = 5000;

/** Where the player's ship materializes at game start / respawn. */
export const PLAYER_SPAWN = new THREE.Vector3(1200, 800, 46000);

/** Master seed for the whole procedural universe. */
export const UNIVERSE_SEED = 'starfall-7741';
