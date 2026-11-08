import { generateSecret } from '../../src/logic/generateSecret';

describe('generateSecret', () => {
  test('returns a secret of the requested length', () => {
    const result = generateSecret(4, 10);

    expect(result).toHaveLength(4);
  });

  test('all symbols are valid for base 2', () => {
    const length = 2;
    const base = 2;
    const digits = ['0', '1'];

    const values = [0.3, 0.6];
    let index = 0;
    const random = () => values[index++]!;

    const result = generateSecret(length, base, random);

    expect(result.split('').every((char) => digits.includes(char))).toBe(true);
  });

  test('all symbols are valid for base 8', () => {
    const length = 4;
    const base = 8;
    const digits = ['0', '1', '2', '3', '4', '5', '6', '7'];

    const values = [0.1, 0.2, 0.6, 0.8];
    let index = 0;
    const random = () => values[index++]!;

    const result = generateSecret(length, base, random);

    expect(result.split('').every((char) => digits.includes(char))).toBe(true);
  });

  test('all symbols are valid for base 10', () => {
    const length = 4;
    const base = 10;
    const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    const values = [0.2, 0.4, 0.6, 0.8];
    let index = 0;
    const random = () => values[index++]!;

    const result = generateSecret(length, base, random);

    expect(result.split('').every((char) => digits.includes(char))).toBe(true);
  });

  test('all symbols are valid for base 16', () => {
    const length = 4;
    const base = 16;
    const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

    const values = [0.2, 0.4, 0.6, 0.8];
    let index = 0;
    const random = () => values[index++]!;

    const result = generateSecret(length, base, random);

    expect(result.split('').every((char) => digits.includes(char.toLowerCase()))).toBe(true);
  });

  test('all symbols are unique', () => {
    const length = 5;
    const base = 16;
    const values = [0, 0.2, 0.4, 0.6, 0.8];
    let index = 0;
    const random = () => values[index++]!;

    const result = generateSecret(length, base, random);
    const uniqueChars = [...new Set(result)];

    expect(uniqueChars).toHaveLength(length);
  });

  test('preserves leading zero', () => {
    const length = 4;
    const base = 10;
    const values = [0, 0.2, 0.4, 0.6];
    let index = 0;
    const random = () => values[index++]!;

    const result = generateSecret(length, base, random);

    expect(result.startsWith('0')).toBe(true);
  });
});
