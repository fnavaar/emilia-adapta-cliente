# AP-2026-09-11 — Relação autorreferente em migration do PocketBase

- Status: candidato
- Escopo: projeto do cliente
- Task/SPEC: F2-T005 / SPEC-2-001
- Sinal: a relação de uma proposta com sua versão anterior depende do identificador da própria coleção.
- Evidência: migration `pocketbase/migrations/0030_propostas_politicas_auditoria.js`, aplicada como `0030_propostas_politicas_auditoria` no Skip Cloud; QA 0.0.76 passou e o backend confirmou `versao_anterior_id` relacionado à coleção `propostas`.
- Regra reutilizável: em migrations PocketBase, salvar a coleção antes de criar uma relação autorreferente; depois adicionar `new RelationField` usando `collectionId` da coleção salva e persistir novamente.
- Quando aplicar: ao modelar entidades que apontam para versões anteriores do próprio registro.
- Quando não aplicar: relações entre coleções já existentes podem usar diretamente o ID disponível antes do `app.save`.
- Confiança: alta — validado pelo pipeline e pela inspeção do schema aplicado.
- Privacidade: sem segredo, dado pessoal ou conteúdo bruto.
