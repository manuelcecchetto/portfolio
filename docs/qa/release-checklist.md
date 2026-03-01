# Release Regression Checklist

- NodeID: `n13b_release_regression_checklist`
- Date: `2026-03-01`
- Author: `codex_agent_1`

## Latest Execution Snapshot

- Last execution report: `docs/qa/release-checklist-execution-2026-03-01.md`
- QA owner: `codex_agent_1`
- Snapshot date: `2026-03-01`
- Outcome: `PASS` for all verifiable static/build checks
- Known environment limitation: runtime preview/browser validation blocked in this sandbox (`listen EPERM` when running `npm run preview`)
- Required follow-up in unrestricted environment:
  - keyboard back/forward routing behavior validation
  - runtime performance sanity checks on representative desktop/mobile devices

## Release Metadata

- Release version/tag:
- Commit SHA (if available):
- Environment (staging/production-like):
- Tester:
- Test date/time:

## Result Legend

- `PASS`: check meets expected behavior with no blocking defect.
- `FAIL`: expected behavior is not met.
- `BLOCKED`: check cannot be completed because of environment/tooling constraints.

For every route section below, complete all fields:
- Result: `[ ] PASS  [ ] FAIL  [ ] BLOCKED`
- Evidence (screenshot/video/log path):
- Notes (defect IDs, observations, follow-up):

## Preflight Gates

- [ ] `npm run quality:gate` completed successfully.
- [ ] Build output generated (`dist/` updated for current run).
- [ ] Test environment reflects release configuration (no debug flags).
- [ ] Keyboard-only navigation test setup is ready.
- [ ] Reduced-motion mode test setup is ready.

## Route Coverage Checklist

### R01 `/` Home

- Result: `[ ] PASS  [ ] FAIL  [ ] BLOCKED`
- Evidence:
- Notes:
- Checks:
  - [ ] Hero, story, and highlights sections render without missing content.
  - [ ] Header nav + footer links are present and usable.
  - [ ] No visible layout jump when hero and card media load.
  - [ ] Primary CTA is reachable and clearly focus-visible via keyboard.

### R02 `/about/`

- Result: `[ ] PASS  [ ] FAIL  [ ] BLOCKED`
- Evidence:
- Notes:
- Checks:
  - [ ] About narrative and focus areas render completely.
  - [ ] Typography remains readable on mobile and desktop widths.
  - [ ] In-page and global links are keyboard reachable with visible focus state.

### R03 `/projects/` Projects Index

- Result: `[ ] PASS  [ ] FAIL  [ ] BLOCKED`
- Evidence:
- Notes:
- Checks:
  - [ ] Project cards render with title/summary/tags and no broken media.
  - [ ] Card media loads lazily and preserves card aspect ratio.
  - [ ] Card click-through navigates to the correct project detail route.

### R04 `/projects/atelier-scheduler/` Project Detail (Representative)

- Result: `[ ] PASS  [ ] FAIL  [ ] BLOCKED`
- Evidence:
- Notes:
- Checks:
  - [ ] Hero image loads correctly with no obvious CLS.
  - [ ] Project metadata panel (role/stack/links) is complete and accurate.
  - [ ] Back-to-index and global nav links remain functional.

### R05 `/blog/` Blog Index

- Result: `[ ] PASS  [ ] FAIL  [ ] BLOCKED`
- Evidence:
- Notes:
- Checks:
  - [ ] Blog cards render in newest-first order.
  - [ ] Pagination controls (if present) navigate correctly.
  - [ ] Draft-only posts are not shown in production-like mode.

### R06 `/blog/astro-content-layer-in-practice/` Markdown Post

- Result: `[ ] PASS  [ ] FAIL  [ ] BLOCKED`
- Evidence:
- Notes:
- Checks:
  - [ ] Post title, metadata, and body content render correctly.
  - [ ] Inline links and headings are keyboard navigable and readable.
  - [ ] Any cover/inline media loads with expected sizing behavior.

### R07 `/blog/mdx-authoring-with-shared-prose-components/` MDX Post

- Result: `[ ] PASS  [ ] FAIL  [ ] BLOCKED`
- Evidence:
- Notes:
- Checks:
  - [ ] MDX-specific components render (`Callout`, `ImageFigure`, `CodeNote`).
  - [ ] MDX code/note blocks are readable and not visually broken.
  - [ ] Figure captions/images render without overflow or clipping.

### R08 `/blog/tags/astro/` Tag Archive (Representative)

- Result: `[ ] PASS  [ ] FAIL  [ ] BLOCKED`
- Evidence:
- Notes:
- Checks:
  - [ ] Tag heading and filtered post list match expected tag content.
  - [ ] Card links open correct post detail routes.
  - [ ] Empty/edge-case rendering is graceful (no crashes, no broken blocks).

### R09 `/contact/`

- Result: `[ ] PASS  [ ] FAIL  [ ] BLOCKED`
- Evidence:
- Notes:
- Checks:
  - [ ] Primary contact CTA and secondary social/contact links are functional.
  - [ ] Keyboard focus order is logical and visible.
  - [ ] Copy hierarchy is clear and no action element is hidden/truncated.

## Cross-Route High-Risk Checks

### C01 Navigation and Routing

- Result: `[ ] PASS  [ ] FAIL  [ ] BLOCKED`
- Evidence:
- Notes:
- Checks:
  - [ ] Primary nav links (`/`, `/about/`, `/projects/`, `/blog/`, `/contact/`) work.
  - [ ] Active nav state matches current route.
  - [ ] Browser back/forward navigation behaves correctly across core flows.

### C02 Accessibility Basics

- Result: `[ ] PASS  [ ] FAIL  [ ] BLOCKED`
- Evidence:
- Notes:
- Checks:
  - [ ] All interactive elements are keyboard reachable.
  - [ ] `:focus-visible` states are consistently visible on textured backgrounds.
  - [ ] Color contrast for body text, muted text, and links is acceptable.
  - [ ] Reduced-motion mode removes non-essential transforms/animations.

### C03 Media Loading and Rendering

- Result: `[ ] PASS  [ ] FAIL  [ ] BLOCKED`
- Evidence:
- Notes:
- Checks:
  - [ ] Detail hero images load eagerly and appear promptly.
  - [ ] Card and prose media load lazily without content overlap or jumping.
  - [ ] No broken image placeholders across tested routes.

### C04 Performance Sanity

- Result: `[ ] PASS  [ ] FAIL  [ ] BLOCKED`
- Evidence:
- Notes:
- Checks:
  - [ ] Pages become usable quickly on first load (no long blank screen).
  - [ ] Scrolling is smooth on representative desktop and mobile viewports.
  - [ ] No severe layout instability during initial render.

## Release Sign-Off

- Overall release regression status: `[ ] PASS  [ ] FAIL  [ ] BLOCKED`
- Blocking issues:
- Non-blocking follow-ups:
- Approved by:
- Approval date:
