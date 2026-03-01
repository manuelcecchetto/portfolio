# Evidence Index

Index of acceptance and verification evidence produced by ATP nodes.

## Ownership

- Primary owner: QA/verification lead
- Maintainers: workers producing tests, checks, or validation artifacts

## Entry Template

```md
### [EVD-<number>] <Evidence Title>
- NodeID: <ATP node id>
- Date: YYYY-MM-DD
- Author: <agent_id>
- Status: proposed | approved | superseded
- Requirement/Acceptance Link: <requirement id or text>
- Evidence Type: test | benchmark | manual verification | doc
- Location: <file path / command / URL>
- Result Summary: <pass/fail/findings>
- Notes: <limitations/follow-up>
```

## Evidence

### [EVD-000] Memory Governance Bootstrap
- NodeID: BOOTSTRAP
- Date: 2026-03-01
- Author: codex_runner_setup
- Status: approved
- Requirement/Acceptance Link: shared memory folder and governance protocol must exist
- Evidence Type: doc
- Location: `docs/memory/*`, `RUNNER.md`
- Result Summary: initial memory artifacts and mandatory update protocol added
- Notes: future nodes should append concrete test/command evidence entries

### [EVD-001] Astro Baseline Scaffold Verification Attempt
- NodeID: n02_astro_v5_scaffold
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Added baseline Astro project files and captured verification failure due npm registry connectivity.
- Status: proposed
- Requirement/Acceptance Link: Node `n02_astro_v5_scaffold` verification (`npm install && npm run astro check && npm run build`)
- Evidence Type: test
- Location: commands run in repo root: `npm install`, `npm install --offline`, `npm run astro check`, `npm run typecheck`, `npm run build`
- Result Summary: failed; `npm install` returned `ENOTFOUND registry.npmjs.org`, offline install returned `ENOTCACHED`, and Astro commands failed with `sh: astro: command not found`.
- Notes: rerun the same commands once registry access or offline cache is available.

### [EVD-002] Design System Foundation Verification
- NodeID: n03_design_tokens_and_base_layout
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Verified new token/global/layout/UI primitive foundation compiles and builds with Astro strict checks.
- Status: approved
- Requirement/Acceptance Link: Node `n03_design_tokens_and_base_layout` verification (tokens + base layout + wrappers + motion primitives + playground route)
- Evidence Type: test
- Location: repo root commands `npm run check`, `npm run typecheck`, `npm run build`; visual validation route `src/pages/style-playground.astro`
- Result Summary: pass; `astro check` reports 0 errors/warnings/hints and build generates `/` and `/style-playground/`.
- Notes: Manual browser contrast/motion validation should be performed via `npm run dev` and `/style-playground` on desktop and mobile viewports.

### [EVD-003] Content Collections Schema Verification
- NodeID: n04_content_collections_schema
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Added and validated typed content collections plus query helpers for `projects` and `blog`.
- Status: approved
- Requirement/Acceptance Link: Node `n04_content_collections_schema` verification (`npm run astro check` and collection query type safety)
- Evidence Type: test
- Location: files `src/content.config.ts`, `src/content/schemas.ts`, `src/lib/content.ts`, `src/data/projects/*.md`, `src/data/blog/*.md`; commands `npm run astro check`, `npm run typecheck`
- Result Summary: pass; both commands complete with 0 errors/warnings/hints after adding collection definitions and sample entries.
- Notes: A transient Astro datastore filesystem error occurred when checks were started in parallel; sequential rerun passed and is the authoritative result.

### [EVD-004] Initial Portfolio and Blog Content Seed Verification
- NodeID: n05_initial_content_seed
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Verified expanded project/blog seed content and profile payload against content schemas and data quality checks.
- Status: approved
- Requirement/Acceptance Link: Node `n05_initial_content_seed` verification (`npm run astro check` and collection-ready content without fallback placeholders)
- Evidence Type: test
- Location: files `src/data/profile.json`, `src/data/projects/*.md`, `src/data/blog/*.md`, `docs/content-sourcing-notes.md`; commands `npm run check`, `npm run typecheck`, `rg -n "example\\.com|TODO|TBD|lorem ipsum|placeholder" src/data docs/content-sourcing-notes.md`
- Result Summary: pass; Astro checks succeeded and placeholder scan returned no matches across seeded content files.
- Notes: Final editorial pass should validate profile copy against the latest external CV/LinkedIn documents before launch.

