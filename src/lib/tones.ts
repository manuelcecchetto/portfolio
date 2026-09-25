/** Pastel tones shared by tiles, cards and inner-page hero bands (see tokens.css). */
export const TONES = ["mint", "peach", "butter", "rose", "lavender"] as const;
export type Tone = (typeof TONES)[number];

/**
 * Tone for the entry at `index` of a displayed list. Cycling by position keeps
 * neighbours distinct; detail pages look up the same index so a card and its
 * page share a color.
 */
export function toneAt(index: number): Tone {
  return TONES[((index % TONES.length) + TONES.length) % TONES.length] ?? TONES[0];
}
