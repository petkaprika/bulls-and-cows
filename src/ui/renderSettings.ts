import type { GameSettings, NumberSystem } from '../types/GameSettings';

export function renderSettings(onStart: (settings: GameSettings) => void): HTMLElement {
  const container = document.createElement('main');
  container.className = 'settings';

  const settings: GameSettings = {
    base: 'dec',
    length: 4,
  };

  const title = document.createElement('h1');
  title.textContent = 'Bulls and Cows';

  const subtitle = document.createElement('h2');
  subtitle.textContent = 'Game settings';

  const baseGroup = document.createElement('section');
  baseGroup.className = 'settings__group';

  const baseTitle = document.createElement('h3');
  baseTitle.textContent = 'Number system';

  const baseOptions = document.createElement('div');
  baseOptions.className = 'settings__options';

  const bases: NumberSystem[] = ['bin', 'oct', 'dec', 'hex'];
  const baseButtons: HTMLButtonElement[] = [];

  bases.forEach((base) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = base;
    button.className = 'settings__option';

    if (base === settings.base) {
      button.classList.add('settings__option_selected');
    }

    button.addEventListener('click', () => {
      settings.base = base;

      if (base === 'bin') {
        settings.length = 2;
      }

      updateSettings();
    });

    baseButtons.push(button);
    baseOptions.append(button);
  });

  baseGroup.append(baseTitle, baseOptions);

  const lengthGroup = document.createElement('section');
  lengthGroup.className = 'settings__group';

  const lengthTitle = document.createElement('h3');
  lengthTitle.textContent = 'Secret number length';

  const lengthOptions = document.createElement('div');
  lengthOptions.className = 'settings__options';

  const lengthButtons: HTMLButtonElement[] = [];

  for (let length = 2; length <= 6; length += 1) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = String(length);
    button.className = 'settings__option';

    if (length === settings.length) {
      button.classList.add('settings__option_selected');
    }

    button.addEventListener('click', () => {
      settings.length = length;
      updateSettings();
    });

    lengthButtons.push(button);
    lengthOptions.append(button);
  }

  lengthGroup.append(lengthTitle, lengthOptions);

  const startButton = document.createElement('button');
  startButton.type = 'button';
  startButton.textContent = 'Start game';
  startButton.className = 'settings__start';

  startButton.addEventListener('click', () => {
    onStart({ ...settings });
  });

  function updateSettings(): void {
    baseButtons.forEach((button) => {
      button.classList.toggle('settings__option_selected', button.textContent === settings.base);
    });

    lengthButtons.forEach((button) => {
      const length = Number(button.textContent);

      button.classList.toggle('settings__option_selected', length === settings.length);

      button.disabled = settings.base === 'bin' && length !== 2;
    });
  }

  updateSettings();

  container.append(title, subtitle, baseGroup, lengthGroup, startButton);

  return container;
}
