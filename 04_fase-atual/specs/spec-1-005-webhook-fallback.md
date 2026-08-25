# SPEC-1-005 — Contrato de entrada webhook e fallback reconciliável

**Fase:** 1  
**Status:** planejada  
**Dono:** Responsável técnico, com gestão como aprovadora da integração  
**Origem no escopo:** RQ-001, RQ-014; AC-002, AC-010, AC-014; DH-002  
**Degrau da solução:** construção mínima — definir contrato, validação, idempotência e fila de fallback antes de ativar qualquer integração externa.

## Contexto e decisões fechadas

- **Estado atual:** GestãoClick possui API paga ativa; o canal Digisac↔ERP, anexos, permissões, retry e reconciliação não foram demonstrados. Há contornos manuais por PDF/workspace. Fonte: 02-Reuniao/Kickoff Call/02-Ata_reuniao.md, linhas 21–25; 03-Projeto/analise-critica.md, AC-002 e AC-010.
- **Estado desejado:** o sistema consegue validar uma entrada externa em fixture, rejeitar payload inválido, impedir duplicidade por event_id, registrar último estado confirmado e encaminhar erro para fallback manual reconciliável.
- **Decisões já fechadas:** consumir dados por harness/webhook; não presumir Digisac bidirecional; não alterar sistema externo sem prova; fallback manual mantém source_ref.
- **Bloqueios:** B1-INT-01 — responsável técnico deve confirmar endpoint, método de autenticação, payload real, credencial de homologação, limites e autorização de escrita antes de ativar qualquer conector. Esta SPEC pode ser construída e testada com fixtures sem ativação externa.

## Resultado observável

Na demonstração, uma fixture válida entra no contrato, cria/atualiza o vínculo do pedido-base de forma idempotente e registra evento. A mesma fixture repetida não duplica registro. Uma fixture inválida, uma mesma event_id com payload divergente e uma falha de destino entram em fila de erro com error_code, source_ref, último estado confirmado, responsável e próxima ação. O atendimento consegue continuar por fallback manual.

## Limites e dependências

- **Inclui:** envelope de evento, schema mínimo, validação, normalização limitada, idempotência, log sanitizado, fila de erro, fallback manual e reconciliação por source_ref.
- **Fora de escopo:** ativar Digisac/WhatsApp; receber anexos reais; publicar endpoint; credenciais; retry em produção; escrita bidirecional no ERP; sincronização de pagamentos/produção.
- **Entradas e pré-condições:** fixtures anonimizadas; SPEC-1-001; ambiente local/homologação; B1-INT-01 para conexão real.
- **Saídas/artefatos:** contrato versionado, validador, tabela/fila de eventos, fixtures, logs e roteiro de reconciliação.
- **Dependências e responsáveis:** payload e autenticação — responsável técnico; fonte/autoridade por campo — gestão; acesso de homologação — cliente.
- **Atores e permissões mínimas:** sistema recebe evento no ambiente autorizado; técnico consulta logs/reprocessa com autorização; atendimento registra fallback; ninguém altera produção por esta SPEC.
- **Superfícies/arquivos/configurações afetadas:** harness/bridge de homologação, schema/fixture e fila de erro; nenhum endpoint externo ativado neste ciclo.
- **Risco e plano B:** evento perdido, duplicado ou malformado; plano B é entrada manual com ID externo e reconciliação, mantendo último estado confirmado.
- **Rollback ou reversão:** desativar consumidor de teste, marcar eventos pendentes e remover vínculo de fixture sem apagar registro canônico; preservar log sanitizado.

## Dados e integrações

| Origem/destino | Fonte de verdade | Campos/contrato | Autenticação/permissão | Timeout/retry/idempotência | Tratamento de erro |
|---|---|---|---|---|---|
| Fonte externa → harness | Evento emitido pela fonte, sem confiar no conteúdo para autorização | event_id, event_type, payload_version, source_system, external_record_id, occurred_at, received_at, data, trace_id | B1-INT-01 deve aprovar método; rejeitar evento sem autenticação válida quando ativado | event_id é chave idempotente; mesmo ID com payload diferente gera conflito; timeout não altera estado confirmado | error_code, tentativa, último estado, dono, próxima ação |
| Harness → registro canônico | Contrato da SPEC-1-001 após validação | Somente campos permitidos do envelope: identidade, tipo, origem, source_ref e timestamps | Permissão de serviço mínima e tenant de homologação | Retry limitado e somente após classificação; sem retry infinito | Fila integration_error e fallback manual |

| Regra de negócio | Condição | Ação/resultado | Exceção | Fonte |
|---|---|---|---|---|
| RN-1-501 — Schema antes de escrita | Evento recebido | Validar campos, versão e tipos antes de criar vínculo | Inválido não escreve no registro canônico | RQ-014 |
| RN-1-502 — Idempotência | event_id já processado com mesmo hash | Retornar resultado anterior sem nova criação | Mesmo ID com hash diferente vira conflito | AC-002 |
| RN-1-503 — Último estado confirmado | Timeout/erro no destino | Manter estado anterior e criar ocorrência | Não assumir sucesso por ausência de erro | AC-002; AC-014 |
| RN-1-504 — Fallback reconciliável | Evento não pode ser processado | Atendimento registra source_ref, motivo e próximo passo | Sem ID externo, parar e pedir decisão | DH-002 |

## Fluxo e regras

1. Receber fixture/envelope e registrar received_at.
2. Validar autenticação quando o ambiente suportar; no modo fixture, marcar test_mode=true.
3. Validar schema, versão e campos permitidos; sanitizar logs para não persistir segredo.
4. Verificar event_id e hash do envelope.
5. Criar/atualizar apenas o vínculo autorizado do pedido-base.
6. Registrar resultado e devolver processed, duplicate, rejected ou manual_reconciliation.
7. Em falha, manter último estado confirmado e criar fila de erro.

