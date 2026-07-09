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
      <div class="mode-choose">
        <button class="mode-btn" data-mode="survival">
          <span class="mode-name">▶ &nbsp;Survival</span>
          <span class="mode-desc">Mine, trade and earn credits — the full game</span>
        </button>
        <button class="mode-btn creative" data-mode="creative">
          <span class="mode-name">✦ &nbsp;Creative</span>
          <span class="mode-desc">Unlimited credits — buy any ship or upgrade for free</span>
        </button>
      </div>
      <div class="controls-hint">${this._controlsHint()}</div>
      <div class="reset-save">Reset progress</div>
      <div class="build-tag">BUILD 19 — the Night Hawk: mission reward + reinforcement call</div>
    `;
    this.root.appendChild(el);

    let launched = false;
    // `creative` chooses the free-build economy; survival is the normal game.
    const launch = (creative) => {
      if (launched) return;
      launched = true;
      window.removeEventListener('keydown', onKey);
      this.game.creative = creative;
      this.game.audio.unlock();
      this.game.paused = false;
      this.game.events.emit('game:started');
      el.classList.add('hidden');
      setTimeout(() => el.remove(), 700);
    };
    const onKey = (e) => {
      if (e.code === 'Enter' || e.code === 'Space') launch(false); // Survival
      else if (e.code === 'KeyC') launch(true); // Creative
    };
    for (const btn of el.querySelectorAll('.mode-btn')) {
      btn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        launch(btn.dataset.mode === 'creative');
      });
    }
    window.addEventListener('keydown', onKey);

    // Reset progress: two-tap confirm, wipes the save and reloads fresh.
    const reset = el.querySelector('.reset-save');
    reset.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!reset.dataset.armed) {
        reset.dataset.armed = '1';
        reset.textContent = 'Tap again to erase ALL progress';
        setTimeout(() => {
          reset.dataset.armed = '';
          reset.textContent = 'Reset progress';
        }, 3000);
        return;
      }
      this.game.save?.reset();
      window.location.reload();
    });
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
