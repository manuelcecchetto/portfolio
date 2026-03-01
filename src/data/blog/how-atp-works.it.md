---
title: Come Funziona ATP End-to-End
slug: how-atp-works
locale: it
translationGroup: blog:how-atp-works
summary: Una guida tecnica ad ATP come protocollo schema-first per pianificare, decomporre ed eseguire lavoro multi-agente tramite un ciclo di vita task MCP esplicito.
publishedAt: 2026-02-14
updatedAt: 2026-03-01
tags:
  - ATP
  - Sistemi Agentici
  - MCP
  - Workflow
  - Orchestrazione
coverImage: /images/blog/astro-content-layer-in-practice.svg
draft: false
readingTimeMinutes: 14
---

La maggior parte dei team che sperimenta delivery agentico incontra presto lo stesso limite: la pianificazione sembra corretta in un punto, l'esecuzione avviene altrove e il contesto degli handoff si perde tra i passaggi.

ATP (Agent Task Protocol) risolve questo problema trasformando l'esecuzione di progetto in un grafo tipizzato e dependency-aware, in cui ogni nodo ha un'istruzione, uno stato di ciclo di vita e un report di completamento. La scelta progettuale chiave e semplice: pianificazione ed esecuzione condividono un unico contratto.

Quel contratto e `atp_schema.json`.

## Perche esiste ATP

I task tracker classici sono flessibili, ma non abbastanza rigorosi per worker autonomi. Spesso consentono transizioni di stato ambigue, semantica debole delle dipendenze e dati di handoff incoerenti.

ATP tratta il lavoro come un DAG, non come una checklist generica:

- ogni nodo ha dipendenze esplicite
- solo il lavoro con dipendenze soddisfatte diventa claimable
- ogni completamento scrive evidenza strutturata (`report` + `artifacts`)
- la decomposizione e un'operazione di prima classe, non una riscrittura ad-hoc

Il risultato e un coordinamento deterministico su molti worker senza affidarsi a contesto condiviso nascosto.

## Responsabilita dei package nell'ecosistema ATP

Il monorepo ATP e intenzionalmente suddiviso in modo che ogni package possieda una sola responsabilita.

### `atp-protocol`

`atp-protocol` definisce ATP v1.3 come layer di compatibilita per tutti i partecipanti.

Include:

- lo schema canonico (`atp_schema.json`)
- prompt architect/refiner/decomposer/executor
- esempi di lifecycle che mostrano l'evoluzione del grafo

Questo package e la source of truth su cosa rende valido un piano.

### `atp-mcp-server`

`atp-mcp-server` e il layer autorevole di mutazione.

Valida i piani, applica le transizioni di lifecycle ed espone l'interfaccia task MCP usata dai worker. In pratica, e il sistema che garantisce integrita delle dipendenze e mutazioni concorrenti sicure.

### `atp-runner`

`atp-runner` orchestra i turni dei worker.

Inietta runtime context (`project_root`, `plan_path`, `agent_id`, metadata git), esegue il loop claim/execute/complete e puo imporre policy operative come commit-per-node.

In molti riferimenti e vincoli runtime puoi trovare anche il naming `atp_runner` per indicare il comportamento o gli entrypoint del runner.

### `atp-visualizer`

`atp-visualizer` e il layer di osservabilita in VS Code.

Renderizza in tempo reale stato dei nodi ed edge dai file `.atp.json`, cosi le persone possono ispezionare colli di bottiglia, failure e struttura degli scope senza parsare JSON manualmente.

## Modello schema-first e lifecycle

ATP e schema-first per impostazione predefinita. Un piano e valido solo se rispetta il contratto e preserva gli invarianti del grafo.

Stati core del lifecycle:

- `LOCKED`
- `READY`
- `CLAIMED`
- `COMPLETED`
- `FAILED`

Comportamenti importanti:

