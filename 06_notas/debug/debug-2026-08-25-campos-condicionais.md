# Debug Summary — F1-T002 — Campos condicionais

- **Task e problema**: F1-T002; após a alteração, o campo Nome dos Noivos ainda era exibido fixo no formulário.
- **Reprodução**: código anterior confirmado com `nome_noivos` fixo; versão 0.0.10 foi publicada no Skip e o QA passou. Em nova sessão de navegador, o login não avançou de `/login`, impedindo validar o formulário corrigido no fluxo real.
- **Causa raiz confirmada do sintoma original**: `src/pages/NovoCliente.tsx` renderizava `nome_noivos` sem verificar o segmento; os dados condicionais não eram refletidos na UI.
- **Correção aplicada**: migração 0005 adicionou os campos de apoio; `NovoCliente.tsx` passou a renderizar os campos conforme o segmento: casamento, eventos sociais, maternidade, corporativo, cerimonialista, revenda/parceiros, presentes e outros.
- **Verificação automática**: versão 0.0.10; setup, análise estática, build, integrações e testes passaram.
- **Verificação de navegador**: inconclusiva; uma sessão anterior autenticou, mas a nova sessão permaneceu em `/login`. Não declarar a correção como aprovada.
- **Gate atual**: em correção; investigar autenticação inconsistente antes de solicitar novo teste humano.
