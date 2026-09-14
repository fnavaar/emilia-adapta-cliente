# Recibo F3-T006 — Construir fila, gates, RLS e instrução de produção

**Task:** F3-T006 · **SPEC:** SPEC-3-003 · **Data:** 2026-09-14 · **Status:** implementada, aguardando teste humano

## O que foi entregue

### Backend (branch `feat/f3-t004-jornadas-especiais`, commits bb08273, 6ccd1b8, 46f040d, 3f82f7c)

1. **Migration 0043 `fila_producao.js`**: novos estados de `status_operacional` (pronto_producao, em_producao, pronto_expedicao, ocorrencia — aditivos), campos de liberação (liberado_por/em, liberacao_versao, data_fechada_por, urgente), coleção `ocorrencias_producao` (tipo: falta_material/impossibilidade/alteracao_tardia; dono, próxima ação, status aberta/resolvida; deleteRule null), flags `lider_producao` e `hierarquia_maior` em users + seed dos líderes nominais aprovados (Fernanda e Mara com hierarquia maior; Ivanete, Elaine e Vitória)
2. **Migration 0044 `status_operacional_producao.js`**: corretiva — substitui explicitamente a lista de valores do select (a 0043 via push no array não pegou na instância)
3. **Hook `liberar_pedido.js`** (`POST /backend/v1/pedidos/{id}/liberar`): RN-3-202 (só líder; negação auditada), RN-3-201 (gates: sinal conferido, sem pendência de definição, data do evento), RN-3-205 (idempotente), urgência ≤7 dias (G3-OPS-01)
4. **Hook `andamento_producao.js`** (`POST /backend/v1/pedidos/{id}/andamento`): iniciar/andamento/concluir sem tocar em preço/pagamento (CA-3-018); falta_material/impossibilidade → ocorrência com dono e próxima ação, NUNCA marca concluído (RN-3-204)
5. **Hook `proposta_resposta.js`**: conversão agora copia `data_evento` da oportunidade para o pedido (gate de prazo da fila)

### Frontend

6. **`FilaProducao.tsx`** (`/producao/fila`, menu "Fila de Produção"): fila ordenada por data de entrega (mais próxima primeiro), selo URGENTE ≤7 dias, composição/quantidade/prazo/versão/pendências por pedido (CA-3-017), botão de liberação (só líder), botões de andamento (produção), visão imprimível com ID e versão (CA-3-020)

## Verificação automática

- Suíte: **32/32 invariantes PASS** (24 anteriores + 8 novas: CA-3-015/016/017/018/019/020, RN-3-205, RN-3-202); tsc, lint, format, build limpos
- QA Skip: **0.0.127, 0.0.128 e 0.0.129 PASS** (migrations 0043/0044 aplicadas; hook de conversão corrigido)

## Provas na instância real (fluxo completo)

| Prova | Resultado |
|---|---|
| CA-3-016: atendimento (não líder) tenta liberar → 403 auditado | PASS |
| CA-3-015: líder libera sem gates → bloqueado com motivo/dono (pagamento, prazo) | PASS |
| Fluxo completo: proposta aprovada → pedido com data_evento copiada | PASS |
| Sinal conferido → liberar → `pronto_producao`, urgente=true | PASS |
| RN-3-205: liberar 2× → idempotente | PASS |
| CA-3-018: produção inicia e conclui; financeiro intacto (pago, total intacto) | PASS |
| RN-3-204: falta de material → ocorrência com dono e próxima ação; pedido `ocorrencia`, nunca concluído | PASS |
| Líderes semeados: Fernanda e Mara (hierarquia maior) | PASS |

## Fixtures de teste

- Política `Fila T006` (4jtu18xxqe3xkhj), propostas/pedidos `qwtcv0wd928o504` (pronto_expedicao) e `tmfnm3xmez6e4hk` (ocorrencia) — auditáveis
- Pendências/ocorrências com origem identificável; nenhum dado real tocado; produção não publicada

## Pendências conhecidas (não bloqueiam)

- Campo `versao_proposta` do pedido ficou 0 na conversão de teste (snapshot de versão está em `versao_proposta_snapshot` — conferir no piloto T007)
- Verificação automática de estoque (papel/fita/camélia) = melhoria futura, fora do escopo (SPEC exclui)
- "Fechar a data" (hierarquia Mara/Fernanda): campo `data_fechada_por` criado; semântica exata a confirmar no piloto
