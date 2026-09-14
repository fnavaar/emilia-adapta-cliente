# Recibo F3-T004 — Configurar variantes e mínimos das quatro jornadas

**Task:** F3-T004 · **SPEC:** SPEC-3-002 · **Data:** 2026-09-14 · **Status:** implementada, aguardando teste humano

## O que foi entregue

### Backend (repo técnico `ebc06162-ship-it/nexus-emilia-o0ismc251`, branch `feat/f3-t004-jornadas-especiais`)

1. **Migration 0041 `config_jornadas_especiais.js`** (aplicada no Skip como 0042 — offset de ordinais da instância, mesmo padrão documentado na T002):
   - Coleção `config_jornadas` (fonte única de mínimos por jornada): RLS de escrita só Administrador/Gestão, leitura operacional, `deleteRule: null` (fail-closed), índice único por jornada
   - Seed com os parâmetros aprovados pela Champion em 14/09/2026: degustação (cortesia presencial/retirada, frete no envio, adicional cobrado no mesmo registro, sem limite semanal, parceiros), evento (data/quantidade/local/personalização — RN-3-102), revendedor (preço pela data do pedido, nova tabela só afeta pedidos novos), bem-nascido (Previsão + aviso + confirmação, SLA não definido, produção NUNCA automática)
   - Campos novos em `oportunidades` (mesmo registro canônico, sem cadastro paralelo — CA-3-009): `qtd_adicional`, `frete_valor`, `data_pedido`, `aviso_enviado_em`, `confirmacao_recebida_em`, `origem_parceiro`
2. **Migration 0040 `correcao_prova_p7.js`**: materializada no repo (correção da prova P7 da T002 que estava só no working tree do Skip)
3. **Hook `validar_minimos_jornada.js`** (`POST /backend/v1/oportunidades/{id}/avancar`): valida mínimos por jornada no avanço (CA-3-010), regras específicas (frete na degustação enviada, duplicidade de data e data do pedido no revendedor, aviso/confirmação no bem-nascido), falta de mínimo → status `aguardando_dados` + pendência nomeada + histórico (CA-3-014), nunca avança em silêncio, nunca libera produção (CA-3-013); tipos sociais/corporativos mapeiam para a config `evento`
4. **`auditar_negacoes.js`**: `config_jornadas` no mapa de negações auditadas (CA-3-031)

### Frontend

5. **`NovaOportunidade.tsx`**: campos condicionais por jornada (CA-3-010) — degustação: adicionais, frete, parceiro de origem; revendedor: data do pedido (fixa o preço da tabela vigente); bem-nascido: aviso enviado, confirmação recebida + nota de que o aviso nunca libera produção

### Testes

6. **7 invariantes novas** (CA-3-009/010/011/012/013/014/031) na suíte `tests/invariantes.test.mjs`; RED confirmado antes do GREEN

## Verificação automática

- Suíte local: **23/23 PASS** (16 da T001 + 7 da T004); tsc, lint (0 erros), format, build, audit limpos
- QA Skip: **0.0.121 e 0.0.122 PASS** (setup, static analysis, build, integrations/migrations, test)
- Correções durante o QA: guards try/catch na migration (findFirstRecordByFilter lança "no rows" em tabela vazia) e mapeamento de tipos de evento para a config `evento`

## Verificação na instância real (provas)

| Prova | Resultado |
|---|---|
| Seed config_jornadas (4 jornadas com parâmetros aprovados) | PASS |
| CA-3-031: atendimento e produção NÃO alteram config (negado); leitura operacional OK | PASS |
| Campos novos presentes em oportunidades | PASS |
| Fixture degustação enviada sem frete → pendência RN-3-101 | PASS |
| Fixture degustação presencial (cortesia) → avança sem pendência | PASS |
| Fixture revendedor com data duplicada → pendência RN-3-103 | PASS |
| Fixture bem-nascido completo → avança, produção não liberada | PASS |
| Fixture evento (aniversário) sem mínimos → 3 pendências nomeadas (data, local, paleta) | PASS |
| Pendências e históricos com origem `jornada_*` | 7 + 7 registros criados |

## Commits

`0fd50d9` (auditar_negacoes) · `a7247fc` (migrations + hook) · `0e1b70c` (testes) · `53fd0ef` (UI) · `d094dd3` (alinhamento final com Skip 0.0.122)

## Limites respeitados

- Nenhuma publicação em produção; núcleo F2 intocado; regras não aprovadas (SLA bem-nascido, capacidade semanal, vencimento de política do revendedor) ficaram manuais + pendência, conforme decidido
