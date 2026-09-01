# AP-2026-09-01-F1-T012 — Regressão de segurança precisa cobrir produto e backend

- Status: candidato
- Escopo: projeto do cliente
- Task/SPEC: F1-T012 / SPEC-1-004
- Sinal: uma regressão de permissões só é demonstrável quando combina regras de backend, mensagens visíveis, auditoria legível, revogação e bloqueio de autenticação.
- Evidência: QA v0.0.66; runtime confirmou criação auditada, negação registrada e revogação com login posterior bloqueado; teste humano aprovado por Fernanda.
- Regra reutilizável: validar cada controle em duas camadas: tentativa real no backend e experiência compreensível na interface; registrar ator, objeto, ação e resultado sem dados sensíveis.
- Quando aplicar: em qualquer task de RLS, auditoria, perfis ou revogação.
- Quando não aplicar: em mudanças sem controle de acesso ou persistência de eventos.
- Confiança: alta — cenário foi reproduzido tecnicamente e aprovado no preview.
- Privacidade: sem segredo, dado pessoal ou conteúdo bruto
