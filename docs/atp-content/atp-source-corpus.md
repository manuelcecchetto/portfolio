# ATP Source Corpus (Canonical)

- NodeID: T01_scan_atp_packages
- Date: 2026-03-01
- Author: codex_agent_1
- Scope: Evidence-backed technical source corpus for ATP package roles, interfaces, and terminology.

## Monorepo Scope Scanned

Repository scanned: `/Users/manuelcecchetto/code/atp`

Packages in scope:
- `atp-protocol`
- `atp-mcp-server`
- `atp-runner`
- `atp-visualizer`

Primary source files:
- `atp-protocol/README.md`
- `atp-protocol/atp_schema.json`
- `atp-protocol/prompts/atp_business_architect_prompt.md`
- `atp-protocol/prompts/atp_decomposer_prompt.md`
- `atp-protocol/prompts/atp_executor_prompt.md`
- `atp-protocol/prompts/atp_refiner_prompt.md`
- `atp-mcp-server/README.md`
- `atp-mcp-server/main.py`
- `atp-mcp-server/RULES.md`
- `atp-mcp-server/atp_schema.json`
- `atp-runner/README.md`
- `atp-runner/RUNNER.md`
- `atp-runner/ARCHITECT.md`
- `atp-runner/atp_runner.ts`
- `atp-visualizer/README.md`
- `atp-visualizer/src/extension.ts`
- `atp-visualizer/src/utils/atpParser.ts`
- `atp-visualizer/src/types/atp.ts`
- `atp-visualizer/atp_schema.json`

## Canonical ATP Model (v1.3)

Observed consistently across `atp-protocol/atp_schema.json`, `atp-mcp-server/atp_schema.json`, and `atp-visualizer/atp_schema.json`:

- Root shape: object with required `meta` and `nodes`.
- `meta` required fields:
  - `project_name` (string)
  - `version` (must be `"1.3"`)
  - `project_status` (`DRAFT | ACTIVE | PAUSED | ARCHIVED`)
- Node required fields:
  - `title`
  - `instruction`
  - `dependencies` (array of node IDs)
  - `status` (`LOCKED | READY | CLAIMED | COMPLETED | FAILED`)
- Optional runtime and planning extensions:
  - `context`
  - `reasoning_effort` (`minimal | low | medium | high | xhigh`)
  - `worker_id`, `started_at`, `completed_at`, `artifacts`, `report`

Key semantic rules encoded by tools/validators:
- Graph must be a DAG with no missing dependency references.
- Only `ACTIVE` projects are claimable by executors.
- Readiness is dependency-driven (`READY` only when all parents are `COMPLETED`).

## Package Roles

### 1) atp-protocol

Role:
- Canonical protocol definition package for ATP v1.3.
- Holds schema, planning/execution prompt templates, and lifecycle examples.

What it contributes:
- Contract-first interoperability via `atp_schema.json`.
- Prompt assets:
  - Business architecture/planning (`atp_business_architect_prompt.md`)
  - Node decomposition (`atp_decomposer_prompt.md`)
  - Worker execution (`atp_executor_prompt.md`)
  - Graph refinement (`atp_refiner_prompt.md`)
- Example lifecycle datasets (`atp_initial`, `atp_decomposed`, `atp_replanned`).

Terminology anchored here:
- "Architect" plans DAGs.
- "Worker Agent" executes or decomposes nodes.
- "Artifacts" = files produced in repo.
- "Report" = knowledge handoff persisted in graph.

### 2) atp-mcp-server

Role:
- Authoritative mutation/validation layer for `.atp.json` plans over MCP.

What it contributes:
- Deterministic tool API for lifecycle operations:
  - `atp_claim_task(plan_path, agent_id)`
  - `atp_complete_task(plan_path, node_id, report, artifacts, status)`
  - `atp_decompose_task(plan_path, parent_id, subtasks)`
  - `atp_read_graph(plan_path, view_mode, node_id)`
- Status resource:
  - `atp://status/summary`
- File-lock based safe writes and Draft7 schema validation in `main.py`.
- Lease model (`ATP_LEASE_SECONDS`) to revive stale `CLAIMED` work.
- Scope semantics for decomposition:
  - parent converts to `type: "SCOPE"`
  - scope auto-completes after all `scope_children` complete.

Critical behavior from `main.py`:
- `claim` supports re-entry: if same agent already has a claimed node, lease is extended and assignment is returned.
- `complete` normalizes status (`DONE -> COMPLETED`) and unblocks downstream nodes.
- `decompose` validates subtasks as a DAG, grafts subgraph, rewires children to end nodes.
- Dependency integrity check rejects references to missing nodes.

