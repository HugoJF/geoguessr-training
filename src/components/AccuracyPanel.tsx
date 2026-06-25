import { useMemo } from "react";
import { rankItems, resetGameStats } from "../lib/stats.ts";

interface Props {
  gameId: string;
  /** Bumped after each answer so the ranking recomputes from storage. */
  version: number;
  onReset: () => void;
}

export function AccuracyPanel({ gameId, version, onReset }: Props) {
  const ranked = useMemo(() => rankItems(gameId), [gameId, version]);

  return (
    <aside className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 lg:w-72 lg:shrink-0">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-neutral-200">Accuracy</h2>
        {ranked.length > 0 && (
          <button
            onClick={() => {
              resetGameStats(gameId);
              onReset();
            }}
            className="text-xs text-neutral-500 transition hover:text-neutral-300"
          >
            Reset
          </button>
        )}
      </div>

      {ranked.length === 0 ? (
        <p className="mt-3 text-xs text-neutral-500">
          Answer a few to build your ranking. Weakest items show first.
        </p>
      ) : (
        <ul className="mt-3 max-h-[60vh] space-y-1.5 overflow-y-auto pr-1">
          {ranked.map((item) => {
            const pct = Math.round(item.accuracy * 100);
            const hue =
              pct >= 80 ? "text-emerald-400" : pct >= 50 ? "text-amber-400" : "text-rose-400";
            return (
              <li key={item.key} className={`text-xs ${hue}`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-neutral-300" title={item.key}>
                    {item.key}
                  </span>
                  <span className="shrink-0 font-medium tabular-nums">
                    {pct}%
                    <span className="ml-1 text-neutral-600">({item.correct}/{item.seen})</span>
                  </span>
                </div>
                <div className="mt-1 h-1 rounded-full bg-neutral-800">
                  <div
                    className="h-1 rounded-full bg-current opacity-70"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </aside>
  );
}
