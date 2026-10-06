# AP-2026-10-06 — Lote 5: caminho de migration de dados + fonte da verdade na sincronização

- Status: candidato
- Escopo: projeto do cliente
- Task/SPEC: F3-T010 (sincronizações lote 4/5) · QA 0.0.158–0.0.165
- Sinal: (1) migration de dados escrita em `migrations/` (raiz do repo) NÃO roda — o runtime Skip só aplica `pocketbase/migrations/`; (2) PDFs enviados no sync podem estar em versão anterior ao resumo (41599: PDF 200 vs resumo 246; 41730: PDF 280 vs resumo 380; 39653: PDF 02/10 vs resumo 01/10); (3) API de leitura sem login devolve 0 registros por RLS.
- Evidência: `migrations/0058` não apareceu em list_migrations; recriada em `pocketbase/migrations/0058_sincronizacao_ops_lote5.js` → status applied (2026-10-01T14:15Z, QA 0.0.165); totais do lote 5 = 2.128 un batendo exato com o resumo; leitura anônima de pedidos retornou 0 com totalItems 0.
- Regra reutilizável: migration de dados sempre em `pocketbase/migrations/`; na divergência PDF × resumo durante sincronização, seguir o resumo da Champion e registrar a divergência no histórico do pedido; validar importação pela UI logada (ou contando com a Champion), nunca por API anônima.
- Quando aplicar: qualquer sincronização de OPs ou migration de dados no Nexus.
- Quando não aplicar: migrations de schema criadas pelo próprio Skip (caminho gerenciado).
- Confiança: alta — reproduzida nas duas frentes (caminho da migration; divergências confirmadas nos PDFs enviados).
- Privacidade: sem segredo, dado pessoal ou conteúdo bruto.
