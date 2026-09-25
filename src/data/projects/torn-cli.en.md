---
title: "torn-cli: a privacy-first Torn toolkit"
slug: "torn-cli"
locale: "en"
translationGroup: "projects:torn-cli"
summary: "A fast Rust CLI and TUI for the Torn API v2 and FFScouter, built so both humans and agents can script the game without ever treating API keys casually."
publishedAt: 2026-06-17
updatedAt: 2026-06-21
tags:
  - Rust
  - CLI
  - TUI
  - API
  - Privacy
  - Agents
coverImage: "/images/projects/torn-cli-cover.webp"
draft: false
featured: false
repositoryUrl: "https://github.com/manuelcecchetto/torn-cli"
---

A side project for a game I play, and a small study in making a CLI that agents can use safely.

`torn` gives scriptable access to the Torn API v2 and FFScouter. It ships with an endpoint index generated from Torn's OpenAPI spec, so every current GET path works through a friendly shortcut or a raw pass-through.

## What it does

- **Privacy-first auth.** Torn keys go in an `Authorization` header. FFScouter keys are redacted from logs, cache keys, URLs and response bodies.
- **The whole API.** A generated endpoint index, raw `api get`, and shortcuts for every bundled group.
- **Logs without spreadsheets.** Fetch, filter, group and run preset analyses over user logs.
- **Watch mode.** Poll status and profile endpoints with timestamped, colored output. Great for hospital timers.
- **A setup TUI.** A Ratatui config shell for entering keys without echoing them.

## Built for agents too

Outputs are JSON-first, the defaults are safe, and the repo carries its own agent skill with examples. An agent can drive the whole API from a shell without keys ever showing up in its output.
