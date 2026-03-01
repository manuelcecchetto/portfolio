---
title: "ATP: Protocollo di Task per Agenti"
slug: "atp-protocol"
locale: it
translationGroup: "projects:atp-protocol"
summary: "Uno stack di protocollo e strumenti schema-first che mantiene sincronizzati pianificazione multi-agente, esecuzione e handoff tramite un ciclo di vita DAG tipizzato."
publishedAt: 2025-11-12
updatedAt: 2026-03-01
tags:
  - AI
  - LLM
  - Sistemi Agentici
  - MCP
  - TypeScript
  - Python
coverImage: "/images/projects/atp-protocol-cover.jpg"
draft: false
featured: true
repositoryUrl: "https://github.com/manuelcecchetto/atp"
---

Ho creato ATP per risolvere un problema ricorrente nel delivery agentico: pianificazione ed esecuzione tendevano a divergere, con handoff fragili tra i turni dei worker.

## Contesto e ownership

ATP e uno stack sviluppato da me nel workspace locale `atp`. Seguo in prima persona protocollo, workflow di esecuzione, integrazione MCP e tooling di supporto.

La scelta chiave e netta: pianificazione ed esecuzione devono condividere un unico contratto tipizzato.

## Cosa ho costruito

ATP usa un DAG `.atp.json` schema-first in cui ogni nodo passa per un lifecycle esplicito (`READY`, `CLAIMED`, `COMPLETED`, `FAILED`) e ogni completamento registra report e artifact.

L'ecosistema e diviso in pacchetti focalizzati:

- `atp-protocol`: schema e contratti prompt
- `atp-mcp-server`: enforcement claim/complete/decompose
- `atp-runner`: orchestrazione dei loop worker
- `atp-visualizer`: osservabilita del grafo in VS Code

## Decisioni tecniche principali

- Invarianti di workflow codificati direttamente in schema e validazione server.
- Decomposizione trattata come operazione di prima classe, non come modifica ad-hoc.
- Mutazioni rese autorevoli via MCP per evitare corruzione di stato con worker concorrenti.
- Stato del grafo esposto visivamente per ridurre il tempo di debug.

## Outcome

ATP mi permette coordinamento deterministico, handoff auditabili e recupero rapido da claim fallite o scadute. Oggi e la base del mio flusso multi-agent e un modello riusabile per team che vogliono passare da automazioni singole a collaborazione dependency-safe.
