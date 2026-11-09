import { createDigitValidator } from '../../src/logic/createDigitValidator';

describe('createDigitValidator', () => {
  test('returns true for a valid digit in the given base', () => {
    const base = 2;
    const isValid = createDigitValidator(base);

    expect(isValid('1')).toBe(true);
  });

  test('returns false for an invalid digit in the given base', () => {
    const base = 2;
    const isValid = createDigitValidator(base);

    expect(isValid('2')).toBe(false);
  });

  test('accepts uppercase and lowercase hexadecimal digits', () => {
    const base = 16;
    const isValid = createDigitValidator(base);

    expect(isValid('A')).toBe(true);
    expect(isValid('a')).toBe(true);
  });

  test('returns false for a character outside the hexadecimal base', () => {
    const base = 16;
    const isValid = createDigitValidator(base);

    expect(isValid('G')).toBe(false);
  });
});
