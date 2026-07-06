import type { ReactNode } from "react";
import type { ItemPicker } from "./stats.ts";

export type Category = "Brazil" | "Europe" | "Asia" | "World";

export interface QuizConfig {
  /** Desired number of multiple-choice options (games may clamp). */
  optionCount: number;
  /** Picks the item to quiz; biased toward weak items when adaptive is on. */
  pickItem: ItemPicker;
  /** Enabled filter groups; empty/unused for games without `filterGroups`. */
  enabledGroups: ReadonlySet<string>;
}

export interface QuizQuestion {
  /** Stable identity of the quizzed item, used for per-item accuracy stats. */
  itemKey: string;
  /** Small label shown above the prompt, e.g. "Which country uses this letter?" */
  promptLabel: string;
  /** The big focal content of the question (a letter, flag, DDD number, …). */
  prompt: ReactNode;
  /** Multiple-choice options. Must include `answer`. */
  options: string[];
  /** The correct option. */
  answer: string;
  /** Shown after the user answers. */
  explanation?: ReactNode;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  emoji: string;
  category: Category;
  /** Ordered filter-group labels; when set the sidebar shows a toggle per group. */
  filterGroups?: string[];
  /** Returns a fresh randomized question each call. */
  makeQuestion: (config: QuizConfig) => QuizQuestion;
}
