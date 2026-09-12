# Debug Summary — F2-T010: acesso ao harness não encontrado

- **Task e problema:** F2-T010; Fernanda conseguiu entrar no sistema, mas não encontrou a opção de regressão no painel.
- **Reprodução:** no Preview, com perfil Administrador, a rota `/regressao/f2-t010` funcionava diretamente e o botão existia no final da seção “Ações Rápidas”. A inspeção visual mostrou que ele ficava depois de vários outros botões, sem presença no menu lateral.
- **Causa raiz:** a implementação tinha a rota protegida e um atalho em uma área secundária, mas não havia um ponto de navegação primário e evidente para o harness. Em telas menores, o botão podia ficar abaixo da primeira dobra.
- **Correção:** adicionada a rota **Regressão F2-T010** ao menu lateral do Administrador e um botão destacado no cabeçalho do dashboard. A proteção da rota continua restrita ao perfil Administrador.
- **Verificação automática:** QA 0.0.113 passou em setup, análise estática, build, integrações e testes.
- **Verificação visual:** no Preview `https://nexus-emilia-49529--preview.goskip.app/`, o link aparece no menu lateral e o botão aparece no cabeçalho do dashboard.
- **Gate atual:** aguardando novo teste humano.

Nenhuma integração externa, cobrança real ou publicação em produção foi realizada durante o debug.
