# Estado atual — Adapta Cliente

- task_id: F1-T002
- champion: Fernanda (CEO)
- spec: 04-fase-atual/spec-1-001-registro-canonico.md
- etapa: em_correcao
- autorizacao_implementacao: confirmada em 2026-08-25; trecho: "pode implementar o plano"
- teste_humano: falhou em 2026-08-25 16:10; novo teste não solicitado
- verificacao_automatica: passou no QA da versão 0.0.10; correção de telefone e erro de salvamento em andamento
- aprendizado: pendente
- ultima_acao: Novo requisito recebido: Brasil como padrão e possibilidade de telefone internacional
- proxima_acao: Aplicar máscara por país, corrigir persistência dos campos condicionais e executar QA
- atualizado_em: 2026-08-25T16:31:00-03:00

## Requisitos confirmados no debug

- O campo Nome dos Noivos deve aparecer somente para Casamento / Noiva.
- Telefones devem ter máscara, não ser texto livre.
- Brasil (+55) é o país padrão.
- Contatos de outros países também devem ser aceitos em formato internacional.
- A regra vale para telefone principal, secundário e telefone de contato de empresa.
- Cerimonialista: o nome do cliente já representa a empresa; não exigir repetição desnecessária.
- A correção deve preservar dados existentes e não alterar produção.
