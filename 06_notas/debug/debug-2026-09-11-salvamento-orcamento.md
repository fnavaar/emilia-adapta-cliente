# Debug Summary — F2-T007 — salvamento do orçamento

**Data:** 2026-09-11
**Sintoma:** o rascunho não salvava pelo montador.
**Ambiente:** Preview do Nexus Emilia, F2-T007.

## Reprodução

O fluxo criava o registro de `propostas`, mas falhava ao criar o primeiro registro de `itens_proposta`.

## Causa raiz

O montador atribuía `ordem: current.length` aos itens. O primeiro item recebia `ordem = 0`. No schema aplicado, `ordem` é inteiro com mínimo 0, mas o runtime rejeitou o valor no create como campo obrigatório vazio. A evidência observável foi a resposta 400 do backend no create do primeiro item, enquanto a proposta pai já existia.

## Correção

- Alterado o cálculo para `ordem: current.length + 1`.
- Mantida a renumeração dos itens após remoção.
- Textos visíveis e mensagens operacionais ajustados de “proposta” para “orçamento”, conforme decisão da Fernanda.

## Verificação

- QA da versão `0.0.86`: setup, análise estática, build, integrações e testes passaram.
- Prova backend de novo orçamento: criou registro pai em `rascunho`, item com `ordem = 1` e auditoria de criação.
- Resultado: fluxo de salvamento do rascunho passou.

## Gate

Correção concluída; aguarda novo teste humano no Preview. A task F2-T007 não foi concluída ainda.
