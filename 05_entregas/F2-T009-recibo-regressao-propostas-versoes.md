# Recibo F2-T009 — Regressão de proposta, política e versões

**Status:** concluída
**Data:** 2026-09-12
**Versão Preview:** 0.0.105
**Task:** F2-T009
**SPEC:** SPEC-2-001 — Composição versionada e proposta comercial

## Correções entregues

- Reordenação de itens após remoção corrigida para iniciar em `ordem=1`, preservando a sequência válida.
- A ordem aparece na lista visual dos itens para conferência humana.
- Política comercial elegível passa por validação de versão, fonte, aprovador, vigência válida e alçada.
- Endpoint bloqueia política incompleta, vigência inválida, vigência invertida, política futura ou expirada.
- Devolução para alteração cria nova proposta com `versao_anterior_id`, copia itens e snapshots, marca a anterior como `substituida` e registra auditoria nas duas versões.
- Tela atualiza o identificador, a versão e o status retornados pela API após a devolução.
- RLS separa acesso de políticas, propostas, itens e auditoria por perfil.

## RLS validado

- Políticas: criação/alteração somente Administrador e Gestão; Atendimento consulta apenas aprovadas; Financeiro consulta.
- Propostas e itens: leitura para Administrador, Gestão, Atendimento e Financeiro; criação para Administrador, Gestão e Atendimento; sem edição/exclusão direta.
- Auditoria de propostas: leitura somente Administrador e Gestão; criação pelo fluxo autorizado; sem edição/exclusão.
- Catálogo continua sendo a fonte de itens aprovados; nenhuma regra de preço é inferida.

## Evidências automatizadas

Versão `0.0.105`:

- setup: passou
- análise estática: passou
- build: passou
- integrações: passaram
- testes: passaram
- migrations de RLS/regressão aplicadas no backend
- regras efetivas das quatro coleções conferidas no backend
- nenhum erro novo de hook na verificação final

## Evidências do teste humano

Fernanda confirmou em 2026-09-12 que os passos 1 a 8 foram aprovados e autorizou o fechamento da task após a verificação do passo 9.

O backend confirmou os efeitos do teste:

- rascunho persistido na coleção `propostas`;
- versão anterior preservada como `substituida`;
- nova versão criada e vinculada à anterior;
- item copiado com ordem 1;
- código, label e catálogo `2026.1` preservados;
- eventos registrados em `auditoria_propostas`.

## Critérios

- **CA-2-001:** PASSOU — alternativas permanecem representadas por grupo e não são calculadas nesta task.
- **CA-2-002:** PASSOU — snapshots de catálogo/política persistem na nova versão.
- **CA-2-003:** PASSOU — política incompleta ou fora da vigência não decide silenciosamente.
- **CA-2-004:** PASSOU — alteração cria versão sucessora auditável e preserva a anterior.
- **CA-2-005:** PASSOU — RLS separa composição, política e auditoria por perfil.

## Limites preservados

- Não calcula preço, frete, desconto ou adicionais.
- Não publica em produção nesta task.
- Não integra serviços externos nem libera produção.
- A consulta visual de orçamentos salvos e eventos de orçamento permanece registrada como melhoria futura, fora do escopo aprovado desta task.
