# Memory Changelog

Chronological log of memory-impacting changes across ATP nodes.

## Ownership

- Primary owner: ATP orchestrator
- Maintainers: all workers

## Entry Template

```md
### [CHG-<number>] <Short Title>
- NodeID: <ATP node id>
- Date: YYYY-MM-DD
- Author: <agent_id>
- Status: proposed | approved | superseded | closed
- Changed Files: <list of files>
- Summary: <what changed>
- Related Decision/Contract/Risk/Evidence IDs: <IDs or none>
```

## Changes

### [CHG-000] Shared Memory Bootstrap
- NodeID: BOOTSTRAP
- Date: 2026-03-01
- Author: codex_runner_setup
- Status: approved
- Changed Files: `docs/memory/README.md`, `docs/memory/decision-log.md`, `docs/memory/contracts.md`, `docs/memory/risk-register.md`, `docs/memory/evidence-index.md`, `docs/memory/changelog.md`, `RUNNER.md`
- Summary: initialized shared memory folder and enforced runner-level governance protocol for all workers
- Related Decision/Contract/Risk/Evidence IDs: DEC-000, CON-000, RISK-000, EVD-000

### [CHG-001] Astro v5 Baseline Scaffold (Verification Blocked)
- NodeID: n02_astro_v5_scaffold
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Added initial Astro project baseline files and recorded environment blocker preventing dependency install/check/build.
- Status: proposed
- Changed Files: `package.json`, `astro.config.mjs`, `tsconfig.json`, `.editorconfig`, `.gitignore`, `src/env.d.ts`, `src/pages/index.astro`, `docs/memory/risk-register.md`, `docs/memory/evidence-index.md`, `docs/memory/changelog.md`
- Summary: scaffolded required artifacts with strict TypeScript settings and required scripts; verification could not complete due npm registry DNS failure.
- Related Decision/Contract/Risk/Evidence IDs: none, none, RISK-001, EVD-001

### [CHG-002] Global Design Tokens and Base Layout Foundation
- NodeID: n03_design_tokens_and_base_layout
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Added tokenized style system, global layout shell, reusable UI wrappers, motion primitives, and style playground route.
- Status: approved
- Changed Files: `src/styles/tokens.css`, `src/styles/global.css`, `src/layouts/BaseLayout.astro`, `src/components/ui/PaperCard.astro`, `src/components/ui/PaperDeck.astro`, `src/components/ui/MotionReveal.astro`, `src/components/ui/StaggerGroup.astro`, `src/pages/index.astro`, `src/pages/style-playground.astro`, `docs/memory/decision-log.md`, `docs/memory/contracts.md`, `docs/memory/risk-register.md`, `docs/memory/evidence-index.md`, `docs/memory/changelog.md`
- Summary: established reusable visual primitives and confirmed Astro check/typecheck/build pass for the new foundation.
- Related Decision/Contract/Risk/Evidence IDs: DEC-001, CON-001, RISK-002, EVD-002

### [CHG-003] Content Layer Collections and Seed Data
- NodeID: n04_content_collections_schema
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Added Astro v5 content collections for `projects` and `blog`, shared schema/query helpers, and initial markdown entries.
- Status: approved
- Changed Files: `src/content.config.ts`, `src/content/schemas.ts`, `src/lib/content.ts`, `src/data/projects/atelier-scheduler.md`, `src/data/projects/letterpress-notes.md`, `src/data/blog/astro-content-layer-in-practice.md`, `src/data/blog/tuning-page-motion-with-respect.md`, `docs/memory/contracts.md`, `docs/memory/evidence-index.md`, `docs/memory/changelog.md`
- Summary: established typed validation rules (title, slug, dates, tags, summary, cover image, draft flags), wired collection loaders with `glob`, and verified strict checks for content queries.
- Related Decision/Contract/Risk/Evidence IDs: none, CON-002, none, EVD-003

