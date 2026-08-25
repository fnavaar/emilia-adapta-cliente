# SPEC-1-001 — Registro canônico de cliente e oportunidade

**Fase:** 1  
**Status:** planejada  
**Dono:** Atendimento/vendas, com gestão como aprovadora de duplicidades  
**Origem no escopo:** RQ-001, RQ-007, RQ-013; AC-009, AC-010, AC-014; DH-002, DH-003  
**Degrau da solução:** dependência existente + construção mínima — reutilizar o ERP configurado e criar somente o registro canônico, vínculos e fila necessários para eliminar redigitação no primeiro ciclo.

## Contexto e decisões fechadas

- **Estado atual:** contatos chegam principalmente por WhatsApp/Digisac; o atendimento localiza ou cria clientes no GestãoClick e redigita dados entre conversas, ERP e documentos. A personalização permanece em texto livre e o histórico fica disperso. Fonte: 03-Projeto/01-Escopo.md, seções 3.1, 4.1–4.2; 02-Reuniao/Kickoff Call/02-Ata_reuniao.md, linhas 21–40.
- **Estado desejado:** um contato novo ou existente produz um registro canônico de cliente, participantes e oportunidade/pedido-base, com origem, responsável, estado, próxima ação, pendências e histórico, sem duplicidade silenciosa.
- **Decisões já fechadas:** o ERP configurado participa do fluxo; o pedido é o registro canônico; qualquer canal converge para o template; a integração Digisac↔GestãoClick não é presumida; merge de cadastros não é automático.
- **Bloqueios:** B1-REG-01 — Gestão/consultor técnico deve confirmar o tenant/superfície de construção e os campos disponíveis no ERP/Skip antes de escrever em conta real. Até lá, executar com fixture ou workspace de homologação e não alterar produção.

## Resultado observável

Na demonstração, uma atendente registra um contato de teste, localiza um cliente existente ou cria um novo, vincula participante e cria uma oportunidade/pedido-base em Novo ou Em briefing. O registro exibe responsavel_atual, origem_contato, proxima_acao, prazo_proxima_acao, tipo_pedido, source_ref e histórico. Dados já fornecidos aparecem uma vez no registro e podem ser reutilizados no briefing.

## Limites e dependências

- **Inclui:** entidades Cliente, Participante, Oportunidade/PedidoBase, Pendencia e HistoricoEvento; busca de cliente; vínculo externo; origem; responsável; próxima ação; estados iniciais; indicação de possível duplicidade.
- **Fora de escopo:** mesclar cadastros; apagar registro legado; proposta, preço, pagamento, produção, estoque, cliente-facing automation e integração bidirecional ativada.
- **Entradas e pré-condições:** contato manual ou fixture de webhook; nome/telefone disponíveis quando informados; tenant de homologação; lista de usuários e papéis.
- **Saídas/artefatos:** modelo configurado, tela/fluxo demonstrável, registros de teste, log de auditoria e lista de pendências.
- **Dependências e responsáveis:** dicionário de campos e regras de identidade — gestão/atendimento; superfície e acesso — consultor técnico; fonte legada — GestãoClick.
- **Atores e permissões mínimas:** atendimento cria/edita dados comerciais; gestão consulta e decide duplicidade; financeiro consulta identidade; produção não edita cadastro; cliente somente fornece dados pelo canal autorizado.
- **Superfícies/arquivos/configurações afetadas:** workspace de construção aprovado, campos do ERP configurado, contrato do template e fixture de teste; não alterar 03-Projeto/01-Escopo.md nem o ERP de produção sem gate.
- **Risco e plano B:** conflito de identidade ou fonte mantém o registro original e cria pendência; plano B é workspace/bridge manual reconciliável por source_ref.
- **Rollback ou reversão:** remover somente o vínculo/importação criado na execução de teste; preservar o cliente original, o pedido-base e o log.

## Dados e integrações

