# STATUS — Projeto Mara Cristina Amaral Santos - ME

> **Atualizado em:** 2026-09-11 · **Por:** ETHOS (Bia)
> O painel do projeto: fase atual, progresso e o que precisa de atenção.

## Onde estamos

- **Fase atual:** 2 — Composição, proposta, aprovação, conversão e fila financeira · liberada para execução sequencial em homologação
- **Objetivo desta fase:** transformar uma oportunidade com briefing em orçamento estruturado, aprovação rastreável, pedido-base e fila financeira visível.
- **No prazo?** sim — Fase 1 encerrada com 15/15 tasks; Fase 2 com 8/10 tasks concluídas e F2-T009 em validação humana.
- **Limites:** integração externa, conciliação bancária automática e liberação de produção permanecem fora desta fase.

## Onde está a execução

- **Task ativa:** F2-T009 — aguardando teste humano
- **Etapa:** implementação automatizada concluída; validação humana pendente
- **Progresso das tasks:** 8/10 concluídas (80%); F2-T009 não entra na contagem até aprovação humana
- **Próxima ação:** Fernanda executar o roteiro de teste da F2-T009 no Preview

## Progresso da fase

- **Tasks:** 8/10 concluídas; F2-T009 em validação; F2-T010 planejada
- **Tasks concluídas:** F2-T001, F2-T002, F2-T003, F2-T004, F2-T005, F2-T006, F2-T007, F2-T008
- **Task em validação:** F2-T009
- **Leva atual:** 3 — prova e handoff
- **Última entrega:** regressão de proposta, política e versões com QA 0.0.105; RLS de propostas/políticas/auditoria aplicado; produção não publicada nesta task.

## Travas ativas

| Critério de execução | Desde | Quem resolve | Ação em curso |
|---|---|---|---|
| Endpoint, autenticação real, limites e autorização de escrita externa | 2026-08-25 | Responsável técnico/Gestão | B1-INT-01; não ativar integração |
| Valores de adicionais e acumulação de descontos | 2026-09-10 | Gestão + Financeiro | Bloqueados até atualização/decisão; não calcular silenciosamente |
| Regra de cancelamento para pedidos até 100 unidades | 2026-09-10 | Gestão + Financeiro | Bloqueada; não inferir regra |

## Entregas concluídas

| Fase | O que foi entregue | Fechada em |
|---|---|---|
| Fase 1 | Registro canônico, briefing, catálogo, permissões, auditoria, harness, regressão e demonstração; 15/15 tasks | 2026-09-02 |
| F2-T001 | B2-POL-01: tabela 2026, moeda, vigência, fonte, aprovadoras e modelo de tabelas configuráveis por cliente/grupo | 2026-09-03 |
| F2-T002 | B2-POL-02/B2-POL-03: frete, descontos, validade, pagamentos, alterações, cancelamentos e alçadas | 2026-09-10 |
| F2-T003 | B2-APR-01/B2-FIN-01/B2-EST-01: aceite antes do pagamento, estados separados, entregas derivadas e degustações sem contas a receber; contrato aprovado e revalidado | 2026-09-10 |
| F2-T004 | B2-FIN-02: formatos, limites, versionamento, permissões de comprovantes e troca não destrutiva de pagamento; contrato aprovado e revalidado | 2026-09-10 |
| F2-T005 | Modelo persistente de propostas, itens, políticas, snapshots e auditoria; migration 0030 aplicada no Preview, QA 0.0.76 aprovado e teste humano aprovado | 2026-09-11 |
| F2-T006 | Montador de propostas com cumulativos, alternativas, snapshots e revisão bloqueada sem política; QA 0.0.77 aprovado e teste humano aprovado | 2026-09-11 |
| F2-T007 | Estados comerciais/operacionais/financeiros separados, resposta do orçamento, conversão única em pedido, auditoria e bloqueio sem política válida; migration 0031 aplicada, QA 0.0.86 aprovado e teste humano aprovado | 2026-09-11 |
| F2-T008 | Comprovantes versionados, fila financeira, divergência com pendência, RLS por papel e pagamento exibido como “Pago” após decisão; QA 0.0.99, produção publicada na ref 597c62e e teste humano aprovado | 2026-09-11 |

## Documentos da Fase 2

- `04_fase-atual/fase.md` — contrato da fase e tabela operacional das 10 tasks
- `04-fase-atual/specs/spec-2-001-composicao-politicas-proposta.md` — composição e proposta
- `04-fase-atual/specs/spec-2-002-aprovacao-conversao-fila-financeira.md` — aceite, conversão, estados e fila financeira
- `05_entregas/F2-T001-recibo-tabela-precos.md` — recibo B2-POL-01 concluído
- `05_entregas/F2-T002-recibo-frete-descontos-adicionais.md` — recibo B2-POL-02 concluído
- `05_entregas/F2-T002-recibo-validade-pagamentos-alcadas.md` — recibo B2-POL-03 concluído
- `05_entregas/F2-T003-recibo-aceite-estados-degustacoes.md` — recibo do contrato funcional F2-T003
- `05_entregas/F2-T004-recibo-comprovantes-permissoes.md` — recibo do contrato funcional F2-T004
- `05_entregas/F2-T005-recibo-modelo-propostas-politicas.md` — recibo técnico do modelo F2-T005
- `05_entregas/F2-T006-recibo-montador-propostas.md` — recibo validado do montador F2-T006
- `05_entregas/F2-T007-recibo-conversao-idempotente.md` — recibo validado de estados, resposta e conversão idempotente
- `05_entregas/F2-T008-recibo-comprovantes-fila-financeira.md` — recibo validado da fila financeira e comprovantes
- `05_entregas/F2-T009-recibo-regressao-propostas-versoes.md` — recibo da regressão, política e versões
- `06_notas/melhorias-futuras.md` — melhorias identificadas na Fase 1
