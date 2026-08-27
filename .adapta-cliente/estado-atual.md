# Estado atual — Adapta Cliente

- task_id: F1-T003
- champion: Fernanda (CEO)
- spec: 04-fase-atual/specs/spec-1-001-registro-canonico.md
- etapa: aguardando_autorizacao
- autorizacao_implementacao: ausente
- teste_humano: pendente
- verificacao_automatica: pendente; análise sem alterações de produto
- aprendizado: pendente
- ultima_acao: F1-T003 analisada após conclusão da F1-T002; coleções, telas e pré-condições conferidas
- proxima_acao: aguardar autorização para implementar
- atualizado_em: 2026-08-27T18:30:00-03:00

## Análise da F1-T003

- **Objetivo:** configurar busca/reuso, sinalização de duplicidade e reversão não destrutiva.
- **Critério:** repetição por `source_ref` reutiliza o vínculo; possível duplicidade gera decisão humana; rollback de teste preserva o original e o histórico.
- **Estado atual:** `clientes` possui `source_ref`, índice e relação opcional com `pessoas`; `pessoas` possui índice de telefone; `clientes_pessoas` possui vínculo titular com índice único; `historico_eventos` e `pendencias` existem. O cadastro de cliente já busca Pessoa por telefone e alerta duplicidade, mas não possui fluxo por `source_ref`, decisão persistida, histórico dessa decisão ou rollback de fixture.
- **Oportunidade existente:** `NovaOportunidade.tsx` já grava `source_ref` quando informado no estado, mas não exibe campo para ele, não verifica repetição e não oferece decisão humana antes da criação.
- **Escopo proposto:** adicionar identificador de origem no fluxo de oportunidade; detectar repetição antes de criar; mostrar candidatos e opções explícitas de reutilizar ou criar novo; registrar a decisão em `historico_eventos`; manter o original intacto; implementar rollback somente para fixture/teste, sem apagar legado.
- **Fora do escopo:** merge automático, exclusão/sobrescrita de legado, integração externa, produção e novas regras comerciais.
- **Riscos e controles:** source_ref repetido não pode criar novo vínculo silenciosamente; duplicidade por telefone/nome exige decisão humana; rollback não pode apagar o original nem histórico; RLS deve impedir acesso cruzado; mensagens devem explicar a consequência de cada escolha.
- **Provas planejadas:** fixture original; repetição idêntica por `source_ref`; candidato semelhante; reuso confirmado; criação de novo preservando original; rollback da fixture preservando histórico; testes negativos para não mesclar/apagar; QA, build e teste humano no preview.
- **Dependência/atenção:** a SPEC do repositório ainda contém nomenclatura anterior de Tipo de Cliente, enquanto a emenda funcional de 2026-08-27 usa Natureza/Classificação. A implementação da F1-T003 não deve alterar essa decisão nem expandir o escopo.
