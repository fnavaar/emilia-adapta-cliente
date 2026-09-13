# STATUS — Projeto Mara Cristina Amaral Santos - ME

> **Atualizado em:** 2026-09-13 · **Por:** ETHOS (Bia)

## Onde estamos

- **Fase atual:** 3 — jornadas especiais, produção, expedição e entrega.
- **Modo de abertura:** correção bloqueante da base F1–F2 antes das entregas funcionais.
- **Progresso:** 1/9 tasks concluídas (F3-T001).
- **Task elegível:** F3-T002 — aplicar migrations e provar segurança na instância autorizada.
- **Tasks bloqueadas:** F3-T003–T009 (F3-T003 aguarda F3-T002; F3-T004–T009 aguardam recertificação).
- **Produção:** não autorizada nesta abertura.

## Gate atual

F3-T001 concluída com teste humano aprovado pela Champion (13/09). F3-T002 exige: cinco secrets confirmados por metadado (B3-SEC-01), resposta ao B3-ENV-01 (Preview e produção compartilham backend?) e projeto Skip acessível (B3-SKIP-01). Sem os três, migrations não são aplicadas.

## Decisões incorporadas

- Correções identificadas na auditoria entram na SPEC-3-001 e são pré-condição das demais SPECs.
- Cancelamento até 100 unidades: reembolso integral quando faltarem pelo menos 7 dias; depois, somente Administrador com retenção de 20%.
- Sem data, quantidade ou total confiável: bloquear e criar pendência; não inferir.

## Referências

- `04_fase-atual/fase.md`
- `04_fase-atual/specs/00-INDICE.md`
- `05_entregas/F3-T001-recibo-estabilizacao-repo-tecnico.md`
- sistema técnico: `https://github.com/ebc06162-ship-it/nexus-emilia-o0ismc251` (branch `corretiva/f3-t001-estabilizacao`, commits 2460081, 91208a1, 146fced, aa90fa4)
