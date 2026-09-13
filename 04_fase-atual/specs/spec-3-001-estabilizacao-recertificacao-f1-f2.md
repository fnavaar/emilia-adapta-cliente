# SPEC-3-001 — Estabilização e recertificação da base F1–F2

**Fase:** 3
**Status:** planejada — bloqueante para todas as demais SPECs da fase
**Dono:** responsável técnico, com aceite da Champion Fernanda
**Origem no escopo:** RQ-005, RQ-006, RQ-013, RQ-014; G1, G2, G6; parecer F2→F3 de 12/09/2026 (fonte interna da consultoria — não acompanha este pacote)
**Degrau da solução:** dependência existente — corrigir o sistema Nexus Emília já construído, sem reescrever a aplicação.

## Contexto e decisões fechadas

- **Estado atual:** o repositório técnico `ebc06162-ship-it/nexus-emilia-o0ismc251` está em `d747a2c`; a F2 foi encerrada documentalmente, mas auditoria encontrou colisão de migrations `0036`, autoelevação de papel, credenciais em migrations, ausência de testes reais, dependências vulneráveis e produção defasada.
- **Estado desejado:** branch corretiva baseada em `d747a2c`, migrations 0036–0039 únicas, RLS fail-closed, credenciais por secrets, teste real, dependências limpas e recertificação comportamental em Preview.
- **Decisões fechadas:** correções descritas nesta SPEC devem ser implementadas diretamente no repo técnico; cinco secrets foram declarados configurados e devem ser confirmados apenas por metadado na F3-T002; cancelamento até 100 unidades = reembolso integral quando faltarem pelo menos 7 dias; depois, somente Administrador com retenção de 20%.
- **Bloqueios:** B3-ENV-01 — confirmar se Preview e produção compartilham backend. Se compartilharem, registrar aceite explícito do impacto de RLS/migrations na instância antes de F3-T002; B3-SKIP-01 — projeto Skip acessível; B3-SEC-01 — cinco secrets confirmados por metadado. Sem os três, não aplicar migrations. Não publicar frontend em produção nesta SPEC.

## Resultado observável

O plugin consegue abrir o sistema técnico em `07_sistemas/nexus-emilia-o0ismc251`, implementar as correções desta SPEC, rodar provas e demonstrar no Preview que usuários não elevam o próprio papel, contas usam credenciais rotacionadas, tokens revogados não acessam dados, propostas convertidas não são recusadas/devolvidas, cancelamentos obedecem à política e a F2 continua sem regressão.

## Limites e dependências

- **Inclui:** submódulo/clone técnico, correções equivalentes ao checkpoint técnico local `f0422d0`, migrations 0037–0039, RLS, rotação por secrets, cancelamento, testes, dependências e recibo de recertificação.
- **Fora de escopo:** funcionalidades novas de produção/expedição; publicação produtiva; revelar valores de secrets; reescrever histórico Git.
- **Entradas:** repo técnico público; contrato desta SPEC; projeto Skip correto; cinco secrets por nome; contas de teste autorizadas.
- **Saídas:** branch/commit técnico; QA; relatório P1–P12; teste humano; versão candidata somente em Preview.
- **Atores:** Administrador, Gestão, Atendimento, Financeiro e Produção em contas de teste; só Administrador aplica/autoriza retenção.
- **Superfícies:** `07_sistemas/...`, `pocketbase/migrations`, `pocketbase/hooks`, `tests`, `package.json`, Preview Skip.
- **Plano B:** se submódulo não existir, clonar o repo no caminho canônico e registrar o commit; se Skip não estiver acessível, concluir apenas a preparação Git e manter F3-T002 bloqueada.
- **Rollback:** não fazer down destrutivo; reverter branch/commit antes do apply. Depois do apply, corrigir por migration aditiva.

## Dados e integrações

| Origem/destino | Fonte de verdade | Contrato | Permissão | Idempotência/erro |
|---|---|---|---|---|
| SPEC → repo técnico | esta SPEC | base `d747a2c`; migrations 0037–0039 e testes equivalentes | escrita Git autorizada | revisar diff; não duplicar correção já presente |
| repo técnico → Skip Preview | migrations 0037–0039 | ordinais únicos; apply aditivo | conta técnica do cliente | falha mantém última migration válida e gera recibo |
| Skip secrets → usuários | nomes `EMILIA_*_PASSWORD` | nunca logar valor | Administrador | segredo ausente desativa somente a conta correspondente |

