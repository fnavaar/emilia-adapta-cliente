# Recibo F1-T001 — Homologação e dicionário do registro canônico

- **Data**: 2026-08-25
- **Task**: F1-T001
- **SPEC**: SPEC-1-001 — Registro canônico de cliente e oportunidade
- **Executor**: ETHOS (Bia)
- **Autorização**: Fernanda autorizou explicitamente a implementação em 2026-08-25 às 11:22.

## Superfície confirmada

- **Projeto Skip**: Nexus Emilia
- **Project ID**: 52694
- **Superfície de homologação**: https://nexus-emilia-49529--preview.goskip.app
- **Backend hostname**: nexus-emilia-49529
- **Produção**: `isPublished: false`; URL de produção identificada, mas não publicada e não alterada.
- **Rotas observadas**: `/` (Index) e fallback (`*`).

## Estado real observado

- O projeto frontend ainda é o template inicial, com `Index` de exemplo.
- O Skip Cloud possui somente a coleção auth `users`.
- A coleção `users` possui os campos de autenticação, `name`, `avatar`, `created` e `updated`.
- Não foram observadas coleções Cliente, Participante, Oportunidade/PedidoBase, Pendência ou HistóricoEvento.
- Não foram observados campos ou estados de negócio no backend que permitam confirmar os identificadores técnicos do ERP/Skip.

## Dicionário aprovado para a próxima configuração

### Registro canônico e oportunidade/pedido-base

| Campo | Tipo lógico | Obrigatório/regra | Observação |
|---|---|---|---|
| cliente_id | relação | obrigatório | Cliente identificado/criado |
| nome | texto | obrigatório quando informado | Nome do cliente |
| telefone_principal | texto | obrigatório quando informado | Normalizar apenas formato |
| tipo_cliente | seleção | conforme contexto | Tipo de cliente |
| cpf_cnpj | texto | condicional | Coletar somente quando aplicável |
| participantes | relações | conforme contexto | Participantes do pedido |
| tipo_pedido | seleção | necessário para oportunidade | Tipo do pedido |
| origem_contato | seleção/texto | obrigatório ou pendência explícita | Origem informada |
| responsavel_atual | relação | obrigatório | Atendimento responsável |
| status | seleção | obrigatório | Novo, Em briefing ou Aguardando dados |
| proxima_acao | texto | obrigatório | Próximo passo operacional |
| prazo_proxima_acao | data | conforme pendência | Prazo |
| source_ref | texto | conforme origem | Idempotência/reuso |
| valor_estimado | número monetário | **preenchimento obrigatório** | Confirmado por Fernanda; não calcular automaticamente nesta task |

### Dados de entrega do ERP

Todos os campos abaixo foram fornecidos por Fernanda como **Texto**. A regra de impressão deve ser preservada na configuração futura.

| Campo | Tipo | Exibir na impressão |
|---|---|---|
| Noivos / Aniversariante / Assessoria | Texto | Quando preenchido |
| Local de Entrega | Texto | Sempre exibir |
| Endereço de Entrega | Texto | Quando preenchido |
| Complemento | Texto | Quando preenchido |
| Bairro de Entrega | Texto | Quando preenchido |
| CEP de Entrega | Texto | Quando preenchido |
| Cidade de Entrega | Texto | Quando preenchido |
| Ref de Endereço | Texto | Quando preenchido |
| Horário do Evento | Texto | Quando preenchido |
| Responsável Por Receber (Nome e Telefone) | Texto | Sempre exibir |
| Hor. Previsto de Entrega | Texto | Sempre exibir |
| Pedido do Ifood | Texto | Quando preenchido |
| SITUAÇÃO DO PEDIDO | Texto | Quando preenchido |

## Matriz inicial de usuários

| Usuário | Papel | Escopo confirmado |
|---|---|---|
| Fernanda | Gestão/admin | Consulta e decisão de duplicidades |
| Mara | Gestão/admin | Consulta e decisão de duplicidades |
| Anie | Atendimento | Criação e edição de dados comerciais |

Nenhum usuário adicional foi criado. RLS/auditoria são tratados na F1-T010.

## Veredito e bloqueio

**B1-REG-01 permanece bloqueado.** A superfície Skip de homologação foi confirmada, mas faltam os identificadores técnicos dos campos no ERP e os estados reais do pedido no tenant autorizado. Como o backend Skip ainda não tem o modelo de negócio, não é possível anexar um dicionário técnico aprovado nem avançar para a configuração da F1-T002 sem decisão/acesso adicional.

Não houve escrita em produção. Não foram criadas coleções, registros, usuários, integrações ou credenciais. A F1-T001 deve permanecer bloqueada até a confirmação dos dados técnicos e do acesso de homologação do ERP.
