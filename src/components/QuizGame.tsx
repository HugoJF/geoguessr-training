import { useCallback, useState } from "react";
import type { Game, QuizQuestion } from "../lib/types.ts";
import { makePicker, recordAnswer } from "../lib/stats.ts";
import { AccuracyPanel } from "./AccuracyPanel.tsx";
import { GameSidebar } from "./GameSidebar.tsx";

interface Props {
  game: Game;
  onExit: () => void;
}

const OPTION_CHOICES = [2, 3, 4, 5, 6];
const OPTIONS_KEY = "geotrainer:optionCount";
const ADAPTIVE_KEY = "geotrainer:adaptive";

function loadOptionCount(): number {
  const stored = Number(localStorage.getItem(OPTIONS_KEY));
  return OPTION_CHOICES.includes(stored) ? stored : 4;
}

function groupsKey(gameId: string): string {
  return `geotrainer:groups:${gameId}`;
}

/** Enabled groups for a game: persisted subset of its filter groups, or all. */
function loadGroups(game: Game): Set<string> {
  const all = game.filterGroups ?? [];
  if (all.length === 0) {
    return new Set();
  }
  try {
    const stored = JSON.parse(localStorage.getItem(groupsKey(game.id)) ?? "null") as unknown;
    if (Array.isArray(stored)) {
      const valid = stored.filter((g): g is string => all.includes(g as string));
      if (valid.length > 0) {
        return new Set(valid);
      }
    }
  } catch {
    // fall through to default
  }
  return new Set(all);
}

function saveGroups(gameId: string, groups: ReadonlySet<string>): void {
  try {
    localStorage.setItem(groupsKey(gameId), JSON.stringify([...groups]));
  } catch {
    // Storage unavailable — keep session in-memory.
  }
}

