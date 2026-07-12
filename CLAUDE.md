# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal site for Taha Basri — **one Astro static site** serving the portfolio at
https://tahabasri.com and the blog at https://tahabasri.com/blog. Deployed to **GitHub Pages via
GitHub Actions** (`.github/workflows/deploy.yml`, `withastro/action`) on every push to **`master`**
(the default branch). The old Jekyll site is preserved on the `legacy-site` branch — don't delete
that branch. The `gh-pages` branch is retired as a deploy source.

The design is **dark, modern, Moroccan-accented** (deep navy surfaces, sky-blue accent, terracotta
"clay" highlights; Space Grotesk + Inter + Caveat). The portfolio page is a pixel-identical port of
the legacy design; blog pages reuse the same design system.

## Commands

```bash
npm run dev       # local dev at http://localhost:4321, hot reload
npm run build     # build into dist/ (also validates content collections)
npm run preview   # serve the built dist/
npx astro sync    # regenerate content-collection types (after schema changes)
```

No tests or linter. `npm run build` is the health check — it fails on broken frontmatter,
missing images, or bad imports.

## Source of truth: profile.md

**`profile.md` at the repo root is the single source of truth** for bio, talks, milestones,
projects and links. Pages render from the structured copies in `src/data/*.yml` — when content
changes, update `profile.md` **and** the matching data file together; never duplicate profile
content in page bodies.

## Architecture

- **[src/pages/index.astro](src/pages/index.astro)** — the portfolio home, a 1:1 port of the legacy
  Jekyll layout: same markup, class names and asset paths. Hardcoded copy (hero, statement, About
  prose, stats) lives here; repeatable content loops over `src/data/*.yml` (imported via
  `@rollup/plugin-yaml`; types in [src/env.d.ts](src/env.d.ts)). It has its **own `<head>`** (it
  does not use `BaseHead`). The subtle rotating background reads `public/img/bg/` at build time —
  drop an image in and it joins the crossfade automatically.
- **[public/css/style.css](public/css/style.css)** — the whole design system (CSS custom props in
  `:root`, stacking cards, breakpoints at 900/820/760/620/560px). Shared by the portfolio **and**
  blog pages. [src/styles/global.css](src/styles/global.css) adds blog-only styles (prose, post
  list, series badge) on top of the same tokens.
- **[public/scripts/index.js](public/scripts/index.js)** — vanilla-JS IIFE, loaded on every page:
  pill-nav collapse/toggle, IntersectionObserver reveals, statement word highlight, CTA verb cycle,
  `.js-years[data-since]` counter, `[data-page-size]` pagination. Fully null-guarded, so it's safe
  on blog pages.
- **Blog** — Astro content collection (`src/content/blog/<slug>/index.md` + colocated images).
  Layout/pages: [src/layouts/BlogPost.astro](src/layouts/BlogPost.astro),
  `src/pages/blog/index.astro` (listing), `[...slug].astro` (posts), `tags/[tag].astro`,
  [sfdefacto.astro](src/pages/blog/sfdefacto.astro) (series landing at `/blog/sfdefacto/`, clay
  branding). RSS at `/rss.xml`, sitemap via `@astrojs/sitemap`, `public/robots.txt`.
- Shared components in `src/components/`: `BaseHead` (blog `<head>`: canonical, OG, favicons,
  fonts), `Header` (same pill nav as the portfolio), `Footer`, `PostList`, `FormattedDate`.
  Site-wide constants in [src/consts.ts](src/consts.ts).

### Data files (`src/data/`)

Same shapes as the old Jekyll `_data/` files; field docs are in comments at the top of each file.

- **[work.yml](src/data/work.yml)** — Selected Work cards (`year`, `title`, `tags[]`, `desc`,
  `link`, `cta`, optional `icon`/`internal`/`accent`/`images[]`).
- **[speaking.yml](src/data/speaking.yml)** — `conferences:` and `community:` lists (`event`/`org`,
  `edition`, `location`, `topic`, optional `image`/`video`/`link`). Newest first; grids paginate at
  6 via `data-page-size`.
- **[experience.yml](src/data/experience.yml)** — timeline (`company`, `logo`, `role`, `location`,
  `period`, optional `current`, `points[]` — basic HTML allowed, escape `&` as `&amp;`).

### Blog post frontmatter schema

```yaml
---
title: "..."
description: "..."          # 1–2 sentences, used for meta/OG/RSS
pubDate: 2024-05-01         # original publish date — preserve it (ISO datetime for same-day ordering)
updatedDate:                # optional
tags: ["salesforce", ...]
series: "sfdefacto"         # ONLY on SF DeFacto posts; omit otherwise
mediumUrl: "https://..."    # original Medium URL, if syndicated
heroImage: "./hero.jpg"     # optional, colocated file
draft: false
---
```

Schema is enforced in [src/content.config.ts](src/content.config.ts). Images must be **local,
colocated** in the post folder — never hot-link Medium CDN URLs.

## Publish flow (blog)

1. Write the post at `src/content/blog/<slug>/index.md` (short kebab-case slug), images alongside.
2. Push to `master` → GitHub Actions builds and deploys.
3. **Medium is syndication-only**: optionally use Medium's *Import story* on the new tahabasri.com
   URL afterwards — imports set the canonical back to this site. Never publish on Medium first.
4. `docs/medium-redirect-map.md` tracks the old Medium posts that still need their "now lives at"
   top-line edits (manual, on Medium).

**No LinkedIn automation** — don't build it, don't scaffold for it.

## Assets

`public/` is served as-is at the site root; the `img/` subfolder layout is unchanged from the old
site — keep new assets in the right subfolder and reference the full path:

- `img/profile/` — hero photos (`default.png` + `alternative.png` glitch shot).
- `img/companies/` — company logos (recoloured white via CSS).
- `img/work/` — Selected Work images. · `img/speaking/` — talk photos (`YYYY-slug.ext`).
- `img/bg/` — rotating background scenery (fully dynamic, timing recomputes from file count).
- `img/about/` — the 3 About polaroids. · `img/icons/` — small inline icons. · `img/misc/` — one-offs.
- `favicon/` + root `favicon.ico` — favicon set, wired in both heads.
- `CNAME` (tahabasri.com) lives in `public/` — required for the custom domain; don't remove.

Fonts (Inter, Space Grotesk, Caveat) and Font Awesome 6.5.1 are CDN links in the heads.

## Deployment

- Pages source is **GitHub Actions** (repo Settings → Pages), custom domain `tahabasri.com`,
  HTTPS enforced. DNS is on Cloudflare, grey-clouded — leave it grey-clouded.
- Don't force-push. Don't delete the `legacy-site` branch.

## Responsive / verifying visually

Tuned for desktop, tablet and mobile. When testing headless-Chrome screenshots on Windows, the
layout viewport is pinned to a ~484px minimum regardless of a smaller `--window-size` — capture at
width 484 for "mobile" and ≥768 for tablet. `body` has `overflow-x: hidden`, so verify genuine
overflow with `scrollWidth === clientWidth`. Viewport-height sections (hero) stretch in very tall
full-page captures; prefer normal window heights per section. Reveal animations mean anchors can
capture before content fades in — use `--virtual-time-budget`.
