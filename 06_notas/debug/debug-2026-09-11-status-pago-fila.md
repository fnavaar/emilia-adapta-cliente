# Debug Summary — F2-T008 — status pago no Preview

**Data:** 2026-09-11
**Sintoma relatado:** ainda aparece “conferido” e não “pago”.

## Evidências recebidas

1. Primeiro anexo: mensagem “O orçamento não pode ser aprovado sem política comercial aprovada.” — bloqueio esperado do fluxo de aprovação, não é a fila financeira.
2. Segundo anexo: cards da Fila Financeira com badges “Divergente” e “Conferido”, sem o prefixo “Pagamento:” introduzido na versão 0.0.98.

## Diagnóstico

O segundo anexo comprova que a tela da Fernanda renderizava um bundle anterior à 0.0.98. Duas causas combinadas:

- A URL de **produção** (`nexus-emilia-49529.goskip.app`) só atualiza quando o projeto é publicado explicitamente; ela estava servindo uma versão antiga.
- Cache do navegador pode manter bundle antigo mesmo após deploy.

## Correção aplicada (0.0.98 → 0.0.99)

- Badge do pagamento: “Pagamento: Pago” quando conferido.
- Badge do pedido separado: “Pedido: Pago” ou “Pedido: Parcialmente pago”.
- Botão de ação renomeado para “Marcar como pago”.
- Mensagem pós-ação: “Pagamento marcado como pago.”
- Nenhuma ocorrência visível da palavra “conferido” na fila.

## Verificação automática

- QA 0.0.99 passou (setup, análise estática, build, integrações, testes).
- Produção republicada em 2026-09-11 21:38 (ref 597c62e).
- Fila verificada nas URLs de preview e produção com conta Financeiro de homologação: pagamento conferido exibe “Pagamento: Pago” e “Pedido: Pago/Parcialmente pago”; sem “conferido”.

## Gate

aguardando_teste_humano — Fernanda reabrir /financeiro/fila (com hard refresh se necessário) e retestar o passo 8.
