# Recibo F1-T001 — Homologação e dicionário do registro canônico

- **Data**: 2026-08-25
- **Task**: F1-T001
- **SPEC**: SPEC-1-001 — Registro canônico de cliente e oportunidade
- **Executor**: ETHOS (Bia)
- **Autorização**: Fernanda autorizou explicitamente a implementação em 2026-08-25.
- **Teste humano**: Fernanda confirmou que os registros apareceram no preview.

## Superfície confirmada

- **Projeto Skip**: Nexus Emilia
- **Project ID**: 52694
- **Superfície de homologação**: https://nexus-emilia-49529--preview.goskip.app
- **Backend hostname**: nexus-emilia-49529
- **Produção**: `isPublished: false`; produção não foi alterada.

## Evidência técnica

- Migração aplicada: `pocketbase/migrations/0001_criar_entidades.js`.
- Versão Skip: 0.0.2, hash `b70f57e`.
- QA da migração: setup, análise estática, build, integrações e testes passaram.
- Coleções confirmadas no Skip Cloud: `clientes`, `participantes`, `oportunidades`, `pendencias`, `historico_eventos` e `dados_entrega`, além de `users`.
- Usuários de homologação confirmados: Fernanda, Mara e Anie.
- Frontend de homologação posteriormente recebeu login, dashboard e formulários de cliente/oportunidade; versão 0.0.4 teve QA completo OK.

## Dicionário confirmado

A documentação anexada pela Fernanda (`uploads/60bb9ea8-gestaoclick_3_.apib`) confirma:

- GestãoClick API base: `https://api.gestaoclick.com`.
- Autenticação por `access-token` e `secret-access-token`.
- Limite de 3 requisições por segundo e 100 registros por página.
- Cliente em `/clientes`, com nome, tipo de pessoa, CPF/CNPJ, telefones, email e endereços.
- Orçamento em `/orcamentos`, com cliente, vendedor, data, previsão de entrega, situação, valor, pagamentos, produtos e observações.
- Situações de orçamento consultadas em `/situacoes_orcamentos`, incluindo Em aberto, Em andamento, Confirmado e Cancelado.
- Campos extras de orçamento consultados em `/atributos_orcamentos`, com tipo `texto_simples` e regra `exibir_impressao`.

### Campos extras de entrega fornecidos pela gestão

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

### Matriz de usuários

| Usuário | Papel |
|---|---|
| Fernanda | Gestão/admin |
| Mara | Gestão/admin |
| Anie | Atendimento |

`valor_estimado` foi confirmado pela gestão como campo que deve ser preenchido. O sistema não calcula preço automaticamente nesta task.

## Resultado e limites

**F1-T001 concluída.** O ambiente de homologação, a fonte técnica da API e o dicionário lógico dos campos foram registrados; o teste humano confirmou que o fluxo básico aparece no preview; produção permaneceu sem publicação e sem alteração.

Limite conhecido para tasks futuras: os IDs técnicos de atributos personalizados do tenant real e a homologação de integração externa ainda exigem consulta autenticada própria. Não foram colocadas credenciais no repositório.

A configuração de entidades e a interface de cadastro foram implementadas para homologação e serão exercitadas em profundidade nas tasks seguintes, sem considerar seus critérios como concluídos nesta task.
