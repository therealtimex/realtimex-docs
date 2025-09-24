# AGENTS: Working with realtimex-docs

This is a short, practical playbook for adding/editing docs in the RealTimeX docs site (https://docs.realtimex.ai/). The site runs on Next.js with the Nextra docs theme.

## TL;DR workflow
- Create content as MDX under `pages/` (typically `pages/features/your-page.mdx`).
- Add a sidebar entry by updating the nearest `_meta.json` (e.g., `pages/features/_meta.json`).
- Put images in `public/images/` and reference them with `/images/...` (the theme maps `img`/`Image` to a custom component that handles `basePath`).
- Preview locally: `yarn dev` (http://localhost:3333). Build: `yarn build`. 
- Open a PR to main; merges will deploy to https://docs.realtimex.ai/.

## Repo structure (essentials)
- `pages/` — All content pages (MDX). Sidebar and routing derive from folder structure and `_meta.json` files.
  - `_meta.json` — Controls titles, order, visibility, and theme options for pages in that folder.
  - `features/` — Feature‑specific docs. Add new feature pages here.
- `public/` — Static assets (images). Use `/images/...` in MDX.
- `components/CustomImage.tsx` — All images (`<img>` or `<Image>`) are routed through this wrapper.
- `theme.config.tsx` — Nextra theme and site config (sidebar, SEO, social, etc.).

## Adding a new page (checklist)
1. Create a file: `pages/features/<kebab-case-name>.mdx`.
2. Add frontmatter at the top:
   ```mdx
   ---
   title: Clear Page Title
   description: One‑line summary users will see in previews/SEO.
   ---
   ```
3. Write content that’s user‑facing: short sections, scannable bullets, concrete steps.
4. Add a sidebar link: edit `pages/features/_meta.json` and insert an entry:
   ```json
   "<kebab-case-name>": {
     "title": "Clear Page Title",
     "theme": { "breadcrumb": true, "footer": true, "pagination": true, "toc": true }
   }
   ```
5. (Optional) Link from other pages using absolute paths like `/features/<kebab-case-name>`.
6. Preview locally (`yarn dev`) and verify the page shows and the sidebar entry looks right.

## Images & media
- Place image files in `public/images/`. Use compressed assets.
- Reference in MDX with Markdown or JSX:
  - `![Alt text](/images/your-image.png)`
  - `<img src="/images/your-image.png" alt="Alt text" width="600" />`
- For large/new images, run `yarn img` to compress (uses `scripts/compress-images.mjs`).

## Writing style (user‑facing)
- Lead with outcome; keep it actionable and concise.
- Prefer sections and bullets over long paragraphs.
- Avoid internal architecture details unless strictly necessary.
- Add short troubleshooting/tips when helpful.

## Local development
- Install deps (first time): `yarn`
- Dev server: `yarn dev` → http://localhost:3333
- Build: `yarn build` (uses Next.js/Nextra)

## Sidebar rules of thumb
- Each folder’s `_meta.json` controls only that folder.
- Order in `_meta.json` defines sidebar order.
- Use human‑readable titles; keep them short.
- You can hide a page with `{ "display": "hidden" }` in its `_meta.json` entry.

## Linking & embeds
- Internal links: use absolute site paths (e.g., `/features/voice-chat`).
- Code blocks: standard Markdown fences (```) with a language tag for highlighting.
- Images: always use `/images/...` so basePath works across environments.

## Common gotchas
- If images don’t show: ensure files are under `public/images/` and the path starts with `/images/`.
- Sidebar not updating: you edited the wrong `_meta.json` or file name doesn’t match the key.
- Broken links: pages live under `pages/`; the file name (without `.mdx`) forms the route segment.

## Release/PR
- Commit changes on a feature branch and open a PR to `main` in the docs repo.
- After merge, the site deploys to https://docs.realtimex.ai/.

