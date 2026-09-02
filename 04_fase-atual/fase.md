# Fase 2 — Composição, proposta, aprovação, conversão e fila financeira

**Estado:** liberada para execução sequencial em homologação. Integração externa, conciliação bancária automática e liberação de produção permanecem fora desta fase.

## Levas

- **Leva 1 — decisões e contrato:** tarefas independentes para fechar política, aceite, privacidade e equivalência de estado.
- **Leva 2 — construção:** inicia somente após as decisões B2 e o estado válido demonstrado.
- **Leva 3 — prova e handoff:** cobre bordas, idempotência, RLS e regressão.
- Uma task por sessão. Qualquer mudança de preço, regra, alçada, prazo, retenção ou aceite retorna ao consultor.

## Tasks

| ID | Task | Dono | SPEC | Critério binário | Pré-condições | Ponto de parada | Status | Leva |
|---|---|---|---|---|---|---|---|---|
| F2-T001 | Aprovar tabela de preços, moeda e vigência | Gestão + Financeiro | 2-001 | B2-POL-01 tem fonte, versão, vigência e aprovador | Catálogo vigente | Sem tabela, não calcular total | liberada | 1 |
| F2-T002 | Aprovar frete, desconto, adicionais, validade, termos e alçadas | Gestão + Financeiro | 2-001 | B2-POL-02/03 definidos ou bloqueios explícitos | F2-T001 para cálculo | Não inventar fórmula | liberada | 1 |
| F2-T003 | Fechar aceite, vencimento, conferência e estados | Gestão + Financeiro + Atendimento | 2-002 | B2-APR-01, B2-FIN-01 e B2-EST-01 têm transições/responsáveis | Gestão disponível | Não tratar resposta como aprovação | liberada | 1 |
| F2-T004 | Definir retenção, formato e acesso de comprovantes | Gestão + Financeiro + Técnico | 2-002 | B2-FIN-02 especifica retenção, acesso e formatos | Usuários de homologação | Não receber arquivo real sem regra | liberada | 1 |
| F2-T005 | Modelar proposta, itens, políticas, snapshots e auditoria | Administrador | 2-001 | Versões/snapshots persistem; política inválida não aplica | F2-T001/002 | Sem conector externo ou estoque | planejada | 2 |
| F2-T006 | Construir montador de cumulativos, alternativas e revisão | Atendimento + Administrador | 2-001 | Alternativas não somam; catálogo histórico legível | F2-T005 | Política ausente impede emissão | planejada | 2 |
| F2-T007 | Configurar estados, resposta e conversão idempotente | Administrador | 2-002 | Aprovação cria um pedido; alteração/recusa/expiração não convertem | F2-T003/F2-T006 | Não liberar produção | planejada | 2 |
| F2-T008 | Construir comprovante e fila financeira | Financeiro + Administrador | 2-002 | Comprovante não confirma; divergência cria pendência atribuída | F2-T004/F2-T007 | Sem política, não receber dado real | planejada | 2 |
| F2-T009 | Executar regressão de proposta, política e versões | Técnico + Atendimento | 2-001 | Snapshots resistem a mudança; exceção sem alçada bloqueia | F2-T005/F2-T006 | Falha retorna a debug | planejada | 3 |
| F2-T010 | Executar regressão comercial/financeira e provar limites | Técnico + Financeiro | 2-002 | Idempotência/RLS passam; sem ação externa ou produção | F2-T007/F2-T008 | B1-INT-01 permanece | planejada | 3 |

## Handoff

Encerrar somente com recibos das 10 tasks, provas CA-2-001 a CA-2-005 e CA-2-101 a CA-2-106, todos os B2 explicitados e B1-INT-01 preservado.
