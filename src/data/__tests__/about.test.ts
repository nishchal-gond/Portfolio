import { describe, expect, it } from 'vitest';

import { aboutMarkdown } from '../about';

describe('about data', () => {
  it('exports aboutMarkdown as a string', () => {
    expect(typeof aboutMarkdown).toBe('string');
    expect(aboutMarkdown.length).toBeGreaterThan(0);
  });

  it('contains the intro section', () => {
    expect(aboutMarkdown).toContain('# Intro');
    expect(aboutMarkdown).toContain('AI Specialist');
    expect(aboutMarkdown).toContain('Luxury Properties Hub');
  });

  it('contains the how I work section', () => {
    expect(aboutMarkdown).toContain('# How I Work');
    expect(aboutMarkdown).toContain('full delivery cycle');
  });

  it('contains the journey section', () => {
    expect(aboutMarkdown).toContain('# Journey');
    expect(aboutMarkdown).toContain('Anvaaya Healthtech');
  });

  it('contains the what I build with section', () => {
    expect(aboutMarkdown).toContain('# What I Build With');
    expect(aboutMarkdown).toContain('LangChain');
  });

  it('contains valid markdown links', () => {
    // Check for markdown link format [text](url)
    const linkRegex = /\[.+?\]\(.+?\)/g;
    const links = aboutMarkdown.match(linkRegex);

    expect(links).not.toBeNull();
    expect(links).toContain('[Get in touch](/contact)');
  });

  it('contains properly formatted headers', () => {
    // Check for markdown headers
    const headerRegex = /^#+ .+$/gm;
    const headers = aboutMarkdown.match(headerRegex);

    expect(headers).toEqual([
      '# Intro',
      '# How I Work',
      '# Journey',
      '# What I Build With',
      '# Certifications',
    ]);
  });
});
