# Estado atual — Adapta Cliente

- task_id: F1-T015
- champion: Fernanda (CEO)
- spec: 04_fase-atual/specs/spec-1-005-webhook-fallback.md
- etapa: em_correcao
- autorizacao_implementacao: confirmada em 2026-09-02 12:57; trecho: "pode implementar"
- teste_humano: pendente
- verificacao_automatica: falhou; regressão revelou falha no harness — reexecução de fixture já persistida (ex.: FIX-1-404) tenta recriar event_id e recebe 400 validation_not_unique; evento 401/404/405 ficaram persistidos pelo teste humano da F1-T014 e o harness não trata upsert/reexecução. Logs Skip confirmam 400 em POST integration_events (16:01Z).
- aprendizado: pendente
- ultima_acao: F1-T015 em execução; regressão inicial executou 401 (duplicate pois já processado), 402 (duplicate), 403 (integration_conflict); 404 falhou com "Failed to create record" por índice único; diagnóstico registrado
- proxima_acao: corrigir harness para reexecução idempotente (upsert por event_id) e re-executar regressão completa
- atualizado_em: 2026-09-02T13:05:00-03:00