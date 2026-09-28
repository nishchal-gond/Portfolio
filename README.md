# Portfolio

Personal portfolio site — [nishchalgond.vercel.app](https://nishchalgond.vercel.app/)

Built with Next.js 14 (App Router), TypeScript and Tailwind CSS, with 3D scenes,
scroll-driven animation and a working contact form.

## Stack

| Layer | Used |
| --- | --- |
| Framework | Next.js 14 (App Router), React 18, TypeScript |
| Styling | Tailwind CSS, Sass, `tailwind-merge`, `class-variance-authority` |
| UI primitives | Radix UI, `lucide-react`, `react-icons` |
| Motion | GSAP, Framer Motion, Lenis (smooth scroll) |
| 3D | Three.js, Spline |
| Email | Resend, via the `/api/send` route |
| Validation | Zod |

## Getting started

Requires Node.js 18.17 or newer (Next.js 14 minimum).

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev
```

The site runs at `http://localhost:3000`.

## Environment variables

Copy `.env.example` to `.env.local` and set:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com) — used by `/api/send` |
| `EMAIL` | Destination address that contact-form submissions are delivered to |
| `NEXT_PUBLIC_WS_URL` | *Optional.* Socket.IO server for live cursors/chat. Leave unset to disable the feature |
| `UMAMI_DOMAIN`, `UMAMI_SITE_ID` | *Optional.* Umami analytics script URL and site ID. The script is only added when both are set |
| `ANTHROPIC_API_KEY` | *Optional.* Enables the "Ask AI" assistant (`/api/chat`). The widget is hidden without it |
| `ANTHROPIC_MODEL`, `ANTHROPIC_EFFORT` | *Optional.* Override the assistant's model (default `claude-opus-5`) and effort (default `low`) |

Without these the site still builds and renders; only the contact form fails and the optional features stay hidden.

## Scripts

| Command | Does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint via `next lint` |

## Project structure

```
src/
├── app/            App Router routes: about, contact, projects (+ case studies), blog,
│                   api/send, api/chat, sitemap, robots, OG image
├── components/     Reusable UI and section components
├── contexts/       React context providers
├── data/           Site content — config, skills, projects, experience
├── hooks/          Custom React hooks
├── lib/            Shared helpers
├── types/          Shared TypeScript types
└── utils/          Utility functions
content/blog/       Blog posts (MDX)
public/             Static assets
```

Content lives in plain data files, so editing it doesn't require touching components:

| File | What it holds |
| --- | --- |
| `src/data/config.ts` | Name, role, bio, links, resume URL, SEO text |
| `src/data/projects.ts` | Project cards and case studies (`/projects/[id]`). Case-study sections render only when filled in |
| `src/data/experience.ts` | Work history. The Experience section stays hidden until it has an entry |
| `src/data/constants.ts` | Skills shown on the 3D keyboard |
| `content/blog/*.mdx` | Blog posts. Frontmatter: `title`, `date`, `summary`, `tags`, `draft`. Drafts only show in `npm run dev`; the Blog nav link appears once a post is published |

The AI assistant is grounded on these same files (`src/lib/assistant-context.ts`),
so it stays up to date when the content changes.

## Accessibility

When the OS "reduce motion" setting is on, the 3D keyboard, particles, elastic
cursor and smooth scrolling are switched off and the skills render as a grid.

## Deployment

Deployed on Vercel. Push to `main` triggers a build; set `RESEND_API_KEY` and
`EMAIL` (and optionally `ANTHROPIC_API_KEY`) in the Vercel project's environment
variables. Redeploy after adding `ANTHROPIC_API_KEY`: the widget is enabled at build time.
