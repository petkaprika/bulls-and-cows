import { countPossibleSecrets } from '../../src/logic/countPossibleSecrets';

describe('countPossibleSecrets', () => {
  test('returns the correct number of possible secrets', () => {
    const length = 2;
    const base = 10;

    expect(countPossibleSecrets(length, base)).toBe(90);
  });

  test('allows leading zeros in possible secrets', () => {
    const length = 2;
    const base = 2;

    expect(countPossibleSecrets(length, base)).toBe(2);
  });

  test('returns 0 when length is greater than base', () => {
    const length = 6;
    const base = 2;

    expect(countPossibleSecrets(length, base)).toBe(0);
  });
});
