import type { GameSettings } from '../types/GameSettings';
import type { GameState } from '../types/GameState';

import { BASE_VALUES } from '../constants.js';
import { countPossibleSecrets } from '../logic/countPossibleSecrets.js';
import { evaluateGuess } from '../logic/evaluateGuess.js';
import { generateSecret } from '../logic/generateSecret.js';
import { isValidGuess } from '../logic/isValidGuess.js';

export function renderGame(settings: GameSettings, onNewGame: () => void): HTMLElement {
  const container = document.createElement('main');
  container.className = 'game';

  const secret = generateSecret(settings.length, BASE_VALUES[settings.base]);
  let gameState: GameState = {
    settings,
    secret,
    history: [],
  };

  const startTime = Date.now();

  const title = document.createElement('h1');
  title.textContent = 'Bulls and Cows';

  const subtitle = document.createElement('h2');
  subtitle.textContent = 'Game in progress';

  const settingsInfo = document.createElement('p');
  settingsInfo.textContent = `Number system: ${settings.base.toUpperCase()}, digits: ${settings.length}`;

  const possibleGuessesInfo = document.createElement('p');
  possibleGuessesInfo.textContent = `Possible unique guesses: ${countPossibleSecrets(
    settings.length,
    BASE_VALUES[settings.base],
  ).toLocaleString()}`;

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

  const newGameButton = document.createElement('button');
  newGameButton.type = 'button';
  newGameButton.textContent = 'New Game';
  newGameButton.className = 'game__new-game';

  newGameButton.addEventListener('click', onNewGame);

  submitButton.addEventListener('click', () => {
    const guess = guessInput.value.trim();

    if (!isValidGuess(guess, gameState.settings.length, BASE_VALUES[gameState.settings.base])) {
      return;
    }

    const alreadyTried = gameState.history.some(
      (entry) => entry.guess.toLowerCase() === guess.toLowerCase(),
    );

    if (alreadyTried) {
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

    guessInput.value = '';

    if (result.bulls === gameState.settings.length) {
      subtitle.textContent = 'You won!';
      subtitle.classList.add('game__subtitle_won');

      const attempts = gameState.history.length;
      const endTime = Math.floor((Date.now() - startTime) / 1000);

      const resultInfo = document.createElement('p');
      resultInfo.className = 'game__result-info';
      resultInfo.textContent = `Attempts: ${attempts} | Time: ${endTime} seconds`;

      container.append(resultInfo);

      guessInput.disabled = true;
      submitButton.disabled = true;
    }
  });

  container.append(
    title,
    subtitle,
    settingsInfo,
    possibleGuessesInfo,
    guessInput,
    submitButton,
    newGameButton,
    historyTitle,
    historyList,
  );

  return container;
}
