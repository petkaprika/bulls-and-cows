export function createDigitValidator(base: number): (char: string) => boolean {
  return (char: string): boolean => {
    const digit = parseInt(char.toLowerCase(), base);

    return !Number.isNaN(digit) && digit >= 0 && digit < base;
  };
}
