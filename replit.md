# Linkifi - PR Link Building Platform

## Overview

Linkifi is a marketing landing page for a PR link building service. The application is a hybrid setup that includes both a Next.js application (primary) and a legacy Vite/React client. The site promotes digital PR services that help businesses get featured on major publications like Forbes and TechCrunch to build high-authority backlinks.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The project uses a dual frontend setup:

1. **Next.js (Primary)** - Located in `/app` directory using the App Router pattern
   - Uses React Server Components where applicable
   - Client-side interactivity via "use client" directive
   - Framer Motion for animations
   - Next.js Image component for optimized images

2. **Vite/React (Legacy)** - Located in `/client` directory
   - Uses Wouter for client-side routing
   - TanStack Query for data fetching
   - Separate entry point at `client/src/main.tsx`

### UI Component System

- **shadcn/ui** components with Radix UI primitives
- Components exist in two locations:
  - `/components/ui/` - For Next.js app
  - `/client/src/components/ui/` - For Vite client
- Tailwind CSS with custom theme using CSS variables
- Dark mode support via class-based toggling
- Custom "linkifi" color palette (purple theme)

### Backend Architecture

- **Express-based server** in `/server` directory that spawns Next.js processes
- Development: Runs `next dev` via child process
- Production: Runs `next start` via child process
- Storage abstraction layer with in-memory implementation (`MemStorage`)
- Prepared for PostgreSQL via Drizzle ORM but currently uses memory storage

### Database Schema

- Drizzle ORM configured for PostgreSQL
- Single `users` table with:
  - `id` (UUID, auto-generated)
  - `username` (text, unique)
  - `password` (text)
- Schema validation via Zod integration (`drizzle-zod`)
- Migrations output to `/migrations` directory

### Build System

- Custom build script in `/script/build.ts`
- Production build creates Next.js output and a CJS entry point in `/dist`
- Vite configuration handles the legacy client build

## External Dependencies

### Third-Party Libraries

- **Radix UI** - Headless UI primitives for accessibility
- **TanStack Query** - Server state management
- **Framer Motion** - Animation library
- **Drizzle ORM** - Database toolkit with PostgreSQL dialect
- **Zod** - Schema validation
- **date-fns** - Date utilities

### Database

- PostgreSQL (configured but requires `DATABASE_URL` environment variable)
- `connect-pg-simple` for session storage (prepared)

### Replit-Specific Integrations

- `@replit/vite-plugin-runtime-error-modal` - Error overlay
- `@replit/vite-plugin-cartographer` - Development tooling
- `@replit/vite-plugin-dev-banner` - Development banner
- Custom meta images plugin for OpenGraph with Replit deployment URLs

### Fonts

- Inter (variable font)
- Plus Jakarta Sans (from Google Fonts)
- Geist Mono, DM Sans, Fira Code (loaded in Vite client)