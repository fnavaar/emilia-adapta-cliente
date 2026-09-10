# SPEC-2-002 — Aprovação, conversão e fila financeira controlada

**Fase:** 2 — Composição, proposta, aprovação, conversão e fila financeira
**Status:** contrato funcional da F2-T003 formalizado; construção depende das tasks da Leva 2
**Dono:** Atendimento para proposta; Cliente/intermediário para resposta; Financeiro para conferência; Administrador para alçadas
**Origem no escopo:** RQ-007 a RQ-010; AC-005, AC-006, AC-007, AC-010 e AC-014; DH-002, DH-005 e DH-007
**Degrau da solução:** construção de fluxo comercial e financeiro mínimo sobre proposta versionada. Converte sem redigitação e cria fila de conferência; não concilia banco, não libera produção e não escreve em integração externa.

## Resultado observável

Uma proposta enviada pode ser aprovada, devolvida para alteração, recusada ou expirar. A cliente deve preencher e conferir os dados em uma interface amigável antes de aceitar. A aprovação gera pedido comercial com a mesma identidade, composição, condições e histórico, sem redigitação. Somente após a confirmação do pedido o sistema apresenta a etapa de pagamento. Um comprovante entra em fila financeira; o Financeiro marca conferido ou divergente e a divergência retorna ao atendimento com motivo e próximo passo.

## Regras

1. Transições ocorrem por ator autorizado e criam histórico.
2. Aprovação exige versão válida, vigente e política aprovada; proposta expirada ou substituída é bloqueada.
3. O aceite acontece em duas etapas: a cliente primeiro revisa/preenche os dados e confirma o pedido e os termos; somente depois o sistema apresenta QR Pix, dados bancários ou futura opção de pagamento Stone. Responder à proposta não é aprovação.
4. A interface de confirmação deve destacar quantidade, sabores, embalagem, data, entrega/retirada, endereço, responsável pelo recebimento, forma de pagamento, pendências “a definir” e termos de cancelamento.
5. A confirmação registra versão, identidade do aprovador, data/hora, dados confirmados e termos aceitos.
6. A cliente pode escolher opções de sabor/quantidade disponibilizadas no orçamento e ajustar quantidade dentro das regras. Cores não são escolhidas livremente no link; pedidos de outras cores ou configurações retornam ao Atendimento, que ajusta e envia nova versão.
7. Alteração preserva proposta, resposta, pagamento e condições anteriores, criando versão sucessora quando necessário.
8. Conversão é única por proposta aprovada; repetição reutiliza o pedido e audita a tentativa.
9. Status são separados em três dimensões: comercial, operacional e financeiro. Aprovação comercial não significa pagamento, liberação de produção ou conclusão operacional.
10. O pedido principal preserva sua quantidade original. Retiradas ou entregas parciais posteriores são entregas derivadas, relacionadas ao pedido principal, com quantidade, data, solicitante, responsável, local e status próprios. O sistema calcula saldo restante e mantém o histórico das saídas.
11. Status operacionais canônicos: Entrega, Falta Definição, Em Alteração, Previsão de Entrega e Suspenso. “Falta Definição” exige pendências individuais com informação, responsável, prazo, urgência e status.
12. Status financeiros canônicos: aguardando pagamento, parcialmente pago em dia, parcialmente pago em atraso, pago, comprovante recebido, em conferência, divergente e pendente de correção.
13. Comprovante muda apenas para comprovante recebido. Financeiro decide conferido ou divergente; não há inferência automática.
14. Divergência cria pendência para Atendimento, sem apagar comprovante ou proposta. A fase não libera produção.
15. Degustações são cortesia: não geram contas a receber pelo produto e não são vendas. Podem ter frete cobrado ou não, podem ser destinadas a clientes ou parceiras e geram solicitação/ordem de produção rastreável sem lançamento financeiro automático.
16. Toda degustação registra destinatário, cliente/oportunidade ou parceira/origem, indicação, sabores, quantidade, data, frete, responsável, retorno, eventual orçamento e eventual fechamento. Esses dados permitem medir indicações, retorno e conversão por parceira.
17. Suspensão e crédito têm validade de 1 ano, contada da solicitação de suspensão, transformação em crédito ou aquisição do crédito, conforme o caso. Crédito é registro financeiro separado do pedido, pode ser utilizado parcialmente e congela valor, não preço nem quantidade.
18. Cancelamento respeita a política aprovada: 7 dias para reembolso integral; pedidos abaixo de 100 unidades têm reembolso integral até uma semana antes da entrega; após esse prazo, autorização de Administrador e retenção de 20%; pedidos acima de 100 unidades, após os 7 dias, têm retenção de 20%. Devolução via cartão segue a operadora; via Pix ocorre em até 10 dias úteis, conforme política. Toda exceção identifica o autorizador.
19. Perfis envolvidos: Atendimento/equipe de vendas pode montar, revisar e acompanhar; Financeiro confere pagamentos; Administrador executa alçadas e acessa os recursos autorizados.

## Bloqueios resolvidos nesta task

- **B2-APR-01:** canal de aceite por link, interface de conferência, identidade do aprovador, confirmação antes do pagamento, revisão por nova versão e seleção limitada de opções definidos. A futura integração Stone permanece fora do escopo desta task.
- **B2-FIN-01:** estados financeiro/comercial/operacional separados; pagamento apresentado somente após aceite; responsáveis e divergência definidos; degustação sem contas a receber definida.
- **B2-EST-01:** estados operacionais canônicos definidos, com Falta Definição e entregas derivadas por data; Reserva de degustação não é venda nem contas a receber.

## Dependências preservadas

- **B2-FIN-02:** retenção, acesso e formato técnico de comprovantes/anexos permanecem para F2-T004.
- **B1-INT-01:** nenhuma integração externa é ativada nesta task.
- Não há liberação automática para produção nesta SPEC.

## Critérios de aceite

- [ ] **CA-2-101:** aprovação válida cria exatamente um pedido comercial rastreável.
- [ ] **CA-2-102:** alteração, recusa e expiração preservam versões e não convertem indevidamente.
- [ ] **CA-2-103:** conversão repetida retorna vínculo existente e é auditada.
- [ ] **CA-2-104:** divergência financeira retorna ao atendimento com dono, motivo e próxima ação.
- [ ] **CA-2-105:** RLS protege composição e conferência financeira.
- [ ] **CA-2-106:** não há liberação de produção nem escrita externa.

## TDD da SPEC

RED: aprovação duplicada, versão expirada, comprovante divergente e acesso indevido. GREEN: fixtures de aprovação, alteração, recusa, expiração, repetição e divergência. REGRESSÃO: repetir conversão e modificar versão após resposta. As entregas derivadas e a cortesia de degustação deverão ser cobertas na construção/regressão das tasks dependentes.

## Tasks vinculadas

F2-T003, F2-T004, F2-T005, F2-T006, F2-T007, F2-T008 e F2-T010.
