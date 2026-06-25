/**
 * Per-item accuracy tracking, persisted in localStorage. Used to bias question
 * selection away from items the player consistently gets right ("adaptive" mode).
 */
export interface ItemStat {
  seen: number;
  correct: number;
}

type GameStats = Record<string, ItemStat>;
type AllStats = Record<string, GameStats>;

const STORAGE_KEY = "geotrainer:stats";

function loadAll(): AllStats {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") as AllStats;
  } catch {
    return {};
  }
}

function saveAll(stats: AllStats): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // Storage unavailable (private mode / quota) — keep session in-memory.
  }
}

export function recordAnswer(gameId: string, key: string, correct: boolean): void {
  const all = loadAll();
  const game = (all[gameId] ??= {});
  const stat = (game[key] ??= { seen: 0, correct: 0 });
  stat.seen += 1;
  if (correct) {
    stat.correct += 1;
  }
  saveAll(all);
}

export function getGameStats(gameId: string): GameStats {
  return loadAll()[gameId] ?? {};
}

export interface RankedItem {
  key: string;
  seen: number;
  correct: number;
  accuracy: number;
}

/** Seen items for a game, sorted worst accuracy first (what to drill). */
export function rankItems(gameId: string): RankedItem[] {
  return Object.entries(getGameStats(gameId))
    .map(([key, s]) => ({ key, seen: s.seen, correct: s.correct, accuracy: s.correct / s.seen }))
    .sort((a, b) => a.accuracy - b.accuracy || b.seen - a.seen);
}

export function resetGameStats(gameId: string): void {
  const all = loadAll();
  delete all[gameId];
  saveAll(all);
}

/**
 * Selection weight for one item. Unseen items get full weight; the more
 * reliably an item is answered correctly, the lower its weight (never 0, so
 * mastered items still resurface occasionally).
 */
function weightOf(stat: ItemStat | undefined): number {
  if (!stat || stat.seen === 0) {
    return 1;
  }
  const accuracy = stat.correct / stat.seen;
  return Math.max(0.12, 1 - 0.85 * accuracy);
}

export type ItemPicker = <T>(items: readonly T[], keyOf: (item: T) => string) => T;

/**
 * Returns an item picker. When `adaptive` is false it's a uniform random pick;
 * when true it biases toward low hit-rate / unseen items for the given game.
 */
export function makePicker(gameId: string, adaptive: boolean): ItemPicker {
  if (!adaptive) {
    return (items) => items[Math.floor(Math.random() * items.length)];
  }
  const stats = loadAll()[gameId] ?? {};
  return (items, keyOf) => {
    const weights = items.map((it) => weightOf(stats[keyOf(it)]));
    const total = weights.reduce((a, b) => a + b, 0);
    let r = Math.random() * total;
    for (let i = 0; i < items.length; i++) {
      r -= weights[i];
      if (r <= 0) {
        return items[i];
      }
    }
    return items[items.length - 1];
  };
}
