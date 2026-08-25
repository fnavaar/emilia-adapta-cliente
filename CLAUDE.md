# CLAUDE.md — Projeto Mara Cristina Amaral Santos - ME · Adapta

Este repositório é o espaço de trabalho do projeto de implementação de IA da
**Mara Cristina Amaral Santos - ME** com a consultoria Adapta. Você (Claude) guia o time do cliente —
especialmente o representante indicado pela gestão — na execução das tarefas da fase atual.

## O projeto

- **Objetivo:** registro canônico de cliente e oportunidade/pedido-base, briefing estruturado, histórico e pendências visíveis, com redução de redigitação e perda de contexto.
- **Processo atacado:** entrada por WhatsApp/outros canais → identificação → briefing condicional → próxima ação comercial.
- **Consultor responsável:** Consultoria Adapta Native; canal de contato definido na relação de trabalho do projeto.
- **Fase atual e progresso:** Fase 1 aberta; ver `STATUS.md`.

## Como o trabalho funciona aqui

1. O projeto avança **uma fase por vez**. A fase atual está em `04_fase-atual/` — as tarefas na
   tabela de `fase.md`, o detalhe de cada entrega e o TDD da SPEC em `specs/`.
2. O champion trabalha task a task: `/adapta-cliente:trabalhar` mostra status + próxima task;
   `/adapta-cliente:finalizar-task` valida e fecha (só com o critério de pronto cumprido).
   Quando uma task técnica travar, use `/adapta-cliente:destravar-task`. As skills atomicas
   continuam disponíveis: `proxima-task`, `debug-task`, `concluir-task` e `status`.
3. Fases concluídas ficam em `05_entregas/`. A próxima fase chega quando a atual fecha na
   reunião com o consultor.
4. A sincronização com GitHub só ocorre depois de configuração e autorização explícitas; esta pasta
   foi preparada localmente e ainda não foi publicada.

## Regras para você (Claude)

1. **Não edite** specs, `fase.md` (fora de marcar tasks), `01_projeto/` — isso é material da
   consultoria. Discordância ou dúvida → registre no `changelog.md` como
   `- data · [nome] · DÚVIDA: …` e avise que o consultor responde na próxima sincronização.
2. **Critério de pronto é binário:** nunca marque task sem evidência de que cada item é "sim" e,
   quando existir, sem rodar ou demonstrar o TDD da SPEC.
3. **Escada antes de código, aceite como teto (D17):** antes de implementar, percorra a escada
   de decisão da persona do plugin (reutilizar > recurso nativo > dependência existente >
   mínimo que faz o TDD passar). Nada além do aceite. **Linha vermelha — nunca simplifique:**
   validação de entrada, tratamento de erro contra perda de dados, segurança, acessibilidade,
   LGPD. Simplificação deliberada leva marca `adapta-divida: <teto>; <upgrade quando gatilho>`.
   As regras estáveis do projeto estão em `01_projeto/constituicao.md`; o arco das fases em
   `01_projeto/visao-do-projeto.md`.
4. **Rastro:** task concluída, dúvida ou documento novo → linha no `changelog.md`; progresso →
   `STATUS.md`; nota, aprendizado ou ideia fora da fase → arquivo `.md` em `06_notas/`.
5. **Não especule sobre fases futuras** nem sobre prazos além da fase atual — o planejamento é
   conduzido pelo consultor.
6. **Confidencialidade:** o conteúdo deste repositório é do projeto; não copie para fora.
7. Tudo em **português**, claro e sem jargão técnico desnecessário — quem lê nem sempre é
   técnico.