export function QuizGame({ game, onExit }: Props) {
  const [optionCount, setOptionCount] = useState(loadOptionCount);
  const [adaptive, setAdaptive] = useState(() => localStorage.getItem(ADAPTIVE_KEY) === "1");
  const [enabledGroups, setEnabledGroups] = useState<Set<string>>(() => loadGroups(game));

  // Fresh picker per question so it reflects the latest stored stats.
  const build = useCallback(
    (count: number, adaptiveOn: boolean, groups: ReadonlySet<string>): QuizQuestion =>
      game.makeQuestion({
        optionCount: count,
        pickItem: makePicker(game.id, adaptiveOn),
        enabledGroups: groups,
      }),
    [game],
  );

  const [question, setQuestion] = useState<QuizQuestion>(() =>
    build(optionCount, adaptive, enabledGroups),
  );
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [streak, setStreak] = useState(0);
  const [statsVersion, setStatsVersion] = useState(0);

  const changeOptionCount = useCallback(
    (n: number) => {
      setOptionCount(n);
      localStorage.setItem(OPTIONS_KEY, String(n));
      setQuestion(build(n, adaptive, enabledGroups));
      setPicked(null);
    },
    [build, adaptive, enabledGroups],
  );

  const toggleAdaptive = useCallback(() => {
    setAdaptive((prev) => {
      const nextVal = !prev;
      localStorage.setItem(ADAPTIVE_KEY, nextVal ? "1" : "0");
      setQuestion(build(optionCount, nextVal, enabledGroups));
      setPicked(null);
      return nextVal;
    });
  }, [build, optionCount, enabledGroups]);

  const toggleGroup = useCallback(
    (group: string) => {
      setEnabledGroups((prev) => {
        const next = new Set(prev);
        if (next.has(group)) {
          if (next.size === 1) {
            return prev; // block-last: at least one group stays on
          }
          next.delete(group);
        } else {
          next.add(group);
        }
        saveGroups(game.id, next);
        setQuestion(build(optionCount, adaptive, next));
        setPicked(null);
        return next;
      });
    },
    [build, optionCount, adaptive, game.id],
  );

  const selectAllGroups = useCallback(() => {
    const all = new Set(game.filterGroups ?? []);
    saveGroups(game.id, all);
    setEnabledGroups(all);
    setQuestion(build(optionCount, adaptive, all));
    setPicked(null);
  }, [build, optionCount, adaptive, game.id, game.filterGroups]);

  const answered = picked !== null;

  const pick = useCallback(
    (option: string) => {
      if (answered) {
        return;
      }
      setPicked(option);
      setTotal((t) => t + 1);
      const correct = option === question.answer;
      recordAnswer(game.id, question.itemKey, correct);
      setStatsVersion((v) => v + 1);
      if (correct) {
        setScore((s) => s + 1);
        setStreak((s) => s + 1);
      } else {
        setStreak(0);
      }
    },
    [answered, question.answer, question.itemKey, game.id],
  );

  const next = useCallback(() => {
    setQuestion(build(optionCount, adaptive, enabledGroups));
    setPicked(null);
  }, [build, optionCount, adaptive, enabledGroups]);

  return (
    <div className="mx-auto flex min-h-dvh max-w-6xl flex-col gap-6 px-4 py-6 lg:flex-row lg:items-start">
      <GameSidebar
        optionChoices={OPTION_CHOICES}
        optionCount={optionCount}
        onOptionCount={changeOptionCount}
        adaptive={adaptive}
        onToggleAdaptive={toggleAdaptive}
        filterGroups={game.filterGroups}
        enabledGroups={enabledGroups}
        onToggleGroup={toggleGroup}
        onSelectAllGroups={selectAllGroups}
      />

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between">
          <button
            onClick={onExit}
            className="rounded-lg px-3 py-1.5 text-sm text-neutral-400 transition hover:bg-neutral-800 hover:text-neutral-100"
          >
            ← All games
          </button>
          <div className="flex gap-4 text-sm text-neutral-400">
            <span>
              Score <span className="font-semibold text-neutral-100">{score}/{total}</span>
            </span>
            <span>
              Streak <span className="font-semibold text-emerald-400">{streak}🔥</span>
            </span>
          </div>
        </header>

        <div className="mt-2 flex items-center gap-2 text-2xl">
          <span>{game.emoji}</span>
          <h1 className="text-xl font-semibold">{game.title}</h1>
        </div>

        <div className="mt-8 flex flex-1 flex-col">
          <p className="text-center text-sm uppercase tracking-wide text-neutral-500">
            {question.promptLabel}
          </p>
          <div className="mt-4 flex min-h-32 items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900/60 p-8">
            <span className="text-center text-6xl font-bold leading-tight">{question.prompt}</span>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {question.options.map((opt) => {
              const isAnswer = opt === question.answer;
              const isPicked = opt === picked;
              let cls =
                "border-neutral-700 bg-neutral-800/60 hover:border-neutral-500 hover:bg-neutral-800";
              if (answered && isAnswer) {
                cls = "border-emerald-500 bg-emerald-500/15 text-emerald-200";
              } else if (answered && isPicked) {
                cls = "border-rose-500 bg-rose-500/15 text-rose-200";
              } else if (answered) {
                cls = "border-neutral-800 bg-neutral-900/40 text-neutral-500";
              }
              return (
                <button
                  key={opt}
                  onClick={() => pick(opt)}
                  disabled={answered}
                  className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${cls}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {answered && (
            <div className="mt-6 rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
              <p
                className={`font-semibold ${picked === question.answer ? "text-emerald-400" : "text-rose-400"}`}
              >
                {picked === question.answer ? "Correct!" : `Nope — ${question.answer}`}
              </p>
              {question.explanation && (
                <p className="mt-1 text-sm text-neutral-400">{question.explanation}</p>
              )}
              <button
                onClick={next}
                className="mt-4 w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-500"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>

      <AccuracyPanel
        gameId={game.id}
        version={statsVersion}
        onReset={() => setStatsVersion((v) => v + 1)}
      />
    </div>
  );
}
