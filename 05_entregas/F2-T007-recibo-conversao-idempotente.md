# Recibo F2-T007 — Estados, resposta e conversão idempotente

**Status:** concluída
**Data:** 2026-09-11
**Versão Preview:** 0.0.86
**Task:** F2-T007
**SPEC:** SPEC-2-002 — Aprovação, conversão e fila financeira controlada

## Entrega

- Migration `0031_pedidos_conversao.js` aplicada.
- Coleção `pedidos` separada de `propostas`.
- Coleção append-only `auditoria_pedidos`.
- Relação `propostas.pedido_id`.
- Endpoint autenticado `POST /backend/v1/propostas/{id}/resposta`.
- Ações `aprovar`, `recusar` e `devolver`.
- Resposta e conversão acessíveis pelo montador de orçamentos.
- Conversão transacional e idempotente.
- Interface operacional padronizada para “orçamento”.

## Regras implementadas

- Orçamento recusado vira `recusada` e não gera pedido.
- Orçamento devolvido vira `em_revisao` e não gera pedido.
- Orçamento expirado, substituído ou bloqueado não pode receber resposta.
- Aprovação exige política comercial aprovada e vigente.
- Primeira aprovação cria exatamente um pedido.
- Pedido recebe snapshots do orçamento e dos itens.
- Pedido inicia com status comercial `aprovado`, operacional `entrega` e financeiro `aguardando_pagamento`.
- Nova tentativa de conversão encontra o pedido existente pela relação única com o orçamento.
- A repetição retorna o mesmo pedido e cria evento `tentativa_conversao`.
- A conversão registra auditoria do orçamento e do pedido.
- Não há liberação automática de produção, pagamento real ou integração externa.
- O salvamento do rascunho foi corrigido para iniciar a ordem dos itens em 1.

## QA automatizado

Versão `0.0.86`:

- setup: passou
- análise estática: passou
- build: passou
- integrações: passou
- testes: passaram

## Evidências de backend

- Migration `0031_pedidos_conversao`: `applied`.
- Primeira aprovação do teste humano: HTTP 201 em `/backend/v1/propostas/30v9x7wmjyi30m0/resposta`.
- Repetição da aprovação: HTTP 200 na mesma rota, reutilizando o pedido existente.
- O bloqueio de aprovação sem política foi observado como HTTP 400, conforme regra da SPEC.
- O salvamento corrigido registrou orçamento, item e auditoria com respostas HTTP 200.

## Teste humano

Fernanda confirmou em 2026-09-11: “Testei e funcionou”. O fluxo de salvamento, aprovação e conversão idempotente foi validado no Preview.

## Critérios de aceite

- **CA-2-101: PASSOU** — aprovação válida cria um pedido comercial rastreável.
- **CA-2-102: PASSOU** — recusa, devolução e bloqueio por política inválida não convertem indevidamente.
- **CA-2-103: PASSOU** — conversão repetida retorna o vínculo existente e audita a tentativa.
- **CA-2-104: FORA DO RECORTE DESTA ENTREGA** — divergência financeira será construída na F2-T008.
- **CA-2-105: PASSOU no recorte implementado** — criação e alteração direta de pedidos/auditoria estão bloqueadas; a rota exige autenticação e papel autorizado.
- **CA-2-106: PASSOU** — não houve liberação de produção nem escrita externa.

## Limites desta task

- Não cria comprovantes.
- Não confirma pagamento.
- Não integra Stone ou Pix.
- Não libera produção.
- Não implementa retiradas parciais.
- A fila financeira e a divergência atribuída permanecem para F2-T008.
