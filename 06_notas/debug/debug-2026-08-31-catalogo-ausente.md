# Debug Summary — F1-T009

- **Task e problema:** F1-T009; o campo Opção aprovada do catálogo não apareceu no formulário no primeiro teste humano.
- **Reprodução:** o código carregava itens aprovados e possuía o handler de seleção, mas o bloco visual do `<select>` não estava renderizado no formulário.
- **Causa raiz:** a primeira alteração adicionou a lógica e os estados, mas não inseriu o componente visual no ponto correto da tela.
- **Correção:** inclusão do bloco visual no formulário, exibindo somente itens com `review_status = aprovado`, código, label e versão.
- **Verificação automática:** QA Skip 0.0.55 passou em setup, análise estática, build, integrações e testes.
- **Verificação no preview:** após login, o campo apareceu e listou `PAP-CREP-ENC-001 · Papel crepom encerado azul marinho · v2026.1`.
- **Gate atual:** aguardando novo teste humano.
