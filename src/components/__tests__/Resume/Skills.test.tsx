import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { SkillGroup } from '@/data/resume/skills';

import Skills from '../../Resume/Skills';

const groups: SkillGroup[] = [
  {
    name: 'Voice AI & Telephony',
    skills: ['Retell AI', 'LiveKit Agents'],
    usedIn: ['AI Voice Calling Agents', 'JUNO'],
  },
  {
    name: 'Data & Databases',
    skills: ['PostgreSQL'],
    usedIn: ['Property Ledger', 'Chat with PDF', 'LPH Sales Display System'],
  },
];

describe('Skills', () => {
  it('renders the section heading and one heading per group', () => {
    render(<Skills groups={groups} />);

    expect(
      screen.getByRole('heading', { level: 2, name: 'Skills' }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent),
    ).toEqual(['Voice AI & Telephony', 'Data & Databases']);
  });

  it('lists every skill in its group as a list item', () => {
    render(<Skills groups={groups} />);

    const voice = screen
      .getByRole('heading', { name: 'Voice AI & Telephony' })
      .closest('section') as HTMLElement;

    expect(
      within(voice)
        .getAllByRole('listitem')
        .map((li) => li.textContent),
    ).toEqual(['Retell AI', 'LiveKit Agents']);
  });

  it('links each project to its card on the projects page', () => {
    render(<Skills groups={groups} />);

    // The test router drops the trailing slash that the static build keeps.
    expect(
      screen
        .getByRole('link', { name: 'AI Voice Calling Agents' })
        .getAttribute('href'),
    ).toMatch(/^\/projects\/?#ai-voice-calling-agents$/);
    expect(
      screen
        .getByRole('link', { name: 'LPH Sales Display System' })
        .getAttribute('href'),
    ).toMatch(/^\/projects\/?#lph-sales-display-system$/);
  });

  it('joins project names as a readable sentence', () => {
    const { container } = render(<Skills groups={groups} />);
    const proofs = [...container.querySelectorAll('.skill-group-proof')].map(
      (p) => p.textContent,
    );

    expect(proofs).toEqual([
      'Used in AI Voice Calling Agents and JUNO',
      'Used in Property Ledger, Chat with PDF and LPH Sales Display System',
    ]);
  });

  it('carries no self-rated proficiency', () => {
    const { container } = render(<Skills groups={groups} />);

    expect(container.textContent).not.toMatch(/out of|proficiency/i);
  });
});
