import type { GameSettings } from '../types/GameSettings';
import type { GameState } from '../types/GameState';

import { BASE_VALUES } from '../constants.js';
import { evaluateGuess } from '../logic/evaluateGuess.js';
import { generateSecret } from '../logic/generateSecret.js';
import { isValidGuess } from '../logic/isValidGuess.js';

export function renderGame(settings: GameSettings): HTMLElement {
  const container = document.createElement('main');
  container.className = 'game';

  const secret = generateSecret(settings.length, BASE_VALUES[settings.base]);
  let gameState: GameState = {
    settings,
    secret,
    history: [],
  };

  const title = document.createElement('h1');
  title.textContent = 'Bulls and Cows';

  const subtitle = document.createElement('h2');
  subtitle.textContent = 'Game in progress';

  const settingsInfo = document.createElement('p');
  settingsInfo.textContent = `Number system: ${settings.base.toUpperCase()}, digits: ${settings.length}`;

  const historyTitle = document.createElement('h3');
  historyTitle.textContent = 'Guess history';

  const historyList = document.createElement('ol');
  historyList.className = 'game__history';

  const guessInput = document.createElement('input');
  guessInput.type = 'text';
  guessInput.maxLength = gameState.settings.length;
  guessInput.autocomplete = 'off';
  guessInput.placeholder = `Enter ${gameState.settings.length} unique digits`;
  guessInput.className = 'game__input';

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Check';
  submitButton.className = 'game__submit';

  submitButton.addEventListener('click', () => {
    const guess = guessInput.value.trim();

    if (!isValidGuess(guess, gameState.settings.length, BASE_VALUES[gameState.settings.base])) {
      return;
    }

    const result = evaluateGuess(gameState.secret, guess);

    gameState = {
      ...gameState,
      history: [...gameState.history, { guess, ...result }],
    };

    const historyItem = document.createElement('li');
    historyItem.textContent = `${guess} — Bulls: ${result.bulls}, Cows: ${result.cows}`;

    historyList.append(historyItem);
  });

  container.append(
    title,
    subtitle,
    settingsInfo,
    guessInput,
    submitButton,
    historyTitle,
    historyList,
  );

  return container;
}
