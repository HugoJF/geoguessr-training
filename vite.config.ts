import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Relative base so assets resolve under the project-pages path
  // (hugojf.github.io/geoguessr-training/); hash routing needs no server rewrites.
  base: "./",
  plugins: [react(), tailwindcss()],
});
