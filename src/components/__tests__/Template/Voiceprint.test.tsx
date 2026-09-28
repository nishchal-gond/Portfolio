import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Voiceprint from '@/components/Template/Voiceprint';

describe('Voiceprint', () => {
  it('renders one decorative bar per voiceprint value', () => {
    const { container } = render(<Voiceprint name="Nishchal Gond" />);
    const wave = container.querySelector('.hero-voiceprint');

    expect(wave).toHaveAttribute('aria-hidden', 'true');
    expect(wave?.children).toHaveLength(39);
  });

  it('rewinds and replays the bar animations on hover', () => {
    const { container } = render(<Voiceprint name="Nishchal Gond" />);
    const wave = container.querySelector('.hero-voiceprint') as HTMLElement;
    const animation = { currentTime: 400, play: vi.fn() };
    // jsdom has no Web Animations API, so stand in for the running animations.
    wave.getAnimations = vi.fn(() => [animation as unknown as Animation]);

    fireEvent.mouseEnter(wave);

    expect(wave.getAnimations).toHaveBeenCalledWith({ subtree: true });
    expect(animation.currentTime).toBe(0);
    expect(animation.play).toHaveBeenCalledOnce();
  });

  it('does nothing on hover when motion is reduced and nothing is animating', () => {
    const { container } = render(<Voiceprint name="Nishchal Gond" />);
    const wave = container.querySelector('.hero-voiceprint') as HTMLElement;
    wave.getAnimations = vi.fn(() => []);

    expect(() => fireEvent.mouseEnter(wave)).not.toThrow();
  });
});
