import * as THREE from 'three';
import { SimplexNoise } from '../core/math/noise.js';
import { Rng } from '../core/math/rng.js';

/**
 * The NATURE EDITOR (playtest ask: "create something for me so I can see the
 * game and create the terrain and place the bushes and rocks and trees").
 *
 * While ON FOOT, press P: a palette bar opens with 8 nature props — trees,
 * bushes, flowers, rocks, grass. Click the ground to plant the selected prop
 * where you're looking; X removes the nearest placed prop; P closes.
 *
 * Placements are PERSISTENT (their own localStorage key, independent of the
 * save slot, so creative-mode decorating carries into survival) and are
 * stored in planet-local coordinates, parented to the planet group — the
 * floating origin and planet day/night need no special handling.
 *
 * The props are hand-built (flat-shaded fBm blobs + vertex-colour gradients,
 * the game's art style). The palette is designed to grow: a Meshy GLB can be
 * added as a new PROPS entry with a model factory later.
 */

const STORE_KEY = 'starfall.props.v1';
const MAX_PER_PLANET = 500;
const PLACE_RANGE = 90; // how far ahead you can plant
const REMOVE_RANGE = 12;

export class NatureEditor {
  /** @param {import('../core/Game.js').Game} game */
  constructor(game) {
    this.game = game;
    game.natureEditor = this;

    this.open = false;
    this.selected = 0;
    /** @type {Map<string, Array<{t:number,p:[number,number,number],s:number,r:number}>>} */
    this.placed = this._load();
    /** Planet name → THREE.Group of live prop meshes (built on first visit). */
    this._live = new Map();
    this._counter = 0;

    this._ray = new THREE.Vector3();
    this._point = new THREE.Vector3();
    this._up = new THREE.Vector3();

    this._buildBar();

    // Build a planet's saved props the first time we set foot on it.
    game.events.on('onfoot:entered', (planet) => this._ensureBuilt(planet));
    game.events.on('onfoot:left', () => this._setOpen(false));

    window.addEventListener('keydown', (e) => {
      if (game.mode !== 'onfoot') return;
      if (e.code === 'KeyP' && !e.repeat) this._setOpen(!this.open);
      if (!this.open) return;
      if (e.code.startsWith('Digit')) {
        const n = Number(e.code.slice(5)) - 1;
        if (n >= 0 && n < PROPS.length) this._select(n);
      }
      if (e.code === 'KeyX' && !e.repeat) this._removeNearest();
    });
    window.addEventListener('mousedown', (e) => {
      if (!this.open || game.mode !== 'onfoot' || e.button !== 0) return;
      if (e.target && e.target.closest?.('.nature-bar')) return; // palette click
      this._placeAtAim();
    });
  }

  update() {} // event-driven; registered as a system for lifecycle symmetry

  // ------------------------------------------------------------------
  // UI
  // ------------------------------------------------------------------