| Regra | Condição | Resultado | Exceção | Fonte |
|---|---|---|---|---|
| RN-3-001 | update de usuário | somente Administrador/Gestão | nenhuma autoelevação | BL-02 |
| RN-3-002 | conta conhecida | rotacionar por secret; sem secret, desativar | não criar senha em Git | BL-03 |
| RN-3-003 | pedido ≤100 e ≥7 dias | reembolso integral | data/quantidade/total ausente: recusar | decisão Navaar 13/09/2026 |
| RN-3-004 | fora da janela ou >100 | Administrador + retenção 20% | demais perfis: 403 | decisão Navaar 13/09/2026 |
| RN-3-005 | pedido já cancelado | retornar mesmo resultado | sem segundo evento financeiro | idempotência |

## Fluxo e recuperação

1. Verificar base remota e materializar `07_sistemas/nexus-emilia-o0ismc251`.
2. Implementar migrations 0037–0039, hooks, testes e dependências descritos nesta SPEC; revisar diff e scan de segredo.
3. Rodar install congelado, testes, typecheck, lint, formatação, build e audit.
4. Confirmar por metadado os cinco secrets, sem ler valores.
5. Confirmar B3-ENV-01: backend separado, ou aceite explícito do efeito compartilhado. Aplicar migrations na instância autorizada e confirmar 0037–0039 como aplicadas.
6. Executar P1–P12, registrar evidências e pedir teste humano.
7. Só após aceite, marcar SPEC aceita; produção continua separada.

| Cenário | Condição | Resultado esperado | Recuperação |
|---|---|---|---|
| principal | patch + secrets + Preview acessível | QA e P1–P12 passam | gerar recibo e teste humano |
| segredo ausente | metadado não encontrado | não aplicar 0038; task bloqueada | responsável configura secret |
| migration falha | apply parcial | não rodar down destrutivo | migration aditiva de correção |
| acesso Skip ausente | Project not found | código preparado, backend intacto | registrar dono/acesso e parar |

## Instruções para o Ethos

1. **Ler antes:** esta SPEC, patch versionado, `STATUS.md`, repo técnico e recibos F2-T009/T010.
2. **Alterar somente:** arquivos do patch e evidências/estado da task atual.
3. **Não alterar:** produção, valores de secrets, SPECs, regras de negócio ou fases futuras.
4. **Ordem:** F3-T001 → teste humano → F3-T002 → teste humano → F3-T003.
5. **Parar:** base divergente, secret ausente, Skip inacessível, migration já aplicada com conteúdo diferente ou teste de segurança falhar.
6. **Estado válido:** cada task deixa Git e Preview íntegros; nenhuma task libera a próxima sem aceite humano.

## Checklist

- [ ] Repo técnico no caminho canônico e base registrada.
- [ ] Correções implementadas sem segredo e diff revisado.
- [ ] Cinco secrets confirmados por nome.
- [ ] Migrations 39/39 únicas e aplicadas no Preview.
- [ ] P1–P12 e regressão F2 anexados.
- [ ] Teste humano aprovado.

## Critérios de aceite

- [ ] **CA-3-001:** ordinais 0001–0039 são únicos e as migrations 0037–0039 aplicam sem erro na instância autorizada e o estado final de RLS é exportado/conferido.
- [ ] **CA-3-002:** usuário não administrador não altera o próprio `papel`, `ativo` ou `verified`.
- [ ] **CA-3-003:** cinco contas usam secrets; a senha antiga não autentica e não existe no estado atual do repo.
- [ ] **CA-3-004:** usuário revogado com token vivo não lê/escreve coleções operacionais.
- [ ] **CA-3-005:** proposta aprovada/convertida recusa devolução/recusa incompatível e preserva pedido/auditoria.
- [ ] **CA-3-006:** cancelamento cumpre RN-3-003/004, é idempotente e falha fechado sem dados confiáveis.
- [ ] **CA-3-007:** a suíte de invariantes estáticas `pnpm test`, typecheck, lint, format, build e audit passam; nenhum teste-placeholder.
- [ ] **CA-3-008:** regressão dos 11 critérios da F2 passa no Preview com evidência e teste humano.
- [ ] **CA-3-029:** backend produção/homologação e refs são reconciliados sem publicação automática; qualquer efeito compartilhado tem aceite registrado.
- [ ] **CA-3-030:** alias obsoleto, manifesto e caminhos canônicos do handoff estão corrigidos e resselados.

