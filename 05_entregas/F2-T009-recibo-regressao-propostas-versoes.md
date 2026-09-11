# Recibo F2-T009 — Regressão de proposta, política e versões

**Status:** implementação realizada; aguardando teste humano
**Data:** 2026-09-11
**Versão Preview:** 0.0.105
**Task:** F2-T009
**SPEC:** SPEC-2-001 — Composição versionada e proposta comercial

## Correções aplicadas

- Reordenação de itens após remoção corrigida para iniciar em `ordem=1`, preservando a sequência válida.
- A ordem passou a aparecer na lista visual dos itens para facilitar a conferência humana.
- Política comercial elegível na interface passa por validação de versão, fonte, aprovador, vigência válida e alçada.
- Endpoint de aprovação bloqueia política incompleta, vigência inválida, vigência invertida, política futura ou expirada.
- Devolução para alteração deixou de alterar a mesma versão: cria nova proposta com `versao_anterior_id`, copia itens e snapshots, marca a anterior como `substituida` e registra auditoria nas duas versões.
- Tela atualiza o identificador, a versão e o status retornados pela API após a devolução.
- RLS separa acesso de políticas, propostas, itens e auditoria por perfil.

## RLS validado

- Políticas: criação/alteração somente Administrador e Gestão; Atendimento consulta apenas aprovadas; Financeiro consulta.
- Propostas e itens: leitura para Administrador, Gestão, Atendimento e Financeiro; criação para Administrador, Gestão e Atendimento; sem edição/exclusão direta.
- Auditoria de propostas: leitura somente Administrador e Gestão; criação pelo fluxo autorizado; sem edição/exclusão.
- Catálogo continua sendo a fonte de itens aprovados; nenhuma regra de preço é inferida.

## Verificação automatizada

Versão `0.0.105`:

- setup: passou
- análise estática: passou
- build: passou
- integrações: passou
- testes: passaram
- migrations de RLS/regressão aplicadas no backend
- regras efetivas das quatro coleções conferidas no backend
- nenhum erro novo de hook na verificação final

## Critérios cobertos

- **CA-2-001:** alternativas continuam representadas por grupo e não são calculadas nesta task.
- **CA-2-002:** snapshots de catálogo/política são copiados para a nova versão e não dependem de alteração posterior.
- **CA-2-003:** política incompleta ou fora da vigência não decide silenciosamente.
- **CA-2-004:** alteração cria versão sucessora auditável e preserva a anterior.
- **CA-2-005:** RLS separa composição, política e auditoria por perfil.

## Teste humano pendente

No Preview `https://nexus-emilia-49529--preview.goskip.app`, com conta de Atendimento ou Gestão:

1. Entrar no sistema e abrir **Orçamentos** pelo painel.
2. Criar um orçamento de homologação com um cliente, uma oportunidade e um item aprovado.
3. Adicionar dois itens; remover o primeiro; confirmar que o item restante aparece com **ordem 1** na lista; salvar o rascunho.
4. Tentar enviar para revisão sem política comercial completa; confirmar que a revisão permanece bloqueada.
5. Com o orçamento salvo, usar **Devolver orçamento para alteração**; confirmar que a resposta informa nova versão e que a versão anterior não é apagada.
6. Confirmar que a nova versão preserva item, label, código e versão do catálogo.
7. Se possível, repetir a consulta com perfil Financeiro: pode consultar orçamento, mas não criar/alterar política nem editar itens.

**Resultado esperado:** nenhuma soma indevida de alternativa, nenhuma aplicação silenciosa de política incompleta, versão anterior preservada e permissões respeitadas.

## Limites

- Não calcula preço, frete, desconto ou adicionais.
- Não publica em produção nesta etapa.
- Não integra serviços externos nem libera produção.
