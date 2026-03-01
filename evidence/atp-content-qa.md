# ATP Multilingual Content QA

- NodeID: T09_validate_multilocale_content_readiness
- Date: 2026-03-01
- Author: codex_agent_1
- Status: approved

## Scope

Validate multilingual publication readiness for ATP project and ATP blog content across locales `en`, `it`, `de`, `fr`, `zh`, `hi`, including type/content checks, build generation, route existence, and locale-aware listing behavior.

## Commands and Results

1. `npm run check`
- Result: PASS (`astro check`, 0 errors / 0 warnings / 0 hints).

2. `npm run typecheck`
- Result: PASS (`astro check`, 0 errors / 0 warnings / 0 hints).

3. `npm run build`
- Result: PASS.
- Note: Initial build surfaced duplicate blog entry IDs for locale variants of `how-atp-works` due missing `generateId` in blog loader. Fixed by adding `generateId: entryPathId` to the `blog` collection in `src/content.config.ts`, then reran checks/build successfully with no duplicate-id warnings.

4. Required acceptance route assertion
- Command:
```sh
for locale in en it de fr zh hi; do
  if [ "$locale" = "en" ]; then
    project_path="dist/projects/atp-protocol/index.html"
    blog_path="dist/blog/how-atp-works/index.html"
  else
    project_path="dist/$locale/projects/atp-protocol/index.html"
    blog_path="dist/$locale/blog/how-atp-works/index.html"
  fi
  test -f "$project_path"
  test -f "$blog_path"
done
```
- Result: PASS.

5. Locale-aware listing dedup/mix validation
- Command:
```sh
for locale in en it de fr zh hi; do
  if [ "$locale" = "en" ]; then
    pindex="dist/projects/index.html"
    bindex="dist/blog/index.html"
    project_href='/projects/atp-protocol'
    blog_href='/blog/how-atp-works'
  else
    pindex="dist/$locale/projects/index.html"
    bindex="dist/$locale/blog/index.html"
    project_href="/$locale/projects/atp-protocol"
    blog_href="/$locale/blog/how-atp-works"
  fi

  proj_refs=$(rg -o --fixed-strings "href=\"$project_href\"" "$pindex" | wc -l | tr -d ' ')
  blog_refs=$(rg -o --fixed-strings "href=\"$blog_href\"" "$bindex" | wc -l | tr -d ' ')

  [ "$proj_refs" -eq 3 ]
  [ "$blog_refs" -eq 3 ]
done
```
- Result: PASS.
- Interpretation: each localized listing renders exactly one ATP project card and one ATP blog card (each card contributes 3 internal links: media/title/action), with locale-correct href paths.

## QA Notes

- A publication blocker was detected and fixed during verification:
  - `src/content.config.ts` blog collection lacked `generateId`, causing locale files with the same slug to overwrite one another at content-load time.
  - Fix ensures all locale variants remain addressable while preserving same-slug locale routing behavior.
- After fix, all required locale routes exist in build output and locale-aware listing behavior is consistent.
