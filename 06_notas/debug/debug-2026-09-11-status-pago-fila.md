# Debug Summary — F2-T008 — status do pagamento na fila

**Data:** 2026-09-11
**Sintoma:** após a conferência, a tela mostrava “conferido” no passo final, enquanto a expectativa era “pago”.
**Ambiente:** Preview do Nexus Emilia, fila financeira.

## Reprodução

O backend registrou corretamente dois estados diferentes:

- `pagamentos.status = conferido`: aquele pagamento foi conferido;
- `pedidos.status_financeiro = pago` ou `parcial_em_dia`: resultado financeiro consolidado do pedido.

A interface usava apenas `pagamento.status` no badge principal. Em pedidos com mais de uma parcela, isso também poderia esconder que o pedido ainda estava parcialmente pago.

## Causa raiz

A apresentação confundia o status da parcela/pagamento com o status financeiro consolidado do pedido.

## Correção

- Badge principal agora usa `pedido.status_financeiro`.
- Exibe “Pago” somente quando o pedido está integralmente pago.
- Exibe “Parcialmente pago” ou “Parcialmente pago em atraso” quando ainda há parcelas pendentes.
- Mantém “Pagamento conferido pelo Financeiro” como detalhe do pagamento individual.

## Verificação automática

- QA versão `0.0.96`: setup, análise estática, build, integrações e testes passaram.
- Backend confirmou a distinção entre pagamento `conferido` e pedido `pago`/`parcial_em_dia`.
- Preview exibiu:
  - “Pago” para pedido integralmente conferido;
  - “Parcialmente pago” para pedido com outra parcela pendente;
  - detalhe “Pagamento conferido pelo Financeiro” no pagamento conferido.

## Gate

Correção concluída; aguardando novo teste humano no Preview. A F2-T008 continua aberta.
