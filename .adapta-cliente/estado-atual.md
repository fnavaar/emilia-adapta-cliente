# Estado atual — Adapta Cliente

- task_id: F1-T002
- champion: Fernanda (CEO)
- spec: 04_fase-atual/spec-1-001-registro-canonico.md + especificação funcional enviada em 2026-08-27
- etapa: aguardando_teste_humano
- autorizacao_implementacao: confirmada em 2026-08-27; trecho: "está correto, podemos prosseguir"
- teste_humano: pendente após implementação da base de cadastro
- verificacao_automatica: passou — QA completo da versão 0.0.20; migrations 0009 e 0010 aplicadas; schema confirmado
- aprendizado: pendente
- ultima_acao: Implementada base de Pessoa reaproveitável, Cliente com Natureza/Classificação exclusivas, cadastro progressivo, origem/categoria/referência e busca de Pessoa existente
- proxima_acao: Fernanda testar o cadastro progressivo, busca/reuso e origem por indicação no preview
- atualizado_em: 2026-08-27T15:58:00-03:00

## Evidência

- Versão Skip: 0.0.20, hash `0bad1a0`.
- QA: setup, staticAnalysis, build, integrations e test passaram.
- Migration 0009 aplicada: Pessoas, vínculo Cliente↔Pessoa, endereços cadastrais/entrega, banco de locais, origem, categoria e canal do pedido.
- Migration 0010 aplicada: vínculos de Pessoa/indicador/cerimonialista na origem.
- Schema confirmado: Cliente com situação, Natureza PF/PJ e Classificação única; CPF/CNPJ opcionais; Oportunidade com canal do pedido.
- Navegador: login confirmado; formulário mostra Natureza, Classificação, nome/telefone mínimos, busca de Pessoa e CPF opcional; produção não publicada nem alterada.
- Limitação desta rodada: o formulário principal ainda não exibe telas completas de endereços, empresas/grupos, equipe de cerimonialista e seleção visual do indicador; a base de dados e os vínculos foram preparados para a próxima camada da task.
