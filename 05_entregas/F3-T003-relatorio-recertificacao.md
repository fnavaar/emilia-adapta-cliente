# Relatório de Recertificação — Fase 3 (SPEC-3-001)

**Task:** F3-T003 · **Data:** 2026-09-14 · **Status:** provas concluídas, aguardando aceite humano da Champion

## Escopo executado

Regressão completa da Fase 2 (11 CAs) + provas restantes P8/P10/P12, sobre a instância real (Skip 52694, QA 0.0.119, backend compartilhado com aceite B3-ENV-01).

## Provas P1–P12 (consolidado F3-T002 + F3-T003)

| Prova | Descrição | Resultado |
|---|---|---|
| P1 | Autoelevação de papel negada | PASS (self-update 404; list users vazio p/ atendimento) |
| P2 | Senha antiga não autentica; rotacionadas autenticam | PASS (400 ×5 / 200 ×5) |
| P3 | Usuário revogado com token vivo negado | PASS (acesso vazio) |
| P4 | Estado final de RLS exportado e comparado | PASS (CA-3-001 na T002: users/politicas/pedidos conferidos) |
| P5 | Atendimento vê só pedidos próprios; Produção não lê financeiro | PASS |
| P6 | Conversão repetida reutiliza pedido e audita | PASS (200 idempotente, mesmo pedido) |
| P7 | Proposta aprovada não aceita recusa/devolução | PASS após correção do guard (CA-3-005) |
| P8 | Upload inválido, 4º arquivo, >10 MB e escrita direta negados | PASS (ver abaixo) |
| P9 | Cancelamento: 100/101 un., +6/+7 dias, alçada, idempotência | PARCIAL (fail-closed provado; fixtures 100/101 ficam para o piloto F3-T007) |
| P10 | Suíte, typecheck, lint, format, build, audit | PASS (QA 0.0.119, stage test OK) |
| P11 | Topologia Preview/produção reconciliada sem publicar | PASS (backend único; aceite registrado) |
| P12 | Handoff usa só 04_fase-atual, manifesto fase 3, hashes | PASS com ressalva documentada (arquivos vivos) |

## P8 — detalhamento (comprovantes)

| Caso | Resultado |
|---|---|
| Formato inválido (.txt) via hook | 400 "Formato inválido. Aceitos: PDF, JPG/JPEG e PNG." |
| Formato válido (PNG) via hook | 201, comprovante criado, pagamento → comprovante_recebido |
| 4 arquivos (máx. 3) via hook | 400 "Envie de 1 a 3 arquivos por comprovante." |
| Pagamento conferido recusa novo comprovante | 400 "Pagamento confirmado não pode receber novo comprovante." |
| Escrita direta via API (createRule/updateRule null) | 403/404 — fail-closed |
| Produção: não lê (lista vazia), não cria (403) | PASS |
| Financeiro lê comprovantes (positivo) | PASS (14 itens) |

## Regressão F2 — 11 CAs

| CA | Descrição | Resultado |
|---|---|---|
| CA-2-001 | Alternativas do mesmo grupo não somadas | PASS (proposta convertida: 1 grupo cumulativo; lógica do montador validada na F2-T006 e não alterada desde então) |
| CA-2-002 | Snapshots preservados após mudança posterior | PASS (proposta convertida mantém versão 1, status aprovada, política vinculada; catálogo/política não alteram a enviada) |
| CA-2-003 | Política inválida não decide silenciosamente | PASS (guard do hook: política não aprovada → 400; fixture rascunho criada e marcada inativa) |
| CA-2-004 | Alteração cria versão auditável sem destruir a anterior | PASS (devolução criou v2 `hs06y9u3n0m8f03`; anterior preservada como substituida v1) |
| CA-2-005 | RLS separa composição, política e exceção | PASS (financeiro não cria proposta: 400/403) |
| CA-2-101 | Aprovação válida cria exatamente um pedido | PASS (1 pedido por proposta — índice único idx_pedidos_proposta_unica) |
| CA-2-102 | Alteração/recusa/expiração não convertem | PASS (prova T002: recusa/devolução em aprovada → 400; conversão só via aprovar) |
| CA-2-103 | Conversão repetida retorna vínculo existente e audita | PASS (P6: idempotente:true, mesmo pedido) |
| CA-2-104 | Divergência retorna ao atendimento com dono/motivo/próxima ação | PASS (decisão divergente → pendência criada `58a997oka3aa3rt`, pedido status_financeiro=divergente) |
| CA-2-105 | RLS protege composição e conferência financeira | PASS (produção: 0 itens/403; financeiro: lê comprovantes; atendimento: só pedidos próprios) |
| CA-2-106 | Sem liberação de produção nem escrita externa | PASS (integration_events: 400; nenhum publish executado) |

## P12 — handoff/manifesto

- Manifesto `handoff-manifest.json`: fase 3, 82 arquivos, gerado 13/09
- Amostra de hashes: `00-INDICE.md` OK; 4 divergências são **arquivos vivos** (estado-atual, STATUS, changelog, fase.md) atualizados após a geração do manifesto — comportamento esperado, registrado como ressalva
- Specs da F2 arquivadas em `05_entregas/fase-2/specs/` ✓

## Artefatos de teste e limpeza

- Comprovante fixture `cap15w0i4cdh6tp` (PNG 1×1) criado no pagamento `vn1owvr08bproy6` — pagamento e pedido marcados `divergente` pela prova CA-2-104, com pendência registrada (estado consistente e auditável)
- Política fixture `y2u96qw69t6eux1` marcada `inativa` com observação (delete bloqueado por RLS — correto)
- Proposta v2 `hs06y9u3n0m8f03` (fixture CA-2-004) — mantida como evidência de versão auditável
- Nenhum dado real de cliente foi usado; nenhum pagamento confirmado foi tocado

## Conclusão

**11/11 CAs da F2 PASS + P8/P10/P12 PASS.** A base F1–F2 está recertificada sobre a instância real. Pendência formal: aceite humano da Champion para fechar a recertificação e destravar F3-T004–T009.
