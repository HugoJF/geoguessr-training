import { useEffect, useState } from "react";
import { GAMES, getGame } from "./games/index.ts";
import { QuizGame } from "./components/QuizGame.tsx";
import type { Category } from "./lib/types.ts";

const CATEGORY_COLORS: Record<Category, string> = {
  Brazil: "from-green-500/20 to-yellow-500/20 border-green-700/40",
  Europe: "from-blue-500/20 to-indigo-500/20 border-blue-700/40",
  Asia: "from-rose-500/20 to-orange-500/20 border-rose-700/40",
  World: "from-cyan-500/20 to-teal-500/20 border-cyan-700/40",
};

function useHashRoute(): [string, (id: string) => void] {
  const [hash, setHash] = useState(() => window.location.hash.slice(1));
  useEffect(() => {
    const onChange = () => setHash(window.location.hash.slice(1));
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  const go = (id: string) => {
    window.location.hash = id;
  };
  return [hash, go];
}

export function App() {
  const [route, go] = useHashRoute();
  const game = getGame(route);

  if (game) {
    return <QuizGame game={game} onExit={() => go("")} />;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">🌍 GeoTrainer</h1>
        <p className="mt-2 text-neutral-400">
          Mini-games to drill GeoGuessr meta — pick a deck and start guessing.
        </p>
      </header>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GAMES.map((g) => (
          <button
            key={g.id}
            onClick={() => go(g.id)}
            className={`group flex flex-col rounded-2xl border bg-gradient-to-br ${CATEGORY_COLORS[g.category]} p-5 text-left transition hover:scale-[1.02] hover:shadow-lg hover:shadow-black/30`}
          >
            <div className="flex items-center justify-between">
              <span className="text-4xl">{g.emoji}</span>
              <span className="rounded-full bg-black/30 px-2 py-0.5 text-xs text-neutral-300">
                {g.category}
              </span>
            </div>
            <h2 className="mt-3 text-lg font-semibold">{g.title}</h2>
            <p className="mt-1 text-sm text-neutral-400">{g.description}</p>
            <span className="mt-3 text-sm font-medium text-neutral-300 group-hover:text-white">
              Play →
            </span>
          </button>
        ))}
      </div>

      <footer className="mt-12 text-center text-xs text-neutral-600">
        Frontend-only · add a game in <code className="text-neutral-400">src/games/index.ts</code>
      </footer>
    </div>
  );
}
