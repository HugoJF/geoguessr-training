/**
 * Font-family values for the "Guess the Language" prompt. Each phrase renders in
 * a face suited to its script so non-Latin scripts don't show as tofu boxes.
 *
 * The actual @font-face declarations for the bundled scripts are imported once,
 * offline (no CDN), in `src/main.tsx` via @fontsource packages. The family names
 * below must match those packages' declared `font-family`.
 *
 * Scripts fall into three buckets:
 *  - Latin / Cyrillic / Greek → BASE_FONT_STACK (system fonts render these fine).
 *  - Dedicated bundled faces → the *_FONT consts (Noto Sans <script>).
 *  - CJK → *system* font stacks, NOT bundled. The @fontsource CJK packages are
 *    ~50-80 MB each (Noto CJK is split into ~200 unicode-range subsets × 9
 *    weights); shipping them would add ~20 MB to the Pages build. CJK faces are
 *    preinstalled on every mainstream OS, so a system stack renders correctly
 *    without the payload. This is the deliberate size tradeoff.
 */

/** Shared fallback for Latin/Cyrillic/Greek — mirrors the app's default sans. */
export const BASE_FONT_STACK =
  '"Inter", ui-sans-serif, system-ui, sans-serif';

/** Prepend a script face to the shared fallback so missing glyphs degrade well. */
const withBase = (family: string): string => `${family}, ${BASE_FONT_STACK}`;

// --- Bundled dedicated faces (see @fontsource imports in main.tsx) ---
export const ARABIC_FONT = withBase('"Noto Sans Arabic"'); // also covers Persian
export const HEBREW_FONT = withBase('"Noto Sans Hebrew"');
export const DEVANAGARI_FONT = withBase('"Noto Sans Devanagari"'); // Hindi
export const BENGALI_FONT = withBase('"Noto Sans Bengali"');
export const TAMIL_FONT = withBase('"Noto Sans Tamil"');
export const SINHALA_FONT = withBase('"Noto Sans Sinhala"');
export const THAI_FONT = withBase('"Noto Sans Thai"');
export const LAO_FONT = withBase('"Noto Sans Lao"');
export const KHMER_FONT = withBase('"Noto Sans Khmer"');
export const GEORGIAN_FONT = withBase('"Noto Sans Georgian"');
export const ARMENIAN_FONT = withBase('"Noto Sans Armenian"');

// --- CJK via system fonts (not bundled — see note above) ---
export const JAPANESE_FONT = withBase(
  '"Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic", Meiryo, "Noto Sans JP"',
);
export const KOREAN_FONT = withBase(
  '"Apple SD Gothic Neo", "Malgun Gothic", "Noto Sans KR"',
);
export const CHINESE_FONT = withBase(
  '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC"',
);
