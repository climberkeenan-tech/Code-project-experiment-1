import { defineConfig } from 'vite';

/**
 * Vite configuration for Starfall Frontier.
 *
 * The game is a single-page WebGL application. We keep the config minimal:
 * relative base so the built bundle can be hosted from any sub-path
 * (GitHub Pages, itch.io, a CDN folder), and a slightly raised chunk-size
 * warning limit because three.js is intentionally bundled as one chunk.
 */
export default defineConfig({
  base: './',
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 1200,
  },
  server: {
    host: true,
  },
});
