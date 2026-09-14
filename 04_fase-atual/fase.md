# Fase 3 — Jornadas especiais, produção, expedição e entrega

**Estado:** recertificação, jornadas especiais e fila de produção concluídas. F3-T001 a F3-T006 concluídas; F3-T007 é a próxima elegível.

## Regra de execução

Uma task por vez. Teste humano obrigatório após cada task. Nenhuma task publica produção.

## Tasks

| ID | Task | Dono | SPEC | Critério | Recorte da prova | Evidência esperada | Pré-condições | Status | Leva |
|---|---|---|---|---|---|---|---|---|---|
| F3-T001 | Materializar repo técnico e implementar correções | Responsável técnico | SPEC-3-001 | CA-3-001/003/007 no código | RED/GREEN local; sem apply Skip | commit técnico, logs e scan | repo Git e patch versionado | concluída (2026-09-13) | 1 |
| F3-T002 | Aplicar migrations e provar segurança na instância autorizada | Responsável técnico | SPEC-3-001 | CA-3-001–006/029 | P1–P7/P11 | ledger de migrations e provas | F3-T001 aceita; B3-ENV-01; secrets; Skip acessível | concluída (2026-09-14) | 2 |
| F3-T003 | Regressão F2 e aceite humano da recertificação | Champion + responsável técnico | SPEC-3-001 | CA-3-007/008/030 | P8–P10/P12 + 11 CAs F2 | relatório e aceite humano | F3-T002 aceita | concluída (2026-09-14) | 3 |
| F3-T004 | Configurar variantes e mínimos das quatro jornadas | Atendimento/Gestão | SPEC-3-002 | CA-3-009–014/031 | RED/GREEN das quatro fixtures | matriz, configuração e fixtures | F3-T003; parâmetros aprovados | concluída (2026-09-14) | 4 |
| F3-T005 | Provar bordas e aceitar jornadas especiais | Champion | SPEC-3-002 | CA-3-009–014/031 | REGRESSÃO de tipo/data/urgência | roteiro, capturas e aceite | F3-T004 aceita | concluída (2026-09-14) | 5 |
| F3-T006 | Construir fila, gates, RLS e instrução de produção | Responsável técnico | SPEC-3-003 | CA-3-015–020 | RED/GREEN de fila e alçada | migration, testes e capturas | F3-T005; G3-OPS-01 | concluída (2026-09-14) | 6 |
| F3-T007 | Executar piloto híbrido e aceitar operação | Líder + Champion | SPEC-3-003 | CA-3-017–021 | REGRESSÃO e turno piloto | relatório, hashes e aceite | F3-T006 aceita | Elegível | 7 |
| F3-T008 | Construir fila, protocolo e ocorrências de entrega | Responsável técnico | SPEC-3-004 | CA-3-022–027 | RED/GREEN expedição | migration, testes e capturas | F3-T007; G3-ENT-01 | Bloqueada | 8 |
| F3-T009 | Executar piloto ponta a ponta e aceitar Fase 3 | Expedição + Champion | SPEC-3-004 | CA-3-022–028 | REGRESSÃO/e2e | relatório e aceite humano | F3-T008 aceita | Bloqueada | 9 |

## Handoff

Encerrar somente com CA-3-001–028 provados, gates G3 fechados, piloto híbrido e aceite humano. Falha corretiva mantém a base aberta e bloqueia as demais SPECs.
