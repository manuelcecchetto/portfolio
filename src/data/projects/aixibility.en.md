---
title: "Aixibility: semantic handles for coding agents"
slug: "aixibility"
locale: "en"
translationGroup: "projects:aixibility"
summary: "A tiny source-annotation convention and an installable skill that help coding agents find the right code by intent, using plain rg with no index, parser or runtime."
publishedAt: 2026-07-18
tags:
  - AI
  - Coding Agents
  - Developer Experience
  - Conventions
  - Skills
coverImage: "/images/projects/aixibility-cover.webp"
draft: false
featured: false
repositoryUrl: "https://github.com/manuelcecchetto/aixibility"
---

Coding agents are good at searching text. Codebases are not always good at saying where behavior actually lives.

Ask an agent to "change what happens when a finding is resolved" and it can wander through similarly named handlers, wrappers, legacy functions and persistence helpers before it finds the canonical one. Aixibility adds a sparse semantic layer exactly where that ambiguity hurts.

## The convention

A handful of `@aix:` tags in ordinary doc comments. Only `id` and `intent` are required:

```ts
/**
 * @aix:id review.finding.resolve
 * @aix:intent Resolve a review finding and persist its audit event
 * @aix:kind workflow
 * @aix:effects database-write audit-log
 * @aix:requires resolvable-finding
 * @aix:canonical
 */
export async function resolveFinding(...) {}
```

Then the agent uses tools the repository already has:

```bash
rg -n -i '@aix:.*(review|finding|resolve)'
rg -n '@aix:effects .*database-write'
```

No runtime, no parser, no generated sidecar, no search service.

## The loop

The skill teaches one loop: **search semantics → inspect candidates → verify code → act at the canonical boundary → maintain semantics.**

The implementation stays the source of truth. An annotation is a signpost, not a fact database, so every hit gets verified against callers, types, tests and runtime wiring before anything is edited.

## Sparse on purpose

It is for commands, workflows, mutations, integrations, security decisions and anything easily confused with a legacy lookalike. It is not for every helper. The test I use:

> Would an agent plausibly need to discover this capability by intent rather than by its symbol name?

If not, the annotation is just noise to maintain. More in [Signposts, not indexes](/blog/signposts-not-indexes/).