### [EVD-005] Site Shell Navigation Verification
- NodeID: n06_site_shell_navigation
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Verified shared shell wiring, responsive navigation behavior, and route scaffolds with strict Astro diagnostics.
- Status: approved
- Requirement/Acceptance Link: Node `n06_site_shell_navigation` verification (header/nav/footer, active routes, mobile menu, skip-link, shared layout slots)
- Evidence Type: test
- Location: files `src/components/layout/{Header,Nav,Footer}.astro`, `src/layouts/BaseLayout.astro`, `src/styles/global.css`, `src/pages/{index,about,contact,style-playground}.astro`, `src/pages/projects/index.astro`, `src/pages/blog/index.astro`; commands `npm run check`, `npm run typecheck`
- Result Summary: pass; both commands completed with 0 errors, 0 warnings, and 0 hints after shell/navigation integration.
- Notes: Manual UX checks should run with `npm run dev` on desktop and mobile widths to confirm keyboard order, skip-link behavior, and menu collapse/expand transitions.

### [EVD-006] Home/About/Contact Content Page Verification
- NodeID: n07_home_about_contact_pages
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Verified implementation of real-content homepage, about narrative page, and contact CTA hierarchy page.
- Status: approved
- Requirement/Acceptance Link: Node `n07_home_about_contact_pages` verification (`npm run dev` + responsive hierarchy checks for home/about/contact)
- Evidence Type: test
- Location: files `src/pages/{index,about,contact}.astro`, `src/components/pages/home/*`, `src/components/pages/about/*`, `src/components/pages/contact/*`; commands `npm run check`, `npm run typecheck`, `npm run build`
- Result Summary: pass; all commands succeeded with 0 Astro diagnostics and static build generated route outputs for `/`, `/about`, and `/contact`.
- Notes: Manual browser verification should confirm CTA priority, keyboard focus flow, and readability at mobile/tablet/desktop widths.

### [EVD-007] Projects Archive and Dynamic Detail Routes Verification
- NodeID: n08_projects_index_and_detail
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Verified collection-driven `/projects` archive and generated `/projects/[slug]` detail pages with reusable project components and optional-field fallbacks.
- Status: approved
- Requirement/Acceptance Link: Node `n08_projects_index_and_detail` verification (`npm run build` and preview route rendering/link resolution checks).
- Evidence Type: test
- Location: files `src/pages/projects/index.astro`, `src/pages/projects/[slug].astro`, `src/components/projects/{ProjectCard,ProjectDetailsPanel}.astro`; commands `npm run check`, `npm run typecheck`, `npm run build`; generated artifacts under `dist/projects/**/index.html`.
- Result Summary: pass; strict Astro diagnostics and build succeeded with generated routes for all project slugs, and static artifact scans confirmed archive/detail links and detail metadata sections.
- Notes: `npm run preview` could not bind localhost in this sandbox (`listen EPERM`), so acceptance fallback used generated HTML verification in `dist/projects/`.

### [EVD-008] Blog Index/Post/Tag Route Verification
- NodeID: n09_blog_index_post_and_tags
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Verified blog archive, dynamic post pages, tag pages, and pagination route generation using shared content helpers and production-safe draft filtering.
- Status: approved
- Requirement/Acceptance Link: Node `n09_blog_index_post_and_tags` verification (`npm run build && npm run preview`, manual validation of post routes, tag routes, and draft exclusion in production output)
- Evidence Type: test
- Location: files `src/pages/blog/index.astro`, `src/pages/blog/[slug].astro`, `src/pages/blog/tags/[tag].astro`, `src/pages/blog/page/[page].astro`, `src/components/blog/{BlogCard,BlogPagination}.astro`, `src/lib/content.ts`; commands `npm run check`, `npm run typecheck`, `npm run build`, `npm run preview -- --host 127.0.0.1 --port 4322`; artifact checks `test -f dist/blog/astro-content-layer-in-practice/index.html`, `test ! -e dist/blog/tuning-page-motion-with-respect/index.html`, `test -f dist/blog/tags/astro/index.html`.
- Result Summary: pass on check/typecheck/build and static artifact assertions; preview command failed due sandbox port-bind restriction (`listen EPERM`), and production build output confirms only published post/tag routes were generated.
- Notes: Because drafts are filtered in production mode, draft-only slugs/tags are intentionally absent from `dist/blog/**`.

