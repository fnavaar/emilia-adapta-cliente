# STATUS — Projeto Mara Cristina Amaral Santos - ME

> **Atualizado em:** 2026-09-14 · **Por:** ETHOS (Bia)

## Onde estamos

- **Fase atual:** 3 — jornadas especiais, produção, expedição e entrega.
- **Modo de abertura:** correção bloqueante da base F1–F2 antes das entregas funcionais — **concluída**.
- **Progresso:** 3/9 tasks concluídas (F3-T001, F3-T002, F3-T003).
- **Task elegível:** F3-T004 — configurar variantes e mínimos das quatro jornadas (SPEC-3-002).
- **Tasks bloqueadas:** F3-T005–T009 (dependem das tasks anteriores da fase).
- **Produção:** não autorizada nesta abertura (backend compartilhado já recebeu as migrations, conforme aceite B3-ENV-01 da Champion).

## Gate atual

**Recertificação F1–F2 FECHADA (14/09).** F3-T003 executou P8 (comprovantes: formato inválido, limite de 3 arquivos, pagamento conferido imutável, escrita direta fail-closed, Produção bloqueada, Financeiro lê), P10 (QA 0.0.119, stage test PASS) e P12 (manifesto de handoff fase 3, 82 arquivos; 4 divergências de hash = arquivos vivos, ressalva documentada). Regressão da Fase 2: 11/11 CAs PASS na instância real. Aceite humano da Champion registrado em 14/09. Relatório: `05_entregas/F3-T003-relatorio-recertificacao.md`. F3-T004–T009 destravadas na ordem da fase.

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
- `05_entregas/F3-T003-relatorio-recertificacao.md`
- sistema técnico: `https://github.com/ebc06162-ship-it/nexus-emilia-o0ismc251` (branch `corretiva/f3-t001-estabilizacao`) · Skip 52694, QA 0.0.119
