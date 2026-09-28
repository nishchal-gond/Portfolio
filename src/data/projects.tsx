import AceTernityLogo from "@/components/logos/aceternity";
import { Button } from "@/components/ui/button";
import { TypographyP } from "@/components/ui/typography";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { RiNextjsFill, RiNodejsFill, RiReactjsFill } from "react-icons/ri";
import {
  SiChakraui,
  SiDocker,
  SiExpress,
  SiFirebase,
  SiJavascript,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReactquery,
  SiSanity,
  SiShadcnui,
  SiSocketdotio,
  SiSupabase,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVuedotjs,
  SiVite,
  SiNetlify,
  SiHtml5,
  SiCss3,
  SiBootstrap,
  SiApachemaven,
  SiCplusplus,
  SiArduino,
  SiTensorflow,
  SiPytorch,
  SiFlask,
  SiMysql,
  SiPhp,
  SiWeb3Dotjs,
  SiAmazonaws,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { TbBrandFramerMotion } from "react-icons/tb";
const BASE_PATH = "/assets/projects-screenshots";

const ProjectsLinks = ({ live, repo }: { live?: string; repo?: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      {live && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener noreferrer"
          target="_blank"
          href={live}
        >
          <Button variant={"default"} size={"sm"}>
            Visit Website
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
      {repo && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener noreferrer"
          target="_blank"
          href={repo}
        >
          <Button variant={"default"} size={"sm"}>
            GitHub
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};
const PROJECT_SKILLS = {
  next: {
    title: "Next.js",
    bg: "black",
    fg: "white",
    icon: <RiNextjsFill />,
  },
  chakra: {
    title: "Chakra UI",
    bg: "black",
    fg: "white",
    icon: <SiChakraui />,
  },
  node: {
    title: "Node.js",
    bg: "black",
    fg: "white",
    icon: <RiNodejsFill />,
  },
  python: {
    title: "Python",
    bg: "black",
    fg: "white",
    icon: <SiPython />,
  },
  prisma: {
    title: "prisma",
    bg: "black",
    fg: "white",
    icon: <SiPrisma />,
  },
  postgres: {
    title: "PostgreSQL",
    bg: "black",
    fg: "white",
    icon: <SiPostgresql />,
  },
  mongo: {
    title: "MongoDB",
    bg: "black",
    fg: "white",
    icon: <SiMongodb />,
  },
  express: {
    title: "Express",
    bg: "black",
    fg: "white",
    icon: <SiExpress />,
  },
  reactQuery: {
    title: "React Query",
    bg: "black",
    fg: "white",
    icon: <SiReactquery />,
  },
  shadcn: {
    title: "ShanCN UI",
    bg: "black",
    fg: "white",
    icon: <SiShadcnui />,
  },
  aceternity: {
    title: "Aceternity",
    bg: "black",
    fg: "white",
    icon: <AceTernityLogo />,
  },
  tailwind: {
    title: "Tailwind",
    bg: "black",
    fg: "white",
    icon: <SiTailwindcss />,
  },
  docker: {
    title: "Docker",
    bg: "black",
    fg: "white",
    icon: <SiDocker />,
  },
  yjs: {
    title: "Y.js",
    bg: "black",
    fg: "white",
    icon: (
      <span>
        <strong>Y</strong>js
      </span>
    ),
  },
  firebase: {
    title: "Firebase",
    bg: "black",
    fg: "white",
    icon: <SiFirebase />,
  },
  sockerio: {
    title: "Socket.io",
    bg: "black",
    fg: "white",
    icon: <SiSocketdotio />,
  },
  js: {
    title: "JavaScript",
    bg: "black",
    fg: "white",
    icon: <SiJavascript />,
  },
  ts: {
    title: "TypeScript",
    bg: "black",
    fg: "white",
    icon: <SiTypescript />,
  },
  vue: {
    title: "Vue.js",
    bg: "black",
    fg: "white",
    icon: <SiVuedotjs />,
  },
  react: {
    title: "React.js",
    bg: "black",
    fg: "white",
    icon: <RiReactjsFill />,
  },
  sanity: {
    title: "Sanity",
    bg: "black",
    fg: "white",
    icon: <SiSanity />,
  },
  spline: {
    title: "Spline",
    bg: "black",
    fg: "white",
    icon: <SiThreedotjs />,
  },
  gsap: {
    title: "GSAP",
    bg: "black",
    fg: "white",
    icon: "",
  },
  framerMotion: {
    title: "Framer Motion",
    bg: "black",
    fg: "white",
    icon: <TbBrandFramerMotion />,
  },
  supabase: {
    title: "Supabase",
    bg: "black",
    fg: "white",
    icon: <SiSupabase />,
  },
  // +
  vite: {
    title: "Vite",
    bg: "black",
    fg: "white",
    icon: <SiVite />,
  },
  openai: {
    title: "OpenAI",
    bg: "black",
    fg: "white",
    icon: <Image src="/assets/icons/openai-svgrepo-com_white.svg" alt="OpenAI" width={24} height={24} className="w-full h-full" />,
  },
  netlify: {
    title: "Netlify",
    bg: "black",
    fg: "white",
    icon: <SiNetlify />,
  },
  html: {
    title: "HTML5",
    bg: "black",
    fg: "white",
    icon: <SiHtml5 />,
  },
  css: {
    title: "CSS3",
    bg: "black",
    fg: "white",
    icon: <SiCss3 />,
  },
  bootstrap: {
    title: "Bootstrap",
    bg: "black",
    fg: "white",
    icon: <SiBootstrap />,
  },
  maven: {
    title: "Maven",
    bg: "black",
    fg: "white",
    icon: <SiApachemaven />,
  },
  java: {
    title: "Java",
    bg: "black",
    fg: "white",
    icon: <Image src="/assets/icons/icons8-java.svg" alt="Java" width={24} height={24} className="w-full h-full" />,
  },
  cplusplus: {
    title: "C++",
    bg: "black",
    fg: "white",
    icon: <SiCplusplus />,
  },
  arduino: {
    title: "Arduino",
    bg: "black",
    fg: "white",
    icon: <SiArduino />,
  },
  tensorflow: {
    title: "TensorFlow",
    bg: "black",
    fg: "white",
    icon: <SiTensorflow />,
  },
  pytorch: {
    title: "PyTorch",
    bg: "black",
    fg: "white",
    icon: <SiPytorch />,
  },
  flask: {
    title: "Flask",
    bg: "black",
    fg: "white",
    icon: <SiFlask />,
  },
  sql: {
    title: "SQL",
    bg: "black",
    fg: "white",
    icon: <SiMysql />,
  },
  php: {
    title: "PHP",
    bg: "black",
    fg: "white",
    icon: <SiPhp />,
  },
  web3: {
    title: "Web3.js",
    bg: "black",
    fg: "white",
    icon: <SiWeb3Dotjs />,
  },
  reactNative: {
    title: "React Native",
    bg: "black",
    fg: "white",
    icon: <TbBrandReactNative />,
  },
  aws: {
    title: "AWS",
    bg: "black",
    fg: "white",
    icon: <SiAmazonaws />,
  },
};
export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  github?: string;
  /** Live demo URL. Leave undefined when there is no deployed demo. */
  live?: string;
};

const projects: Project[] = [
  {
    id: "smartride-manager",
    category: "Mobile App",
    title: "SmartRide Manager",
    src: "/assets/projects-screenshots/smartride-manager/1.png",
    screenshots: ["/assets/projects-screenshots/smartride-manager/1.png"],
    skills: {
      frontend: [PROJECT_SKILLS.reactNative],
      backend: [PROJECT_SKILLS.firebase],
    },
    github: "https://github.com/Rio2802/SmartRideManager",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            React Native + Firebase app for bike maintenance tracking
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
        </div>
      );
    },
  },
  {
    id: "jade",
    category: "AI & Automation",
    title: "J.A.D.E",
    src: "/assets/projects-screenshots/jade/1.png",
    screenshots: ["/assets/projects-screenshots/jade/1.png"],
    skills: {
      frontend: [],
      backend: [PROJECT_SKILLS.python],
    },
    github: "https://github.com/Rio2802/J.A.D.E",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            AI-based assistant leveraging NLP for automation
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
        </div>
      );
    },
  },
  {
    id: "ipfs-img-upload",
    category: "Web3",
    title: "IPFS IMG Upload",
    src: "/assets/projects-screenshots/ipfs-img-upload/1.png",
    screenshots: ["/assets/projects-screenshots/ipfs-img-upload/1.png"],
    skills: {
      frontend: [PROJECT_SKILLS.js, PROJECT_SKILLS.web3],
      backend: [],
    },
    github: "https://github.com/Rio2802/DecentFile",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            IPFS-based secure image uploader
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
        </div>
      );
    },
  },
  {
    id: "edubot",
    category: "AI & Education",
    title: "EDUBot",
    src: "/assets/projects-screenshots/edubot/1.png",
    screenshots: ["/assets/projects-screenshots/edubot/1.png"],
    skills: {
      frontend: [],
      backend: [PROJECT_SKILLS.python],
    },
    github: "https://github.com/Rio2802/EDUBot",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            RAG chatbot for interactive learning
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
        </div>
      );
    },
  },
  {
    id: "chat-with-pdf",
    category: "AI & NLP",
    title: "Chat With PDF",
    src: "/assets/projects-screenshots/chat-with-pdf/1.png",
    screenshots: ["/assets/projects-screenshots/chat-with-pdf/1.png"],
    skills: {
      frontend: [],
      backend: [PROJECT_SKILLS.python, PROJECT_SKILLS.aws],
    },
    github: "https://github.com/Rio2802/ChatWithPDF",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            RAG-based application for chatting with PDF documents using Titan Embedding Model and FAISS.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
        </div>
      );
    },
  },
  {
    id: "portfolio",
    category: "Web Development",
    title: "Portfolio",
    src: "/assets/projects-screenshots/portfolio/1.png",
    screenshots: ["/assets/projects-screenshots/portfolio/1.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.next,
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.tailwind,
        PROJECT_SKILLS.gsap,
        PROJECT_SKILLS.framerMotion,
        PROJECT_SKILLS.spline,
      ],
      backend: [],
    },
    live: "https://nishchalgond.vercel.app",
    github: "https://github.com/nishchal-gond/Portfolio",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            This site: Next.js, TypeScript and Tailwind, with a 3D Spline
            keyboard of my skills, GSAP/Framer Motion animations and a contact
            form powered by Resend.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
        </div>
      );
    },
  },
];
export default projects;
