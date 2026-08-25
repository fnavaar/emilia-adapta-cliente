# Revisão de escopo — clientes diretos e intermediados

- **Data**: 2026-08-25
- **Origem**: Fernanda, após teste da F1-T001
- **Status**: decisões da gestão registradas; alteração da SPEC necessária antes da próxima implementação
- **Impacto**: altera o modelo previsto na SPEC-1-001 e deve ser incorporada antes da F1-T002

## Regras de negócio confirmadas

1. Existem clientes diretos e clientes intermediados por cerimonialistas.
2. Em uma oportunidade intermediada, o cadastro inicial usa os dados da cerimonialista; os dados dos noivos só ficam disponíveis quando a oportunidade vira pedido.
3. A entidade intermediária será chamada **Cerimonialista**.
4. Cerimonialista precisa de cadastro próprio, com nome da empresa, contatos e endereço opcional.
5. Uma cerimonialista pode ter vários contatos/assistentes. Cada contato deve ter nome e telefone e precisa poder ser relacionado às oportunidades que trouxe.
6. O sistema deve medir pedidos e vendas por empresa cerimonialista e por contato/assistente.
7. Telefone principal é obrigatório no cadastro de cliente e é o principal apoio contra duplicidade.
8. Quando o cliente vier de uma cerimonialista, o telefone principal do cadastro inicial será o da cerimonialista ou do contato responsável.
9. Para cliente corporativo, o cliente é a empresa, com um contato principal identificado por nome e telefone.
10. Revenda/Parceiros comerciais pode usar a mesma estrutura de empresa, contatos e endereços quando necessário, mas isso não será obrigatório para todos os parceiros.
11. O caso Casa do Pão de Queijo exige:
    - uma empresa com CNPJ;
    - vários contatos;
    - vários endereços de entrega, inclusive com CNPJs diferentes;
    - cada contato relacionado a um ou mais endereços que ele solicita;
    - medição das solicitações por contato e por endereço/unidade.
12. Os segmentos válidos são:
    - Casamento / Noiva
    - Eventos sociais
    - Maternidade
    - Corporativo
    - Cerimonialista
    - Revenda / Parceiros comerciais
    - Presentes
    - Consumo próprio
    - Outros
13. Campos específicos dependem do segmento/evento:
    - Casamento / Noiva: nome dos noivos.
    - Eventos sociais: tipo do evento; para aniversário, nome do aniversariante; para bodas, nome do casal; para batizado, identificação da criança quando aplicável; para chá de bebê/revelação, nome do bebê quando disponível.
    - Maternidade: nome do bebê quando disponível.
    - Corporativo: empresa e contato principal; demais dados cadastrais da pessoa jurídica entram na conversão para pedido.
    - Cerimonialista: empresa e pelo menos um contato com telefone.
    - Revenda / Parceiros comerciais: empresa, contatos e endereços somente quando o caso exigir.
    - Outros: tipo de evento e descrição livre do caso; o campo é obrigatório quando o segmento for Outros.
14. Nome dos noivos não deve ser um campo geral obrigatório do cadastro de cliente.

## Momento de conversão

A oportunidade vira **Pedido Reserva** quando:

1. o cliente aprova o orçamento; e
2. envia os dados necessários para o fechamento.

O Pedido Reserva fica aguardando aprovação e pagamento.

### Dados para pessoa física

- nome completo;
- CPF;
- email;
- telefone;
- endereço residencial completo.

### Dados para pessoa jurídica

- nome fantasia;
- CNPJ;
- razão social;
- inscrição estadual, com opção “isenta”;
- tipo de contribuinte: ICMS, isento ou não contribuinte;
- inscrição municipal;
- inscrição SUFRAMA;
- telefone;
- endereço completo.

Esses campos pertencem ao fechamento/Pedido Reserva. Não devem ser exigidos no primeiro cadastro de uma oportunidade quando ainda não há aprovação do orçamento.

## Ajuste de modelo necessário

- Separar `Cliente` de `Cerimonialista`.
- Criar `Contatos da Cerimonialista`, com nome, telefone e vínculo com a empresa.
- Criar `Endereços da Empresa/Parceiro`, permitindo vários endereços e identificadores próprios, como CNPJ da unidade quando aplicável.
- Criar o vínculo `Contato ↔ Endereço` para representar quais endereços cada contato solicita.
- Vincular cada oportunidade ao cliente e, quando intermediada, à cerimonialista e ao contato responsável.
- Registrar se a origem é direta ou intermediada.
- Manter dados dos noivos ausentes no primeiro contato intermediado.
- Tornar `telefone_principal` obrigatório no cadastro de cliente.
- Substituir opções genéricas de tipo de cliente pelos nove segmentos definidos.
- Retirar `nome_noivos` do cadastro geral e colocá-lo nos dados específicos do evento/pedido.
- Criar dados específicos do evento com tipo de evento e campos condicionais.
- Criar dados cadastrais de fechamento para pessoa física e jurídica, acionados somente na conversão para Pedido Reserva.
- Preservar `valor_estimado` na oportunidade e no Pedido Reserva.
- Diferenciar claramente os estados `Oportunidade` e `Pedido Reserva`.

## Medições habilitadas

- Pedidos por cerimonialista.
- Vendas por cerimonialista.
- Pedidos e vendas por assistente/contato.
- Solicitações por endereço/unidade corporativa.
- Conversão direta versus intermediada.
- Conversão de oportunidade para Pedido Reserva.
- Tempo entre aprovação do orçamento e envio dos dados de fechamento.

## Decisões fechadas pela gestão

- Nome da entidade intermediária: **Cerimonialista**.
- Revenda/Parceiros comerciais: estrutura de empresa, contatos e endereços é opcional, conforme o caso.
- Segmento Outros: terá tipo de evento e descrição livre obrigatória.
- Conversão: orçamento aprovado + dados de fechamento enviados = Pedido Reserva aguardando aprovação e pagamento.
- Campos de fechamento: PF e PJ conforme listas acima.

## Próxima ação

A consultoria deve incorporar estas decisões na SPEC-1-001 e ajustar a F1-T002 antes de qualquer nova alteração no modelo ou na interface. A implementação existente foi preservada nesta revisão.
