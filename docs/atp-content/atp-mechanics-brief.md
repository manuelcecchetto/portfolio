# ATP Mechanics Brief

- NodeID: T02_synthesize_atp_mechanics_brief
- Date: 2026-03-01
- Author: codex_agent_1
- Purpose: Reusable technical backbone for both a short ATP project page and a longer ATP blog article.

## Essence

ATP (Agent Task Protocol) is a schema-first, DAG-based workflow for coordinating many AI workers against one shared plan. It keeps planning, execution, and handoff synchronized through one canonical contract (`atp_schema.json`) and one operational interface (MCP task lifecycle tools).

Core value proposition:
- Deterministic coordination: workers claim only `READY` nodes whose dependencies are complete.
- Explicit handoff memory: each completed node carries a report plus artifacts.
- Safe scaling: decomposition turns broad work into scoped subgraphs without breaking dependency integrity.
- Operational transparency: status and graph views show progress and bottlenecks in real time.

## Package Roles

ATP is separated into clear package responsibilities:

- `atp-protocol`
  - Defines ATP v1.3 schema and prompt templates.
  - Serves as the compatibility contract for planners, executors, and visual tools.

- `atp-mcp-server`
  - Owns plan validation and mutation through MCP tools.
  - Enforces lifecycle rules, dependency integrity, lease handling, and scope closure semantics.

- `atp-runner`
  - Orchestrates worker turns and injects runtime context.
  - Drives claim-execute-complete loops and optional commit-per-node behavior.

- `atp-visualizer`
  - Renders ATP graphs in VS Code for live status inspection.
  - Shows node details, dependency edges, and status-aware graph state.

## Schema

ATP v1.3 contract essentials:

- Root requires `meta` and `nodes`.
- `meta.project_status`: `DRAFT | ACTIVE | PAUSED | ARCHIVED`.
- Node required fields: `title`, `instruction`, `dependencies`, `status`.
- Node `status`: `LOCKED | READY | CLAIMED | COMPLETED | FAILED`.
- Optional execution fields include `context`, `worker_id`, timestamps, `artifacts`, and `report`.

Critical invariants:
- Graph must be a DAG (no cycles).
- Dependencies must reference existing node IDs.
- Only `ACTIVE` projects are claimable.
- `READY` is dependency-derived (all parent nodes completed).

## Generation Flow

### Architect/Refiner/Decomposer prompts + examples

Plan generation in ATP follows a prompted authoring path from abstract goals to executable DAG nodes:

1. Architect prompt
- Produces initial graph structure with goals translated into node instructions and dependencies.
- Targets stable topology and clear ownership boundaries.

2. Refiner prompt
- Improves granularity, wording, and dependency quality.
- Removes ambiguity and aligns nodes to practical execution units.

3. Decomposer prompt
- Splits broad nodes into smaller, testable subtasks while preserving DAG correctness.
- Parent becomes a SCOPE container over the new subgraph.

4. Examples package
- `atp_initial`, `atp_decomposed`, and `atp_replanned` illustrate expected plan evolution and lifecycle transitions.

## Execution Flow

### runner + MCP claim/complete/decompose

Execution path combines worker orchestration (`atp-runner`) with authoritative graph mutation (`atp-mcp-server`):

1. Runner bootstraps a worker turn with runtime context (project root, plan path, worker identity, git context).
2. Worker calls `atp_claim_task` to obtain a claimable node.
3. Worker executes node instruction locally (code/docs/tests).
4. Worker finalizes via `atp_complete_task` (status `DONE` or `FAILED`, plus report/artifacts).
5. If task is too broad, worker calls `atp_decompose_task` to replace it with subtasks.
6. Worker may call `atp_read_graph` (local/full) for dependency/context inspection during execution.

## Node Status Lifecycle

Operational lifecycle:

- `LOCKED`: blocked by incomplete dependencies.
- `READY`: dependencies satisfied; eligible for claim.
- `CLAIMED`: currently leased to an agent.
- `COMPLETED`: done with report/artifacts persisted.
- `FAILED`: ended with blocker/error report.

Lease and recovery behavior:
- Claims are lease-bound; stale claims can be recovered.
- Re-entry by the same agent extends lease and returns assignment.
- Completion refreshes downstream readiness.

## Claim

`Claim` is the entry point for execution and enforces coordination safety.

Input:
- `plan_path`
- `agent_id`

Outputs:
- Assignment block (`TASK ASSIGNED: ...`)
- `NO_TASKS_AVAILABLE`
- `Project is not ACTIVE`

Side effects:
- Lease cleanup for stale claims.
- READY status refresh.
- Single-node lease assignment for eligible non-scope work.

## Complete

`Complete` records durable execution outcomes and advances the graph.

Input:
- `plan_path`
- `node_id`
- `report`
- optional `artifacts`
- `status` (`DONE` or `FAILED`)

Side effects:
- Persists report/artifacts/timestamps.
- Releases claim ownership.
- Unlocks downstream nodes when dependencies are satisfied.
- Can trigger SCOPE auto-closure once all scope children are completed.

## Decompose

`Decompose` is ATP’s mechanism for keeping execution atomic without losing plan continuity.

Input:
- `plan_path`
- `parent_id`
- `subtasks[]` (unique IDs + DAG dependencies)

Side effects:
- Converts parent to SCOPE.
- Injects subgraph.
- Rewires old parent children to end nodes of new subgraph.
- Recomputes READY states.

Use when:
- A node spans multiple systems.
- A node maps to more than one coherent commit.
- Execution clarity would improve with smaller independent units.

## Visualizer

The Visualizer is ATP’s observability layer for human operators:

- Parses and validates `.atp.json` state.
- Renders dependency graph with status-aware styling.
- Surfaces node details (instruction, context, report, artifacts).
- Auto-refreshes on file changes to keep planning and execution visibility aligned.

## End-to-End Workflow Narrative

A practical ATP cycle:

1. Define goal and constraints.
2. Generate initial DAG (Architect).
3. Refine for execution clarity (Refiner).
4. Activate project (`ACTIVE`) and run worker loop (Runner).
5. Workers claim `READY` tasks via MCP.
6. Workers execute and complete with explicit reports/artifacts.
7. Broad tasks are decomposed into scoped subgraphs when needed.
8. Visualizer tracks progression and blockers.
9. Final graph state captures both delivery and knowledge handoff.

This makes ATP not just a task queue, but a structured protocol for coordinated planning, execution, and traceable project memory.
