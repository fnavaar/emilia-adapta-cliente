# STATUS — Projeto Mara Cristina Amaral Santos - ME

> **Atualizado em:** 2026-09-14 · **Por:** ETHOS (Bia)

## Onde estamos

- **Fase atual:** 3 — jornadas especiais, produção, expedição e entrega.
- **Progresso:** 4/9 tasks concluídas (F3-T001 a F3-T004).
- **Task elegível:** F3-T005 — provar bordas e aceitar jornadas especiais (SPEC-3-002, Champion).
- **Tasks bloqueadas:** F3-T006–T009 (dependem das tasks anteriores da fase).
- **Produção:** não autorizada nesta abertura (backend compartilhado já recebeu as migrations, conforme aceite B3-ENV-01 da Champion).

## Gate atual

**F3-T004 concluída e aceita (14/09).** Jornadas especiais configuradas como variantes do registro canônico: coleção `config_jornadas` (só Administrador/Gestão altera, negação auditada), hook de validação de mínimos no avanço (pendência nomeada + histórico, nunca silencioso, nunca libera produção), UI condicional por jornada. Ajustes do teste humano: degustação virou marcador `solicitou_degustacao` (não é tipo de evento), pendências listadas no painel, modalidade da degustação como seletor (Presencial padrão, Entrega, Retirada). QA Skip 0.0.125; suíte 24/24; branch `feat/f3-t004-jornadas-especiais`. Recibo: `05_entregas/F3-T004-recibo-jornadas-especiais.md`.

## Decisões incorporadas

- Correções identificadas na auditoria entram na SPEC-3-001 e são pré-condição das demais SPECs.
- Cancelamento até 100 unidades: reembolso integral quando faltarem pelo menos 7 dias; depois, somente Administrador com retenção de 20%.
- Sem data, quantidade ou total confiável: bloquear e criar pendência; não inferir.
- B3-ENV-01: Preview e produção compartilham backend único (nexus-emilia-49529.shrd00); aceite explícito da Champion registrado em 14/09.
- Degustação não é tipo de evento: marcador `solicitou_degustacao` vale para qualquer evento (decisão da Champion em 14/09).
- Parâmetros das jornadas aprovados em 14/09: cortesia presencial/retirada, frete no envio, adicional cobrado na própria degustação, sem limite semanal; revendedor com preço pela data do pedido; bem-nascido com SLA manual + pendência; equipe de vendas acompanha o cliente ponta a ponta.

## Referências

- `04_fase-atual/fase.md`
- `04_fase-atual/specs/00-INDICE.md`
- `05_entregas/F3-T001-recibo-estabilizacao-repo-tecnico.md`
- `05_entregas/F3-T002-recibo-migrations-seguranca.md`
- `05_entregas/F3-T003-relatorio-recertificacao.md`
- `05_entregas/F3-T004-recibo-jornadas-especiais.md`
- sistema técnico: `https://github.com/ebc06162-ship-it/nexus-emilia-o0ismc251` (branch `feat/f3-t004-jornadas-especiais`) · Skip 52694, QA 0.0.125
