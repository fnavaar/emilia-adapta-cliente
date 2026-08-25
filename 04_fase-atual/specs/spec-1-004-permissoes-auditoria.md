# SPEC-1-004 — Permissões, RLS e auditoria do registro

**Fase:** 1  
**Status:** planejada  
**Dono:** Gestão/administrador da plataforma, com revisão do consultor técnico  
**Origem no escopo:** RQ-001, RQ-007, RQ-013; AC-004, AC-010, AC-014; DH-002, DH-006  
**Degrau da solução:** recurso nativo da plataforma — usar RLS/perfis e auditoria nativos do workspace/ERP; construir regra adicional somente se a plataforma não cobrir o aceite.

## Contexto e decisões fechadas

- **Estado atual:** atendimento, administração, financeiro e produção operam em sistemas e documentos com handoffs; permissões, histórico e responsável não foram demonstrados de forma única. Fonte: 03-Projeto/01-Escopo.md, seções 3.1, 7 e 8.7; 02-Reuniao/Kickoff Call/02-Ata_reuniao.md, linhas 16–25.
- **Estado desejado:** cada registro tem ator, timestamp, origem e histórico; usuários só alteram campos/estados da sua alçada; tentativa negada é auditada.
- **Decisões já fechadas:** líder de produção só será necessário na fase 3; nesta fase nenhum perfil pode liberar produção; RLS e auditoria são requisitos do sistema.
- **Bloqueios:** B1-SEC-01 — confirmar matriz de usuários/papéis e capacidade real de RLS/auditoria na plataforma. Se RLS nativo não existir, parar; não simular segurança apenas na interface.

## Resultado observável

Na demonstração, usuários de teste com perfis Atendimento, Gestão, Financeiro, Produção e Cliente/Externo acessam somente os campos/ações autorizados. Uma alteração permitida e uma tentativa negada aparecem no histórico com ator, data/hora, objeto, ação, campos afetados, origem e motivo.

## Limites e dependências

- **Inclui:** perfis, escopo de leitura/escrita, RLS por objeto/ação, auditoria de criação/alteração/estado, negação auditada e minimização de dados.
- **Fora de escopo:** SSO, gestão de identidade corporativa, retenção legal, anonimização automática, permissão de conector externo e liberação de produção.
- **Entradas e pré-condições:** entidades das SPECs 1-001/1-002/1-003; lista de perfis; usuários de teste anonimizados; B1-SEC-01.
- **Saídas/artefatos:** matriz de permissões, configuração, log de auditoria e relatório de testes positivos/negativos.
- **Dependências e responsáveis:** gestão define alçadas; consultor técnico configura/revisa; administradora da plataforma fornece acesso.
- **Atores e permissões mínimas:** ver matriz abaixo; nenhum perfil recebe administração global por conveniência.
- **Superfícies/arquivos/configurações afetadas:** RLS/perfis e auditoria do workspace/ERP; não alterar permissões da conta pessoal ou de produção sem autorização.
- **Risco e plano B:** exposição ou alteração indevida; plano B é bloquear a ação até RLS/auditoria serem comprovados, não abrir acesso amplo.
- **Rollback ou reversão:** restaurar matriz anterior, revogar perfil de teste e preservar eventos de auditoria; não apagar log.

### Matriz mínima

| Perfil | Cliente/briefing | Catálogo | Auditoria | Estados protegidos |
|---|---|---|---|---|
| Atendimento | criar/editar dentro do pedido; não mesclar | consultar/selecionar | consultar próprio pedido | não liberar produção |
| Gestão | consultar/editar e decidir duplicidade | criar/editar/aprovar | consultar tudo | aprovar configurações |
| Financeiro | consultar identidade e pedido | leitura | consultar | não alterar briefing comercial |
| Produção | consultar instruções aprovadas | consultar | consultar registros necessários | alteração de fila somente Fase 3 |
| Cliente/externo | fornecer dados no canal autorizado | consultar opções publicadas quando houver | não consultar | não alterar estado interno |

## Dados e integrações

| Origem/destino | Fonte de verdade | Campos/contrato | Autenticação/permissão | Timeout/retry/idempotência | Tratamento de erro |
|---|---|---|---|---|---|
| Usuário → objeto | Matriz de alçada aprovada | actor_id, role, object_id, action, field_key, old_value_hash, new_value_hash, source, reason, occurred_at | Sessão/identidade nativa; negar por padrão | Ação repetida deve manter auditoria distinta com ID de evento | Negação visível ao usuário e auditada |
| Registro → auditoria | Log append-only da plataforma | Evento de criação, alteração, estado, permissão negada, vínculo e rollback | Leitura restrita a gestão/administrador autorizado | ID único por evento; sem edição pelo perfil operacional | Falha ao auditar bloqueia alteração protegida |

| Regra de negócio | Condição | Ação/resultado | Exceção | Fonte |
|---|---|---|---|---|
| RN-1-401 — Negar por padrão | Ação fora da matriz | Não executar e registrar tentativa | Gestão pode conceder perfil explícito | RQ-013 |
| RN-1-402 — Auditoria mínima | Alteração de dado/estado/permissão | Registrar ator, objeto, ação, data, fonte e motivo | Dado sensível não deve aparecer em texto aberto do log | DH-002; privacidade por construção |
| RN-1-403 — Sem escalada lateral | Usuário tenta acessar outro papel/tenant | Negar sem revelar dados | Administrador autorizado revisa | B1-SEC-01 |

