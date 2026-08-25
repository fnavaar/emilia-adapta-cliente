# Revisão de escopo — clientes diretos, cerimonialistas e grupos parceiros

- **Data**: 2026-08-25
- **Origem**: Fernanda, após teste da F1-T001
- **Status**: decisões da gestão registradas; alteração da SPEC necessária antes da próxima implementação
- **Impacto**: altera o modelo previsto na SPEC-1-001 e deve ser incorporada antes da F1-T002

## Regras de negócio confirmadas

1. Existem clientes diretos, clientes intermediados por cerimonialistas e clientes que pertencem a grupos parceiros/revendedores.
2. Em uma oportunidade intermediada por cerimonialista, o cadastro inicial usa os dados da cerimonialista; os dados dos noivos só ficam disponíveis quando a oportunidade vira pedido.
3. A entidade intermediária de casamentos será chamada **Cerimonialista**.
4. Cerimonialista precisa de cadastro próprio, com nome da empresa, contatos e endereço opcional.
5. Uma cerimonialista pode ter vários contatos/assistentes. Cada contato deve ter nome e telefone e precisa poder ser relacionado às oportunidades que trouxe.
6. O sistema deve medir pedidos e vendas por empresa cerimonialista e por contato/assistente.
7. Telefone principal é obrigatório no cadastro de cliente e é o principal apoio contra duplicidade.
8. Quando o cliente vier de uma cerimonialista, o telefone principal do cadastro inicial será o da cerimonialista ou do contato responsável.
9. Para cliente corporativo simples, o cliente é a empresa, com um contato principal identificado por nome e telefone.
10. O segmento **Revenda / Parceiros comerciais** deve atender grupos comerciais, não apenas empresas isoladas.
11. Um grupo parceiro/revendedor pode possuir várias empresas, CNPJs, unidades, lojas e endereços de entrega.
12. Um grupo parceiro/revendedor pode ter um único contato responsável por todos os pedidos ou vários contatos.
13. Cada contato do grupo pode solicitar pedidos para uma ou mais empresas, unidades ou endereços específicos.
14. Cada pedido deve identificar o grupo comercial, a empresa/CNPJ correspondente, a unidade/endereço de entrega e o contato que solicitou.
15. O sistema deve permitir medir o total vendido para o grupo, independentemente da empresa, CNPJ ou unidade específica faturada.
16. O sistema também deve permitir detalhar vendas por empresa, CNPJ, unidade, endereço e contato.
17. Exemplos de grupos parceiros/revendedores:
    - Casa do Pão de Queijo: grupo com vários CNPJs, contatos e endereços/lojas; cada contato pode solicitar entregas para uma ou duas lojas específicas.
    - Bisutti: grupo de buffets com vários CNPJs e locais de entrega; neste caso, os pedidos podem ser sempre passados pelo mesmo contato.
18. Revenda/Parceiros comerciais é um segmento e deve ter estrutura flexível para os dois casos: um contato ou vários contatos; uma unidade ou várias unidades.
19. Os segmentos válidos são:
    - Casamento / Noiva
    - Eventos sociais
    - Maternidade
    - Corporativo
    - Cerimonialista
    - Revenda / Parceiros comerciais
    - Presentes
    - Consumo próprio
    - Outros
20. Campos específicos dependem do segmento/evento:
    - Casamento / Noiva: nome dos noivos.
    - Eventos sociais: tipo do evento; para aniversário, nome do aniversariante; para bodas, nome do casal; para batizado, identificação da criança quando aplicável; para chá de bebê/revelação, nome do bebê quando disponível.
    - Maternidade: nome do bebê quando disponível.
    - Corporativo: empresa e contato principal; demais dados cadastrais da pessoa jurídica entram na conversão para pedido.
    - Cerimonialista: empresa e pelo menos um contato com telefone.
    - Revenda / Parceiros comerciais: grupo comercial; empresas/CNPJs, contatos e unidades/endereço são cadastrados conforme o caso, sem exigir que todos tenham a mesma estrutura.
    - Outros: tipo de evento e descrição livre do caso; o campo é obrigatório quando o segmento for Outros.
