# AP-2026-08-28-1435 — Busca com inclusão no próprio dropdown

- Status: candidato
- Escopo: projeto do cliente
- Task/SPEC: F1-T004 / SPEC-1-002
- Sinal: a confirmação de cliente exige busca incremental por nome ou telefone e a ação de inclusão deve aparecer dentro da própria lista de resultados, sem botão separado na tela.
- Evidência: preview do Nexus Emilia, versão 0.0.42; digitação de `marl` filtrou cliente e exibiu "+ Adicionar novo" na mesma lista; teste humano aprovado pela Fernanda em 2026-08-28.
- Regra reutilizável: em campos de relacionamento com cadastro progressivo, usar combobox único com filtragem incremental e ação de adicionar novo como último item do dropdown.
- Quando aplicar: buscas de cliente, pessoa, contato ou entidade relacionada em que o usuário possa não encontrar um cadastro existente.
- Quando não aplicar: quando a seleção exigir múltiplos valores, revisão antes de criar ou uma ação de adição fora do contexto por regra de permissão.
- Confiança: alta — comportamento foi solicitado, implementado e validado no preview.
- Privacidade: sem segredo, dado pessoal ou conteúdo bruto
