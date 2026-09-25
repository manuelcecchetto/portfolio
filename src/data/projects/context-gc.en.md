---
title: "Context GC: compaction the agent asks for"
slug: "context-gc"
locale: "en"
translationGroup: "projects:context-gc"
summary: "A compact_context tool for Pi and Codex. The agent declares a verified phase complete, checkpoints what matters, and the harness compacts at a real boundary instead of a token threshold."
publishedAt: 2026-09-15
updatedAt: 2026-09-19
tags:
  - AI
  - Agentic Systems
  - Context Engineering
  - Pi
  - Codex
  - TypeScript
  - Python
coverImage: "/images/projects/context-gc-cover.webp"
draft: false
featured: true
repositoryUrl: "https://github.com/manuelcecchetto/pi-context-gc"
---

Long agent sessions die of old context. Threshold compaction helps, but it fires on token pressure, usually in the middle of a thought, and whatever writes the summary has no idea which facts the next phase needs.

Context GC turns that around. The agent gets one tool, `compact_context`, and calls it when a coherent phase is actually done.

## How it works

The call carries a checkpoint written by the model:

- `completed_phase`: what finished, and the outcome;
- `next_focus`: the exact next working set;
- `keep`: decisions, identifiers and constraints that must survive;
- `verification`: the evidence that the phase is really done;
- optionally `open_loops` and `ruled_out`, so nobody repeats a dead end.

The harness waits for the whole tool batch to finish, runs compaction through the normal lifecycle, appends the checkpoint and continues automatically.

The split of responsibilities is the whole design: **the scheduler owns when, the backend owns how, and Pi owns persistence, thresholds and overflow safety.** On OpenAI models that means native `/responses/compact` state first, then Codex remote compaction, then Pi's own text compaction.

It is not a token threshold, not a silent deleter and not another summarizer.

## Two harnesses

- [pi-context-gc](https://github.com/manuelcecchetto/pi-context-gc) is the original Pi extension.
- [codex-context-gc](https://github.com/manuelcecchetto/codex-context-gc) ports the idea to the Codex desktop app. My first version patched the Rust binary, which broke code signing for the in-app browser bridge. The current one is a small Python adapter around the original, OpenAI-signed runtime: no app-bundle changes, no re-signing. It passed a live desktop test on 19 September 2026, and its 29-test suite includes runs with 27 compactions. Unofficial, and not an OpenAI product.

## What I observed

Over one long sequential task (5,977 tool calls, about $222 at estimated API prices), the model with the tool used it 50 times and kept its context mostly between 50k and 100k tokens. Two later models on the same task never called it and sawtoothed up to 300–400k tokens before automatic compaction.

That is an observation, not a benchmark: the models worked on different phases with different compaction backends. It convinced me the tool is worth having, and that models differ a lot in whether they reach for it.

Read the full story in [Let the agent decide when to forget](/blog/let-the-agent-decide-when-to-forget/).
