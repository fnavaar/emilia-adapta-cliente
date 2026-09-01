# AP-2026-09-01-F1-T013 — Contrato antes da integração

- Status: candidato
- Escopo: projeto do cliente
- Task/SPEC: F1-T013 / SPEC-1-005
- Sinal: o contrato de evento pode ser fechado e testado em homologação sem ativar endpoint, credencial ou escrita externa.
- Evidência: `integration/CONTRATO-ENTRADA-EVENTO-V1.md`, `integration/schema/entrada-evento-v1.json`, `integration/fixtures/entrada-evento-v1.json`, migração 0028 aplicada e QA v0.0.67 aprovado.
- Regra reutilizável: separar contrato/fixtures de conexão externa; manter B1-INT-01 explícito até endpoint, autenticação, payload real, limites e autorização de escrita serem confirmados.
- Quando aplicar: antes de qualquer webhook, bridge ou integração bidirecional.
- Quando não aplicar: em fluxos internos sem entrada externa.
- Confiança: alta — estrutura persistida e QA observável; conexão externa deliberadamente não ativada.
- Privacidade: sem segredo, dado pessoal ou conteúdo bruto