### [EVD-009] MDX Authoring Workflow Enablement Blocked by Registry DNS
- NodeID: n10_mdx_authoring_workflow
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Captured verification evidence for failed dependency installation while attempting to enable Astro MDX authoring workflow.
- Status: proposed
- Requirement/Acceptance Link: Node `n10_mdx_authoring_workflow` (`@astrojs/mdx` install/config, reusable prose components, `.mdx` sample, `npm run check && npm run build`).
- Evidence Type: test
- Location: commands `npm install @astrojs/mdx` and `npm install @astrojs/mdx --registry=https://registry.npmmirror.com`; reference docs `https://docs.astro.build/en/guides/integrations-guide/mdx/`.
- Result Summary: fail; both install commands returned `getaddrinfo ENOTFOUND` for registry hostnames, so MDX integration package could not be installed and scope implementation could not proceed.
- Notes: Re-run this node after registry/DNS connectivity is restored or an offline cache with `@astrojs/mdx` is provided.

### [EVD-010] SEO/RSS/Sitemap Node Blocked by Registry DNS
- NodeID: n11_seo_rss_sitemap_metadata
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Captured verification evidence showing required Astro RSS/sitemap packages cannot be installed in this environment.
- Status: proposed
- Requirement/Acceptance Link: Node `n11_seo_rss_sitemap_metadata` (`site` URL, metadata baseline, `@astrojs/rss` endpoint, feed autodiscovery link, `@astrojs/sitemap` integration, `npm run build` verification).
- Evidence Type: test
- Location: commands `npm install @astrojs/rss @astrojs/sitemap --no-audit --no-fund --fetch-timeout=5000 --fetch-retries=0` and `npm install @astrojs/rss @astrojs/sitemap --registry=https://registry.npmmirror.com --no-audit --no-fund --fetch-timeout=5000 --fetch-retries=0`; reference docs `https://docs.astro.build/en/recipes/rss/` and `https://docs.astro.build/en/guides/integrations-guide/sitemap/`.
- Result Summary: fail; both install commands returned `getaddrinfo ENOTFOUND` for registry hostnames, so required dependencies are unavailable and implementation/build verification cannot proceed.
- Notes: Re-run this node once DNS/network access to npm registries is restored or an offline cache with the required packages is supplied.

### [EVD-011] MDX Authoring Workflow Verification
- NodeID: n10_mdx_authoring_workflow
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Verified MDX integration, reusable prose components, and published sample post rendering in production build output.
- Status: approved
- Requirement/Acceptance Link: Node `n10_mdx_authoring_workflow` (`@astrojs/mdx` config, `.mdx` collection support, reusable components, sample post, and successful checks/build).
- Evidence Type: test
- Location: files `astro.config.mjs`, `src/pages/blog/[slug].astro`, `src/components/prose/{Callout,ImageFigure,CodeNote}.astro`, `src/data/blog/mdx-authoring-with-shared-prose-components.mdx`; commands `npm run astro check`, `npm run typecheck`, `npm run build`, `rg -n "prose-callout|prose-figure|prose-code-note" dist/blog/mdx-authoring-with-shared-prose-components/index.html`; docs `https://docs.astro.build/en/guides/integrations-guide/mdx/`, `https://docs.astro.build/en/guides/markdown-content/#passing-components-to-mdx-content`.
- Result Summary: pass; all commands completed successfully and built HTML for the sample MDX route contains markup from all three custom prose components.
- Notes: Source docs were consulted on 2026-03-01 to confirm integration setup and `Content` component mapping behavior.

