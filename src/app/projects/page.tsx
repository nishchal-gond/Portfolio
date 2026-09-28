import type { Metadata } from "next";
import ProjectsSection from "@/components/sections/projects";
import { config } from "@/data/config";

export const metadata: Metadata = {
  title: `Projects | ${config.author}`,
  description: `AI, automation and web projects by ${config.author}.`,
};

export default function ProjectsPage() {
  return (
    <main className="pt-16 pb-20 px-4 min-h-screen">
      <ProjectsSection />
    </main>
  );
}