| Cenário | Dado/condição | Resultado esperado | Caminho de erro/recuperação |
|---|---|---|---|
| Principal | Fixture válida, novo event_id | Um registro/vínculo e um evento processado | — |
| Duplicado | Mesmo event_id e mesmo hash | Nenhum segundo registro; resultado idempotente | Log de duplicidade |
| Conflito | Mesmo event_id, hash diferente | Nenhuma escrita nova; integration_conflict | Reconciliação humana |
| Inválido | Campo obrigatório ausente ou tipo inválido | Rejeição com erro e fallback | Atendimento usa source_ref manual |
| Timeout | Destino indisponível | Último estado preservado; fila e retry controlado | Reprocessamento autorizado |

## Instruções de execução para o Ethos

1. **Ler antes de alterar:** 03-Projeto/02-Escopo-Definitivo.md, Fase 1; 03-Projeto/requisitos.md, RQ-014; SPEC-1-001; esta SPEC.
2. **Alterar somente:** schema, validador, fixtures, idempotência e fila de fallback em homologação.
3. **Não alterar:** endpoint real, credencial, produção, pagamento, estado de produção ou contrato externo sem B1-INT-01.
4. **Executar nesta ordem:** fechar envelope → criar fixtures → validar schema → testar idempotência → testar falha/timeout → demonstrar fallback → registrar bloqueios.
5. **Parar e pedir validação quando:** faltar autenticação, endpoint, payload real, permissão, limite ou autoridade por campo.
6. **Estado válido ao parar:** nenhuma escrita externa; eventos de teste rastreáveis; registro canônico e fallback consistentes.

## Checklist de execução

- [ ] Contrato e payload_version documentados.
- [ ] Fixtures válida, repetida, conflitante e inválida executadas.
- [ ] Idempotência e último estado confirmado demonstrados.
- [ ] Fila de erro contém dono, próxima ação e source_ref.
- [ ] B1-INT-01 permanece bloqueando ativação externa até sua saída ser anexada.

## Critérios de aceite

- [ ] **CA-1-401:** Fixture válida cria ou atualiza somente o vínculo autorizado e registra evento.
- [ ] **CA-1-402:** Repetir event_id com mesmo hash não duplica registro nem evento de criação.
- [ ] **CA-1-403:** Mesmo event_id com hash divergente é bloqueado e encaminhado para reconciliação.
- [ ] **CA-1-404:** Payload inválido não escreve no registro canônico e apresenta erro acionável.
- [ ] **CA-1-405:** Timeout mantém último estado confirmado e cria fallback com responsável, próxima ação e source_ref.
- [ ] **CA-1-406:** Nenhum endpoint/credencial externo é ativado sem B1-INT-01.

## TDD da SPEC

| Etapa | Prova | Comando/ação | Resultado esperado | Evidência |
|---|---|---|---|---|
| RED | Enviar fixture repetida antes do validador/idempotência | Executar consumidor em modo teste | O cenário evidencia duplicidade ou ausência de erro classificado | Log inicial |
| GREEN | Executar cinco fixtures no consumidor de homologação | Validar novo, duplicado, conflito, inválido e timeout | CA-1-401 a CA-1-406 passam | Logs sanitizados, fila e registros |
| REFACTOR/REGRESSÃO | Reprocessar conflito e parar consumidor | Executar retry único autorizado e rollback de fixture | Não duplica, não altera último estado e não deixa endpoint externo ativo | Relatório de integração |

**Dados/fixtures:** FIX-1-401 válido; FIX-1-402 duplicado; FIX-1-403 mesmo ID/hash divergente; FIX-1-404 inválido; FIX-1-405 destino em timeout. Todos anonimizados, sem tokens.
**Caminhos de erro obrigatórios:** autenticação ausente quando aplicável, schema inválido, duplicidade, conflito, timeout, permissão insuficiente e rollback.
**Evidência exigida:** schema versionado, fixtures, logs sem segredo, fila de erro, demonstração de último estado e registro de que B1-INT-01 bloqueou ativação.

## Handoff e operação

- **Como demonstrar:** executar fixtures, abrir evento processado/duplicado/conflitante e operar fallback manual.
- **Como operar depois:** técnico monitora fila; atendimento reconcilia dados autorizados; gestão decide conflitos.
- **Como monitorar:** eventos rejeitados, conflitos, retries, último estado e idade da fila.
- **Pendência conhecida:** B1-INT-01; a construção de contrato não prova a disponibilidade do conector.

## Tasks vinculadas

| ID | Task | Leva | Critério binário | Subseção da SPEC | Status |
|---|---|---|---|---|---|
| F1-T013 | Fechar contrato de webhook/bridge e autorização de homologação | 1 | Pacote documenta schema/autenticação/limites e registra aprovação ou bloqueio; sem isso, integração externa fica bloqueada | `## Contexto e decisões fechadas`; `## Dados e integrações` | liberada |
| F1-T014 | Construir harness de validação, idempotência e fallback com fixtures | 2 | Eventos válidos funcionam; repetição é idempotente; conflito/inválido/timeout preservam estado e geram ocorrência | `## Dados e integrações`; `## Fluxo e regras` | planejada |
| F1-T015 | Executar regressão do consumidor e comprovar bloqueio de ativação externa | 3 | Cinco cenários passam e nenhum endpoint/credencial é ativado sem B1-INT-01 | `## TDD da SPEC`; `## Handoff e operação` | planejada |

## Emendas

| Data | Origem do sinal | Micro-spec/task | Motivo |
|---|---|---|---|
| | | | |
