# STATUS — Projeto Mara Cristina Amaral Santos - ME

> **Atualizado em:** 2026-10-06 · **Por:** ETHOS (Bia)

## Onde estamos

- **Fase atual:** 3 — jornadas especiais, produção, expedição e entrega.
- **Progresso:** 8/11 tasks concluídas (F3-T001 a F3-T006, F3-T010 e F3-T011).
- **Task elegível:** F3-T007 — executar piloto híbrido e aceitar operação (SPEC-3-003).
- **Tasks bloqueadas:** F3-T008–T009 (dependem do piloto F3-T007).
- **Produção:** não autorizada nesta abertura (backend compartilhado já recebeu as migrations, conforme aceite B3-ENV-01 da Champion).

## Gate atual

**F3-T010 (relatórios operacionais + importação de OPs) e F3-T011 (embrulho por papel + planejamento semanal) CONCLUÍDAS — teste humano aprovado pela Champion em 06/10 ("tudo testado e funcionando").** Evidências: QA Skip 0.0.165 PASS; migration 0058 (lote 5: 46 OPs novas + 11 atualizadas, 2.128 un — confere exato com o resumo da Champion) aplicada; agrupamento por situação (tela + impressão), coluna Situação nas impressões e seletor de período semanal validados no preview. Recibos: `05_entregas/F3-T010-recibo-relatorios-operacionais.md` e `05_entregas/F3-T011-recibo-embrulho-planejamento.md`. Próxima: F3-T007 (piloto híbrido com o time de produção, turno real + aceite).

## Decisões incorporadas

- Correções identificadas na auditoria entram na SPEC-3-001 e são pré-condição das demais SPECs.
- Cancelamento até 100 unidades: reembolso integral quando faltarem pelo menos 7 dias; depois, somente Administrador com retenção de 20%.
- Sem data, quantidade ou total confiável: bloquear e criar pendência; não inferir.
- B3-ENV-01: Preview e produção compartilham backend único (nexus-emilia-49529.shrd00); aceite explícito da Champion registrado em 14/09.
- Degustação não é tipo de evento: marcador `solicitou_degustacao` vale para qualquer evento (decisão da Champion em 14/09).
- Parâmetros das jornadas aprovados em 14/09: cortesia presencial/retirada, frete no envio, adicional cobrado na própria degustação, sem limite semanal; revendedor com preço pela data do pedido; bem-nascido com SLA manual + pendência; equipe de vendas acompanha o cliente ponta a ponta.
- Modalidade da degustação: seletor com Presencial (showroom) como padrão, Entrega (envio) e Retirada.
- Parâmetros G3-OPS-01 (produção, 14/09): fila natural = data de entrega; urgência = pedido novo com entrega em até 7 dias; falta de material = ocorrência (RN-3-204); verificação automática de estoque fora do escopo (melhoria futura); sinal/entrada basta para liberar, total pago até a entrega; revendedores/CNPJ com política de recebimento individual.
- Relatórios impressos são para uso operacional: funcional > bonito (Champion, 27/09).
- Sincronização de OPs: em divergência PDF × resumo, o resumo da Champion é a fonte da verdade e a divergência fica registrada no histórico do pedido (lote 5, 01/10).

## Referências

- `04_fase-atual/fase.md`
- `04_fase-atual/specs/00-INDICE.md`
- `05_entregas/F3-T001-recibo-estabilizacao-repo-tecnico.md`
- `05_entregas/F3-T002-recibo-migrations-seguranca.md`
- `05_entregas/F3-T003-relatorio-recertificacao.md`
- `05_entregas/F3-T004-recibo-jornadas-especiais.md`
- `05_entregas/F3-T005-roteiro-aceite-jornadas.md`
- `05_entregas/F3-T006-recibo-fila-producao.md`
- `05_entregas/F3-T010-recibo-relatorios-operacionais.md`
- `05_entregas/F3-T011-recibo-embrulho-planejamento.md`
- sistema técnico: Skip 52694 (preview nexus-emilia-49529--preview.goskip.app), QA 0.0.165
