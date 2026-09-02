# SPEC-2-002 — Aprovação, conversão e fila financeira controlada

**Fase:** 2 — Composição, proposta, aprovação, conversão e fila financeira
**Status:** proposta de especificação; execução depende das decisões B2 abaixo
**Dono:** Atendimento para proposta; Cliente/intermediário para resposta; Financeiro para conferência
**Origem no escopo:** RQ-007 a RQ-010; AC-005, AC-006, AC-007, AC-010 e AC-014; DH-002, DH-005 e DH-007
**Degrau da solução:** construção de fluxo comercial e financeiro mínimo sobre proposta versionada. Converte sem redigitação e cria fila de conferência; não concilia banco, não libera produção e não escreve em integração externa.

## Resultado observável

Uma proposta enviada pode ser aprovada, devolvida para alteração, recusada ou expirar. Uma aprovação gera pedido comercial com a mesma identidade, composição, condições e histórico, sem redigitação. Um comprovante entra em fila financeira; o Financeiro marca conferido ou divergente e a divergência retorna ao atendimento com motivo e próximo passo.

## Regras

1. Transições ocorrem por ator autorizado e criam histórico.
2. Aprovação exige versão válida, vigente e política aprovada; proposta expirada ou substituída é bloqueada.
3. Alteração preserva proposta, resposta, pagamento e condições anteriores, criando versão sucessora quando necessário.
4. Conversão é única por proposta aprovada; repetição reutiliza o pedido e audita a tentativa.
5. Comprovante muda apenas para comprovante recebido. Financeiro decide conferido ou divergente; não há inferência automática.
6. Divergência cria pendência para Atendimento, sem apagar comprovante ou proposta. A fase não libera produção.

## Bloqueios

- **B2-APR-01:** canal/forma de aceite, identidade do aprovador, validade e aprovação parcial.
- **B2-FIN-01:** vencimento, estados de pagamento, responsáveis e critérios de conferência/divergência.
- **B2-FIN-02:** retenção, acesso e formato de comprovantes/anexos.
- **B2-EST-01:** equivalência de Reserva e Falta definição com os estados canônicos.

## Critérios de aceite

- [ ] **CA-2-101:** aprovação válida cria exatamente um pedido comercial rastreável.
- [ ] **CA-2-102:** alteração, recusa e expiração preservam versões e não convertem indevidamente.
- [ ] **CA-2-103:** conversão repetida retorna vínculo existente e é auditada.
- [ ] **CA-2-104:** divergência financeira retorna ao atendimento com dono, motivo e próxima ação.
- [ ] **CA-2-105:** RLS protege composição e conferência financeira.
- [ ] **CA-2-106:** não há liberação de produção nem escrita externa.

## TDD da SPEC

RED: aprovação duplicada, versão expirada, comprovante divergente e acesso indevido. GREEN: fixtures de aprovação, alteração, recusa, expiração, repetição e divergência. REGRESSÃO: repetir conversão e modificar versão após resposta.

## Tasks vinculadas

F2-T003, F2-T004, F2-T007, F2-T008 e F2-T010.
