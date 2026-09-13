# AP-2026-09-14 — F3-T002: guard de estado terminal em hooks de resposta

**Task:** F3-T002 · **Data:** 2026-09-14 · **Origem:** prova P7 revelou falha real no hook `proposta_resposta`

## Regra confirmada
Todo hook que responde/altera uma entidade com estados terminais precisa de guard explícito **para cada ação**, não só para a ação principal. O hook `proposta_resposta` bloqueava respostas em `substituida/expirada/bloqueada`, mas permitia `recusar` e `devolver` em proposta `aprovada` — a prova de segurança (P7) pegou a lacuna que a revisão de código não tinha pego.

## Detalhes
1. **Provas de segurança executadas de verdade encontram o que revisão não pega:** o guard existia para 3 estados, mas faltava o caso "aprovada + ação incompatível". Sempre provar as combinações ação × estado, não só o caminho feliz.
2. **Prova que muta dados gera artefato:** a P7 recusou/devolveu uma proposta real antes da correção. A correção veio acompanhada de migration corretiva (0040) que restaurou o estado canônico, removeu o artefato (com suas relações obrigatórias, na ordem: auditoria → itens → proposta) e auditou a própria correção.
3. **Deleção em migration PocketBase:** registros referenciados por relação obrigatória precisam ser apagados primeiro (auditoria_propostas, itens_proposta) antes do registro principal; e campos obrigatórios do registro de auditoria (autor, tipo_evento válido) precisam ser preenchidos.
4. **HTTP 200 com lista vazia é fail-closed:** no PocketBase, RLS nega por filtro (200 + 0 itens), não por 403. Provas de RLS devem verificar o conteúdo (0 itens), não só o código HTTP.

## Evidência
Recibo F3-T002 em `05_entregas/F3-T002-recibo-migrations-seguranca.md`; QA 0.0.119; revalidação P6/P7 no changelog de 14/09.
