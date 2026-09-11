# Recibo F2-T005 — Modelo de proposta, políticas, snapshots e auditoria

**Status:** implementação realizada; aguardando teste humano
**Data:** 2026-09-11
**Task:** F2-T005
**SPEC:** SPEC-2-001 — Composição versionada e proposta comercial

## O que foi criado

Migration `pocketbase/migrations/0003_propostas_politicas_auditoria.js` com quatro coleções:

- `politicas_comerciais`
- `propostas`
- `itens_proposta`
- `auditoria_propostas`

## Regras persistidas

- Propostas são vinculadas a cliente e oportunidade.
- Propostas têm versão e status comercial.
- Uma proposta pode apontar para sua versão anterior sem apagar o histórico.
- Itens preservam código, label, versão do catálogo e composição como snapshot.
- Itens distinguem cumulativo e alternativa por grupo.
- Políticas têm tipo, versão, vigência, fonte, aprovador, alçada, estado e precedência configurável.
- Políticas podem ser vinculadas a tabela-base, cliente, grupo ou parceiro.
- Valores de subtotal, desconto, frete e total são campos de snapshot; a migration não calcula esses valores.
- Auditoria é append-only: `updateRule` e `deleteRule` permanecem bloqueados.
- Coleções não possuem exclusão pela API (`deleteRule: null`).
- A relação autorreferente de versão anterior é adicionada depois que a coleção `propostas` recebe seu próprio ID.

## Limites preservados

- Não há cálculo de preço.
- Não há aplicação automática da precedência entre tabelas.
- Não há aprovação automática de política.
- Não há montador visual de proposta.
- Não há integração externa, Stone, Pix ou conciliação.
- Não há liberação de produção.

## Verificação automatizada

Executado contra o arquivo recuperado do branch `main`:

```text
node --check /tmp/f2-t005.js
syntax=passed
self_relation=present
non_destructive_delete_rules=present
audit_collection=present
```

A verificação sintática não substitui a aplicação da migration em um PocketBase de homologação; essa é a etapa do teste humano/ambiente de execução.
