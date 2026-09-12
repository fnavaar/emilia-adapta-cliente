# Recibo F2-T010 — Regressão comercial, financeira e limites

**Status:** concluída
**Data:** 2026-09-12
**Versão Preview:** 0.0.113
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
- Acesso ao harness em dois pontos primários: menu lateral do Administrador e botão destacado no cabeçalho do dashboard.
- Nenhuma integração externa, cobrança real ou liberação de produção foi ativada.

## Evidências automatizadas

QA `0.0.113`:

- setup: passou
- análise estática: passou
- build: passou
- integrações: passaram
- testes: passaram

Suíte backend executada na revalidação de fechamento:

- autenticação dos perfis Administrador, Atendimento, Financeiro e Produção: passou;
- conversão repetida: HTTP 200, mesmo `pedido_id`, auditoria incrementada;
- formato de comprovante inválido: HTTP 400 sem alterar status do pagamento;
- comprovante válido: recebido sem confirmação automática;
- divergência: status divergente e pendência para Atendimento;
- pagamento confirmado: novo comprovante bloqueado;
- RLS: Atendimento/Financeiro com acesso previsto; Produção sem propostas, pedidos ou pagamentos;
- nenhum endpoint externo ou produção acionado.

## Teste humano

Aprovado por Fernanda em 2026-09-12 com evidência visual das quatro provas:

- Conversão repetida: `PASSOU: pedido ub46hkz64xd6we6 reutilizado e auditoria incrementada.`
- Divergência financeira: `PASSOU: pagamento k3udy7vxi48g6cy divergente; pendência criada para Atendimento.`
- Formato de comprovante: `PASSOU: formato inválido rejeitado sem alterar o pagamento.`
- Pagamento confirmado imutável: `PASSOU: pagamento confirmado recusou novo comprovante.`

## Critérios

- **CA-2-101:** PASSOU — aprovação válida permanece vinculada a exatamente um pedido.
- **CA-2-102:** PASSOU por regressão anterior e revalidação de estados — alteração/recusa/expiração não convertem indevidamente.
- **CA-2-103:** PASSOU — conversão repetida reutiliza pedido e audita tentativa.
- **CA-2-104:** PASSOU — divergência registra motivo, dono e próxima ação em pendência.
- **CA-2-105:** PASSOU — RLS separa Atendimento, Financeiro, Administrador e Produção.
- **CA-2-106:** PASSOU — não houve escrita externa nem liberação de produção.

## Aprendizado registrado

- `06_notas/aprendizado-continuo/AP-2026-09-12-1859-superficie-harness.md`: harnesses administrativos precisam de rota protegida e ponto de acesso primário e evidente na navegação.
- `06_notas/debug/debug-2026-09-12-f2-t010-acesso-harness.md`: debug da visibilidade do acesso.

## Limites preservados

- B1-INT-01 permanece: nenhuma integração externa ativada.
- Nenhuma liberação de produção.
- Nenhuma cobrança real: fixtures de R$ 0,01 e PNG fictício.
