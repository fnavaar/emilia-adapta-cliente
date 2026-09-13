# Emenda — política de cancelamento

**Data:** 2026-09-13
**Decisor:** Consultor Navaar
**Origem:** divergência entre SPEC/recibo/STATUS da Fase 2 sobre a regra de cancelamento de pedidos.

## Regra decidida

- Pedidos de até 100 unidades: reembolso integral até 7 dias antes da data do evento (`oportunidades.data_evento`).
- Após esse limite: cancelamento somente por Administrador, com retenção de 20% do valor.
- Sem data/quantidade/total confiáveis: recusa fail-closed do cancelamento.
- Operação transacional e idempotente.

## Destino

A regra entra na recertificação da SPEC-3-001 e passa a valer para o registro canônico a partir da Fase 3.
