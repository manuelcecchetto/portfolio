# Decision Log

Source of truth for architecture and policy decisions.

## Ownership

- Primary owner: ATP orchestrator / tech lead
- Maintainers: all ATP workers

## Entry Template

```md
### [DEC-<number>] <Decision Title>
- NodeID: <ATP node id>
- Date: YYYY-MM-DD
- Author: <agent_id>
- Status: proposed | approved | superseded
- Scope: architecture | policy | platform | process
- Context: <why this decision is needed>
- Decision: <what is being decided>
- Rationale: <why this option>
- Impact: <systems/files/teams affected>
- Supersedes: <DEC-id or none>
- Superseded By: <DEC-id or none>
```

## Decisions

### [DEC-000] Shared Memory Governance Initialized
- NodeID: BOOTSTRAP
- Date: 2026-03-01
- Author: codex_runner_setup
- Status: approved
- Scope: process
- Context: Large ATP projects require durable shared memory to avoid drift across workers.
- Decision: `docs/memory/*` is mandatory shared memory and must be updated on relevant nodes.
- Rationale: Centralized, append-only memory improves consistency and traceability.
- Impact: All workers and node handoffs.
- Supersedes: none
- Superseded By: none

### [DEC-001] Token-First Visual Foundation with Reusable Layout Primitives
- NodeID: n03_design_tokens_and_base_layout
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Introduced a tokenized global style system, base layout shell, paper-card wrappers, and motion primitives with reduced-motion fallback.
- Status: approved
- Scope: architecture
- Context: The project needs a distinctive romantic-yet-professional visual baseline that can be reused consistently across pages.
- Decision: Centralize visual primitives in `src/styles/tokens.css` + `src/styles/global.css`, require page composition through `BaseLayout.astro`, and expose composable UI primitives (`PaperCard`, `PaperDeck`, `MotionReveal`, `StaggerGroup`).
- Rationale: This keeps future page work focused on content while preserving coherent styling, spacing, surface treatment, and animation behavior.
- Impact: `src/styles/*`, `src/layouts/BaseLayout.astro`, `src/components/ui/*`, `src/pages/index.astro`, `src/pages/style-playground.astro`.
- Supersedes: none
- Superseded By: none

### [DEC-002] Route-Aware Shared Shell for All Primary Sections
- NodeID: n06_site_shell_navigation
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Converted `BaseLayout` into a persistent shell with shared header/nav/footer and slot-based page regions.
- Status: approved
- Scope: architecture
- Context: Upcoming content nodes (`n07`, `n08`, `n09`) require stable cross-route chrome and navigation semantics before route-specific content implementation.
- Decision: Centralize site chrome in layout components (`Header`, `Nav`, `Footer`), derive active nav state from `Astro.url.pathname`, and expose reusable layout slots (`hero`, default content) through `BaseLayout`.
- Rationale: This removes per-page duplication, guarantees consistent keyboard/focus behavior, and enables incremental page development without re-solving shell concerns.
- Impact: `src/layouts/BaseLayout.astro`, `src/components/layout/*`, `src/styles/global.css`, scaffolded primary route pages.
- Supersedes: none
- Superseded By: none

### [DEC-003] Collection-Driven Projects Routes with Shared Card/Detail Blocks
- NodeID: n08_projects_index_and_detail
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Implemented projects archive and dynamic detail routes generated from content collections, using reusable project card and details-panel components.
- Status: approved
- Scope: architecture
- Context: Portfolio work needs a consistent way to present outcomes and narrative depth while keeping route generation tied to typed content entries.
- Decision: Use `getPublishedProjects()` as the source for both `/projects` and `/projects/[slug]` static route generation, and render reusable UI blocks in `src/components/projects/*` for cards and detail metadata.
- Rationale: One collection-driven pipeline prevents route drift, keeps content updates automatic, and allows project presentation UI to stay composable.
- Impact: `src/pages/projects/index.astro`, `src/pages/projects/[slug].astro`, `src/components/projects/*`.
- Supersedes: none
- Superseded By: none

