# AGENYRA

Product website and waitlist for [agenyra.space](https://agenyra.space): the distribution layer for AI.

Next.js 16 (App Router), React 19, Tailwind CSS v4, Supabase for waitlist storage. Deployed on Vercel.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Home |
| `/product` | How the system is meant to work |
| `/features` | Features grouped by stage |
| `/builders` | For AI builders |
| `/roadmap` | Phases and stage definitions |
| `/about` | About |
| `/waitlist` | Waitlist form (`?as=builder` / `?as=user` preselect role and interest) |
| `/api/admin/waitlist/export` | Token-protected CSV export (not linked anywhere) |

Page copy and build status live in `src/content/`. Stage labels (`building`, `experimental`, `exploring`, `planned`, `research`) are defined once in `src/content/status.ts`; update them there as work moves forward.

## Local development

```bash
pnpm install
cp .env.example .env.local   # fill in values
pnpm dev
```

Without Supabase env vars the site still runs; the form responds with "temporarily unavailable".

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Environment variables

All are server-only. None may be prefixed with `NEXT_PUBLIC_`.

| Name | Required | Notes |
| --- | --- | --- |
| `SUPABASE_URL` | yes | `https://<ref>.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | yes | Used only in server actions and the export route |
| `WAITLIST_EXPORT_TOKEN` | for export | 24+ characters. Unset means the export route returns 404 |
| `WAITLIST_IP_SALT` | recommended | Salt for hashed IPs in rate limiting |

## Database

Schema: `supabase/migrations/20260929090000_waitlist.sql`.

- `public.waitlist`: one row per signup. Email is stored lowercased with a unique index on `lower(email)`. `status` is one of `new`, `contacted`, `qualified`, `early_access`, `onboarded`, `rejected`, `do_not_contact`; `notes` is for internal use.
- `public.waitlist_attempts`: hashed IPs for rate limiting, pruned after a day.
- Row Level Security is on with no policies, and `anon` / `authenticated` have no grants. Only the service role can read or write.

Apply to a linked project:

```bash
supabase link --project-ref <ref>
supabase db push
```

Status and notes are edited in the Supabase table editor.

## Waitlist form

A server action validates and sanitizes every field, normalizes email, website and LinkedIn URLs, and inserts the row. A duplicate email returns the same "on the list" state without revealing anything else. Protections:

- hidden honeypot field and a minimum fill time (bots get a silent fake success)
- rate limiting: 5 attempts per 10 minutes per server instance, and 10 per hour per hashed IP in the database
- an httpOnly cookie so the confirmation survives a refresh

No email is sent on signup.

## Exporting the waitlist

```bash
curl -u admin:"$WAITLIST_EXPORT_TOKEN" https://agenyra.space/api/admin/waitlist/export -o waitlist.csv
# or
curl -H "Authorization: Bearer $WAITLIST_EXPORT_TOKEN" https://agenyra.space/api/admin/waitlist/export -o waitlist.csv
```

Opening the URL in a browser prompts for a username (anything) and password (the token).

The file is UTF-8 with a BOM and CRLF line endings, so Excel opens it with the right encoding. Columns: ID, Created At, Name, Email, Phone, Company, Website, LinkedIn, Role, Interest, Message, Source, Status, Notes. Cells that start with `=`, `+`, `-`, `@`, tab or carriage return are prefixed with `'` so spreadsheets don't run them as formulas.

Rotate the token by changing `WAITLIST_EXPORT_TOKEN` in Vercel and redeploying.
