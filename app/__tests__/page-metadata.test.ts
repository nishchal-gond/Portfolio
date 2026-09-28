import { describe, expect, it } from 'vitest';

import profile from '@/data/profile.json';
import { AUTHOR_NAME, SHARE_IMAGE_PATH, SITE_URL } from '@/lib/utils';
import { metadata as aboutMetadata } from '../about/page';
import { metadata as contactMetadata } from '../contact/page';
import { metadata as notFoundMetadata } from '../not-found';
import { metadata as projectsMetadata } from '../projects/page';
import { metadata as resumeMetadata } from '../resume/page';

describe('page metadata', () => {
  it('builds the contact description from the shared profile email', () => {
    expect(contactMetadata.description).toContain(profile.email);
  });

  it.each([
    ['about', aboutMetadata, `${SITE_URL}/about/`],
    ['contact', contactMetadata, `${SITE_URL}/contact/`],
    ['projects', projectsMetadata, `${SITE_URL}/projects/`],
    ['resume', resumeMetadata, `${SITE_URL}/resume/`],
  ])('sets page-specific open graph metadata for %s', (_, metadata, url) => {
    expect(metadata.openGraph?.url).toBe(url);
    expect(metadata.openGraph?.description).toBe(metadata.description);
    expect(metadata.openGraph?.title).toBe(
      `${metadata.title} | ${AUTHOR_NAME}`,
    );
  });

  it.each([
    ['about', aboutMetadata],
    ['contact', contactMetadata],
    ['projects', projectsMetadata],
    ['resume', resumeMetadata],
  ])('sets page-specific twitter metadata for %s', (_, metadata) => {
    expect(metadata.twitter?.description).toBe(metadata.description);
    expect(metadata.twitter?.title).toBe(`${metadata.title} | ${AUTHOR_NAME}`);
  });

  /**
   * A route-level `openGraph` object replaces the inherited one entirely, so
   * every page that declares one must repeat the share image. Blog posts
   * shipped without an og:image for exactly this reason.
   */
  it.each([
    ['about', aboutMetadata],
    ['contact', contactMetadata],
    ['projects', projectsMetadata],
    ['resume', resumeMetadata],
    ['404', notFoundMetadata],
  ])('declares the share card on %s', (_, metadata) => {
    const ogImages = metadata.openGraph?.images;
    expect(JSON.stringify(ogImages)).toContain(SHARE_IMAGE_PATH);
    expect(JSON.stringify(metadata.twitter?.images)).toContain(
      SHARE_IMAGE_PATH,
    );
  });

  /**
   * `alternates` carries the canonical, and like `openGraph` it is replaced
   * rather than merged — the writing index lost its canonical by declaring
   * RSS types on top of it.
   */
  it.each([
    ['about', aboutMetadata, `${SITE_URL}/about/`],
    ['contact', contactMetadata, `${SITE_URL}/contact/`],
    ['projects', projectsMetadata, `${SITE_URL}/projects/`],
    ['resume', resumeMetadata, `${SITE_URL}/resume/`],
  ])('declares a canonical url for %s', (_, metadata, url) => {
    expect(metadata.alternates?.canonical).toBe(url);
  });

  it('omits the canonical on 404, which has no stable url', () => {
    expect(notFoundMetadata.alternates?.canonical).toBeUndefined();
  });

  it('overrides 404 share metadata without inventing a canonical url', () => {
    expect(notFoundMetadata.openGraph?.url).toBeUndefined();
    expect(notFoundMetadata.openGraph?.description).toBe(
      notFoundMetadata.description,
    );
    expect(notFoundMetadata.openGraph?.title).toBe(
      `${notFoundMetadata.title} | ${AUTHOR_NAME}`,
    );
    expect(notFoundMetadata.twitter?.description).toBe(
      notFoundMetadata.description,
    );
    expect(notFoundMetadata.twitter?.title).toBe(
      `${notFoundMetadata.title} | ${AUTHOR_NAME}`,
    );
  });
});
