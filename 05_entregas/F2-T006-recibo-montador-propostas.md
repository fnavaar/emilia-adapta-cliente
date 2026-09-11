# Recibo F2-T006 — Montador de cumulativos, alternativas e revisão

**Status:** concluída e validada
**Data:** 2026-09-11
**Versão Preview:** 0.0.77
**Task:** F2-T006
**SPEC:** SPEC-2-001 — Composição versionada e proposta comercial

## Entrega

- Rota protegida `/propostas/nova`.
- Montador de proposta com seleção de cliente e oportunidade.
- Seleção somente de itens aprovados do catálogo.
- Inclusão de itens cumulativos, alternativas, serviços e observações.
- Grupo obrigatório para itens do tipo alternativa.
- Quantidade e ordem persistidas.
- Snapshots de código, label, versão do catálogo e composição.
- Resumo visual dos grupos exclusivos.
- Salvamento de rascunho em `propostas` e `itens_proposta`.
- Auditoria de criação em `auditoria_propostas`.
- Revisão bloqueada quando não existe política comercial aprovada.

## Limites preservados

- Não calcula preço.
- Não soma alternativas.
- Não aplica frete, desconto ou adicional.
- Não escolhe precedência entre tabelas.
- Não envia proposta externamente.
- Não integra Stone, Pix ou outro serviço externo.
- Não libera produção.

## Evidências

- QA da versão `0.0.77` passou em setup, análise estática, build, integrações e testes.
- Rota `/propostas/nova` abriu autenticada no Preview.
- Catálogo aprovado carregou e item aprovado foi adicionado.
- Alternativa com grupo foi registrada sem cálculo automático.
- Revisão permaneceu bloqueada sem política aprovada.
- Fernanda confirmou em teste humano: “sim, tudo funcionando”.
