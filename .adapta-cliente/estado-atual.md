# Estado atual — Adapta Cliente

- task_id: F1-T002
- champion: Fernanda (CEO)
- spec: 04-fase-atual/specs/spec-1-001-registro-canonico.md
- etapa: em_correcao
- autorizacao_implementacao: confirmada em 2026-08-25 15:52; trecho: "pode implementar o plano"
- teste_humano: falhou em 2026-08-25 16:01; preview continuou sem permitir acesso ao sistema
- verificacao_automatica: falhou — QA da migração 0002 passou, mas login humano não autenticou
- aprendizado: pendente
- ultima_acao: Reproduzido no preview; tela de login aparece, porém credencial seed não conclui autenticação
- proxima_acao: Corrigir definição das senhas seed usando a API própria de senha do PocketBase e repetir login
- atualizado_em: 2026-08-25T16:03:00-03:00

## Diagnóstico inicial

- Preview confirmado: `https://nexus-emilia-49529--preview.goskip.app/login`.
- A tela de login atual aparece no navegador.
- Ao usar `fernanda@emiliabemcasados.local` e `Emilia@2026`, a tela permanece em `/login`.
- Hipótese confirmada pelo código da migração: usuários foram criados com `password` e `passwordConfirm` no objeto Record, em vez de `setPassword`, conforme regra do runtime de migrações.
