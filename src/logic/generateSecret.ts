export function generateSecret(length: number, base: number, random = Math.random): string {
  const digits: string[] = [];

  while (digits.length !== length) {
    const char = Math.floor(random() * base).toString(base);

    if (!digits.includes(char)) {
      digits.push(char);
    }
  }

  return digits.join('');
}
