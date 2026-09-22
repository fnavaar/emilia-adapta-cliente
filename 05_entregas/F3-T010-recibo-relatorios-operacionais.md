# Recibo F3-T010 — Relatórios operacionais + importação das 30 OPs reais

**Data:** 22/09/2026 · **Champion:** Fernanda · **Estado:** aguardando teste humano

## Escopo autorizado
"Pode implementar o plano completo" (22/09, 19:01): 4 relatórios operacionais + importação das 30 OPs do GestãoClick + regra de previsões fora do total.

## Entregue

### 1. Página Relatórios Operacionais (`/relatorios/operacionais`)
- Menu "Relatórios Operacionais" no AppShell (perfis administrador/gestão/produção/financeiro/atendimento); rota protegida em App.tsx.
- Aba **Produção do dia**: total por sabor (só pedidos confirmados) + abertura por sabor+embalagem + bloco vermelho "Previsões (fora do total — não produzir sem confirmação)".
- Aba **Pedido a pedido**: cartão por OP (nº OP, cliente, itens com qtd/sabor, embalagem e acessórios extraídos da descrição, obs. de embalagem).
- Aba **Acabamento**: tabela agrupada por data de entrega com coluna **Status** do pedido (era inexistente; agora visível).
- Aba **Expedição**: cartões de conferência com obs. de embalagem em destaque (etiqueta de validade, "mandar bem fresco", "sem logo", tag do cliente).
- Seletor de data de entrega; 4 impressões legíveis (padrão da correção da fila: Georgia, tabela, ID/OP em cada linha).

### 2. Migration 0046 — importação das 30 OPs (23–24/09/2026)
- Campos aditivos em pedidos: `numero_op`, `obs_embalagem`.
- Importação idempotente por `source_ref = OP-<num>`: cliente (com Situação/Natureza/Classificação do modelo 27/08; PJ detectada por razão social; classificação = cliente_padrao) → oportunidade → proposta aprovada → itens_proposta → pedido (`status_comercial=aprovado`, `status_operacional` conforme GestãoClick).
- 30 OPs, 48 itens, 3.170 un (23/09: 1.079 · 24/09: 2.091); sabores: Tradicional 2.384, Limão Siciliano 429, Pistache 150, Coco 121, Belga 82, Nozes 2, Churros 2.
- **Previsões**: OP 40817 (Thaysa dos Santos Roza Pavani, entrega 24/09) importada como `previsao_entrega` — fora do total a produzir (decisão da Champion; ponto 20.6 da especificação operacional).
- Nenhum preço inventado: valores zerados e tabela comercial não tocada; observações e histórico de alterações preservados (ex.: alteração de data da Thaysa).
- Auditoria da importação registrada (`importacao_ops`); histórico por OP.

### 3. Suíte de invariantes (F3-T010a–f)
- 0046 existe; idempotência por source_ref; sem preço inventado; filtro de previsões na página; rota+menu registrados; auditoria da importação.

## Verificação automática
- QA Skip **0.0.131 → 0.0.134**: 0.0.131–0.133 revelaram 3 erros reais de seed (valores de select desatualizados: `outros` em tipo_cliente, `fechado` em status, `ordem` iniciando em 0) — corrigidos consultando o estado real da instância; **0.0.134 PASS integral** (setup, static, build, integrations/migrations, test).
- Aprendizado capturado: `06_notas/aprendizado-continuo/AP-2026-09-22-f3-t010-select-values-dependem-da-instancia.md`.

## Teste humano (roteiro)
No **preview**, logada como Fernanda:
1. Menu **Relatórios Operacionais** → conferir se as 30 OPs aparecem (23 e 24/09 no seletor).
2. Aba **Produção do dia** (24/09): total por sabor deve somar 2.091 − 50 (Thaysa) = **2.041**; Thaysa deve aparecer no bloco vermelho de PREVISÕES.
3. Aba **Pedido a pedido**: abrir a OP 41387 (Marcela) — embalagem "tecido tricoline + cordão encerado + camélia"; obs. "cheiro de ovo".
4. Aba **Acabamento**: confirmar agrupamento por data de entrega e coluna Status.
5. Aba **Expedição**: obs. de embalagem em destaque (ex.: OP 41684 "MANDAR BEM FRESCO").
6. Clicar em **Imprimir** em pelo menos um relatório e conferir a legibilidade.

## Fora de escopo (futuro)
R2 completo (plano diário + freezer), R3 (realizado), R4 (mapa de embrulho), R10 (saídas logísticas), apontamentos por etapa.

## Limitações
- Preços das OPs não migrados (fidelidade ao documento; sem inventar valor).
- Telefones parcialmente extraídos (algumas OPs corporativas trazem só telefone da sede).
- Produção NÃO publicada (regra da fase).
