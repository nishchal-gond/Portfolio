import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";

const ProjectLinks = ({
  project,
  caseStudy = false,
}: {
  project: Project;
  /** Also show a link to the /projects/[id] page. */
  caseStudy?: boolean;
}) => (
  <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
    {caseStudy && (
      <Link href={`/projects/${project.id}`}>
        <Button variant="outline" size="sm">
          Read case study
        </Button>
      </Link>
    )}
    {project.live && (
      <Link href={project.live} target="_blank" rel="noopener noreferrer">
        <Button size="sm">
          Visit Website
          <ArrowUpRight className="ml-3 w-5 h-5" />
        </Button>
      </Link>
    )}
    {project.github && (
      <Link href={project.github} target="_blank" rel="noopener noreferrer">
        <Button size="sm">
          GitHub
          <ArrowUpRight className="ml-3 w-5 h-5" />
        </Button>
      </Link>
    )}
  </div>
);

export default ProjectLinks;
