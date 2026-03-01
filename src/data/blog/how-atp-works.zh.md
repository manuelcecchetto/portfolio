---
title: ATP 如何端到端运作
slug: how-atp-works
locale: zh
translationGroup: blog:how-atp-works
summary: 一篇技术化解读，说明 ATP 如何作为 schema-first 协议，通过显式 MCP 任务生命周期来规划、拆解并执行多智能体协作。
publishedAt: 2026-02-14
updatedAt: 2026-03-01
tags:
  - ATP
  - 多智能体系统
  - MCP
  - 工作流
  - 编排
coverImage: /images/blog/astro-content-layer-in-practice.svg
draft: false
readingTimeMinutes: 14
---

大多数尝试 agentic delivery 的团队很快都会撞到同一面墙：规划在一个地方看起来很完整，执行却发生在另一个地方，handoff 上下文在步骤之间不断丢失。

ATP（Agent Task Protocol）通过把项目执行转成一个类型化、dependency-aware 的图来解决这个问题：每个节点都有 instruction、lifecycle state 和 completion report。它的核心设计选择很直接: 规划与执行共享同一份契约。

这份契约就是 `atp_schema.json`。

## ATP 为什么存在

传统任务管理器很灵活，但对自治 worker 来说不够严格。它们常常允许含糊的状态迁移、薄弱的依赖语义，以及不一致的 handoff 数据。

ATP 把工作视为 DAG，而不是松散清单:

- 每个节点都有显式依赖
- 只有依赖就绪的工作才会变为 claimable
- 每次完成都会写入结构化证据（`report` + `artifacts`）
- decomposition 是一等操作，而不是临时改写

结果是在不依赖隐式共享上下文的前提下，实现多 worker 的确定性协作。

## ATP 生态中的包职责

ATP monorepo 被有意拆分，让每个 package 只承担一种职责。

### `atp-protocol`

`atp-protocol` 把 ATP v1.3 定义为所有参与者的兼容层。

它包含:

- 规范 schema（`atp_schema.json`）
- architect/refiner/decomposer/executor prompts
- 展示图如何演进的 lifecycle 示例

这个 package 是“什么才算有效计划”的 source of truth。

### `atp-mcp-server`

`atp-mcp-server` 是权威变更层。

它负责校验计划、强制 lifecycle 转移，并暴露 worker 使用的 MCP 任务接口。实际中，它保证依赖完整性和并发变更安全。

### `atp-runner`

`atp-runner` 负责编排 worker 回合。

它注入 runtime context（`project_root`、`plan_path`、`agent_id`、git metadata），驱动 claim/execute/complete 循环，并可执行 commit-per-node 这类操作策略。

在很多参考和运行时约束里，你也会看到 `atp_runner` 这个命名，用来指代 runner 行为或入口。

### `atp-visualizer`

`atp-visualizer` 是 VS Code 中的可观测层。

它从 `.atp.json` 文件实时渲染节点状态与边，使人类无需手工解析 JSON 也能观察瓶颈、失败和 scope 结构。

## Schema-first 模型与生命周期

ATP 默认采用 schema-first。只有符合契约且保持图不变量的计划才是有效的。

核心生命周期状态:

- `LOCKED`
- `READY`
- `CLAIMED`
- `COMPLETED`
- `FAILED`

关键行为:

- `READY` 由依赖推导，不靠手工切换
- `CLAIMED` 基于 lease，过期可恢复
- `COMPLETED` 存储可持续的 handoff 数据
- `FAILED` 必须显式记录并以解除阻塞为导向，而不是静默失败

这也是 ATP 工作流在长周期执行下仍可审计的原因。

## 计划生成流程: Architect -> Refiner -> Decomposer

ATP 规划通常分三轮。

1. Architect 轮

Architect 将业务目标转换成初始 DAG，包含较宽的节点与依赖结构。

2. Refiner 轮

Refiner 提升节点清晰度、验收标准与依赖精度，让 worker 执行时减少解释偏差。

3. Decomposer 轮

当节点过宽时，会被拆成带显式内部依赖的 subtasks。ATP 会把父节点转换为 `SCOPE` 容器，并安全地重连图结构。

这意味着图质量是持续活动，而不是一次性规划动作。

## 执行阶段的 MCP 任务生命周期

worker 通过少量 lifecycle 调用与 ATP 交互。

### `atp_claim_task`

当项目为 `ACTIVE` 时，为某个 agent 领取下一个符合条件的节点。

关键效果:

- 刷新 readiness
- 处理 stale lease
- 返回 assignment block 或 `NO_TASKS_AVAILABLE`

### `atp_complete_task`

将节点执行以成功或失败方式收尾，并持久化 handoff 数据。

典型 payload 包含:

- `node_id`
- `status`（`DONE` 或 `FAILED`）
- `report`
- 可选 `artifacts`

完成后，下游依赖节点可自动从 `LOCKED` 转为 `READY`。

### `atp_decompose_task`

在保持 DAG 正确性的前提下，把宽节点拆成子图。

服务器会:

- 校验唯一 ID 和子任务 DAG 完整性
- 将父节点转换为 `SCOPE`
- 将父节点子节点重连到子图终点节点
- 刷新 readiness 状态

这是在不丢失计划连续性的情况下扩展工作规模的核心安全特性。

## 实践中的 runner 循环行为

典型执行循环如下:

1. runner 以 runtime context 启动 worker 回合
2. worker 调用 claim
3. worker 在本地仓库执行改动
4. worker 运行 lint/typecheck 及范围内验证
5. worker 携带 report 与 artifacts 调用 complete
6. runner 推进到下一个可执行任务

因为每一步都记录在计划图中，你同时获得执行控制与历史可追溯性。

## 团队需要预期的操作性 caveats

ATP 的严格性是有意设计的，这很有价值，但也有前提:

- 图质量很关键: 不清晰的节点会引发执行摩擦
- decomposition 纪律对原子化交付至关重要
- report 必须具体，才能保留下游上下文
- 在多 worker 流程中，memory governance（`docs/memory/*`）应视为强制要求

简而言之，ATP 不会消除规划工作，而是让规划质量可见且可执行。

## 端到端心智模型

如果你只记住一件事，请记住这句:

ATP 不是“挂了 AI worker 的待办清单”。它是一个协议，让规划、编排和执行在同一个类型化 DAG 生命周期上保持同步。

`atp_schema.json` 定义契约。
`atp-mcp-server` 强制 lifecycle 完整性。
`atp-runner` 执行循环。
`atp-visualizer` 让状态可观测。

正是这组组合，让团队可以从单 worker 扩展到多 worker，同时不牺牲确定性、可审计性和依赖正确性。
