/**
 * Writing systems at a glance — pick the script/region from a sample glyph.
 * Based on the "identify Asian/African/Middle-Eastern alphabets" cheat-sheet.
 * `countries` lists the main places you'd see it on GeoGuessr.
 */
export interface ScriptClue {
  sample: string;
  answer: string;
  countries: string[];
  note: string;
}

export const SCRIPTS: ScriptClue[] = [
  { sample: "한국어", answer: "Korean (Hangul)", countries: ["South Korea", "North Korea"], note: "Circles + ovals inside square blocks. ㅇ ㅎ rings are the tell." },
  { sample: "ひらがな", answer: "Japanese (Hiragana)", countries: ["Japan"], note: "Curvy, rounded; mixed with kanji and angular katakana." },
  { sample: "カタカナ", answer: "Japanese (Katakana)", countries: ["Japan"], note: "Sharp, angular strokes; used for foreign words." },
  { sample: "汉字", answer: "Chinese (Hanzi)", countries: ["China", "Taiwan", "Singapore"], note: "Dense square characters, no kana mixed in → Chinese not Japanese." },
  { sample: "ภาษาไทย", answer: "Thai", countries: ["Thailand"], note: "Loops/curls on letters, no spaces between words." },
  { sample: "ລາວ", answer: "Lao", countries: ["Laos"], note: "Like Thai but rounder and simpler — fewer spikes." },
  { sample: "ខ្មែរ", answer: "Khmer (Cambodia)", countries: ["Cambodia"], note: "Tall, ornate, lots of subscript curls." },
  { sample: "မြန်မာ", answer: "Burmese (Myanmar)", countries: ["Myanmar"], note: "Made of circles — 'bubble' script." },
  { sample: "தமிழ்", answer: "Tamil", countries: ["India (Tamil Nadu)", "Sri Lanka", "Singapore"], note: "Rounded with loops; South India & Sri Lanka." },
  { sample: "हिन्दी", answer: "Hindi (Devanagari)", countries: ["India", "Nepal"], note: "Horizontal top bar connecting letters." },
  { sample: "বাংলা", answer: "Bengali", countries: ["Bangladesh", "India (West Bengal)"], note: "Top bar like Devanagari but more curved, triangular forms." },
  { sample: "ქართული", answer: "Georgian", countries: ["Georgia"], note: "Rounded, looping, no capitals — unique to Georgia." },
  { sample: "Հայերեն", answer: "Armenian", countries: ["Armenia"], note: "Angular with hooks; unique to Armenia." },
  { sample: "Ελληνικά", answer: "Greek", countries: ["Greece", "Cyprus"], note: "Familiar math symbols: Σ Δ Ω Φ." },
  { sample: "Кириллица", answer: "Cyrillic (Russia & Slavic)", countries: ["Russia", "Ukraine", "Bulgaria", "Serbia", "Kazakhstan", "Mongolia"], note: "Backwards-R (Я), Ж, Д; Slavic + Central Asia." },
  { sample: "עברית", answer: "Hebrew", countries: ["Israel"], note: "Blocky, sits on the line, right-to-left." },
  { sample: "العربية", answer: "Arabic", countries: ["Saudi Arabia", "Egypt", "UAE", "Morocco", "Jordan", "Iraq"], note: "Flowing connected cursive with dots; right-to-left." },
  { sample: "ਪੰਜਾਬੀ", answer: "Punjabi (Gurmukhi)", countries: ["India (Punjab)"], note: "Top bar with distinctive open loops." },
  { sample: "සිංහල", answer: "Sinhala (Sri Lanka)", countries: ["Sri Lanka"], note: "Very round, ornate curls." },
  { sample: "ગુજરાતી", answer: "Gujarati", countries: ["India (Gujarat)"], note: "Like Devanagari but WITHOUT the top bar." },
];