  _buildBar() {
    const bar = document.createElement('div');
    bar.className = 'nature-bar';
    bar.innerHTML = `
      <div class="nb-title">NATURE EDITOR</div>
      <div class="nb-row">${PROPS.map((p, i) => `
        <button class="nb-item" data-i="${i}"><span class="nb-icon">${p.icon}</span>${i + 1}·${p.name}</button>`).join('')}
      </div>
      <div class="nb-hint">click the ground to plant · <b>X</b> removes nearest · <b>1-8</b> pick · <b>P</b> close
        <span class="nb-count" data-el="count"></span></div>
    `;
    document.body.appendChild(bar);
    this.bar = bar;
    this._countEl = bar.querySelector('[data-el="count"]');
    for (const btn of bar.querySelectorAll('.nb-item')) {
      btn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this._select(Number(btn.dataset.i));
      });
    }
    this._select(0);
  }

  _select(i) {
    this.selected = i;
    for (const btn of this.bar.querySelectorAll('.nb-item')) {
      btn.classList.toggle('active', Number(btn.dataset.i) === i);
    }
  }

  _setOpen(open) {
    if (this.open === open) return;
    this.open = open;
    this.bar.classList.toggle('visible', open);
    this._refreshCount();
    this.game.audio?.playTone?.({
      type: 'sine', freq: open ? 520 : 420, freqEnd: open ? 760 : 300, duration: 0.12, gain: 0.1,
    });
  }

  _refreshCount() {
    const planet = this.game.onfoot?.planet;
    if (!planet || !this._countEl) return;
    const list = this.placed.get(planet.descriptor.name) ?? [];
    this._countEl.textContent = ` · ${list.length}/${MAX_PER_PLANET} placed here`;
  }

  // ------------------------------------------------------------------
  // Placement
  // ------------------------------------------------------------------

  /** March the camera ray against the terrain; null when no ground ahead. */
  _aimGround(planet) {
    const cam = this.game.engine.camera;
    cam.getWorldDirection(this._ray);
    for (let t = 2; t < PLACE_RANGE; t += 0.5) {
      this._point.copy(cam.position).addScaledVector(this._ray, t);
      if (planet.getAltitude(this._point) <= 0) {
        // Refine: back off to the surface along the radial.
        const alt = planet.getAltitude(this._point);
        this._up.copy(this._point).sub(planet.group.position).normalize();
        this._point.addScaledVector(this._up, -alt);
        return this._point;
      }
    }
    return null;
  }

  _placeAtAim() {
    const planet = this.game.onfoot?.planet;
    if (!planet) return;
    const point = this._aimGround(planet);
    if (!point) {
      this.game.audio?.playTone?.({ type: 'square', freq: 180, freqEnd: 120, duration: 0.1, gain: 0.08 });
      return;
    }
    this.placeProp(planet, point, this.selected);
  }

  /**
   * Plant a prop at a world-space ground point (also the harness test API).
   * @returns {boolean} placed
   */
  placeProp(planet, worldPoint, typeIndex) {
    const name = planet.descriptor.name;
    const list = this.placed.get(name) ?? [];
    if (list.length >= MAX_PER_PLANET) {
      this.game.events.emit('nature:full');
      return false;
    }
    const entry = {
      t: typeIndex,
      p: [
        worldPoint.x - planet.group.position.x,
        worldPoint.y - planet.group.position.y,
        worldPoint.z - planet.group.position.z,
      ],
      s: 0.8 + Math.random() * 0.5,
      r: Math.random() * Math.PI * 2,
    };
    // _ensureBuilt spawns everything in the saved list on a planet's FIRST
    // build (including this new entry); only spawn directly when the live
    // group already existed — otherwise the first prop appears twice.
    const wasBuilt = this._live.has(name);
    list.push(entry);
    this.placed.set(name, list);
    this._save();
    this._ensureBuilt(planet);
    if (wasBuilt) this._spawn(planet, entry);
    this._refreshCount();
    this.game.audio?.playTone?.({ type: 'triangle', freq: 660, freqEnd: 880, duration: 0.08, gain: 0.1 });
    return true;
  }

  /** Remove the placed prop nearest the avatar (within REMOVE_RANGE). */
  _removeNearest() {
    const planet = this.game.onfoot?.planet;
    const avatar = this.game.onfoot?.avatar;
    if (!planet || !avatar) return;
    const name = planet.descriptor.name;
    const list = this.placed.get(name) ?? [];
    const group = this._live.get(name);
    if (!list.length || !group) return;

    let best = -1;
    let bestSq = REMOVE_RANGE * REMOVE_RANGE;
    for (let i = 0; i < list.length; i++) {
      const [x, y, z] = list[i].p;
      this._point.set(x, y, z).add(planet.group.position);
      const d = this._point.distanceToSquared(avatar.position);
      if (d < bestSq) { bestSq = d; best = i; }
    }
    if (best === -1) return;
    const [entry] = list.splice(best, 1);
    this._save();
    if (entry._mesh) {
      group.remove(entry._mesh);
    } else {
      // Session-loaded props track meshes on the entry; rebuilt ones match by index.
      const child = group.children.find((c) => c.userData.entry === entry);
      if (child) group.remove(child);
    }
    this._refreshCount();
    this.game.audio?.playTone?.({ type: 'sine', freq: 420, freqEnd: 240, duration: 0.1, gain: 0.1 });
  }

  // ------------------------------------------------------------------
  // Live meshes
  // ------------------------------------------------------------------

  _ensureBuilt(planet) {
    const name = planet.descriptor.name;
    if (this._live.has(name)) { this._refreshCount(); return; }
    const group = new THREE.Group();
    planet.group.add(group);
    this._live.set(name, group);
    for (const entry of this.placed.get(name) ?? []) this._spawn(planet, entry);
    this._refreshCount();
  }

  _spawn(planet, entry) {
    const group = this._live.get(planet.descriptor.name);
    if (!group) return;
    const type = PROPS[entry.t % PROPS.length];
    // ONE merged mesh per prop (geometry cached per variant): 500 placed
    // props cost 500 draw calls, not thousands of per-part meshes.
    const prop = new THREE.Mesh(type.geo(this._counter++ % type.variants), MAT);
    prop.castShadow = !type.noShadow;
    prop.receiveShadow = true;
    prop.position.set(entry.p[0], entry.p[1], entry.p[2]);
    // Stand upright on the sphere: local up = radial direction.
    this._up.set(entry.p[0], entry.p[1], entry.p[2]).normalize();
    prop.quaternion.setFromUnitVectors(UP, this._up);
    prop.rotateY(entry.r);
    prop.scale.setScalar(entry.s);
    prop.userData.entry = entry;
    entry._mesh = prop;
    group.add(prop);
  }

  // ------------------------------------------------------------------
  // Persistence (own key: decorating is world dressing, not progression,
  // so creative-mode placements survive — unlike the creative save sandbox)
  // ------------------------------------------------------------------

  _load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return new Map();
      return new Map(Object.entries(JSON.parse(raw)));
    } catch {
      return new Map();
    }
  }

  _save() {
    try {
      const obj = {};
      for (const [k, v] of this.placed) {
        obj[k] = v.map(({ t, p, s, r }) => ({ t, p, s, r })); // strip _mesh
      }
      localStorage.setItem(STORE_KEY, JSON.stringify(obj));
    } catch { /* storage full/blocked: placements stay session-only */ }
  }
}