| Origem/destino | Fonte de verdade | Campos/contrato | Autenticação/permissão | Timeout/retry/idempotência | Tratamento de erro |
|---|---|---|---|---|---|
| Atendimento → registro canônico | Dado informado pelo cliente e confirmado pela atendente; ERP somente como registro existente | cliente_id, nome, telefone_principal, tipo_cliente, cpf_cnpj condicional, participantes[], tipo_pedido, origem_contato, responsavel_atual, status, proxima_acao, prazo_proxima_acao, source_ref, created_at, updated_at | Perfil atendimento/gestão; CPF/CNPJ e endereço somente quando aplicáveis | Criação manual é idempotente por source_ref; sem merge automático | Campo ausente vira pendência; conflito de identidade não sobrescreve |
| ERP/bridge → registro canônico | Campo do ERP conforme dicionário aprovado | external_system, external_record_id, last_confirmed_at, source_ref | Leitura mínima até G3; escrita somente no tenant de homologação | Evento repetido não cria segundo registro; conflito é enfileirado | Último estado confirmado permanece e gera ocorrência |

| Regra de negócio | Condição | Ação/resultado | Exceção | Fonte |
|---|---|---|---|---|
| RN-1-001 — Um registro canônico por vínculo | Contato novo ou existente com source_ref | Reutilizar o vínculo correspondente e não redigitar | source_ref ausente: criar pendência de origem; não inferir causalidade | RQ-001; DH-002 |
| RN-1-002 — Duplicidade é decisão humana | Heurística de telefone normalizado ou mesmo external_record_id sinaliza possível duplicidade | Mostrar candidatos e manter pending_type=identity_conflict | Não mesclar, sobrescrever ou apagar sem gestão/atendimento | RQ-001; AC-010 |
| RN-1-003 — Estado inicial controlado | Cliente identificado e briefing ainda não iniciado | Novo → Em briefing | Dado mínimo ausente mantém Aguardando dados | RQ-001/RQ-002 |
| RN-1-004 — Pendência tem dono | Campo obrigatório da transição ausente | Criar pendência com responsável, próxima ação, prazo e motivo | Sem responsável configurado: parar e registrar B1-REG-02 | Escopo definitivo, fase 1 |

## Fluxo e regras

1. Ler o contato manual/fixture e normalizar apenas espaços e formato de telefone, sem alterar o conteúdo informado.
2. Procurar source_ref externo; se houver, reutilizar o vínculo.
3. Se não houver vínculo, procurar sinal de possível duplicidade; mostrar candidatos sem mesclar.
4. Criar ou selecionar Cliente e Participante; registrar papel e origem.
5. Criar Oportunidade/PedidoBase com tipo_pedido, estado inicial, responsável e próxima ação.
6. Registrar evento de criação/seleção e devolver a fila ao atendimento.

| Cenário | Dado/condição | Resultado esperado | Caminho de erro/recuperação |
|---|---|---|---|
| Principal | Contato com telefone e origem | Cliente/pedido-base criado, estado e responsável visíveis | — |
| Reuso | source_ref ou candidato existente | Registro existente reutilizado sem segundo pedido | Divergência vira decisão de cadastro |
| Limite | Sem telefone, origem ou tipo de pedido | Registro parcial permitido somente com pendência explícita | Aguardando dados, responsável e próxima ação |
| Falha | Fonte externa indisponível ou payload inválido | Nenhuma escrita parcial silenciosa | Fallback manual com source_ref e ocorrência |

## Instruções de execução para o Ethos

1. **Ler antes de alterar:** 03-Projeto/02-Escopo-Definitivo.md, seção Fase 1; 03-Projeto/requisitos.md, RQ-001/RQ-002/RQ-013; esta SPEC.
2. **Alterar somente:** modelo, telas/fluxos, validações e fixtures desta SPEC no ambiente autorizado.
3. **Não alterar:** produção do ERP, regras de preço, pagamentos, produção, estoque, permissões fora da matriz ou escopo definitivo.
4. **Executar nesta ordem:** confirmar superfície → criar entidades/campos → configurar estado e pendência → configurar busca/vínculo → executar fixtures → registrar evidências.
5. **Parar e pedir validação quando:** faltar tenant, acesso, campo, papel, regra de identidade ou houver conflito entre ERP e registro canônico.
6. **Estado válido ao parar:** nenhum registro de produção alterado; fixtures e vínculos de teste identificados; falhas registradas.

