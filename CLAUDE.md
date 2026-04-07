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
- Investigated the Neon database connection — confirmed it is actively used via `lib/cms-repository.ts` (raw `pg` Pool, not Drizzle). Three tables: `cms_entries`, `cms_authors`, `cms_media`
- Corrected earlier misunderstanding: Drizzle ORM / `server/storage.ts` (MemStorage) is unused legacy scaffolding from the Replit template. The real DB layer is the custom CMS repository
- Created this CLAUDE.md file for persistent project memory
- **Code change:** Updated "View Case Studies" button hover state on homepage (`app/page.tsx`) to brand pink (`#D733A2`) background with white text and matching pink border, replacing the previous purple hover
- Pushed all changes to GitHub → Netlify auto-deploy triggered

**Key facts established:**
- Brand pink: `#D733A2` (defined in `tailwind.config.ts` as `linkifi.pink`)
- Database: Neon PostgreSQL, connected via `DATABASE_URL` env var (set in Netlify)
- Deployment: Netlify at `linkifi-revamp.netlify.app`, auto-deploys on push to `main`

**Next steps / open tasks:** Continue performance fixes from Session 2.

---

### Session 2 — 2026-04-06

**Context:** Full performance audit based on GTmetrix report (62% score, 9.3s load, 9.2s TTI, 1.1s TBT). Identified 8 priority fixes. Implemented Fixes 1–5 this session.

**What we did:**

**Fix 1 — ISR on blog/case study/pages routes**
- Replaced `export const dynamic = "force-dynamic"` with `export const revalidate = 3600` on:
  - `app/blog/[slug]/page.tsx`
  - `app/case-studies/[slug]/page.tsx`
  - `app/pages/[slug]/page.tsx`
  - `app/pages/page.tsx`
- Pages now served from Netlify CDN cache, refreshed in background every hour
- Expected impact: blog/case study TTI drops dramatically

**Fix 2 — Meta Pixel script strategy**
- Changed `strategy="beforeInteractive"` → `strategy="afterInteractive"` in `app/layout.tsx`
- Facebook pixel was blocking the entire page before any rendering could begin
- Tracking still fires correctly, just no longer blocks users

**Fix 3 — Scoped chat widget to marketing pages only**
- Created `components/site/ChatWidget.tsx` component
- Removed LeadConnector script from root `app/layout.tsx`
- Added `<ChatWidget />` to: homepage, `ServiceLandingPage`, `ContactPageClient`
- Chat widget was still appearing on blog/team pages due to GoHighLevel injecting at domain level
- Fixed by creating layout files with CSS suppression:
  - `app/blog/layout.tsx` — hides widget on all blog pages (current + future)
  - `app/case-studies/layout.tsx` — hides widget on all case study pages (current + future)
  - `app/team/layout.tsx` — hides widget on team page
- CSS used: `chat-widget { display: none !important; }`

**Fix 4 — Netlify cache headers (done separately by Christopher)**

**Fix 5 — Convert and compress images to WebP**
- Converted 27 PNG/JPG files to WebP using Pillow (quality 75–85)
- Total saved: ~5MB
- Key wins:
  - `Chris1-poster.png`: 778KB → 34KB (744KB saved)
  - `dani-b.png`: 1.3MB → 37KB (1.25MB saved)
  - `amanda/joy/daniel testimonial posters`: ~1.25MB → ~52KB combined
  - Team photos (agustin, dani-d, mateos): ~1.5MB → ~605KB
  - Authority montage images: ~1.6MB → ~710KB
  - Publication logos (11 logos): ~353KB → ~162KB
- Updated all code references in `app/page.tsx`, `app/team/page.tsx`, `components/site/ServiceLandingPage.tsx`

**Key facts established:**
- GoHighLevel/LeadConnector chat widget is injected at domain level (not via Netlify snippet injection — that section is empty)
- The CSS tag selector `chat-widget { display: none !important; }` reliably hides it per-route
- Next.js layout files in a route segment apply to ALL pages in that segment automatically
- Blog/case study pages were on `force-dynamic` — every visitor triggered a live DB query
- `lib/cms-repository.ts` is the real DB layer (raw `pg` Pool), Drizzle is unused legacy

**Remaining performance fixes to implement:**
- Fix 6: Add `sizes` props to `<Image>` components missing them on homepage
- Fix 7: Compress conference videos (Chris2–4 are 4–11MB each)
- Fix 8: Remove unused CSS/JS (365KB unused JS, 30KB unused CSS identified by GTmetrix)

---

*Last updated: 2026-04-06 | Updated by: Claude (Cowork)*
