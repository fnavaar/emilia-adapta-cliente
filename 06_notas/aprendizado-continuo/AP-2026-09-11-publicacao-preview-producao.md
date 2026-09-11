# AP-2026-09-11 — Publicação explícita entre Preview e produção

- Status: candidato
- Escopo: projeto do cliente
- Task/SPEC: F2-T008 / SPEC-2-002
- Sinal: validar somente o Preview não garante que a URL de produção esteja servindo a mesma versão; a produção precisou de publicação explícita para refletir a correção visual.
- Evidência: `06_notas/debug/debug-2026-09-11-status-pago-fila.md`; projeto publicado na ref `597c62e`; verificação da rota `/financeiro/fila` nas URLs de Preview e produção.
- Regra reutilizável: quando uma task depende de mudança visual, publicar explicitamente a versão candidata na produção antes do teste humano se o cliente usa a URL de produção; verificar as duas URLs e a versão/ref servida.
- Quando aplicar: após correção de interface e antes do gate de teste humano, sempre que Preview e produção forem URLs distintas.
- Quando não aplicar: projetos sem ambiente de produção separado ou quando o teste humano estiver explicitamente limitado ao Preview.
- Confiança: alta — a diferença foi reproduzida, a publicação corrigiu o ambiente observado e Fernanda confirmou o teste.
- Privacidade: sem segredo, dado pessoal ou conteúdo bruto.
