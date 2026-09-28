export interface Project {
  title: string;
  subtitle?: string;
  link?: string;
  image?: string;
  date?: string;
  desc: string;
  tech?: string[];
  featured?: boolean;
}

const data: Project[] = [
  {
    title: 'AI Voice Calling Agents',
    subtitle: 'Outbound calls to US investors and owners',
    desc: 'Voice agents that call back leads with per-lead variables, writing transcripts, summaries and sentiment back to the sheet. A Telnyx ↔ OpenAI Realtime media bridge in FastAPI cuts reply latency, with call windows and webhook logging.',
    tech: [
      'Retell AI',
      'LiveKit',
      'Telnyx SIP',
      'OpenAI Realtime',
      'FastAPI',
      'n8n',
    ],
    featured: true,
  },
  {
    title: 'Property Ledger',
    subtitle: 'Real estate data engine, 40M+ records',
    desc: 'Field mapping across 1,700+ source files, owner/unit matching and de-duplication, loading 40M+ records into PostgreSQL. A React dashboard (search, ledger, batch explorer, analytics) lets non-technical staff upload raw files and get clean, deduplicated data.',
    tech: ['Python', 'PostgreSQL', 'FastAPI', 'React'],
    featured: true,
  },
  {
    title: 'Sales & Marketing Automation',
    subtitle: 'n8n pipelines for a brokerage',
    desc: 'Personalised outbound email with LLM output validated as JSON before sending, sheet-driven eligibility, test mode, status write-back and duplicate protection. Also automated agent deal tracking (WhatsApp → n8n → ranked leaderboards) and AI-made branded social carousels.',
    tech: [
      'n8n',
      'Claude API',
      'Ollama',
      'Microsoft Graph',
      'Google Sheets',
      'Brevo',
    ],
    featured: true,
  },
  {
    title: 'WhatsApp Web Chrome Extensions',
    subtitle: 'Property Intelligence and Group Cleanup',
    desc: 'Property Intelligence classifies incoming developer brochures, price lists and job applications into a factsheet queue. Group Cleanup handles bulk offboarding across 100+ groups with identity matching, admin safeguards, live verification and an audit log.',
    tech: ['TypeScript', 'React', 'Vite', 'Chrome MV3'],
  },
  {
    title: 'Bulk Image Processing Pipeline',
    subtitle: 'One-click capture to Google Drive',
    desc: 'Captures a full image set from a page in one click and queues it into an automation workflow for batch AI processing, then delivers the finished files to a shared Google Drive folder.',
    tech: ['Chrome Extension', 'n8n', 'AI Image Models', 'Google Drive API'],
  },
  {
    title: 'Custom CRM Platform',
    subtitle: 'Full-stack web application',
    desc: 'A CRM centralising leads, client records and follow-up reminders, replacing manual spreadsheet tracking.',
  },
];

export default data;
