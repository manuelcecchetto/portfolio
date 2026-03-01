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

Both collections require:

- `title` (string)
- `slug` (string; URL segment)
- `summary` (string)
- `publishedAt` (date)
- `tags` (array of strings)
- `draft` (boolean)

Optional fields:

- `updatedAt` (date)
- `coverImage` (string path)

Projects additionally require:

- `role` (string)
- `stack` (array of strings)
- `duration` (string)

Projects optional links:

- `repositoryUrl` (string URL)
- `demoUrl` (string URL)

## Draft and Publish Rules

- Draft entries (`draft: true`) are available in local/non-production workflows.
- Production builds exclude drafts (`getBlogPosts()` and project queries filter draft content for production output).
- Before publishing, set `draft: false` and ensure all referenced assets exist.

## Media Contract

Per current project contract, any content-referenced image path must map to a committed file under `public/images/**`.

Examples:

- `/images/blog/<slug>.svg`
- `/images/projects/<slug>-cover.svg`

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
