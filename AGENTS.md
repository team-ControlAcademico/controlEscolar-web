# Control Escolar Web — AGENTS.md

## Project Overview

Frontend SPA for a school control system. React 19 + TypeScript + Vite + Tailwind CSS v4.
Backend lives in separate repo: `controlEscolar-api`.

## Commands

| Action       | Command                |
| ------------ | ---------------------- |
| Dev          | `npm run dev`          |
| Build        | `npm run build`        |
| Preview      | `npm run preview`      |
| Lint         | `npm run lint`         |
| Lint fix     | `npm run lint:fix`     |
| Format       | `npm run format`       |
| Format check | `npm run format:check` |
| Type check   | `npx tsc --noEmit`     |

## Required Order Before Commit

`lint → format → build` — Husky enforces lint-staged on pre-commit.

## Architecture

```
src/
  components/    → Reusable UI components (named exports, PascalCase)
  pages/         → Route-level page components
  hooks/         → Custom React hooks (camelCase)
  types/         → Shared TypeScript interfaces
  utils/         → Pure utility functions
  styles/        → Global CSS + Tailwind directives
  assets/        → Images, fonts, static files
  App.tsx        → Root component + router
  main.tsx       → ReactDOM entry point
```

## Design System (Tailwind v4 @theme)

- `primary`: Green `#2D6A4F` — headers, nav, primary buttons
- `secondary`: Sky blue `#48CAE4` — accents, links, highlights
- `neutral`: Gray scale — backgrounds, borders, body text
- Fonts: `Inter` (body), `Poppins` (headings) via Google Fonts

## Conventions

- Named exports only (no default exports) for components
- `import type` for type-only imports
- No `any` — use `unknown` and narrow
- Utility-first CSS (Tailwind). Custom CSS only for design tokens.
- Commits: conventional commits (`feat:`, `fix:`, `chore:`, `docs:`)
- Branching: `main` = production, feature branches from `main`

## Vercel

- SPA rewrite in `vercel.json` (all routes → index.html)
- Env vars: `VITE_API_URL` pointing to backend API
- Auto-deploy on merge to `main`

## Backend Integration

- API base URL from `import.meta.env.VITE_API_URL`
- Backend repo: `controlEscolar-api`
