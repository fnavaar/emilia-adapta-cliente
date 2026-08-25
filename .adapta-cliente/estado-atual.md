# Estado atual — Adapta Cliente

- task_id: F1-T002
- champion: Fernanda (CEO)
- spec: 04_fase-atual/specs/spec-1-001-registro-canonico.md
- etapa: aguardando_teste_humano
- autorizacao_implementacao: confirmada em 2026-08-25; trecho: "sim, pode atualizar"
- teste_humano: pendente após nova implementação
- verificacao_automatica: passou — QA completo da versão 0.0.18; migrations 0007 e 0008 aplicadas; schema confirmado
- aprendizado: pendente
- ultima_acao: Separados Tipo de Cliente no cadastro e Segmento/dados de evento na oportunidade; preview e backend verificados
- proxima_acao: Fernanda testar os cinco tipos de cliente e criar oportunidades com segmentos diferentes no preview
- atualizado_em: 2026-08-25T17:46:00-03:00

## Evidência

- Versão Skip: 0.0.18, hash `ade4dc2`.
- QA: setup, staticAnalysis, build, integrations e test passaram.
- Migration 0007 aplicada: separa `tipo_cliente` de `segmento`.
- Migration 0008 aplicada: `tipo_cliente` obrigatório no banco.
- Schema `clientes`: cinco tipos válidos — cliente_direto, cerimonialista, corporativo, revenda, parceiro.
- Schema `oportunidades`: segmento obrigatório e campos condicionais de evento.
- Navegador: login confirmado; cadastro exibe exatamente os cinco tipos; Cliente Direto exibe CPF obrigatório; oportunidade exibe Segmento separado.
- Produção não publicada nem alterada.
