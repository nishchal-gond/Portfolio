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
    title: 'JUNO',
    subtitle: 'Always-on voice assistant for Windows 11 · private repo',
    desc: 'Runs entirely on the laptop: openWakeWord and GPU faster-whisper to listen, three answer tiers (instant reflexes, a local qwen2.5 model, Claude Code for real tool work), a cloned voice via Coqui XTTS-v2 with Piper fallback, and a three.js particle HUD in a click-through Electron overlay. Laptop control is exposed to Claude as an MCP server.',
    tech: [
      'Python',
      'faster-whisper',
      'XTTS-v2',
      'qwen2.5',
      'Claude Code',
      'MCP',
      'Electron',
      'three.js',
    ],
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
    title: 'Trading Academy CRM',
    subtitle: 'Operations platform for BTB',
    link: 'https://github.com/nishchal-gond/BTBCrm',
    desc: 'A CRM centralising leads, client records and follow-up reminders, replacing manual spreadsheet tracking. Built on one rule: one person, one row, one permanent client ID. Lead and student are statuses, conversion is an update, and every record tracks who created, owns, mentors and converted it.',
    tech: ['TypeScript', 'Python'],
  },
  {
    title: 'OREOCHAIN',
    subtitle: 'Verifiable document storage',
    link: 'https://github.com/nishchal-gond/OREOCHAIN',
    desc: 'Files are split into a tree of independently encrypted, independently verifiable chunks, with commitments anchored on Ethereum and content on IPFS, so any part of a document can prove itself later without revealing the rest.',
    tech: ['Solidity', 'Ethereum', 'IPFS', 'JavaScript', 'Docker'],
  },
  {
    title: 'LuxRestoreAI',
    subtitle: 'Watermark detection and image restoration',
    link: 'https://github.com/nishchal-gond/Lux-Property',
    desc: 'A modular computer vision pipeline that finds watermarks and unwanted artifacts with open-vocabulary detection (Grounding DINO), builds precise masks and inpaints the region while preserving image quality.',
    tech: ['Python', 'PyTorch', 'Grounding DINO', 'Docker'],
  },
  {
    title: 'LPH Sales Display System',
    subtitle: 'Automated 98" digital signage',
    link: 'https://github.com/nishchal-gond/canvaaa',
    desc: 'Replaces USB-stick updates for a showroom display: PDF, PPTX and MP4 uploads are rendered to native 1080p frames, pushed live over Server-Sent Events, and cached by a service worker so playback survives Wi-Fi drops.',
    tech: ['Node.js', 'Python', 'PostgreSQL', 'SSE', 'Service Worker'],
  },
  {
    title: 'RE Scraper Pro',
    subtitle: 'Real estate listings to Excel in one click',
    link: 'https://github.com/nishchal-gond/re-scraper',
    desc: 'A Chrome MV3 extension that walks multi-page search results, visits each listing, extracts structured fields and exports everything to Excel, CSV or JSON.',
    tech: ['Chrome MV3', 'JavaScript'],
  },
  {
    title: 'BTB Academy Site',
    subtitle: 'Marketing and investor site',
    link: 'https://github.com/nishchal-gond/BlackStar',
    desc: 'Single-page investor site for a Dubai trading ecosystem, with animated data visualisations of the revenue model, operating metrics, campus layout and growth roadmap. No UI library; every component owns its styling.',
    tech: ['React 19', 'TypeScript', 'Vite', 'Framer Motion', 'Recharts'],
  },
  {
    title: 'Chat with PDF',
    subtitle: 'RAG on Amazon Bedrock',
    link: 'https://github.com/nishchal-gond/ChatPDF',
    desc: 'Admins upload PDFs that are chunked, embedded with Amazon Titan and indexed in FAISS on S3; users ask questions answered by Claude over the retrieved chunks.',
    tech: ['Amazon Bedrock', 'LangChain', 'FAISS', 'S3', 'Docker'],
  },
  {
    title: 'Listing Photo Processor',
    subtitle: 'Browser tool for property listing images',
    link: 'https://watermark-virid.vercel.app',
    desc: 'A single-page browser tool for preparing property listing photos, live on Vercel.',
    tech: ['HTML', 'JavaScript'],
  },
  {
    title: 'SmartRideManager',
    subtitle: 'Group rides and bike maintenance',
    link: 'https://github.com/nishchal-gond/SmartRideManager',
    desc: 'Cross-platform app for group rides with live location, bike maintenance schedules, synced music, group chat and an AI assistant for ride planning.',
    tech: ['Flutter', 'React', 'Vite'],
  },
  {
    title: 'J.A.D.E',
    subtitle: 'Gemini-powered chatbot',
    link: 'https://github.com/nishchal-gond/J.A.D.E',
    desc: 'A text chatbot on the Google Gemini API with a Python backend and a lightweight HTML/CSS interface.',
    tech: ['Python', 'Gemini API'],
  },
];

export default data;
