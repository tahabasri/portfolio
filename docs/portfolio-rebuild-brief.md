# Portfolio rebuild & blog migration — brief for Claude Code

> **Put this file at the root of the portfolio repo** (e.g. as `MIGRATION.md`) and start a Claude
> Code session there with: *"Read MIGRATION.md and execute it. Start with Phase 0."*
> When the migration is complete, fold the durable parts of this file into the repo's `CLAUDE.md`
> and delete the rest.

---

## 1. Context — read this first

I'm **Taha Basri**, Salesforce Technical Architect, based in the UAE. This repo is my personal
site. This migration consolidates three drifting surfaces into **one repo, one domain, one deploy
pipeline**:

| Surface | Today | Target |
|---|---|---|
| Portfolio | This repo, GitHub Pages, `tahabasri.com` | Same domain, rebuilt as part of one Astro site |
| Blog | Medium (SEO accrues to Medium, not me) | `tahabasri.com/blog` — Medium becomes syndication-only |
| sfdefacto articles | Medium posts branded "sfdefacto"; I own the sfdefacto domain; a Cloudflare-hosted site existed but is dead | A **tag/series inside the blog** (`/blog/sfdefacto/`), NOT a separate site. Domain becomes a 301 redirect |

**Decisions already made — do not re-litigate them:**

1. **One Astro site** at `tahabasri.com`: portfolio pages + blog under `/blog`.
2. **No separate sfdefacto domain/site.** sfdefacto survives as a tag with its own landing page
   and light visual branding. The domain will 301 to that page (DNS is my job, see Phase 6).
3. **No `blog.` subdomain.** The blog lives at `/blog` on the apex.
4. **Hosting: GitHub Pages** via GitHub Actions (`withastro/action`). Not Cloudflare Pages —
   the previous Cloudflare site died and I don't want a second hosting platform.
5. **`profile.md` at the repo root is the single source of truth** for bio, talks, milestones,
   projects. Pages render from it (or from data derived from it) — never duplicate its content
   in page bodies.
6. **No LinkedIn automation** in this migration. Don't build it, don't scaffold for it.
7. Astro over Hugo. Prefer a maintained starter (AstroPaper or the official Astro blog starter)
   over hand-rolling; customize from there.

**My working preference** (applies to every choice you make): minimal manual upkeep, fewer moving
parts, maintained off-the-shelf over custom. When in doubt, pick the boring option.

---

## 2. Placeholders — fill these in before starting

- `SFDEFACTO_DOMAIN`: `sfdefacto.___` ← exact TLD
- `MEDIUM_PROFILE`: `https://medium.com/@___`
- Medium export zip location: `___` (I download it manually — see Phase 2)

---

## 3. Target repo structure

```
/
├── MIGRATION.md              ← this file (delete after migration)
├── CLAUDE.md                 ← repo instructions (create in Phase 7)
├── profile.md                ← SOURCE OF TRUTH: bio, talks, milestones, projects
├── astro.config.mjs          ← site: 'https://tahabasri.com', integrations: sitemap, rss
├── public/
│   ├── CNAME                 ← "tahabasri.com" (GitHub Pages custom domain)
│   └── ...favicons, robots.txt
├── src/
│   ├── content/
│   │   └── blog/             ← one .md per post + colocated images
│   │       └── <slug>/index.md + images
│   ├── pages/
│   │   ├── index.astro       ← portfolio home (rebuilt from current site)
│   │   ├── blog/
│   │   │   ├── index.astro   ← blog listing
│   │   │   ├── [slug].astro  ← post page
│   │   │   └── sfdefacto.astro ← sfdefacto series landing page (branded)
│   │   └── rss.xml.js
│   ├── layouts/
│   └── components/
└── .github/workflows/deploy.yml  ← withastro/action → GitHub Pages
```

### Blog post frontmatter schema

```yaml
---
title: "..."
description: "..."          # 1–2 sentences, used for meta/OG/RSS
pubDate: 2024-05-01         # original Medium publish date — preserve it
updatedDate:                # optional
tags: ["salesforce", ...]
series: "sfdefacto"         # ONLY on sfdefacto-branded posts; omit otherwise
mediumUrl: "https://..."    # original Medium URL, for the record
heroImage: "./hero.png"     # optional, local file
draft: false
---
```

