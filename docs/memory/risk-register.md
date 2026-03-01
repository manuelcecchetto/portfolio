# Risk Register

Active and historical project risks with mitigations and ownership.

## Ownership

- Primary owner: tech lead / project manager
- Maintainers: all workers identifying or resolving risks

## Entry Template

```md
### [RISK-<number>] <Risk Title>
- NodeID: <ATP node id>
- Date: YYYY-MM-DD
- Author: <agent_id>
- Status: open | monitoring | mitigated | closed
- Probability: low | medium | high
- Impact: low | medium | high
- Area: architecture | delivery | quality | security | operations
- Description: <risk statement>
- Mitigation: <planned or completed actions>
- Owner: <person/role/agent>
- Evidence: <tests/metrics/logs/docs>
```

## Risks

### [RISK-000] Cross-Worker Decision Drift
- NodeID: BOOTSTRAP
- Date: 2026-03-01
- Author: codex_runner_setup
- Status: monitoring
- Probability: high
- Impact: high
- Area: delivery
- Description: Parallel workers may diverge on assumptions without a shared memory protocol.
- Mitigation: enforce updates to `docs/memory/*` and treat latest approved decision log entry as canonical.
- Owner: ATP orchestrator
- Evidence: runner prompt governance + memory templates

### [RISK-001] Registry Access Blocks Package Verification
- NodeID: n02_astro_v5_scaffold
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Identified inability to reach `registry.npmjs.org`, blocking dependency installation and validation commands for Astro scaffold.
- Status: open
- Probability: high
- Impact: high
- Area: operations
- Description: Network/DNS restriction (`ENOTFOUND registry.npmjs.org`) prevents `npm install`, causing `astro check` and `astro build` to fail due missing binary.
- Mitigation: Run this node in an environment with npm registry access (or provide a pre-seeded offline cache), then rerun install and verification.
- Owner: ATP orchestrator
- Evidence: `npm install`, `npm install --offline`, `npm run astro check`, `npm run build`

### [RISK-002] Prior npm Registry Blocker Closure Record
- NodeID: n03_design_tokens_and_base_layout
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Closed monitoring risk from scaffold phase by confirming validation commands now pass with installed dependencies.
- Status: closed
- Probability: low
- Impact: low
- Area: operations
- Description: Earlier inability to reach npm registry was a blocker for validation; this entry records closure after successful checks/build.
- Mitigation: Keep lockstep validation (`npm run check`, `npm run typecheck`, `npm run build`) in future nodes to quickly detect regressions.
- Owner: ATP orchestrator
- Evidence: successful command runs in node `n03_design_tokens_and_base_layout` on 2026-03-01.

### [RISK-003] Package Registry DNS Block Blocks MDX Integration Setup
- NodeID: n10_mdx_authoring_workflow
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Attempted to install `@astrojs/mdx` using both default npm registry and an alternate mirror, but DNS resolution failed in both cases.
- Status: open
- Probability: high
- Impact: high
- Area: operations
- Description: The environment cannot resolve npm registries (`registry.npmjs.org`, `registry.npmmirror.com`), preventing required dependency installation for MDX enablement.
- Mitigation: Restore outbound DNS/network access or provide an offline npm cache containing `@astrojs/mdx`, then rerun node `n10_mdx_authoring_workflow`.
- Owner: ATP orchestrator
- Evidence: `npm install @astrojs/mdx` and `npm install @astrojs/mdx --registry=https://registry.npmmirror.com` both failed with `getaddrinfo ENOTFOUND`.

### [RISK-004] Registry DNS Block Prevents RSS/Sitemap Integrations
- NodeID: n11_seo_rss_sitemap_metadata
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Attempted dependency installation for `@astrojs/rss` and `@astrojs/sitemap` using default npm registry and alternate mirror, both blocked by DNS resolution failures.
- Status: open
- Probability: high
- Impact: high
- Area: operations
- Description: The environment cannot resolve package registries (`registry.npmjs.org`, `registry.npmmirror.com`), so required Astro RSS/sitemap packages cannot be installed and task scope cannot be implemented safely.
- Mitigation: Restore outbound DNS/network access or provide an offline npm cache containing `@astrojs/rss` and `@astrojs/sitemap`, then rerun node `n11_seo_rss_sitemap_metadata`.
- Owner: ATP orchestrator
- Evidence: `npm install @astrojs/rss @astrojs/sitemap --no-audit --no-fund --fetch-timeout=5000 --fetch-retries=0` and `npm install @astrojs/rss @astrojs/sitemap --registry=https://registry.npmmirror.com --no-audit --no-fund --fetch-timeout=5000 --fetch-retries=0` failed with `getaddrinfo ENOTFOUND`.

