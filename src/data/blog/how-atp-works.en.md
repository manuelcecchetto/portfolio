---
title: How ATP Works End-to-End
slug: how-atp-works
locale: en
translationGroup: blog:how-atp-works
summary: A technical walkthrough of ATP as a schema-first protocol for planning, decomposing, and executing multi-agent work through an explicit MCP task lifecycle.
publishedAt: 2026-02-14
updatedAt: 2026-03-01
tags:
  - ATP
  - Agentic Systems
  - MCP
  - Workflow
  - Orchestration
coverImage: /images/blog/astro-content-layer-in-practice.svg
draft: false
readingTimeMinutes: 14
---

Most teams experimenting with agentic delivery hit the same wall quickly: planning looks good in one place, execution happens somewhere else, and handoff context leaks between steps.

ATP (Agent Task Protocol) solves that by turning project execution into a typed, dependency-aware graph where every node has an instruction, lifecycle state, and completion report. The key design choice is simple: planning and execution share one contract.

That contract is `atp_schema.json`.

## Why ATP exists

Classic task trackers are flexible, but they are not strict enough for autonomous workers. They often allow ambiguous status transitions, weak dependency semantics, and inconsistent handoff data.

ATP treats work as a DAG, not a loose checklist:

- each node has explicit dependencies
- only dependency-ready work becomes claimable
- each completion writes structured evidence (`report` + `artifacts`)
- decomposition is a first-class operation, not an ad-hoc rewrite

The result is deterministic coordination across many workers without relying on hidden shared context.

## Package responsibilities in the ATP ecosystem

The ATP monorepo is intentionally split so each package owns one responsibility.

### `atp-protocol`

`atp-protocol` defines ATP v1.3 as the compatibility layer for all participants.

It includes:

- the canonical schema (`atp_schema.json`)
- architect/refiner/decomposer/executor prompts
- lifecycle examples showing graph evolution

This package is the source of truth for what a valid plan is.

### `atp-mcp-server`

`atp-mcp-server` is the authoritative mutation layer.

It validates plans, enforces lifecycle transitions, and exposes the MCP task interface used by workers. In practice, it is the system that guarantees dependency integrity and safe concurrent mutation.

### `atp-runner`

`atp-runner` orchestrates worker turns.

It injects runtime context (`project_root`, `plan_path`, `agent_id`, git metadata), loops through claim/execute/complete behavior, and can enforce operational policies like commit-per-node.

In many references and runtime constraints you may also see `atp_runner` naming to refer to runner behavior or entrypoints.

### `atp-visualizer`

`atp-visualizer` is the observability layer in VS Code.

It renders node state and edges live from `.atp.json` files so humans can inspect bottlenecks, failures, and scope structure without manually parsing JSON.

## Schema-first model and lifecycle

ATP is schema-first by default. A plan is valid only if it matches the contract and preserves graph invariants.

Core lifecycle states:

- `LOCKED`
- `READY`
- `CLAIMED`
- `COMPLETED`
- `FAILED`

Important behavior:

- `READY` is derived from dependencies, not manually toggled
- `CLAIMED` is lease-based and recoverable if stale
- `COMPLETED` stores durable handoff data
- `FAILED` is explicit and unblock-focused, not silent

This is why ATP workflows remain auditable even across long-running execution.

## Plan generation flow: Architect -> Refiner -> Decomposer

ATP planning usually follows three passes.

1. Architect pass

The Architect transforms business goals into an initial DAG with broad nodes and dependency structure.

2. Refiner pass

The Refiner improves node clarity, acceptance criteria, and dependency precision so workers can execute without interpretation gaps.

3. Decomposer pass

When a node is too broad, it is split into subtasks with explicit internal dependencies. ATP converts the parent into a `SCOPE` container and rewires the graph safely.

This means graph quality is a continuous activity, not a one-time planning event.

## MCP task lifecycle in execution

Workers interact with ATP through a small set of lifecycle calls.

### `atp_claim_task`

Claims the next eligible node for an agent when the project is `ACTIVE`.

Key effects:

- refreshes readiness
- handles stale leases
- returns an assignment block or `NO_TASKS_AVAILABLE`

### `atp_complete_task`

Finalizes node execution as success or failure and persists handoff data.

Typical payload includes:

- `node_id`
- `status` (`DONE` or `FAILED`)
- `report`
- optional `artifacts`

On completion, dependents can move from `LOCKED` to `READY` automatically.

### `atp_decompose_task`

Splits a broad node into a subgraph while preserving DAG correctness.

The server:

- validates unique IDs and subtask DAG integrity
- converts parent to `SCOPE`
- rewires parent children to subgraph end nodes
- refreshes readiness statuses

This is a core safety feature for scaling work without losing plan continuity.

## Runner loop behavior in practice

A typical execution loop:

1. runner starts worker turn with runtime context
2. worker calls claim
3. worker executes local repo changes
4. worker runs lint/typecheck and any scoped verification
5. worker calls complete with report and artifacts
6. runner advances to next available task

Because every step is recorded in the plan graph, you get both execution control and historical traceability in one artifact.

## Operational caveats teams should expect

ATP is strict by design, which is useful but comes with expectations:

- graph quality matters: unclear nodes create execution friction
- decomposition discipline is essential for atomic delivery
- reports must be concrete to preserve downstream context
- memory governance (`docs/memory/*`) should be treated as mandatory in multi-worker flows

In short, ATP does not remove planning work. It makes planning quality visible and enforceable.

## End-to-end mental model

If you remember one thing, use this:

ATP is not a to-do list with AI workers attached. It is a protocol where planning, orchestration, and execution are synchronized through one typed DAG lifecycle.

`atp_schema.json` defines the contract.
`atp-mcp-server` enforces lifecycle integrity.
`atp-runner` executes the loop.
`atp-visualizer` makes state observable.

That combination is what lets teams scale from one worker to many without sacrificing determinism, auditability, or dependency correctness.
