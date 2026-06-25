/**
 * Distinctive Latin-script letters/diacritics that strongly hint at a country
 * or small set of countries on GeoGuessr (signs, plates, shop names).
 * `answer` is the single best GeoGuessr guess; `note` explains the nuance.
 */
export interface LetterClue {
  glyph: string;
  answer: string;
  note: string;
}

export const EURO_LETTERS: LetterClue[] = [
  { glyph: "ł", answer: "Poland", note: "ł (slashed L) is the Polish giveaway; also ż, ź, ś, ć, ę, ą." },
  { glyph: "ø", answer: "Denmark / Norway", note: "ø + å mean Danish or Norwegian (not Swedish, which uses ö)." },
  { glyph: "å", answer: "Norway / Sweden / Denmark", note: "Scandinavian ring-A. Pair with ø→DK/NO, ö→SE." },
  { glyph: "ß", answer: "Germany", note: "Eszett ß is German only (Austria uses it too, Switzerland does not)." },
  { glyph: "ñ", answer: "Spain", note: "ñ = Spanish (also Galician); a strong Spain marker in Europe." },
  { glyph: "ç", answer: "Portugal / France", note: "Cedilla c-cedilla; Portuguese, French, Catalan. Turkish too outside Europe." },
  { glyph: "ı", answer: "Turkey", note: "Dotless i (and İ) is Turkish; with ş, ğ, ç it's a lock." },
  { glyph: "ğ", answer: "Turkey", note: "Soft-g ğ is Turkish only." },
  { glyph: "č", answer: "Czechia / Slovenia / Croatia", note: "Háček č; Czech, Slovak, Slovene, Croatian. Pair with other háčeks." },
  { glyph: "ř", answer: "Czechia", note: "ř is essentially Czech-exclusive." },
  { glyph: "ů", answer: "Czechia", note: "ů (ring-U) is Czech only." },
  { glyph: "ľ", answer: "Slovakia", note: "ľ and ô are Slovak markers distinguishing it from Czech." },
  { glyph: "ă", answer: "Romania", note: "ă with ș, ț (comma-below) = Romanian." },
  { glyph: "ț", answer: "Romania", note: "Comma-below ț/ș is Romanian (not cedilla)." },
  { glyph: "ő", answer: "Hungary", note: "Double-acute ő and ű are uniquely Hungarian." },
  { glyph: "ű", answer: "Hungary", note: "Double-acute ű is Hungarian only." },
  { glyph: "õ", answer: "Estonia / Portugal", note: "Tilde-O: Estonian (with ä, ö, ü) or Portuguese (ã, õ)." },
  { glyph: "ė", answer: "Lithuania", note: "ė plus ų, ū, ą = Lithuanian." },
  { glyph: "ģ", answer: "Latvia", note: "Comma-below consonants ģ, ķ, ļ, ņ = Latvian; also ā, ē, ī, ū." },
  { glyph: "ð", answer: "Iceland", note: "Eth ð and thorn þ are Icelandic (þ also Faroese-ish)." },
  { glyph: "þ", answer: "Iceland", note: "Thorn þ is Icelandic." },
  { glyph: "ı̇", answer: "Turkey", note: "Dotted capital İ in lowercase context signals Turkish casing." },
];
