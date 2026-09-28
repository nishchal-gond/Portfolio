import React from "react";
import { cn } from "@/lib/utils";
import { experience } from "@/data/experience";

const ExperienceSection = () => {
  if (experience.length === 0) return null;

  return (
    <section id="experience" className="relative z-[1] max-w-4xl mx-auto px-4 py-24">
      <h2
        className={cn(
          "bg-clip-text text-4xl text-center text-transparent md:text-7xl mb-16",
          "bg-gradient-to-b from-black/80 to-black/50",
          "dark:bg-gradient-to-b dark:from-white/80 dark:to-white/20"
        )}
      >
        EXPERIENCE
      </h2>
      <ol className="relative border-l border-zinc-700 ml-3">
        {experience.map((item) => (
          <li key={`${item.company}-${item.start}`} className="mb-12 ml-6">
            <span className="absolute -left-[7px] mt-2 h-3 w-3 rounded-full bg-zinc-300" />
            <p className="text-sm text-zinc-500">
              {item.start} – {item.end ?? "Present"}
              {item.location ? ` · ${item.location}` : ""}
            </p>
            <h3 className="mt-1 text-xl">
              {item.role} <span className="text-zinc-400">@ {item.company}</span>
            </h3>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-400 font-sans">
              {item.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            {item.skills && item.skills.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-2">
                {item.skills.map((s) => (
                  <li
                    key={s}
                    className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-300"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
};

export default ExperienceSection;