---

## 4. Phases

Work phase by phase. Commit at the end of each phase with a clear message. Don't push force,
don't rewrite history.

### Phase 0 — inventory the current repo (Claude)

1. Read the existing repo: what generator (plain HTML? Jekyll? something else), what pages exist,
   what content must survive (bio, projects, talks, links, CV, analytics snippet, custom CSS
   worth keeping).
2. Write the inventory to a scratch file (`migration-notes.md`, gitignored or deleted later):
   every page/asset in the old site → keep / drop / merge-into-profile.md.
3. **Show me the inventory before deleting anything.** Old content gets preserved on a branch
   (`legacy-site`) before the rebuild touches it.

### Phase 1 — scaffold the Astro site (Claude)

1. Branch: `rebuild-astro`.
2. Scaffold Astro with a blog starter (AstroPaper preferred; official blog template acceptable).
   Pin versions; commit the lockfile.
3. Configure: `site: 'https://tahabasri.com'`, `@astrojs/sitemap`, `@astrojs/rss`, `robots.txt`,
   OpenGraph/meta in the base layout, `public/CNAME` containing `tahabasri.com`.
4. Create `profile.md` populated from the old site's content (Phase 0 inventory). Structure it
   with clear headings (Bio / Now / Talks / Projects / Milestones / Links) so pages can render
   from it predictably.
5. Rebuild the portfolio pages from the old site's content, rendering from `profile.md` where
   possible. Keep the design simple and fast; don't carry over cruft flagged "drop" in Phase 0.
6. Verify locally: `npm run build` clean, `npm run preview` renders home + empty blog.

### Phase 2 — Medium export (ME, manual)

> **Taha does this — Claude: stop and ask for the zip if it isn't in the repo yet.**

1. Medium → Settings → Security and apps → **Download your information** → download zip.
2. Drop it in the repo as `medium-export.zip` (gitignore it) or tell Claude the path.

### Phase 3 — convert & migrate posts (Claude)

1. Convert: `npx medium-2-md convert-local <export>/posts -d -f -i`
   (`-d` downloads images locally, `-f` adds frontmatter). If the tool misbehaves, fall back to
   parsing the export HTML directly — do NOT hot-link `cdn-images-*.medium.com` URLs; every image
   must be downloaded into the post's folder. Skip Medium *drafts* and *comments/responses* in
   the export — migrate published stories only.
