# Content Workflow

- NodeID: `n14_deploy_and_editorial_docs`
- Date: `2026-03-01`
- Author: `codex_agent_1`

This document is the canonical authoring workflow for blog and project content.

## Collections and Paths

- Blog entries: `src/data/blog/**/*.{md,mdx}`
- Project entries: `src/data/projects/**/*.{md,mdx}`
- Public media assets referenced by content: `public/images/**`

Collections are defined in `src/content.config.ts` and validated by schemas in `src/content/schemas.ts`.

## Required Frontmatter

The schemas in `src/content/schemas.ts` are the source of truth. Both collections require:

- `title` (3–120 chars)
- `slug` (kebab-case URL segment, shared by every translation)
- `locale` (`en`, `it`, `de`, `fr`, `zh`, `hi`) and `translationGroup` (`projects:<slug>` or `blog:<slug>`)
- `summary` (24–240 chars; shown on cards and as the hero lead)
- `publishedAt` (date)
- `tags` (array; lowercased and kebab-cased by the schema, so write them however reads best)
- `draft` (boolean)

Optional: `updatedAt`, `coverImage`. Blog posts may set `readingTimeMinutes`; projects may set `featured`, `repositoryUrl` and `demoUrl`.

Missing locales fall back to the `en` entry, so an English-only entry is valid everywhere.

## Projects and the home page

- `featured: true` projects lead `/projects` as wide cards; the rest appear under "Smaller things". Within each group, order is newest `updatedAt ?? publishedAt` first.
- Card and hero-band colors are assigned by list position (`src/lib/tones.ts`), not by frontmatter.
- The home Work bento has a hand-made wasmspace tile (copy in `src/lib/home-copy.ts` → `work.wasmspace`, all six locales) followed by the next two featured projects.
- Do not add `repositoryUrl` for private repositories; the detail page then shows "The source is private for now."

## Draft and Publish Rules

- Draft entries (`draft: true`) are available in local/non-production workflows.
- Production builds exclude drafts (`getBlogPosts()` and project queries filter draft content for production output).
- Before publishing, set `draft: false` and ensure all referenced assets exist.

## Media Contract

Any content-referenced image path must map to a committed file under `public/images/**` and match `/images/...(avif|webp|png|jpg|svg)`.

Prefer real screenshots over illustrations. Convert them to WebP (about 1200–1400 px wide) before committing, for example:

- `/images/projects/<slug>-cover.webp`
- `/images/blog/<slug>-<figure>.webp`

Only use screenshots that show fixture or demo data, never private content. Covers are cropped to 16:10 on cards, so keep the subject near the center.

Do not merge content changes that introduce non-existent media paths.

## Authoring Flow

1. Create or edit the content file in `src/data/blog` or `src/data/projects`.
2. Validate frontmatter against the required fields above.
3. Add/update referenced images in `public/images/**`.
4. For MDX posts, optionally use prose components:
   - `<Callout />`
   - `<ImageFigure />`
   - `<CodeNote />`
5. Run checks:
   - `npm run check`
   - `npm run typecheck`
   - `npm run build`
6. For release candidates, run:
   - `npm run quality:gate`
   - `docs/qa/release-checklist.md`

## MDX Notes

- `.mdx` files are supported in the blog collection.
- Shared prose components live under `src/components/prose/`.
- Keep component usage semantic and avoid ad-hoc inline styles in content files.
