import { describe, expect, it } from 'vitest';

import projects from '../projects';
import skillGroups from '../resume/skills';

describe('skill groups data', () => {
  it('follows the six résumé groups in résumé order', () => {
    expect(skillGroups.map((group) => group.name)).toEqual([
      'AI & LLM Systems',
      'Voice AI & Telephony',
      'Automation & Integrations',
      'Data & Databases',
      'Languages & Frameworks',
      'Cloud & DevOps',
    ]);
  });

  it('gives every group at least one skill and one project', () => {
    for (const group of skillGroups) {
      expect(group.skills.length).toBeGreaterThan(0);
      expect(group.usedIn.length).toBeGreaterThan(0);
    }
  });

  it('lists no skill twice within a group', () => {
    for (const group of skillGroups) {
      expect(new Set(group.skills).size).toBe(group.skills.length);
    }
  });

  it('only names projects that exist, so every "Used in" link lands on a card', () => {
    const titles = new Set(projects.map((project) => project.title));

    for (const group of skillGroups) {
      for (const title of group.usedIn) {
        expect(titles, `${group.name} → ${title}`).toContain(title);
      }
    }
  });
});
