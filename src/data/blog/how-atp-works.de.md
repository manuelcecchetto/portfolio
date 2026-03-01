---
title: Wie ATP End-to-End Funktioniert
slug: how-atp-works
locale: de
translationGroup: blog:how-atp-works
summary: Ein technischer Durchgang durch ATP als schema-first Protokoll, um Multi-Agenten-Arbeit ueber einen expliziten MCP-Task-Lifecycle zu planen, zu zerlegen und auszufuehren.
publishedAt: 2026-02-14
updatedAt: 2026-03-01
tags:
  - ATP
  - Agentensysteme
  - MCP
  - Workflow
  - Orchestrierung
coverImage: /images/blog/astro-content-layer-in-practice.svg
draft: false
readingTimeMinutes: 14
---

Die meisten Teams, die mit agentischer Umsetzung experimentieren, treffen schnell auf dieselbe Grenze: Planung sieht an einer Stelle gut aus, Ausfuehrung passiert an anderer Stelle, und Handoff-Kontext geht zwischen den Schritten verloren.

ATP (Agent Task Protocol) loest das, indem Projektausfuehrung in einen typisierten, dependency-aware Graphen umgewandelt wird, in dem jeder Knoten eine Anweisung, einen Lifecycle-Status und einen Abschlussbericht hat. Die zentrale Designentscheidung ist einfach: Planung und Ausfuehrung teilen denselben Vertrag.

Dieser Vertrag ist `atp_schema.json`.

## Warum ATP existiert

Klassische Task-Tracker sind flexibel, aber nicht strikt genug fuer autonome Worker. Sie erlauben oft mehrdeutige Statuswechsel, schwache Abhaengigkeitssemantik und inkonsistente Handoff-Daten.

ATP behandelt Arbeit als DAG, nicht als lose Checkliste:

- jeder Knoten hat explizite Abhaengigkeiten
- nur abhaengigkeitsbereite Arbeit wird claimable
- jeder Abschluss schreibt strukturierte Evidenz (`report` + `artifacts`)
- Zerlegung ist eine First-Class-Operation, kein ad-hoc Rewrite

Das Ergebnis ist deterministische Koordination ueber viele Worker hinweg, ohne versteckten geteilten Kontext.

## Paketverantwortungen im ATP-Oekosystem

Das ATP-Monorepo ist bewusst aufgeteilt, sodass jedes Paket genau eine Verantwortung besitzt.

### `atp-protocol`

`atp-protocol` definiert ATP v1.3 als Kompatibilitaetslayer fuer alle Beteiligten.

Es enthaelt:

- das kanonische Schema (`atp_schema.json`)
- Architect/Refiner/Decomposer/Executor-Prompts
- Lifecycle-Beispiele, die Graph-Evolution zeigen

Dieses Paket ist die Source of Truth dafuer, was einen gueltigen Plan ausmacht.

### `atp-mcp-server`

`atp-mcp-server` ist die autoritative Mutationsschicht.

Es validiert Plaene, erzwingt Lifecycle-Uebergaenge und stellt die MCP-Task-Schnittstelle bereit, die Worker nutzen. Praktisch ist es das System, das Abhaengigkeitsintegritaet und sichere nebenlaeufige Mutation garantiert.

### `atp-runner`

`atp-runner` orchestriert Worker-Turns.

Es injiziert Runtime-Kontext (`project_root`, `plan_path`, `agent_id`, Git-Metadaten), fuehrt die claim/execute/complete-Schleife aus und kann Betriebsrichtlinien wie commit-per-node erzwingen.

In Referenzen und Runtime-Constraints sieht man teils auch die Bezeichnung `atp_runner` fuer Runner-Verhalten oder Entrypoints.

### `atp-visualizer`

`atp-visualizer` ist die Observability-Schicht in VS Code.

Es rendert Knotenstatus und Kanten live aus `.atp.json`-Dateien, sodass Menschen Engpaesse, Fehler und Scope-Struktur sehen koennen, ohne JSON manuell zu parsen.

## Schema-first Modell und Lifecycle

ATP ist standardmaessig schema-first. Ein Plan ist nur gueltig, wenn er dem Vertrag entspricht und Graph-Invarianten erhaelt.

Kern-Lifecycle-Status:

- `LOCKED`
- `READY`
- `CLAIMED`
- `COMPLETED`
- `FAILED`

Wichtiges Verhalten:

- `READY` wird aus Abhaengigkeiten abgeleitet, nicht manuell gesetzt
- `CLAIMED` ist lease-basiert und bei Stale-Zustaenden wiederherstellbar
- `COMPLETED` speichert dauerhafte Handoff-Daten
- `FAILED` ist explizit und unblock-orientiert, nicht still