// ====================================================================
// Prop geometry — flat-shaded fBm blobs + vertex-colour gradients, in the
// game's art style. Every prop variant is baked into ONE merged geometry
// (cached), so each placement is a single Mesh / single draw call.
// ====================================================================

const UP = new THREE.Vector3(0, 1, 0);
const MAT = new THREE.MeshStandardMaterial({
  vertexColors: true, roughness: 0.92, metalness: 0.02, flatShading: true,
});

/** Noise-displaced icosahedron with a bottom→top colour gradient. */
function blobGeometry(seed, detail, lumpy, colorLow, colorHigh) {
  const noise = new SimplexNoise(seed);
  const geo = new THREE.IcosahedronGeometry(1, detail);
  const pos = geo.getAttribute('position');
  const colors = new Float32Array(pos.count * 3);
  const v = new THREE.Vector3();
  const cLow = new THREE.Color(colorLow);
  const cHigh = new THREE.Color(colorHigh);
  const c = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const n = noise.fbm(v.x * 1.6, v.y * 1.6, v.z * 1.6, 3);
    v.multiplyScalar(1 + n * lumpy);
    pos.setXYZ(i, v.x, v.y, v.z);
    c.copy(cLow).lerp(cHigh, (v.y + 1.2) / 2.4 + n * 0.3);
    colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.computeVertexNormals();
  return geo;
}

