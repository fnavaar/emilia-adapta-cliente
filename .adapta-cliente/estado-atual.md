# Estado atual — Adapta Cliente

- task_id: F2-T007
- champion: Fernanda (CEO)
- spec: 04_fase-atual/specs/spec-2-002-aprovacao-conversao-fila-financeira.md
- etapa: em_correcao
- autorizacao_implementacao: confirmada em 2026-09-11; “pode”
- teste_humano: falhou em 2026-09-11; itens 1 e 2 ok, rascunho não salva
- verificacao_automatica: passou antes da correção; falha reproduzida no salvamento do primeiro item
- aprendizado: pendente
- ultima_acao: causa provável confirmada: o primeiro item do orçamento é enviado com ordem=0 e o backend rejeita o valor como campo obrigatório vazio; Fernanda também definiu preferência de vocabulário: usar “orçamento” no lugar de “proposta” na interface
- proxima_acao: corrigir a ordem inicial dos itens e os textos visíveis, rodar QA e repetir a prova de salvamento
- atualizado_em: 2026-09-11T17:40:00-03:00