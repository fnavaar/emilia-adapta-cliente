# SPEC-2-001 — Composição versionada e proposta comercial

**Fase:** 2 — Composição, proposta, aprovação, conversão e fila financeira
**Status:** proposta de especificação; execução depende das decisões B2 abaixo
**Dono:** Gestão para políticas; Atendimento para composição e proposta; Financeiro em consulta
**Origem no escopo:** RQ-003 a RQ-006; AC-003, AC-005, AC-006, AC-011 e AC-013; DH-004 e DH-005
**Degrau da solução:** construção controlada sobre catálogo já aprovado. Constrói composição e proposta rastreáveis; não presume preço, frete, desconto, vencimento ou integração externa.

## Resultado observável

A atendente abre um pedido-base elegível, seleciona itens aprovados do catálogo e monta uma proposta com itens cumulativos e alternativas mutuamente exclusivas. O documento mostra versões do catálogo e da política usadas. Uma regra sem fonte, vigência e alçada aparece como pendência de revisão e não altera o valor automaticamente.

## Dados e contrato

| Entidade | Campos mínimos | Regra de integridade |
|---|---|---|
| Proposta | oportunidade_id, versão, status, moeda, subtotal, desconto, frete, total, validade, política_id/versão, criada_por, enviada_em | uma proposta ativa por versão; totais são snapshot |
| Item de proposta | proposta_id, catalogo_item_id, código/label snapshot, quantidade, preço unitário snapshot, tipo, grupo_alternativa, ordem | item histórico persiste; nova inclusão exige catálogo aprovado |
| Política comercial | tipo, versão, vigência, fórmula/valor, fonte, aprovador, estado, alçada | somente aprovada e vigente é aplicável |

## Regras

1. Itens cumulativos integram o total. No mesmo grupo de alternativa, no máximo uma opção é selecionada e calculada.
2. Proposta guarda snapshots de código/label, preço, regra e política; mudanças posteriores não alteram a versão enviada.
3. Preço, desconto, frete, validade, condições e vencimento só são usados com fonte, versão, vigência, aprovador e alçada válidos.
4. Regra incompleta gera pendência para Gestão/Financeiro; atendimento não a apresenta como valor aprovado.
5. Exceção manual exige motivo, autor, alçada e nova versão.
6. Envio externo permanece manual até conector aprovado.

## Bloqueios

- **B2-POL-01:** tabela oficial de preços por item/unidade, vigência e moeda.
- **B2-POL-02:** frete, descontos, adicionais, validade e alçadas.
- **B2-POL-03:** termos e condições aprovados.

## Critérios de aceite

- [ ] **CA-2-001:** alternativas do mesmo grupo não são somadas.
- [ ] **CA-2-002:** proposta enviada conserva snapshots após mudança/inativação posterior.
- [ ] **CA-2-003:** política sem fonte, aprovação, vigência ou alçada não decide silenciosamente.
- [ ] **CA-2-004:** alteração cria versão auditável sem destruir a anterior.
- [ ] **CA-2-005:** RLS separa composição, política e exceção.

## TDD da SPEC

RED: reproduzir alternativa somada e política ausente. GREEN: fixtures de cumulativos, alternativas, catálogo inativado e política válida/inválida. REGRESSÃO: alterar catálogo/política após envio e provar snapshots inalterados.

## Tasks vinculadas

F2-T001, F2-T002, F2-T005, F2-T006 e F2-T009.