### 3) atp-runner

Role:
- Headless orchestrator that runs one or multiple workers against ATP plans.

What it contributes:
- Worker bootstrapping with runtime context injection:
  - `project_root`, `plan_path`, `agent_id`, worker slot, git metadata.
- Provider abstraction (`codex` and `claude`) in `atp_runner.ts`.
- Loop model:
  - spawn worker turn
  - infer activity from tool/text signals
  - stop on `NO_TASKS_AVAILABLE` or inactive project conditions.
- Optional commit-per-node automation with message format `node(<NODE_ID>): <short title>`.
- Quality expectations embedded into worker prompt runtime preamble (lint/typecheck + autofix flow).

Prompt surface (`RUNNER.md`):
- Enforces claim -> execute/decompose -> complete lifecycle.
- Requires memory governance updates in `docs/memory/*` when relevant.

### 4) atp-visualizer

Role:
- VS Code extension for live ATP graph visualization.

What it contributes:
- Watches `**/*.atp.json` and auto-refreshes webview graph.
- Parses and validates ATP JSON client-side (`parseAtpJson`) using schema-aligned enum checks.
- Renders dependency graph with status-aware styling and node detail HUD.
- Core extension entrypoint in `src/extension.ts` and parser in `src/utils/atpParser.ts`.

Observed UX semantics:
- Edges follow `dependencies` direction.
- `CLAIMED` targets can animate in graph view.
- Node fields surfaced in detail HUD include instruction/context/report/artifacts.

## Tool Interface Reference (Execution Layer)

From `atp-mcp-server/main.py` and README:

1. `atp_claim_task`
- Input: `plan_path`, `agent_id`
- Output classes:
  - assignment block starting with `TASK ASSIGNED:`
  - `NO_TASKS_AVAILABLE...`
  - `Project is not ACTIVE...`
- Side effects:
  - releases zombie claims
  - refreshes READY nodes
  - claims highest-priority READY non-scope node

2. `atp_complete_task`
- Input: `plan_path`, `node_id`, `report`, optional `artifacts`, `status` (`DONE`/`FAILED`)
- Side effects:
  - writes report/artifacts/timestamps
  - clears worker lease
  - unblocks eligible dependents
  - can trigger scope closures

3. `atp_decompose_task`
- Input: `plan_path`, `parent_id`, `subtasks[]`
- Side effects:
  - validates subtask uniqueness + DAG
  - converts parent into SCOPE
  - injects subgraph and rewires parent children
  - refreshes READY statuses

4. `atp_read_graph`
- Input: `plan_path`, `view_mode` (`full`/`local`), optional `node_id`
- Output:
  - full graph JSON
  - localized neighborhood summary

## Canonical Terminology Map

- ATP plan: `.atp.json` DAG document following `atp_schema.json`.
- Node status lifecycle: `LOCKED -> READY -> CLAIMED -> COMPLETED` (or `FAILED`).
- SCOPE node: decomposition container, closed automatically by server.
- Worker report: durable handoff text attached to completed node.
- Artifacts: changed/created file paths attached to completed node.
- Lease: time-bound claim ownership to avoid orphaned tasks.

## Practical Constraints and Invariants

- Plan mutations should occur through MCP tools, not direct JSON edits.
- All participating tools expect schema version `1.3`.
- Planner prompts specify runtime fields should not be authored at plan-creation time.
- Server and visualizer both enforce dependency integrity (no unknown node refs).

## Content Copy Safety Notes (for downstream page/blog writers)

Facts that are safe to assert from source:
- ATP is schema-first and DAG-based.
- `atp_schema.json` is the protocol contract and is duplicated consistently across protocol/server/visualizer packages.
- MCP lifecycle operations are `claim`, `complete`, `decompose`, and `read_graph`.
- Runner is orchestrator-only; protocol package itself is not an executor implementation.
- Visualizer is a VS Code extension focused on local `*.atp.json` graph inspection.

Claims that should be framed carefully unless externally verified:
- Packaging/distribution claims (Marketplace publication state, release channels).
- Ecosystem-level adoption claims beyond this monorepo.

## Quick Verification

Command used for acceptance criterion:

```bash
test -f docs/atp-content/atp-source-corpus.md && rg -n "atp-protocol|atp-mcp-server|atp-runner|atp-visualizer|atp_schema.json|claim|complete|decompose|visualizer" docs/atp-content/atp-source-corpus.md
```

