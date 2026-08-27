# Estado atual — Adapta Cliente

- task_id: F1-T003
- champion: Fernanda (CEO)
- spec: 04-fase-atual/specs/spec-1-001-registro-canonico.md
- etapa: aguardando_autorizacao
- autorizacao_implementacao: ausente
- teste_humano: pendente
- verificacao_automatica: pendente; análise sem alterações de produto
- aprendizado: pendente
- ultima_acao: F1-T003 analisada; escopo delimitado para busca/reuso, sinalização de duplicidade com decisão humana e rollback não destrutivo
- proxima_acao: aguardar autorização para implementar
- atualizado_em: 2026-08-27T18:25:00-03:00

## Análise da F1-T003

- Critério: repetição por `source_ref` reutiliza o vínculo; possível duplicidade gera decisão humana; rollback de teste preserva original e histórico.
- Estado atual: busca de Pessoa por telefone e alerta de duplicidade já existem em `src/pages/NovoCliente.tsx`; não há ainda fluxo de `source_ref`, tela/lista de candidatos, decisão explícita de reuso nem recibo de rollback.
- Estrutura existente: coleções `clientes` com `source_ref` e índice; `pessoas` com índice de telefone; `clientes_pessoas` com vínculo único por cliente/pessoa/papel; `historico_eventos` e `pendencias` disponíveis.
- Recorte proposto: adicionar um identificador de origem no cadastro/oportunidade de teste, persistir e detectar repetição; exibir candidatos sem mesclar automaticamente; exigir ação humana para reutilizar ou criar novo; registrar histórico; implementar rollback de fixture sem apagar o original.
- Fora do escopo: integração externa, merge automático, exclusão de legado, alteração de produção e nova regra de negócio não prevista na SPEC.
- Riscos: não duplicar registros ao repetir o mesmo `source_ref`; não sobrescrever dados; manter histórico; bloquear rollback destrutivo; respeitar RLS; mensagens acessíveis para decisão humana.
- Provas planejadas: fixture original; repetição idêntica; candidato semelhante com decisão humana; criação de novo sem alteração do original; rollback da fixture preservando histórico; QA, build, testes e teste humano no preview.
