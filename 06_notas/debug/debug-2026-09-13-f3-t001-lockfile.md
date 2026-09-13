# Debug — 2026-09-13 — F3-T001: lockfile inconsistente com package.json

**Task:** F3-T001 · **SPEC:** SPEC-3-001 · **Champion:** Fernanda

## Sintoma relatado
Verificação independente (subagente) apontou que o `pnpm-lock.yaml` na branch `corretiva/f3-t001-estabilizacao` estava desatualizado vs o `package.json` do commit `2460081`: overrides ausentes no lockfile e `@radix-ui/react-label ^1.1.10` (versão inexistente no npm). `pnpm install --frozen-lockfile` falhava com `ERR_PNPM_LOCKFILE_CONFIG_MISMATCH` — o QA do Skip falharia mesmo com o lockfile presente.

## Reprodução
- `pnpm install --frozen-lockfile` → `ERR_PNPM_LOCKFILE_CONFIG_MISMATCH` (overrides não batem com o lockfile)
- `npm view @radix-ui/react-label versions` → linha 1.x vai só até `1.0.0`; `^1.1.10` não resolve

## Causa raiz
O commit `2460081` alterou o `package.json` (adicionou `pnpm.overrides` e, acidentalmente, mudou `@radix-ui/react-label` de `^2.1.10` para `^1.1.10` — a base `d747a2c` tinha `^2.1.10`) **sem regenerar o `pnpm-lock.yaml`**, que continuou resolvendo react-router 7.18.0, postcss 8.5.15, nanoid 3.3.15 e label `^2.1.10`.

## Correção (commit `aa90fa4` na branch corretiva)
1. `package.json`: `react-label` restaurado para `^2.1.10` (typo revertido).
2. Override `react-router` restringido de `>=7.18.2` para `^7.18.2` (o range aberto resolvia a major 8 — react-router@8.3.1 — incompatível com o `react-router-dom ^7.18.0` do app).
3. `pnpm-lock.yaml` regenerado (`pnpm install --no-frozen-lockfile`): overrides materializados (react-router 7.18.3, postcss 8.5.28, nanoid 3.3.18).

## Verificação automática (GREEN, no estado exato da remota)
- `pnpm install --frozen-lockfile`: PASS (antes: `ERR_PNPM_LOCKFILE_CONFIG_MISMATCH`)
- `pnpm test` (16 invariantes): PASS
- `tsc -b`: PASS · `lint`: 0 erros (13 warnings pré-existentes) · `format:check`: PASS
- `pnpm audit --prod`: No known vulnerabilities found
- `build`: PASS (vite 8, built in 3.37s)
- `package.json` e `pnpm-lock.yaml` da remota byte-idênticos ao validado localmente (md5 conferidos)

## Observação de histórico
Durante a restauração, um commit intermediário `146fced` ("test") com lockfile placeholder ficou registrado no histórico da branch; o estado final (`aa90fa4`) está correto e verificado. Não foi usado force push (guardrail).

## Gate
`aguardando_teste_humano` (teste humano da Fê pendente)