### [DEC-004] Environment-Aware Blog Route Generation with Shared Entry Components
- NodeID: n09_blog_index_post_and_tags
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Implemented collection-driven blog index/detail/tag routes with shared card/pagination components and environment-aware draft visibility.
- Status: approved
- Scope: architecture
- Context: The blog section needs durable route generation and taxonomy browsing while respecting draft filtering in production output.
- Decision: Use `getBlogPosts()` as the route-generation source across `/blog`, `/blog/[slug]`, `/blog/tags/[tag]`, and `/blog/page/[page]`, where drafts are included only outside production mode; keep presentation consistency through reusable `BlogCard` and `BlogPagination` components.
- Rationale: One query path avoids divergence between index/detail/tag pages, and environment-aware draft behavior preserves editorial preview workflows without leaking drafts into production builds.
- Impact: `src/lib/content.ts`, `src/components/blog/*`, `src/pages/blog/**/*`.
- Supersedes: none
- Superseded By: none

### [DEC-005] MDX-Enabled Blog Rendering with Shared Prose Component Mapping
- NodeID: n10_mdx_authoring_workflow
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Enabled MDX integration and standardized rich post authoring through a shared prose component map on blog detail rendering.
- Status: approved
- Scope: architecture
- Context: Long-form posts need richer content blocks (callouts, figures, code notes) without duplicating one-off styles or imports per route.
- Decision: Configure `@astrojs/mdx` in `astro.config.mjs`, add reusable prose components in `src/components/prose/*`, and pass a shared `components` map to `<Content />` in `src/pages/blog/[slug].astro` for MDX entries.
- Rationale: Centralized MDX rendering keeps authoring flexible while preserving visual consistency and reducing per-post implementation overhead.
- Impact: `astro.config.mjs`, `src/pages/blog/[slug].astro`, `src/components/prose/*`, `src/data/blog/*.mdx`.
- Supersedes: none
- Superseded By: none

### [DEC-006] Site-Level SEO Baseline via Shared Head Metadata and Discovery Endpoints
- NodeID: n11_seo_rss_sitemap_metadata
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Added centralized canonical/OpenGraph/Twitter defaults in `BaseLayout`, wired RSS autodiscovery, and enabled sitemap integration with explicit site URL.
- Status: approved
- Scope: architecture
- Context: Primary routes now contain production content and need consistent metadata plus machine-discoverable feed/sitemap outputs for indexing and subscription support.
- Decision: Keep SEO defaults in `src/layouts/BaseLayout.astro` as the canonical head layer, set `site` in `astro.config.mjs`, generate RSS via `src/pages/rss.xml.ts` using published blog posts only, and generate sitemaps via `@astrojs/sitemap`.
- Rationale: A single layout-level metadata policy prevents route drift and ensures every page emits canonical/discovery tags without per-page duplication.
- Impact: `astro.config.mjs`, `src/layouts/BaseLayout.astro`, `src/pages/rss.xml.ts`, detail route metadata props for blog/projects.
- Supersedes: none
- Superseded By: none

### [DEC-007] Core Template Media Priority and Motion/Focus Hardening Policy
- NodeID: n12_performance_and_accessibility_pass
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Added explicit media priority/dimensions strategy, stronger focus treatment, and stricter reduced-motion behavior in shared styles and core templates.
- Status: approved
- Scope: policy
- Context: Pre-release quality hardening required measurable reduction of avoidable layout shift and improved keyboard/motion accessibility across core user journeys.
- Decision: Enforce explicit `width`/`height` + `sizes` on rendered content images, preload only detail-hero covers with `fetchpriority=\"high\"`, keep card/prose media lazy with `fetchpriority=\"low\"`, and centralize focus-ring and reduced-motion overrides in global tokens/styles.
- Rationale: A single policy across shared components prevents per-route regressions and keeps performance/a11y behavior predictable as content grows.
- Impact: `src/layouts/BaseLayout.astro`, `src/styles/tokens.css`, `src/styles/global.css`, `src/pages/blog/[slug].astro`, `src/pages/projects/[slug].astro`, `src/components/{blog,projects,prose,pages/home}/*`.
- Supersedes: none
- Superseded By: none

