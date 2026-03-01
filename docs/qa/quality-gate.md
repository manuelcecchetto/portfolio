# Quality Gate Commands

Node: `n13a_quality_gate_commands`  
Date: `2026-03-01`

## Single Gate Command

Run this command for local pre-merge validation and CI:

```bash
npm run quality:gate
```

## Command Sequence

`npm run quality:gate` runs the following in order:

1. `npm run check` (`astro check`) for type/content diagnostics.
2. `npm run typecheck` (kept explicit for CI readability).
3. `npm run build` to validate production build output.
4. `npm run quality:test` to assert required build artifacts and key markup regressions.

## Targeted Assertions

`npm run quality:test` validates:

- `dist/rss.xml` and `dist/sitemap-index.xml` exist.
- MDX prose component output exists in built blog detail HTML.
- `dist/index.html` includes canonical/feed/sitemap discovery tags.

No standalone unit-test framework is currently configured in this repository.