### [CHG-004] Initial Portfolio Content and Profile Seed
- NodeID: n05_initial_content_seed
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Seeded first-pass profile/about payload, expanded projects/blog content, and documented inspiration-to-copy mapping.
- Status: approved
- Changed Files: `src/data/profile.json`, `src/data/projects/atelier-scheduler.md`, `src/data/projects/letterpress-notes.md`, `src/data/projects/field-journal-cms.md`, `src/data/projects/signalboard-analytics.md`, `src/data/blog/from-scrapbook-motifs-to-portfolio-language.md`, `docs/content-sourcing-notes.md`, `docs/memory/contracts.md`, `docs/memory/evidence-index.md`, `docs/memory/changelog.md`
- Summary: delivered collection-valid content sufficient for IA and visual refinement, removed sample-domain external links, and recorded content sourcing assumptions plus direction.
- Related Decision/Contract/Risk/Evidence IDs: none, CON-003, none, EVD-004

### [CHG-005] Responsive Site Shell and Navigation Wiring
- NodeID: n06_site_shell_navigation
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Added shared layout chrome components, route-aware nav states, mobile menu behavior, and core route scaffolds for shell validation.
- Status: approved
- Changed Files: `src/components/layout/Header.astro`, `src/components/layout/Nav.astro`, `src/components/layout/Footer.astro`, `src/layouts/BaseLayout.astro`, `src/styles/global.css`, `src/pages/index.astro`, `src/pages/style-playground.astro`, `src/pages/about.astro`, `src/pages/contact.astro`, `src/pages/projects/index.astro`, `src/pages/blog/index.astro`, `docs/memory/decision-log.md`, `docs/memory/contracts.md`, `docs/memory/evidence-index.md`, `docs/memory/changelog.md`
- Summary: established a reusable shell with consistent header/footer across routes, active navigation, skip-link target, and page slot structure that downstream page/content nodes can fill.
- Related Decision/Contract/Risk/Evidence IDs: DEC-002, CON-004, none, EVD-005

### [CHG-006] Real Content for Home, About, and Contact Pages
- NodeID: n07_home_about_contact_pages
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Implemented core page content using seeded profile and collection data with dedicated page section components.
- Status: approved
- Changed Files: `src/pages/index.astro`, `src/pages/about.astro`, `src/pages/contact.astro`, `src/components/pages/home/HomeHero.astro`, `src/components/pages/home/HomeStory.astro`, `src/components/pages/home/HomeHighlights.astro`, `src/components/pages/about/AboutHero.astro`, `src/components/pages/about/AboutNarrative.astro`, `src/components/pages/contact/ContactHero.astro`, `src/components/pages/contact/ContactChannels.astro`, `docs/memory/contracts.md`, `docs/memory/evidence-index.md`, `docs/memory/changelog.md`
- Summary: replaced scaffolds with production-ready core pages featuring hero/story/highlights, narrative and focus areas, and a clear contact CTA hierarchy aligned with the shared shell and design primitives.
- Related Decision/Contract/Risk/Evidence IDs: none, CON-005, none, EVD-006

### [CHG-007] Projects Index and Dynamic Detail Route Implementation
- NodeID: n08_projects_index_and_detail
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Implemented data-driven projects archive, generated detail routes per project slug, and reusable project card/detail metadata components.
- Status: approved
- Changed Files: `src/pages/projects/index.astro`, `src/pages/projects/[slug].astro`, `src/components/projects/ProjectCard.astro`, `src/components/projects/ProjectDetailsPanel.astro`, `docs/memory/decision-log.md`, `docs/memory/contracts.md`, `docs/memory/evidence-index.md`, `docs/memory/changelog.md`
- Summary: replaced projects scaffold with collection-backed listing, added static dynamic route generation and rendered markdown narrative content plus optional metadata/link fallbacks for each project.
- Related Decision/Contract/Risk/Evidence IDs: DEC-003, CON-006, none, EVD-007

