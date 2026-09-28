export type Experience = {
  role: string;
  company: string;
  /** e.g. "Jan 2024" */
  start: string;
  /** Leave undefined for a current role. */
  end?: string;
  location?: string;
  /** 1–3 bullets, ideally with a measurable outcome each. */
  highlights: string[];
  skills?: string[];
};

/**
 * Newest first. The Experience section on the home page stays hidden until
 * this list has at least one entry.
 *
 * Example:
 * {
 *   role: "AI Specialist",
 *   company: "Company name",
 *   start: "Jan 2025",
 *   location: "Remote",
 *   highlights: [
 *     "Built an LLM-powered support assistant that cut response time by 40%",
 *   ],
 *   skills: ["Python", "LangChain", "AWS"],
 * },
 */
export const experience: Experience[] = [];
