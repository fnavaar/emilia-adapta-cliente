# Estado atual — Adapta Cliente

- task_id: CORREÇÃO-SEGMENTO-EVENTO
- champion: Fernanda (CEO)
- spec: 04-fase-atual/specs/spec-1-002-briefing-condicional.md
- etapa: aguardando_autorizacao
- autorizacao_implementacao: ausente para esta correção específica
- teste_humano: pendente
- verificacao_automatica: baseline analisado sem alteração de produto; F1-T013 permanece aguardando aprovação final; backend já possui `segmento`, `segmento_classificado` e `subtipo_evento`, mas o formulário usa `tipo_pedido` como campo principal
- aprendizado: pendente
- ultima_acao: requisito refinado por Fernanda: segmento ficará oculto e será salvo internamente; somente o tipo de evento será exibido no atendimento/cadastro
- proxima_acao: aguardar autorização para implementar o Tipo de evento visível com Segmento interno
- atualizado_em: 2026-09-01T18:00:00-03:00