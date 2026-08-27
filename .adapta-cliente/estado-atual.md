# Estado atual — Adapta Cliente

- task_id: F1-T002
- champion: Fernanda (CEO)
- spec: 04_fase-atual/spec-1-001-registro-canonico.md + especificação funcional enviada em 2026-08-27
- etapa: em_correcao
- autorizacao_implementacao: confirmada em 2026-08-27; trecho: "sim"
- teste_humano: aprovado para a base, mas correção de salvamento ainda não aprovada
- verificacao_automatica: versão 0.0.32 passou em setup, staticAnalysis, build, integrations e test; teste real do submit ainda falhou
- aprendizado: pendente
- ultima_acao: layout do telefone corrigido e texto de verificação removido; inspeção DOM mostrou botão sem disparar requisição no preview; API direta aceita cliente mínimo
- proxima_acao: Retomar com investigação do evento React/Skip que impede o handler do botão de disparar, sem alterar o banco
- atualizado_em: 2026-08-27T16:59:00-03:00

## Evidência

- Preview: https://nexus-emilia-49529--preview.goskip.app
- Versão atual: 0.0.32, hash `f840787`.
- Backend: criação direta de Cliente mínimo retornou HTTP 200; criação com `pessoa_id` também retornou HTTP 200.
- Browser: login passou; formulário mostrou Brasil como padrão e opção Outro país; telefone brasileiro apareceu completo; botão Salvar Cliente permaneceu na tela e não gerou nova requisição.
- DOM: botão renderizado como `type="button"`, sem requisição após clique; formulário com `noValidate`.
- Produção não publicada nem alterada.
- Diagnóstico detalhado: `artifacts/debug_f1_t002_salvamento_pendente.md`.
