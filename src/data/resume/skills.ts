/**
 * The "Core Technical Skills" section of the PDF résumé, in its order and
 * wording. `usedIn` names projects from `src/data/projects.ts` that show the
 * group in practice; the data test keeps every name pointing at a real card.
 */
export interface SkillGroup {
  name: string;
  skills: string[];
  usedIn: string[];
}

const skillGroups: SkillGroup[] = [
  {
    name: 'AI & LLM Systems',
    skills: [
      'OpenAI (incl. Realtime)',
      'Anthropic Claude',
      'Amazon Bedrock',
      'Ollama',
      'LangChain',
      'LlamaIndex',
      'LangGraph',
      'RAG',
      'Agentic Workflows',
      'Prompt Engineering',
    ],
    usedIn: [
      'AI Voice Calling Agents',
      'Sales & Marketing Automation',
      'Chat with PDF',
      'JUNO',
    ],
  },
  {
    name: 'Voice AI & Telephony',
    skills: [
      'Retell AI',
      'LiveKit Agents',
      'Telnyx SIP & Voice API',
      'Real-time Audio Streaming',
    ],
    usedIn: ['AI Voice Calling Agents', 'JUNO'],
  },
  {
    name: 'Automation & Integrations',
    skills: [
      'n8n',
      'Webhooks',
      'Google Sheets API',
      'Microsoft Graph',
      'Brevo',
      'Chrome Extensions (MV3)',
    ],
    usedIn: [
      'Sales & Marketing Automation',
      'WhatsApp Web Chrome Extensions',
      'Bulk Image Processing Pipeline',
      'RE Scraper Pro',
    ],
  },
  {
    name: 'Data & Databases',
    skills: [
      'PostgreSQL',
      'MongoDB',
      'FAISS',
      'Python ETL (pandas)',
      'Entity Matching & De-duplication',
    ],
    usedIn: ['Property Ledger', 'Chat with PDF', 'LPH Sales Display System'],
  },
  {
    name: 'Languages & Frameworks',
    skills: [
      'Python',
      'TypeScript',
      'JavaScript',
      'Java',
      'FastAPI',
      'React',
      'Node.js',
    ],
    usedIn: [
      'Property Ledger',
      'Trading Academy CRM',
      'BTB Academy Site',
      'LuxRestoreAI',
    ],
  },
  {
    name: 'Cloud & DevOps',
    skills: [
      'Docker',
      'Easypanel / VPS',
      'AWS (Lambda, S3, Bedrock)',
      'CI/CD (GitHub Actions)',
    ],
    usedIn: ['Chat with PDF', 'LuxRestoreAI', 'OREOCHAIN'],
  },
];

export default skillGroups;
