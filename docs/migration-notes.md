# Phase 0 inventory — portfolio rebuild (Jekyll → Astro)

Snapshot taken 2026-07-12 on `gh-pages` (HEAD `11d9e1b`). Old site preserved on branch `legacy-site`.

Decisions confirmed by Taha (2026-07-12 session):
- Portfolio pages: **pixel-identical** port. Blog may differ slightly but must keep the portfolio's vibe (dark navy, sky-blue accent, Moroccan clay highlights, Inter/Caveat).
- One repo, one deploy pipeline (GitHub Actions → Pages; `gh-pages` branch retired as deploy source).
- `profile.md` = canonical human-readable source of truth; structured YAML data files derived from it drive card rendering (hybrid mechanism).
- Jekyll fully replaced by Astro. Official Astro blog starter chosen over AstroPaper (AstroPaper's Tailwind design would fight the pixel-identical CSS port; the official starter is minimal and we keep our own CSS).
- **No sfdefacto domain redirect** (domain never used publicly) — Phase 6 dropped entirely. The `/blog/sfdefacto/` series landing page stays.
- MEDIUM_PROFILE: https://medium.com/@tahabasri — export zip at `docs/medium-export.zip` (gitignored).

## Old-site file inventory → disposition

| Path | What it is | Disposition |
|---|---|---|
| `index.md` | empty front-matter stub (`layout: main`) | drop (replaced by `src/pages/index.astro`) |
| `_layouts/main.html` (306 lines) | ALL page markup: nav, hero, statement/stats, Selected Work, Speaking, About, timeline, CTA/footer; inline Liquid bg-cycle generator | **keep** — port verbatim into Astro components; Liquid loops → Astro; bg-cycle Liquid → build-time glob over `img/bg/` |
| `css/style.css` (798 lines) | entire design system (`:root` custom props, stacking cards, breakpoints 900/820/760/620/560) | **keep verbatim** — copy as global stylesheet; blog pages extend the same variables |
| `scripts/index.js` (190 lines) | vanilla IIFE: mobile nav scroll-collapse, IO reveals, statement highlight, CTA verb cycle, `.js-years`, talk-grid pagination | **keep verbatim** — load as plain script on portfolio page; pagination reused on blog only if needed |
| `_data/work.yml` | 	Selected Work cards | **keep** — content merged into `profile.md` (Projects); structured copy → `src/data/work.yml` |
| `_data/speaking.yml` | conferences + community talks | **keep** — content merged into `profile.md` (Talks); structured copy → `src/data/speaking.yml` |
| `_data/experience.yml` | journey timeline | **keep** — content merged into `profile.md` (Milestones); structured copy → `src/data/experience.yml` |
| `img/**` (profile, companies, work, speaking ×15, bg ×4, about, icons, misc) | all site imagery | **keep all** — move under `public/img/**` (same paths so CSS/markup ports unchanged) |
| `favicon/` + root `favicon.ico` | generated favicon set + webmanifest | **keep** — move to `public/` (root-level favicon paths preserved) |
| `CNAME` (`tahabasri.com`) | Pages custom domain | **keep** — becomes `public/CNAME` |
| `_config.yml` | kramdown/style only | drop (Jekyll-only) |
| `_plugins/customers_injector.rb` | dormant local-only customer injector (no anchors use it) | drop — noted here in case it's ever wanted again; would become an Astro build hook |
| `Gemfile`, `Gemfile.lock` | Ruby deps | drop |
| `package.json`, `package-lock.json` | vestigial (`jekyll` npm dep, no build step) | drop — replaced by Astro's package.json |
| `README.md` | repo readme | keep — rewrite for new stack in Phase 7 |
| `credits.txt` | favicon.io + mattdavella design credit | **keep** as-is |
| `CLAUDE.md` | repo instructions (Jekyll-era) | rewrite in Phase 7 |
| `.gitignore` | jekyll/site/node ignores | rewrite for Astro (`dist/`, `node_modules/`, `.astro/`, `docs/medium-export.zip`, `customers/**`) |
| `_site/`, `.jekyll-cache/`, `node_modules/` | build output (gitignored) | drop locally when Jekyll goes |
| Analytics | none found in `main.html` | nothing to carry |

Hardcoded copy to merge into `profile.md` (from `main.html`): hero headline/sub, "What I do" statement, About prose, stats (years-since-2018, 3 companies), "Based in Dubai · from Morocco" line, CTA copy.

## Medium export inventory (`docs/medium-export.zip` → `posts/`)

Published stories to migrate (5):

| Date | Title | Series | Slug (proposed) |
|---|---|---|---|
| 2025-07-06 | SF DeFacto #3 — Buyer Group Extensibility for Commerce | sfdefacto | `sfdefacto-buyer-group-extensibility-commerce` |
| 2025-05-28 | SF DeFacto #2 — Support RTL Layouts in LWR Sites | sfdefacto | `sfdefacto-rtl-layouts-lwr-sites` |
| 2025-05-28 | SF DeFacto #1 — Salesforce Headless Commerce Checkout with Saved Payment Method | sfdefacto | `sfdefacto-headless-checkout-saved-payment-method` |
| 2020-12-03 | Can't Find the Perfect Email Signature? Code Your Own! | — | `code-your-own-email-signature` |
| 2020-03-16 | Manage Process as Code | — | `manage-process-as-code` |

Skipped per brief: 1 draft (`draft_Putting-Process-as-Code-into-Practice`), ~7 comment/response entries (the "I'd recommend Snippets…" replies and similar).

sfdefacto identification: unambiguous — the three 2025 posts are explicitly titled "SF DeFacto #n". The two 2020 posts are not sfdefacto.
