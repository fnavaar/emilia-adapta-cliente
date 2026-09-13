# Visão do projeto — Mara Cristina Amaral Santos - ME

> O mapa completo do programa: por que ele existe e o arco das 5 fases até a validação integral.

## Objetivo de negócio

Substituir o controle manual de composição, proposta, aprovação, conversão e fila financeira do Emília Bem Casados por um sistema determinístico, com recertificação da base F1–F2 como correção bloqueante da Fase 3.

## Arco das fases

1. **Fase 1** — Registro canônico, briefing condicional, catálogo versionado, permissões/auditoria e webhook/fallback (arquivada).
2. **Fase 2** — Composição versionada, proposta comercial, aprovação/conversão e fila financeira (arquivada em 05_entregas/fase-2).
3. **Fase 3** — Jornadas especiais, produção com liberação controlada, expedição/entrega/ocorrência. Aberta com correção bloqueante (SPEC-3-001).
4. **Fase 4** — Loops/agentes operando os sistemas das fases 1–3.
5. **Fase 5** — Validação integral do conjunto.

## Princípios

- Uma task por vez, com teste humano entre tasks.
- Nenhuma publicação em produção sem autorização explícita registrada.
- Nenhum dado real antes da política e da allowlist aprovadas.
- O champion decide; o sistema executa e registra.
