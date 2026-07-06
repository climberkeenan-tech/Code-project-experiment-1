/**
 * Full-screen UI states: the start screen and the death/respawn screen.
 *
 * The start screen doubles as the audio unlock gesture (browsers require a
 * user interaction before an AudioContext may start).
 */
export class Screens {
  /** @param {import('../core/Game.js').Game} game */
  constructor(game) {
    this.game = game;
    this.root = document.getElementById('ui-root');

    this._buildStartScreen();

    game.events.on('player:died', () => {
      // Small delay so the explosion reads before the overlay appears.
      setTimeout(() => this._buildDeathScreen(), 1600);
    });
  }

  _controlsHint() {
    const touch = navigator.maxTouchPoints > 0;
    return touch
      ? 'LEFT STICK steer &nbsp;·&nbsp; RIGHT STICK throttle / roll<br>FIRE and BOOST buttons'
      : 'MOUSE steer &nbsp;·&nbsp; W/S throttle &nbsp;·&nbsp; A/D roll &nbsp;·&nbsp; Q/E strafe<br>'
        + 'SHIFT boost &nbsp;·&nbsp; SPACE / CLICK fire &nbsp;·&nbsp; X brake';
  }

  _buildStartScreen() {
    const el = document.createElement('div');
    el.className = 'screen';
    el.innerHTML = `
      <div class="game-title">Starfall Frontier</div>
      <div class="tagline">Explore &nbsp;·&nbsp; Discover &nbsp;·&nbsp; Survive</div>
      <div class="prompt">Tap to Launch</div>
      <div class="controls-hint">${this._controlsHint()}</div>
      <div class="build-tag">BUILD 8 — dreadnought · fleet commands · 4 hero ships</div>
    `;
    this.root.appendChild(el);

    let launched = false;
    const onKey = (e) => {
      if (e.code === 'Enter' || e.code === 'Space') launch();
    };
    const launch = () => {
      if (launched) return;
      launched = true;
      window.removeEventListener('keydown', onKey);
      this.game.audio.unlock();
      this.game.paused = false;
      this.game.events.emit('game:started');
      el.classList.add('hidden');
      setTimeout(() => el.remove(), 700);
    };
    el.addEventListener('pointerdown', launch, { once: true });
    window.addEventListener('keydown', onKey);
  }

  _buildDeathScreen() {
    const el = document.createElement('div');
    el.className = 'screen';
    el.innerHTML = `
      <div class="death-title">Ship Destroyed</div>
      <div class="tagline">Salvage teams recovered part of your cargo</div>
      <div class="prompt">Tap to Redeploy</div>
    `;
    this.root.appendChild(el);

    el.addEventListener(
      'pointerdown',
      () => {
        this.game.events.emit('player:respawn-requested');
        el.classList.add('hidden');
        setTimeout(() => el.remove(), 700);
      },
      { once: true },
    );
  }
}
