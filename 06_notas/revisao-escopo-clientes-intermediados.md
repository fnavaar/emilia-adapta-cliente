# Revisão de escopo — clientes diretos e intermediados

- **Data**: 2026-08-25
- **Origem**: Fernanda, após teste da F1-T001
- **Status**: proposta para validação da gestão/consultoria
- **Impacto**: altera o modelo previsto na SPEC-1-001 e deve ser incorporada antes da próxima implementação

## Regras de negócio confirmadas

1. Existem clientes diretos e clientes intermediados por cerimonialistas.
2. Em uma oportunidade intermediada, o cadastro inicial usa os dados da cerimonialista; os dados dos noivos só ficam disponíveis quando a oportunidade vira pedido.
3. Cerimonialista precisa de cadastro próprio, com empresa, vários contatos (nome e telefone) e endereço opcional.
4. O sistema deve identificar a empresa cerimonialista e o contato/assistente responsável pela indicação, para medir pedidos e vendas por empresa e por contato.
5. Telefone principal é obrigatório e é o principal apoio contra duplicidade.
6. Os segmentos válidos são: Casamento / Noiva; Eventos sociais; Maternidade; Corporativo; Cerimonialista; Revenda / Parceiros comerciais; Presentes; Consumo próprio; Outros.
7. Campos específicos dependem do segmento/evento:
   - Casamento / Noiva: nome dos noivos.
   - Aniversário: nome do aniversariante.
   - Bodas: nome do casal.
   - Chá de bebê/maternidade: nome do bebê.
   - Cerimonialista: dados da empresa e pelo menos um contato.
   - Outros eventos sociais: informação específica opcional, conforme o caso.
8. Nome dos noivos não deve ser um campo geral obrigatório do cadastro de cliente.

## Ajuste de modelo proposto

- Separar `Cliente` (quem compra ou intermedeia) de `Evento`/dados específicos do pedido.
- Criar `Cerimonialista/Parceiro` como cadastro próprio, com empresa, endereço opcional e múltiplos `Contatos da cerimonialista`.
- Vincular cada oportunidade ao `cliente_id` e, quando intermediada, também ao `cerimonialista_id` e `contato_cerimonialista_id`.
- Registrar em cada oportunidade se a origem é direta ou intermediada.
- Manter dados dos noivos ausentes no primeiro contato intermediado e permitir preenchê-los somente na conversão para pedido.
- Tornar `telefone_principal` obrigatório no cadastro de cliente.
- Substituir o conjunto anterior de opções de `tipo_cliente` pelos segmentos definidos acima.
- Retirar `nome_noivos` do cadastro geral de cliente e colocá-lo no bloco de dados do evento/pedido.
- Criar bloco de dados específicos do evento, com campos condicionais e regra de obrigatoriedade por segmento.
- Preservar o `valor_estimado` na oportunidade/pedido-base.

## Medições habilitadas

- Pedidos por cerimonialista.
- Vendas por cerimonialista.
- Pedidos e vendas por assistente/contato da cerimonialista.
- Conversão direta versus intermediada.
- Dados dos noivos somente a partir do pedido, sem exigir esses dados no cadastro inicial intermediado.

## Decisões que precisam ser confirmadas antes de implementar

- Nome oficial da entidade: `Cerimonialista` ou `Parceiro/Intermediário`.
- Se `Revenda / Parceiros comerciais` usará a mesma estrutura de empresa e múltiplos contatos.
- Se “outros eventos sociais” terá um campo genérico opcional ou tipos específicos adicionais.
- Em que momento exato uma oportunidade passa a ser considerada `Pedido`.
- Quais campos do evento serão obrigatórios no momento da conversão.

Nenhum código, coleção ou SPEC foi alterado por esta revisão. A implementação existente continua preservada até a aprovação da revisão.
