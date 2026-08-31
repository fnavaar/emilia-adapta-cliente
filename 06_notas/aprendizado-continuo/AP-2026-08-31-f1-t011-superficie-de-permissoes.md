# AP-2026-08-31-F1-T011 — Validar superfície de permissões além do backend

- Status: candidato
- Escopo: projeto do cliente
- Task/SPEC: F1-T011 / SPEC-1-004
- Sinal: uma configuração de RLS pode estar correta no backend e ainda assim não ser demonstrável se a interface não expuser as ações permitidas, a consulta do histórico e contas de teste por papel.
- Evidência: debug registrado em `06_notas/debug/debug-2026-08-31-f1-t011.md`; falha inicial no teste humano; correção validada no QA v0.0.60 e aprovada por Fernanda no preview.
- Regra reutilizável: para tasks de permissão, validar separadamente regra de backend, ação visível permitida, ação visível negada, consulta autorizada e cenário com usuário de teste.
- Quando aplicar: sempre que uma task depender de demonstração por perfis ou RLS.
- Quando não aplicar: quando a task for exclusivamente de backend e não tiver critério de demonstração no produto.
- Confiança: alta — causa raiz e correção foram reproduzidas e aprovadas em teste humano.
- Privacidade: sem segredo, dado pessoal ou conteúdo bruto
