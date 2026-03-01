---
title: "ATP: Protocole de Taches pour Agents"
slug: "atp-protocol"
locale: fr
translationGroup: "projects:atp-protocol"
summary: "Une pile protocole et outillage schema-first qui maintient la planification multi-agent, l'execution et les handoffs synchronises via un cycle de vie DAG type."
publishedAt: 2025-11-12
updatedAt: 2026-03-01
tags:
  - IA
  - LLM
  - Systemes Agentiques
  - MCP
  - TypeScript
  - Python
coverImage: "/images/projects/atp-protocol-cover.jpg"
draft: false
featured: true
repositoryUrl: "https://github.com/manuelcecchetto/atp"
---

J'ai construit ATP pour resoudre un probleme recurrent de coordination dans la livraison agentique : les plans derivent, les handoffs disparaissent et l'execution perd son contexte.

ATP garde la planification et l'execution sur le meme contrat grace a un DAG `.atp.json` schema-first. Les noeuds suivent un cycle de vie explicite (`READY`, `CLAIMED`, `COMPLETED`, `FAILED`), et chaque completion transporte un rapport ainsi que des artefacts.

L'ecosysteme est divise en packages focalises :

- `atp-protocol` definit le schema et les contrats de prompt
- `atp-mcp-server` applique les operations claim/complete/decompose
- `atp-runner` pilote les boucles d'execution des workers
- `atp-visualizer` expose l'etat du graphe dans VS Code

En pratique, ATP apporte aux equipes une coordination deterministe, des handoffs auditables et une maniere concrete de passer d'une seule file de taches a de nombreux agents collaboratifs sans perdre l'integrite des dependances.
