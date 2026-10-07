# Processo de sincronização de OPs — como os arquivos são lidos e adicionados ao Skip

**Registrado em:** 2026-10-06 · **Aplicado nos lotes 1–5** (último: lote 5, 01/10, migration 0058)

## 1. Entrada (o que a Champion envia)

- **Resumo .md** da atualização: pedidos novos, pedidos alterados (o que mudou), totais da semana por data/situação e totais por sabor. É a **fonte da verdade** para situação, data e quantidade em caso de divergência.
- **PDFs das OPs** (GestãoClick): um arquivo por pedido, nome `OrdemProducao_<num>_<cliente>.pdf`.

## 2. Leitura dos PDFs (extração)

1. Cada PDF é convertido em texto com `pdftotext -layout` (preserva colunas).
2. Extração por campos: `ORDEM DE PRODUÇÃO Nº <num>` + data de emissão, `PRAZO DE ENTREGA`, cliente (`Cliente:` ou `Razão social:`), itens da seção PRODUTOS (nome → **sabor** + descrição entre parênteses → **quantidade**), seção OBSERVAÇÕES (obs. de embalagem, alterações, anexos).
3. Itens multilinha (descrição quebrada) são reconstruídos lendo o bloco completo do item.
4. PDFs duplicados são deduplicados por hash md5; quando existem 2 versões distintas da mesma OP, usa-se a mais completa (com observações) e a diferença fica registrada.

## 3. Conferência (antes de gravar qualquer coisa)

- Total de unidades por OP × tabela do resumo (ex.: lote 5 = 46 novas, 2.128 un — bateu exato).
- Totais por data × situação × resumo.
- **Divergência PDF × resumo** (ex.: 41599 PDF 200 vs resumo 246; 41730 PDF 280 vs resumo 380; 39653 PDF 02/10 vs resumo 01/10): aplica-se o **resumo** e a divergência fica registrada na observação do pedido e no histórico.

## 4. Geração da migration

1. JSON estruturado por OP: `{op, data, st, cliente, obs, alt, itens:[{s,d,q}]}` — gerado por script a partir da extração, **nunca digitado à mão** (lição do lote 4: 623 un de divergência por digitação manual).
2. Template da migration (idempotente por `source_ref = OP-<num>`): cliente novo (modelo 27/08: Situação/Natureza/Classificação) → oportunidade → proposta aprovada → itens_proposta → pedido (`status_comercial=aprovado`, `status_operacional` conforme resumo, `numero_op`, `obs_embalagem`, composição_snapshot). OP já existente = atualização com histórico ("OP X sincronizada (data, lote N)").
3. Previsões (`previsao_entrega`) ficam **fora do total a produzir** (decisão da Champion, 22/09).
4. Auditoria da importação registrada na coleção `auditoria` + histórico por OP.

## 5. Adição ao Skip

1. Arquivo gravado em **`pocketbase/migrations/00XX_sincronizacao_ops_loteN.js`** — caminho obrigatório (lição do lote 5: `migrations/` na raiz NÃO roda).
2. `skip_project_apply_changes` roda o pipeline QA (setup → static → build → integrations/migrations → test) e cria a versão (ex.: lote 5 = QA 0.0.165).
3. Confirmação em `list_migrations`: status **applied** (ex.: 0058 applied em 2026-10-01T14:15Z).

## 6. Validação

- **Automática:** QA PASS + status applied + totais conferidos contra o resumo.
- **Visual (Champion):** aba Produção semanal / Relatórios Operacionais no preview — a API de leitura sem login retorna 0 por RLS, então a conferência final é sempre pela UI logada (Fê).

## Regras fixas do processo

- Resumo da Champion vence PDF em divergência; divergência registrada no histórico do pedido.
- Migration de dados sempre em `pocketbase/migrations/`; JSON sempre gerado por script.
- Nenhum preço inventado; valores comerciais zerados (fidelidade ao documento).
- Nenhuma task publica produção (regra da fase).