### [CHG-008] Blog Index, Post, Tag, and Pagination Route Implementation
- NodeID: n09_blog_index_post_and_tags
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Replaced blog scaffold with full collection-driven blog routes and shared blog presentation components.
- Status: approved
- Changed Files: `src/lib/content.ts`, `src/components/blog/BlogCard.astro`, `src/components/blog/BlogPagination.astro`, `src/pages/blog/index.astro`, `src/pages/blog/[slug].astro`, `src/pages/blog/tags/[tag].astro`, `src/pages/blog/page/[page].astro`, `docs/memory/decision-log.md`, `docs/memory/contracts.md`, `docs/memory/evidence-index.md`, `docs/memory/changelog.md`
- Summary: implemented blog archive sorting and pagination strategy, dynamic post rendering from collection markdown, tag taxonomy pages, and environment-aware draft filtering so production output excludes draft content.
- Related Decision/Contract/Risk/Evidence IDs: DEC-004, CON-007, none, EVD-008

### [CHG-009] MDX Integration Blocker Documentation
- NodeID: n10_mdx_authoring_workflow
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Documented npm registry DNS blocker encountered while attempting to install `@astrojs/mdx` and execute MDX authoring workflow scope.
- Status: proposed
- Changed Files: `docs/memory/risk-register.md`, `docs/memory/evidence-index.md`, `docs/memory/changelog.md`
- Summary: no application source files were modified because required dependency installation failed; memory was updated with blocker and verification evidence for rerun readiness.
- Related Decision/Contract/Risk/Evidence IDs: none, none, RISK-003, EVD-009

### [CHG-010] SEO/RSS/Sitemap Blocker Documentation
- NodeID: n11_seo_rss_sitemap_metadata
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Documented npm registry DNS blocker encountered while attempting to install `@astrojs/rss` and `@astrojs/sitemap` required by node scope.
- Status: proposed
- Changed Files: `docs/memory/risk-register.md`, `docs/memory/evidence-index.md`, `docs/memory/changelog.md`
- Summary: no application source files were modified because required Astro integration dependencies could not be installed; memory was updated with blocker and verification evidence for rerun readiness.
- Related Decision/Contract/Risk/Evidence IDs: none, none, RISK-004, EVD-010

### [CHG-011] MDX Authoring Workflow and Prose Components
- NodeID: n10_mdx_authoring_workflow
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Implemented Astro MDX integration, reusable prose components, and a published MDX sample entry wired into blog detail rendering.
- Status: approved
- Changed Files: `astro.config.mjs`, `src/pages/blog/[slug].astro`, `src/components/prose/Callout.astro`, `src/components/prose/ImageFigure.astro`, `src/components/prose/CodeNote.astro`, `src/data/blog/mdx-authoring-with-shared-prose-components.mdx`, `docs/memory/decision-log.md`, `docs/memory/contracts.md`, `docs/memory/risk-register.md`, `docs/memory/evidence-index.md`, `docs/memory/changelog.md`
- Summary: enabled `mdx()` integration, added reusable content primitives for callouts/figures/code notes, passed component mapping to blog post `Content`, and verified sample MDX output renders custom blocks in production build artifacts.
- Related Decision/Contract/Risk/Evidence IDs: DEC-005, CON-008, RISK-005, EVD-011

### [CHG-012] SEO Metadata Baseline, RSS Feed, and Sitemap Integration
- NodeID: n11_seo_rss_sitemap_metadata
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Implemented SEO head defaults, RSS endpoint, and sitemap generation support.
- Status: approved
- Changed Files: `astro.config.mjs`, `src/layouts/BaseLayout.astro`, `src/pages/rss.xml.ts`, `src/pages/blog/[slug].astro`, `src/pages/projects/[slug].astro`, `docs/memory/decision-log.md`, `docs/memory/contracts.md`, `docs/memory/risk-register.md`, `docs/memory/evidence-index.md`, `docs/memory/changelog.md`
- Summary: configured production site origin and sitemap integration, centralized canonical/OG/Twitter/feed/sitemap head defaults in layout, added collection-driven RSS feed endpoint, and validated outputs through Astro check/typecheck/build and dist artifact assertions.
- Related Decision/Contract/Risk/Evidence IDs: DEC-006, CON-009, RISK-006, EVD-012

