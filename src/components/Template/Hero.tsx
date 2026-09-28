import Link from 'next/link';

import profile from '@/data/profile.json';

import ThemePortrait from './ThemePortrait';
import Voiceprint from './Voiceprint';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid">
        <div className="hero-primary">
          <h1 className="hero-title">
            <span className="hero-name">{profile.name}</span>
          </h1>

          {/* The voice AI work, signed: a waveform of the name that replays
              on hover. */}
          <Voiceprint name={profile.name} />

          <p className="hero-tagline">
            I&apos;m an {profile.role} at{' '}
            <a
              href="https://luxurypropertieshub.com"
              className="hero-highlight"
            >
              {profile.employer}
            </a>{' '}
            in Dubai, where I&apos;m the sole developer. I build production LLM
            systems, voice AI agents, workflow automation and data platforms,
            from AI calling agents to a 40M+ record property data engine.
          </p>

          <div className="hero-cta">
            <Link href="/about" className="button">
              About Me
            </Link>
            <Link href="/resume" className="hero-resume-link">
              View Resume
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="hero-portrait">
          <ThemePortrait width={320} height={320} priority />
        </div>
      </div>

      <div className="hero-bg" aria-hidden="true" />
    </section>
  );
}