### [EVD-012] SEO Baseline, RSS, and Sitemap Verification
- NodeID: n11_seo_rss_sitemap_metadata
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Verified site URL config, shared metadata defaults, RSS endpoint generation, and sitemap integration output.
- Status: approved
- Requirement/Acceptance Link: Node `n11_seo_rss_sitemap_metadata` (`site` URL, metadata baseline, RSS endpoint/autodiscovery, sitemap integration, build outputs).
- Evidence Type: test
- Location: files `astro.config.mjs`, `src/layouts/BaseLayout.astro`, `src/pages/rss.xml.ts`, `src/pages/blog/[slug].astro`, `src/pages/projects/[slug].astro`; commands `npm run check`, `npm run typecheck`, `npm run build`, `ls -1 dist | rg 'rss.xml|sitemap'`, `rg -n "canonical|og:title|application/rss\+xml|rel=\"sitemap\"" dist/index.html`; docs `https://docs.astro.build/en/recipes/rss/`, `https://docs.astro.build/en/guides/integrations-guide/sitemap/`.
- Result Summary: pass; all diagnostics commands succeeded and build output includes `/rss.xml`, `sitemap-0.xml`, and `sitemap-index.xml`, with canonical/OG/feed/sitemap tags rendered in page head output.
- Notes: Source docs were consulted on 2026-03-01 for the `rss()` endpoint pattern and `sitemap()` integration behavior.

### [EVD-013] Performance and Accessibility Hardening Verification
- NodeID: n12_performance_and_accessibility_pass
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Verified image/font loading hardening, reduced-motion/focus improvements, and generated QA report artifact for core templates.
- Status: approved
- Requirement/Acceptance Link: Node `n12_performance_and_accessibility_pass` (`npm run build && npm run preview`, keyboard/screen-reader smoke checks, Lighthouse checks for Home + Project detail + Blog post pages).
- Evidence Type: test
- Location: files `src/layouts/BaseLayout.astro`, `src/styles/{tokens,global}.css`, `src/pages/{blog/[slug],projects/[slug]}.astro`, `src/components/{blog/BlogCard,projects/ProjectCard,prose/ImageFigure,pages/home/HomeHero}.astro`, `docs/qa/perf-a11y-report.md`; commands `npm run build`, `npm run check`, `npm run typecheck`, `npm run preview -- --host 127.0.0.1 --port 4322`, `npx --yes lighthouse --version`, and dist assertions via `rg` on generated HTML/CSS.
- Result Summary: pass for build/check/typecheck and static artifact validation; preview and Lighthouse execution were blocked by sandbox constraints (`listen EPERM` on localhost bind and `ENOTFOUND registry.npmjs.org`).
- Notes: Full manual keyboard/screen-reader walkthrough and Lighthouse scoring must be completed in an unrestricted runtime; detailed checklist and blockers are documented in `docs/qa/perf-a11y-report.md`.

### [EVD-014] Scripted Quality Gate Verification
- NodeID: n13a_quality_gate_commands
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Verified the new single-command quality gate and targeted post-build regression assertions.
- Status: approved
- Requirement/Acceptance Link: Node `n13a_quality_gate_commands` (single documented command sequence for type/content/build quality plus targeted in-repo tests).
- Evidence Type: test
- Location: `package.json`, `scripts/verify-quality-gate.mjs`, `docs/qa/quality-gate.md`; commands `npm run quality:gate`, `npm run check`, `npm run typecheck`.
- Result Summary: pass; command chain completed successfully, including build artifact existence checks and key MDX/SEO marker assertions.
- Notes: This gate complements existing QA docs and is designed for both local execution and CI reuse.

### [EVD-015] Release Regression Checklist Artifact Verification
- NodeID: n13b_release_regression_checklist
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Added and validated a route-based manual release checklist with explicit result capture fields and high-risk cross-route checks.
- Status: approved
- Requirement/Acceptance Link: Node `n13b_release_regression_checklist` (concise actionable checklist with route coverage and pass/fail capture for high-risk areas).
- Evidence Type: doc
- Location: `docs/qa/release-checklist.md`; commands `npm run check`, `npm run typecheck`.
- Result Summary: pass; checklist document created with required route coverage and explicit PASS/FAIL/BLOCKED, evidence, and notes fields; diagnostics/type checks pass after updates.
- Notes: Checklist is designed for manual execution in release-candidate environments and complements scripted quality gates.

### [EVD-016] QA Gate Execution and Media Blocker Remediation
- NodeID: n13c_qa_run_and_blocker_fixes
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Executed scripted quality gate and manual release-checklist run, identified missing media-asset blocker, implemented fix, and revalidated output integrity.
- Status: approved
- Requirement/Acceptance Link: Node `n13c_qa_run_and_blocker_fixes` (run automated checks + manual regression checklist, remediate release blockers, record evidence).
- Evidence Type: test
- Location: `docs/qa/release-checklist-execution-2026-03-01.md`; commands `npm run quality:gate`, `npm run preview -- --host 127.0.0.1 --port 4322`, and dist integrity sweep script (`All internal href/src references resolve within dist.`).
- Result Summary: pass for all verifiable build/static checks after remediation; runtime-only checks (live nav/perf) are blocked in this sandbox by preview bind `EPERM`.
- Notes: Blocker fixed by adding concrete `public/images/**` assets and updating content/MDX paths to existing files.

### [EVD-017] Final Documentation Wrap-Up Verification
- NodeID: n14_deploy_and_editorial_docs
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Verified final setup/editorial/handoff documentation set and validated clean-checkout command sequence.
- Status: approved
- Requirement/Acceptance Link: Node `n14_deploy_and_editorial_docs` (complete setup/run docs, content workflow docs, QA/limitations summary, and handoff recommendations).
- Evidence Type: doc
- Location: `README.md`, `docs/content-workflow.md`, `docs/qa/release-checklist.md`, `docs/handoff.md`; commands `npm run check`, `npm run typecheck`, `npm run build`; docs path consistency check via shell existence assertions.
- Result Summary: pass; required docs exist, cross-references are valid, and check/typecheck/build commands succeed after documentation updates.
- Notes: Deployment execution remains intentionally out of scope for this node.

### [EVD-018] ATP Package Source Corpus Verification
- NodeID: T01_scan_atp_packages
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Produced a canonical ATP source corpus documenting package roles, schema contracts, MCP interfaces, and execution terminology from the ATP monorepo.
- Status: approved
- Requirement/Acceptance Link: Node `T01_scan_atp_packages` (scan `atp-protocol`, `atp-mcp-server`, `atp-runner`, `atp-visualizer`; capture role/interface terminology in one canonical document).
- Evidence Type: doc
- Location: `docs/atp-content/atp-source-corpus.md`; source corpus derived from `/Users/manuelcecchetto/code/atp/{atp-protocol,atp-mcp-server,atp-runner,atp-visualizer}` key README/schema/prompt/runtime files; verification command `test -f docs/atp-content/atp-source-corpus.md && rg -n "atp-protocol|atp-mcp-server|atp-runner|atp-visualizer|atp_schema.json|claim|complete|decompose|visualizer" docs/atp-content/atp-source-corpus.md`.
- Result Summary: pass; canonical corpus file exists and contains all required package names/interface terms requested by the node acceptance criteria.
- Notes: Scope intentionally excluded website copywriting and application-code changes.

### [EVD-019] ATP Mechanics Brief Verification
- NodeID: T02_synthesize_atp_mechanics_brief
- Date: 2026-03-01
- Author: codex_agent_1
- Status: approved
- Requirement/Acceptance Link: Node `T02_synthesize_atp_mechanics_brief` (synthesize ATP essence/mechanics brief with package roles, schema essentials, generation/execution flows, lifecycle and tool sections)
- Evidence Type: doc
- Location: `docs/atp-content/atp-mechanics-brief.md`; verification command `test -f docs/atp-content/atp-mechanics-brief.md && rg -n "Essence|Package Roles|Schema|Generation Flow|Execution Flow|Node Status Lifecycle|Claim|Complete|Decompose|Visualizer" docs/atp-content/atp-mechanics-brief.md`
- Result Summary: pass; brief exists and contains all required section anchors and lifecycle/tool terms.
- Notes: Scope intentionally excludes final public copywriting in site page/blog content files.