/** Paint a bottom→top colour gradient onto any geometry. */
function paint(geo, colorLow, colorHigh) {
  const pos = geo.getAttribute('position');
  const colors = new Float32Array(pos.count * 3);
  const cLow = new THREE.Color(colorLow);
  const cHigh = new THREE.Color(colorHigh);
  const c = new THREE.Color();
  const box = new THREE.Box3().setFromBufferAttribute(pos);
  const h = Math.max(1e-3, box.max.y - box.min.y);
  for (let i = 0; i < pos.count; i++) {
    const t = (pos.getY(i) - box.min.y) / h;
    c.copy(cLow).lerp(cHigh, t);
    colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return geo;
}

/**
 * Merge {geo, pos, rotE, scl} parts into one non-indexed geometry.
 * Every part geo must carry position/normal/color attributes.
 */
function mergeParts(parts) {
  const baked = [];
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const e = new THREE.Euler();
  const p = new THREE.Vector3();
  const s = new THREE.Vector3();
  let total = 0;
  for (const part of parts) {
    const g = part.geo.index ? part.geo.toNonIndexed() : part.geo.clone();
    e.set(part.rotE?.[0] ?? 0, part.rotE?.[1] ?? 0, part.rotE?.[2] ?? 0);
    q.setFromEuler(e);
    p.set(part.pos?.[0] ?? 0, part.pos?.[1] ?? 0, part.pos?.[2] ?? 0);
    const sc = part.scl ?? 1;
    if (Array.isArray(sc)) s.set(sc[0], sc[1], sc[2]); else s.setScalar(sc);
    m.compose(p, q, s);
    g.applyMatrix4(m);
    baked.push(g);
    total += g.getAttribute('position').count;
  }
  const posArr = new Float32Array(total * 3);
  const norArr = new Float32Array(total * 3);
  const colArr = new Float32Array(total * 3);
  let offset = 0;
  for (const g of baked) {
    posArr.set(g.getAttribute('position').array, offset * 3);
    norArr.set(g.getAttribute('normal').array, offset * 3);
    colArr.set(g.getAttribute('color').array, offset * 3);
    offset += g.getAttribute('position').count;
    g.dispose();
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
  out.setAttribute('normal', new THREE.BufferAttribute(norArr, 3));
  out.setAttribute('color', new THREE.BufferAttribute(colArr, 3));
  return out;
}

const geoCache = new Map();
function cachedGeo(key, makeParts) {
  if (!geoCache.has(key)) geoCache.set(key, mergeParts(makeParts()));
  return geoCache.get(key);
}

function oakParts(v) {
  const rng = new Rng(`oak:${v}`);
  const parts = [{
    geo: paint(new THREE.CylinderGeometry(0.28, 0.5, 3.4, 7), 0x4c3320, 0x6b4a2e),
    pos: [0, 1.7, 0],
  }];
  for (let b = 0; b < 3; b++) {
    parts.push({
      geo: blobGeometry(`oakblob:${v}:${b}`, 2, 0.38, 0x1e5a24, 0x67b83a),
      pos: [rng.range(-1, 1), 3.6 + rng.range(0, 1.4), rng.range(-1, 1)],
      scl: 1.5 + rng.range(0, 0.7),
    });
  }
  return parts;
}

function pineParts(v) {
  const parts = [{
    geo: paint(new THREE.CylinderGeometry(0.2, 0.38, 2.6, 6), 0x4a2f1d, 0x5d3c24),
    pos: [0, 1.3, 0],
  }];
  const rng = new Rng(`pine:${v}`);
  for (let c = 0; c < 3; c++) {
    parts.push({
      geo: paint(new THREE.ConeGeometry(2.1 - c * 0.55, 2.4, 8), 0x123f1e, 0x2f7031),
      pos: [rng.range(-0.1, 0.1), 2.6 + c * 1.5, rng.range(-0.1, 0.1)],
    });
  }
  return parts;
}

function palmParts(v) {
  const rng = new Rng(`palm:${v}`);
  const parts = [{
    geo: paint(new THREE.CylinderGeometry(0.16, 0.3, 5.4, 6), 0x7a5a36, 0x9a7a4c),
    pos: [0, 2.7, 0],
    rotE: [0, 0, 0.16],
  }];
  for (let f = 0; f < 6; f++) {
    const a = (f / 6) * Math.PI * 2 + rng.range(0, 0.5);
    parts.push({
      geo: paint(new THREE.ConeGeometry(0.34, 3.0, 4), 0x1d6a2a, 0x53a83c),
      pos: [Math.cos(a) * 1.1 + 0.8, 5.35, Math.sin(a) * 1.1],
      rotE: [Math.sin(a) * 1.25, 0, -Math.cos(a) * 1.25],
    });
  }
  return parts;
}

function bushParts(v) {
  const rng = new Rng(`bush:${v}`);
  const parts = [];
  for (let b = 0; b < 4; b++) {
    parts.push({
      geo: blobGeometry(`bushblob:${v}:${b}`, 1, 0.42, 0x1c4f22, 0x4f9a33),
      pos: [rng.range(-0.7, 0.7), 0.45 + rng.range(0, 0.3), rng.range(-0.7, 0.7)],
      scl: 0.55 + rng.range(0, 0.4),
    });
  }
  return parts;
}

function flowerParts(v) {
  const rng = new Rng(`flower:${v}`);
  const parts = bushParts(v + 2);
  const petals = [0xff6b9d, 0xffd166, 0xa78bfa, 0xff9770];
  for (let f = 0; f < 6; f++) {
    parts.push({
      geo: paint(new THREE.IcosahedronGeometry(0.14, 0), petals[f % 4], petals[(f + 1) % 4]),
      pos: [rng.range(-0.8, 0.8), 0.85 + rng.range(0, 0.35), rng.range(-0.8, 0.8)],
    });
  }
  return parts;
}

function rockParts(v) {
  return [{
    geo: blobGeometry(`rock:${v}`, 1, 0.4, 0x5c554c, 0x8f867a),
    pos: [0, 0.55, 0],
    scl: [1.1, 0.85, 1.0],
  }];
}

function boulderParts(v) {
  const rng = new Rng(`boulders:${v}`);
  const parts = [];
  for (let b = 0; b < 3; b++) {
    parts.push({
      geo: blobGeometry(`rock:${(v + b) % 5}`, 1, 0.4, 0x5c554c, 0x8f867a),
      pos: [rng.range(-1.4, 1.4), 0.5 + rng.range(0, 0.4), rng.range(-1.4, 1.4)],
      scl: 0.6 + rng.range(0, 1.1),
    });
  }
  return parts;
}

function grassParts(v) {
  const rng = new Rng(`grass:${v}`);
  const parts = [];
  for (let b = 0; b < 14; b++) {
    parts.push({
      geo: paint(new THREE.ConeGeometry(0.045, 0.7 + (b % 3) * 0.2, 3), 0x2d6a2e, 0x7dc95e),
      pos: [rng.range(-1.1, 1.1), 0.32, rng.range(-1.1, 1.1)],
      rotE: [rng.range(-0.25, 0.25), rng.range(0, Math.PI), rng.range(-0.25, 0.25)],
    });
  }
  return parts;
}

/** def(name, icon, variants, partsFn, noShadow?) → palette entry. */
function def(name, icon, variants, partsFn, noShadow = false) {
  return {
    name, icon, variants, noShadow,
    geo: (v) => cachedGeo(`${name}:${v % variants}`, () => partsFn(v % variants)),
  };
}

const PROPS = [
  def('Oak', '🌳', 4, oakParts),
  def('Pine', '🌲', 3, pineParts),
  def('Palm', '🌴', 3, palmParts),
  def('Bush', '🌿', 5, bushParts),
  def('Flowers', '🌸', 5, flowerParts),
  def('Rock', '🪨', 5, rockParts),
  def('Boulders', '⛰️', 4, boulderParts),
  def('Grass', '🌾', 6, grassParts, true),
];
