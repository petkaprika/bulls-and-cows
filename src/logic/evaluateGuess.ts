export function evaluateGuess(secret: string, guess: string): { bulls: number; cows: number } {
  const copySecret = secret.toLowerCase();
  const guessDigits = guess.split('');

  const bulls: number = guessDigits.reduce(
    (count: number, char: string, index: number) =>
      char.toLowerCase() === copySecret[index] ? count + 1 : count,
    0,
  );

  const cows: number = guessDigits.reduce(
    (count: number, char: string, index: number) =>
      copySecret.includes(char.toLowerCase()) && copySecret.indexOf(char.toLowerCase()) !== index
        ? count + 1
        : count,
    0,
  );

  return { bulls, cows };
}
