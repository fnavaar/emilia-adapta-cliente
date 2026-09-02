# AP-2026-09-02 — Harness administrativo com coleções protegidas

- Status: candidato
- Escopo: projeto do cliente
- Task/SPEC: F1-T014 / SPEC-1-005
- Sinal: rotas customizadas novas não foram expostas pelo runtime, embora o QA passasse; o padrão funcional foi manter o processamento na superfície administrativa e proteger a escrita por regra de coleção.
- Evidência: logs de runtime com 404 nas rotas experimentais; QA Skip v0.0.73 aprovado; migration 0029 aplicada com criação restrita das coleções de integração ao Administrador; teste humano da tela de homologação aprovado por Fernanda.
- Regra reutilizável: em homologação, preferir uma superfície administrativa autenticada e regras explícitas de coleção quando o runtime não carregar rotas adicionais; nunca considerar QA de build como prova de rota funcional.
- Quando aplicar: harnesses internos sem endpoint externo e cenários em que a escrita precisa permanecer restrita.
- Quando não aplicar: integrações reais, que exigem contrato, autenticação e autorização próprios antes de qualquer ativação.
- Confiança: alta — padrão sustentado por falha observada, correção aplicada e teste humano aprovado.
- Privacidade: sem segredo, dado pessoal ou conteúdo bruto.
