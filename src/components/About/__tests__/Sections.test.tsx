import { render, screen, waitFor, within } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { aboutMarkdown } from '@/data/about';
import { createHeadingId } from '@/lib/anchors';
import AboutContent from '../Sections';

function getActualSectionTitles(markdown: string) {
  return Array.from(markdown.matchAll(/^# (.+)$/gm))
    .map((match) => match[1])
    .filter((title) => title !== 'Intro');
}

describe('AboutContent', () => {
  it('renders intro copy without an Intro heading', () => {
    render(
      <AboutContent
        markdown={`# Intro

Hello from the intro.

# Some History

- Built a thing.`}
      />,
    );

    expect(screen.getByText('Hello from the intro.')).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Intro' }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Some History' }),
    ).toBeInTheDocument();
  });

  it('assigns section variants for log and compact sections', () => {
    const { container } = render(
      <AboutContent
        markdown={`# Intro

Lead paragraph.

# Journey

- In 2023, started something.

# How I Work

- Carefully.

# What I Build With

- Tools.

# Other

- Plain.`}
      />,
    );

    const sections = container.querySelectorAll('.about-section');

    expect(sections).toHaveLength(4);
    expect(sections[0]).toHaveClass('about-section--log');
    expect(sections[1]).toHaveClass('about-section--compact');
    expect(sections[2]).toHaveClass('about-section--compact');
    expect(sections[3]).toHaveClass('about-section');
    expect(sections[3].className).toBe('about-section');
  });

  it('adds stable heading ids for deep links', () => {
    render(
      <AboutContent
        markdown={`# Intro

Lead paragraph.

# Some History

- Built a thing.

# Travel / Geography

- Went somewhere.`}
      />,
    );

    expect(
      screen.getByRole('heading', { name: 'Some History' }),
    ).toHaveAttribute('id', 'some-history');
    expect(
      screen.getByRole('heading', { name: 'Travel / Geography' }),
    ).toHaveAttribute('id', 'travel-geography');
  });

  it('renders section navigation and self-links for the real about markdown', () => {
    const sectionTitles = getActualSectionTitles(aboutMarkdown);
    const { container } = render(<AboutContent markdown={aboutMarkdown} />);
    const nav = screen.getByRole('navigation', { name: 'About sections' });

    expect(within(nav).getAllByRole('link')).toHaveLength(sectionTitles.length);

    for (const title of sectionTitles) {
      const headingId = createHeadingId(title);
      const heading = screen.getByRole('heading', { name: title });

      expect(heading).toHaveAttribute('id', headingId);
      expect(within(nav).getByRole('link', { name: title })).toHaveAttribute(
        'href',
        `#${headingId}`,
      );
      expect(
        container.querySelector(`h2#${headingId} > a[href="#${headingId}"]`),
      ).toBeTruthy();
    }
  });

  it('renders matching hash links and heading ids into static markup', () => {
    const html = renderToStaticMarkup(
      <AboutContent markdown={aboutMarkdown} />,
    );

    expect(html).toContain('href="#journey"');
    expect(html).toContain('id="journey"');
    expect(html).toContain('href="#how-i-work"');
    expect(html).toContain('id="how-i-work"');
  });

  it('supports same-page hash navigation from section links', async () => {
    window.history.replaceState({}, '', '/about/');

    render(<AboutContent markdown={aboutMarkdown} />);

    const nav = screen.getByRole('navigation', { name: 'About sections' });
    const navLink = within(nav).getByRole('link', {
      name: 'How I Work',
    });

    navLink.click();

    await waitFor(() => {
      expect(window.location.hash).toBe('#how-i-work');
    });
    expect(document.querySelector(window.location.hash)).toHaveTextContent(
      'How I Work',
    );

    const heading = screen.getByRole('heading', { name: 'What I Build With' });
    const permalink = within(heading).getByRole('link', {
      name: 'What I Build With',
    });

    permalink.click();

    await waitFor(() => {
      expect(window.location.hash).toBe('#what-i-build-with');
    });
    expect(document.querySelector(window.location.hash)).toHaveTextContent(
      'What I Build With',
    );
  });
});
