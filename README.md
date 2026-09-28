# Nishchal Gond: Personal Site

The source for [nishchalgond.com](https://nishchalgond.com): portfolio, résumé
and projects for Nishchal Gond, AI Specialist & Full Stack Engineer in Dubai.

Built with [Next.js](https://nextjs.org/), [React](https://react.dev/),
[TypeScript](https://www.typescriptlang.org/) and
[Tailwind CSS](https://tailwindcss.com/), exported as a static site.

## Run locally

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Where the content lives

| Content           | File                               |
| ----------------- | ---------------------------------- |
| Name, role, email | `src/data/profile.json`            |
| About page        | `src/data/about.ts`                |
| Work history      | `src/data/resume/work.ts`          |
| Education         | `src/data/resume/degrees.ts`       |
| Skills            | `src/data/resume/skills.ts`        |
| Projects          | `src/data/projects.ts`             |
| Social links      | `src/data/contact.ts`              |
| Homepage intro    | `src/components/Template/Hero.tsx` |
| Portrait          | `public/images/me.jpg`             |

After changing the name, employer, focus or city, regenerate the share card
with `npm run og`.

## Checks

```bash
npm run lint
npm run type-check
npm test
npm run build
npm run verify-export
```

## License

MIT. See [LICENSE](./LICENSE).
