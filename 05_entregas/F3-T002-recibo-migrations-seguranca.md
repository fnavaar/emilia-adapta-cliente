# Recibo — F3-T002: Aplicar migrations e provar segurança na instância autorizada

**Task:** F3-T002 · **SPEC:** SPEC-3-001 · **Data:** 2026-09-14 · **Status:** implementada, aguardando teste humano

## O que foi feito

Working tree do projeto Skip 52694 (Nexus Emilia) sincronizado byte-idêntico com a branch `corretiva/f3-t001-estabilizacao`:
- 0036 duplicado removido; migrations 0037–0039, hook `cancelar_pedido.js`, suíte de testes, package.json (script `test` real + overrides) e lockfile com overrides enviados
- QA **0.0.115** PASS → migrations aplicadas no backend compartilhado (aceite B3-ENV-01 da Champion registrado em 14/09)

## Ledger de migrations (40/40 aplicadas)

- `0038_migrations_unicas_cancelamento` — consolida estado 0036 + campos de cancelamento em pedidos
- `0039_rls_users_fail_closed` — users sem self-update
- `0040_credenciais_por_secrets` — 5 contas rotacionadas via secrets
- **Nota:** ordinais da instância estão deslocados vs repo (a colisão da F2 foi aplicada em 11/09 como `0036_rls_propostas_politicas` + `0037_regressao_propostas_politicas_rls`, com nomes diferentes dos arquivos). Registro órfão inofensivo, documentado.

## CA-3-001 — RLS exportado e conferido

- `users`: list/view/create/update = admin+gestão apenas; sem `id = @request.auth.id` ✓
- `politicas_comerciais`: estado canônico (atendimento só vê aprovada) ✓
- `pedidos`: campos `data_evento`, `cancelado_por`, `cancelado_em`, `retencao_percentual` presentes ✓

## Provas executadas (via API, backend compartilhado)

| Prova | Resultado |
|---|---|
| P2 — senha antiga rejeitada / nova autentica (5 contas) | PASS (400 ×5 / 200 ×5) |
| P1 — autoelevação de papel | PASS (404; list users vazio p/ atendimento) |
| P5 — isolamento por papel | PASS (atendimento: só pedidos próprios; produção: financeiro vazio) |
| P3 — token revogado com sessão viva | PASS (acesso vazio) |
| P9-parcial — cancelamento fail-closed | PASS (400 sem dados confiáveis) |
| P6 — conversão idempotente | PASS (200, mesmo pedido `ub46hkz64xd6we6`) |
| P7 — recusa/devolução em proposta aprovada | **FALHOU → corrigido** (ver abaixo) |
| P11 — topologia | backend único compartilhado; nada publicado |

## DEBUG P7 (CA-3-005)

O hook `proposta_resposta` aceitava recusa e devolução em proposta já aprovada/convertida (HTTP 200). Correções:
1. Guard adicionado ao hook: `acao !== 'aprovar' && status === 'aprovada'` → 400
2. Artefato do teste (proposta `k2k57syvmdq0keu` + mutação de status da `30v9x7wmjyi30m0`) corrigido pela migration `0040_correcao_prova_p7` (restaurou `aprovada`, removeu artefato com suas relações, auditou a correção)
3. QA 0.0.116–0.0.118 falhas corrigidas (referência obrigatória, campos obrigatórios); **QA 0.0.119 PASS**
4. Revalidação: recusa 400 ✓, devolução 400 ✓, re-aprovação idempotente 200 ✓, estado final `aprovada` v1 ✓

## Pendências para F3-T003

P8 (comprovantes), P10 (suíte no ambiente Skip), P12 (handoff/manifesto) e a regressão dos 11 CAs da F2 — todas no escopo da F3-T003.

## Limitações

- Provas P4/P8/P10/P12 pertencem à F3-T003 conforme recorte da SPEC
- Senha única fraca (12345678) definida pela Champion para homologação — registrar para rotação futura
