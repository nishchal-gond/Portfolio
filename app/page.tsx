import type { Metadata } from 'next';
import Link from 'next/link';

import { SchemaGraph } from '@/components/Schema';
import Hero from '@/components/Template/Hero';
import PageWrapper from '@/components/Template/PageWrapper';
import projects from '@/data/projects';
import { createHeadingId } from '@/lib/anchors';
import { HOME_URL, profilePageNode } from '@/lib/schema';
import { AUTHOR_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/utils';

export const metadata: Metadata = {
  description: SITE_DESCRIPTION,
  // The homepage builds its openGraph in the root layout, so it only needs
  // the canonical here. `trailingSlash: true` makes `/` the canonical form.
  alternates: { canonical: `${SITE_URL}/` },
};

export default function HomePage() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <PageWrapper mainClassName="page-main--hero">
      <SchemaGraph
        nodes={[profilePageNode({ url: HOME_URL, name: AUTHOR_NAME })]}
      />
      <Hero />
      {/* Reuses the home list styles originally written for writing. */}
      <section className="home-writing" aria-labelledby="home-projects-title">
        <div className="home-writing-header">
          <div>
            <span className="home-section-kicker">Selected work</span>
            <h2 id="home-projects-title">Featured projects</h2>
          </div>
          <Link href="/projects/" className="home-writing-all">
            View all
          </Link>
        </div>
        <div className="home-writing-list">
          {featured.map((project) => (
            <Link
              key={project.title}
              href={`/projects/#${createHeadingId(project.title)}`}
              className="home-writing-item"
            >
              {project.tech && (
                <span className="home-writing-meta">
                  {project.tech.slice(0, 3).join(' · ')}
                </span>
              )}
              <h3>{project.title}</h3>
              <p>{project.subtitle}</p>
            </Link>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
