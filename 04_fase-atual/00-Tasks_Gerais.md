# Fase 3 — Jornadas especiais, produção, expedição e entrega

**Estado:** aberta com correção bloqueante. Somente F3-T001 é elegível; todas as demais permanecem bloqueadas por dependência e/ou gate humano.

## Ordem de execução (uma task por vez, teste humano entre elas)

| Task | Título | Dono | SPEC | Estado |
|---|---|---|---|---|
| F3-T001 | Estabilização e recertificação da base F1–F2 | Executor (plugin) | SPEC-3-001 | ELEGÍVEL |
| F3-T002 | Jornadas especiais no registro canônico | Executor (plugin) | SPEC-3-002 | Bloqueada (F3-T001) |
| F3-T003 | Parâmetros operacionais de jornadas | Champion | SPEC-3-002 | Bloqueada (F3-T002) |
| F3-T004 | Fila de produção | Executor (plugin) | SPEC-3-003 | Bloqueada (F3-T002/003) |
| F3-T005 | Liberação controlada de produção | Champion + Executor | SPEC-3-003 | Bloqueada (F3-T004) |
| F3-T006 | Expedição e entrega | Executor (plugin) | SPEC-3-004 | Bloqueada (F3-T005) |
| F3-T007 | Ocorrências de entrega | Executor (plugin) | SPEC-3-004 | Bloqueada (F3-T006) |
| F3-T008 | Baseline e métricas da fase | Consultoria | SPEC-3-001..004 | Bloqueada (F3-T007) |
| F3-T009 | Fechamento e preparação da Fase 4 | Consultoria | transversal | Bloqueada (F3-T008) |

## Regras da fase

- Nenhuma task além de F3-T001 pode ser iniciada.
- Toda task termina com TDD verde + teste humano registrado antes da próxima.
- Nenhuma publicação em produção sem autorização explícita do Champion registrada no recibo.
