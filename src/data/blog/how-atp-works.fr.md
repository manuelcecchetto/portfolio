---
title: Comment ATP Fonctionne de Bout en Bout
slug: how-atp-works
locale: fr
translationGroup: blog:how-atp-works
summary: Un parcours technique d'ATP comme protocole schema-first pour planifier, decomposer et executer du travail multi-agent via un cycle de vie de taches MCP explicite.
publishedAt: 2026-02-14
updatedAt: 2026-03-01
tags:
  - ATP
  - Systemes Agentiques
  - MCP
  - Workflow
  - Orchestration
coverImage: /images/blog/astro-content-layer-in-practice.svg
draft: false
readingTimeMinutes: 14
---

La plupart des equipes qui experimentent la livraison agentique rencontrent vite la meme limite : la planification parait bonne a un endroit, l'execution se produit ailleurs, et le contexte de handoff se perd entre les etapes.

ATP (Agent Task Protocol) resout cela en transformant l'execution de projet en un graphe typise et dependency-aware, ou chaque noeud a une instruction, un etat de cycle de vie, et un rapport de completion. Le choix de conception central est simple : la planification et l'execution partagent un seul contrat.

Ce contrat est `atp_schema.json`.

## Pourquoi ATP existe

Les task trackers classiques sont flexibles, mais pas assez stricts pour des workers autonomes. Ils autorisent souvent des transitions d'etat ambigues, une semantique de dependances faible, et des donnees de handoff incoherentes.

ATP traite le travail comme un DAG, pas comme une checklist flottante :

- chaque noeud a des dependances explicites
- seul le travail pret cote dependances devient claimable
- chaque completion ecrit une evidence structuree (`report` + `artifacts`)
- la decomposition est une operation de premiere classe, pas une reecriture ad-hoc

Le resultat est une coordination deterministe entre de nombreux workers sans contexte partage cache.

## Responsabilites des packages dans l'ecosysteme ATP

Le monorepo ATP est volontairement decoupe pour que chaque package possede une responsabilite unique.

### `atp-protocol`

`atp-protocol` definit ATP v1.3 comme couche de compatibilite pour tous les participants.

Il inclut :

- le schema canonique (`atp_schema.json`)
- des prompts architect/refiner/decomposer/executor
- des exemples de lifecycle qui montrent l'evolution du graphe

Ce package est la source de verite sur ce qu'est un plan valide.

### `atp-mcp-server`

`atp-mcp-server` est la couche de mutation autoritative.

Il valide les plans, impose les transitions de lifecycle, et expose l'interface de taches MCP utilisee par les workers. En pratique, c'est le systeme qui garantit l'integrite des dependances et des mutations concurrentes sures.

### `atp-runner`

`atp-runner` orchestre les tours des workers.

Il injecte le runtime context (`project_root`, `plan_path`, `agent_id`, metadonnees git), enchaine la boucle claim/execute/complete, et peut imposer des politiques operationnelles comme commit-per-node.

Dans des references et contraintes runtime, on peut aussi voir le nom `atp_runner` pour designer le comportement ou les points d'entree du runner.

### `atp-visualizer`

`atp-visualizer` est la couche d'observabilite dans VS Code.

Il rend en direct l'etat des noeuds et des aretes depuis les fichiers `.atp.json` pour permettre aux humains d'inspecter goulots d'etranglement, echecs et structure de scope sans parser du JSON manuellement.

## Modele schema-first et lifecycle

ATP est schema-first par defaut. Un plan n'est valide que s'il respecte le contrat et preserve les invariants du graphe.

Etats centraux du lifecycle :

- `LOCKED`
- `READY`
- `CLAIMED`
- `COMPLETED`
- `FAILED`

Comportements importants :

- `READY` est derive des dependances, pas active manuellement
- `CLAIMED` est base sur lease et recuperable s'il devient stale
- `COMPLETED` stocke des donnees de handoff durables
- `FAILED` est explicite et oriente deblocage, pas silencieux

C'est pourquoi les workflows ATP restent auditables meme en execution longue.

## Flux de generation de plan : Architect -> Refiner -> Decomposer

La planification ATP suit generalement trois passes.

1. Passe Architect

L'Architect transforme les objectifs business en DAG initial avec des noeuds larges et une structure de dependances.

2. Passe Refiner

Le Refiner ameliore la clarte des noeuds, les criteres d'acceptation, et la precision des dependances pour que les workers executent sans trous d'interpretation.

3. Passe Decomposer

Quand un noeud est trop large, il est decoupe en subtasks avec dependances internes explicites. ATP convertit le parent en conteneur `SCOPE` et recable le graphe de facon sure.

Cela signifie que la qualite du graphe est une activite continue, pas un evenement unique de planification.

## Cycle de vie des taches MCP en execution

Les workers interagissent avec ATP via un petit ensemble d'appels de lifecycle.

### `atp_claim_task`

Claim la prochaine tache eligible pour un agent quand le projet est `ACTIVE`.

Effets cles :

- rafraichit la readiness
- gere les leases stale
- retourne un bloc d'assignation ou `NO_TASKS_AVAILABLE`

### `atp_complete_task`

Finalise l'execution du noeud en succes ou echec et persiste les donnees de handoff.

Le payload typique inclut :

- `node_id`
- `status` (`DONE` ou `FAILED`)
- `report`
- `artifacts` optionnels

Apres completion, les dependants peuvent passer automatiquement de `LOCKED` a `READY`.

### `atp_decompose_task`

Decoupe un noeud large en sous-graphe en preservant la correction du DAG.

Le serveur :

- valide les IDs uniques et l'integrite DAG des subtasks
- convertit le parent en `SCOPE`
- recable les enfants du parent vers les noeuds finaux du sous-graphe
- rafraichit les statuts de readiness

C'est une fonction de surete centrale pour scaler le travail sans perdre la continuite du plan.

## Comportement de la boucle runner en pratique

Une boucle d'execution typique :

1. le runner demarre le tour worker avec le runtime context
2. le worker appelle claim
3. le worker execute des changements dans le depot local
4. le worker lance lint/typecheck et toute verification de scope
5. le worker appelle complete avec report et artifacts
6. le runner passe a la tache suivante disponible

Comme chaque etape est enregistree dans le graphe du plan, on obtient a la fois controle d'execution et tracabilite historique dans un seul artefact.

## Caveats operationnels que les equipes doivent anticiper

ATP est strict par design, ce qui est utile mais implique des attentes :

- la qualite du graphe compte : des noeuds flous creent de la friction d'execution
- la discipline de decomposition est essentielle pour une livraison atomique
- les reports doivent etre concrets pour conserver le contexte downstream
- la memory governance (`docs/memory/*`) doit etre consideree comme obligatoire en flux multi-worker

En bref, ATP ne supprime pas le travail de planification. Il rend la qualite de planification visible et applicable.

## Modele mental de bout en bout

Si vous devez retenir une seule chose, retenez celle-ci :

ATP n'est pas une to-do list avec des workers AI branches dessus. C'est un protocole ou planification, orchestration et execution sont synchronisees via un lifecycle DAG typise unique.

`atp_schema.json` definit le contrat.
`atp-mcp-server` impose l'integrite du lifecycle.
`atp-runner` execute la boucle.
`atp-visualizer` rend l'etat observable.

Cette combinaison permet aux equipes de passer d'un seul worker a plusieurs sans sacrifier determinisme, auditabilite ou correction des dependances.
