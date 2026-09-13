# SPEC-3-004 — Expedição, entrega e ocorrência

**Fase:** 3
**Status:** bloqueada por SPEC-3-003
**Dono:** Expedição/entrega
**Origem (fontes internas da consultoria — não acompanham este pacote):** RQ-009, RQ-011, RQ-012, RQ-013; DH-001/008; G4/G6
**Degrau:** construção mínima sobre pedido e fila de produção.

## Contexto e decisões fechadas

Somente pedido concluído pela Produção entra na expedição. A saída precisa de endereço/responsável/horário. Entrega termina com protocolo ou ocorrência; tentativa, recusa, atraso e devolução nunca removem o pedido da fila.

**Bloqueios:** SPEC-3-003 aceita; campos mínimos/protocolo; responsáveis; janela do piloto; estados terminais confirmados.

## Resultado observável

Um pedido pronto registra preparação, saída, tentativa e entrega com protocolo; uma falha vira ocorrência atribuída, com replanejamento e encerramento, preservando todo o histórico.

## Limites

- Inclui fila de expedição, saída, protocolo, tentativa, entrega e ocorrência.
- Fora: roteirização, GPS, transportadora integrada, prova biométrica e automação externa. Entrega parcial/múltiplas datas usa um registro de expedição por data; saldo permanece no pedido e não é encerrado até todas as parcelas ou ocorrência final.
- Rollback: reabrir somente por ocorrência auditada; não apagar protocolo.

## Regras

| ID | Condição | Resultado | Exceção |
|---|---|---|---|
| RN-3-301 | produção concluída + dados mínimos | Pronto para expedição | falta → pendência |
| RN-3-302 | saída | registrar responsável/data/versão | sem dados → bloquear |
| RN-3-303 | entrega | protocolo/evidência + Entregue | evidência ausente → não encerrar |
| RN-3-304 | tentativa/recusa/atraso/devolução | Ocorrência com dono/prazo/ação | nunca sumir da fila |

## Fluxo

Pronto para expedição → saída → Em entrega → Entregue; qualquer falha → Ocorrência → replanejamento → nova tentativa ou encerramento humano.

## Instruções Ethos

Usar migrations aditivas, dados fictícios no Preview e RLS por papel. Não integrar serviços externos nem publicar produção. Parar sem protocolo/atores/piloto aprovados.

## Critérios de aceite

- [ ] **CA-3-022:** somente pedido concluído e com campos mínimos entra na expedição.
- [ ] **CA-3-023:** saída registra pedido/versão, responsável, data, endereço e próximo estado.
- [ ] **CA-3-024:** entrega exige protocolo/evidência e preserva histórico.
- [ ] **CA-3-025:** tentativa, recusa, atraso ou devolução cria ocorrência com dono, prazo e próxima ação.
- [ ] **CA-3-026:** pedido nunca desaparece da fila sem Entregue ou Ocorrência encerrada.
- [ ] **CA-3-027:** perfis sem alçada não alteram entrega/protocolo e a tentativa é auditada.
- [ ] **CA-3-028:** piloto ponta a ponta preserva identidade, composição, pagamento, produção e protocolo.

## TDD

RED: expedir incompleto, entregar sem protocolo, perfil indevido, falha desaparecendo. GREEN: entrega feliz. REGRESSÃO: tentativa/recusa/devolução e reconciliação da fila. Evidência: IDs de fixture, eventos, capturas e aceite.

## Tasks vinculadas

| ID | Task | Dono | SPEC | Critério | Recorte | Evidência | Pré-condições | Status |
|---|---|---|---|---|---|---|---|---|
| F3-T008 | Construir fila, protocolo e ocorrências de entrega | Responsável técnico | 3-004 | CA-3-022–027 | RED/GREEN | migration, testes, capturas | F3-T007; protocolo aprovado | Bloqueada |
| F3-T009 | Executar piloto ponta a ponta e aceitar Fase 3 | Expedição + Champion | 3-004 | CA-3-022–028 | REGRESSÃO/e2e | relatório e aceite | F3-T008 aceita | Bloqueada |

## Emendas

| Data | Origem | Micro-spec/task | Motivo |
|---|---|---|---|
| | | | |
