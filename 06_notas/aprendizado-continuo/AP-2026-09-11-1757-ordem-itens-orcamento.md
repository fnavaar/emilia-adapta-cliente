# AP-2026-09-11-1757 — Ordem inicial de itens do orçamento

- Status: candidato
- Escopo: projeto do cliente
- Task/SPEC: F2-T007 / SPEC-2-002
- Sinal: o primeiro item do orçamento era enviado com `ordem=0`; o salvamento falhava no create do item, enquanto a correção para `ordem=1` permitiu criar orçamento, item e auditoria.
- Evidência: `06_notas/debug/debug-2026-09-11-salvamento-orcamento.md`; logs do backend; prova pós-correção e teste humano aprovado no Preview.
- Regra reutilizável: itens ordenáveis do montador devem iniciar em ordem 1 e o primeiro item deve ser validado pelo fluxo real da interface e pelo backend, não apenas pelo build.
- Quando aplicar: ao criar ou alterar listas ordenadas de itens em montadores do Nexus.
- Quando não aplicar: campos cujo domínio funcional seja explicitamente zero-based e cuja API tenha sido validada com esse contrato.
- Confiança: alta — causa reproduzida, correção observada no backend e fluxo confirmado pela Fernanda.
- Privacidade: sem segredo, dado pessoal ou conteúdo bruto.
