# Roteiro de aceite — SPEC-3-002 (Jornadas especiais)

**Task:** F3-T005 · **Data:** 2026-09-14 · **Para:** validação da Champion (Fernanda)

## Como testar (Preview: nexus-emilia-49529--preview.goskip.app, v0.0.126)

### Roteiro A — Campos condicionais e modalidade (CA-3-009/010)

1. Nova Oportunidade → escolha um cliente
2. Tipo de Evento: confira que **não existe "Degustação"** na lista
3. Marque **"Cliente solicitou degustação?"** → aparecem: Modalidade de entrega (seletor: **Presencial (showroom)** padrão, Entrega (envio), Retirada), Referência/paleta, Bem-casados adicionais, Valor do frete, Parceiro de origem
4. Troque o Tipo de Evento para **Bem-nascido** → os campos de degustação somem; aparecem: Data estimada do parto, Maternidade, Tipo de parto, Responsável, Aviso enviado em, Confirmação recebida em + nota de que o aviso nunca libera produção

### Roteiro B — Borda: troca de tipo no meio do caminho (CA-3-014)

1. Crie uma oportunidade **Casamento** com nome dos noivos, data, quantidade e local
2. Edite-a e troque o tipo para **Bem-nascido**
3. Confira: os campos do casamento **continuam preenchidos** (nada apagado)
4. Em Auditoria & Histórico, veja o registro: "Tipo de evento alterado de casamento para bem_nascido; valores anteriores preservados."

### Roteiro C — Borda: data repetida do revendedor (CA-3-012)

1. Crie uma oportunidade **Revendedor** com uma data de entrega e a data do pedido → salva e avança sem pendência
2. Edite e coloque a **mesma data duas vezes** → ao avançar, o pedido volta a "aguardando dados" e surge a pendência "Data de entrega duplicada" (visível no card da Visão Geral)

### Roteiro D — Borda: urgência do bem-nascido (CA-3-013)

1. Crie um **Bem-nascido** com previsão de parto para os próximos dias, **sem** preencher aviso/confirmação
2. Ao avançar: pendências "Aviso do bem-nascido ainda não registrado" e "Confirmação ainda não registrada" são criadas
3. Confira que **nenhum pedido de produção** foi criado automaticamente

## Provas já executadas pela assistente (instância real, 14/09)

| Borda | Prova | Resultado |
|---|---|---|
| Troca de tipo | casamento→bem_nascido: nome_noivos, data_evento e qtd preservados; histórico registra a troca (origem troca_tipo) | PASS |
| Data repetida | revendedor com data única avança; com data duplicada → pendência RN-3-103 | PASS |
| Urgência bem-nascido | previsão em 3 dias sem aviso → 2 pendências nomeadas; 0 pedidos de produção criados | PASS |
| Regressão geral | suíte 24/24 invariantes; QA Skip 0.0.121–0.0.126 PASS | PASS |

## Aceite

Após executar os roteiros (ou revisar as provas acima), confirme: **"testei e funcionou"** ou aponte o que não funcionou.