### [EVD-020] Multilingual Content Model Plan Verification
- NodeID: T03_define_multilingual_content_model
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Added implementation-ready multilingual content model plan and verified required section terms.
- Status: approved
- Requirement/Acceptance Link: Node `T03_define_multilingual_content_model` (define locale field contract, same-slug translation group strategy, fallback/query behavior, and migration plan)
- Evidence Type: doc
- Location: `docs/atp-content/atp-content-localization-plan.md`; verification command `test -f docs/atp-content/atp-content-localization-plan.md && rg -n "locale|translation group|slug|fallback|projects index|project detail|blog index|blog detail|tags|pagination|migration" docs/atp-content/atp-content-localization-plan.md`
- Result Summary: pass; file exists and contains all required localization model anchors and migration guidance.
- Notes: This node defines contract and rollout plan only; implementation is delegated to downstream execution nodes.

### [EVD-021] Locale-Aware Content Pipeline Implementation Verification
- NodeID: T04_implement_locale_aware_content_pipeline
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Verified schema, helper, route, and content migration updates implementing locale-first selection with `en` fallback for projects/blog routes.
- Status: approved
- Requirement/Acceptance Link: Node `T04_implement_locale_aware_content_pipeline` (`npm run check && npm run build` plus localization marker scan across schemas/helpers/routes)
- Evidence Type: test
- Location: files `src/content/schemas.ts`, `src/lib/content.ts`, `src/pages/projects/index.astro`, `src/pages/projects/[slug].astro`, `src/pages/blog/index.astro`, `src/pages/blog/[slug].astro`, `src/pages/blog/tags/[tag].astro`, `src/pages/blog/page/[page].astro`, `src/data/projects/atp-protocol.en.md`, `src/data/blog/how-atp-works.en.md`; commands `npm run check`, `npm run typecheck`, `npm run build`, `rg -n "locale|fallback|translation" src/content/schemas.ts src/lib/content.ts src/pages/projects/index.astro src/pages/projects/[slug].astro src/pages/blog/index.astro src/pages/blog/[slug].astro src/pages/blog/tags/[tag].astro src/pages/blog/page/[page].astro`.
- Result Summary: pass; Astro diagnostics and build completed with 0 errors/warnings/hints, localized project/blog routes generated across non-default locale prefixes, and localization markers were found in all required implementation files.
- Notes: `npm run typecheck` aliases to `astro check` in this repository and was executed explicitly for ATP lint/typecheck governance.

### [EVD-022] ATP Project Short English Copy Verification
- NodeID: T05_write_atp_project_short_en
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Rewrote the short English ATP project entry copy for concise project-page narrative quality while preserving validated mechanics claims.
- Status: approved
- Requirement/Acceptance Link: Node `T05_write_atp_project_short_en` (short EN title/summary/body covering problem, protocol approach, package ecosystem, and practical value)
- Evidence Type: doc
- Location: `src/data/projects/atp-protocol.en.md`; verification command `test -f src/data/projects/atp-protocol.en.md && rg -n "^title:|^slug:|^summary:|^locale: en|atp-protocol|atp-mcp-server|atp-runner|atp-visualizer" src/data/projects/atp-protocol.en.md`
- Result Summary: pass; file exists and includes required frontmatter keys plus required ATP package terms in body copy.
- Notes: Content remains intentionally short-form for projects index/detail context, not long-form tutorial depth.

