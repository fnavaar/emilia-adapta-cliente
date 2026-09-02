# Melhorias futuras — Fase 1 (anotadas em 2026-09-02)

Registro das melhorias identificadas durante a demonstração da Fase 1, para não se perderem quando entrarmos nas próximas fases. Nenhuma delas bloqueia o fechamento da Fase 1; são evoluções desejadas.

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

---
**Status:** todas em aberto, aguardando as próximas fases / validação manual.