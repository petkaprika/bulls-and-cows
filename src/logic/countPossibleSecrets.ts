const cache = new Map<string, number>();

export function countPossibleSecrets(length: number, base: number): number {
  const key = base.toString() + ',' + length;

  const cachedResult = cache.get(key);
  if (cachedResult !== undefined) {
    return cachedResult;
  }

  if (length > base) {
    cache.set(key, 0);
    return 0;
  }

  if (length === 0) {
    cache.set(key, 1);
    return 1;
  }
  const result = base * countPossibleSecrets(length - 1, base - 1);
  cache.set(key, result);
  return result;
}
