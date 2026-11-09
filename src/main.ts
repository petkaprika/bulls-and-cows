import type { GameSettings } from './types/GameSettings';

import { renderGame } from './ui/renderGame.js';
import { renderSettings } from './ui/renderSettings.js';

const app = document.createElement('div');
app.id = 'app';

function startGame(settings: GameSettings): void {
  app.replaceChildren(renderGame(settings));
}

app.append(renderSettings(startGame));

document.body.prepend(app);
