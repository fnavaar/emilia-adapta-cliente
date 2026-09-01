# AP-2026-09-01-1805 — Segmento interno derivado do tipo de evento

- Status: candidato
- Escopo: projeto do cliente
- Task/SPEC: CORREÇÃO-SEGMENTO-EVENTO / SPEC-1-002
- Sinal: o formulário apresentava o segmento como informação de atendimento, embora a decisão de produto determine que somente o tipo de evento seja visível.
- Evidência: QA Skip v0.0.68 aprovado e consulta autenticada da coleção `oportunidades` retornou `tipo_evento=bem_nascido`, `segmento=maternidade` e `segmento_classificado=maternidade`.
- Regra reutilizável: manter segmento como classificação interna derivada do tipo de evento; não exibir o segmento no cadastro ou atendimento.
- Quando aplicar: em formulários e consultas operacionais de oportunidade; relatórios e filtros administrativos podem usar o segmento interno.
- Quando não aplicar: quando uma decisão futura de gestão autorizar uma tela específica de análise por segmento.
- Confiança: alta — regra explicitamente confirmada pela gestão e verificada no registro persistido.
- Privacidade: sem segredo, dado pessoal ou conteúdo bruto.