## Checklist de execução

- [ ] B1-REG-01 resolvido para a superfície de homologação.
- [ ] Entidades, campos e estados iniciais configurados.
- [ ] Busca/reuso e sinal de possível duplicidade exercitados.
- [ ] Pendência com dono, próxima ação, prazo e motivo demonstrada.
- [ ] Registro de teste, histórico e rollback anexados ao recibo da task.

## Critérios de aceite

- [ ] **CA-1-001:** Um contato de fixture vira Cliente/Participante/Oportunidade-PedidoBase com source_ref, responsável, estado e histórico visíveis.
- [ ] **CA-1-002:** Repetir a mesma entrada com o mesmo source_ref não cria segundo cliente nem segundo pedido-base.
- [ ] **CA-1-003:** Possível duplicidade aparece para decisão humana e não mescla, sobrescreve ou apaga registros.
- [ ] **CA-1-004:** Campo ausente mantém o registro em Aguardando dados com dono, próxima ação, prazo e motivo.
- [ ] **CA-1-005:** Reversão de vínculo de teste preserva registro original e histórico e não deixa escrita parcial silenciosa.

## TDD da SPEC

| Etapa | Prova | Comando/ação | Resultado esperado | Evidência |
|---|---|---|---|---|
| RED | Antes da configuração, importar o mesmo fixture duas vezes | Executar fluxo manual de criação/reimportação | O cenário demonstra duplicidade ou ausência de vínculo, ligado a CA-1-002 | Captura/log no recibo da task |
| GREEN | Configurar vínculo, estado e pendência; repetir os quatro fixtures | Executar principal, reuso, limite e falha | CA-1-001 a CA-1-005 passam sem escrita em produção | Registro de teste, histórico e captura |
| REFACTOR/REGRESSÃO | Repetir com telefone normalizado, ausência de origem e payload indisponível | Executar a suíte manual da SPEC | Sem duplicidade, sem perda de registro e com fallback visível | Checklist assinado pelo dono |

**Dados/fixtures:** FIX-1-001 contato novo; FIX-1-002 mesma entrada repetida; FIX-1-003 contato com candidato de telefone; FIX-1-004 contato sem telefone/origem; FIX-1-005 fonte indisponível. Os dados devem ser fictícios ou anonimizados.
**Caminhos de erro obrigatórios:** duplicidade, campo ausente, fonte indisponível, permissão insuficiente e reversão de vínculo.
**Evidência exigida:** registros de teste, histórico, captura da pendência, log de erro e demonstração de rollback no recibo da task.

## Handoff e operação

- **Como demonstrar:** abrir a fila, criar/reutilizar um contato, mostrar o pedido-base e simular pendência/duplicidade.
- **Como operar depois:** atendimento registra e atualiza; gestão decide conflitos.
- **Como monitorar:** fila de Aguardando dados, pending_type=identity_conflict e eventos de erro.
- **Pendência conhecida:** B1-REG-02 — critérios definitivos de mesclagem e responsável nominal devem ser registrados antes de qualquer merge.

## Tasks vinculadas

| ID | Task | Leva | Critério binário | Subseção da SPEC | Status |
|---|---|---|---|---|---|
| F1-T001 | Confirmar tenant/superfície de homologação e dicionário de campos do registro canônico | 1 | Ambiente e mapa aprovados sem escrita em produção | `## Contexto e decisões fechadas`; `## Limites e dependências` | liberada |
| F1-T002 | Configurar entidades, campos, estados iniciais e pendência do registro canônico | 2 | Entidades e estados aceitam os campos mínimos e a pendência | `## Dados e integrações`; `## Fluxo e regras` | planejada |
| F1-T003 | Configurar busca/reuso, sinalização de duplicidade e reversão não destrutiva | 3 | Reuso é idempotente, duplicidade exige decisão humana e rollback preserva original/histórico | `## Fluxo e regras`; `## TDD da SPEC` | planejada |

## Emendas

| Data | Origem do sinal | Micro-spec/task | Motivo |
|---|---|---|---|
| | | | |
