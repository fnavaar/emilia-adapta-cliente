# SPEC-1-002 — Briefing condicional e fila de dados ausentes

**Fase:** 1  
**Status:** planejada  
**Dono:** Atendimento/vendas  
**Origem no escopo:** RQ-002, RQ-007; AC-009, AC-012, AC-013; DH-003, DH-004  
**Degrau da solução:** recurso nativo da plataforma + construção mínima — usar formulário/estrutura nativa no workspace aprovado e manter qualquer canal de entrada convergindo ao template canônico.

## Contexto e decisões fechadas

- **Estado atual:** informações de eventos, degustações, revendas e bem-nascidos chegam em conversa, com texto incompleto, e são fatiadas/redigitadas. Fonte: 03-Projeto/01-Escopo.md, seção 4.3; 03-Projeto/requisitos.md, RQ-002.
- **Estado desejado:** a atendente escolhe o tipo de pedido, vê somente os campos condicionais aplicáveis, identifica completos/faltantes/contraditórios e mantém o pedido em Aguardando dados até a próxima transição protegida.
- **Decisões já fechadas:** qualquer canal pode iniciar; o template é único; campos condicionais evitam obrigatoriedade universal; formulação/personalização estruturada será detalhada em fase 2.
- **Bloqueios:** B1-BRF-01 — gestão/atendimento devem confirmar a matriz final de campos mínimos por tipo e o responsável por confirmar completude antes de permitir avanço para Em proposta. Nesta SPEC, a criação parcial do pedido-base é permitida e a confirmação fica registrada como pendência.

## Resultado observável

Na demonstração, a atendente cria um pedido-base e escolhe degustação, evento, revendedor ou bem-nascido. O template mostra os campos gerais, os campos condicionais do tipo escolhido e uma fila com completo, faltante, contraditório, responsável, próxima ação e prazo. A troca de canal não cria um segundo modelo.

## Limites e dependências

- **Inclui:** template único; seleção de tipo; campos gerais e condicionais; estados de completude; pendências; origem do valor; confirmação manual; filtro por responsável.
- **Fora de escopo:** envio automático ao cliente; interpretação generativa de conversa; cálculo de preço; aprovação; composição faturável; liberação de produção; definição de SLA comercial.
- **Entradas e pré-condições:** SPEC-1-001 concluída em homologação; pedido-base existente; usuário atendimento; fixtures por tipo.
- **Saídas/artefatos:** template configurado, matriz de campos, fila de pendências, quatro cenários demonstráveis e registro de confirmação.
- **Dependências e responsáveis:** matriz de campos — gestão/atendimento; acesso ao workspace — consultor técnico; revisão de termos — gestão.
- **Atores e permissões mínimas:** atendimento cria/edita briefing; gestão administra matriz; cliente/assessoria fornece valores; demais áreas leitura conforme necessidade.
- **Superfícies/arquivos/configurações afetadas:** template do pedido-base, regras condicionais e fila; não alterar canais externos ou enviar mensagem automaticamente.
- **Risco e plano B:** campo irrelevante bloqueando lead; plano B é deixar o campo opcional e criar pendência nomeada até confirmação humana.
- **Rollback ou reversão:** desativar uma regra condicional e preservar respostas já registradas, sem apagar o histórico.

## Dados e integrações

| Origem/destino | Fonte de verdade | Campos/contrato | Autenticação/permissão | Timeout/retry/idempotência | Tratamento de erro |
|---|---|---|---|---|---|
| Canal → briefing | Valor informado pelo cliente e confirmado pela atendente | tipo_pedido, nome_contato, telefone, responsavel_atual, origem_contato, campos condicionais do tipo, field_status, source_ref, confirmed_by, confirmed_at | Atendimento edita; gestão altera definição da matriz | Não criar segundo briefing para o mesmo pedido_base_id | Valor contraditório vira pendência CONFLICTING_VALUE |
| Pedido-base → fila | Registro da SPEC-1-001 | missing_fields[], next_action, due_at, owner_id, pending_reason | Leitura por áreas autorizadas; escrita pelo dono | Atualização idempotente por pedido_base_id + field_key | Fila conserva último valor e histórico de alteração |

| Regra de negócio | Condição | Ação/resultado | Exceção | Fonte |
|---|---|---|---|---|
| RN-1-201 — Campos gerais mínimos | Criação de pedido-base | Exigir tipo, contato, responsável e origem conhecida ou explicitamente não informada | Ausência mantém Aguardando dados | RQ-001/RQ-002 |
| RN-1-202 — Campos condicionais | Tipo selecionado | Exibir somente grupo aplicável | Campo não aplicável não bloqueia | AC-009; DH-003 |
| RN-1-203 — Completude não é aprovação | Campo preenchido | Marcar informado; só atendente/gestão marca confirmado | Contradição cria pendência | RQ-002 |
| RN-1-204 — Próxima transição protegida | Tentativa de avançar | Mostrar campos faltantes da matriz da transição | Sem matriz aprovada: B1-BRF-01, não avançar silenciosamente | Escopo definitivo, fase 1 |

**Matriz inicial de grupos condicionais:**  
evento: data_evento, quantidade_convidados ou quantidade_bem_casados, local_entrega, prazo_entrega;  
degustação: modalidade_entrega, local_entrega quando aplicável, referência/paleta quando informada;  
revendedor: datas_entrega, quantidade, tipo_cliente;  
bem-nascido: data_estimada_parto, maternidade quando informada, tipo_parto quando informado, responsavel_acompanhamento.  
Esses campos podem ficar pendentes no pedido-base; a obrigatoriedade para proposta é o bloqueio B1-BRF-01.

