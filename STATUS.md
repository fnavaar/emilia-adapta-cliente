# STATUS — Projeto Mara Cristina Amaral Santos - ME

> **Atualizado em:** 2026-09-14 · **Por:** ETHOS (Bia)

## Onde estamos

- **Fase atual:** 3 — jornadas especiais, produção, expedição e entrega.
- **Modo de abertura:** correção bloqueante da base F1–F2 antes das entregas funcionais.
- **Progresso:** 2/9 tasks concluídas (F3-T001, F3-T002).
- **Task elegível:** F3-T003 — regressão F2 e aceite humano da recertificação.
- **Tasks bloqueadas:** F3-T004–T009 (aguardam recertificação concluída).
- **Produção:** não autorizada nesta abertura (backend compartilhado já recebeu as migrations, conforme aceite B3-ENV-01 da Champion).

## Gate atual

F3-T002 concluída com teste humano aprovado pela Champion (14/09): login com senha nova OK, senha antiga recusada, painel sem regressão. F3-T003 executa P8–P10/P12 + regressão dos 11 CAs da F2 e fecha o aceite humano da recertificação — sem ela, F3-T004–T009 permanecem bloqueadas.

## Decisões incorporadas

- Correções identificadas na auditoria entram na SPEC-3-001 e são pré-condição das demais SPECs.
- Cancelamento até 100 unidades: reembolso integral quando faltarem pelo menos 7 dias; depois, somente Administrador com retenção de 20%.
- Sem data, quantidade ou total confiável: bloquear e criar pendência; não inferir.
- B3-ENV-01: Preview e produção compartilham backend único (nexus-emilia-49529.shrd00); aceite explícito da Champion registrado em 14/09.

## Referências

- `04_fase-atual/fase.md`
- `04_fase-atual/specs/00-INDICE.md`
- `05_entregas/F3-T001-recibo-estabilizacao-repo-tecnico.md`
- `05_entregas/F3-T002-recibo-migrations-seguranca.md`
- sistema técnico: `https://github.com/ebc06162-ship-it/nexus-emilia-o0ismc251` (branch `corretiva/f3-t001-estabilizacao`) · Skip 52694, QA 0.0.119
