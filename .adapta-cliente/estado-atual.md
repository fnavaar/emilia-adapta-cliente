# Estado atual — Adapta Cliente

- task_id: F1-T004
- champion: Fernanda (CEO)
- spec: 04-fase-atual/specs/spec-1-002-briefing-condicional.md
- etapa: aguardando_autorizacao
- autorizacao_implementacao: ausente
- teste_humano: pendente
- verificacao_automatica: pendente; análise sem alterações de produto
- aprendizado: pendente
- ultima_acao: F1-T004 analisada; critério confirmado como aprovação de matriz para evento, degustação, revendedor e bem-nascido, com campos mínimos, responsável e confirmação antes de Em proposta
- proxima_acao: aguardar autorização para consolidar a matriz
- atualizado_em: 2026-08-27T18:55:00-03:00

## Análise da F1-T004

- **Objetivo:** produzir e aprovar uma matriz operacional de briefing condicional antes de liberar a transição comercial para Em proposta.
- **Resultado observável:** para cada contexto, a equipe sabe quais campos são mínimos, quem deve preencher/validar, o que fica como pendência e qual confirmação humana é necessária antes de avançar.
- **Escopo:** quatro contextos previstos na task: evento, degustação, revendedor e bem-nascido.
- **Base já validada:** cliente, pessoa, oportunidade, evento, pendência e histórico são entidades separadas; segmento e dados do evento pertencem à oportunidade; o primeiro cadastro não deve exigir dados completos de fechamento.
- **Decisões que a matriz precisa explicitar:** campos mínimos por contexto; responsável nominal por coleta, validação e decisão; condição de completude; confirmação humana antes de Em proposta; tratamento de campo ausente como pendência com motivo, dono, próxima ação e prazo.
- **Fora do escopo:** preço, desconto, produção, estoque, integração externa e automação de transição sem confirmação.
- **Riscos:** liberar proposta com informação insuficiente; misturar dados do cliente com dados do evento; perder o dono da pendência; automatizar uma decisão comercial sem confirmação.
- **Provas planejadas:** matriz versionada; quatro exemplos de contexto; campo ausente gerando pendência; responsável e prazo visíveis; confirmação explícita antes de Em proposta; regressão para garantir que a matriz não altera cadastro nem política comercial.
- **Dependência:** a SPEC não foi retornada pelo conector no caminho esperado; a tabela operacional fornece o critério e os limites mínimos. Se houver divergência material na SPEC, parar antes da implementação.
