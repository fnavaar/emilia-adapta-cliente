# Recibo F2-T003 — Aceite, vencimento, conferência e estados

**Status:** contrato funcional formalizado; implementação de produto ainda não realizada
**Data:** 2026-09-10
**Dona da decisão:** Fernanda

## Decisões aprovadas

- A cliente deve preencher e conferir os dados em uma interface amigável antes de aprovar.
- A confirmação registra a versão do pedido, identidade, data/hora, dados confirmados e termos aceitos.
- O pagamento só é apresentado depois da aprovação: QR Pix, dados bancários ou futura integração Stone.
- Aprovação comercial, situação operacional e situação financeira são estados separados.
- O pedido principal mantém sua quantidade original e gera entregas/retiradas derivadas por data, com saldo e histórico.
- Degustações são cortesia e não geram contas a receber pelo produto.
- Degustação pode ter frete cobrado ou não, pode atender clientes ou parceiras e gera produção rastreável.
- Degustações registram origem, indicação, retorno, orçamento e fechamento para medir a efetividade das parceiras.
- Pendências “a definir” precisam de responsável, prazo, urgência e status.
- Suspensão/crédito têm validade de 1 ano conforme a data de origem definida na política.
- Cancelamentos e reembolsos seguem a política aprovada na F2-T002, com autorização identificada nas exceções.

## Contrato de transições

### Comercial

`Rascunho → Enviada → Em revisão → Aprovada | Recusada | Expirada`

Uma resposta da cliente sem confirmação explícita não é aprovação. Alterações relevantes geram versão sucessora e preservam o histórico.

### Operacional

`Entrega | Falta Definição | Em Alteração | Previsão de Entrega | Suspenso`

O pedido pode permanecer aprovado e, ao mesmo tempo, estar em Falta Definição ou aguardando pagamento. A aprovação não libera produção automaticamente.

### Financeiro

`Aguardando pagamento → Comprovante recebido → Em conferência → Pago | Divergente → Pendente de correção`

Também são possíveis estados de pagamento parcial, em dia ou em atraso. Comprovante recebido não equivale a pagamento conferido.

## Degustações

A degustação deve ser registrada como cortesia/produção, com classificação própria e sem conta a receber automática. Campos mínimos para prestação de contas:

- destinatário;
- cliente, oportunidade ou parceira relacionada;
- origem/indicação;
- sabores e quantidade;
- data de envio/retirada;
- frete e se foi cobrado;
- responsável interno;
- retorno;
- orçamento gerado;
- fechamento posterior e valor, quando houver;
- motivo de não fechamento, quando aplicável.

## Limites desta task

- Não constrói a tela de aceite.
- Não implementa Stone, Pix ou conciliação bancária.
- Não libera produção.
- Não cria contas a receber para degustações.
- Não recebe comprovantes reais sem a política B2-FIN-02 da F2-T004.

## Evidência esperada nas tasks de construção

- aceite explícito não confundido com resposta;
- uma aprovação gera um único pedido;
- nova versão preserva a anterior;
- conversão repetida é idempotente e auditada;
- estados financeiro, operacional e comercial não se sobrescrevem;
- retirada parcial altera o saldo sem apagar o pedido principal;
- degustação cria produção rastreável sem financeiro;
- RLS impede acesso indevido à composição e à conferência financeira;
- não há escrita externa nem liberação automática de produção.

## Resultado da task

A F2-T003 entrega o contrato funcional documentado para as tasks de construção. Os critérios CA-2-101 a CA-2-106 permanecem pendentes de implementação e prova automatizada/humana.
