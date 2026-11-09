import { isValidGuess } from '../../src/logic/isValidGuess';

describe('isValidGuess', () => {
  test('returns true for a valid guess', () => {
    const guess = '1234';
    const length = 4;
    const base = 10;

    const result = isValidGuess(guess, length, base);

    expect(result).toBe(true);
  });

  test('returns false when the guess has an incorrect length', () => {
    const guess = '1234';
    const length = 5;
    const base = 10;

    const result = isValidGuess(guess, length, base);

    expect(result).toBe(false);
  });

  test('returns false when the guess contains invalid digits', () => {
    const guess = '12A34';
    const length = 5;
    const base = 10;

    const result = isValidGuess(guess, length, base);

    expect(result).toBe(false);
  });

  test('returns false when the guess contains duplicate digits', () => {
    const guess = '12234';
    const length = 5;
    const base = 10;

    const result = isValidGuess(guess, length, base);

    expect(result).toBe(false);
  });
});
