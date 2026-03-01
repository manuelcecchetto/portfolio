# Contracts

Canonical register of API, schema, and interface contracts.

## Ownership

- Primary owner: API/domain leads
- Maintainers: workers changing interfaces, schemas, or integration behavior

## Entry Template

```md
### [CON-<number>] <Contract Name>
- NodeID: <ATP node id>
- Date: YYYY-MM-DD
- Author: <agent_id>
- Status: proposed | approved | superseded
- Surface: API | event | DB schema | config | internal interface
- Contract: <exact shape/rules/version>
- Compatibility: backward-compatible | breaking
- Consumers: <services/modules/users affected>
- Validation Evidence: <tests/docs/commands/links>
- Notes: <migration or rollout notes>
```

## Contracts

### [CON-000] Shared Memory Artifact Contract
- NodeID: BOOTSTRAP
- Date: 2026-03-01
- Author: codex_runner_setup
- Status: approved
- Surface: internal interface
- Contract: `docs/memory/` must contain decision-log.md, contracts.md, risk-register.md, evidence-index.md, changelog.md, and README.md.
- Compatibility: backward-compatible
- Consumers: all ATP workers
- Validation Evidence: folder and templates created in repository
- Notes: updates must be append-only and NodeID-tagged

### [CON-001] Design System Primitive Interface Contract
- NodeID: n03_design_tokens_and_base_layout
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Defined stable internal interfaces for global tokens/layout and UI primitive components.
- Status: approved
- Surface: internal interface
- Contract: `BaseLayout.astro` must be the page shell importing `src/styles/global.css`; `global.css` imports `tokens.css`; reusable UI primitives are `PaperCard` (`variant`, `padded`, `lift`), `PaperDeck` (grid wrapper), `MotionReveal` (`kind`, `delay`), and `StaggerGroup` (`step`) in `src/components/ui/`.
- Compatibility: backward-compatible
- Consumers: all current and future page routes in `src/pages/`
- Validation Evidence: `npm run check`, `npm run typecheck`, `npm run build` (all pass on 2026-03-01)
- Notes: Props are typed and exported for Astro strict checks.

### [CON-002] Astro Content Layer Collections Contract
- NodeID: n04_content_collections_schema
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Added typed collection contracts for `projects` and `blog` using Astro v5 Content Layer loaders and shared schema helpers.
- Status: approved
- Surface: internal interface
- Contract: `src/content.config.ts` must define `projects` and `blog` via `defineCollection` + `glob` loaders targeting `src/data/projects/**/*.{md,mdx}` and `src/data/blog/**/*.{md,mdx}`; both collections require fields for `title`, `slug`, `summary`, `publishedAt`, `tags`, and `draft`, with optional `updatedAt` and `coverImage`; collection helper queries in `src/lib/content.ts` must return non-draft entries sorted by newest publish/update date.
- Compatibility: backward-compatible
- Consumers: page routes, data utilities, and any modules querying `astro:content`
- Validation Evidence: `npm run astro check`, `npm run typecheck` (pass on 2026-03-01)
- Notes: Shared schema definitions live in `src/content/schemas.ts` to keep field validation consistent across collections.

### [CON-003] Profile Seed and Content Baseline Contract
- NodeID: n05_initial_content_seed
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Added stable first-pass profile payload and expanded seed content set for portfolio and blog collections.
- Status: approved
- Surface: internal interface
- Contract: `src/data/profile.json` provides canonical profile fields (`name`, `headline`, `aboutShort`, `aboutLong`, `focusAreas`, `contact`, `social`, `availability`) and content seeds under `src/data/projects/*.md` and `src/data/blog/*.md` must satisfy collection schemas without placeholder links.
- Compatibility: backward-compatible
- Consumers: homepage/about/work/blog routes and any components consuming profile or collection data
- Validation Evidence: `npm run check`, `npm run typecheck`, and data placeholder scan on 2026-03-01
- Notes: This is a content baseline for IA and visual polish; editorial refinement remains a follow-up activity.

