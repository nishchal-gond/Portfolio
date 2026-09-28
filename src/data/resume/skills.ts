export interface Skill {
  title: string;
  competency: number;
  category: string[];
}

export interface Category {
  name: string;
  color: string;
}

const skills: Skill[] = [
  {
    title: 'Python',
    competency: 5,
    category: ['Languages'],
  },
  {
    title: 'TypeScript',
    competency: 5,
    category: ['Languages'],
  },
  {
    title: 'JavaScript',
    competency: 5,
    category: ['Languages'],
  },
  {
    title: 'Java',
    competency: 3,
    category: ['Languages'],
  },
  {
    title: 'OpenAI & Realtime API',
    competency: 5,
    category: ['AI & LLM'],
  },
  {
    title: 'Anthropic Claude',
    competency: 5,
    category: ['AI & LLM'],
  },
  {
    title: 'Amazon Bedrock',
    competency: 3,
    category: ['AI & LLM', 'Cloud & DevOps'],
  },
  {
    title: 'Ollama',
    competency: 4,
    category: ['AI & LLM'],
  },
  {
    title: 'LangChain',
    competency: 4,
    category: ['AI & LLM'],
  },
  {
    title: 'LlamaIndex',
    competency: 3,
    category: ['AI & LLM'],
  },
  {
    title: 'LangGraph',
    competency: 3,
    category: ['AI & LLM'],
  },
  {
    title: 'RAG',
    competency: 4,
    category: ['AI & LLM'],
  },
  {
    title: 'Agentic Workflows',
    competency: 4,
    category: ['AI & LLM'],
  },
  {
    title: 'Prompt Engineering',
    competency: 5,
    category: ['AI & LLM'],
  },
  {
    title: 'Retell AI',
    competency: 5,
    category: ['Voice AI'],
  },
  {
    title: 'LiveKit Agents',
    competency: 4,
    category: ['Voice AI'],
  },
  {
    title: 'Telnyx SIP & Voice API',
    competency: 4,
    category: ['Voice AI'],
  },
  {
    title: 'Real-time Audio Streaming',
    competency: 4,
    category: ['Voice AI'],
  },
  {
    title: 'n8n',
    competency: 5,
    category: ['Automation'],
  },
  {
    title: 'Webhooks',
    competency: 5,
    category: ['Automation'],
  },
  {
    title: 'Google Sheets API',
    competency: 5,
    category: ['Automation'],
  },
  {
    title: 'Microsoft Graph',
    competency: 4,
    category: ['Automation'],
  },
  {
    title: 'Brevo',
    competency: 4,
    category: ['Automation'],
  },
  {
    title: 'Chrome Extensions (MV3)',
    competency: 4,
    category: ['Automation', 'Web Development'],
  },
  {
    title: 'PostgreSQL',
    competency: 5,
    category: ['Data'],
  },
  {
    title: 'MongoDB',
    competency: 4,
    category: ['Data'],
  },
  {
    title: 'FAISS',
    competency: 3,
    category: ['Data', 'AI & LLM'],
  },
  {
    title: 'pandas ETL',
    competency: 5,
    category: ['Data'],
  },
  {
    title: 'Entity Matching & De-duplication',
    competency: 5,
    category: ['Data'],
  },
  {
    title: 'FastAPI',
    competency: 5,
    category: ['Web Development'],
  },
  {
    title: 'React',
    competency: 4,
    category: ['Web Development'],
  },
  {
    title: 'Node.js',
    competency: 4,
    category: ['Web Development'],
  },
  {
    title: 'Docker',
    competency: 4,
    category: ['Cloud & DevOps'],
  },
  {
    title: 'Easypanel / VPS',
    competency: 4,
    category: ['Cloud & DevOps'],
  },
  {
    title: 'AWS (Lambda, S3)',
    competency: 4,
    category: ['Cloud & DevOps'],
  },
  {
    title: 'GitHub Actions',
    competency: 3,
    category: ['Cloud & DevOps'],
  },
].map((skill) => ({ ...skill, category: skill.category.sort() }));

/**
 * Build categories from skills, all using the accent color token.
 */
function buildCategories(skillsList: Skill[]): Category[] {
  const uniqueCategories = Array.from(
    new Set(skillsList.flatMap(({ category }) => category)),
  ).sort();

  return uniqueCategories.map((category) => ({
    name: category,
    color: 'var(--color-accent)',
  }));
}

const categories: Category[] = buildCategories(skills);

export { categories, skills };
