# AP-2026-08-31-1400 — Edições em blocos precisam de posição única

- Status: candidato
- Escopo: projeto do cliente
- Task/SPEC: F1-T006 / SPEC-1-002
- Sinal: uma edição incremental repetida em arquivo já alterado deixou marcadores e fechamento sintático inválido.
- Evidência: QA 0.0.50 apontou `Unexpected token` no handler `registrarDecisao`; restauração controlada e reaplicação em posições únicas levaram ao QA 0.0.52 aprovado.
- Regra reutilizável: antes de aplicar um patch, reler o arquivo atual; cada bloco deve ter âncora única; após a edição, contar marcadores e símbolos-chave antes do build.
- Confiança: alta — causa e correção foram observadas diretamente no QA.
- Privacidade: sem segredo, dado pessoal ou conteúdo bruto.
