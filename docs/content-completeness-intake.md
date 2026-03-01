# Portfolio Content Completeness Intake

- Date: 2026-03-01
- Scope scanned: `src/pages`, `src/components/pages`, `src/components/{projects,blog,prose}`, `src/data`, `src/lib/i18n.ts`, `public/images`, and existing docs.

## Current Status (Audit Summary)

The site structure is production-ready, but content is not yet publication-complete.

Main gaps:

1. Multiple key sections still render visual placeholders instead of real media.
2. Project and blog entries are valid but still lightweight; they need richer, credibility-focused narrative and evidence.
3. Profile content source-of-truth is split between `src/lib/i18n.ts` and `src/data/profile.json`; final editorial choices from you are needed.
4. The site supports 6 locales (`en`, `it`, `de`, `fr`, `zh`, `hi`), so we need your decision on translation depth and quality.

## What I Need From You (Priority Order)

### P0 - Launch blockers

- Final professional positioning copy (headline, short bio, long bio, focus areas, availability statement).
- Final contact and lead-intake preferences.
- Real images/assets for current placeholder slots.
- Real project proof for each published case study (outcomes, role, constraints, links).
- Decision on multilingual publishing scope (English-only now vs full multilingual release).

### P1 - Strong credibility upgrade

- Quantified impact metrics for each project.
- Testimonials, references, client logos (if permitted).
- Better article depth with practical examples and visuals.
- A concise career timeline/milestones section source material.

### P2 - Optional but differentiating

- Personal narrative layer (values, interests, non-work perspective).
- Process artifacts (sketches, diagrams, workshop boards) to reinforce your way of working.
- Press, talks, certifications, awards.

## Required Content Inputs

### 1) Professional Identity

Please provide:

- Preferred public name (exact capitalization).
- Primary role/title for 2026.
- 1-sentence value proposition (homepage hero).
- 1 short paragraph bio (about/contact crossover use).
- 1 longer narrative bio (about page).
- 4 to 6 focus areas you want to be known for.
- Availability statement (and whether to include "open to work", "consulting only", etc.).
- Preferred geography wording (`Italy`, `Europe`, `remote-first`, etc.).

### 2) Career and Proof

Please provide:

- 5 to 8 milestone bullets (roles/projects/turning points with year).
- Industries/domains you have shipped in.
- Biggest wins you can publicly claim (with metrics if possible).
- Constraints you handle well (legacy stacks, regulation, tight timelines, etc.).
- What kinds of work you do not want to attract.

### 3) Collaboration and Lead Qualification

Please provide:

- Services you offer (audit, strategy, implementation, advisory, training, etc.).
- Typical engagement size/duration.
- Minimum project scope (if any).
- Preferred inbound format (email template, questionnaire, discovery call).
- Expected response SLA (example: "reply within 48h").

### 4) Project Case Studies (for each project)

For each published project in `src/data/projects/*.md`, provide:

- Real project name (confirm current name or replace).
- Project context (client/startup/internal/open-source).
- Your role and responsibilities.
- Team composition.
- Problem statement.
- Delivery scope.
- Key decisions and tradeoffs.
- Final outcome with measurable impact.
- Stack and architecture notes.
- Repository/demo/public URL status.
- What cannot be disclosed (NDA-safe wording).

Current project slugs to complete:

- `atp-protocol`

Project note captured:

- `atp-protocol`: user-created stack for agentic development, located at `/Users/manuelcecchetto/code/atp`, including ATP schema/protocol + runner + MCP server + visualizer ecosystem.

### 5) Writing / Blog Direction

Please provide:

- Which current posts remain drafts vs should be published.
- 6 to 12-month editorial themes.
- Tone preference (`technical`, `operator-focused`, `founder-facing`, etc.).
- Preferred CTA at end of articles.
- Whether you want articles in multiple languages or English-only.

Current blog slugs to confirm/update:

- `astro-content-layer-in-practice`
- `mdx-authoring-with-shared-prose-components`
- `from-scrapbook-motifs-to-portfolio-language` (draft)
- `tuning-page-motion-with-respect` (draft)

### 6) Personal / Non-Work Layer (Optional but requested)

Please share anything you want included (or explicitly excluded):

- Personal values and principles.
- Hobbies/interests that shape your work style.
- Non-work projects/community involvement.
- Short "how I think" statements.
- Boundaries: topics you do not want public.

### 7) Legal and Publishing Constraints

Please provide:

- Assets and project materials you have rights to publish.
- Any client names/logos/testimonials requiring approval.
- Privacy red lines (emails, locations, team details, faces in photos).
- Jurisdiction/legal disclaimer needs (if any).

## Asset Intake Checklist

### Core visual slots currently using placeholders

- Home hero portrait (`src/components/pages/home/HomeHero.astro`)
- Home hero architecture visual (`src/components/pages/home/HomeHero.astro`)
- Home story workshop/session image (`src/components/pages/home/HomeStory.astro`)
- About hero portrait (`src/components/pages/about/AboutHero.astro`)
- About narrative timeline/roadmap visual (`src/components/pages/about/AboutNarrative.astro`)
- Contact hero collaboration image (`src/components/pages/contact/ContactHero.astro`)
- Contact channels meeting snapshot (`src/components/pages/contact/ContactChannels.astro`)
- Project card/detail visuals (currently placeholder in `ProjectCard` and project detail hero)
- Blog card visuals (currently placeholder in `BlogCard`)
- Inline blog figures (`ImageFigure.astro` currently renders placeholder)

