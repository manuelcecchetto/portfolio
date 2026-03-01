---
title: "ATP: Agent Task Protocol"
slug: "atp-protocol"
locale: hi
translationGroup: "projects:atp-protocol"
summary: "एक schema-first प्रोटोकॉल और टूलिंग स्टैक, जो typed DAG lifecycle के जरिए multi-agent planning, execution और handoff को synchronized रखता है।"
publishedAt: 2025-11-12
updatedAt: 2026-03-01
tags:
  - AI
  - LLM
  - एजेंटिक सिस्टम
  - MCP
  - TypeScript
  - Python
coverImage: "/images/projects/atp-protocol-cover.jpg"
draft: false
featured: true
repositoryUrl: "https://github.com/manuelcecchetto/atp"
---

मैंने ATP को agentic delivery में बार-बार आने वाली coordination समस्या हल करने के लिए बनाया: plans drift हो जाते हैं, handoff गायब हो जाते हैं, और execution context खो देता है।

ATP planning और execution को एक ही contract पर रखता है, schema-first `.atp.json` DAG के माध्यम से। Nodes एक explicit lifecycle (`READY`, `CLAIMED`, `COMPLETED`, `FAILED`) से गुजरते हैं, और हर completion में report के साथ artifacts शामिल होते हैं।

यह ecosystem focused packages में विभाजित है:

- `atp-protocol` schema और prompt contracts परिभाषित करता है
- `atp-mcp-server` claim/complete/decompose operations को enforce करता है
- `atp-runner` worker execution loops चलाता है
- `atp-visualizer` VS Code में graph state दिखाता है

व्यवहारिक रूप से ATP टीमों को deterministic coordination, auditable handoff, और एक task queue से कई सहयोगी agents तक scale करने का व्यावहारिक तरीका देता है, बिना dependency integrity खोए।
