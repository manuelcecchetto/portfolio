# Content Sourcing Notes

- NodeID: n05_initial_content_seed
- Date: 2026-03-01
- Author: codex_agent_1
- Status: approved

## Professional Profile Seed

Profile data was seeded in `src/data/profile.json` to provide a concrete
baseline for About/hero sections and contact blocks. Source signals came from
repository context (project naming, writing style, and domain identity) and
were shaped into launch-ready copy pending final editorial pass.

## Inspiration Motif Mapping (`inspo/*.html`)

The `inspo/` references use affectionate scrapbook language and tactile visual
patterns. For portfolio-safe direction, motifs were translated as:

- Paper grain and warm stationery surfaces -> editorial card and section
  treatments that reinforce craftsmanship.
- Highlight marker strokes -> restrained emphasis for role titles, tags, and
  key metrics.
- Memory-grid and scrapbook layouts -> project gallery modules with clear
  hierarchy and readable captions.
- Timeline storytelling -> career/project chronology blocks with concise
  milestones.
- Handwritten accents -> limited use for short labels, while primary body copy
  stays in high-legibility sans serif styles.

## Copy Direction

- Keep voice specific and professional: outcome-oriented, first person, no
  novelty metaphors in core project summaries.
- Prioritize credibility markers: scope, responsibilities, measurable impact,
  and delivery constraints.
- Use concise summaries in frontmatter to support listing cards and previews.

## Link and Media Normalization

- External links use canonical `https://` URLs and avoid generic sample
  domains.
- Cover media follows collection schema-compatible paths:
  - projects: `/images/projects/<slug>-cover.<ext>`
  - blog: `/images/blog/<slug>.<ext>`

## Remaining Editorial Follow-up

- Validate the seeded profile text against the latest LinkedIn/CV source of
  truth before public launch.
- Replace staged cover image paths with final exported assets.
