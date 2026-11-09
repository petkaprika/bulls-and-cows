import { createDigitValidator } from './createDigitValidator.js';

export function isValidGuess(guess: string, length: number, base: number): boolean {
  if (guess.length !== length) {
    return false;
  }

  const digits = guess.toLowerCase().split('');

  const uniqueDigits = new Set(digits);

  if (uniqueDigits.size !== length) {
    return false;
  }

  const validator = createDigitValidator(base);

  return digits.every((value) => validator(value));
}
