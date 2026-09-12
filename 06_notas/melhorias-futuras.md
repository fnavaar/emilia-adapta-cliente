# Melhorias futuras — Fase 1 (anotadas em 2026-09-02) e Fase 2 (2026-09-12)

Registro das melhorias identificadas durante as demonstrações e testes humanos, para não se perderem quando entrarmos nas próximas fases. Nenhuma delas bloqueia o fechamento das fases; são evoluções desejadas.

## 1. Trava de duplicidade no backend
- **Hoje:** a proteção de duplicidade vive na interface (window.confirm antes de salvar: "reutilizar ou criar novo?"). Chamada direta à API consegue criar um segundo registro com o mesmo source_ref sem aviso.
- **Melhoria sugerida:** alerta/bloqueio no backend (ex.: índice único em source_ref por tipo, ou validação que retorne aviso de duplicidade mantendo a decisão humana).
- **Valor:** protege contra chamadas diretas/erros de integração e mantém o registro canônico único.

## 2. Visual com o design system da Emília
- **Hoje:** protótipo funcional (já usa as cores #FAF8F5, #3D2314, #C69D5F), mas simples.
- **Melhoria sugerida:** aplicar o design system completo em fase de design: tipografia EB Garamond + Mulish, dourado chapado #C69D5F, componentes, modelos de página (painel interno), fotos oficiais.
- **Valor:** alinhar o Nexus à identidade da marca antes de treinar o time.

## 3. Validar renderização da tela de Histórico no preview
- **Hoje:** na demonstração automatizada, a tela `/historico` abriu mas ficou sem listar os eventos no navegador (os dados existem no backend; possível limitação da automação ou ponto a conferir).
- **Ação sugerida:** teste manual no preview para confirmar que a lista de eventos renderiza (Fê ou uma vendedora).

## 4. Conferir o clique do botão Salvar em navegador automatizado
- **Hoje:** o botão "Salvar Cliente"/"Salvar Oportunidade" não disparou o envio no navegador automatizado; o backend foi validado via API com o mesmo payload e persiste corretamente.
- **Ação sugerida:** teste manual do fluxo completo pela interface (cadastro, oportunidade) para confirmar a experiência real de clique.

## 5. Tela de consulta de orçamentos salvos (identificada no teste humano da F2-T009, 12/09)
- **Hoje:** o montador `/propostas/nova` só cria orçamentos; não existe tela para listar/consultar orçamentos salvos (rascunho, em revisão, aprovada, substituída). A vendedora não consegue reabrir ou conferir um orçamento anterior pela interface.
- **Melhoria sugerida:** tela de listagem de orçamentos com filtro por status e cliente, mostrando versão, itens e snapshots; permitir abrir a versão atual.
- **Valor:** essencial para o uso real — sem consulta, o orçamento só existe no momento da criação.

## 6. Histórico de auditoria não exibe eventos de orçamento (identificado no teste humano da F2-T009, 12/09)
- **Hoje:** a tela `/historico` lê apenas a auditoria genérica da Fase 1 (coleção `auditoria`: clientes, oportunidades, pessoas, catálogo). Os eventos de orçamento ficam na coleção separada `auditoria_propostas` (criação, alteração, substituição, aprovação, recusa), que não tem tela.
- **Melhoria sugerida:** incluir os eventos de `auditoria_propostas` (e `auditoria_pedidos`) na tela de Histórico, com filtro por tipo de evento, ou criar aba específica "Orçamentos" dentro do Histórico.
- **Valor:** rastreabilidade visível para Gestão/Admin sem precisar consultar o banco.

---
**Status:** todas em aberto, aguardando as próximas fases / validação manual. Itens 5 e 6 registrados em 2026-09-12 durante o teste humano da F2-T009.