### [DEC-008] Single Scripted Quality Gate for Local and CI Use
- NodeID: n13a_quality_gate_commands
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Added one canonical command sequence for type/content/build checks and targeted regression assertions.
- Status: approved
- Scope: process
- Context: Release readiness now depends on repeatable quality checks that can be run identically by developers and CI.
- Decision: Standardize on `npm run quality:gate` as the required gate, chaining `check`, `typecheck`, `build`, and post-build targeted assertions.
- Rationale: A single command reduces drift, keeps validation explicit, and avoids introducing heavyweight test infrastructure.
- Impact: `package.json`, `scripts/verify-quality-gate.mjs`, `docs/qa/quality-gate.md`.
- Supersedes: none
- Superseded By: none

### [DEC-009] Route-Based Manual Release Regression Checklist Policy
- NodeID: n13b_release_regression_checklist
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Added a concise manual release checklist covering core routes plus high-risk MDX/media/a11y/perf checks with explicit pass/fail capture fields.
- Status: approved
- Scope: process
- Context: Scripted checks catch build-time regressions but do not fully cover route-level behavior and human-observable UX defects before release.
- Decision: Require execution of `docs/qa/release-checklist.md` for release candidates, with route-specific evidence and PASS/FAIL/BLOCKED recording.
- Rationale: A fixed route checklist reduces release drift and ensures recent high-risk areas are manually verified in a consistent format.
- Impact: `docs/qa/release-checklist.md`, `docs/memory/*`.
- Supersedes: none
- Superseded By: none

### [DEC-010] Public Asset Requirement for Content Media Paths
- NodeID: n13c_qa_run_and_blocker_fixes
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Resolved release-blocking broken media by standardizing content-referenced images to concrete files under `public/images/**`.
- Status: approved
- Scope: policy
- Context: QA execution found multiple route-critical media URLs pointing to non-existent `/images/*` files in production output.
- Decision: Any `coverImage` or MDX inline figure path used by published content must map to a committed asset in `public/images/**`; lightweight SVG placeholders are acceptable when final raster assets are unavailable.
- Rationale: This removes build-time false confidence where HTML renders successfully but route media fails at runtime.
- Impact: `src/data/blog/*`, `src/data/projects/*`, `public/images/**`, release QA evidence workflow.
- Supersedes: none
- Superseded By: none

### [DEC-011] Canonical Documentation Handoff Baseline for Pre-Deploy Readiness
- NodeID: n14_deploy_and_editorial_docs
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Added a root setup/verification README, editorial workflow guide, and final handoff document as the mandatory pre-deploy documentation bundle.
- Status: approved
- Scope: process
- Context: Final project wrap-up requires one coherent documentation baseline that operators and contributors can follow without relying on ATP task history.
- Decision: Treat `README.md`, `docs/content-workflow.md`, and `docs/handoff.md` as the canonical operational/editorial handoff set, with QA outcomes anchored to `docs/qa/release-checklist*.md`.
- Rationale: Consolidating run/setup, content authoring, and release-state notes in explicit docs prevents knowledge drift and reduces release handoff ambiguity.
- Impact: release readiness workflow, contributor onboarding, and editorial operations.
- Supersedes: none
- Superseded By: none

### [DEC-012] Same-Slug Translation Group with Locale Field and `en` Fallback
- NodeID: T03_define_multilingual_content_model
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Defined implementation-ready multilingual content decision for project/blog body entries.
- Status: approved
- Scope: architecture
- Context: Existing localization covers UI copy, but project/blog body content is still effectively single-source and needs locale-aware routing/query behavior.
- Decision: Introduce required frontmatter fields `locale` and `translationGroup`, keep same slug across locales for a logical entry, and enforce locale-first resolution with fallback to `en` for index/detail/tag/pagination queries.
- Rationale: Same-slug routing preserves stable URLs while translation-group deduplication prevents duplicate content rows and keeps per-locale behavior deterministic.
- Impact: `src/content/schemas.ts`, `src/lib/content.ts`, `src/pages/projects/**/*`, `src/pages/blog/**/*`, and editorial content under `src/data/{projects,blog}/**`.
- Supersedes: none
- Superseded By: none
