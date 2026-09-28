import { describe, expect, it } from 'vitest';

import { voiceprint } from '../voiceprint';

describe('voiceprint', () => {
  it('gives three bars per character', () => {
    expect(voiceprint('Nishchal Gond')).toHaveLength(13 * 3);
  });

  it('is deterministic, so static builds always render the same shape', () => {
    expect(voiceprint('Nishchal Gond')).toEqual(voiceprint('Nishchal Gond'));
  });

  it('keeps every bar visible and within the track', () => {
    for (const height of voiceprint('Nishchal Gond')) {
      expect(height).toBeGreaterThan(0);
      expect(height).toBeLessThanOrEqual(1);
    }
  });

  it('drops to a quiet gap between words', () => {
    const bars = voiceprint('a b');
    expect(Math.max(...bars.slice(3, 6))).toBeLessThan(
      Math.min(...bars.slice(0, 3)),
    );
  });
});
