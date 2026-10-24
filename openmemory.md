# AGENYRA product site — OpenMemory guide

## Overview
Marketing site + waitlist for agenyra.space ("The distribution layer for AI"). Repo: github.com/ayushrai-hub/AGENYRA_product (public). Separate from the marketplace app repo `ayushrai-hub/AGENYRA`, which owns the Vercel project named `agenyra` — do not deploy this site there.

Stack: Next.js 16.3 App Router (Turbopack), React 19.2, TypeScript, Tailwind v4 (`@theme` in `src/app/globals.css`), pnpm, Vitest. Supabase (project `agenyra`, ref `sxbqzxqswrvubtjdtfiw`, ap-south-1) stores the waitlist. Vercel project `agenyra-product` (Git-connected, pushes to `main` deploy to production, region `bom1`); domains `agenyra.space` + `www` (308 → apex). DNS lives at GoDaddy; env vars are Production-only, so previews run without a database.

## Architecture
- All pages are static server components; only `/waitlist`, `/markdown/[[...slug]]` and `/api/admin/*` are dynamic.
- Agent access: `next.config.ts` beforeFiles rewrites send `Accept: text/markdown` requests and `/<page>.md` to `/markdown/[[...slug]]` (Markdown from `src/lib/markdown.ts`, `Vary: Accept`, Markdown 404). `/llms.txt` + `/llms-full.txt` are static route handlers. No proxy.ts, so browsers pay nothing.
- Analytics: `@vercel/analytics` `<Analytics />` in root layout; Web Analytics enabled on Vercel project `agenyra-product`.
- Client components: `nav-menu.tsx` (mobile menu), `waitlist-form.tsx` (useActionState).
- Waitlist writes go through a server action (`src/app/waitlist/actions.ts`) using the service-role client (`src/lib/supabase-admin.ts`, `server-only`). RLS on, no policies, no anon/authenticated grants.
- CSV export: `GET /api/admin/waitlist/export`, Basic or Bearer auth against `WAITLIST_EXPORT_TOKEN` (404 when unset).
- Env vars (server-only): SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, WAITLIST_EXPORT_TOKEN, WAITLIST_IP_SALT.

## User Defined Namespaces
- [Leave blank - user populates]

## Components
- `src/content/*`: all copy and stage data (site, status, features, roadmap, builders, home, product, about, legal, pages). Single source of truth for both HTML pages and Markdown. `pages.ts` lists every public page (sitemap, llms.txt, Markdown routing). `site.ts` holds CONTACT_EMAIL (agenyra.space has no MX yet), LOCATION, SOURCE_URL.
- `src/components/icons.tsx`: hand-drawn 24px icon set matching the logo (1.25 stroke, square nodes, one signal-orange element). Features, builder capabilities and pipeline stages carry an `icon` field.
- `src/components/profile-example.tsx`: FIG. 02 example product profile (invented product "Acme Reports", labelled as such).
- `/contact`, `/privacy`: trust pages; privacy text in `src/content/legal.ts` must match what the code actually stores.
- `src/components/stage.tsx`: StageTag / StageScale / StageLegend — categorical stages, never percentages.
- `src/components/section.tsx`, `page-header.tsx`, `button-link.tsx`, `get-in-early.tsx`, `flow-diagram.tsx`, `home/*`.
- `src/lib/waitlist/`: fields (enums, limits, state types), validate (sanitize/normalize), csv (formula-safe), rate-limit (memory + DB RPC).
- `supabase/migrations/20260929090000_waitlist.sql`: waitlist + waitlist_attempts + `waitlist_register_attempt` RPC.

## Patterns
- Honest status: every capability carries a stage (building/experimental/exploring/planned/research); no fake metrics, dates, logos or testimonials.
- Copy: avoid templated AI tells ("Stop X. Start Y.", "not X but Y" chains, em-dash eyebrows, slogans). Prefer concrete fields (task, inputs, outputs, deployment, price) over adjectives.
- Agent-readiness checked with `npx is-agentic agenyra.space --json` (74 before Markdown/llms/contact/privacy work).
- Design: near-black ink, warm off-white, one signal orange (#ff6a2b); IBM Plex Sans/Mono + Newsreader display. No gradients/glass/blobs.
- Motion: CSS only (`rise`, `page-in`, scroll-driven `.reveal`), disabled under prefers-reduced-motion.
- Forms: server action returns values on error; form remounts via `key` to keep input; focus moves to first invalid field.
- Duplicate emails return a success state ("Already listed") via unique-violation 23505.
