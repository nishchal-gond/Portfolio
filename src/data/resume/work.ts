/**
 * Conforms to https://jsonresume.org/schema/
 */
export interface Position {
  name: string;
  position: string;
  url?: string;
  startDate: string;
  endDate?: string;
  summary?: string;
  highlights?: string[];
}

const work: Position[] = [
  {
    name: 'Luxury Properties Hub',
    position: 'AI Specialist',
    url: 'https://luxurypropertieshub.com',
    startDate: '2026-07-01',
    summary: `Sole developer at a Dubai real estate brokerage, building AI calling agents,
    n8n pipelines and a 40M+ record property data engine.`,
    highlights: [
      'Own the full delivery cycle for every in-house system: requirements, architecture, build, release and support.',
      'Run the self-hosted production stack (Docker, n8n, PostgreSQL) with logging, retries and alerting so unattended jobs fail safely.',
      'Scope, demo and roll out automation with sales, marketing and management, with docs for non-technical users.',
    ],
  },
  {
    name: 'Anvaaya Healthtech',
    position: 'Software Engineer – AI/ML',
    startDate: '2025-11-01',
    endDate: '2026-05-01',
    highlights: [
      'Integrated an AI chatbot improving response time ~35%; built AI modules improving data accuracy ~25%.',
      'Led an architecture migration that cut page load time ~40% and supported AI adoption across teams.',
    ],
  },
  {
    name: 'BTB Academy',
    position: 'Full Stack & AI Developer (Freelance)',
    startDate: '2025-05-01',
    endDate: '2026-03-01',
    highlights: [
      'Built a trading academy platform end to end (CRM, LMS, PAMM portal and trading journal) with live MT4/MT5 WebSocket feeds.',
      'Shipped iteratively with the business, adding modules, broker integrations and UX improvements as the academy grew.',
      'Built an AI investor-outreach pipeline (Anthropic API) and role-based PAMM module with automated profit distribution.',
    ],
  },
  {
    name: 'Remote Client Projects, Dubai & India',
    position: 'Backend & AI Assistant Developer',
    startDate: '2023-01-01',
    endDate: '2025-08-01',
    highlights: [
      'Built 3+ AI-assisted client platforms using LLMs, RAG pipelines and vector search, deployed as containerised services on AWS.',
      'Delivered secure REST APIs (JWT auth, validation, rate limiting) and documentation for client handover.',
    ],
  },
];

export default work;