### [RISK-005] MDX Dependency Blocker Closed for Node Scope
- NodeID: n10_mdx_authoring_workflow
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Closed prior MDX blocker for this node after successful integration/configuration and verification runs.
- Status: closed
- Probability: low
- Impact: low
- Area: operations
- Description: Earlier registry DNS issues blocked `@astrojs/mdx` setup, but the dependency is now present and the MDX workflow is fully validated in build output.
- Mitigation: Keep node-level verification commands (`npm run astro check`, `npm run typecheck`, `npm run build`) and artifact assertions to detect regressions quickly.
- Owner: codex_agent_1
- Evidence: successful command runs plus rendered component markers in `dist/blog/mdx-authoring-with-shared-prose-components/index.html`.

### [RISK-006] RSS/Sitemap Dependency Blocker Closed for Node Scope
- NodeID: n11_seo_rss_sitemap_metadata
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Closed prior registry blocker after confirming `@astrojs/rss` and `@astrojs/sitemap` are present and node verification commands pass.
- Status: closed
- Probability: low
- Impact: low
- Area: operations
- Description: Earlier DNS/package access failures prevented SEO feed/sitemap integration; this node confirms dependencies are installed and outputs are generated.
- Mitigation: Keep node-level verification commands (`npm run check`, `npm run typecheck`, `npm run build`) and output assertions for `rss.xml` and `sitemap-index.xml`.
- Owner: codex_agent_1
- Evidence: successful checks/build and generated files in `dist/rss.xml`, `dist/sitemap-0.xml`, and `dist/sitemap-index.xml`.

### [RISK-007] Sandbox Limits Prevent Full Runtime A11y/Perf Audits
- NodeID: n12_performance_and_accessibility_pass
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Recorded environment limitation that blocked preview server bind and Lighthouse CLI installation during performance/accessibility verification.
- Status: monitoring
- Probability: high
- Impact: medium
- Area: quality
- Description: Required runtime QA checks (`npm run preview`, route-level Lighthouse) cannot run in this worker sandbox because localhost bind returns `EPERM` and `npx lighthouse` cannot resolve `registry.npmjs.org`.
- Mitigation: Execute preview + Lighthouse checks in an environment with localhost socket permission and npm registry DNS access; keep build/check/typecheck and dist-assertion fallback in this workspace.
- Owner: ATP orchestrator
- Evidence: `npm run preview -- --host 127.0.0.1 --port 4322` -> `listen EPERM`; `npx --yes lighthouse --version` -> `getaddrinfo ENOTFOUND registry.npmjs.org`.

### [RISK-008] Quality Gate Coverage Drift as New Routes/Features Land
- NodeID: n13a_quality_gate_commands
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Added monitoring risk for stale targeted assertions in the scripted quality gate.
- Status: monitoring
- Probability: medium
- Impact: medium
- Area: quality
- Description: `scripts/verify-quality-gate.mjs` checks a focused set of artifacts and markers; future route/layout changes may require updating assertions to avoid false confidence.
- Mitigation: Update quality-gate assertions whenever core output contracts or critical route paths change; keep `quality:gate` execution mandatory in CI.
- Owner: ATP orchestrator
- Evidence: `scripts/verify-quality-gate.mjs`, `docs/qa/quality-gate.md`.

### [RISK-009] Manual Release Checklist Coverage Can Go Stale
- NodeID: n13b_release_regression_checklist
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Added monitoring risk that route-level manual checklist coverage may drift as routes and critical flows evolve.
- Status: monitoring
- Probability: medium
- Impact: medium
- Area: quality
- Description: The release checklist currently targets known high-risk routes and behaviors; new core routes or UX-critical flows can be missed if the checklist is not updated.
- Mitigation: Update `docs/qa/release-checklist.md` whenever core route topology or quality-critical behavior changes, and validate updates during node-level QA documentation work.
- Owner: ATP orchestrator
- Evidence: `docs/qa/release-checklist.md`.

### [RISK-010] Content Media Path Drift Can Reintroduce Broken Runtime Assets
- NodeID: n13c_qa_run_and_blocker_fixes
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Captured and mitigated a release-blocking defect where content media paths referenced non-existent files.
- Status: mitigated
- Probability: medium
- Impact: high
- Area: quality
- Description: Published routes can regress to broken images when content frontmatter/MDX paths change without corresponding `public/images` assets.
- Mitigation: Standardize on committed `public/images/**` assets for all published media paths and verify via quality gate + dist integrity sweep.
- Owner: codex_agent_1
- Evidence: `docs/qa/release-checklist-execution-2026-03-01.md`, `npm run quality:gate`, internal reference sweep output.

### [RISK-011] Runtime QA Coverage Gap in Restricted Execution Environments
- NodeID: n14_deploy_and_editorial_docs
- Date: 2026-03-01
- Author: codex_agent_1
- Change: Carried forward runtime QA limitation in final handoff docs and backlog.
- Status: monitoring
- Probability: high
- Impact: medium
- Area: quality
- Description: Environments that cannot bind localhost preview ports leave part of release QA (live keyboard/back-forward/performance checks) incomplete even when static build checks pass.
- Mitigation: Run release checklist runtime sections in unrestricted staging/local environments and attach evidence to release records.
- Owner: ATP orchestrator
- Evidence: `docs/handoff.md`, `docs/qa/release-checklist.md`, `docs/qa/release-checklist-execution-2026-03-01.md`.
