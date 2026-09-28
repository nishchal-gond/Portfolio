/**
 * A deterministic "voiceprint" for a name: three bar heights per letter,
 * derived from its character code, with a quiet gap for each space and a
 * taper so the waveform fades in and out at the ends like speech.
 *
 * Deterministic on purpose — the hero renders statically, so the same name
 * must produce the same shape on every build.
 */
const MULTIPLIERS = [37, 53, 71] as const;
const SILENCE = 0.12;

export function voiceprint(name: string): number[] {
  const raw = Array.from(name).flatMap((char) => {
    if (/\s/.test(char)) return MULTIPLIERS.map(() => SILENCE);
    const code = char.codePointAt(0) ?? 0;
    return MULTIPLIERS.map((m) => 0.3 + ((code * m) % 70) / 100);
  });

  return raw.map((height, i) => {
    const envelope = 0.55 + 0.45 * Math.sin((Math.PI * (i + 0.5)) / raw.length);
    return Math.round(Math.min(1, height * envelope) * 100) / 100;
  });
}