### [CHG-013] Performance and Accessibility Hardening Pass
- NodeID: n12_performance_and_accessibility_pass
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Applied media-loading, focus/contrast, reduced-motion, and layout-shift hardening across core templates, and added QA verification artifact.
- Status: approved
- Changed Files: `src/layouts/BaseLayout.astro`, `src/styles/tokens.css`, `src/styles/global.css`, `src/pages/blog/[slug].astro`, `src/pages/projects/[slug].astro`, `src/components/blog/BlogCard.astro`, `src/components/projects/ProjectCard.astro`, `src/components/prose/ImageFigure.astro`, `src/components/pages/home/HomeHero.astro`, `docs/qa/perf-a11y-report.md`, `docs/memory/decision-log.md`, `docs/memory/contracts.md`, `docs/memory/risk-register.md`, `docs/memory/evidence-index.md`, `docs/memory/changelog.md`
- Summary: optimized font and image loading priority hints, added explicit image dimensions/sizes to reduce CLS, improved global keyboard focus visibility and contrast tokens, expanded reduced-motion safeguards, and documented verification/blockers for preview/Lighthouse in the new QA report.
- Related Decision/Contract/Risk/Evidence IDs: DEC-007, CON-010, RISK-007, EVD-013

### [CHG-014] Scripted Quality Gate Command and QA Assertions
- NodeID: n13a_quality_gate_commands
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Added a canonical quality gate script sequence, build-artifact regression assertions, and QA command documentation.
- Status: approved
- Changed Files: `package.json`, `scripts/verify-quality-gate.mjs`, `docs/qa/quality-gate.md`, `docs/memory/decision-log.md`, `docs/memory/contracts.md`, `docs/memory/risk-register.md`, `docs/memory/evidence-index.md`, `docs/memory/changelog.md`
- Summary: introduced `quality:gate`/`ci:quality` scripts, added Node-based verification of critical build outputs and SEO/MDX markers, and documented the exact command sequence required for local and CI validation.
- Related Decision/Contract/Risk/Evidence IDs: DEC-008, CON-011, RISK-008, EVD-014

### [CHG-015] Manual Release Regression Checklist and Memory Alignment
- NodeID: n13b_release_regression_checklist
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Added manual release-checklist artifact with route-level and cross-route high-risk verification coverage.
- Status: approved
- Changed Files: `docs/qa/release-checklist.md`, `docs/memory/decision-log.md`, `docs/memory/contracts.md`, `docs/memory/risk-register.md`, `docs/memory/evidence-index.md`, `docs/memory/changelog.md`
- Summary: established a concise release regression checklist with explicit PASS/FAIL/BLOCKED and evidence capture fields, then recorded governing decision, contract, risk, and evidence entries for future worker consistency.
- Related Decision/Contract/Risk/Evidence IDs: DEC-009, CON-012, RISK-009, EVD-015

### [CHG-016] QA Execution and Missing Media Asset Blocker Fix
- NodeID: n13c_qa_run_and_blocker_fixes
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Executed release QA checks, remediated broken media references, and recorded checklist execution evidence.
- Status: approved
- Changed Files: `src/data/blog/astro-content-layer-in-practice.md`, `src/data/blog/tuning-page-motion-with-respect.md`, `src/data/blog/from-scrapbook-motifs-to-portfolio-language.md`, `src/data/blog/mdx-authoring-with-shared-prose-components.mdx`, `src/data/projects/atelier-scheduler.md`, `src/data/projects/field-journal-cms.md`, `src/data/projects/letterpress-notes.md`, `src/data/projects/signalboard-analytics.md`, `public/images/blog/*.svg`, `public/images/projects/*.svg`, `docs/qa/release-checklist-execution-2026-03-01.md`, `docs/memory/decision-log.md`, `docs/memory/contracts.md`, `docs/memory/risk-register.md`, `docs/memory/evidence-index.md`, `docs/memory/changelog.md`
- Summary: fixed release-blocking missing media assets by providing committed placeholders and aligning content paths, then captured QA outcomes and environment limitations in a dedicated execution report.
- Related Decision/Contract/Risk/Evidence IDs: DEC-010, CON-013, RISK-010, EVD-016

