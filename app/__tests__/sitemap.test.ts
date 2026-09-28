import { describe, expect, it } from 'vitest';

import { SITE_URL } from '@/lib/utils';
import sitemap from '../sitemap';

describe('sitemap', () => {
  it('uses trailing slashes for exported page routes', () => {
    const entries = sitemap();

    expect(entries.map((entry) => entry.url)).toEqual([
      `${SITE_URL}/`,
      `${SITE_URL}/about/`,
      `${SITE_URL}/resume/`,
      `${SITE_URL}/projects/`,
      `${SITE_URL}/contact/`,
    ]);
  });

  it('does not invent modification dates for static pages', () => {
    expect(sitemap().every((entry) => entry.lastModified === undefined)).toBe(
      true,
    );
  });
});
