'use client';

import type { CSSProperties, MouseEvent } from 'react';

import { voiceprint } from '@/lib/voiceprint';

interface VoiceprintProps {
  name: string;
}

/**
 * Rewinds the bars' CSS entrance animation on hover. Under reduced motion the
 * stylesheet sets `animation: none`, so there is nothing to rewind and this
 * is a no-op.
 */
function replay(event: MouseEvent<HTMLDivElement>) {
  for (const animation of event.currentTarget.getAnimations({
    subtree: true,
  })) {
    animation.currentTime = 0;
    animation.play();
  }
}

/** A waveform computed from the letters of the name. Decorative. */
export default function Voiceprint({ name }: VoiceprintProps) {
  return (
    <div className="hero-voiceprint" aria-hidden="true" onMouseEnter={replay}>
      {voiceprint(name).map((height, i) => (
        <span key={i} style={{ '--h': height, '--i': i } as CSSProperties} />
      ))}
    </div>
  );
}
