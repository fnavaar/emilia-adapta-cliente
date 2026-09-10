# AP-2026-09-10 — Separar aceite comercial de pagamento e produção

- Status: candidato
- Escopo: projeto do cliente
- Task/SPEC: F2-T003 / SPEC-2-002
- Sinal: a regra de negócio exige conferência explícita dos dados pela cliente antes do pagamento; degustações são produção rastreável, mas não são venda nem contas a receber.
- Evidência: `05_entregas/F2-T003-recibo-aceite-estados-degustacoes.md` e aprovação humana registrada em 2026-09-10.
- Regra reutilizável: modelar aceite comercial, situação financeira e execução operacional como estados independentes; registrar cortesia de produção separadamente de venda e cobrança.
- Quando aplicar: em fluxos de proposta, pedido, pagamento, produção e degustação da Emília.
- Quando não aplicar: não usar para afirmar que uma implementação técnica já existe; o contrato precisa ser coberto pelas tasks de construção e seus testes.
- Confiança: alta — regra confirmada pela Gestão e formalizada na SPEC.
- Privacidade: sem segredo, dado pessoal ou conteúdo bruto.
