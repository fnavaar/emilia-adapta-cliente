# Estado atual — Adapta Cliente

- task_id: F1-T015
- champion: Fernanda (CEO)
- spec: 04_fase-atual/specs/spec-1-005-webhook-fallback.md
- etapa: aguardando_teste_humano
- autorizacao_implementacao: confirmada em 2026-09-02 12:57; trecho: "pode implementar"
- teste_humano: pendente
- verificacao_automatica: passou; QA v0.0.75 (setup, estática, build, integrações, testes) OK; regressão dos cinco cenários executada no preview com resultados esperados (401 duplicate, 402 duplicate, 403 integration_conflict, 404 rejected, 405 manual_reconciliation); falha de reexecução da 404 corrigida com harness append-only + fallback upsert; prova de não ativação externa registrada (B1-INT-01 mantido)
- aprendizado: pendente
- ultima_acao: F1-T015 implementada e verificada; relatório de integração criado em integration/RELATORIO-INTEGRACAO-F1-T015.md
- proxima_acao: teste humano da regressão no preview
- atualizado_em: 2026-09-02T13:10:00-03:00