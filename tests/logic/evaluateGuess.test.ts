import { evaluateGuess } from '../../src/logic/evaluateGuess';

describe('evaluateGuess', () => {
  test('all digits match', () => {
    const result = evaluateGuess('1234', '1234');

    expect(result).toEqual({ bulls: 4, cows: 0 });
  });

  test('all digits are guessed, but none is in the right position', () => {
    const result = evaluateGuess('1234', '4321');

    expect(result).toEqual({ bulls: 0, cows: 4 });
  });

  test('some digits are bulls and some are cows', () => {
    const result = evaluateGuess('1234', '1243');

    expect(result).toEqual({ bulls: 2, cows: 2 });
  });

  test('only bulls', () => {
    const result = evaluateGuess('1234', '1256');

    expect(result).toEqual({ bulls: 2, cows: 0 });
  });

  test('only cows', () => {
    const result = evaluateGuess('1234', '3456');

    expect(result).toEqual({ bulls: 0, cows: 2 });
  });

  test('no matching digits', () => {
    const result = evaluateGuess('1234', '5678');

    expect(result).toEqual({ bulls: 0, cows: 0 });
  });

  test('hexadecimal digits are case-insensitive', () => {
    const result = evaluateGuess('abcd', 'ABCD');

    expect(result).toEqual({ bulls: 4, cows: 0 });
  });
});
