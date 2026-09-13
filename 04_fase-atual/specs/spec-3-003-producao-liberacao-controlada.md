# SPEC-3-003 — Fila e liberação controlada de produção

**Fase:** 3
**Status:** bloqueada por SPEC-3-001/002 e gate G4
**Dono:** Líder de produção
**Origem (fontes internas da consultoria — não acompanham este pacote):** RQ-003, RQ-006, RQ-009, RQ-011, RQ-012; AC-008; G4
**Degrau:** construção mínima sobre o pedido existente.

## Contexto e decisões fechadas

O pedido possui composição, quantidade e estados financeiro/comercial. A fila operacional deve usar esses snapshots. Somente o Líder libera; Produção atualiza andamento. Pagamento/definição/prazo inválidos impedem liberação. Papel e digital coexistem no piloto.

**Bloqueios:** SPEC-3-001/002 aceitas; líder nominal; dispositivo/acesso; critérios de pagamento/definição; capacidade/janela do piloto; política de urgência.

## Resultado observável

Pedidos aptos entram em `Pronto para produção`; o líder libera e a Produção registra início, andamento, conclusão, falta de material ou impossibilidade. A impressão reproduz composição, quantidade e prazo sem divergência.

## Limites

- Inclui fila, RLS, estados, instrução canônica, impressão e ocorrência operacional.
- Fora: baixa de estoque, compras, planejamento integral, promessa emergencial, remoção do papel.
- Rollback: devolução auditada para pendência/ocorrência; nunca apagar execução.

## Regras

| ID | Condição | Resultado | Exceção |
|---|---|---|---|
| RN-3-201 | pagamento/definição/prazo válidos | apto para avaliação do líder | qualquer gate ausente → pendência |
| RN-3-202 | liberação | somente Líder de produção | demais perfis → 403 auditado |
| RN-3-203 | alteração após liberação | ocorrência + nova versão/instrução | não sobrescrever snapshot |
| RN-3-204 | falta/impossibilidade | ocorrência com dono e próxima ação | não marcar concluído |
| RN-3-205 | liberação repetida/concorrente | reutilizar o mesmo evento/estado | nunca duplicar fila nem prioridade |
| RN-3-206 | impressão | gerar visão imprimível/PDF com ID e versão do pedido | hash/campos devem equivaler à fila digital |

## Fluxo

Pedido apto → Pronto para produção → líder libera → Em produção → Pronto para expedição, ou Ocorrência. Fila impressa carrega ID/versão para reconciliação.

## Instruções Ethos

Alterar somente coleções/hooks/telas da operação. Usar migrations aditivas. Não publicar em produção. Parar se líder/gates/piloto não estiverem aprovados.

## Critérios de aceite

- [ ] **CA-3-015:** pedido sem gate aplicável não aparece como liberado e mostra motivo/dono.
- [ ] **CA-3-016:** somente Líder libera/altera prioridade; tentativa indevida é negada/auditada.
- [ ] **CA-3-017:** fila mostra composição, quantidade, prazo, prioridade, versão e pendências do pedido.
- [ ] **CA-3-018:** Produção registra início, andamento, conclusão, falta ou impossibilidade sem alterar preço/pagamento.
- [ ] **CA-3-019:** alteração tardia preserva versão anterior e gera ocorrência/reconfirmação.
- [ ] **CA-3-020:** impressão e digital do mesmo pedido não divergem nos campos canônicos.
- [ ] **CA-3-021:** turno piloto termina com cada item em Pronto para expedição ou Ocorrência atribuída.

## TDD

RED: usuário indevido libera; pedido incompleto aparece apto; impressão divergente. GREEN: caso apto pelo líder. REGRESSÃO: alteração tardia, falta de material, reimpressão e turno piloto. Evidência: logs RLS, capturas, PDF/print hash e aceite do líder.

## Tasks vinculadas

| ID | Task | Dono | SPEC | Critério | Recorte | Evidência | Pré-condições | Status |
|---|---|---|---|---|---|---|---|---|
| F3-T006 | Construir fila, gates, RLS e instrução de produção | Responsável técnico | 3-003 | CA-3-015–020 | RED/GREEN | migration, testes, capturas | F3-T005; G4 fechado | Bloqueada |
| F3-T007 | Executar piloto híbrido e aceitar operação | Líder + Champion | 3-003 | CA-3-017–021 | REGRESSÃO/turno | relatório, hashes, aceite | F3-T006 aceita | Bloqueada |

## Emendas

| Data | Origem | Micro-spec/task | Motivo |
|---|---|---|---|
| | | | |
