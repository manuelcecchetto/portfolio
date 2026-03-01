# Performance & Accessibility Hardening Report

- NodeID: `n12_performance_and_accessibility_pass`
- Date: 2026-03-01
- Author: `codex_agent_1`

## Scope

Core-template hardening for:
- Home (`/`)
- Project detail (`/projects/[slug]`)
- Blog post (`/blog/[slug]`)

Focus areas:
- image loading strategy
- font loading strategy
- reduced-motion behavior
- focus/contrast improvements
- layout-shift reduction

## Implemented Changes

### 1) Image loading strategy + layout stability

- Added explicit image dimensions and responsive `sizes` hints:
  - blog cards (`src/components/blog/BlogCard.astro`)
  - project cards (`src/components/projects/ProjectCard.astro`)
  - blog detail hero cover (`src/pages/blog/[slug].astro`)
  - project detail hero cover (`src/pages/projects/[slug].astro`)
  - prose figure images (`src/components/prose/ImageFigure.astro`)
- Added `decoding="async"` and `fetchpriority`:
  - detail hero covers: `fetchpriority="high"` + `loading="eager"`
  - card/prose images: `fetchpriority="low"` + `loading="lazy"`
- Added image preloads on detail routes via `slot="head"`:
  - `/blog/[slug]`
  - `/projects/[slug]`
- Replaced media card `min-height` with fixed `aspect-ratio: 16 / 10` to reduce CLS in card grids.

### 2) Font loading audit and optimization

- Consolidated Google Fonts URL into a single layout constant.
- Added:
  - `dns-prefetch` for `fonts.googleapis.com` and `fonts.gstatic.com`
  - `preconnect` hints (existing pattern retained)
  - `preload` for font stylesheet
- Files:
  - `src/layouts/BaseLayout.astro`

### 3) Reduced-motion hardening

- Preserved existing global reduced-motion override and extended it to explicitly disable hover transform effects:
  - lifted cards
  - CTA hover lift
  - card media hover zoom
- Disabled ambient decorative blobs in reduced-motion mode.
- Files:
  - `src/styles/global.css`

### 4) Contrast and focus-state improvements

- Darkened muted text token for better contrast.
- Added dedicated focus ring/glow tokens and upgraded global focus style:
  - thicker outline
  - higher-contrast ring
  - glow halo for visibility on textured backgrounds
- Slightly increased underline thickness for linked text.
- Improved footer link contrast.
- Added CTA-specific `:focus-visible` border reinforcement.
- Files:
  - `src/styles/tokens.css`
  - `src/styles/global.css`
  - `src/components/pages/home/HomeHero.astro`

## Verification Evidence

### Build / diagnostics

Commands run:

```bash
npm run build
npm run check
npm run typecheck
```

Result:
- `npm run build`: PASS
- `npm run check`: PASS (`0 errors, 0 warnings, 0 hints`)
- `npm run typecheck`: PASS (`0 errors, 0 warnings, 0 hints`)

### Preview command requirement

Command attempted:

```bash
npm run preview -- --host 127.0.0.1 --port 4322
```

Result:
- FAIL in sandbox due port bind restriction:
  - `listen EPERM: operation not permitted 127.0.0.1:4322`

### Lighthouse checks requirement

Attempted to provision CLI:

```bash
npx --yes lighthouse --version
```

Result:
- FAIL in sandbox due DNS/network restriction:
  - `getaddrinfo ENOTFOUND registry.npmjs.org`

Because preview server binding and Lighthouse provisioning were both blocked by environment restrictions, route-level Lighthouse scores could not be produced in this worker run.

### Static output confirmation checks

Validated generated output contains expected hardening markers:
- font hints and stylesheet preload in `dist/index.html`
- detail image preload links in:
  - `dist/projects/atelier-scheduler/index.html`
  - `dist/blog/astro-content-layer-in-practice/index.html`
- `fetchpriority="high"` on detail hero covers
- `fetchpriority="low"` + dimensioned lazy images for related cards
- focus and reduced-motion rules in compiled CSS under `dist/_astro/*.css`

## Manual keyboard/screen-reader smoke test status

Not executable in this sandbox session because preview server cannot bind to localhost.

Recommended manual follow-up in unrestricted environment:
1. Run `npm run build && npm run preview`.
2. Test keyboard traversal and focus visibility on `/`, `/projects/atelier-scheduler/`, `/blog/astro-content-layer-in-practice/`.
3. Verify skip-link behavior, nav menu operability, and CTA/link focus rings.
4. Run Lighthouse (desktop + mobile) for the same three routes and attach scores.
