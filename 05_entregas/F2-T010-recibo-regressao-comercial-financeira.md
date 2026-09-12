# Recibo F2-T010 — Regressão comercial, financeira e limites

**Status:** implementação realizada; aguardando teste humano
**Data:** 2026-09-12
**Versão Preview:** 0.0.112
**Task:** F2-T010
**SPEC:** SPEC-2-002 — Aprovação, conversão e fila financeira controlada

## Entrega

- Corrigida a conversão idempotente: repetição de aprovação consulta o pedido já existente antes de revalidar a política, retorna HTTP 200 com o mesmo pedido e registra tentativa em `auditoria_pedidos`.
- Criada rota protegida `/regressao/f2-t010`, acessível somente ao Administrador.
- Criado harness de homologação com quatro provas executáveis:
  - conversão repetida e auditoria;
  - divergência financeira com pendência para Atendimento;
  - formato inválido sem mutação do pagamento;
  - bloqueio de novo comprovante após pagamento confirmado.
- Harness usa somente fixtures internas; comprovante é PNG fictício e o valor de R$ 0,01 é de homologação.
- Dashboard ganhou acesso direto ao harness de regressão.
- Nenhuma integração externa, cobrança real ou liberação de produção foi ativada.

## Evidências automatizadas

QA `0.0.112`:

- setup: passou
- análise estática: passou
- build: passou
- integrações: passaram
- testes: passaram

Suíte backend executada:

- autenticação dos perfis Administrador, Atendimento, Financeiro e Produção: passou;
- conversão repetida: HTTP 200, mesmo `pedido_id`, auditoria incrementada;
- formato de comprovante inválido: HTTP 400 sem alterar status do pagamento;
- comprovante válido: recebido sem confirmação automática;
- divergência: status divergente e pendência para Atendimento;
- pagamento confirmado: novo comprovante bloqueado;
- RLS: Atendimento/Financeiro com acesso previsto; Produção sem propostas, pedidos ou pagamentos;
- nenhum endpoint externo ou produção acionado.

## Critérios

- **CA-2-101:** PASSOU — aprovação válida permanece vinculada a exatamente um pedido.
- **CA-2-102:** PASSOU por regressão anterior e revalidação de estados — alteração/recusa/expiração não convertem indevidamente.
- **CA-2-103:** PASSOU — conversão repetida reutiliza pedido e audita tentativa.
- **CA-2-104:** PASSOU — divergência registra motivo, dono e próxima ação em pendência.
- **CA-2-105:** PASSOU — RLS separa Atendimento, Financeiro, Administrador e Produção.
- **CA-2-106:** PASSOU — não houve escrita externa nem liberação de produção.

## Teste humano pendente

No Preview `https://nexus-emilia-49529--preview.goskip.app/`:

1. Entre com `fernanda@emiliabemcasados.local`.
2. No painel, clique em **Regressão F2-T010**.
3. Clique em **Conversão repetida e auditoria** e confirme o resultado `PASSOU`.
4. Clique em **Divergência e pendência** e confirme o resultado `PASSOU`.
5. Clique em **Formato inválido sem mutação** e confirme o resultado `PASSOU`.
6. Clique em **Bloqueio após pagamento confirmado** e confirme o resultado `PASSOU`.
7. Confirme que a tela informa que usa fixture de R$ 0,01, PNG fictício e não chama produção/integração externa.

Teste opcional de perfil:

- entrar como Financeiro e confirmar acesso à Fila Financeira e decisão de pagamento;
- entrar como Produção e confirmar ausência de acesso a dados financeiros.

**Resultado esperado:** as quatro provas exibem `PASSOU`; nenhuma prova informa cobrança real, integração externa ou liberação de produção.

A task permanece aberta até a aprovação humana.
