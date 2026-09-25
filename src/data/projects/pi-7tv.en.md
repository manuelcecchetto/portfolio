---
title: "pi-7tv: reactions for a terminal agent"
slug: "pi-7tv"
locale: "en"
translationGroup: "projects:pi-7tv"
summary: "A Pi package that renders 7TV emotes inline in the terminal, with autocomplete, a reaction tool for the agent and an etiquette skill. Display-only: model context never changes."
publishedAt: 2026-07-25
tags:
  - Pi
  - TypeScript
  - Terminal UI
  - Extensions
  - Fun
coverImage: "/images/projects/pi-7tv-cover.webp"
draft: false
featured: false
repositoryUrl: "https://github.com/manuelcecchetto/pi-7tv"
---

I spend whole days in a terminal with a coding agent. At some point a green build deserved more than a checkmark.

pi-7tv is a [Pi](https://pi.dev) package that brings 7TV reactions into the terminal UI:

- inline `:EmoteName:` rendering in user and assistant messages;
- autocomplete from 7TV after typing `:`;
- a `seven_tv_emote` tool, so the agent can react when something actually deserves it;
- `/7tv <name>` for direct previews;
- an etiquette skill that says when an emote fits and when it doesn't.

## Display-only, on purpose

Emote markers only change what you see. Stored messages and model context keep the original text, so the fun never leaks into the agent's reasoning.

Inline rendering needs a small hook that Pi core didn't publish yet, so the repo ships a pinned source patch that adds a display-only renderer API. Without the patch, the extension notices, keeps the tool and autocomplete working, and tells the agent to use the tool instead of markers.