## TDD da SPEC

| Etapa | Prova | Comando/ação | Esperado | Evidência |
|---|---|---|---|---|
| RED | base vulnerável | antes da implementação, script avulso verifica ordinais, senha literal e self-update em `d747a2c` | colisão 0036/senha/self-update detectados | log F3-T001 |
| GREEN | invariantes estáticas | `pnpm test && pnpm exec tsc -b && pnpm run lint && pnpm run format:check && pnpm run build && pnpm audit --prod` | exit 0; lint sem erros; audit limpo | recibo técnico |
| REGRESSÃO | comportamento Preview | P1–P12 + roteiro F2-T010 | todos passam, sem produção | relatório + aceite humano |

**Fixtures:** contas de teste por papel, proposta/pedido fictícios, total R$100, quantidades 100/101 e datas +6/+7 dias.
**Erros obrigatórios:** secret ausente, autoelevação, token revogado, proposta convertida, cancelamento sem data/total, quarto arquivo, upload inválido.
**Evidência:** logs sanitizados, migrations aplicadas, IDs fictícios, capturas e aceite humano.

## Provas P1–P12

1. P1 — autoelevação de papel é negada.
2. P2 — senha antiga não autentica; contas rotacionadas autenticam.
3. P3 — usuário revogado com token vivo é negado.
4. P4 — estado final de RLS é exportado e comparado à migration canônica.
5. P5 — Atendimento vê apenas pedidos próprios e Produção não lê financeiro.
6. P6 — conversão repetida reutiliza pedido e audita tentativa.
7. P7 — proposta aprovada/convertida não aceita recusa/devolução incompatível.
8. P8 — upload inválido, quarto arquivo, >10 MB e escrita direta são negados.
9. P9 — cancelamento prova 100/101 unidades, +6/+7 dias, alçada e idempotência.
10. P10 — suíte, typecheck, lint, format, build e audit passam.
11. P11 — topologia/refs de Preview e produção reconciliadas sem publicar.
12. P12 — handoff usa só `04_fase-atual`, manifesto fase 3 e hashes válidos.

## Handoff e operação

- Demonstrar o painel de regressão e quatro cancelamentos de fixture.
- Frontend de produção só recebe versão após novo gate externo; mudança em backend compartilhado exige B3-ENV-01.
- Monitorar login negado, migration failed e RLS denied.
- Pendências: acesso Skip e topologia produção/homologação precisam ser confirmados no ambiente do cliente.

## Tasks vinculadas

| ID | Task | Dono | SPEC | Critério | Recorte | Evidência | Pré-condições | Status |
|---|---|---|---|---|---|---|---|---|
| F3-T001 | Materializar repo técnico e implementar correções | Responsável técnico | 3-001 | CA-3-001/003/007 no código | RED/GREEN local, sem apply Skip | commit, logs e scan | repo Git acessível | Elegível |
| F3-T002 | Aplicar migrations e provar segurança na instância autorizada | Responsável técnico | 3-001 | CA-3-001–006/029 | P1–P7/P11 | migration ledger + provas | F3-T001 aceita; secrets; Skip | Bloqueada |
| F3-T003 | Regressão F2 e aceite humano da recertificação | Champion + responsável técnico | 3-001 | CA-3-007/008/030 | P8–P10/P12 + 11 CAs F2 | relatório e aceite | F3-T002 aceita | Bloqueada |

## Emendas

| Data | Origem | Micro-spec/task | Motivo |
|---|---|---|---|
| 2026-09-13 | auditoria F2 + decisão Navaar | SPEC-3-001 | correções entram como primeira onda bloqueante da F3 |
