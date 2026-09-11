# Debug Summary — F2-T008 — status pago no Preview

**Data:** 2026-09-11
**Sintoma relatado:** ainda aparece “conferido” e não “pago”.

## Evidências recebidas

1. Primeiro anexo: mensagem “O orçamento não pode ser aprovado sem política comercial aprovada.” — bloqueio esperado do fluxo de aprovação, não é a fila financeira.
2. Segundo anexo: dois cards da Fila Financeira (pedidos 544almaps7cgga2 e ub46hkz64xd6we6) com badge “Divergente”, sem o prefixo “Pagamento:” introduzido na versão 0.0.98.

## Diagnóstico

O segundo anexo comprova que o navegador da Fernanda está carregando um bundle anterior à 0.0.98: o layout antigo não exibe o prefixo “Pagamento:”. Na versão em produção (0.0.99), a palavra “conferido” não existe mais em nenhum texto visível da fila — o pagamento conferido exibe “Pagamento: Pago” e, quando aplicável, “Pedido: Pago” ou “Pedido: Parcialmente pago”.

Os cards do anexo estão em status “Divergente”, que corretamente não exibe “Pago”.

## Causa raiz

Cache do navegador servindo bundle anterior à 0.0.98, onde o texto “Pagamento conferido pelo Financeiro” ainda existia como detalhe do card.

## Correção aplicada (0.0.98 → 0.0.99)

- Badge do pagamento: “Pagamento: Pago” quando conferido.
- Badge do pedido separado: “Pedido: Pago” ou “Pedido: Parcialmente pago”.
- Botão de ação renomeado para “Marcar como pago”.
- Mensagem pós-ação: “Pagamento marcado como pago.”
- Nenhuma ocorrência visível da palavra “conferido” na fila.

## Verificação automática

- QA 0.0.99 passou (setup, análise estática, build, integrações, testes).
- Renderização verificada no Preview com conta Financeiro de homologação.

## Ação pendente

Fernanda fazer hard refresh (Ctrl+Shift+R) em `/financeiro/fila` e retestar o passo 8.
