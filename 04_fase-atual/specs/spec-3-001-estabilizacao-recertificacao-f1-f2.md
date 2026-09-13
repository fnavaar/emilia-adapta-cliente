# SPEC-3-001 — Estabilização e recertificação da base F1–F2

**Fase:** 3
**Status:** planejada — bloqueante para todas as tasks da fase
**Dono:** Executor (plugin), com aceite do Champion

## Contexto

A auditoria da Fase 2 identificou que a produção foi usada fora do limite da fase, a prova técnica/RLS não era reproduzível pelo repositório e a regra de cancelamento divergia entre SPEC, recibo e STATUS. A emenda de cancelamento (03_documentos/correcoes/) decidiu a regra; esta SPEC recertifica a base antes de qualquer task funcional.

## Resultado observável

A base F1–F2 opera com a política de cancelamento correta, RLS verificável, migrations íntegras e sem credenciais hardcoded; recibo de recertificação assinado pelo Champion.

## Limites e dependências

- Nenhuma task da Fase 3 inicia antes do aceite desta recertificação.
- Nenhum dado real novo antes da política e allowlist vigentes.

## Regras

- Pedidos ≤ 100 unidades: reembolso integral até 7 dias antes de `oportunidades.data_evento`.
- Depois disso: somente Administrador, com retenção de 20%.
- Sem data/quantidade/total confiáveis: recusa fail-closed.
- Operação transacional e idempotente.

## Critérios de aceite

- CA-3-001: cancelamento ≤100 unidades até 7 dias antes do evento reembolsa integralmente.
- CA-3-002: cancelamento após o limite só por Administrador, com retenção de 20%.
- CA-3-003: recusa fail-closed quando dados do pedido não são confiáveis.
- CA-3-004: RLS ativa e provada por teste negativo por papel.
- CA-3-005: nenhuma credencial hardcoded; segredos somente via secrets do ambiente.
- CA-3-006: migrations íntegras e aplicáveis do zero em ambiente limpo.
- CA-3-007: recibo de recertificação com aceite humano registrado.

## TDD

- **RED:** testes de cancelamento (integral/admin/20%/fail-closed) falhando contra a base atual.
- **GREEN:** testes passam após correção; teste negativo de RLS por papel.
- **REGRESSÃO:** reexecutar testes de F1–F2 sem quebra; migração limpa em ambiente novo.

## Instruções ao Ethos

Não invente parâmetros: se faltar dado operacional, pare e devolva para o Champion. Nenhuma publicação em produção sem autorização registrada.
