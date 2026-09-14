# AP-2026-09-14-1920 — Select values via push no array não persiste; conversão precisa copiar dados para gates posteriores

- Status: candidato
- Escopo: projeto do cliente
- Task/SPEC: F3-T006 / SPEC-3-003
- Sinal: (1) migration que adiciona valores a um select via push no array do objeto Field não aplicou os valores na instância PocketBase — o hook de liberação falhou com validation_invalid_value até a lista ser substituída explicitamente (migration 0044); (2) a conversão proposta→pedido não copiava data_evento da oportunidade, deixando o gate de prazo da fila inatingível — corrigido no hook proposta_resposta.
- Evidência: QA Skip 0.0.127 (liberar → 400 validation_invalid_value) vs 0.0.129 (fluxo completo PASS); provas na instância (pedido qwtcv0wd928o504); correção em pocketbase/hooks/proposta_resposta.js e pocketbase/migrations/0044_status_operacional_producao.js.
- Regra reutilizável: ao alterar valores de select em migration, substituir a lista explicitamente (so.values = [...]) em vez de usar push no array; ao criar um gate que depende de dado X, verificar a cadeia inteira que produz o pedido e garantir que X chega até ele (copiar na conversão), não assumir que o campo já estará preenchido.
- Quando aplicar: qualquer migration que toque select values; qualquer novo gate sobre campos preenchidos em etapas anteriores da jornada.
- Quando não aplicar: migrations que apenas criam campos novos (sem valores default de select); gates sobre dados coletados no próprio passo.
- Confiança: alta — falha observada na instância real e corrigida com prova antes/depois.
- Privacidade: sem segredo, dado pessoal ou conteúdo bruto.
