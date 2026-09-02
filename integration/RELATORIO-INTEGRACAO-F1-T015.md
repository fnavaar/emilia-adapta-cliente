# Relatório de Integração — F1-T015

**Task:** F1-T015 · Executar regressão do consumidor e comprovar bloqueio de ativação externa
**SPEC:** SPEC-1-005 (`/04_fase-atual/specs/spec-1-005-webhook-fallback.md`)
**Data:** 2026-09-02
**Ambiente:** homologação (preview `nexus-emilia-49529--preview.goskip.app`) · versão **0.0.75** (`909c60e`)
**Executado por:** ETHOS (Bia) com autorização de Fernanda (2026-09-02 12:57)

## Sumário

Regressão final do consumidor executada com as cinco fixtures no harness administrativo. Todos os cenários atingiram o resultado esperado, nenhuma escrita canônica indevida ocorreu e **nenhum endpoint ou credencial externa foi ativado**: B1-INT-01 permanece como bloqueio explícito (CA-1-406 atendido).

## Cenários executados

| Fixture | Cenário | Resultado esperado | Resultado obtido | Escrita canônica |
|---|---|---|---|---|
| FIX-1-401 | Válida, novo event_id | processed (ou duplicate se já processado) | `duplicate` (evento já existia do teste da F1-T014, mesmo hash) | não (reuso) |
| FIX-1-402 | Mesmo event_id, mesmo hash | duplicate | `duplicate` | não |
| FIX-1-403 | Mesmo event_id, hash divergente | integration_conflict | `integration_conflict` | não |
| FIX-1-404 | Campo obrigatório ausente | rejected | `rejected` | não |
| FIX-1-405 | Destino indisponível simulado | manual_reconciliation | `manual_reconciliation` | não |

## Evidência de dados (API PocketBase de homologação)

- `integration_events` (append-only): `fixture-401` processed, `fixture-404` rejected (schema_required_field), `fixture-405` manual_reconciliation (destination_timeout). Índice único por `event_id` preservado; nenhum evento duplicado.
- `integration_fallbacks` (fila reconciliável): 4 ocorrências (401 conflito, 404 schema, 405 timeout) com `source_ref`, `responsible` (admin), `next_action` e status `aberta`.
- `clientes` (registro canônico): somente `Cliente Fixture 401` (`fixture:customer:401`) persistido; nenhuma duplicata criada pelas fixtures 402/403/404/405.

## Falha encontrada e correção (durante a regressão)

- **Sintoma:** reexecução da FIX-1-404 falhava com 400 `validation_not_unique` ("Failed to create record"); o harness tentava recriar um `event_id` já persistido e não tratava o retorno.
- **Causa:** harness da F1-T014 criava eventos com `create` direto e não era idempotente para reexecução; `integration_events.updateRule` é `null` por desenho (append-only).
- **Correção (v0.0.74 → v0.0.75):** `saveEvent` passou a devolver o evento existente em reexecução (append-only respeitado); `saveFallback` passou a fazer upsert por `event_id` para registrar a ocorrência reconciliável; caminho "novo" reutiliza cliente por `source_ref` (CA-1-401/CA-1-402 intactos).
- **QA:** setup, análise estática, build, integrações e testes **passaram** (v0.0.75). Reexecução completa no preview confirmou a regressão.

## Prova de bloqueio de ativação externa (CA-1-406)

- `.env` contém apenas `VITE_POCKETBASE_URL` interno (host `*.internal.goskip.dev`), sem credencial.
- Secrets do projeto: apenas os de sistema do Skip (PB_INSTANCE_URL, PB_SUPERUSER_TOKEN, SITE_URL, SKIP_AI_GATEWAY_*). Sem token de Digisac/GestãoClick/WhatsApp.
- Varredura em `src/` e `integration/`: nenhuma URL externa (Digisac, GestãoClick, WhatsApp, correios) ou credencial.
- Nenhum endpoint externo foi ativado; harness opera exclusivamente em modo fixture (`test_mode=true`, origem `fixture`).
- **B1-INT-01 permanece bloqueando ativação externa** até confirmação de endpoint, autenticação, payload real, credencial de homologação, limites e autorização de escrita.

## Logs (sanitizados)

Registros do backend em 2026-09-02 16:01Z: `POST /api/collections/integration_events/records` → 400 (pré-correção, fixture 404) e depois 200 na reexecução pós-correção; `POST integration_fallbacks` → 200. Nenhum log contém senha, token ou dado pessoal real.

## Estado final e rollback

- Nenhuma alteração em produção; eventos de teste rastreáveis por `event_id`/`trace_id` (`trace-fixture-*`).
- Rollback previsto: desativar consumidor de teste, marcar eventos pendentes e remover vínculo de fixture sem apagar registro canônico; preservar logs sanitizados.
- Próxima ação do fluxo: teste humano da regressão no preview.