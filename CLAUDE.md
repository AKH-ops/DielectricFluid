# DielectricFluid.com — site conventions

This repo is the dielectricfluid.com site: an independent register of dielectric fluids, built with Astro and
deployed as a Cloudflare Worker (static assets only) via Workers Builds on push to `main`. Governance lives in
`D:\Business\ops` (`policies/domains/dielectricfluid.com.md`); this file is the site's conventions, not authority.

## The one rule
**Every value comes from the maker's own document and is cited to its page.** No reseller summaries, no search
snippets, no rounding, no derived values presented as the maker's. If a document cannot be read, the value is not added.

## Where things are
- `src/data/fluids/<line>.json` — one file per maker document (= one product line). Grades inside. Values in canonical
  units; `pub` keeps the printed value when converted; `q` for > < ≈; `none: true` when the maker states "none".
- `src/data/sources.json` — every source (maker sheets, archived copies, regulators, press). Each has `checked`.
- `src/data/discontinued.json` — 3M grades from the Dec 2022 impacted-products list (finder input).
- `src/content/guides/*.md` — guides and site pages. Cite with `{{src:<id>}}` or `{{src:<id>:<page>}}`
  (`src/lib/remark-cite.mjs`; unknown ids fail the build). Brief first: `ops/memory/dielectricfluid.com/briefs/`.
- `src/lib/fluids.ts` — property vocabulary, completeness rule, formatting. `src/lib/timeline.ts` — PFAS timeline.
- `public/_redirects` — 301s from every old Blogger URL. A trailing-slash block is generated at build.
- `_source/blogger-2026-10-10/` — backup of the Blogger site the content was migrated from.
- `worker/index.js` — the desk form handler, the only server code. Only `/api/*` runs it (`run_worker_first`). It checks
  origin, honeypot and Turnstile, stores to D1 (`DB`, table created on first use; schema also in `migrations/`), and
  emails the desk via Email Routing (`DESK_MAIL`, from `desk@`). Secrets live only in the dashboard:
  `TURNSTILE_SECRET`, `NOTIFY_TO`. Form option values in `src/pages/desk/index.astro` must match `CHOICES` in the worker.

## Rules the build enforces (`scripts/audit.mjs`)
- Known makers, sources, property keys; numeric values; valid pages, qualifiers, PFAS status + basis + quoted words.
- A product line gets a page only when every grade has density, viscosity, thermal conductivity, specific heat,
  dielectric strength and a boiling or flash point (`isComplete`) and `published_on` is set.
- At most **5 product pages per published date** (launch date excepted, CEO D5). Guides: 1/day (ops policy cap).
- Guides need title + description; no placeholder text.
- No empty Turnstile site key and no `REPLACE_WITH` placeholder in `wrangler.jsonc` (skipped only with `DESK_LOCAL=1`).

## Commands
`npm run dev` · `npm run build` (audit + build) · `npm run linkcheck` (after build; `-- --external` checks sources)
· `npx wrangler dev --port 8788` (real Workers runtime; runs `npm ci` — do not run while another build is running).
Local desk test: `.dev.vars` (git-ignored) holds Cloudflare's always-pass Turnstile test secret, a test `NOTIFY_TO` and
`ALLOWED_ORIGINS=http://localhost:8788`; run with `DESK_LOCAL=1 PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA`.
Emails land as .eml under `.wrangler/tmp/email/`. Stopping the dev server: kill its node processes and the workerd on
the port; stopping the parent shell leaves them running and they restart workerd.

## Voice
Plain, specific, British spelling, second person where natural. State the answer first. Say "we do not know" rather
than guess. Never claim experience, tests, reviews or endorsements we do not have.
