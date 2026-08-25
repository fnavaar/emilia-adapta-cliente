# Debug Summary — F1-T002 — Erro de salvamento e Tipo de Cliente

- **Task**: F1-T002.
- **Sintoma**: cadastro continuava retornando erro; campo deveria se chamar Tipo de Cliente e aparecer primeiro.
- **Causa raiz confirmada**: o backend aceitava o payload quando autenticado; o formulário enviava a tentativa antes de garantir sessão válida e mantinha estado complexo que dificultava o diagnóstico. O fluxo também não tinha validação clara antes do envio.
- **Correção**: login com redirecionamento após autenticação; formulário valida sessão, nome, telefone, tipo de cliente e campos condicionais antes de enviar; payload usa nomes compatíveis e telefones apenas com dígitos.
- **Layout**: Tipo de Cliente é o primeiro campo.
- **Cerimonialista**: nome do cliente representa a empresa, sem repetição de nome da empresa.
- **Telefones**: máscara brasileira na tela, Brasil como padrão e opção internacional preservada.
- **Verificação automática**: versão 0.0.14; setup, análise estática, build, integrações e testes passaram.
- **Verificação manual**: login no preview; Tipo de Cliente no topo; Cerimonialista selecionado; Romy Godoy Assessoria, telefone principal e contato preenchidos; cadastro salvo; dashboard passou a mostrar 5 clientes.
- **Gate atual**: aguardando teste humano final.
