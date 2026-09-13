# AP-2026-09-13 — F3-T001: alterar package.json exige regenerar o lockfile

**Task:** F3-T001 · **Data:** 2026-09-13 · **Origem:** debug do lockfile inconsistente

## Regra confirmada
Toda alteração em `package.json` — especialmente adicionar `pnpm.overrides` ou mudar ranges de dependências — **exige regenerar o `pnpm-lock.yaml` no mesmo commit** (`pnpm install --no-frozen-lockfile`). O QA do Skip roda `pnpm install --frozen-lockfile`, que falha com `ERR_PNPM_LOCKFILE_CONFIG_MISMATCH` se o lockfile não refletir as mudanças, mesmo com o arquivo presente.

## Detalhes
1. **Overrides com range aberto são perigosos:** `react-router: ">=7.18.2"` resolvia para a major 8 (8.3.1), incompatível com `react-router-dom ^7.18.0` do app. Usar piso com caret (`^7.18.2`) para respeitar a major em uso.
2. **Validar versões novas contra o npm:** `@radix-ui/react-label ^1.1.10` não existe (linha 1.x vai só até 1.0.0). Antes de commitar um range, conferir com `npm view <pkg> versions`.
3. **Prova de QA deve rodar no estado da remota:** validar localmente com working-tree sujo não prova o que o QA verá; checkout do tip remoto em worktree limpo + `--frozen-lockfile` é a prova fiel.

## Evidência
Debug em `06_notas/debug/debug-2026-09-13-f3-t001-lockfile.md`; commit corretivo `aa90fa4` na branch `corretiva/f3-t001-estabilizacao` do repo técnico.
