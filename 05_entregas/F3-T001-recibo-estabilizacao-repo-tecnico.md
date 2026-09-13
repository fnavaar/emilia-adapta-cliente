# Recibo — F3-T001: Materializar repo técnico e implementar correções

**Task:** F3-T001 · **SPEC:** SPEC-3-001 · **Data:** 2026-09-13 · **Status:** CONCLUÍDA (teste humano aprovado pela Champion em 13/09)

## O que foi feito

Branch `corretiva/f3-t001-estabilizacao` (base `d747a2c`) no repo técnico `ebc06162-ship-it/nexus-emilia-o0ismc251`:

- **Commit `2460081`** — correções:
  - `pocketbase/migrations/0037_migrations_unicas_cancelamento.js` (nova): consolida o estado final pretendido da colisão 0036 (regras de `0036_rls_propostas_politicas`) e adiciona campos aditivos de cancelamento em `pedidos` (`data_evento`, `cancelado_por`, `cancelado_em`, `retencao_percentual`)
  - `pocketbase/migrations/0038_rls_users_fail_closed.js` (nova): RLS fail-closed em `users` — updateRule sem `id = @request.auth.id`; autoelevação de papel/ativo/verified bloqueada (RN-3-001/BL-02)
  - `pocketbase/migrations/0039_credenciais_por_secrets.js` (nova): rotaciona as 5 contas via secrets `EMILIA_FERNANDA/MARA/ANIE/FINANCEIRO/PRODUCAO_PASSWORD`; secret ausente desativa a conta (RN-3-002/BL-03); valor nunca logado
  - Migrations `0001/0003/0004/0022/0033` reescritas para ler senha de secret (sem secret: senha aleatória + conta desativada) — senha literal sai do caminho de execução sem reescrever histórico Git
  - `pocketbase/hooks/cancelar_pedido.js` (novo): RN-3-003 (≤100 un. e ≥7 dias = reembolso integral), RN-3-004 (fora da janela ou >100 = só Administrador, retenção 20%), RN-3-005 (idempotente), fail-closed sem dados confiáveis, auditoria em `auditoria`
  - `tests/invariantes.test.mjs` (novo): suíte real de 16 invariantes estáticas; `pnpm test` deixa de ser placeholder
  - `package.json`/`pnpm-lock.yaml`: script `test` real + overrides corrigindo 5 vulnerabilidades (react-router ^7.18.2, postcss >=8.5.23, nanoid 3.3.18)
- **Commit `91208a1`** — remove `0036_regressao_propostas_politicas_rls.js` (colisão de ordinal; estado consolidado na 0037)
- **Commit `146fced` + `aa90fa4`** — debug do lockfile: regeneração do `pnpm-lock.yaml` com overrides e correção de `@radix-ui/react-label` para ^2.1.10 (versão ^1.1.10 não existe no npm); detalhes em `06_notas/debug/debug-2026-09-13-f3-t001-lockfile.md`

## Verificação automática (GREEN, revalidada do zero no estado final `aa90fa4`)

| Prova | Resultado |
|---|---|
| RED (base d747a2c) | colisão 0036, senha literal (13 ocorrências), self-update em 0021, teste-placeholder, .env versionado — todos detectados |
| `pnpm install --frozen-lockfile` | PASS |
| `pnpm test` (16 invariantes) | PASS 16/16 |
| `pnpm exec tsc -b` | PASS |
| `pnpm run lint` | 0 erros (13 warnings pré-existentes) |
| `pnpm run format:check` | PASS |
| `pnpm run build` | PASS |
| `pnpm audit --prod` | "No known vulnerabilities found" |
| Scan de segredo no diff | apenas a senha antiga sendo removida; nenhum segredo adicionado |
| Ordinais de migration | 0001–0039 únicos (0 duplicados) |

## Critérios de aceite desta task

- **CA-3-001 (no código):** ordinais 0001–0039 únicos; 0037–0039 prontos para apply na F3-T002 (apply na instância é da F3-T002)
- **CA-3-003 (no código):** nenhuma senha literal em código executável; 5 secrets referenciados por nome
- **CA-3-007 (no código):** suíte real, typecheck, lint, format, build e audit passam; sem teste-placeholder

## Teste humano

Aprovado pela Champion Fernanda em 2026-09-13 ("teste humano tudo aprovado"), após conferência da branch, diff do commit principal e recibo.

## Limitações e pendências

- Scan nativo de segredos do GitHub indisponível (repo sem Advanced Security) — scan local por grep no diff registrado acima
- Bindings nativos linux-arm64-musl adicionados como devDependencies para lint/format/build rodarem fora do ambiente Skip (não afetam produção)
- Nada aplicado no Skip nesta task; produção não publicada
- P1–P12, regressão F2 e CA-3-029/030 pertencem a F3-T002/F3-T003

## Próximo passo

F3-T002 (apply das migrations na instância autorizada), condicionada a: B3-SEC-01 (5 secrets confirmados por metadado), B3-ENV-01 (topologia Preview/produção) e B3-SKIP-01 (Skip acessível).
