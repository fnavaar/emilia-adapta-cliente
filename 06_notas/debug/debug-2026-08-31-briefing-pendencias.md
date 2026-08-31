# Debug Summary — F1-T006

- **Task e problema:** F1-T006; a conexão dos novos blocos de pendências e conflitos à tela NovaOportunidade deixou o arquivo temporariamente inválido e impediu a aplicação completa.
- **Reprodução:** após o patch incremental, o arquivo continha marcadores residuais de edição e um fechamento incompleto no handler `registrarDecisao`; o QA detectou `Unexpected token` no build.
- **Causa raiz:** aplicação do bloco de substituição em posição inválida, seguida de correções incrementais sobre um arquivo já alterado.
- **Correção:** restauração controlada da tela íntegra; reaplicação dos estados, handlers e blocos visuais em posições únicas; correção do fechamento sintático; migration 0018 preservada.
- **Verificação automática:** QA Skip 0.0.52 passou em setup, análise estática, build, integrações e testes. Preview atualizado com ações para informação faltante e valor contraditório.
- **Gate atual:** aguardando teste humano.
