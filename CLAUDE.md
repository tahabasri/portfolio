# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal portfolio for Taha Basri — a **single-page Jekyll static site** served at https://tahabasri.com (custom domain via `CNAME`), deployed by GitHub Pages from the **`gh-pages`** branch. `master` is the repo's default/base branch for PRs; active work happens on `new-version`.

The site is a **dark, modern, Moroccan-accented** theme (deep navy surfaces, sky-blue accent, terracotta "clay" highlights). Content is **data-driven** — Selected Work, Speaking & Community, and the Experience timeline all render from `_data/*.yml`, so most content edits are YAML edits, not markup edits.

## Commands

```bash
jekyll serve                 # local dev at http://localhost:4000, watches + rebuilds on change
jekyll build                 # one-off build into _site/
rm -rf _site .jekyll-cache   # force a clean state (see gotcha below)
```

- **Run `jekyll` directly, not `bundle exec jekyll`.** Jekyll is installed as a system gem and is intentionally *not* in the `Gemfile` (the Gemfile only carries runtime deps: `webrick`, `kramdown-parser-gfm`, `nokogiri`, `jekyll-watch`). `bundle exec jekyll` fails with "command not found". The `jekyll` entry in `package.json` is vestigial — there is no npm/Node build step.
- **Stale-build gotcha:** a plain `jekyll build` can emit stale output because `.jekyll-cache` isn't always invalidated on asset/layout edits. If a change isn't reflected, `rm -rf _site .jekyll-cache` and rebuild, or just use `jekyll serve` which watches. GitHub Pages always builds clean, so this only bites local builds.
- No tests, no linter, no CI config in this repo.

## Architecture

The entire visible site is **one page**. `index.md` is an empty front-matter stub (`layout: main`); **all markup lives in [_layouts/main.html](_layouts/main.html)**. There are no `_includes` and no collections. To change the site you touch four things: the layout, `css/style.css`, `scripts/index.js`, and the `_data/*.yml` files.

Section flow (top → bottom): floating pill **nav** → dark **hero** (photo with a CSS "glitch" swap, over a very subtle rotating Moroccan background) → **What I do + stats** → **Selected Work** (data-driven stacking cards) → **Speaking & Community** (data-driven, paginated card grids) → **About** (Moroccan-roots story + 3-photo polaroid collage) → **the journey so far** (data-driven experience timeline) → **CTA / footer**.

- **[_layouts/main.html](_layouts/main.html)** — full page structure. Hardcoded copy lives here (hero, What-I-do statement, About prose); repeatable content is looped from `_data/*.yml` (see **Data files** below). The subtle rotating background is generated inline: a Liquid loop over `img/bg/` builds the `.site-bg` layers and an accompanying `@keyframes bg-cycle` whose timing is derived from the number of images.
- **[css/style.css](css/style.css)** — all styling. Design system driven by CSS custom properties in `:root` (dark `--bg`/`--bg-2`/`--bg-3`, `--blue` accent, Moroccan `--clay`/`--clay-2`/`--mint`, `--font-sans: Inter`, `--font-script: Caveat`, `--max-w: 1200px` content cap). Sticky-positioned `.card`s create the stacking-cards effect. Responsive breakpoints: `@media (max-width: 900px)` (mobile nav, single-column cards, hero scrim), `820px` (timeline stacks vertically), `760px` (stats 2-up), `620px` (card grids → 1 column), `560px` (hero footer stacks).
- **[scripts/index.js](scripts/index.js)** — one vanilla-JS IIFE (no framework). Handles: the mobile nav (**expanded inline at the top of the page, collapses to the 3-dot hamburger once scrolled** via a `.scrolled` class), IntersectionObserver reveal animations, the scroll-driven word-by-word statement highlight (`#statement`), CTA verb cycling (`#cycle`), the **dynamic years counter** (`.js-years[data-since]`, e.g. years since 2018), and **client-side pagination** for any `.talk-grid[data-page-size]` (shows N cards per page with `← 1 2 →` controls once the count exceeds the page size). The hero photo "glitch" swap and the background rotation are pure CSS/Liquid — no JS.
- **External deps** are all CDN `<link>`s in the `<head>`: Google Fonts (Inter + Caveat) and Font Awesome 6.5.1. No local JS/CSS dependencies, no bundler.

### Data files (`_data/`)

Edit these to change content; the layout loops over them. Fields are documented in comments at the top of each file.

- **[_data/work.yml](_data/work.yml)** — Selected Work cards. Per item: `year`, `title`, `tags[]`, `desc`, `link`, `cta`, optional `icon` (Font Awesome class), optional `internal: true` (on-page `#anchor` link → same tab), `accent` (`blue` | `clay`), optional `images[]`. If `images` is omitted the card art falls back to a large glyph of `icon`.
- **[_data/speaking.yml](_data/speaking.yml)** — two lists: `conferences:` (featured Trailblazer Community Conferences) and `community:` (local/regional meetups & sessions). Both render as identical cards. Per item: `event`/`org`, `edition` (year, shown as a badge), `location` (city), `topic`, optional `image` (path in `img/speaking/`), optional `video` (shows a play button + "Watch"), optional `link`.
- **[_data/experience.yml](_data/experience.yml)** — the "journey so far" timeline. Per role: `company`, `logo`, `role`, `location`, `period` (short phase label on the pill, e.g. "Now"/"Earlier"/"Started"), optional `current: true` (mint styling on the pill), `points[]` (highlights; basic HTML like `<strong>` allowed, escape `&` as `&amp;`).