### Asset types to provide

- Professional headshots: 2 to 4 options.
- Work photos: workshop, speaking, collaboration, desk/process.
- Project screenshots: desktop + mobile where relevant.
- Architecture diagrams: LLM/RAG/workflow/data flow.
- Sketches/wireframes/whiteboard shots.
- Brand assets: logos, marks, favicon source.
- Social/OG images for homepage, projects, articles.

### Suggested technical specs

- Portrait assets: minimum 1200x1500, JPG or PNG.
- Landscape assets: minimum 1600x1000, JPG/PNG/WebP.
- Wide assets: minimum 2100x900.
- Blog/project covers: at least 1600px wide.
- File naming: kebab-case and stable slugs.
- Keep originals + optimized exports.

### Suggested Intake Package Structure

Provide files in a single folder with this structure:

```text
content-intake/
  profile/
    bio-short.md
    bio-long.md
    milestones.md
    services.md
  projects/
    atelier-scheduler.md
    field-journal-cms.md
    signalboard-analytics.md
    letterpress-notes.md
  blog/
    editorial-plan.md
  assets/
    portraits/
    projects/
    blog/
    diagrams/
    sketches/
```

## Decisions Needed From You Now

1. Do we launch English-only first, or maintain all 6 locales at launch?
2. Are the current 4 project entries real/public, or should any be replaced/anonymized?
3. Do you want a personal/non-work section visible on the About page, or keep it strictly professional?
4. Are testimonials/client logos allowed in your public portfolio?
5. Do you want to keep using custom illustrations, real photos, or a hybrid visual style?

## Intake Captured So Far (Voice Note)

Source: user voice note received on 2026-03-01 (Italian), normalized to structured points.

### Timeline draft

1. 2020: startup beginning with `Qlik.me` via personal referral.
2. 2020-2022: adtech for influencers.
3. Product evolution at Qlik.me:
   - from referral/link-in-bio model
   - to marketplace-style flow connecting brands/products with influencer video content.
4. Key growth at Qlik.me:
   - learned startup execution speed and high-constraint delivery
   - web development acceleration
   - first phase included React Native work.
5. 2022: Qlik.me chapter closes (company instability).
6. Post-2022: joins `CASUS` (confirmed), initially junior profile.
7. Over ~4 years: transitions into broad full-stack "jolly" role with product ownership.
8. Product track (confirmed names):
   - legal document drafting automation product (questionnaire-driven, lower human error)
   - product name: `CASUS Create` (sold at exit)
   - new product line: `CASUS Review`
   - major contribution to product interactions/features and funding support
   - pivot around late 2024 / 2025 into a new legal AI review product
   - prior product sold (exit), enabling funding for new product line.
9. Nov 2024: concept to MVP path for LLM-based contract review for lawyers.
10. Current phase: solo "one-man army" on MVP, high feature velocity.
11. 2025 onward:
    - deep focus on AI/LLM workflows and software architecture shift
    - expanded study across text, video, image, and audio generation
    - multiple side projects created from idea-to-product flow improvements.

### Positioning signals extracted

- Core domains: AI, LLM, legal-tech workflows, product engineering.
- Strongest narrative: startup speed + full ownership + AI-native execution.
- Differentiator: ability to move from concept to MVP rapidly with evolving LLM tooling.

### Role mapping confirmed

- `2020-2024`: Software Engineer
- `2024-2026`: AI Orchestrator, AI Engineer

### Impact proof captured (initial)

- With `CASUS Create`, launch support focused on Swiss builders associations, enabling thousands of members to produce legal/operational documents more effectively.

### Technical strengths captured (new)

- Strongest long-term capability: deep document data manipulation across both `CASUS Create` and `CASUS Review`.
- Specialized expertise:
  - OpenXML protocol internals
  - `.docx` extraction and transformation pipelines
  - document structure parsing for reliable downstream AI workflows
- Strategic engineering outcome:
  - reduced dependency on third-party library `Aspose`
  - designed and built an in-house RTJ parser from `.docx` to JSON
  - parser has remained stable in production for years and is still used by the current product.

### Names/terms explicitly flagged by user

- `Qlik.me`
- `CASUS`
- `CASUS Create`
- `CASUS Review`
- `AI`
- `LLM`

## Clarifications Still Needed (From This Voice Note)

Status after latest user confirmation (2026-03-01):

1. Chronology confirmed:
   - `2020-2022`: `Qlik.me`
   - `2022-2026`: `CASUS` (`CASUS Create` -> `CASUS Review`)
2. NDA constraints: none (user confirmed content can be explicit).
3. Narrative voice: first person.
4. Asset availability: confirmed (headshots/screenshots/diagrams/photos/sketches available).

### Final Missing Inputs Before Writing Production Copy

Only these are still needed to finalize homepage/about/projects copy:

1. 3 to 5 measurable outcomes we can publish (time saved, error reduction, users/members served, adoption, revenue/funding impact).
2. Which specific assets should be used first for:
   - homepage hero portrait
   - about portrait
   - one CASUS Create visual
   - one CASUS Review visual
3. Preferred launch language scope:
   - English-only first
   - or all configured locales (`en`, `it`, `de`, `fr`, `zh`, `hi`)
