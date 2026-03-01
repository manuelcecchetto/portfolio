# ATP Content Localization Plan

- NodeID: T03_define_multilingual_content_model
- Date: 2026-03-01
- Author: codex_agent_1
- Status: proposed
- Scope: Implementation-ready data/query/migration contract for localized project and blog content.

## Goals

- Make project/blog body content locale-specific instead of only translating UI labels.
- Keep stable URL identity per content piece via same-slug translation grouping.
- Define deterministic fallback rules to `en` for missing localized entries.
- Define query behavior for projects index, project detail, blog index, blog detail, tags, and pagination.
- Provide a migration plan from the current single-source files to locale-specific files.

## Frontmatter Contract

Applies to both `projects` and `blog` collections in `src/data/**`.

Required additions:

- `locale`: one of `en | it | de | fr | zh | hi` (must match `SUPPORTED_LOCALES`).
- `translationGroup`: stable ID shared by all localized variants of the same content item.
  - Format: `<collection>:<slug>` (for example `projects:atp-protocol`, `blog:astro-content-layer-in-practice`).

Existing fields that remain:

- `title`, `slug`, `summary`, `publishedAt`, `updatedAt?`, `tags[]`, `coverImage?`, `draft`.
- Collection-specific fields: `featured`, `repositoryUrl`, `demoUrl` (projects) and `readingTimeMinutes` (blog).

Field rules:

- `slug` must be identical across locales within the same `translationGroup` (same-slug translation strategy).
- `translationGroup` must be unique per logical content item and shared across all its locale variants.
- `publishedAt` should remain aligned across locales for one group unless a locale-specific launch is intentional.
- `draft` may differ by locale (for staged translation rollout), but fallback to `en` must still respect draft filtering for production.

## File and Grouping Strategy

Use locale-specific filenames grouped by shared slug:

- Projects: `src/data/projects/<slug>/<locale>.md|mdx`
- Blog: `src/data/blog/<slug>/<locale>.md|mdx`

Examples:

- `src/data/projects/atp-protocol/en.md`
- `src/data/projects/atp-protocol/it.md`
- `src/data/blog/astro-content-layer-in-practice/en.md`
- `src/data/blog/astro-content-layer-in-practice/fr.md`

This makes translation group membership obvious in git and preserves same-slug identity.

## Fallback Rules

Fallback target locale is always `en`.

Rule set:

1. Try exact locale match first (`requestedLocale`).
2. If missing, fallback to `en`.
3. If `en` is missing, treat entry as unavailable and do not render route.
4. In production-mode queries, apply draft filter after locale selection:
   - do not show draft entries in requested locale;
   - do not fallback to an `en` draft in production.
5. In non-production mode, drafts are visible per existing behavior.

## Query Behavior

### Projects index

- Input: `locale`, production mode flag.
- Query all project entries for `locale`.
- For each `translationGroup` missing in `locale`, include `en` fallback entry.
- De-duplicate by `translationGroup` (never show both locale + fallback for same group).
- Sort by `updatedAt ?? publishedAt` descending.
- Preserve existing featured count semantics on selected (post-fallback) entries.

### Project detail

- Route key remains `slug` (same slug in every locale).
- Resolution order:
  - find entry where `slug == routeSlug` and `locale == requestedLocale`;
  - fallback to `slug == routeSlug` and `locale == en`.
- If neither exists, return 404.
- Related projects should be computed from the selected locale/fallback-resolved set for consistency.

### Blog index

- Same selection and fallback algorithm as projects index, applied to blog entries.
- Keep existing draft visibility behavior by environment.
- Keep existing sort by `updatedAt ?? publishedAt` descending.

### Blog detail

- Same detail resolution as project detail by `slug` + locale fallback.
- Tag links generated from selected entry tags; links stay locale-prefixed for non-default locales.
- Related posts should be computed from the locale/fallback-resolved blog set, not raw mixed-locale entries.

### Tags

- Build tag aggregation from locale/fallback-resolved blog entries only.
- Counts are per `translationGroup` after fallback de-duplication.
- Tag detail page lists locale entries first, then `en` fallbacks for missing groups.
- Route pattern remains `/blog/tags/[tag]/` and `/:locale/blog/tags/[tag]/`.

### Pagination

- Paginate after locale resolution + fallback + de-duplication.
- `BLOG_PAGE_SIZE` remains unchanged.
- Page counts and previous/next links reflect the resolved list for that locale.
- `/blog/page/[page]/` and `/:locale/blog/page/[page]/` must never include duplicate groups.

## Schema and Helper Updates (Implementation Notes)

- Extend base content schema in `src/content/schemas.ts`:
  - add `locale` enum and `translationGroup` string with strict pattern.
- Keep `slug` regex unchanged.
- Add helper interfaces keyed by `translationGroup` in `src/lib/content.ts`.
- Add locale-aware query helpers:
  - `resolveLocalizedEntries(entries, locale, { fallbackLocale: "en", includeDrafts })`
  - `getLocalizedProjects(locale, options?)`
  - `getLocalizedBlogPosts(locale, options?)`
  - `getLocalizedEntryBySlug(collection, slug, locale, options?)`
- Keep existing non-localized helpers temporarily for migration compatibility, then deprecate.

## Migration Plan

### Phase 1: Introduce schema and helpers (non-breaking)

- Add `locale` + `translationGroup` fields to schema and content validation.
- Add localized query helpers while keeping current helpers used by pages.
- Add guard checks for duplicate `(translationGroup, locale)` and conflicting same-slug groups.

### Phase 2: Restructure existing content files

- Move current single-source files to grouped locale structure as `en` defaults.
- For each current entry:
  - keep `slug` unchanged;
  - set `locale: en`;
  - set `translationGroup: <collection>:<slug>`.
- Update any content loader glob paths if needed (existing `**/*.{md,mdx}` already supports nested folders).

### Phase 3: Route query swap

- Update projects/blog index/detail/tags/pagination routes to use localized helpers.
- Ensure `/[locale]/**` routes pass locale explicitly.
- Ensure default routes resolve to `en`.

### Phase 4: Incremental translation rollout

- Add locale files per group (for example `it.md`, `de.md`) without changing slugs.
- Missing translations naturally fallback to `en`.
- Validate route parity by locale and compare item counts before/after fallback.

### Phase 5: Cleanup

- Remove deprecated non-localized query paths once all routes use localized helpers.
- Add docs note in content workflow for translator authoring rules and fallback behavior.

## Validation Checklist

- `locale` and `translationGroup` are present in every project/blog entry.
- No duplicate `(translationGroup, locale)` pairs.
- `slug` consistency across locale variants in same translation group.
- Locale routes build successfully for all configured locales.
- Projects index and blog index item counts are stable per locale with fallback.
- Project detail and blog detail resolve locale-first then `en`.
- Tags and pagination reflect locale/fallback-resolved data and show no duplicates.

## Open Decisions (to finalize during implementation)

- Whether localized `tags` should be canonicalized cross-locale (recommended: keep canonical slugs in frontmatter; localize display labels in UI copy).
- Whether `publishedAt` should be globally shared per group or allowed to diverge by locale (recommended: shared unless editorially required).
- Whether fallback content should display a visual language indicator (recommended: yes, optional small badge when locale != requested).
