# STATUS — Projeto Mara Cristina Amaral Santos - ME

> **Atualizado em:** 2026-08-31 · **Por:** ETHOS (Bia)
> O painel do projeto: fase atual, progresso e o que precisa de atenção.

## Onde estamos

- **Fase atual:** 1 — Registro canônico, entrada e briefing estruturado · aberta em 2026-08-25 · reunião de fechamento ainda não agendada
- **Objetivo desta fase:** registrar uma entrada de teste em um registro canônico, reutilizar dados no briefing e tornar pendências, duplicidades, permissões e fallback demonstráveis.
- **No prazo?** sim — F1-T006 concluída após QA 0.0.52 e teste humano aprovado.

## Progresso da fase

- **Tasks:** 8/15 (53,3%)
- **Tasks concluídas:** F1-T001, F1-T002, F1-T003, F1-T004, F1-T005, F1-T006, F1-T007 e F1-T008
- **Próxima task após nova análise e autorização:** F1-T009 ou outra task liberada da Leva 1, conforme seleção própria

## Travas ativas

| Critério de execução | Desde | Quem resolve | Ação em curso |
|---|---|---|---|
| Matriz de usuários e RLS/auditoria | 2026-08-25 | Responsável técnico | F1-T010 |
| Contrato e homologação do webhook/bridge | 2026-08-25 | Responsável técnico | F1-T013 |

## Entregas concluídas

| Fase | O que foi entregue | Fechada em |
|---|---|---|
| Preparação | SPECs, tasks e handoff da Fase 1 preparados | 2026-08-25 |
| F1-T001 | Recibo de homologação, dicionário baseado na API GestãoClick, 6 coleções no Skip e teste humano aprovado | 2026-08-25 |
| F1-T002 | Cadastro progressivo com Pessoa reaproveitável, Natureza/Classificação, origem/categoria, telefone Brasil/Outro país, detecção de duplicidade e salvamento validado no preview | 2026-08-27 |
| F1-T003 | Busca/reuso por source_ref, decisão humana de duplicidade, histórico da decisão e rollback de fixture não destrutivo | 2026-08-27 |
| F1-T004 | Briefing de oportunidade com tipo de evento, segmento derivado oculto, busca de cliente por nome/telefone, opção de adicionar novo dentro da lista e subtipos de aniversário corrigidos; QA 0.0.42 passou e teste humano aprovado no preview | 2026-08-28 |
| F1-T005 | Template único de briefing com grupos condicionais para degustação, revendedor, bem-nascido e eventos; migrations 0016/0017; QA 0.0.47 passou e teste humano aprovado | 2026-08-31 |
| F1-T006 | Fila de pendências e registro de conflitos no briefing; migration 0018; campo faltante com motivo, responsável, próxima ação e prazo; dois valores conflitantes preservados com confirmação humana; QA 0.0.52 passou e teste humano aprovado | 2026-08-31 |
| F1-T007 | Inventário das fontes, B1-CAT-01, versão 2026.1, hashes/localizadores, recortes de fornecedores como fundamento técnico interno e regra de uso exclusivo do catálogo aprovado da Emília durante a venda; revisão humana aprovada | 2026-08-28 |
| F1-T008 | Catálogo versionado com coleção `catalogo_itens`, estados de revisão, campos de rastreabilidade, regra contra aprovação sem código/fonte/versão, índice único de código, fixtures e tela `/catalogo`; QA 0.0.44 passou e teste humano aprovado | 2026-08-31 |

## Próxima reunião

Ainda não agendada — demonstração prevista: entrada, registro canônico, briefing, pendência, duplicidade, permissão, rollback e fallback com fixtures.