### [CHG-017] Final Documentation and Handoff Bundle
- NodeID: n14_deploy_and_editorial_docs
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Added final setup/editorial/handoff docs and aligned QA checklist with latest execution snapshot/limitations.
- Status: approved
- Changed Files: `README.md`, `docs/content-workflow.md`, `docs/qa/release-checklist.md`, `docs/handoff.md`, `docs/memory/decision-log.md`, `docs/memory/contracts.md`, `docs/memory/risk-register.md`, `docs/memory/evidence-index.md`, `docs/memory/changelog.md`
- Summary: consolidated operational and editorial guidance for clean-checkout verification and release handoff, documented known runtime QA constraints, and added post-handoff backlog recommendations.
- Related Decision/Contract/Risk/Evidence IDs: DEC-011, CON-014, RISK-011, EVD-017

### [CHG-018] ATP Source Corpus Documentation Baseline
- NodeID: T01_scan_atp_packages
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Added canonical ATP source corpus document and recorded acceptance evidence for package-scan outputs.
- Status: approved
- Changed Files: `docs/atp-content/atp-source-corpus.md`, `docs/memory/evidence-index.md`, `docs/memory/changelog.md`
- Summary: documented ATP v1.3 schema and lifecycle terminology across protocol/server/runner/visualizer packages, including claim/complete/decompose interface behaviors and validation invariants.
- Related Decision/Contract/Risk/Evidence IDs: none, none, none, EVD-018

### [CHG-019] ATP Mechanics Brief Synthesis
- NodeID: T02_synthesize_atp_mechanics_brief
- Date: 2026-03-01
- Author: codex_agent_1
- Status: approved
- Changed Files: `docs/atp-content/atp-mechanics-brief.md`, `docs/memory/evidence-index.md`, `docs/memory/changelog.md`
- Summary: added a reusable ATP mechanics brief covering value proposition, package roles, schema contract essentials, generation/execution flow, lifecycle semantics, MCP tool behaviors, visualizer role, and end-to-end workflow narrative.
- Related Decision/Contract/Risk/Evidence IDs: none, none, none, EVD-019

### [CHG-020] Multilingual Content Model Contract Plan
- NodeID: T03_define_multilingual_content_model
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Added multilingual content model plan and aligned memory decision/contract/evidence records for downstream implementation.
- Status: approved
- Changed Files: `docs/atp-content/atp-content-localization-plan.md`, `docs/memory/decision-log.md`, `docs/memory/contracts.md`, `docs/memory/evidence-index.md`, `docs/memory/changelog.md`
- Summary: defined locale-aware frontmatter contract, translation group and same-slug strategy, fallback-to-`en` rules, route query behavior for project/blog index-detail-tag-pagination flows, and phased migration from single-source files to locale-specific files.
- Related Decision/Contract/Risk/Evidence IDs: DEC-012, CON-015, none, EVD-020

### [CHG-021] Locale-Aware Content Pipeline Execution
- NodeID: T04_implement_locale_aware_content_pipeline
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Implemented locale-aware schema/query/route pipeline with deterministic `en` fallback and migrated ATP content to locale-suffixed files.
- Status: approved
- Changed Files: `src/content/schemas.ts`, `src/lib/content.ts`, `src/pages/projects/index.astro`, `src/pages/projects/[slug].astro`, `src/pages/blog/index.astro`, `src/pages/blog/[slug].astro`, `src/pages/blog/tags/[tag].astro`, `src/pages/blog/page/[page].astro`, `src/pages/[locale]/projects/[slug].astro`, `src/pages/[locale]/blog/[slug].astro`, `src/pages/[locale]/blog/tags/[tag].astro`, `src/pages/[locale]/blog/page/[page].astro`, `src/data/projects/atp-protocol.en.md`, `src/data/blog/how-atp-works.en.md`, `src/data/blog/from-scrapbook-motifs-to-portfolio-language.md`, `src/data/blog/mdx-authoring-with-shared-prose-components.mdx`, `src/data/blog/tuning-page-motion-with-respect.md`, `docs/memory/evidence-index.md`, `docs/memory/changelog.md`
- Summary: added required `locale`/`translationGroup` frontmatter contract enforcement, introduced localized retrieval helpers and slug resolution with locale-first fallback behavior, switched project/blog index-detail-tag-pagination routes to localized content loading, and migrated content files to comply with new schema.
- Related Decision/Contract/Risk/Evidence IDs: DEC-012, CON-015, none, EVD-021

