# B2-POL-03 — Validade, pagamentos, alterações, cancelamentos e alçadas

**Task:** F2-T002 — Aprovar frete, desconto, adicionais, validade, termos e alçadas  
**SPEC:** SPEC-2-001 — Composição versionada e proposta comercial  
**Status:** aguardando validação humana  
**Data da formalização:** 2026-09-10  
**Gestão:** Fernanda

## Validade da proposta

- A proposta tem validade de **30 dias**.
- Enquanto estiver dentro da validade, mantém o valor originalmente apresentado, mesmo que a tabela comercial seja atualizada.
- Uma mudança posterior da tabela não altera automaticamente uma proposta ainda válida.
- Qualquer retorno excepcional ao valor original após uma atualização deve ser autorizado por um Administrador e registrado.

## Formas de pagamento

### À vista

- Pix;
- cartão de débito;
- cartão de crédito;
- espécie.

### Parcelado no cartão de crédito

- até 6 parcelas sem juros;
- parcela mínima de R$150,00.

### Parcelado via Pix

- primeira parcela no fechamento do pedido;
- última parcela até 10 dias antes da entrega;
- parcelas intermediárias em datas livremente combinadas conforme preferência da cliente;
- parcela mínima de R$150,00.

As datas combinadas e os valores das parcelas devem ser registrados na proposta/pedido. Não haverá inferência automática de datas intermediárias.

## Alterações

- Alterações podem ser feitas a qualquer momento.
- Quando faltarem menos de 30 dias para a entrega, a alteração exige autorização.
- Qualquer pessoa pode autorizar essa alteração, desde que a autorização contenha uma identificação do autorizador.
- A alteração deve preservar a versão anterior e registrar a nova condição de forma auditável.

## Cancelamentos

- Para pedidos acima de 100 unidades, é retida a importância de **20% do valor total do pedido** para cobrir custos administrativos.
- Qualquer pessoa pode realizar e autorizar o cancelamento, desde que a autorização tenha identificação.
- O registro deve preservar o pedido, a proposta e o motivo do cancelamento.
- Não foi definida nesta task a regra para pedidos de até 100 unidades; permanece pendente, sem inferência.

## Alçadas e auditoria

- **Administrador:** pode conceder e autorizar descontos superiores aos limites padrão e autorizar retornos excepcionais ao valor original.
- **Qualquer pessoa autorizada:** pode autorizar alterações com menos de 30 dias e cancelamentos, desde que sua identificação seja registrada, conforme a regra recebida.
- Toda exceção deve guardar identificador, motivo, data e versão afetada.

## Limites

- Este recibo formaliza regras; não cria cálculo automático nem fluxo de aprovação.
- Não libera produção nem ativa integração externa.
- Termos não definidos, como cancelamento até 100 unidades e acumulação de descontos, permanecem pendentes.

## Critério parcial

B2-POL-03 fica **formalizado e aguardando validação humana**. Validade, pagamentos, calendário mínimo do Pix, alterações, cancelamentos e identificação de autorizações foram registrados sem inventar os pontos não definidos.