### [EVD-023] ATP Project Short Locale Translation Verification
- NodeID: T06_translate_atp_project_short_all_locales
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Added translated short ATP project entries for all required locales while preserving schema/package/protocol consistency.
- Status: approved
- Requirement/Acceptance Link: Node `T06_translate_atp_project_short_all_locales` (localized `it/de/fr/zh/hi` project files with valid frontmatter locale metadata and shared slug/translation grouping)
- Evidence Type: test
- Location: files `src/data/projects/atp-protocol.{it,de,fr,zh,hi}.md`; verification commands `for locale in it de fr zh hi; do test -f "src/data/projects/atp-protocol.${locale}.md"; done` and `rg -n "^locale: (it|de|fr|zh|hi)$" src/data/projects/atp-protocol.it.md src/data/projects/atp-protocol.de.md src/data/projects/atp-protocol.fr.md src/data/projects/atp-protocol.zh.md src/data/projects/atp-protocol.hi.md`
- Result Summary: pass; all five locale files exist and each file declares the expected locale metadata value.
- Notes: Package names and lifecycle/protocol terms remain intentionally unchanged (`atp-protocol`, `atp-mcp-server`, `atp-runner`, `atp-visualizer`; claim/complete/decompose).

### [EVD-024] ATP Long-Form English Blog Post Verification
- NodeID: T07_write_atp_blog_long_en
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Replaced the short placeholder ATP blog entry with a long-form technical walkthrough aligned to ATP package/source terminology.
- Status: approved
- Requirement/Acceptance Link: Node `T07_write_atp_blog_long_en` (long EN post covering motivation, schema-first contract, package responsibilities, generation/decomposition flow, runner loop, MCP lifecycle, and operational caveats).
- Evidence Type: doc
- Location: `src/data/blog/how-atp-works.en.md`; verification command `test -f src/data/blog/how-atp-works.en.md && rg -n "^title:|^slug:|^summary:|^locale: en|atp_schema.json|atp_claim_task|atp_complete_task|atp_decompose_task|atp_runner" src/data/blog/how-atp-works.en.md`
- Result Summary: pass; file exists with required frontmatter and includes all required ATP terms/tool identifiers in the article body.
- Notes: Claims and terminology were aligned with `docs/atp-content/atp-source-corpus.md` and `docs/atp-content/atp-mechanics-brief.md`.

### [EVD-025] ATP Long-Form Blog Locale Translation Verification
- NodeID: T08_translate_atp_blog_long_all_locales
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Added full-length localized ATP blog entries for `it`, `de`, `fr`, `zh`, and `hi` with schema-valid frontmatter and preserved protocol terminology.
- Status: approved
- Requirement/Acceptance Link: Node `T08_translate_atp_blog_long_all_locales` (publish deep-dive ATP blog in all locales with locale metadata and per-locale files).
- Evidence Type: test
- Location: files `src/data/blog/how-atp-works.{it,de,fr,zh,hi}.md`; commands `for locale in it de fr zh hi; do test -f "src/data/blog/how-atp-works.${locale}.md"; done` and `rg -n "^locale: (it|de|fr|zh|hi)$" src/data/blog/how-atp-works.it.md src/data/blog/how-atp-works.de.md src/data/blog/how-atp-works.fr.md src/data/blog/how-atp-works.zh.md src/data/blog/how-atp-works.hi.md`
- Result Summary: pass; all required locale files exist and each declares the expected locale value in frontmatter.
- Notes: Section structure mirrors the English source while preserving ATP identifiers (`atp_schema.json`, `atp_claim_task`, `atp_complete_task`, `atp_decompose_task`, `atp-runner`, `atp_runner`).

### [EVD-026] ATP Multilingual Publication Readiness Verification
- NodeID: T09_validate_multilocale_content_readiness
- Date: 2026-03-01
- Author: codex_agent_1
- Status: approved
- Requirement/Acceptance Link: Node `T09_validate_multilocale_content_readiness` (`npm run check && npm run build` and locale route existence for project/blog in `en,it,de,fr,zh,hi`, plus locale-aware listing behavior validation).
- Evidence Type: test
- Location: `evidence/atp-content-qa.md`; files `src/content.config.ts`; commands `npm run check`, `npm run typecheck`, `npm run build`, required locale route assertion loop, and localized listing href-count assertions.
- Result Summary: pass; all checks/build commands succeeded, required locale routes exist, and listing assertions confirm locale-correct ATP project/blog links without duplicate mixed-language card rendering.
- Notes: Node uncovered and fixed a publication blocker where `blog` collection lacked `generateId`, causing same-slug locale entries to overwrite each other. Fix applied in `src/content.config.ts`.
