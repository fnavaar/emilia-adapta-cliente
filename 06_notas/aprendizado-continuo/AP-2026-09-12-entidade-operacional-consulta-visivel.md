# AP-2026-09-12 — Entidade operacional precisa de consulta visível

- Status: candidato
- Escopo: projeto do cliente
- Task/SPEC: F2-T009 / SPEC-2-001
- Sinal: o orçamento foi persistido, versionado e auditado corretamente, mas a usuária não conseguia consultar rascunhos, versões ou eventos pela interface.
- Evidência: teste humano aprovado da F2-T009 em 2026-09-12; backend confirmou registros em `propostas` e `auditoria_propostas`; melhorias futuras 5 e 6 registradas em `06_notas/melhorias-futuras.md`.
- Regra reutilizável: toda entidade operacional criada para uso do time precisa ter, além da persistência e auditoria, uma superfície de consulta legível e coerente com o vocabulário da operação.
- Quando aplicar: ao fechar qualquer task que crie registros usados no dia a dia, conferir criação, persistência, reabertura/consulta e rastreabilidade visual.
- Quando não aplicar: entidades exclusivamente técnicas ou dados sem usuário operacional, desde que a decisão esteja documentada.
- Confiança: alta — a lacuna foi observada pela usuária durante o teste e reproduzida comparando a interface com os registros reais do backend.
- Privacidade: sem segredo, credencial, dado pessoal ou conteúdo bruto.
