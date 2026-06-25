export function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function sample<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Pick `n` distinct items at random. */
export function pickN<T>(arr: readonly T[], n: number): T[] {
  return shuffle(arr).slice(0, n);
}

/**
 * Build a multiple-choice option set: the correct value plus `n-1` distinct
 * distractors drawn from `pool`, shuffled.
 */
export function buildOptions(correct: string, pool: readonly string[], n = 4): string[] {
  const distractors = pickN(
    [...new Set(pool)].filter((x) => x !== correct),
    n - 1,
  );
  return shuffle([correct, ...distractors]);
}
