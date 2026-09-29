# AGENYRA product site — OpenMemory guide

## Overview
Marketing site + waitlist for agenyra.space ("The distribution layer for AI"). Repo: github.com/ayushrai-hub/AGENYRA_product (public). Separate from the marketplace app repo `ayushrai-hub/AGENYRA`, which owns the Vercel project named `agenyra` — do not deploy this site there.

Stack: Next.js 16.3 App Router (Turbopack), React 19.2, TypeScript, Tailwind v4 (`@theme` in `src/app/globals.css`), pnpm, Vitest. Supabase (project `agenyra`, ref `sxbqzxqswrvubtjdtfiw`, ap-south-1) stores the waitlist. Vercel region `bom1`.

## Architecture
- All pages are static server components; only `/waitlist` and `/api/admin/waitlist/export` are dynamic.
- Client components: `nav-menu.tsx` (mobile menu), `waitlist-form.tsx` (useActionState).
- Waitlist writes go through a server action (`src/app/waitlist/actions.ts`) using the service-role client (`src/lib/supabase-admin.ts`, `server-only`). RLS on, no policies, no anon/authenticated grants.
- CSV export: `GET /api/admin/waitlist/export`, Basic or Bearer auth against `WAITLIST_EXPORT_TOKEN` (404 when unset).
- Env vars (server-only): SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, WAITLIST_EXPORT_TOKEN, WAITLIST_IP_SALT.

## User Defined Namespaces
- [Leave blank - user populates]

## Components
- `src/content/*`: all copy and stage data (site, status, features, roadmap, builders). Single source of truth for stage labels.
- `src/components/stage.tsx`: StageTag / StageScale / StageLegend — categorical stages, never percentages.
- `src/components/section.tsx`, `page-header.tsx`, `button-link.tsx`, `get-in-early.tsx`, `flow-diagram.tsx`, `home/*`.
- `src/lib/waitlist/`: fields (enums, limits, state types), validate (sanitize/normalize), csv (formula-safe), rate-limit (memory + DB RPC).
- `supabase/migrations/20260929090000_waitlist.sql`: waitlist + waitlist_attempts + `waitlist_register_attempt` RPC.

## Patterns
- Honest status: every capability carries a stage (building/experimental/exploring/planned/research); no fake metrics, dates, logos or testimonials.
- Design: near-black ink, warm off-white, one signal orange (#ff6a2b); IBM Plex Sans/Mono + Newsreader display. No gradients/glass/blobs.
- Motion: CSS only (`rise`, `page-in`, scroll-driven `.reveal`), disabled under prefers-reduced-motion.
- Forms: server action returns values on error; form remounts via `key` to keep input; focus moves to first invalid field.
- Duplicate emails return a success state ("Already listed") via unique-violation 23505.
