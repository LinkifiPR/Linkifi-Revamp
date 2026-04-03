# CLAUDE.md — Linkifi Revamp Project Memory

This file is maintained by Claude (AI assistant) to preserve context across working sessions. It is updated at the end of each session with Christopher Panteli.

---

## Project Overview

**Linkifi** is a marketing website and platform for a PR link building service. The site promotes digital PR services that help businesses get featured in major publications (Forbes, TechCrunch, etc.) to build high-authority backlinks.

- **Live URL:** Deployed via Netlify
- **Replit origin:** https://replit.com/@chrispanteli/Linkifi-Revamp
- **GitHub:** https://github.com/LinkifiPR/Linkifi-Revamp
- **Owner:** Christopher Panteli (chrispanteli@gmail.com)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Primary frontend | Next.js 15 (App Router) |
| Legacy frontend | Vite + React (in `/client`) |
| Styling | Tailwind CSS v3 + shadcn/ui + Radix UI |
| Animations | Framer Motion |
| Backend | Express.js (spawns Next.js as child process) |
| ORM | Drizzle ORM (PostgreSQL dialect) |
| Auth | Passport.js (local strategy) + express-session |
| State/Fetching | TanStack Query |
| Routing (legacy) | Wouter |
| Validation | Zod |
| Language | TypeScript (93%+ of codebase) |

---

## Project Structure

```
/app              → Next.js App Router pages (primary frontend)
  /admin          → Admin section
  /api            → Next.js API routes
  /authority-pr   → Authority PR service page
  /blog           → Blog section
  /case-studies   → Case studies section
  /contact-us     → Contact page
  /pages          → Additional pages
  /seo-digital-pr → SEO Digital PR service page
  /team           → Team page
  layout.tsx      → Root layout
  page.tsx        → Homepage
  globals.css     → Global styles

/client           → Legacy Vite/React frontend
  /src
    App.tsx
    /pages
    /components
    /hooks
    /lib

/server           → Express backend
  index.ts        → Server entry point
  routes.ts       → API routes
  storage.ts      → Storage abstraction (MemStorage / Postgres)
  static.ts       → Static file serving
  vite.ts         → Vite dev server integration
  utils.ts

/shared           → Shared types/schemas (used by both client & server)
  → users table schema (Drizzle + Zod)

/components       → Shared UI components (for Next.js app)
  /ui             → shadcn/ui primitives

/lib              → Utility functions

/script           → Build scripts
  build.ts        → Production build
  optimize-cms-media.ts → Media optimization

/public           → Static assets
/attached_assets  → Asset storage
```

---

## Key Configuration Files

- `next.config.mjs` — Next.js config
- `vite.config.ts` — Vite config (for legacy client)
- `tailwind.config.ts` — Tailwind config (custom "linkifi" purple palette, CSS variables)
- `drizzle.config.ts` — Drizzle ORM config (PostgreSQL)
- `tsconfig.json` — TypeScript config
- `middleware.ts` — Next.js middleware
- `postcss.config.mjs` — PostCSS config

---

## NPM Scripts

```bash
npm run dev          # Start Express server (development) — runs Next.js as child process
npm run dev:client   # Start Vite dev server on port 5000 (legacy client)
npm run build        # Run custom build script (Next.js + CJS dist)
npm run start        # Production server
npm run check        # TypeScript type check
npm run db:push      # Push Drizzle schema to database
npm run media:optimize  # Optimize CMS media assets
```

---

## Database

- **ORM:** Drizzle ORM with PostgreSQL
- **Current storage:** In-memory (`MemStorage`) — Postgres not yet wired up in production
- **Requires:** `DATABASE_URL` environment variable for Postgres
- **Schema:** Single `users` table (`id` UUID, `username`, `password`)
- **Sessions:** `connect-pg-simple` prepared for session storage

---

## UI / Design Notes

- Custom **"linkifi" purple** color palette defined in Tailwind config using CSS variables
- Dark mode supported via class-based toggling (`next-themes`)
- shadcn/ui components exist in **two locations**:
  - `/components/ui/` — for Next.js app
  - `/client/src/components/ui/` — for legacy Vite client
- Fonts: Inter (variable), Plus Jakarta Sans, Geist Mono, DM Sans, Fira Code

---

## Deployment

- **Platform:** Netlify
- **Build:** Custom `script/build.ts` generates Next.js output + CJS entry in `/dist`
- **Origin:** Migrated from Replit; retains some Replit-specific Vite plugins in devDependencies

---

## Recent Git Activity (as of session start)

```
8ec6307 Match SEO graph section sizing to Authority
848f2ff Add Authority PR interactive growth graph section
74ca0a1 Polish SEO performance graph layout and hover
2af1b89 Vary SEO case study graph datasets
cbbe510 Refine SEO performance case study graph
b1edf88 Refine SEO performance graph variations
8535a68 Add SEO performance story section
f5717d3 Simplify Authority proof gallery
a0eb258 Tighten Authority proof layout
b44b590 Tidy proof collage JSX formatting
```

---

## Session Log

### Session 1 — 2026-04-03

**What we did:**
- Set up this project in Cowork mode for the first time
- Cloned the GitHub repo: https://github.com/LinkifiPR/Linkifi-Revamp
- Explored the full project structure and tech stack
- Created this CLAUDE.md file for persistent project memory
- Pushed CLAUDE.md to the GitHub repo

**Status:** Project loaded and ready. No code changes made yet.

**Next steps / open tasks:** To be defined by Christopher in next session.

---

*Last updated: 2026-04-03 | Updated by: Claude (Cowork)*
