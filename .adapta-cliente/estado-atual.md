# Estado atual — Adapta Cliente

- task_id: F1-T004
- champion: Fernanda (CEO)
- spec: 04-fase-atual/specs/spec-1-002-briefing-condicional.md
- etapa: aguardando_autorizacao
- autorizacao_implementacao: ausente
- teste_humano: pendente
- verificacao_automatica: pendente; análise sem alterações de produto
- aprendizado: pendente
- ultima_acao: regra de classificação por tipo de evento incorporada à análise da matriz
- proxima_acao: aguardar autorização para consolidar a matriz
- atualizado_em: 2026-08-28T12:05:00-03:00

## Análise da F1-T004

- **Objetivo:** produzir e aprovar uma matriz operacional de briefing condicional antes de liberar a transição comercial para Em proposta.
- **Resultado observável:** para cada contexto, a equipe sabe quais campos são mínimos, quem deve preencher/validar, o que fica como pendência e qual confirmação humana é necessária antes de avançar.
- **Fluxo de cadastro definido pela Fernanda:** o cadastro não precisa exibir Segmento como uma escolha independente. O sistema deve permitir selecionar o Tipo de evento e derivar/persistir o Segmento correspondente para filtros e relatórios.
- **Mapeamento aprovado para implementação:**
  - Casamento → segmento `casamento`;
  - Batizado, Bodas, Formatura e Aniversário → segmento `eventos sociais`;
  - Chá de bebê, Revelação e Maternidade → segmento `maternidade`;
  - Corporativo → segmento `corporativo`;
  - Outros → solicitar justificativa obrigatória e segmento `outros`.
- **Aniversário:** depois de escolher Aniversário, pedir subtipo obrigatório: infantil, debutante/bar, bat mitzvah ou adulto. Manter o subtipo filtrável separadamente.
- **Experiência proposta:** para ser fácil e intuitivo, mostrar primeiro uma lista única de Tipo de evento. O sistema exibe apenas os campos condicionais necessários, calcula o segmento em segundo plano e permite filtros posteriores por segmento, tipo e subtipo. Não duplicar uma seleção manual de segmento que pode gerar inconsistência.
- **Escopo:** matriz para evento, degustação, revendedor e bem-nascido, incluindo os campos mínimos, responsáveis, pendências e confirmação antes de Em proposta.
- **Base já validada:** cliente, pessoa, oportunidade, evento, pendência e histórico são entidades separadas; dados do evento pertencem à oportunidade; cadastro inicial não exige dados completos de fechamento.
- **Decisões que a matriz precisa explicitar:** campos mínimos por contexto; responsável nominal por coleta, validação e decisão; condição de completude; confirmação humana antes de Em proposta; campo ausente como pendência com motivo, dono, próxima ação e prazo.
- **Fora do escopo:** preço, desconto, produção, estoque, integração externa e automação de transição sem confirmação.
- **Riscos:** liberar proposta com informação insuficiente; misturar dados do cliente com evento; não persistir segmento derivado; perder subtipo de aniversário; aceitar Outros sem justificativa; perder dono da pendência; automatizar decisão comercial sem confirmação.
- **Provas planejadas:** matriz versionada; cadastro de cada tipo de evento; verificação dos segmentos derivados; subtipo obrigatório de Aniversário; justificativa obrigatória em Outros; filtros por segmento/tipo/subtipo; quatro contextos de briefing; campo ausente gerando pendência; confirmação explícita antes de Em proposta; regressão sem alteração de cadastro ou política comercial.
- **Dependência:** a SPEC não foi retornada pelo conector no caminho esperado; a tabela operacional e a decisão explícita da Fernanda fornecem o critério vigente. Se houver divergência material na SPEC, parar antes da implementação.
