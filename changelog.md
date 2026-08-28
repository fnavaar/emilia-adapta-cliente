# Changelog — Projeto Mara Cristina Amaral Santos - ME

## Registro

- 2026-08-28 · Fernanda / ETHOS (Bia) · F1-T007 em validação humana: inventário de fontes registrado em `06_notas/inventario-fontes-catalogo-f1-t007.md`; B1-CAT-01 fechada documentalmente com catálogo Emília 2026.1 como fonte vigente parcial, tabela de preço apenas como inventário de materiais, fontes de fornecedores e recortes aprovados; nenhuma política comercial ou publicação alterada.
- 2026-08-28 · Fernanda / ETHOS (Bia) · Decisão parcial da F1-T007 registrada: documento vigente catálogo de papel e fita 2026.1 (parcial, requer atualizações), versão 2026.1, aprovadores Fernanda e Mara; falta enviar arquivos atualizados para fechar B1-CAT-01.
- 2026-08-28 · Fernanda / ETHOS (Bia) · Task F1-T004 concluída: briefing de oportunidade com busca incremental de cliente por nome ou telefone, opção "+ Adicionar novo" dentro da lista de resultados, segmento derivado oculto e subtipos de aniversário corrigidos; QA 0.0.42 passou e aprovação humana confirmada no preview.
- 2026-08-27 · ETHOS (Bia) · Task F1-T003 concluída: source_ref, detecção de repetição, decisão humana entre reutilizar/criar novo, histórico da decisão e rollback de fixture não destrutivo implementados; migration 0011 aplicada; QA 0.0.35 passou; teste humano aprovado pela Fernanda.
- 2026-08-27 · ETHOS (Bia) · Task F1-T002 concluída: cadastro progressivo, Pessoa reaproveitável, Natureza/Classificação, origem/categoria, telefone Brasil/Outro país e detecção de duplicidade implementados; QA 0.0.33 passou; teste humano no preview aprovado pela Fernanda; salvamento confirmado com Cliente, Pessoa e vínculo persistidos.
- 2026-08-27 · ETHOS (Bia) · DEBUG F1-T002: causa do aparente não salvamento totalmente compreendida; `fill` do teste automatizado alterava apenas o valor visual sem atualizar o estado React, fazendo o handler sair na validação sem POST. Com digitação real (`type`), cadastro mínimo criou Cliente, Pessoa e vínculo; três POSTs retornaram 200. QA 0.0.32 OK; aguardando teste humano.
- 2026-08-27 · ETHOS (Bia) · DEBUG F1-T002: Fernanda relatou erro ao salvar sem clientes prévios → reprodução com sessão autenticada salvou Cliente Teste corretamente e contador passou de 5 para 6; telefone internacional implementado com Brasil padrão, máscara local e opção Outro país sem máscara brasileira; QA 0.0.22 OK; aguardando teste humano.
- 2026-08-27 · ETHOS (Bia) · DEBUG F1-T002: alerta automático de duplicidade implementado com debounce de 450ms e opção de reutilizar Pessoa; QA 0.0.21 OK.
- 2026-08-27 · Fernanda · Confirmou categoria obrigatória para Origem por Indicação, com opção "Não informado".
- 2026-08-27 · Fernanda · Validou a base da nova especificação e autorizou implementação: Pessoa reaproveitável, cadastro progressivo, Natureza/Classificação, Origem/Canal e endereços.
- 2026-08-27 · Fernanda · Enviou a especificação funcional da Base de Cadastro de Clientes para validação.
- 2026-08-25 · ETHOS (Bia) · F1-T001 concluída: superfície de homologação e dicionário registrados; QA e teste humano aprovados.
- 2026-08-25 · ETHOS (Bia) · Projeto Nexus Emilia configurado com 5 SPECs e 15 tasks da Fase 1.
