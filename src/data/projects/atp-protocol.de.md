---
title: "ATP: Agent Task Protocol"
slug: "atp-protocol"
locale: de
translationGroup: "projects:atp-protocol"
summary: "Ein schema-first Protokoll- und Tooling-Stack, der Multi-Agenten-Planung, Ausführung und Übergaben über einen typisierten DAG-Lebenszyklus synchron hält."
publishedAt: 2025-11-12
updatedAt: 2026-03-01
tags:
  - KI
  - LLM
  - Agentensysteme
  - MCP
  - TypeScript
  - Python
coverImage: "/images/projects/atp-protocol-cover.jpg"
draft: false
featured: true
repositoryUrl: "https://github.com/manuelcecchetto/atp"
---

Ich habe ATP gebaut, um ein wiederkehrendes Koordinationsproblem in agentischer Umsetzung zu lösen: Pläne driften auseinander, Übergaben gehen verloren und die Ausführung verliert Kontext.

ATP hält Planung und Ausführung über denselben Vertrag zusammen, mit einem schema-first `.atp.json`-DAG. Knoten durchlaufen einen expliziten Lebenszyklus (`READY`, `CLAIMED`, `COMPLETED`, `FAILED`), und jeder Abschluss enthält einen Bericht plus Artefakte.

Das Ökosystem ist in fokussierte Pakete aufgeteilt:

- `atp-protocol` definiert Schema- und Prompt-Verträge
- `atp-mcp-server` erzwingt claim/complete/decompose-Operationen
- `atp-runner` steuert Worker-Ausführungsschleifen
- `atp-visualizer` zeigt den Graph-Status in VS Code

In der Praxis gibt ATP Teams deterministische Koordination, nachvollziehbare Übergaben und einen praktischen Weg, von einer Task-Warteschlange auf viele kollaborierende Agenten zu skalieren, ohne die Abhängigkeitsintegrität zu verlieren.
