# AP-2026-09-23 — F3-T011: data PocketBase + migrations pendentes de retry

## Sinal reutilizável
**Causa 1 (crash):** datas de campos `date` do PocketBase chegam ao frontend como "YYYY-MM-DD 00:00:00.000Z" (com espaço, não "T"). Concatenar esse valor com "T12:00:00" (padrão para datas puras) gera Date inválido e `Invalid time value` — a tela inteira fica branca, sem mensagem de erro visível.
**Causa 2 (coleção ausente):** quando o estágio `integrations` do QA falha (ex.: 0.0.136 com erro de lint/build), as migrations pendentes de retry NÃO são aplicadas; o apply seguinte (0.0.137) passou nos testes estáticos mas não reaplicou a migration pendente — a coleção só apareceu no apply seguinte (0.0.138).

## Orientação
1. Sempre normalizar data PocketBase no frontend: `new Date(String(v).slice(0, 10) + 'T12:00:00')` + guard `isNaN`.
2. Depois de qualquer QA com estágio `integrations` falho, verificar se as migrations pendentes foram aplicadas (skip_cloud_list_migrations / get_collections) antes de reportar pronto.
3. Tela branca em aba nova = suspeitar de crash de renderização (Date/undefined), não de rota ou permissão.

## Evidência
Reprodução em node: `new Date('2026-09-24 00:00:00.000Z' + 'T12:00:00')` → Invalid Date. Correção aplicada na PlanejamentoSemanal.tsx; coleção planejamento_producao verificada na instância após 0.0.138.
