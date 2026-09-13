# SPEC-3-002 — Jornadas especiais no registro canônico

**Fase:** 3
**Status:** bloqueada por SPEC-3-001 e parâmetros operacionais do Champion
**Dono:** Executor (plugin); parâmetros: Champion

## Contexto

Com a base recertificada, o registro canônico passa a suportar jornadas especiais (eventos fora do padrão de composição), com parâmetros definidos pelo Champion.

## Resultado observável

Jornadas especiais registráveis no sistema, com campos mínimos validados e visíveis no registro canônico.

## Limites e dependências

- Depende do aceite da SPEC-3-001.
- Parâmetros operacionais (tipos de jornada, regras de preço, prazos) são decisão do Champion — não inventar.

## Critérios de aceite

- CA-3-008: jornada especial criável somente com campos mínimos completos.
- CA-3-009: jornada especial aparece no registro canônico com trilha de auditoria.
- CA-3-010: recusa de jornada sem parâmetros definidos pelo Champion.

## TDD

- **RED:** tentativa de criar jornada sem parâmetros falha.
- **GREEN:** jornada válida criada e visível.
- **REGRESSÃO:** fluxos padrão de composição/proposta inalterados.
