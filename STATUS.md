# STATUS — Projeto Mara Cristina Amaral Santos - ME

> **Atualizado em:** 2026-09-02 · **Por:** ETHOS (Bia)
> O painel do projeto: fase atual, progresso e o que precisa de atenção.

## Onde estamos

- **Fase atual:** 1 — Registro canônico, entrada e briefing estruturado · aberta em 2026-08-25 · reunião de fechamento ainda não agendada
- **Objetivo desta fase:** registrar uma entrada de teste em um registro canônico, reutilizar dados no briefing e tornar pendências, duplicidades, permissões e fallback demonstráveis.
- **No prazo?** sim — F1-T014 concluída com harness de homologação, idempotência e fallback; integração externa continua bloqueada por B1-INT-01.
- **Correção concluída:** Segmento permanece oculto no atendimento; somente Tipo de evento é exibido, com segmento derivado e persistido internamente.

## Progresso da fase

- **Tasks:** 14/15 (93,3%)
- **Tasks concluídas:** F1-T001 a F1-T014
- **Próxima task após nova análise e autorização:** F1-T015

## Travas ativas

| Critério de execução | Desde | Quem resolve | Ação em curso |
|---|---|---|---|
| Regressão final do consumidor e prova de bloqueio externo | 2026-09-02 | Responsável técnico | F1-T015 |
| Endpoint, autenticação real, limites e autorização de escrita externa | 2026-08-25 | Responsável técnico/Gestão | B1-INT-01; não ativar integração |

## Entregas concluídas

| Fase | O que foi entregue | Fechada em |
|---|---|---|
| Preparação | SPECs, tasks e handoff da Fase 1 preparados | 2026-08-25 |
| F1-T001 | Recibo de homologação e dicionário baseado na API GestãoClick; teste humano aprovado | 2026-08-25 |
| F1-T002 | Cadastro progressivo, Pessoa reaproveitável, Natureza/Classificação, origem/categoria, telefone, duplicidade e salvamento validados | 2026-08-27 |
| F1-T003 | Busca/reuso, decisão humana de duplicidade, histórico e rollback não destrutivo | 2026-08-27 |
| F1-T004 | Briefing com busca incremental, opção de adicionar novo e subtipos corrigidos; QA passou e teste aprovado | 2026-08-28 |
| F1-T005 | Template único de briefing com grupos condicionais; QA passou e teste aprovado | 2026-08-31 |
| F1-T006 | Fila de pendências e conflitos no briefing; QA passou e teste aprovado | 2026-08-31 |
| F1-T007 | Inventário de fontes e versão 2026.1 aprovados | 2026-08-28 |
| F1-T008 | Catálogo versionado com rastreabilidade, estados, índice único, fixtures e tela `/catalogo`; QA passou e teste aprovado | 2026-08-31 |
| F1-T009 | Seleção de catálogo aprovado no briefing com snapshot e inativação preservando histórico; QA passou e teste aprovado | 2026-08-31 |
| F1-T010 | Matriz incremental de papéis e capacidade real registrada | 2026-08-31 |
| F1-T011 | Perfis/RLS por papel, Administrador da Fase 1, histórico protegido, manutenção de catálogo, consulta operacional e contas de homologação; QA 0.0.60 passou e teste aprovado | 2026-08-31 |
| F1-T012 | Regressão de permissões, auditoria genérica legível, tentativas negadas, revogação, bloqueio de login revogado, acesso direto protegido e minimização; QA 0.0.66 passou e teste aprovado | 2026-09-01 |
| F1-T013 | Contrato v1, schema JSON, cinco fixtures, respostas, idempotência, estruturas de eventos/fallback e documentação; QA 0.0.67 passou, B1-INT-01 mantido e teste humano aprovado | 2026-09-01 |
| F1-T014 | Harness administrativo de homologação com cinco fixtures, hash/event_id, idempotência, conflito, rejeição, timeout e fallback; migration 0029 aplicada, QA 0.0.73 passou e teste humano aprovado | 2026-09-02 |
| Correção de modelo | Segmento oculto no atendimento; Tipo de evento visível; segmento derivado persistido internamente; QA 0.0.68 passou e consulta autenticada confirmou `bem_nascido` → `maternidade` | 2026-09-01 |

## Próxima reunião

Ainda não agendada — demonstração prevista: entrada, registro canônico, briefing, pendência, duplicidade, permissão, rollback e fallback com fixtures.