### [CON-004] Site Shell and Navigation Interface Contract
- NodeID: n06_site_shell_navigation
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Defined the reusable shell contract for layout slots, navigation behavior, and route scaffolding.
- Status: approved
- Surface: internal interface
- Contract: `BaseLayout.astro` must render shared `Header` + `Footer`, include skip-link target `#main-content`, and expose `hero` plus default content slots; `src/components/layout/Nav.astro` must provide primary route links (`/`, `/about`, `/projects`, `/blog`, `/contact`) with `aria-current="page"` on active route and mobile-collapsible menu behavior.
- Compatibility: backward-compatible
- Consumers: all current and future route pages in `src/pages/`, including downstream nodes `n07`, `n08`, and `n09`.
- Validation Evidence: `npm run check`, `npm run typecheck`, manual nav walkthrough on `/`, `/about`, `/projects`, `/blog`, `/contact`, `/style-playground`.
- Notes: Current route pages for about/contact/projects/blog are scaffolds only and are intended to be enriched by child nodes.

### [CON-005] Core Page Content and CTA Hierarchy Contract
- NodeID: n07_home_about_contact_pages
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Replaced route scaffolds with data-backed home/about/contact pages and page-specific section components.
- Status: approved
- Surface: internal interface
- Contract: `src/pages/index.astro`, `src/pages/about.astro`, and `src/pages/contact.astro` must consume canonical profile data from `src/data/profile.json`; homepage must expose hero/story/highlights with project/blog summary signals; about must expose narrative + focus areas; contact must expose primary email CTA and secondary social CTAs via dedicated page components under `src/components/pages/`.
- Compatibility: backward-compatible
- Consumers: site visitors, shared layout shell, and future nodes extending projects/blog routes
- Validation Evidence: `npm run check`, `npm run typecheck`, `npm run build` (pass on 2026-03-01)
- Notes: Links from homepage highlights point to section indexes (`/projects`, `/blog`) because detail routing is out of scope for this node.

### [CON-006] Projects Archive and Dynamic Detail Route Contract
- NodeID: n08_projects_index_and_detail
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Added collection-driven projects archive rendering and static detail route generation with reusable project card/details UI components.
- Status: approved
- Surface: internal interface
- Contract: `/projects` must render all `getPublishedProjects()` entries via reusable cards; `/projects/[slug]` must generate static paths from each project `data.slug`, render markdown narrative content, and show detail metadata/links using `src/components/projects/ProjectDetailsPanel.astro`; optional fields (`updatedAt`, `coverImage`, `repositoryUrl`, `demoUrl`) must degrade gracefully without throwing or blank-structure failures.
- Compatibility: backward-compatible
- Consumers: site visitors, homepage project links, and future portfolio/blog cross-linking features.
- Validation Evidence: `npm run check`, `npm run typecheck`, `npm run build`, and generated artifact checks in `dist/projects/**/*`.
- Notes: Preview-server manual browser validation is environment-dependent; static route artifact inspection is accepted fallback when sandbox blocks local port binding.

### [CON-007] Blog Index, Post, Tag, and Pagination Route Contract
- NodeID: n09_blog_index_post_and_tags
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Added a canonical blog routing/data contract for index, dynamic post details, tag archives, and paginated archives.
- Status: approved
- Surface: internal interface
- Contract: `src/lib/content.ts` must expose `getBlogPosts()` (drafts excluded in production mode, included otherwise), `getBlogTagSummaries()`, `paginateEntries()`, and `BLOG_PAGE_SIZE`; `/blog` renders page-1 archive sorted newest-first, `/blog/[slug]` and `/blog/tags/[tag]` generate static paths from the same filtered source, and `/blog/page/[page]` is generated for page numbers >1 only.
- Compatibility: backward-compatible
- Consumers: blog routes, homepage post signals, and future RSS/sitemap node work.
- Validation Evidence: `npm run check`, `npm run typecheck`, `npm run build`, generated artifacts under `dist/blog/**/*`.
- Notes: In this sandbox, `npm run preview` cannot bind localhost (`listen EPERM`), so route verification uses static build artifacts.

