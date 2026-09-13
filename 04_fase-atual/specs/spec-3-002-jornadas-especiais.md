# SPEC-3-002 — Jornadas especiais no registro canônico

**Fase:** 3
**Status:** bloqueada por SPEC-3-001 e parâmetros operacionais
**Dono:** Atendimento/Gestão
**Origem (fontes internas da consultoria — não acompanham este pacote):** RQ-002, RQ-008, RQ-009, RQ-010, RQ-011; DH-003/004/006; G2/G4
**Degrau:** dependência existente — estender o template canônico, sem cadastros paralelos.

## Contexto e decisões fechadas

- O núcleo cliente→oportunidade→proposta→pedido existe.
- Degustação, evento, revendedor e bem-nascido são variantes do mesmo pedido.
- Bem-nascido usa `Previsão`; aviso nunca libera produção automaticamente.
- Regras não aprovadas ficam manuais e geram pendência.
- **Bloqueios:** SPEC-3-001 aceita; política de urgência/SLA; regra de revendedor; capacidade/limite de degustação; responsável por cada jornada. A matriz de campos é produzida e aceita na F3-T004 antes da configuração produtiva.

## Resultado observável

Um caso de cada jornada percorre o mesmo registro canônico, mostra apenas campos aplicáveis, preserva origem/versão e termina em próximo estado ou pendência nomeada, sem cálculo ou liberação inventados.

## Limites e dependências

- Inclui campos condicionais, estados, pendências e evidências das quatro jornadas.
- Fora: produção automática, plantão prometido, estoque em tempo real, integração externa nova.
- Entradas: matriz de campos e políticas aprovadas.
- Saídas: quatro fixtures, configuração, roteiro e aceite do Atendimento.
- Rollback: inativar variante/configuração; não apagar pedido/histórico.

## Regras

| ID | Condição | Resultado | Exceção |
|---|---|---|---|
| RN-3-101 | degustação | 4 unidades cortesia; frete só por política vigente | capacidade/frete ausente → pendência |
| RN-3-102 | evento | data, quantidade, local e personalização mínimos | falta → Aguardando definição |
| RN-3-103 | revendedor | pedido separado por data | vencimento só se política aprovada |
| RN-3-104 | bem-nascido | Previsão + aviso + confirmação | fora do SLA/capacidade → Ocorrência |
| RN-3-105 | configuração de variantes | somente Administrador/Gestão altera; Atendimento usa | toda alteração gera auditoria append-only |

## Fluxo e recuperação

1. Selecionar tipo; 2. carregar campos condicionais; 3. validar mínimos; 4. gerar pendência ou avanço; 5. preservar origem e histórico. Alteração de tipo cria versão; não apaga valores anteriores.

## Instruções Ethos

Ler SPEC-3-001 aceita e matriz de campos. Alterar apenas modelo/template/UI das variantes. Parar diante de regra sem fonte. Não liberar produção. Estado válido: núcleo F2 permanece funcional.

## Critérios de aceite

- [ ] **CA-3-009:** quatro jornadas reutilizam o mesmo cliente/oportunidade/pedido.
- [ ] **CA-3-010:** cada tipo exibe somente campos aplicáveis e mínimos por transição.
- [ ] **CA-3-011:** degustação preserva cortesia e bloqueia frete/capacidade indefinidos.
- [ ] **CA-3-012:** revendedor cria um pedido por data sem duplicidade.
- [ ] **CA-3-013:** bem-nascido registra Previsão, aviso, confirmação, responsável e próximo passo sem produção automática.
- [ ] **CA-3-014:** campo/regra ausente cria pendência e histórico; não desaparece nem avança silenciosamente.
- [ ] **CA-3-031:** somente Administrador/Gestão configura variantes e mínimos; tentativa indevida é negada e auditada.

## TDD

| Etapa | Prova | Ação | Esperado | Evidência |
|---|---|---|---|---|
| RED | quatro fixtures antes da configuração | executar roteiro | campos/regras ausentes detectados | log |
| GREEN | uma fixture por tipo | criar/alterar/consultar | 6 CAs passam | recibo |
| REGRESSÃO | trocar tipo, repetir data, aviso fora de SLA | executar bordas | versão/pendência/ocorrência | capturas |

## Tasks vinculadas

| ID | Task | Dono | SPEC | Critério | Recorte | Evidência | Pré-condições | Status |
|---|---|---|---|---|---|---|---|---|
| F3-T004 | Configurar variantes e mínimos das quatro jornadas | Atendimento/Gestão | 3-002 | CA-3-009–014/031 | RED/GREEN | matriz + fixtures | F3-T003; parâmetros aprovados | Bloqueada |
| F3-T005 | Provar bordas e aceitar jornadas especiais | Champion | 3-002 | CA-3-009–014/031 | REGRESSÃO | roteiro + aceite | F3-T004 aceita | Bloqueada |

## Emendas

| Data | Origem | Micro-spec/task | Motivo |
|---|---|---|---|
| | | | |
