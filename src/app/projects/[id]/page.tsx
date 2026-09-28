import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import projects, { getProject } from "@/data/projects";
import { PROJECT_SKILLS } from "@/data/project-skills";
import ProjectLinks from "@/components/projects/project-links";
import { config } from "@/data/config";

type Props = { params: { id: string } };

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = getProject(params.id);
  if (!project) return {};
  return {
    title: `${project.title} | ${config.author}`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: {
      title: `${project.title} | ${config.author}`,
      description: project.summary,
      images: [{ url: project.src }],
    },
  };
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mt-12">
    <h2 className="text-2xl mb-4">{title}</h2>
    <div className="text-zinc-400 font-sans leading-relaxed">{children}</div>
  </section>
);

export default function ProjectPage({ params }: Props) {
  const project = getProject(params.id);
  if (!project) notFound();

  const stack = [...project.skills.frontend, ...project.skills.backend].map(
    (id) => PROJECT_SKILLS[id]
  );
  const cs = project.caseStudy;

  return (
    <main className="container mx-auto max-w-3xl px-4 pt-28 pb-24 text-zinc-300">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300"
      >
        <ArrowLeft className="h-4 w-4" /> All projects
      </Link>

      <p className="mt-8 text-sm text-zinc-500">{project.category}</p>
      <h1 className="text-4xl md:text-6xl mt-2">{project.title}</h1>
      <p className="mt-6 text-lg text-zinc-400 font-sans">{project.summary}</p>

      <ProjectLinks project={project} />

      <Image
        src={project.src}
        alt={`Screenshot of ${project.title}`}
        width={1200}
        height={800}
        priority
        className="w-full h-auto rounded-xl border border-zinc-800"
      />

      {stack.length > 0 && (
        <Section title="Stack">
          <ul className="flex flex-wrap gap-3">
            {stack.map((skill) => (
              <li
                key={skill.title}
                className="flex items-center gap-2 rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-200"
              >
                <span className="h-4 w-4 [&>*]:h-4 [&>*]:w-4">{skill.icon}</span>
                {skill.title}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {cs?.problem && (
        <Section title="The problem">
          <p>{cs.problem}</p>
        </Section>
      )}
      {cs?.approach && cs.approach.length > 0 && (
        <Section title="Approach">
          <ul className="list-disc space-y-2 pl-5">
            {cs.approach.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </Section>
      )}
      {cs?.tradeoffs && cs.tradeoffs.length > 0 && (
        <Section title="Trade-offs">
          <ul className="list-disc space-y-2 pl-5">
            {cs.tradeoffs.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </Section>
      )}
      {cs?.outcome && (
        <Section title="Outcome">
          <p>{cs.outcome}</p>
        </Section>
      )}
    </main>
  );
}
