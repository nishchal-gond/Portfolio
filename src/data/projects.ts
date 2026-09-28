import type { ProjectSkillId } from "./project-skills";

export type Project = {
  /** URL slug for /projects/[id] */
  id: string;
  title: string;
  category: string;
  /** One or two sentences, shown on the card modal and at the top of the case study. */
  summary: string;
  /** Cover image (also used for link previews). */
  src: string;
  screenshots: string[];
  skills: { frontend: ProjectSkillId[]; backend: ProjectSkillId[] };
  github?: string;
  /** Live demo URL. Leave undefined when there is no deployed demo. */
  live?: string;
  /**
   * Optional case-study sections. Each one only renders when filled in.
   * Keep it client-safe: describe the problem and trade-offs, not confidential details.
   */
  caseStudy?: {
    problem?: string;
    approach?: string[];
    tradeoffs?: string[];
    outcome?: string;
  };
};

const shot = (id: string) => `/assets/projects-screenshots/${id}/1.png`;

export const projects: Project[] = [
  {
    id: "smartride-manager",
    title: "SmartRide Manager",
    category: "Mobile App",
    summary:
      "Cross-platform React Native + Expo app for tracking bike maintenance, backed by Firebase.",
    src: shot("smartride-manager"),
    screenshots: [shot("smartride-manager")],
    skills: { frontend: ["reactNative"], backend: ["firebase"] },
    github: "https://github.com/Rio2802/SmartRideManager",
  },
  {
    id: "jade",
    title: "J.A.D.E",
    category: "AI & Automation",
    summary: "AI-based assistant that uses NLP to automate everyday tasks.",
    src: shot("jade"),
    screenshots: [shot("jade")],
    skills: { frontend: [], backend: ["python"] },
    github: "https://github.com/Rio2802/J.A.D.E",
  },
  {
    id: "ipfs-img-upload",
    title: "IPFS IMG Upload",
    category: "Web3",
    summary:
      "Image uploader that stores files on IPFS, the decentralised file system.",
    src: shot("ipfs-img-upload"),
    screenshots: [shot("ipfs-img-upload")],
    skills: { frontend: ["js", "web3"], backend: [] },
    github: "https://github.com/Rio2802/DecentFile",
  },
  {
    id: "edubot",
    title: "EDUBot",
    category: "AI & Education",
    summary:
      "Retrieval-augmented generation (RAG) chatbot for interactive learning.",
    src: shot("edubot"),
    screenshots: [shot("edubot")],
    skills: { frontend: [], backend: ["python"] },
    github: "https://github.com/Rio2802/EDUBot",
  },
  {
    id: "chat-with-pdf",
    title: "Chat With PDF",
    category: "AI & NLP",
    summary:
      "RAG application for chatting with PDF documents, using the Amazon Titan embedding model and a FAISS vector store.",
    src: shot("chat-with-pdf"),
    screenshots: [shot("chat-with-pdf")],
    skills: { frontend: [], backend: ["python", "aws"] },
    github: "https://github.com/Rio2802/ChatWithPDF",
    caseStudy: {
      problem:
        "Long PDFs are slow to search by hand, and keyword search misses answers that are phrased differently from the question.",
      approach: [
        "Admin flow: upload a PDF, split it into chunks, embed each chunk with Amazon Titan and store the vectors in FAISS.",
        "User flow: embed the question, retrieve the most similar chunks, and pass them to an LLM as context for the answer.",
      ],
    },
  },
  {
    id: "portfolio",
    title: "Portfolio",
    category: "Web Development",
    summary:
      "This site: Next.js, TypeScript and Tailwind, with a 3D Spline keyboard of my skills, GSAP/Framer Motion animations, an AI assistant and a Resend-powered contact form.",
    src: shot("portfolio"),
    screenshots: [shot("portfolio")],
    skills: {
      frontend: ["next", "ts", "tailwind", "gsap", "framerMotion", "spline"],
      backend: [],
    },
    live: "https://nishchalgond.vercel.app",
    github: "https://github.com/nishchal-gond/Portfolio",
    caseStudy: {
      problem:
        "A portfolio has to show personality without getting in the way: load fast, work on any device, and make the important things (projects, contact) easy to reach.",
      approach: [
        "Next.js App Router with Server Components for content and client islands for the interactive pieces.",
        "A Spline 3D keyboard whose keycaps are my skills, animated with GSAP ScrollTrigger as you move between sections.",
        "Accessibility fallbacks: the 3D scene, particles and custom cursor turn off for prefers-reduced-motion, and the skills are also available as text.",
        "A grounded AI assistant that answers questions about my work, plus a rate-limited contact form.",
      ],
      tradeoffs: [
        "The 3D scene is heavy, so it sits behind an error boundary: if it fails to load, the site still works.",
      ],
    },
  },
];

export const getProject = (id: string) => projects.find((p) => p.id === id);

export default projects;
