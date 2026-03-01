---
title: ATP End-to-End Kaise Kaam Karta Hai
slug: how-atp-works
locale: hi
translationGroup: blog:how-atp-works
summary: ATP ka technical walkthrough jo dikhata hai ki schema-first protocol ke roop me explicit MCP task lifecycle ke through multi-agent work ko kaise plan, decompose aur execute kiya jata hai.
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

Agentic delivery par experiment karne wali zyada tar teams jaldi ek hi wall se takrati hain: planning ek jagah sahi dikhti hai, execution kahin aur hota hai, aur steps ke beech handoff context leak ho jata hai.

ATP (Agent Task Protocol) is problem ko is tarah solve karta hai ki project execution ko typed, dependency-aware graph me badal deta hai jahan har node ke paas instruction, lifecycle state, aur completion report hota hai. Iska key design choice seedha hai: planning aur execution ek hi contract share karte hain.

Wahi contract `atp_schema.json` hai.

## ATP kyun exist karta hai

Classic task trackers flexible hote hain, lekin autonomous workers ke liye kaafi strict nahi hote. Ye aksar ambiguous status transitions, weak dependency semantics, aur inconsistent handoff data allow karte hain.

ATP work ko loose checklist nahi, DAG ke roop me treat karta hai:

- har node ki explicit dependencies hoti hain
- sirf dependency-ready work claimable banta hai
- har completion structured evidence likhta hai (`report` + `artifacts`)
- decomposition first-class operation hai, ad-hoc rewrite nahi

Iska result hai deterministic coordination across many workers, bina hidden shared context par depend kiye.

## ATP ecosystem me package responsibilities

ATP monorepo intentionally split hai taaki har package ek responsibility own kare.

### `atp-protocol`

`atp-protocol` ATP v1.3 ko sab participants ke liye compatibility layer ke roop me define karta hai.

Isme include hota hai:

- canonical schema (`atp_schema.json`)
- architect/refiner/decomposer/executor prompts
- lifecycle examples jo graph evolution dikhate hain

Ye package valid plan ki source of truth hai.

### `atp-mcp-server`

`atp-mcp-server` authoritative mutation layer hai.

Ye plans validate karta hai, lifecycle transitions enforce karta hai, aur workers dwara use hone wali MCP task interface expose karta hai. Practical terms me ye dependency integrity aur safe concurrent mutation guarantee karta hai.

### `atp-runner`

`atp-runner` worker turns orchestrate karta hai.

Ye runtime context inject karta hai (`project_root`, `plan_path`, `agent_id`, git metadata), claim/execute/complete loop chalata hai, aur commit-per-node jaisi operational policies enforce kar sakta hai.

Kai references aur runtime constraints me `atp_runner` naming bhi dikhegi, jo runner behavior ya entrypoints ko refer karti hai.

### `atp-visualizer`

`atp-visualizer` VS Code me observability layer hai.

Ye `.atp.json` files se node state aur edges live render karta hai taaki humans bottlenecks, failures, aur scope structure bina manual JSON parsing ke inspect kar saken.

## Schema-first model aur lifecycle

ATP default se schema-first hai. Plan tabhi valid hai jab wo contract match kare aur graph invariants preserve kare.

Core lifecycle states:

- `LOCKED`
- `READY`
- `CLAIMED`
- `COMPLETED`
- `FAILED`

Important behavior:

- `READY` dependencies se derive hota hai, manually toggle nahi hota
- `CLAIMED` lease-based hota hai aur stale hone par recover kiya ja sakta hai
- `COMPLETED` durable handoff data store karta hai
- `FAILED` explicit aur unblock-focused hota hai, silent nahi

Isi wajah se ATP workflows long-running execution me bhi auditable rehte hain.

## Plan generation flow: Architect -> Refiner -> Decomposer

ATP planning generally teen passes follow karti hai.

1. Architect pass

Architect business goals ko initial DAG me convert karta hai jisme broad nodes aur dependency structure hoti hai.

2. Refiner pass

Refiner node clarity, acceptance criteria, aur dependency precision improve karta hai taaki workers interpretation gaps ke bina execute kar saken.

3. Decomposer pass

Jab node bahut broad ho, use explicit internal dependencies wale subtasks me split kiya jata hai. ATP parent ko `SCOPE` container me convert karta hai aur graph ko safely rewire karta hai.

Iska matlab graph quality one-time planning event nahi, continuous activity hai.

## Execution me MCP task lifecycle

Workers ATP ke saath chhote set of lifecycle calls se interact karte hain.

### `atp_claim_task`

Project `ACTIVE` hone par agent ke liye next eligible node claim karta hai.

Key effects:

- readiness refresh karta hai
- stale leases handle karta hai
- assignment block ya `NO_TASKS_AVAILABLE` return karta hai

### `atp_complete_task`

Node execution ko success ya failure ke roop me finalize karta hai aur handoff data persist karta hai.

Typical payload me hota hai:

- `node_id`
- `status` (`DONE` ya `FAILED`)
- `report`
- optional `artifacts`

Completion ke baad dependents automatically `LOCKED` se `READY` me move ho sakte hain.

### `atp_decompose_task`

Broad node ko subgraph me split karta hai, DAG correctness preserve karte hue.

Server:

- unique IDs aur subtask DAG integrity validate karta hai
- parent ko `SCOPE` me convert karta hai
- parent children ko subgraph end nodes se rewire karta hai
- readiness statuses refresh karta hai

Ye work scale karne ke liye core safety feature hai, bina plan continuity lose kiye.

## Practice me runner loop behavior

Typical execution loop:

1. runner runtime context ke saath worker turn start karta hai
2. worker claim call karta hai
3. worker local repo changes execute karta hai
4. worker lint/typecheck aur scoped verification run karta hai
5. worker report aur artifacts ke saath complete call karta hai
6. runner next available task par advance karta hai

Kyuki har step plan graph me record hota hai, aapko execution control aur historical traceability dono ek hi artifact me milte hain.

## Teams ko kaunse operational caveats expect karne chahiye

ATP design se strict hai, jo useful hai, lekin expectations ke saath aata hai:

- graph quality matter karti hai: unclear nodes execution friction create karte hain
- atomic delivery ke liye decomposition discipline essential hai
- downstream context preserve karne ke liye reports concrete hone chahiye
- multi-worker flows me memory governance (`docs/memory/*`) ko mandatory treat karna chahiye

Short me, ATP planning work ko khatam nahi karta. Ye planning quality ko visible aur enforceable banata hai.

## End-to-end mental model

Agar ek cheez yaad rakhni ho to ye rakho:

ATP AI workers wali to-do list nahi hai. Ye ek protocol hai jahan planning, orchestration aur execution ek typed DAG lifecycle ke through synchronized rehte hain.

`atp_schema.json` contract define karta hai.
`atp-mcp-server` lifecycle integrity enforce karta hai.
`atp-runner` loop execute karta hai.
`atp-visualizer` state ko observable banata hai.

Ye combination teams ko one worker se many workers tak scale karne deta hai bina determinism, auditability, ya dependency correctness compromise kiye.