21. Nome dos noivos não deve ser um campo geral obrigatório do cadastro de cliente.

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

No caso de grupo parceiro/revendedor, o Pedido Reserva também deve registrar a empresa/CNPJ e a unidade/endereço específicos daquele pedido, mantendo o vínculo com o grupo principal.

Esses campos pertencem ao fechamento/Pedido Reserva. Não devem ser exigidos no primeiro cadastro de uma oportunidade quando ainda não há aprovação do orçamento.

## Ajuste de modelo necessário

- Separar `Cliente` de `Cerimonialista` e de `GrupoParceiro`.
- Criar `Cerimonialista`, com empresa e múltiplos `Contatos da Cerimonialista`.
- Criar `GrupoParceiro`, representando o grupo comercial, por exemplo Casa do Pão de Queijo ou Bisutti.
- Criar `Empresas do Grupo Parceiro`, com razão social, nome fantasia e CNPJ.
- Criar `Contatos do Grupo Parceiro`, com nome e telefone, permitindo um ou vários contatos.
- Criar `Unidades/Endereços do Grupo Parceiro`, vinculados à empresa/CNPJ correspondente.
- Permitir que cada contato do grupo seja relacionado a uma ou mais empresas, unidades ou endereços.
- Vincular cada oportunidade ao grupo parceiro quando o segmento for Revenda / Parceiros comerciais.
- Vincular também a oportunidade à empresa/CNPJ, unidade/endereço e contato solicitante específicos, quando disponíveis.
- Para cerimonialista, vincular cada oportunidade à cerimonialista e ao contato responsável.
- Registrar se a origem é direta, intermediada por cerimonialista ou originada de grupo parceiro/revendedor.
- Manter dados dos noivos ausentes no primeiro contato intermediado.
- Tornar `telefone_principal` obrigatório no cadastro de cliente.
- Substituir opções genéricas de tipo de cliente pelos nove segmentos definidos.
- Retirar `nome_noivos` do cadastro geral e colocá-lo nos dados específicos do evento/pedido.
- Criar dados específicos do evento com tipo de evento e campos condicionais.
- Criar dados cadastrais de fechamento para pessoa física e jurídica, acionados somente na conversão para Pedido Reserva.
- Preservar `valor_estimado` na oportunidade e no Pedido Reserva.
- Diferenciar claramente os estados `Oportunidade` e `Pedido Reserva`.

## Medições habilitadas

- Total de pedidos por grupo parceiro/revendedor.
- Total vendido por grupo parceiro/revendedor.
- Pedidos e vendas por empresa/CNPJ dentro do grupo.
- Pedidos e vendas por unidade/endereço.
- Pedidos e vendas por contato solicitante.
- Comparação entre grupos, como Casa do Pão de Queijo e Bisutti.
- Pedidos por cerimonialista.
- Vendas por cerimonialista.
- Pedidos e vendas por assistente/contato.
- Conversão direta versus intermediada.
- Conversão de oportunidade para Pedido Reserva.
- Tempo entre aprovação do orçamento e envio dos dados de fechamento.

## Decisões fechadas pela gestão

- Nome da entidade de casamentos: **Cerimonialista**.
- Revenda/Parceiros comerciais: será tratado como **Grupo Parceiro**, com estrutura flexível de empresas, CNPJs, contatos e unidades/endereço.
- Um grupo pode ter um ou vários contatos e uma ou várias unidades.
- Cada contato pode ser vinculado às unidades que atende.
- O resultado comercial principal poderá ser consolidado por grupo.
- Segmento Outros: terá tipo de evento e descrição livre obrigatória.
- Conversão: orçamento aprovado + dados de fechamento enviados = Pedido Reserva aguardando aprovação e pagamento.
- Campos de fechamento: PF e PJ conforme listas acima.

## Próxima ação

A consultoria deve incorporar estas decisões na SPEC-1-001 e ajustar a F1-T002 antes de qualquer nova alteração no modelo ou na interface. A implementação existente foi preservada nesta revisão.