## Fluxo e regras

1. Criar usuários de teste anonimizados em cada perfil.
2. Aplicar matriz mínima de leitura/escrita.
3. Executar ações permitidas e negadas em Cliente, Briefing e Catálogo.
4. Conferir auditoria de cada ação e ausência de valor sensível desnecessário.
5. Revogar usuário de teste e repetir tentativa.

| Cenário | Dado/condição | Resultado esperado | Caminho de erro/recuperação |
|---|---|---|---|
| Permitido | Atendimento edita telefone do próprio pedido | Alteração concluída e auditada | — |
| Negado | Atendimento tenta aprovar catálogo | Ação negada, sem alteração e com evento | Gestão revisa matriz |
| Negado | Produção tenta alterar cliente | Sem acesso ao campo | Registrar tentativa |
| Falha | Auditoria indisponível | Alteração protegida não ocorre | Ocorrência e bloqueio |

## Instruções de execução para o Ethos

1. **Ler antes de alterar:** esta SPEC, SPEC-1-001/002/003 e 03-Projeto/02-Escopo-Definitivo.md, seções 2, 4.1 e 9.
2. **Alterar somente:** perfis, RLS, auditoria e usuários de teste no ambiente autorizado.
3. **Não alterar:** permissões pessoais, produção, conectores, credenciais ou retenção fora da matriz.
4. **Executar nesta ordem:** confirmar B1-SEC-01 → criar perfis de teste → aplicar matriz → testar positivo/negativo → conferir log → revogar testes.
5. **Parar e pedir validação quando:** RLS não estiver disponível, auditoria puder ser editada, ou houver dado pessoal exposto no log.
6. **Estado válido ao parar:** qualquer falha mantém ação protegida bloqueada; matriz e evidências ficam legíveis.

## Checklist de execução

- [ ] B1-SEC-01 resolvido com capacidade da plataforma e matriz aprovada.
- [ ] Perfis de teste anonimizados criados e isolados.
- [ ] Ações permitidas e negadas exercitadas por perfil.
- [ ] Auditoria registra eventos sem dado pessoal desnecessário.
- [ ] Revogação/rollback de usuário de teste comprovados.

## Critérios de aceite

- [ ] **CA-1-301:** Cada perfil da matriz acessa somente objetos/campos/ações autorizados.
- [ ] **CA-1-302:** Tentativa negada não altera dados e gera evento de auditoria.
- [ ] **CA-1-303:** Alteração permitida registra ator, objeto, ação, timestamp, origem e motivo.
- [ ] **CA-1-304:** Falha de auditoria bloqueia alteração protegida.
- [ ] **CA-1-305:** Nenhum teste expõe segredo ou dado pessoal desnecessário e o usuário de teste é revogado ao final.

## TDD da SPEC

| Etapa | Prova | Comando/ação | Resultado esperado | Evidência |
|---|---|---|---|---|
| RED | Executar tentativa de edição com perfil sem permissão antes de RLS | Abrir objeto e tentar salvar | O sistema permite ou não registra antes da configuração, evidenciando o risco | Log/captura inicial |
| GREEN | Aplicar matriz e repetir ações por cinco perfis | Executar roteiro positivo/negativo | CA-1-301 a CA-1-305 passam | Export de auditoria e capturas |
| REFACTOR/REGRESSÃO | Revogar perfil e simular auditoria indisponível | Repetir acesso e alteração | Acesso revogado falha; alteração protegida não ocorre sem auditoria | Relatório de segurança |

**Dados/fixtures:** cinco usuários fictícios por perfil, três objetos fictícios e FIX-1-301 ação permitida, FIX-1-302 ação negada, FIX-1-303 falha de auditoria.
**Caminhos de erro obrigatórios:** perfil ausente, objeto de outro usuário, auditoria indisponível, tentativa de escalada e revogação.
**Evidência exigida:** matriz aprovada, capturas, export/log de auditoria e registro de revogação.

## Handoff e operação

- **Como demonstrar:** alternar perfis de teste, executar uma alteração permitida e uma negada e abrir o log.
- **Como operar depois:** administrador mantém perfis; gestão aprova mudança de alçada.
- **Como monitorar:** eventos de negação, falhas de auditoria e alterações administrativas.
- **Pendência conhecida:** B1-SEC-01; sem RLS/auditoria comprovados, não liberar acesso real.

## Tasks vinculadas

| ID | Task | Leva | Critério binário | Subseção da SPEC | Status |
|---|---|---|---|---|---|
| F1-T010 | Confirmar matriz de usuários e capacidade real de RLS/auditoria | 1 | Matriz e veredito de capacidade registrados; sem capacidade, acesso real fica bloqueado | `## Contexto e decisões fechadas`; `### Matriz mínima` | liberada |
| F1-T011 | Configurar perfis, RLS, auditoria e bloqueio seguro da alteração protegida | 2 | Acesso é restrito e alteração protegida falha sem auditoria | `### Matriz mínima`; `## Fluxo e regras` | planejada |
| F1-T012 | Executar regressão de permissões, revogação e minimização de dados | 3 | Negação, auditoria, revogação e minimização passam no roteiro | `## Critérios de aceite`; `## TDD da SPEC` | planejada |

## Emendas

| Data | Origem do sinal | Micro-spec/task | Motivo |
|---|---|---|---|
| | | | |