Darum bleiben ATP-Workflows auch bei lang laufender Ausfuehrung auditierbar.

## Planerzeugungsfluss: Architect -> Refiner -> Decomposer

ATP-Planung folgt ueblicherweise drei Durchgaengen.

1. Architect-Durchgang

Der Architect transformiert Business-Ziele in ein initiales DAG mit groben Knoten und Abhaengigkeitsstruktur.

2. Refiner-Durchgang

Der Refiner verbessert Knotenklarheit, Akzeptanzkriterien und Abhaengigkeitspraezision, damit Worker ohne Interpretationsluecken ausfuehren koennen.

3. Decomposer-Durchgang

Wenn ein Knoten zu breit ist, wird er in Subtasks mit expliziten internen Abhaengigkeiten aufgeteilt. ATP konvertiert den Parent in einen `SCOPE`-Container und verkabelt den Graphen sicher neu.

Das bedeutet: Graph-Qualitaet ist eine kontinuierliche Aktivitaet, kein einmaliges Planungsevent.

## MCP-Task-Lifecycle in der Ausfuehrung

Worker interagieren mit ATP ueber eine kleine Menge von Lifecycle-Calls.

### `atp_claim_task`

Claimt den naechsten geeigneten Knoten fuer einen Agenten, wenn das Projekt `ACTIVE` ist.

Schluesseleffekte:

- aktualisiert Readiness
- behandelt stale Leases
- liefert einen Assignment-Block oder `NO_TASKS_AVAILABLE`

### `atp_complete_task`

Finalisiert Knotenausfuehrung als Erfolg oder Fehler und persistiert Handoff-Daten.

Typische Payload enthaelt:

- `node_id`
- `status` (`DONE` oder `FAILED`)
- `report`
- optionale `artifacts`

Nach Abschluss koennen Dependents automatisch von `LOCKED` zu `READY` wechseln.

### `atp_decompose_task`

Teilt einen breiten Knoten in einen Subgraphen auf und erhaelt dabei DAG-Korrektheit.

Der Server:

- validiert eindeutige IDs und Subtask-DAG-Integritaet
- konvertiert Parent zu `SCOPE`
- verkabelt Parent-Kinder an die Endknoten des Subgraphen
- aktualisiert Readiness-Status

Das ist ein zentrales Sicherheitsmerkmal, um Arbeit zu skalieren, ohne Plankontinuitaet zu verlieren.

## Runner-Loop-Verhalten in der Praxis

Eine typische Ausfuehrungsschleife:

1. runner startet Worker-Turn mit Runtime-Kontext
2. Worker ruft claim auf
3. Worker fuehrt lokale Repo-Aenderungen aus
4. Worker fuehrt lint/typecheck und scope-spezifische Verifikation aus
5. Worker ruft complete mit Report und Artifacts auf
6. runner geht zur naechsten verfuegbaren Aufgabe ueber

Weil jeder Schritt im Plangraphen erfasst wird, erhaelt man Ausfuehrungskontrolle und historische Nachvollziehbarkeit in einem einzigen Artefakt.

## Operative Caveats, die Teams erwarten sollten

ATP ist bewusst strikt, was nuetzlich ist, aber Erwartungen mitbringt:

- Graph-Qualitaet zaehlt: unklare Knoten erzeugen Reibung in der Ausfuehrung
- Zerlegungsdisziplin ist fuer atomare Lieferung essenziell
- Reports muessen konkret sein, um Downstream-Kontext zu erhalten
- Memory Governance (`docs/memory/*`) sollte in Multi-Worker-Flows verpflichtend sein

Kurz gesagt: ATP entfernt Planungsarbeit nicht. Es macht Planungsqualitaet sichtbar und durchsetzbar.

## End-to-End Mental Model

Wenn du nur eine Sache behalten willst, dann diese:

ATP ist keine To-do-Liste mit angeschlossenen AI-Workern. Es ist ein Protokoll, bei dem Planung, Orchestrierung und Ausfuehrung ueber einen typisierten DAG-Lifecycle synchronisiert sind.

`atp_schema.json` definiert den Vertrag.
`atp-mcp-server` erzwingt Lifecycle-Integritaet.
`atp-runner` fuehrt die Schleife aus.
`atp-visualizer` macht Status beobachtbar.

Diese Kombination ermoeglicht Teams die Skalierung von einem Worker zu vielen, ohne Determinismus, Auditierbarkeit oder Abhaengigkeitskorrektheit aufzugeben.
