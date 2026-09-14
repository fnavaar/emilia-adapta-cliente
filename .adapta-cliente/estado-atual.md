# Estado atual — Adapta Cliente

- task_id: F3-T004
- champion: Fernanda (CEO)
- spec: 04_fase-atual/specs/spec-3-002-jornadas-especiais.md
- etapa: aguardando_teste_humano (2ª rodada)
- autorizacao_implementacao: confirmada em 2026-09-14 12:40; "Pode implementar a F3-T004"
- teste_humano: 1ª rodada trouxe 1 achado (degustação não é tipo de evento) + 1 dúvida de navegação (pendências); correções aplicadas e reprovadas na instância; aguardando nova validação
- verificacao_automatica: passou; suíte 24/24 invariantes; tsc/lint/format/build limpos; QA Skip 0.0.121-0.0.124 PASS; provas na instância: config_jornadas (4 jornadas), RLS CA-3-031, 7 pendências jornada_* das fixtures, e após as correções: casamento + solicitou_degustacao + Envio Sedex sem frete → pendência RN-3-101; casamento + degustação presencial → avança
- correcoes_pos_teste: degustação removida do select Tipo de Evento; marcador "Cliente solicitou degustação?" (checkbox, vale para qualquer evento); hook valida frete do marcador no fluxo de jornada E no núcleo; Dashboard agora lista as 5 pendências mais recentes no card "Pendências em Aberto"
- aprendizado: pendente (registrar no fechamento: degustação é marcador, não tipo de evento — correção de modelagem da Champion; offset de ordinais Skip vs repo; findFirstRecordByFilter lança "no rows" em tabela vazia)
- ultima_acao: correções da 1ª rodada de teste implementadas, aplicadas no Skip (0.0.124) e alinhadas no GitHub (commit e4ccef1)
- proxima_acao: aguardar nova validação da Fê para concluir a task
- atualizado_em: 2026-09-14T13:35:00-03:00
