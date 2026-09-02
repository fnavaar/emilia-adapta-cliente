# AP-2026-09-02-1315 — Reexecução de fixtures com append-only e fila reconciliável

- Status: candidato
- Escopo: projeto do cliente
- Task/SPEC: F1-T015 · SPEC-1-005 (TDD da SPEC; CA-1-401 a CA-1-406)
- Sinal: a regressão final revelou que o harness criava eventos de integração com `create` direto e falhava ao reexecutar fixture já persistida (`validation_not_unique`, 400), além de tentar `update` em coleção append-only (`Only superusers can perform this action`). A correção tornou a reexecução idempotente devolvendo o estado existente e usando upsert apenas na fila reconciliável.
- Evidência: regressão executada no preview v0.0.75 com os cinco cenários (duplicate, duplicate, integration_conflict, rejected, manual_reconciliation); logs do backend (400 pré-correção, 200 pós-correção); estado final em `integration_events` (3, append-only) e `integration_fallbacks` (4, com source_ref/responsável/próxima ação); relatório em `integration/RELATORIO-INTEGRACAO-F1-T015.md`; teste humano aprovado com captura.
- Regra reutilizável: em contrato de entrada de evento, separar registro canônico (append-only, índice único por event_id) da fila de erro (reconciliável, upsert por event_id). Reexecução de fixture deve devolver o estado existente (duplicate/conflict) em vez de recriar ou reescrever; nunca tentar `update` em coleção com updateRule null.
- Quando aplicar: desenho/regressão de harness, webhook ou bridge com idempotência e fallback; reexecução de fixtures para provar CA-1-4xx.
- Quando não aplicar: fluxo onde o último evento deve ser sobrescrito (ex.: correção de payload autorizada) — aí o append-only exige outra ocorrência, não update.
- Confiança: alta — causa raiz confirmada em logs e corrigida; regressão completa passou e foi aprovada por teste humano.
- Privacidade: sem segredo, dado pessoal ou conteúdo bruto.