### [CON-008] MDX Prose Component Authoring Contract
- NodeID: n10_mdx_authoring_workflow
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Added the MDX integration and component-rendering contract for rich blog authoring.
- Status: approved
- Surface: internal interface
- Contract: `astro.config.mjs` must include `mdx()` from `@astrojs/mdx`; blog collection loader remains `**/*.{md,mdx}`; `src/pages/blog/[slug].astro` must render `Content` with `components` mapping for `Callout`, `ImageFigure`, and `CodeNote`; reusable prose components live in `src/components/prose/` and may be used directly inside `.mdx` entries under `src/data/blog/`.
- Compatibility: backward-compatible
- Consumers: blog authors, blog detail route rendering, and future editorial components in MDX content.
- Validation Evidence: `npm run astro check`, `npm run typecheck`, `npm run build`, and `rg -n "prose-callout|prose-figure|prose-code-note" dist/blog/mdx-authoring-with-shared-prose-components/index.html`.
- Notes: Sample published entry `src/data/blog/mdx-authoring-with-shared-prose-components.mdx` is the canonical reference for component usage.

### [CON-009] SEO Metadata, RSS Feed, and Sitemap Output Contract
- NodeID: n11_seo_rss_sitemap_metadata
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Defined shared metadata defaults and output contract for RSS and sitemap generation.
- Status: approved
- Surface: internal interface
- Contract: `astro.config.mjs` must set `site` to the production origin and include `sitemap()` integration; `src/layouts/BaseLayout.astro` must emit `description`, `robots`, canonical, OpenGraph, Twitter card/title/description defaults, plus feed (`rel="alternate" type="application/rss+xml"`) and sitemap (`rel="sitemap"`) discovery links; `src/pages/rss.xml.ts` must expose `GET` returning `@astrojs/rss` output from `getBlogPosts({ includeDrafts: false })` with links to `/blog/<slug>/`.
- Compatibility: backward-compatible
- Consumers: search crawlers, feed readers, social unfurlers, and all page routes using `BaseLayout`.
- Validation Evidence: `npm run check`, `npm run typecheck`, `npm run build`, and artifact checks for `dist/rss.xml` + `dist/sitemap-index.xml`.
- Notes: Blog/project detail routes can pass `ogType="article"` and optional `image` to enrich previews without overriding the baseline contract.

### [CON-010] Core Template Performance and Accessibility Hardening Contract
- NodeID: n12_performance_and_accessibility_pass
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Established explicit image loading/priority rules, strengthened focus/contrast defaults, and expanded reduced-motion guarantees for core templates.
- Status: approved
- Surface: internal interface
- Contract: Detail hero covers in `src/pages/blog/[slug].astro` and `src/pages/projects/[slug].astro` must preload image assets and render with `loading="eager"`, `fetchpriority="high"`, and explicit dimensions/sizes; reusable card/prose media in `src/components/blog/BlogCard.astro`, `src/components/projects/ProjectCard.astro`, and `src/components/prose/ImageFigure.astro` must render with `loading="lazy"`, `fetchpriority="low"`, and explicit dimensions/sizes; global style tokens must define focus-ring colors and global CSS must enforce visible `:focus-visible` outlines plus reduced-motion transform suppression.
- Compatibility: backward-compatible
- Consumers: site visitors, keyboard users, reduced-motion users, and all routes rendering shared media components.
- Validation Evidence: `npm run build`, `npm run check`, `npm run typecheck`, generated artifact scans in `dist/**`, and `docs/qa/perf-a11y-report.md`.
- Notes: Runtime preview and Lighthouse collection may require an unrestricted environment when localhost bind or package registry access is sandboxed.

