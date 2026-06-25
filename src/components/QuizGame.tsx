import { useCallback, useState } from "react";
import type { Game, QuizQuestion } from "../lib/types.ts";
import { makePicker, recordAnswer } from "../lib/stats.ts";
import { AccuracyPanel } from "./AccuracyPanel.tsx";

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

export function QuizGame({ game, onExit }: Props) {
  const [optionCount, setOptionCount] = useState(loadOptionCount);
  const [adaptive, setAdaptive] = useState(() => localStorage.getItem(ADAPTIVE_KEY) === "1");

  // Fresh picker per question so it reflects the latest stored stats.
  const build = useCallback(
    (count: number, adaptiveOn: boolean): QuizQuestion =>
      game.makeQuestion({ optionCount: count, pickItem: makePicker(game.id, adaptiveOn) }),
    [game],
  );

  const [question, setQuestion] = useState<QuizQuestion>(() => build(optionCount, adaptive));
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [streak, setStreak] = useState(0);
  const [statsVersion, setStatsVersion] = useState(0);

  const changeOptionCount = useCallback(
    (n: number) => {
      setOptionCount(n);
      localStorage.setItem(OPTIONS_KEY, String(n));
      setQuestion(build(n, adaptive));
      setPicked(null);
    },
    [build, adaptive],
  );

  const toggleAdaptive = useCallback(() => {
    setAdaptive((prev) => {
      const nextVal = !prev;
      localStorage.setItem(ADAPTIVE_KEY, nextVal ? "1" : "0");
      setQuestion(build(optionCount, nextVal));
      setPicked(null);
      return nextVal;
    });
  }, [build, optionCount]);

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
    setQuestion(build(optionCount, adaptive));
    setPicked(null);
  }, [build, optionCount, adaptive]);

  return (
    <div className="mx-auto flex min-h-dvh max-w-5xl flex-col gap-6 px-4 py-6 lg:flex-row lg:items-start">
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

      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-2xl">
          <span>{game.emoji}</span>
          <h1 className="text-xl font-semibold">{game.title}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-neutral-400">
          <div className="flex items-center gap-1.5">
            <span className="mr-1">Options</span>
            {OPTION_CHOICES.map((n) => (
              <button
                key={n}
                onClick={() => changeOptionCount(n)}
                className={`h-7 w-7 rounded-lg border text-sm font-medium transition ${
                  n === optionCount
                    ? "border-indigo-500 bg-indigo-600 text-white"
                    : "border-neutral-700 bg-neutral-800/60 hover:border-neutral-500"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <button
            onClick={toggleAdaptive}
            title="Show items you miss more often; down-weight ones you reliably get right."
            className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 font-medium transition ${
              adaptive
                ? "border-emerald-500 bg-emerald-600/20 text-emerald-300"
                : "border-neutral-700 bg-neutral-800/60 hover:border-neutral-500"
            }`}
          >
            <span>{adaptive ? "✓" : "○"}</span> Adaptive
          </button>
        </div>
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
