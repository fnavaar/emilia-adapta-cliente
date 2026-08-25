# SPEC-1-003 — Catálogo inicial versionado de opções

**Fase:** 1  
**Status:** planejada  
**Dono:** Gestão, com leitura por atendimento e produção  
**Origem no escopo:** RQ-003, RQ-004; AC-003, AC-011; DH-004, DH-005  
**Degrau da solução:** construção mínima — estruturar somente opções e referências do catálogo a partir dos PDFs existentes; não substituir o ERP nem automatizar preço nesta fase.

## Contexto e decisões fechadas

- **Estado atual:** produtos, sabores, papéis, fitas, cores, tags e versões aparecem em PDFs, imagens e texto livre; atendimento consulta fontes fora do fluxo. Fonte: 03-Projeto/01-Escopo.md, seção 4.4; 02-Reuniao/Kickoff Call/02-Ata_reuniao.md, linhas 28–40.
- **Estado desejado:** atendimento seleciona uma opção identificada por código/label e vê documento, versão e estado da fonte; briefing e futura produção recebem a mesma representação canônica.
- **Decisões já fechadas:** composição estruturada; campos condicionais; regra observada não vira política; estoque em tempo real e bloqueio de opção ficam fora; preço não é calculado na Fase 1.
- **Bloqueios:** B1-CAT-01 — gestão deve confirmar quais arquivos são vigentes e aprovar a primeira lista de opções. Enquanto isso, itens importados ficam Rascunho e não podem ser usados para cálculo/publicação comercial.

## Resultado observável

Na demonstração, a gestão abre o catálogo, identifica um produto/sabor/papel/fita/cor por código e fonte, aprova um item de referência e a atendente seleciona esse item no briefing. O pedido armazena o código e a label canônica, não uma descrição livre divergente.

## Limites e dependências

- **Inclui:** entidades CatalogoItem, Categoria, Variante/Cor, referência visual, fonte, versão, estado de revisão e label operacional.
- **Fora de escopo:** preço vigente, desconto, frete, baixa de estoque, disponibilidade em tempo real, bloqueio de opção, nota fiscal e catálogo público.
- **Entradas e pré-condições:** TABELA DE PREÇO 2026 (DEFINITIVA).pdf, catálogos 2026/2026.1 e códigos existentes; decisão B1-CAT-01.
- **Saídas/artefatos:** catálogo em rascunho/aprovado, lista de itens, código/label, fonte/versionamento e fixture de seleção.
- **Dependências e responsáveis:** gestão aprova fontes e estado; atendimento revisa clareza; produção revisa label operacional.
- **Atores e permissões mínimas:** gestão cria/edita/aprova; atendimento consulta/seleciona; produção consulta; financeiro não altera.
- **Superfícies/arquivos/configurações afetadas:** catálogo da plataforma aprovada e vínculo do item ao template; PDFs permanecem históricos e não são sobrescritos.
- **Risco e plano B:** fonte duplicada ou item ambíguo; plano B é manter Rascunho, registrar conflito e usar descrição manual controlada com origem.
- **Rollback ou reversão:** retirar item do estado Aprovado para Rascunho/Inativo sem apagar histórico de seleção; nunca renomear código já usado sem alias.

## Dados e integrações

| Origem/destino | Fonte de verdade | Campos/contrato | Autenticação/permissão | Timeout/retry/idempotência | Tratamento de erro |
|---|---|---|---|---|---|
| PDF/imagem → catálogo | Arquivo escolhido por B1-CAT-01 | catalog_item_id, category, name, variant, color_code, display_label, source_document, source_version, source_locator, review_status, reviewed_by, reviewed_at | Gestão escreve; atendimento/produção leem | Importação manual idempotente por source_document + source_version + source_locator | Item sem fonte ou duplicado fica Rascunho |
| Catálogo → briefing | Catálogo aprovado | catalog_item_id, display_label, source_version, selected_at, selected_by | Atendimento seleciona; gestão pode inativar | Seleção repetida mantém o mesmo ID | Item inativo não pode ser selecionado novo; seleção antiga permanece histórica |

| Regra de negócio | Condição | Ação/resultado | Exceção | Fonte |
|---|---|---|---|---|
| RN-1-301 — Fonte obrigatória | Item criado | Exigir documento, versão e localização | Ausência deixa Rascunho | DH-005; AC-003 |
| RN-1-302 — Código canônico | Item aprovado | Usar código/label no briefing | Conflito de código bloqueia aprovação | RQ-003; AC-011 |
| RN-1-303 — Sem política implícita | Item contém preço ou regra observada | Guardar referência, não calcular/aplicar | Aprovação comercial pertence à Fase 2 | Escopo definitivo, Fase 1 |
| RN-1-304 — Inativação não destrói histórico | Item deixa de ser oferecido | Impedir nova seleção e manter vínculo antigo | Alias exige gestão | RQ-013 |

## Fluxo e regras

1. Catalogar fontes e aplicar B1-CAT-01.
2. Criar itens com código, label, categoria, variante/cor e fonte.
3. Manter itens em Rascunho até revisão de gestão.
4. Aprovar item e torná-lo selecionável no briefing.
5. Selecionar item em fixture e conferir que o pedido guarda o ID/label.
6. Inativar um item e verificar que histórico antigo continua legível.

