# AP-2026-09-14 — F3-T003: provas de RLS/hooks e fixtures de regressão

**Task:** F3-T003 · **Data:** 2026-09-14 · **Tipo:** sinal reutilizável

## Sinal

Provas de segurança em coleções com hook dedicado precisam considerar duas camadas: a negação na coleção (RLS fail-closed) e a regra de negócio no hook. A negação não tem forma única — createRule null devolve 403 "Only superusers", RLS de leitura devolve 200 com lista vazia, e falha de referência/validação devolve 400 genérico "Failed to create record". Além disso, a autorização do hook pode seguir uma indireção (dono do **pedido** via `pedido_id.convertido_por`, não dono do pagamento), então um teste com usuário "errado" pode falhar por motivo diferente do esperado e mascarar o resultado.

## Regra confirmada

1. Em prova de RLS, verificar **conteúdo e código**: 200 vazio, 403 e 400 genérico são negações válidas — isolar a causa (corpo válido vs. regra) antes de concluir.
2. Ler o hook antes de montar a prova: rota, campos do body (`acao` vs `decisao`), e de quem é a autoria exigida (indireção pagamento→pedido→convertido_por).
3. Fixture criada por prova com delete bloqueado por RLS: marcar inativa/substituída com observação em vez de forçar deleção — preserva auditabilidade e não viola a regra.
4. Provas que mutam estado (divergência, devolução) geram artefatos verificáveis (pendência, versão nova) — usá-los como evidência positiva, não só os códigos HTTP.

## Evidência

- P8: upload .txt → 400 pelo hook; createRule null → 403; Anie (não dona) → 403 de autoria, não de formato.
- CA-2-104: `{"acao":"divergente"}` → pendência criada + pedido divergente (artefato positivo).
- CA-2-004: devolução → v2 `hs06y9u3n0m8f03`, anterior substituida v1.
- Fixture de política: delete 403 → marcada inativa com observação.
