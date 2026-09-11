# Debug Summary — F2-T008 — status pago no Preview

**Data:** 2026-09-11
**Sintoma relatado:** ainda aparece “conferido” e não “pago”.

## Nova evidência recebida

O anexo mais recente não mostra a Fila Financeira nem o status “conferido”. Ele mostra a mensagem:

`O orçamento não pode ser aprovado sem política comercial aprovada.`

Essa mensagem é o bloqueio esperado para aprovação de um orçamento sem política comercial válida; não é uma falha da fila financeira.

## Verificação independente

A tela `/financeiro/fila` foi aberta no Preview com a conta de homologação Financeiro após a versão `0.0.99`. A renderização observada para o pagamento conferido foi:

- `Pagamento: Pago`;
- quando havia outra parcela pendente: `Pedido: Parcialmente pago`;
- para pedido integralmente pago: `Pagamento: Pago` e `Pedido: Pago`.

## Causa/estado

O sintoma “conferido” não foi reproduzido no Preview atual. O anexo recebido corresponde a outro fluxo, de bloqueio de aprovação sem política comercial, que está correto.

## Estado

Não fazer nova alteração até existir evidência do card da Fila Financeira que ainda mostre “conferido”. A F2-T008 permanece aberta até a confirmação correta.
