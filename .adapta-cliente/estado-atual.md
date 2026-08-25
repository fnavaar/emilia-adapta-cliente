# Estado atual — Adapta Cliente

- task_id: F1-T002
- champion: Fernanda (CEO)
- spec: 04-fase-atual/specs/spec-1-001-registro-canonico.md
- etapa: em_correcao
- autorizacao_implementacao: confirmada em 2026-08-25; trecho: "pode implementar o plano"
- teste_humano: falhou em 2026-08-25 16:10; novo teste não solicitado
- verificacao_automatica: passou no QA da versão 0.0.10, mas verificação de navegador falhou — login não avançou em nova sessão
- aprendizado: pendente
- ultima_acao: Campos condicionais implementados e QA OK; reprodução no navegador não confirmou login/fluxo completo
- proxima_acao: Diagnosticar por que a sessão do navegador não autentica de forma consistente antes de solicitar novo teste
- atualizado_em: 2026-08-25T16:12:00-03:00

## Diagnóstico atual

- A tela antiga continha `nome_noivos` fixo em `src/pages/NovoCliente.tsx`.
- A versão 0.0.10 contém campos condicionais e a migração 0005 adiciona campos correspondentes ao cadastro.
- QA automático passou.
- Na nova sessão de navegador, o preview abriu `/login`, mas após preencher e clicar em Entrar permaneceu em `/login`; não há evidência suficiente para considerar o fluxo validado.
- Task permanece em correção; não solicitar novo teste humano até confirmar a causa.
