# manuelcecchetto.it

Portfolio and editorial site built with Astro 5, Astro Content Layer collections, and MD/MDX content authoring.

## Requirements

- Node.js 20+ (LTS recommended)
- npm 10+

## Local Setup

```bash
npm install
npm run dev
```

Local dev server defaults to `http://localhost:4321`.

## Validation and Build

Run these before opening a release candidate:

```bash
npm run check
npm run typecheck
npm run build
```

Canonical quality gate:

```bash
npm run quality:gate
```

## Content Editing

Content lives in Astro collections:

- Blog: `src/data/blog/*.md` and `src/data/blog/*.mdx`
- Projects: `src/data/projects/*.md` and `src/data/projects/*.mdx`

See editorial workflow details in [docs/content-workflow.md](docs/content-workflow.md).

## QA and Release Docs

- Manual release checklist template and latest summary:
  - [docs/qa/release-checklist.md](docs/qa/release-checklist.md)
  - [docs/qa/release-checklist-execution-2026-03-01.md](docs/qa/release-checklist-execution-2026-03-01.md)
- QA gate details: [docs/qa/quality-gate.md](docs/qa/quality-gate.md)

## Final Handoff

Project closeout summary, known limitations, and recommended next steps:

- [docs/handoff.md](docs/handoff.md)
