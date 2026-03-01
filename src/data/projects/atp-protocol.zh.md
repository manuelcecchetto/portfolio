---
title: "ATP：Agent Task Protocol"
slug: "atp-protocol"
locale: zh
translationGroup: "projects:atp-protocol"
summary: "一个以 schema-first 为核心的协议与工具栈，通过类型化 DAG 生命周期，让多智能体规划、执行与交接保持同步。"
publishedAt: 2025-11-12
updatedAt: 2026-03-01
tags:
  - AI
  - LLM
  - 多智能体系统
  - MCP
  - TypeScript
  - Python
coverImage: "/images/projects/atp-protocol-cover.jpg"
draft: false
featured: true
repositoryUrl: "https://github.com/manuelcecchetto/atp"
---

我构建 ATP，是为了解决智能体交付中的常见协作问题：计划会漂移，交接会丢失，执行会失去上下文。

ATP 通过 schema-first 的 `.atp.json` DAG，让规划与执行遵循同一份契约。节点按显式生命周期流转（`READY`、`CLAIMED`、`COMPLETED`、`FAILED`），每次完成都携带报告与产物。

生态按职责拆分为几个聚焦包：

- `atp-protocol` 定义 schema 与提示词契约
- `atp-mcp-server` 执行 claim/complete/decompose 操作约束
- `atp-runner` 驱动 worker 执行循环
- `atp-visualizer` 在 VS Code 中呈现图状态

在实践中，ATP 为团队提供可确定的协作节奏、可审计的交接，以及从单一任务队列扩展到多智能体协同时仍保持依赖完整性的可行路径。
