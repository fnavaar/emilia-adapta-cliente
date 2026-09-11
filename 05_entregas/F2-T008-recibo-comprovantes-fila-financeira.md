# Recibo F2-T008 — Comprovantes e fila financeira

**Status:** concluída e validada
**Data:** 2026-09-11
**Versão entregue:** 0.0.99
**Preview:** https://nexus-emilia-49529--preview.goskip.app
**Produção:** https://nexus-emilia-49529.goskip.app
**Ref publicada:** `597c62e`
**Task:** F2-T008
**SPEC:** SPEC-2-002 — Aprovação, conversão e fila financeira controlada

## Entrega

- Migration `0032_fila_financeira.js` aplicada.
- Migration `0033_contas_financeiro_producao.js` aplicada para reparar contas de homologação.
- Migration `0034_corrigir_rls_pedidos_financeiros.js` aplicada para restringir pedidos do Atendimento aos próprios pedidos.
- Migration `0035_bloquear_create_direto_comprovante.js` aplicada para obrigar o endpoint versionado de upload.
- Coleções criadas:
  - `planos_pagamento`;
  - `pagamentos`;
  - `comprovantes_pagamento`;
  - `auditoria_financeira`.
- Rota `/financeiro/fila` criada para Atendimento, Financeiro, Gestão e Administrador.
- Endpoints protegidos para preparar pagamentos, enviar comprovantes e decidir conferência/divergência.

## Regras implementadas

- Comprovantes aceitam PDF, JPG/JPEG e PNG.
- Limite de 10 MB por arquivo.
- Até 3 arquivos por comprovante.
- Quarto arquivo é recusado.
- Comprovante recebido muda o pagamento para `comprovante_recebido`, sem confirmar pagamento.
- Substituição cria nova versão e preserva a anterior.
- Pagamento conferido registra autor/data e bloqueia novo comprovante.
- Na interface, pagamento conferido é exibido como **Pago**; o status consolidado do pedido aparece separadamente como **Pago** ou **Parcialmente pago**.
- Divergência exige motivo e cria pendência para Atendimento com responsável, prazo e próxima ação.
- Plano de pagamento substituído cria nova versão, sem editar a versão anterior.
- Produção não consulta pedidos financeiros, pagamentos, comprovantes ou auditoria financeira.
- Atendimento fica restrito aos próprios pedidos sob sua responsabilidade.
- Criação direta de comprovante pela API padrão é bloqueada; o upload passa pelo endpoint versionado.
- Nenhuma conciliação bancária, Pix real, Stone, retenção automática ou liberação de produção foi ativada.

## QA automatizado

Versão `0.0.99`:

- setup: passou
- análise estática: passou
- build: passou
- integrações: passou
- testes: passaram

A versão `0.0.99` foi publicada explicitamente na produção com a ref `597c62e`.

## Provas backend

- Migration 0032 aplicada; migrations 0033, 0034 e 0035 aplicadas.
- Plano de pagamento de homologação criado com HTTP 201.
- Formato inválido recusado com HTTP 400.
- Comprovante válido recebido com HTTP 201 e pagamento ficou `comprovante_recebido`, com `valor_recebido=0`.
- Divergência registrada com HTTP 200 e pendência criada para Atendimento.
- Substituição de comprovante produziu versões 1 e 2.
- Conferência financeira produziu `conferido` internamente e `pago` no pedido de fixture.
- Quarto arquivo recusado com HTTP 400.
- Novo comprovante após pagamento conferido recusado com HTTP 400.
- Produção autenticada recebeu lista vazia para pedidos, pagamentos, comprovantes e auditoria financeira.
- Criação direta de comprovante recusada com HTTP 403.

## Verificação visual e teste humano

- Fila Financeira verificada no Preview e na produção após a publicação da versão `0.0.99`.
- Pagamento conferido exibido como **Pagamento: Pago**.
- Pedido integralmente pago exibido como **Pedido: Pago**.
- Pedido com outra parcela pendente exibido como **Pedido: Parcialmente pago**.
- Fernanda confirmou em 2026-09-11: **“sim, agora deu certo!”**

## Limites desta task

- Não recebe arquivos reais de clientes.
- Não implementa retenção automática ou política técnica definitiva de LGPD.
- Não integra Pix, Stone ou banco.
- Não implementa relatórios financeiros gerenciais.
