export function isValidGuess(guess: string, length: number, base: number): boolean {
  if (guess.length !== length) {
    return false;
  }

  const digits = guess.toLowerCase().split('');

  const uniqueDigits = new Set(digits);

  if (uniqueDigits.size !== length) {
    return false;
  }

  return digits.every((value) => {
    const digit = parseInt(value, base);
    const isValid = !Number.isNaN(digit) && digit >= 0 && digit < base;

    return isValid;
  });
}
