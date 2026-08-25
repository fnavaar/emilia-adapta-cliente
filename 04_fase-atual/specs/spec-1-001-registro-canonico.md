# SPEC-1-001 — Registro canônico de cliente e oportunidade

**Fase:** 1  
**Status:** em implementação  
**Dono:** Atendimento/vendas, com gestão como aprovadora de duplicidades

## Decisões de modelo vigentes

- **Tipo de Cliente** pertence ao cadastro do cliente e identifica a natureza do relacionamento: `Cliente Direto`, `Cerimonialista`, `Corporativo`, `Revenda` ou `Parceiro`.
- **Segmento** pertence à oportunidade, pois o mesmo cliente pode procurar eventos diferentes ao longo do tempo.
- Cliente Direto é pessoa física e habilita CPF.
- Corporativo habilita CNPJ.
- Cerimonialista é intermediário/parceiro e admite uma empresa com vários contatos, cada contato com nome e telefone.
- Revenda atende buffets, lojas e pessoas que compram para revender, com estrutura simples ou grupo comercial.
- Parceiro normalmente é empresa, pode ter CNPJ e CPF opcional, e pode receber indicações ou degustações para seus clientes.
- Nome dos noivos, aniversariante, casal, bebê e descrição de evento pertencem à oportunidade/dados do evento, nunca ao cadastro geral do cliente.
- A oportunidade possui os segmentos `Casamento / Noiva`, `Eventos sociais`, `Maternidade`, `Corporativo` e `Outros`, além do tipo específico de evento.
- Cerimonialistas e grupos parceiros mantêm cadastros próprios para permitir múltiplos contatos, empresas, CNPJs, unidades e endereços.

## Resultado observável

Uma atendente consegue cadastrar um cliente escolhendo seu Tipo de Cliente, com campos fiscais e relacionais condicionais, sem obrigar dados do evento. Em seguida, cria uma ou mais oportunidades para esse cliente, escolhendo o Segmento e preenchendo apenas os dados específicos daquela oportunidade.

## Campos mínimos

### Cliente

- nome;
- telefone principal obrigatório;
- telefone secundário opcional;
- email;
- Tipo de Cliente obrigatório;
- CPF somente para Cliente Direto e opcional para Parceiro;
- CNPJ para Corporativo, e quando aplicável a Cerimonialista, Revenda e Parceiro;
- origem do contato;
- observações.

### Oportunidade

- cliente;
- Segmento obrigatório;
- tipo de evento obrigatório;
- estado inicial `Novo`, `Em briefing` ou `Aguardando dados`;
- responsável, próxima ação, prazo e valor estimado;
- dados condicionais: nome dos noivos, aniversariante, casal, bebê ou tipo/descrição de Outros.

### Relacionamentos

- Cerimonialista: empresa e vários contatos nome/telefone; oportunidade pode indicar a cerimonialista e o contato responsável.
- Revenda/Parceiro: grupo, empresas/CNPJs, contatos e unidades/endereço, conforme o caso; oportunidade/pedido identifica os vínculos específicos disponíveis.

## Regras

- O cadastro de cliente não exige segmento nem dados de evento.
- O mesmo cliente pode ter várias oportunidades com segmentos diferentes.
- Tipo de Cliente não deve ser usado para representar o tipo de evento.
- Dados fiscais completos de fechamento PF/PJ pertencem ao Pedido Reserva, não ao primeiro cadastro.
- Possível duplicidade exige decisão humana; não mesclar, sobrescrever ou apagar automaticamente.

## Critério da F1-T002

Cliente, oportunidade, pendência e histórico aceitam os campos mínimos; os cinco tipos de cliente e os segmentos da oportunidade são persistidos; os campos condicionais aparecem no contexto correto; os estados Novo/Em briefing/Aguardando dados permanecem disponíveis.

## TDD e evidências

- Cliente Direto: CPF aparece e é obrigatório; segmento não aparece no cadastro.
- Corporativo: CNPJ aparece e é obrigatório.
- Cerimonialista: empresa e múltiplos contatos nome/telefone são possíveis.
- Revenda e Parceiro: empresa/grupo e estrutura flexível são possíveis; CPF de Parceiro é opcional.
- Oportunidade: Segmento e tipo de evento aparecem; nome dos noivos/aniversariante/bebê é salvo na oportunidade.
- Regressão: um cliente pode receber segunda oportunidade com outro segmento sem alterar o cadastro original.

## Emenda aprovada — 2026-08-25

Origem: Fernanda. O cadastro deve começar pelo Tipo de Cliente; Segmento e campos de evento entram na Oportunidade. A implementação anterior que usava os nove segmentos no cliente foi substituída por este modelo.