2. For each post, produce `src/content/blog/<slug>/index.md` with the frontmatter schema above:
   - Slug: short, kebab-case, derived from the title (drop Medium's trailing hash).
   - Preserve original `pubDate`.
   - Set `mediumUrl` to the original post URL.
   - Tag it; add `series: "sfdefacto"` to the sfdefacto-branded posts. If unsure whether a post
     is sfdefacto-branded, list the ambiguous ones and ask me.
3. **Clean each post by hand** (this is the real work — Medium mangles exports):
   - Code blocks: restore fencing + correct language hints (most posts are Salesforce: `apex`,
     `xml`, `js`, `bash`).
   - Embedded gists/iframes: replace with fenced code or a plain link.
   - Strip Medium artifacts: clap counts, "originally published" footers, profile cards,
     broken `<figure>` wrappers.
   - Headings: Medium exports are heading-soup; normalize to a sane h2/h3 hierarchy.
4. Build the blog listing, post layout, tag pages, and the **`/blog/sfdefacto/` landing page**
   (series intro + its posts; a distinct accent/badge is enough branding — same layout system).
5. RSS at `/rss.xml` including all posts.
6. Verify: `npm run build` clean; click through several posts in preview, including at least one
   code-heavy one and one image-heavy one.

### Phase 4 — deploy pipeline (Claude, then ME for settings)

1. `.github/workflows/deploy.yml` using `withastro/action` → deploy to GitHub Pages on push to
   the default branch.
2. Merge `rebuild-astro` → default branch once I've reviewed the preview.
3. > **Taha, manual:** repo → Settings → Pages → Source: GitHub Actions; custom domain
   > `tahabasri.com`; enforce HTTPS. (Existing DNS on Cloudflare already points at GitHub Pages,
   > grey-clouded — leave it grey-clouded.)
4. Verify live: `https://tahabasri.com` (portfolio), `/blog`, `/blog/sfdefacto/`, `/rss.xml`,
   `/sitemap-index.xml` all 200 and correct.

### Phase 5 — SEO & Medium handover (mixed)

1. (Claude) Sanity-check every page has unique `<title>`, meta description, canonical
   `<link rel="canonical">` pointing at tahabasri.com, and OG tags.
2. > **Taha, manual:** Google Search Console → verify `tahabasri.com` (DNS TXT via Cloudflare)
   > → submit the sitemap.
3. **Medium handling — per existing post** (Medium does NOT allow retroactive canonical URLs on
   posts written natively there; only *imported* posts get one):
   - Default: edit the Medium post, add a top line — *“This article now lives at
     `<new URL>` — the canonical, updated version.”* Keep the post for its distribution.
   - Optional later: delete underperformers from Medium a few weeks after Google indexes the
     new URLs.
   - (Claude) Generate the mapping table `mediumUrl → new URL` as `medium-redirect-map.md` so I
     can work through the edits; the per-post Medium edits are mine to do.
4. **Going forward** (record in CLAUDE.md): publish on tahabasri.com first; optionally use
   Medium's *Import story* on the new URL afterward — imports DO set canonical back to my site.
   Medium = syndication only.

### Phase 6 — sfdefacto domain redirect (ME, manual — record only)

> Nothing for Claude to execute here; keep it in the doc so the plan is complete.

1. Add `SFDEFACTO_DOMAIN` as a (free) zone on Cloudflare; point nameservers there from the
   registrar (registrar doesn't change — same as tahabasri.com).
2. Cloudflare Redirect Rule: `*SFDEFACTO_DOMAIN/*` → `301` → `https://tahabasri.com/blog/sfdefacto/`.
   (Needs a proxied placeholder DNS record — e.g. `A @ 192.0.2.1`, orange-cloud — so the rule fires.)
3. Delete the dead Cloudflare Pages project while in the dashboard.

### Phase 7 — cleanup (Claude + ME)

1. (Claude) Create/refresh the repo's `CLAUDE.md`: stack, structure, frontmatter schema,
   `profile.md`-is-source-of-truth rule, publish flow (site first → Medium import), deploy
   pipeline, and the "no LinkedIn automation yet" note.
2. (Claude) Delete `MIGRATION.md`, `migration-notes.md`, the export zip; keep `legacy-site`
   branch and `medium-redirect-map.md` until I've finished the Medium edits.
3. > **Taha, manual:** update Medium bio → tahabasri.com; update the Life 2.0 workspace
   > (`CLAUDE.md` §10 status + blueprint) on the other machine.

---

## 5. Acceptance checklist

- [ ] `npm run build` clean, no broken internal links (run a link check on `dist/`)
- [ ] Portfolio content parity with the old site (per Phase 0 inventory, nothing "keep" lost)
- [ ] Every Medium published story migrated: correct date, tags, images local, code blocks fenced
- [ ] sfdefacto posts carry `series: "sfdefacto"` and appear on `/blog/sfdefacto/`
- [ ] RSS + sitemap + robots.txt + canonical/OG on every page
- [ ] Deploys automatically on push via GitHub Actions; `tahabasri.com` live with HTTPS
- [ ] `medium-redirect-map.md` generated (old URL → new URL, one row per post)
- [ ] `profile.md` exists and pages render from it
- [ ] Old site preserved on `legacy-site` branch
- [ ] `CLAUDE.md` written; this file deleted

## 6. Hard rules

- Never hot-link Medium CDN images — always local copies.
- Preserve original publish dates.
- Don't build the sfdefacto site, a `blog.` subdomain, or LinkedIn automation.
- Don't force-push; don't delete the `legacy-site` branch.
- Anything marked **Taha, manual** — stop and ask, don't attempt to work around it.
