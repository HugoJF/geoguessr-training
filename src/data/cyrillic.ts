/**
 * Cyrillic letters that are (near-)exclusive to one language → country.
 * Key nuance: Russian has NO unique letter — it's "Cyrillic with none of these
 * extras". So you pin the others by their special glyphs and infer Russian by
 * absence. Letters shared across several languages list the realistic set.
 */
export interface CyrillicClue {
  glyph: string;
  answer: string;
  note: string;
}

export const CYRILLIC: CyrillicClue[] = [
  { glyph: "Ў", answer: "Belarus", note: "Short-U (Ў) is Belarusian only — a hard lock." },
  { glyph: "Ґ", answer: "Ukraine", note: "G-with-upturn (Ґ) is Ukrainian." },
  { glyph: "Ї", answer: "Ukraine", note: "Yi (Ї) is Ukrainian only." },
  { glyph: "Є", answer: "Ukraine", note: "Reversed-E (Є) is Ukrainian." },
  { glyph: "І", answer: "Ukraine / Belarus", note: "Dotted-I (І): Ukrainian or Belarusian, not modern Russian." },
  { glyph: "Ђ", answer: "Serbia", note: "Đ (Ђ) is Serbian." },
  { glyph: "Ћ", answer: "Serbia", note: "Ć (Ћ) is Serbian." },
  { glyph: "Љ", answer: "Serbia / North Macedonia", note: "Lj (Љ) — Serbian or Macedonian." },
  { glyph: "Њ", answer: "Serbia / North Macedonia", note: "Nj (Њ) — Serbian or Macedonian." },
  { glyph: "Џ", answer: "Serbia / North Macedonia", note: "Dž (Џ) — Serbian or Macedonian." },
  { glyph: "Ј", answer: "Serbia / North Macedonia", note: "Latin-looking J (Ј) — Serbian or Macedonian." },
  { glyph: "Ѓ", answer: "North Macedonia", note: "Ǵ (Ѓ) is Macedonian-specific." },
  { glyph: "Ќ", answer: "North Macedonia", note: "Ḱ (Ќ) is Macedonian-specific." },
  { glyph: "Ѕ", answer: "North Macedonia", note: "Dz (Ѕ, looks like Latin S) is Macedonian." },
  { glyph: "Ъ", answer: "Bulgaria", note: "Hard-sign (Ъ) is a common letter in Bulgarian; rare/silent in Russian." },
  { glyph: "Ә", answer: "Kazakhstan", note: "Ä (Ә) — Kazakh (also Tatar/Bashkir)." },
  { glyph: "Қ", answer: "Kazakhstan", note: "Q (Қ) is Kazakh." },
  { glyph: "Ң", answer: "Kazakhstan", note: "Ng (Ң) is Kazakh." },
  { glyph: "Ғ", answer: "Kazakhstan", note: "Ğ (Ғ) is Kazakh." },
  { glyph: "Ұ", answer: "Kazakhstan", note: "Ū (Ұ, barred-U) is Kazakh." },
  { glyph: "Ү", answer: "Kazakhstan / Mongolia", note: "Ü (Ү) — Kazakh or Mongolian." },
  { glyph: "Ө", answer: "Kazakhstan / Mongolia", note: "Ö (Ө) — Kazakh or Mongolian." },
  { glyph: "Һ", answer: "Kazakhstan", note: "H (Һ) is Kazakh." },
];
