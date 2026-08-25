# Changelog — Projeto Mara Cristina Amaral Santos - ME

> Registro de tudo que acontece no projeto, em ordem cronológica inversa (mais recente no topo).
> Formato: `- AAAA-MM-DD · [quem] · o que aconteceu`
> **Dúvidas para o consultor** entram como: `- AAAA-MM-DD · [quem] · DÚVIDA: …` — ele responde
> na próxima sincronização.

## Registro

- 2026-08-25 · ETHOS (Bia) · DEBUG F1-T002: nova reprodução confirmou login OK e campos condicionais funcionando no preview; Casamento / Noiva mostra Nome dos Noivos e Eventos sociais mostra seus campos próprios. Versão 0.0.10; QA completo OK; devolvida ao teste humano.
- 2026-08-25 · ETHOS (Bia) · DEBUG F1-T002: campo Nome dos Noivos permanecia fixo → causa confirmada no formulário antigo → UI condicional implementada na versão 0.0.10 e migração 0005 aplicada; QA automático OK, mas nova sessão de navegador não autenticou de forma consistente; task permanece em correção.
- 2026-08-25 · ETHOS (Bia) · DEBUG F1-T002: login no preview permanecia em `/login` com 400 `Failed to authenticate` → contas de homologação não estavam válidas/criadas de forma garantida → migração 0004 criada com `setPassword` e criação idempotente; QA completo OK e login de Fernanda verificado no navegador, abrindo o dashboard.
- 2026-08-25 · ETHOS (Bia) · F1-T002 implementada no Skip: telefone principal obrigatório, segmentos revisados, estados Novo/Diagnosticando/Aguardando dados, cadastro de Cerimonialista, grupos parceiros simples ou compostos, empresas/CNPJs, unidades/endereço, contatos, vínculo contato-unidade e eventos. Migração 0002 aplicada; versão 0.0.7; QA completo OK; aguardando teste humano.
- 2026-08-25 · Fernanda · Esclareceu que Casa do Pão de Queijo e Bisutti são exemplos de grupos parceiros/revendedores: cada grupo pode ter várias empresas, CNPJs, unidades e endereços; um ou vários contatos podem solicitar pedidos. O total deve ser consolidado por grupo e detalhado por empresa, unidade e contato.
- 2026-08-25 · ETHOS (Bia) · Revisão atualizada em `06_notas/revisao-escopo-clientes-intermediados.md` para tratar Revenda/Parceiros como Grupo Parceiro.
- 2026-08-25 · Fernanda · Decisões da revisão de escopo aprovadas: entidade Cerimonialista; empresa com múltiplos contatos; parceiros com estrutura opcional; caso Casa do Pão de Queijo com múltiplos endereços/CNPJs e vínculo por contato; segmentos definidos; Outros com tipo e descrição; oportunidade vira Pedido Reserva após aprovação do orçamento e envio dos dados de fechamento PF/PJ.
- 2026-08-25 · ETHOS (Bia) · Revisão de escopo registrada em `06_notas/revisao-escopo-clientes-intermediados.md`: cliente direto e cliente intermediado por cerimonialista; cerimonialista com empresa e múltiplos contatos; telefone principal obrigatório; segmentos definidos; campos condicionais por evento. Implementação preservada até validação das decisões pendentes.
- 2026-08-25 · Fernanda · Task F1-T001 concluída: superfície de homologação, dicionário baseado na documentação API do GestãoClick, matriz inicial de usuários e declaração de não-escrita em produção registrados; migração Skip aplicada com QA completo e teste humano aprovado.
- 2026-08-25 · ETHOS (Bia) · Migração 0001 aplicada com sucesso: 6 coleções (clientes, participantes, oportunidades, pendencias, historico_eventos, dados_entrega) + 3 usuários seed (Fernanda, Mara, Anie). Versão 0.0.2, QA completo OK. Preview: https://nexus-emilia-49529--preview.goskip.app
- 2026-08-25 · ETHOS (Bia) · F1-T001 autorizada por Fernanda; leitura do projeto Skip 52694 confirmou superfície de preview não publicada, mas apenas a coleção `users` existente. Recibo criado em `05_entregas/F1-T001-recibo-homologacao.md`; B1-REG-01 permanece bloqueado por falta de identificadores técnicos dos campos e estados do pedido no tenant ERP.
- 2026-08-25 · ETHOS (Bia) · Plugin Adapta Cliente configurado: `.adapta-cliente/estado-atual.md` criado via MCP GitHub; etapa `sem_task`, champion Fernanda (CEO); projeto Nexus Emilia (Skip id 52694) vinculado; leitura e escrita no repositório confirmadas via MCP.
- 2026-08-25 · Consultoria Adapta Native · Pasta operacional criada a partir do handoff selado; Fase 1 liberada localmente, sem repositório remoto ou publicação.
- 2026-08-25 · Consultoria Adapta Native · Incluídas cinco SPECs e 15 tasks da Fase 1; execução ainda não iniciada.
