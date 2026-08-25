# Estado atual — Adapta Cliente

- task_id: F1-T001
- champion: Fernanda (CEO)
- spec: 04-fase-atual/specs/spec-1-001-registro-canonico.md
- etapa: aguardando_teste_humano
- autorizacao_implementacao: confirmada em 2026-08-25 11:22; trecho: "você está autorizado para implementar essa tarefa"
- teste_humano: pendente
- verificacao_automatica: passou — 6 coleções criadas no Skip Cloud, 3 usuários seed, migração aplicada com QA OK
- aprendizado: pendente
- ultima_acao: Migração 0001 aplicada com sucesso (clientes, participantes, oportunidades, pendencias, historico_eventos, dados_entrega + seed users)
- proxima_acao: Teste humano — Fernanda deve acessar https://nexus-emilia-49529--preview.goskip.app e criar um registro de teste
- atualizado_em: 2026-08-25T11:36:00-03:00

## Evidência da F1-T001

- Projeto Skip Nexus Emilia, id 52694, preview `https://nexus-emilia-49529--preview.goskip.app`
- Migração: `pocketbase/migrations/0001_criar_entidades.js`
- Versão: 0.0.2 (hash: b70f57e)
- QA: setup OK, staticAnalysis OK, build OK, integrations OK, test OK
- Coleções criadas:
  - `clientes` (pbc_279994318) — 12 campos + 2 índices
  - `participantes` (pbc_4040350901) — 7 campos + 1 índice
  - `oportunidades` (pbc_384056131) — 15 campos + 4 índices
  - `pendencias` (pbc_3797632525) — 9 campos + 3 índices
  - `historico_eventos` (pbc_3357947086) — 5 campos + 1 índice
  - `dados_entrega` (pbc_1714801012) — 15 campos + 1 índice
- Usuários seed: Fernanda, Mara, Anie (senha: Emilia@2026)
- Produção não alterada (isPublished: false)

## Confirmações recebidas

- Fernanda e Mara: gestão/admin
- Anie: atendimento
- `valor_estimado`: preenchimento obrigatório
- 13 campos extras de entrega: todos como Texto com regra de impressão
- API GestãoClick: documentada para futura integração
