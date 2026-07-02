# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal portfolio for Taha Basri — a **single-page Jekyll static site** served at https://tahabasri.com (custom domain via `CNAME`), deployed by GitHub Pages from the **`gh-pages`** branch. `master` is the repo's default/base branch for PRs.

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

The entire visible site is **one page**. `index.md` is an empty front-matter stub (`layout: main`); **all markup lives in [_layouts/main.html](_layouts/main.html)**. There are no `_includes`, no collections, no other pages. To change the site, edit the layout, `css/style.css`, and `scripts/index.js` — that's the whole surface.

- **[_layouts/main.html](_layouts/main.html)** — full page structure, section by section (floating pill nav → sky hero → stats → stacking work cards → writing → about → experience timeline → testimonial marquee → CTA/footer). Content is hardcoded, not data-driven.
- **[css/style.css](css/style.css)** — all styling. Design system driven by CSS custom properties in `:root` (sky-blue palette, `--font-sans: Inter`, `--font-script: Caveat`, radii). Sticky-positioned `.card`s create the stacking-cards effect; `@media (max-width: 900px)` collapses them.
- **[scripts/index.js](scripts/index.js)** — one vanilla-JS IIFE (no framework). Handles mobile nav toggle, IntersectionObserver reveal animations, the scroll-driven word-by-word statement highlight (`#statement`), CTA verb cycling (`#cycle`), and the testimonial marquee (duplicates its track for a seamless loop).
- **External deps** are all CDN `<link>`s in the `<head>`: Google Fonts (Inter + Caveat) and Font Awesome 6.5.1. No local JS/CSS dependencies, no bundler. (Note: the `README.md` "Technologies Used" list — jQuery, Bootstrap, Animate.css — is **stale**; those were removed in the redesign.)

### Custom plugin: local-only customer injection

[_plugins/customers_injector.rb](_plugins/customers_injector.rb) registers a Jekyll `post_render` hook (uses `nokogiri`). For any element `[data-id="customers"][data-name="X"]`, it replaces the element's inner HTML with the contents of `customers/X-customers.html`. The `customers/` directory is **gitignored and absent** by default, so the injector is a **no-op** unless you create those local files — it exists to splice in private customer logos/content that aren't committed. The current layout does not use `data-id="customers"` anchors, so this is currently dormant.

## Assets & content notes

- `img/master-cutout.png` is a chroma-keyed version of `master-pic.png` (decorative purple blob removed), used **only** in the hero. The original `master-pic.png` is still used in the nav avatar and CTA frame.
- The current design is a faithful clone of the Framer template `sanjaymenon.framer.website`.
- Some sections contain **placeholder data** pending real content: the Recommendations testimonials are fake (dummy names, marked with an HTML comment), and Experience dates/titles are approximate. Don't treat them as fact.
```
