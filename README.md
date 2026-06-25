# 🌍 GeoTrainer

Frontend-only collection of mini-games to drill GeoGuessr meta-knowledge.

## Games

| Game | What it trains |
|------|----------------|
| 📞 Brazilian DDDs | Phone area code → state / region |
| 🔤 European Letters | Special Latin letters (ł, ß, č, ğ…) → country |
| 🚩 Country Flags | Flag → country |
| 🈯 World Scripts | Asian / Middle-Eastern alphabets at a glance |

## Develop

```bash
bun install
bun run dev        # vite dev server
bun run build      # typecheck + production build
bun run typecheck
```

## Deploy

Pushing to `main` builds with Bun and publishes to GitHub Pages via
`.github/workflows/deploy.yml`. Live at
<https://hugojf.github.io/geoguessr-training/>.

## Add a game

Each game is a `Game` object with a `makeQuestion()` that returns one randomized
multiple-choice round. The shared `QuizGame` engine renders it.

1. Add a dataset under `src/data/`.
2. Define a `Game` in `src/games/index.ts` and push it into `GAMES`.

That's it — it shows up on the home grid and gets a `#<id>` route automatically.

```ts
const myGame: Game = {
  id: "my-game",
  title: "My Game",
  description: "…",
  emoji: "🧭",
  category: "World",
  makeQuestion: () => ({
    promptLabel: "Question?",
    prompt: "shown big",
    options: buildOptions(answer, pool), // answer + 3 distractors, shuffled
    answer,
    explanation: "why",
  }),
};
```

## Stack

Vite · React 19 · TypeScript · Tailwind CSS v4. No backend.
