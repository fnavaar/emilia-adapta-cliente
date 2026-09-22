# Recibo F3-T011 — Lista de embrulho por papel + planejamento semanal de produção

**Data:** 22/09/2026 · **Champion:** Fernanda · **Estado:** aguardando teste humano

## Escopo autorizado
"Pode implementar as duas listas" (22/09, 19:36) — lista de embrulho por cor de papel + planejamento semanal de produção (modelo da planilha enviada pela Champion).

## Entregue

### 1. Aba "Embrulho por papel" (Relatórios Operacionais)
- Lista simples no formato pedido: "300 bc Tradicional — crepom encerado branco", somando por sabor + cor de papel extraída da descrição dos itens.
- Sem cor explícita no pedido = **"a definir"** (nunca presumir marfim — critério informado à Champion; ela pode mudar depois).
- Tecido/tricoline/juta aparecem como "tecido/juta" (não é crepom).
- Total geral a embrulhar + aviso quando houver itens "a definir" + impressão própria.

### 2. Aba "Produção semanal" (modelo da planilha da Champion)
- **Entregas (vendido)**: linha automática — soma dos pedidos confirmados por dia da semana (previsões fora; fonte única de verdade = pedidos).
- **Pedidos / Ifood / Sobra / Estoque**: campos editáveis dia a dia, definidos pelas admins (RLS: só administrador/gestão salvam — migration 0048).
- **Produzido (real)**: linha informada pela produção (o azul da planilha) — sempre varia do planejado; comparação vira insumo da decisão de margem da Mara.
- Totais por linha e por dia; semana selecionável (inicia na segunda); impressão no padrão da planilha (Entregas + linhas + Produzido real).
- Uma linha de planejamento por semana (índice único em `semana`); dados em JSON versionável.

### 3. Correções do teste humano da F3-T010 (QA 0.0.135)
- Impressão da fila de produção: **OP + nome do cliente** em cada linha (expand cliente_id) + total geral.
- Totais adicionados às impressões dos 4 relatórios.

## Verificação automática
- QA Skip 0.0.136: staticAnalysis/build revelaram marcador de conflito órfão no TSX (erro de patch) — corrigido; **0.0.137 PASS integral**.
- Suíte de invariantes estendida (F3-T011a–e): migration 0048 existe; RLS admin/gestão; entregas calculadas (nunca digitadas) e previsões fora; "a definir" na lista de embrulho; linha do real produzido.

## Teste humano (roteiro)
No preview, logada como Fernanda:
1. Relatórios Operacionais → aba **Embrulho por papel**: conferir a lista (ex.: "30 bc Tradicional — crepom encerado branco") e o total; itens sem cor devem aparecer como "a definir".
2. Aba **Produção semanal**: conferir entregas automáticas (24/09 = 2.041), preencher Ifood/Sobra/Estoque, salvar, recarregar e conferir persistência.
3. Informar um "Produzido (real)" diferente do planejado e conferir a comparação.
4. Imprimir o planejamento e a lista de embrulho.

## Fora de escopo (futuro)
Retirada do freezer no planejamento (R2 completo), apontamento por etapa (R3), distribuição por bandeja, saídas logísticas (R10).

## Limitações
- Cor do papel extraída por heurística da descrição livre; itens ambíguos ficam "a definir".
- Planejamento semanal não impede salvar semana sem pedidos (planejamento antecipado é legítimo).
- Produção NÃO publicada (regra da fase).
