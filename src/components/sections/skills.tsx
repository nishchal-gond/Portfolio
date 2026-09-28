import Link from "next/link";
import React from "react";
import { BoxReveal } from "../reveal-animations";
import { cn } from "@/lib/utils";
import { SKILLS } from "@/data/constants";
import MotionGate from "../motion-gate";

const skills = Object.values(SKILLS);

// Shown instead of the 3D keyboard when the user prefers reduced motion.
const SkillsGrid = () => (
  <ul aria-hidden="true" className="mx-auto mt-16 grid max-w-4xl grid-cols-3 gap-4 px-4 sm:grid-cols-4 md:grid-cols-6">
    {skills.map((skill) => (
      <li
        key={skill.name}
        className="flex flex-col items-center gap-2 rounded-lg border border-zinc-700/60 p-3 text-center text-xs"
        title={skill.shortDescription}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- external SVG icons */}
        <img src={skill.icon} alt="" width={32} height={32} loading="lazy" />
        {skill.label}
      </li>
    ))}
  </ul>
);

const SkillsSection = () => {
  return (
    <section id="skills" className="w-full min-h-screen md:h-[150dvh]">
      <div className="top-[70px] sticky mb-96">
        <Link href={"#skills"}>
          <BoxReveal width="100%">
            <h2
              className={cn(
                "bg-clip-text text-4xl text-center text-transparent md:text-7xl",
                "bg-gradient-to-b from-black/80 to-black/50",
                "dark:bg-gradient-to-b dark:from-white/80 dark:to-white/20 dark:bg-opacity-50 "
              )}
            >
              SKILLS
            </h2>
          </BoxReveal>
        </Link>
        {/* The skills live on the 3D keyboard; give screen readers (and crawlers) a text version. */}
        <ul className="sr-only" aria-label="Skills">
          {skills.map((skill) => (
            <li key={skill.name}>{skill.label}</li>
          ))}
        </ul>
        <MotionGate fallback={<SkillsGrid />}>{null}</MotionGate>
      </div>
    </section>
  );
};

export default SkillsSection;
