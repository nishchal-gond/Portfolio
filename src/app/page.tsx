import React from "react";
import SmoothScroll from "@/components/smooth-scroll";
import AnimatedBackground from "@/components/animated-background";
import MotionGate from "@/components/motion-gate";
import SkillsSection from "@/components/sections/skills";
import ProjectsSection from "@/components/sections/projects";
import ContactSection from "@/components/sections/contact";
import HeroSection from "@/components/sections/hero";
import ExperienceSection from "@/components/sections/experience";

// Server Component: the sections below are client islands where they need to be.
export default function MainPage() {
  return (
    <SmoothScroll>
      <main className="bg-slate-100 dark:bg-transparent">
        <div className="top-0 z-0 fixed w-full h-screen">
          <MotionGate>
            <AnimatedBackground />
          </MotionGate>
        </div>
        <HeroSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </SmoothScroll>
  );
}