## Fluxo e regras

1. Abrir pedido-base e escolher o tipo.
2. Renderizar campos gerais e condicionais, sem perder valores já preenchidos.
3. Registrar cada valor com origem e status informado.
4. A atendente confirma ou marca pendência/contradição.
5. Gerar a fila com faltantes, dono, próxima ação e prazo.
6. Demonstrar que degustação, evento, revendedor e bem-nascido usam o mesmo registro e a mesma estrutura.

| Cenário | Dado/condição | Resultado esperado | Caminho de erro/recuperação |
|---|---|---|---|
| Principal | Evento com data e quantidade | Campos exibidos, valores guardados e status visível | — |
| Troca de tipo | Pedido muda de evento para degustação antes de proposta | Grupo anterior é preservado no histórico; novo grupo aparece | Campos incompatíveis viram pendência, não são apagados |
| Limite | Campo condicional ausente | Pedido permanece com faltante nomeado | Próxima ação e dono obrigatórios |
| Falha | Dois valores contraditórios para data | CONFLICTING_VALUE, dois valores preservados e decisão humana | Não escolher o último automaticamente |

## Instruções de execução para o Ethos

1. **Ler antes de alterar:** 03-Projeto/02-Escopo-Definitivo.md, Fase 1; 03-Projeto/requisitos.md, RQ-002; SPEC-1-001.
2. **Alterar somente:** template, grupos condicionais, status de campo e fila desta SPEC.
3. **Não alterar:** regras comerciais, composição de preço, canais externos, estados de produção ou confirmação automática ao cliente.
4. **Executar nesta ordem:** confirmar matriz inicial → configurar campos → configurar status/pendência → configurar fila → executar fixtures → revisar com atendimento.
5. **Parar e pedir validação quando:** B1-BRF-01 afetar avanço comercial, houver campo sensível sem permissão ou a troca de tipo exigir perda de dados.
6. **Estado válido ao parar:** pedido-base preservado; valores e origem mantidos; pendências visíveis.

## Checklist de execução

- [ ] B1-BRF-01 registrado com dono e saída para a próxima fase.
- [ ] Quatro tipos renderizam grupos condicionais no mesmo template.
- [ ] Status informado, confirmado, faltante e contraditório demonstrados.
- [ ] Fila exibe responsável, próxima ação, prazo e motivo.
- [ ] Troca de tipo e reversão de regra não apagam histórico.

## Critérios de aceite

- [ ] **CA-1-101:** Os quatro tipos de pedido usam o mesmo pedido-base e exibem campos condicionais distintos.
- [ ] **CA-1-102:** Campo ausente não é ocultado: aparece na fila com motivo, dono, próxima ação e prazo.
- [ ] **CA-1-103:** Valor contraditório preserva as versões e exige confirmação humana.
- [ ] **CA-1-104:** Canal de entrada diferente não cria outro modelo ou outro registro de briefing.
- [ ] **CA-1-105:** O template não calcula preço, não aprova pedido e não libera produção.

## TDD da SPEC

| Etapa | Prova | Comando/ação | Resultado esperado | Evidência |
|---|---|---|---|---|
| RED | Criar pedido-base sem grupo condicional configurado | Abrir cada tipo no template vazio | O fluxo não identifica faltantes por tipo, demonstrando a necessidade do comportamento | Captura inicial no recibo |
| GREEN | Configurar matriz e executar quatro fixtures | Abrir, preencher parcialmente, contradizer e trocar tipo | CA-1-101 a CA-1-105 passam | Capturas, export de campos e fila |
| REFACTOR/REGRESSÃO | Repetir com campo opcional, valor antigo e origem manual | Executar roteiro de troca/rollback | Nenhum valor é apagado; fila permanece consistente | Checklist de regressão |

**Dados/fixtures:** FIX-1-101 evento; FIX-1-102 degustação; FIX-1-103 revendedor; FIX-1-104 bem-nascido; FIX-1-105 data contraditória. Usar dados fictícios.
**Caminhos de erro obrigatórios:** ausência, contradição, troca de tipo, campo não aplicável, usuário sem permissão.
**Evidência exigida:** matriz configurada, quatro capturas de fluxo, fila de pendências e registro de revisão da atendente.

## Handoff e operação

- **Como demonstrar:** abrir um pedido-base de cada tipo e mostrar grupo condicional, completude e pendência.
- **Como operar depois:** atendimento preenche/confirma; gestão mantém matriz.
- **Como monitorar:** quantidade de pedidos em Aguardando dados por motivo e prazo.
- **Pendência conhecida:** B1-BRF-01 bloqueia automatizar a transição para proposta, não a construção do template.

## Tasks vinculadas

| ID | Task | Leva | Critério binário | Subseção da SPEC | Status |
|---|---|---|---|---|---|
| F1-T004 | Aprovar matriz de campos mínimos e confirmação da transição do briefing | 1 | Matriz, dono e confirmação antes de Em proposta estão aprovados | `## Contexto e decisões fechadas`; `## Dados e integrações` | liberada |
| F1-T005 | Configurar template único com grupos condicionais e convergência de canais | 2 | Quatro tipos usam um pedido-base e não criam modelo paralelo | `## Resultado observável`; `## Fluxo e regras` | planejada |
| F1-T006 | Exercitar briefing parcial, contraditório e troca de tipo com fila de pendências | 3 | Ausência e contradição ficam visíveis, versionadas e com confirmação humana | `## Fluxo e regras`; `## TDD da SPEC` | planejada |

## Emendas

| Data | Origem do sinal | Micro-spec/task | Motivo |
|---|---|---|---|
| | | | |
