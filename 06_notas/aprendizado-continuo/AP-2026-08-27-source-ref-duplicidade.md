# AP-2026-08-27 — Idempotência e decisão humana por source_ref

- Status: candidato
- Escopo: projeto do cliente
- Task/SPEC: F1-T003 / SPEC-1-001
- Sinal: uma mesma origem pode reaparecer e não deve gerar reuso, merge ou novo registro silencioso.
- Evidência: migration 0011 aplicada; campo `source_ref` e decisão `decisao_duplicidade` persistidos; teste humano confirmou criação, repetição com reuso, criação de novo preservando o original e rollback de fixture funcionando.
- Regra reutilizável: tratar `source_ref` como identificador de idempotência; ao encontrar repetição, interromper a criação e exigir decisão humana registrada no histórico.
- Quando aplicar: entradas de oportunidade provenientes de integrações, importações ou fixtures que tenham identificador de origem estável.
- Quando não aplicar: entradas sem identificador confiável, que devem seguir fluxo de possível duplicidade por outros campos e decisão humana.
- Confiança: alta — implementação, schema, migration e teste humano confirmaram o comportamento.
- Privacidade: sem segredo, dado pessoal ou conteúdo bruto
