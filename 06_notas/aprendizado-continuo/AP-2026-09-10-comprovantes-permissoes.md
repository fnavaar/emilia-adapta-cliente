# AP-2026-09-10 — Comprovante versionado e separação de acesso financeiro

- Status: candidato
- Escopo: projeto do cliente
- Task/SPEC: F2-T004 / SPEC-2-002
- Sinal: o Atendimento precisa operar e consultar comprovantes do pedido, mas não pode confirmar, editar ou apagar pagamentos; Produção não pode acessar comprovantes ou dados financeiros.
- Evidência: `05_entregas/F2-T004-recibo-comprovantes-permissoes.md` e aprovação humana registrada em 2026-09-10.
- Regra reutilizável: preservar comprovantes e planos de pagamento por versões não destrutivas; separar permissão operacional de Atendimento, conferência de Financeiro, alçada de Administrador e execução sem acesso financeiro da Produção.
- Quando aplicar: em comprovantes, alterações de forma de pagamento, RLS e telas por papel do fluxo comercial/financeiro.
- Quando não aplicar: não liberar relatórios financeiros globais ao Atendimento sem regra específica de atribuição e visibilidade.
- Confiança: alta — regra confirmada pela Gestão e formalizada na SPEC.
- Privacidade: sem segredo, dado pessoal ou conteúdo bruto.
