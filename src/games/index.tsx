import type { Game } from "../lib/types.ts";
import { buildOptions, sample } from "../lib/random.ts";
import { DDDS } from "../data/ddd.ts";
import { EURO_LETTERS } from "../data/euroLetters.ts";
import { FLAGS } from "../data/flags.ts";
import { SCRIPTS } from "../data/scripts.ts";
import { DOMAINS } from "../data/domains.ts";
import { DRIVING } from "../data/driving.ts";
import { CYRILLIC } from "../data/cyrillic.ts";
import { LANGUAGES, LANGUAGE_GROUPS } from "../data/languages.ts";

const dddGame: Game = {
  id: "ddd",
  title: "Brazilian DDDs",
  description: "Map a phone area code to its state / region.",
  emoji: "📞",
  category: "Brazil",
  makeQuestion: ({ optionCount, pickItem }) => {
    const q = pickItem(DDDS, (d) => d.code);
    const pool = DDDS.map((d) => d.where);
    return {
      itemKey: q.code,
      promptLabel: "Where is this DDD?",
      prompt: q.code,
      options: buildOptions(q.where, pool, optionCount),
      answer: q.where,
      explanation: `DDD ${q.code} → ${q.state} (${q.uf}): ${q.where}.`,
    };
  },
};

const euroLetterGame: Game = {
  id: "euro-letters",
  title: "European Letters",
  description: "Special Latin letters that point to one country.",
  emoji: "🔤",
  category: "Europe",
  makeQuestion: ({ optionCount, pickItem }) => {
    const q = pickItem(EURO_LETTERS, (l) => l.glyph);
    const pool = EURO_LETTERS.map((l) => l.answer);
    return {
      itemKey: q.glyph,
      promptLabel: "Which country uses this letter?",
      prompt: q.glyph,
      options: buildOptions(q.answer, pool, optionCount),
      answer: q.answer,
      explanation: q.note,
    };
  },
};

const flagGame: Game = {
  id: "flags",
  title: "Country Flags",
  description: "Identify the country from its flag.",
  emoji: "🚩",
  category: "World",
  makeQuestion: ({ optionCount, pickItem }) => {
    const q = pickItem(FLAGS, (f) => f.country);
    const pool = FLAGS.map((f) => f.country);
    return {
      itemKey: q.country,
      promptLabel: "Which country's flag is this?",
      prompt: q.flag,
      options: buildOptions(q.country, pool, optionCount),
      answer: q.country,
      explanation: `${q.flag} ${q.country}.`,
    };
  },
};

const scriptGame: Game = {
  id: "scripts",
  title: "World Scripts",
  description: "Recognize Asian & Middle-Eastern alphabets at a glance.",
  emoji: "🈯",
  category: "Asia",
  makeQuestion: ({ optionCount, pickItem }) => {
    const q = pickItem(SCRIPTS, (s) => s.answer);
    const label = (s: (typeof SCRIPTS)[number]) => `${s.answer} — ${s.countries.join(", ")}`;
    const pool = SCRIPTS.map(label);
    return {
      itemKey: q.answer,
      promptLabel: "Which script / language is this?",
      prompt: q.sample,
      options: buildOptions(label(q), pool, optionCount),
      answer: label(q),
      explanation: q.note,
    };
  },
};

const domainGame: Game = {
  id: "domains",
  title: "Domain Suffixes",
  description: "ccTLD on a sign (.br, .pl, .za…) → country.",
  emoji: "🌐",
  category: "World",
  makeQuestion: ({ optionCount, pickItem }) => {
    const q = pickItem(DOMAINS, (d) => d.tld);
    const pool = DOMAINS.map((d) => d.country);
    return {
      itemKey: q.tld,
      promptLabel: "Which country uses this domain?",
      prompt: q.tld,
      options: buildOptions(q.country, pool, optionCount),
      answer: q.country,
      explanation: `${q.tld} → ${q.country}.`,
    };
  },
};

const drivingGame: Game = {
  id: "driving-side",
  title: "Driving Side",
  description: "Left- or right-hand traffic for a given country.",
  emoji: "🚗",
  category: "World",
  makeQuestion: ({ pickItem }) => {
    const q = pickItem(DRIVING, (d) => d.country);
    return {
      itemKey: q.country,
      promptLabel: "Which side does it drive on?",
      prompt: q.country,
      options: buildOptions(q.side, ["Left", "Right"], 2),
      answer: q.side,
      explanation: `${q.country} drives on the ${q.side.toLowerCase()} (${
        q.side === "Left" ? "wheel on the right" : "wheel on the left"
      }).`,
    };
  },
};

const cyrillicGame: Game = {
  id: "cyrillic",
  title: "Cyrillic Letters",
  description: "Exclusive Cyrillic glyphs → country (Russian = no extras).",
  emoji: "Я",
  category: "Europe",
  makeQuestion: ({ optionCount, pickItem }) => {
    const q = pickItem(CYRILLIC, (c) => c.glyph);
    const pool = CYRILLIC.map((c) => c.answer);
    return {
      itemKey: q.glyph,
      promptLabel: "Which country uses this letter?",
      prompt: q.glyph,
      options: buildOptions(q.answer, pool, optionCount),
      answer: q.answer,
      explanation: q.note,
    };
  },
};

const languageGame: Game = {
  id: "languages",
  title: "Guess the Language",
  description: "Name the language from a road/shop sign — the tell for the country.",
  emoji: "🗣️",
  category: "World",
  filterGroups: LANGUAGE_GROUPS,
  makeQuestion: ({ optionCount, pickItem, enabledGroups }) => {
    const pool = LANGUAGES.filter((l) => enabledGroups.has(l.group));
    const q = pickItem(pool, (l) => l.language);
    const phrase = sample(q.phrases);
    const label = (l: (typeof LANGUAGES)[number]) => {
      const shown = l.countries.slice(0, 3).join(", ");
      const suffix = l.countries.length > 3 ? "…" : "";
      return `${l.language} — ${shown}${suffix}`;
    };
    return {
      itemKey: q.language,
      promptLabel: "Which language is this sign?",
      prompt: <span className="text-3xl font-bold leading-snug break-words">{phrase}</span>,
      options: buildOptions(
        label(q),
        pool.map(label),
        optionCount,
      ),
      answer: label(q),
      explanation: (
        <>
          <strong>{q.language}</strong> — {q.countries.join(", ")}. {q.note}
        </>
      ),
    };
  },
};

export const GAMES: Game[] = [
  dddGame,
  euroLetterGame,
  cyrillicGame,
  flagGame,
  scriptGame,
  domainGame,
  drivingGame,
  languageGame,
];

export function getGame(id: string): Game | undefined {
  return GAMES.find((g) => g.id === id);
}