### [CON-011] Quality Gate Script Interface Contract
- NodeID: n13a_quality_gate_commands
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Added a stable package-script contract for project quality verification.
- Status: approved
- Surface: config
- Contract: `package.json` must expose `quality:gate` and `ci:quality` scripts that execute `check`, `typecheck`, `build`, then `quality:test`; `quality:test` must run `scripts/verify-quality-gate.mjs` and fail when required build artifacts or key regression markers are missing.
- Compatibility: backward-compatible
- Consumers: developers and CI pipelines validating repository quality gates.
- Validation Evidence: `npm run quality:gate`, `npm run check`, `npm run typecheck` on 2026-03-01.
- Notes: This contract intentionally avoids introducing an additional browser/e2e framework.

### [CON-012] Release Regression Checklist Coverage Contract
- NodeID: n13b_release_regression_checklist
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Defined the required manual release-checklist coverage for core routes and high-risk quality areas.
- Status: approved
- Surface: internal interface
- Contract: `docs/qa/release-checklist.md` must include explicit PASS/FAIL/BLOCKED capture fields, evidence and notes fields for each route, coverage for `/`, `/about/`, `/projects/`, representative project detail, `/blog/`, representative markdown post, representative MDX post, representative tag archive, and `/contact/`, plus cross-route checks for navigation, accessibility basics, media loading, and performance sanity.
- Compatibility: backward-compatible
- Consumers: release managers, QA pass owners, and contributors preparing production releases.
- Validation Evidence: `docs/qa/release-checklist.md`, `npm run check`, `npm run typecheck`.
- Notes: This contract complements the scripted `quality:gate` and is intended for final human verification before release.

### [CON-013] Content Media Asset Resolution Contract
- NodeID: n13c_qa_run_and_blocker_fixes
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Added enforceable media-path contract for blog/project cover images and MDX figure assets.
- Status: approved
- Surface: internal interface
- Contract: Paths referenced by `coverImage` in `src/data/blog/*` and `src/data/projects/*`, plus inline MDX figure/image sources used by published posts, must resolve to existing files inside `public/images/**` at build time; current canonical set uses `.svg` placeholders for all published references.
- Compatibility: backward-compatible
- Consumers: blog index/detail/tag routes, projects index/detail routes, MDX prose rendering.
- Validation Evidence: `npm run quality:gate` and dist internal-reference integrity sweep (`All internal href/src references resolve within dist.`).
- Notes: This contract prevents silent broken-image regressions that static HTML generation alone does not catch.

### [CON-014] Documentation and Editorial Runbook Surface Contract
- NodeID: n14_deploy_and_editorial_docs
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Standardized final pre-deploy documentation surfaces and verification command set.
- Status: approved
- Surface: internal interface
- Contract: Repository must provide `README.md` (setup/run/check/build quickstart), `docs/content-workflow.md` (collection authoring and media contract workflow), `docs/qa/release-checklist.md` (manual checklist template + latest execution snapshot), and `docs/handoff.md` (scope closure, QA outcomes, limitations, and backlog). Verification commands documented for clean checkout are `npm install`, `npm run check`, `npm run typecheck`, and `npm run build`.
- Compatibility: backward-compatible
- Consumers: maintainers, release owners, and content editors.
- Validation Evidence: documentation path existence checks and successful command execution on node completion.
- Notes: Deployment/publish runbooks remain out of scope until hosting/domain decisions are finalized.

### [CON-015] Localized Content Entry and Fallback Query Contract
- NodeID: T03_define_multilingual_content_model
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Defined the multilingual frontmatter and query behavior contract for projects/blog content entries.
- Status: approved
- Surface: internal interface
- Contract: Project and blog entries must include `locale` (supported locale enum) and `translationGroup` (`<collection>:<slug>`), keep same `slug` across translations in one translation group, and use locale-first query resolution with fallback to `en` for projects index, project detail, blog index, blog detail, tags, and pagination while de-duplicating by translation group.
- Compatibility: backward-compatible
- Consumers: content schemas, content query helpers, project/blog routes, and editorial migration workflows.
- Validation Evidence: `docs/atp-content/atp-content-localization-plan.md` plus acceptance regex verification command for required localization terms.
- Notes: File layout recommendation is grouped locale files per slug under `src/data/projects/<slug>/<locale>.md|mdx` and `src/data/blog/<slug>/<locale>.md|mdx`.