### [CHG-022] ATP Project Page Short English Narrative
- NodeID: T05_write_atp_project_short_en
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Updated the ATP project page English copy to a concise problem/protocol/ecosystem/value narrative and recorded node acceptance evidence.
- Status: approved
- Changed Files: `src/data/projects/atp-protocol.en.md`, `docs/memory/evidence-index.md`, `docs/memory/changelog.md`
- Summary: refined ATP project title, summary, and body to fit short project-page format while keeping factual claims aligned with the synthesized ATP mechanics brief.
- Related Decision/Contract/Risk/Evidence IDs: DEC-012, CON-015, none, EVD-022

### [CHG-023] ATP Project Page Locale Translations
- NodeID: T06_translate_atp_project_short_all_locales
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Added localized ATP project short-copy entries for all required locales and recorded acceptance evidence for file presence/locale metadata checks.
- Status: approved
- Changed Files: `src/data/projects/atp-protocol.it.md`, `src/data/projects/atp-protocol.de.md`, `src/data/projects/atp-protocol.fr.md`, `src/data/projects/atp-protocol.zh.md`, `src/data/projects/atp-protocol.hi.md`, `docs/memory/evidence-index.md`, `docs/memory/changelog.md`
- Summary: published translated title/summary/body content for `it`, `de`, `fr`, `zh`, and `hi`, retaining shared slug + translation group and consistent ATP package/protocol terminology across locales.
- Related Decision/Contract/Risk/Evidence IDs: DEC-012, CON-015, none, EVD-023

### [CHG-024] ATP Long-Form English Blog Article
- NodeID: T07_write_atp_blog_long_en
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Rewrote the ATP blog entry into a full technical deep dive and recorded acceptance evidence.
- Status: approved
- Changed Files: `src/data/blog/how-atp-works.en.md`, `docs/memory/evidence-index.md`, `docs/memory/changelog.md`
- Summary: expanded the English ATP article from a short placeholder into a long-form explanation of ATP motivation, schema contract, package roles, planning/decomposition mechanics, runner execution loop, MCP lifecycle tools, and operating constraints.
- Related Decision/Contract/Risk/Evidence IDs: DEC-012, CON-015, none, EVD-024

### [CHG-025] ATP Long-Form Blog Locale Translations
- NodeID: T08_translate_atp_blog_long_all_locales
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Added translated long-form ATP blog posts for all supported non-English locales and recorded acceptance evidence.
- Status: approved
- Changed Files: `src/data/blog/how-atp-works.it.md`, `src/data/blog/how-atp-works.de.md`, `src/data/blog/how-atp-works.fr.md`, `src/data/blog/how-atp-works.zh.md`, `src/data/blog/how-atp-works.hi.md`, `docs/memory/evidence-index.md`, `docs/memory/changelog.md`
- Summary: published locale-complete versions of the ATP deep-dive article with shared slug/translation group metadata and technical terminology consistency across languages.
- Related Decision/Contract/Risk/Evidence IDs: DEC-012, CON-015, none, EVD-025

### [CHG-026] ATP Multilingual Publication QA and Loader Blocker Fix
- NodeID: T09_validate_multilocale_content_readiness
- Date: 2026-03-01
- Author: codex_agent_1
- Status: approved
- Changed Files: `src/content.config.ts`, `evidence/atp-content-qa.md`, `docs/memory/evidence-index.md`, `docs/memory/changelog.md`
- Summary: executed multilingual readiness validation across required locales, fixed blog collection ID-collision blocker by adding `generateId` to the blog loader, and recorded verification evidence/QA notes.
- Related Decision/Contract/Risk/Evidence IDs: DEC-012, CON-015, none, EVD-026