- `READY` deriva dalle dipendenze, non viene impostato manualmente
- `CLAIMED` e basato su lease ed e recuperabile se diventa stale
- `COMPLETED` memorizza handoff data durevoli
- `FAILED` e esplicito e orientato allo sblocco, non silenzioso

Per questo i workflow ATP restano auditabili anche in esecuzioni di lunga durata.

## Flusso di generazione del piano: Architect -> Refiner -> Decomposer

La pianificazione ATP di solito segue tre passaggi.

1. Passaggio Architect

L'Architect trasforma gli obiettivi di business in un DAG iniziale con nodi ampi e struttura delle dipendenze.

2. Passaggio Refiner

Il Refiner migliora chiarezza dei nodi, criteri di accettazione e precisione delle dipendenze, cosi i worker possono eseguire senza gap interpretativi.

3. Passaggio Decomposer

Quando un nodo e troppo ampio, viene suddiviso in sottotask con dipendenze interne esplicite. ATP converte il parent in un contenitore `SCOPE` e ricabla il grafo in modo sicuro.

Questo significa che la qualita del grafo e un'attivita continua, non un evento unico di pianificazione.

## Ciclo di vita task MCP in esecuzione

I worker interagiscono con ATP tramite un set ridotto di chiamate di lifecycle.

### `atp_claim_task`

Claima il prossimo nodo idoneo per un agente quando il progetto e `ACTIVE`.

Effetti chiave:

- aggiorna lo stato di readiness
- gestisce lease stale
- restituisce un assignment block o `NO_TASKS_AVAILABLE`

### `atp_complete_task`

Finalizza l'esecuzione del nodo come successo o failure e persiste handoff data.

Il payload tipico include:

- `node_id`
- `status` (`DONE` o `FAILED`)
- `report`
- `artifacts` opzionali

Al completamento, i dipendenti possono passare automaticamente da `LOCKED` a `READY`.

### `atp_decompose_task`

Suddivide un nodo ampio in un sottografo preservando la correttezza del DAG.

Il server:

- valida ID unici e integrita DAG dei sottotask
- converte il parent in `SCOPE`
- ricabla i figli del parent ai nodi finali del sottografo
- aggiorna gli stati di readiness

Questa e una funzione di sicurezza centrale per scalare il lavoro senza perdere continuita del piano.

## Comportamento del runner loop nella pratica

Un tipico execution loop:

1. il runner avvia il turno worker con runtime context
2. il worker chiama claim
3. il worker esegue modifiche nel repository locale
4. il worker esegue lint/typecheck e verifica scoped
5. il worker chiama complete con report e artifacts
6. il runner avanza al task successivo disponibile

Poiche ogni passaggio viene registrato nel grafo del piano, ottieni controllo dell'esecuzione e tracciabilita storica in un unico artifact.

## Caveat operativi che i team devono aspettarsi

ATP e rigoroso per design, il che e utile ma comporta alcune aspettative:

- la qualita del grafo conta: nodi poco chiari creano attrito in esecuzione
- la disciplina di decomposizione e essenziale per delivery atomico
- i report devono essere concreti per preservare contesto downstream
- memory governance (`docs/memory/*`) va trattata come obbligatoria nei flussi multi-worker

In breve, ATP non elimina il lavoro di pianificazione. Rende la qualita della pianificazione visibile e applicabile.

## Modello mentale end-to-end

Se devi ricordare una sola cosa, usa questa:

ATP non e una to-do list con worker AI collegati. E un protocollo in cui pianificazione, orchestrazione ed esecuzione sono sincronizzate attraverso un unico lifecycle DAG tipizzato.

`atp_schema.json` definisce il contratto.
`atp-mcp-server` impone l'integrita del lifecycle.
`atp-runner` esegue il loop.
`atp-visualizer` rende osservabile lo stato.

Questa combinazione e cio che permette ai team di scalare da un worker a molti senza sacrificare determinismo, auditabilita o correttezza delle dipendenze.
