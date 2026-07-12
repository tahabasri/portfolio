# tahabasri.com

Personal site of Taha Basri — portfolio + blog, one [Astro](https://astro.build) static site at
https://tahabasri.com (blog at [/blog](https://tahabasri.com/blog), RSS at
[/rss.xml](https://tahabasri.com/rss.xml)).

## Quick start

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs dist/
npm run preview  # serve the build
```

## Layout

- `profile.md` — single source of truth for bio, talks, milestones, projects
- `src/pages/index.astro` — portfolio home (design system in `public/css/style.css`)
- `src/data/*.yml` — work / speaking / experience content driving the portfolio sections
- `src/content/blog/<slug>/` — blog posts (markdown + colocated images)
- `.github/workflows/deploy.yml` — builds and deploys to GitHub Pages on push to `master`

See [CLAUDE.md](CLAUDE.md) for the full contributor guide. The previous Jekyll version of the site
is preserved on the `legacy-site` branch.

## Credits

- Favicon generated with [favicon.io](https://favicon.io/favicon-generator/)
- Design inspired by [mattdavella.com](https://www.mattdavella.com/)
