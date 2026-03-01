---
title: "ATP: Agent Task Protocol"
slug: "atp-protocol"
locale: "en"
translationGroup: "projects:atp-protocol"
summary: "A schema-first protocol and tooling stack that keeps multi-agent planning, execution, and handoffs synchronized through one typed DAG lifecycle."
publishedAt: 2025-11-12
updatedAt: 2026-03-01
tags:
  - AI
  - LLM
  - Agentic Systems
  - MCP
  - TypeScript
  - Python
coverImage: "/images/projects/atp-protocol-cover.jpg"
draft: false
featured: true
repositoryUrl: "https://github.com/manuelcecchetto/atp"
---

I built ATP to solve a coordination problem I kept seeing in agentic delivery: planning and execution were drifting apart, and handoffs were getting lost between worker turns.

## Context and ownership

ATP is a user-created stack developed in my local `atp` workspace. I own the protocol, execution workflow, MCP integration, and developer tooling around it.

The core design choice is strict: planning and execution must share one typed contract.

## What I shipped

I designed ATP as a schema-first `.atp.json` DAG where each node moves through an explicit lifecycle (`READY`, `CLAIMED`, `COMPLETED`, `FAILED`) and every completion carries a report plus artifacts.

The ecosystem is split into focused packages:

- `atp-protocol`: schema and prompt contracts
- `atp-mcp-server`: claim/complete/decompose lifecycle enforcement
- `atp-runner`: worker execution loop and runtime orchestration
- `atp-visualizer`: VS Code graph observability

## Key technical decisions

- Encode workflow invariants directly in schema and server validation.
- Treat decomposition as a first-class operation instead of ad-hoc plan edits.
- Keep mutation authoritative through MCP so concurrent workers do not corrupt dependency state.
- Expose graph state visually to reduce debugging latency during multi-agent runs.

## Outcome

ATP gives me deterministic coordination, auditable handoffs, and faster recovery from failed or stale work claims. It has become the backbone for my own multi-agent execution flow and a reusable foundation for teams that want to move from single-worker automation to dependency-safe collaboration.
