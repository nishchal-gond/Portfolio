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
    summary: `I build and own the AI and automation layer at a Dubai real estate brokerage:
    production systems handling real property data, real calls and real client outreach.`,
    highlights: [
      'Designed the "Property Ledger", unifying government (DLD), developer and CRM datasets into one searchable source of truth, with schema mapping, entity matching and de-duplication across tens of millions of records in PostgreSQL.',
      'Shipped an internal platform with global search, record detail views, batch import history and analytics dashboards.',
      'Deployed outbound conversational voice agents (Retell AI + SIP telephony) that call property owners and inbound leads, qualify intent and route them to the right specialist.',
      'Built call orchestration in n8n: scheduled dialing from CRM data and webhook-driven logging of transcript, summary and sentiment after every call.',
      'Built personalised email automation on local LLM inference (Ollama) with Microsoft Graph delivery, strict eligibility rules, test modes and full write-back logging.',
      'Automated branded marketing creative generation and scheduled publishing, removing manual design work from campaign launches.',
      'Self-host and maintain the full stack (Docker, n8n, PostgreSQL, Ollama) on VPS infrastructure, with logging, retries and alerting so unattended jobs fail safely.',
    ],
  },
  {
    name: 'Anvaaya Healthtech',
    position: 'Software Engineer – AI/ML',
    startDate: '2025-11-01',
    endDate: '2026-05-01',
    highlights: [
      'Integrated an AI chatbot into a React + TypeScript platform, improving response time by ~35%.',
      'Built AI modules, including health recommendation features, that improved data accuracy by ~25%.',
      'Led an MPA-to-SPA architecture migration that cut page load time by ~40% and supported AI adoption across teams.',
      'Built backend services and APIs, and mentored junior engineers on system design.',
    ],
  },
  {
    name: 'Blackstar Traders Bureau (BTB)',
    position: 'Full Stack & AI Developer (Freelance)',
    startDate: '2025-05-01',
    endDate: '2026-03-01',
    highlights: [
      'Built a trading academy platform end to end (CRM, LMS, PAMM portal and trading journal) with live MT4/MT5 WebSocket feeds.',
      'Built an AI investor-outreach pipeline with the Anthropic API, plus a role-based PAMM module with automated profit distribution.',
      'Shipped iteratively with the business, adding modules, broker integrations and UX improvements as the academy grew.',
      'Owned deployment and infrastructure on AWS with Docker.',
    ],
  },
  {
    name: 'Client Projects, Dubai & India',
    position: 'Backend & AI Assistant Developer',
    startDate: '2023-01-01',
    endDate: '2025-08-01',
    highlights: [
      'Built 3+ AI-assisted client platforms using LLMs, RAG pipelines and vector search, deployed as containerised services on AWS.',
      'Delivered secure REST APIs (JWT auth, validation, rate limiting) with documentation for client handover.',
    ],
  },
];

export default work;
