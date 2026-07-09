import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// Bundled, offline-safe script faces for the language game (weight 400; the
// prompt's bold is browser-synthesised). CJK is intentionally NOT bundled — see
// src/data/fonts.ts for the size tradeoff.
import "@fontsource/noto-sans-arabic";
import "@fontsource/noto-sans-hebrew";
import "@fontsource/noto-sans-devanagari";
import "@fontsource/noto-sans-bengali";
import "@fontsource/noto-sans-tamil";
import "@fontsource/noto-sans-sinhala";
import "@fontsource/noto-sans-thai";
import "@fontsource/noto-sans-lao";
import "@fontsource/noto-sans-khmer";
import "@fontsource/noto-sans-georgian";
import "@fontsource/noto-sans-armenian";
import { App } from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
