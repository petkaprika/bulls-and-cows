import type { GameSettings } from './types/GameSettings';

import { renderGame } from './ui/renderGame.js';
import { renderSettings } from './ui/renderSettings.js';

const app = document.createElement('div');
app.id = 'app';

function showSettings(): void {
  app.replaceChildren(renderSettings(startGame));
}

function startGame(settings: GameSettings): void {
  app.replaceChildren(renderGame(settings, showSettings));
}

showSettings();

document.body.prepend(app);
