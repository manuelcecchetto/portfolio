# Project Handoff

- NodeID: `n14_deploy_and_editorial_docs`
- Date: `2026-03-01`
- Author: `codex_agent_1`

## Scope Closure

This handoff closes documentation and editorial operations for the current project phase. Deployment execution is intentionally out of scope for this node.

Included:

- setup/run/build instructions
- editorial content authoring workflow
- QA outcome summary and known limitations
- next-step backlog recommendations

Excluded:

- production publish
- DNS/domain changes
- hosting configuration
- post-deploy smoke checks

## Clean Checkout Verification

Run from repository root:

```bash
npm install
npm run check
npm run typecheck
npm run build
```

Expected result: all commands exit successfully and `dist/` is generated.

## QA Outcome Summary

Source of truth:

- `docs/qa/release-checklist-execution-2026-03-01.md`

Current status:

- `PASS` on scripted quality gate (`npm run quality:gate`)
- `PASS` on route-level static artifact checks
- `PASS` on media-path integrity after blocker remediation (`public/images/**` alignment)
- `BLOCKED` for runtime-only checks that require a live preview browser session in this sandbox

## Known Limitations

1. Runtime preview checks are environment-constrained in this sandbox (`listen EPERM` when binding localhost).
2. Back/forward navigation behavior and runtime scroll/performance sanity still require execution on an unrestricted machine.
3. This workspace is non-git, so node-level commit creation is not available in this environment.

## Documentation Map

- Setup and command quickstart: `README.md`
- Editorial workflow and content schema guidance: `docs/content-workflow.md`
- Manual checklist template and latest execution: `docs/qa/release-checklist.md`, `docs/qa/release-checklist-execution-2026-03-01.md`
- Quality gate command details: `docs/qa/quality-gate.md`

## Recommended Backlog (Post-Handoff)

1. Add CI enforcement for `npm run quality:gate` and publish artifact logs for every release candidate.
2. Add an automated check that all content media paths resolve to files under `public/images/**` before build.
3. Execute a full runtime regression pass in staging (keyboard-only flows, back/forward behavior, and performance sanity on mobile + desktop).
4. Replace placeholder SVG media with final exported assets while preserving existing path contracts.
5. Add deployment runbook documentation once hosting/domain decisions are finalized.
