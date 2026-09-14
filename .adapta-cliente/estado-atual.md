# Estado atual — Adapta Cliente

- task_id: F3-T004
- champion: Fernanda (CEO)
- spec: 04_fase-atual/specs/spec-3-002-jornadas-especiais.md
- etapa: aguardando_teste_humano (3ª rodada)
- autorizacao_implementacao: confirmada em 2026-09-14 12:40; "Pode implementar a F3-T004"
- teste_humano: 1ª rodada OK com 1 achado de modelagem (degustação não é tipo de evento) + 1 de visibilidade (pendências); 2ª rodada OK (Fê validou no preview; confusão preview×produção esclarecida — produção não é publicada por regra da fase); 3ª rodada em curso: modalidade da degustação como seletor (Presencial padrão, Entrega, Retirada)
- verificacao_automatica: passou; suíte 24/24 invariantes; tsc/lint/format/build limpos; QA Skip 0.0.121-0.0.125 PASS; provas na instância: config_jornadas (4 jornadas), RLS CA-3-031, fixtures das 4 jornadas, marcador solicitou_degustacao no núcleo e em jornada configurada, modalidade "entrega" sem frete → pendência RN-3-101, "presencial" (padrão) → avança
- aprendizado: pendente (registrar no fechamento: degustação é marcador, não tipo de evento; pendências precisam ser visíveis no painel; preview×produção — publicar/verificar a URL certa antes do teste humano; findFirstRecordByFilter lança "no rows" em tabela vazia)
- ultima_acao: seletor de modalidade implementado e aplicado (Skip 0.0.125, commit 78a1092 no GitHub); provas da modalidade na instância
- proxima_acao: aguardar validação da Fê (seletor de modalidade) para concluir a task
- atualizado_em: 2026-09-14T13:50:00-03:00
