# STATUS — Projeto Mara Cristina Amaral Santos - ME

> **Atualizado em:** 2026-09-14 · **Por:** ETHOS (Bia)

## Onde estamos

- **Fase atual:** 3 — jornadas especiais, produção, expedição e entrega.
- **Progresso:** 6/9 tasks concluídas (F3-T001 a F3-T006).
- **Task elegível:** F3-T007 — executar piloto híbrido e aceitar operação (SPEC-3-003).
- **Tasks bloqueadas:** F3-T008–T009 (dependem das tasks anteriores da fase).
- **Produção:** não autorizada nesta abertura (backend compartilhado já recebeu as migrations, conforme aceite B3-ENV-01 da Champion).

## Gate atual

**F3-T006 (fila de produção) CONCLUÍDA com teste humano aprovado pela Champion (14/09).** Fila por data de entrega com selo URGENTE ≤7 dias, gates de liberação (sinal conferido + sem pendência de definição + data do evento), liberação restrita a líderes nominais (Fernanda/Mara com hierarquia maior) com negação auditada, andamento de produção sem tocar preço/pagamento, ocorrências de falta de material/impossibilidade com dono e próxima ação (nunca concluído), visão imprimível com ID e versão. Suíte 32/32; QA Skip 0.0.129. Recibo: `05_entregas/F3-T006-recibo-fila-producao.md`. Próxima: F3-T007 (piloto híbrido com o time de produção, turno real + aceite).

## Decisões incorporadas

- Correções identificadas na auditoria entram na SPEC-3-001 e são pré-condição das demais SPECs.
- Cancelamento até 100 unidades: reembolso integral quando faltarem pelo menos 7 dias; depois, somente Administrador com retenção de 20%.
- Sem data, quantidade ou total confiável: bloquear e criar pendência; não inferir.
- B3-ENV-01: Preview e produção compartilham backend único (nexus-emilia-49529.shrd00); aceite explícito da Champion registrado em 14/09.
- Degustação não é tipo de evento: marcador `solicitou_degustacao` vale para qualquer evento (decisão da Champion em 14/09).
- Parâmetros das jornadas aprovados em 14/09: cortesia presencial/retirada, frete no envio, adicional cobrado na própria degustação, sem limite semanal; revendedor com preço pela data do pedido; bem-nascido com SLA manual + pendência; equipe de vendas acompanha o cliente ponta a ponta.
- Modalidade da degustação: seletor com Presencial (showroom) como padrão, Entrega (envio) e Retirada.
- Parâmetros G3-OPS-01 (produção, 14/09): fila natural = data de entrega; urgência = pedido novo com entrega em até 7 dias; falta de material = ocorrência (RN-3-204); verificação automática de estoque fora do escopo (melhoria futura); sinal/entrada basta para liberar, total pago até a entrega; revendedores/CNPJ com política de recebimento individual.

## Referências

- `04_fase-atual/fase.md`
- `04_fase-atual/specs/00-INDICE.md`
- `05_entregas/F3-T001-recibo-estabilizacao-repo-tecnico.md`
- `05_entregas/F3-T002-recibo-migrations-seguranca.md`
- `05_entregas/F3-T003-relatorio-recertificacao.md`
- `05_entregas/F3-T004-recibo-jornadas-especiais.md`
- `05_entregas/F3-T005-roteiro-aceite-jornadas.md`
- `05_entregas/F3-T006-recibo-fila-producao.md`
- sistema técnico: `https://github.com/ebc06162-ship-it/nexus-emilia-o0ismc251` (branch `feat/f3-t004-jornadas-especiais`) · Skip 52694, QA 0.0.129