| Cenário | Dado/condição | Resultado esperado | Caminho de erro/recuperação |
|---|---|---|---|
| Principal | Item com fonte e código aprovados | Selecionável no briefing com label canônica | — |
| Limite | Item sem versão ou fonte | Não aprovável e visível como rascunho | Pendência para gestão |
| Conflito | Dois itens com mesmo código | Nenhum é aprovado até resolver | Registrar ocorrência e manter versões |
| Regressão | Item inativado já usado em pedido | Pedido antigo mantém label/ID | Nova seleção é impedida |

## Instruções de execução para o Ethos

1. **Ler antes de alterar:** 03-Projeto/02-Escopo-Definitivo.md, Fase 1; 03-Projeto/01-Escopo.md, seções 4.4 e 8.3; esta SPEC.
2. **Alterar somente:** catálogo inicial, estado de revisão e vínculo ao briefing.
3. **Não alterar:** tabela de preço vigente, descontos, frete, estoque, ERP de produção ou arquivos-fonte.
4. **Executar nesta ordem:** inventariar fontes → aplicar B1-CAT-01 → cadastrar itens → revisar/aprovar → vincular fixture → testar inativação.
5. **Parar e pedir validação quando:** houver dúvida de vigência, item sem código, conflito de fonte ou tentativa de usar catálogo para cálculo.
6. **Estado válido ao parar:** itens não aprovados não aparecem como opção válida; histórico permanece íntegro.

## Checklist de execução

- [ ] B1-CAT-01 resolvido para a primeira versão do catálogo.
- [ ] Cada item tem fonte, versão, código/label e estado.
- [ ] Gestão aprovou ao menos uma amostra de cada categoria usada no briefing.
- [ ] Seleção no briefing preserva ID/label/fonte.
- [ ] Inativação e rollback de teste preservam histórico.

## Critérios de aceite

- [ ] **CA-1-201:** Um item aprovado é selecionável no briefing por código/label e mantém sua fonte/versionamento.
- [ ] **CA-1-202:** Item sem fonte/versionamento ou com código duplicado não é aprovado.
- [ ] **CA-1-203:** Catálogo não aplica preço, desconto, frete ou bloqueio de estoque na Fase 1.
- [ ] **CA-1-204:** Inativar item impede nova seleção, mas não altera pedidos históricos.
- [ ] **CA-1-205:** A gestão consegue revisar o estado do item e a atendente consegue consultar a opção aprovada.

## TDD da SPEC

| Etapa | Prova | Comando/ação | Resultado esperado | Evidência |
|---|---|---|---|---|
| RED | Tentar selecionar item sem código/fonte | Executar cadastro e seleção em fixture | O sistema permite inconsistência ou não identifica a fonte antes da SPEC | Captura inicial |
| GREEN | Cadastrar amostra aprovada e amostras inválidas | Executar cadastro, revisão, seleção e inativação | CA-1-201 a CA-1-205 passam | Catálogo, histórico e capturas |
| REFACTOR/REGRESSÃO | Repetir com nova versão do PDF e item histórico inativado | Executar importação/revisão sem apagar versão anterior | IDs/labels e histórico não divergem | Checklist e registro de revisão |

**Dados/fixtures:** FIX-1-201 produto/sabor; FIX-1-202 papel/cor; FIX-1-203 fita/cor; FIX-1-204 item sem fonte; FIX-1-205 código duplicado; FIX-1-206 item inativado.
**Caminhos de erro obrigatórios:** fonte ausente, versão divergente, código duplicado, item inativo e tentativa de cálculo.
**Evidência exigida:** amostra aprovada, itens inválidos, vínculo ao briefing e histórico de inativação.

## Handoff e operação

- **Como demonstrar:** abrir catálogo, filtrar uma categoria, mostrar fonte/versão, selecionar no briefing e inativar um item de teste.
- **Como operar depois:** gestão revisa/aprova; atendimento seleciona; produção consulta.
- **Como monitorar:** itens rascunho, conflitos de código e itens sem fonte.
- **Pendência conhecida:** B1-CAT-01 deve registrar documento vigente, versão e aprovador antes de uso comercial.

## Tasks vinculadas

| ID | Task | Leva | Critério binário | Subseção da SPEC | Status |
|---|---|---|---|---|---|
| F1-T007 | Inventariar fontes e aprovar documento/versão inicial do catálogo | 1 | Fonte vigente, versão e aprovador estão registrados | `## Contexto e decisões fechadas`; `## Handoff e operação` | liberada |
| F1-T008 | Cadastrar catálogo versionado e bloquear itens sem fonte ou código único | 2 | Item aprovado é rastreável; item inválido fica Rascunho | `## Dados e integrações`; `## Fluxo e regras` | planejada |
| F1-T009 | Vincular catálogo aprovado ao briefing e provar inativação sem alterar histórico | 3 | Seleção usa código/label e inativação não altera histórico nem aplica política comercial | `## Fluxo e regras`; `## TDD da SPEC` | planejada |

## Emendas

| Data | Origem do sinal | Micro-spec/task | Motivo |
|---|---|---|---|
| | | | |
