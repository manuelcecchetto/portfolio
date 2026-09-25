---
title: "wasmspace: the browser is the computer"
slug: "wasmspace"
locale: "en"
translationGroup: "projects:wasmspace"
summary: "A zero-backend AI code interpreter. A frontier model plans, CPython runs sandboxed in a browser worker, and every file lives in OPFS on your own machine."
publishedAt: 2026-07-27
updatedAt: 2026-08-03
tags:
  - AI
  - Agentic Systems
  - WebAssembly
  - Pyodide
  - OPFS
  - Browser Security
  - TypeScript
coverImage: "/images/projects/wasmspace-cover.webp"
draft: false
featured: true
---

Every AI code interpreter I had used worked the same way: somebody rents a container, mounts a `/mnt/data`, and your files travel to it. I wanted to know whether the browser tab could be the whole machine instead.

wasmspace is that experiment: a Codex-style chat workspace where the agent writes and runs real Python, builds spreadsheets, documents and charts, and never touches a server of mine.

> The model is the planner. Browser Python is the worker. OPFS is the desk. The user remains the authority.

## Four parts, and nothing else

- **A static web app.** One SPA origin. No application server, no account database.
- **A remote frontier model.** Direct OpenRouter BYOK over HTTPS/SSE against the Responses endpoint. The key never enters transcripts, OPFS, Python, URLs or model context.
- **CPython 3.14 compiled to WebAssembly.** A pinned Pyodide runtime running in an opaque-origin sandboxed worker, not with stock same-origin authority.
- **An OPFS workspace.** Files, chats and generated artifacts stay in the browser's private file system.

No per-user container, no server-side `/mnt`, no WebGPU model. A zero-backend claim is only worth something if it is literal.

![The wasmspace chat inspecting a chart it just generated with the view_image tool](/images/blog/wasmspace-view-image.webp)

## A real harness, locally

The agent loop speaks Responses function calls and dispatches to a local harness:

- `read` and `search` over the OPFS workspace, bounded and honest about truncation;
- `apply_patch` with a complete V4A envelope, validated and applied as one journaled OPFS transaction;
- `python`, which receives a bounded workspace snapshot and commits changes back only when the run succeeds;
- `artifact`, which validates the file type, pins a checksum-bound immutable copy and records provenance;
- `view_image`, so the model can look at the chart it just drew before it presents it;
- `disclose`, which pauses for one visible approval before new local content goes to the provider;
- skills, mediated network requests and hosted web search as explicit, per-chat choices.

Five pinned, lazily loaded package profiles cover data and charts, XLSX, DOCX, PDF and PPTX. The tests reopen every generated file semantically instead of trusting that a file exists.

## Permissions you can read

Three profiles replace the worker instead of toggling flags inside it:

- **Guarded** is the default: Python gets no network at all, and larger content reaches the model only through an explicit disclosure.
- **Brokered network** allows one-shot, host-mediated requests from a disposable frame.
- **YOLO** gives session-only direct fetch in a separate CSP-locked worker. Even then there is no access to credentials, the DOM or trusted storage.

## Startup is a checklist, not a splash screen

The composer stays disabled until the app holds the workspace writer lock, validates or recovers OPFS metadata, hash-verifies the 12,255,372-byte runtime, starts Python inside the sandbox, passes storage, DOM, bridge and network containment probes, and commits a Python canary back to OPFS.

A second tab fails closed instead of getting a fallback workspace. A hard timeout or a user stop destroys the worker and waits for a verified restart. Ask for 5 GiB and the allocation fails at the 4 GiB Wasm32 ceiling, without a partial commit.

## Status

In progress, deployed privately for my own use. Chromium and Firefox pass the containment and commit probes; real Safari and live-key acceptance are still open work. The repository is private for now.

I wrote up the reasoning, and the security surprises, in [The browser is the computer](/blog/the-browser-is-the-computer/).
