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

Without these the site still builds and renders; only the contact form fails.

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
├── app/            App Router routes: about, blog, contact, projects, api/send
├── components/     Reusable UI and section components
├── contexts/       React context providers
├── data/           Site content — config, constants, project entries
├── hooks/          Custom React hooks
├── lib/            Shared helpers
├── types/          Shared TypeScript types
└── utils/          Utility functions
public/             Static assets
```

Content lives in `src/data/` — `config.ts` for site-level settings, `projects.tsx`
for the project entries, `constants.ts` for the rest of the copy. Editing those
does not require touching component code.

## Deployment

Deployed on Vercel. Push to `main` triggers a build; set `RESEND_API_KEY` and
`EMAIL` in the Vercel project's environment variables so the contact route works
in production.