### Custom plugin: local-only customer injection

[_plugins/customers_injector.rb](_plugins/customers_injector.rb) registers a Jekyll `post_render` hook (uses `nokogiri`). For any element `[data-id="customers"][data-name="X"]`, it replaces the element's inner HTML with the contents of `customers/X-customers.html`. The `customers/` directory is **gitignored and absent** by default, so the injector is a **no-op** unless you create those local files. The current layout does not use `data-id="customers"` anchors, so this is dormant.

## Assets

`img/` is organised into subfolders — keep new assets in the right one and reference the full path:

- `img/profile/` — `default.png` (main hero photo) and `alternative.png` (the shot that "glitches" over the default in the hero; both are clean cutouts, same framing/size).
- `img/companies/` — company/tool logos (`comp_SALESFORCE_logo.png`, `comp_ORACLE_logo.png`, `comp_CGI_logo.png`). Rendered recoloured white via CSS.
- `img/work/` — Selected Work images (e.g. `snippets.png`).
- `img/speaking/` — talk photos/thumbnails for Speaking & Community cards. Convention: `YYYY-slug.ext` (e.g. `2025-nad.jpg`).
- `img/bg/` — the subtle rotating background scenery (Moroccan scenes). **Fully dynamic:** drop any image in and it joins the crossfade automatically (no code change; timing recomputes from the file count).
- `img/about/` — the 3 About polaroids: `then.JPG` (captioned "first tech"), `roots.jpg`, `now.JPG`.
- `img/icons/` — small inline PNG icons used in labels/hero (`wave`, `uae`, `morocco` flags, `door`, `tarbouche`, `tea`).
- `img/misc/` — one-offs (e.g. `collab.jpg`, used in the CTA frame).
- `favicon_io/` — the generated favicon set (`.ico`, PNGs, `apple-touch-icon`, `site.webmanifest`), wired up in `<head>`.

Fonts are Inter (`--font-sans`) and Caveat (`--font-script`); icons are Font Awesome 6.5.1 — all via CDN.

Content is **real** (drawn from Taha's résumé and Salesforce career doc), with two caveats: some `edition` years on `community:` entries in `speaking.yml` are best-guess placeholders (adjust when known), and `img/about/then.JPG`/`roots.jpg`/`now.JPG` are the intended photos — replace freely.

## Syncing content (the common edits)

Most updates are **YAML edits + drop an image in the matching folder**, then rebuild. GitHub Pages rebuilds on push to `gh-pages`; locally, `jekyll build` (or `jekyll serve`).

### Add a new speaking event or community session
1. Drop the photo in `img/speaking/` using the `YYYY-slug.ext` convention (optional — an entry with no `image` renders a placeholder glyph).
2. Add an entry to [_data/speaking.yml](_data/speaking.yml):
   - A **Trailblazer Community Conference** → under `conferences:` (fields: `event`, `edition`, `location`, `topic`, `image`, optional `video`/`link`).
   - A **meetup / local or regional session** → under `community:` (fields: `org`, `edition`, `location`, `topic`, `image`, optional `video`/`link`).
   - Order matters — the list renders top-to-bottom; put newest first. Keep `topic` free of em dashes (site convention: use `:` or a comma).
3. Rebuild. The card appears automatically; each grid **paginates at 6 items** (`data-page-size="6"` on the `.talk-grid`), so no layout work is needed as the list grows. Adjust the count in the `SPEAKING & COMMUNITY` intro copy in `main.html` if you reference an exact number (e.g. "Six … Conferences").

### Add / update a Selected Work item
Edit [_data/work.yml](_data/work.yml); add the image to `img/work/` and reference it in `images[]` (or omit `images` to use the `icon` glyph). Set `internal: true` if `link` is an on-page anchor.

### Add / update an experience role
Edit [_data/experience.yml](_data/experience.yml). The timeline alternates up/down automatically and stacks on mobile; set `current: true` on the present role and give each a short `period` pill label.

### Other content
Hero headline/sub, the "What I do" statement, About prose, stats (`8+ years`, `3 companies`), and the "Based in Dubai · from Morocco" line are hardcoded in [_layouts/main.html](_layouts/main.html). The years figure auto-updates via `.js-years[data-since="2018"]`.

## Responsive / verifying visually

The site is tuned for desktop, tablet, and mobile. When testing headless-Chrome screenshots on Windows, note the layout viewport is **pinned to a ~484px minimum** regardless of a smaller `--window-size` — capture at window width 484 for an accurate "mobile" view and ≥768 for tablet, rather than 360–390 (which just crops the 484 layout and looks like false overflow). `body` has `overflow-x: hidden`, so genuine overflow is clipped, not scrollable — verify with `scrollWidth === clientWidth`.
