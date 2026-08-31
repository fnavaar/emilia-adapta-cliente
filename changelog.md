# Changelog — Projeto Mara Cristina Amaral Santos - ME

## Registro

- 2026-08-31 · Fernanda · DEBUG task F1-T012: auditoria vazia, ausência de gestão de usuários e acesso direto sem mensagem clara → coleção de auditoria genérica, hooks de criação/negação, revogação administrativa, bloqueio de login revogado e mensagem de permissão adicionados; QA v0.0.63 passou; runtime confirmou criação auditada, negação auditada e revogação.
- 2026-08-31 · Fernanda · Task F1-T011 concluída: perfis e RLS por papel, Administrador com acesso total aos recursos da Fase 1, histórico somente leitura, manutenção do catálogo para Administrador/Gestão, consulta operacional e contas fictícias de homologação; QA v0.0.60 passou e teste humano aprovado.
- 2026-08-31 · Fernanda · DEBUG task F1-T011: catálogo sem ação visível, histórico não exposto e contas operacionais ausentes → causa raiz foi cobertura incompleta da superfície de homologação; manutenção do catálogo, histórico somente leitura e contas fictícias adicionados; QA v0.0.59 passou.
- 2026-08-31 · Fernanda / ETHOS (Bia) · Task F1-T010 concluída: matriz incremental de papéis e acessos da Fase 1 registrada em `06_notas/matriz-permissoes-f1-t010.md`; escopo futuro deliberadamente aberto; capacidade atual de RLS por papel/auditoria registrada como dependência técnica para T011/T012; nenhum acesso real amplo liberado.
- 2026-08-31 · Fernanda / ETHOS (Bia) · Task F1-T009 concluída: seleção de item aprovado do catálogo no briefing com código, label e versão salvos no pedido; itens não aprovados não aparecem; migration 0019 aplicada; QA 0.0.56 passou; campo confirmado no preview e teste humano aprovado.
- 2026-08-31 · Fernanda / ETHOS (Bia) · DEBUG F1-T009: campo do catálogo não apareceu na primeira entrega → causa raiz: lógica existia, mas o bloco visual não estava renderizado → corrigido; QA 0.0.55 passou e preview confirmou PAP-CREP-ENC-001/v2026.1.
- 2026-08-31 · Fernanda / ETHOS (Bia) · Task F1-T006 concluída: fila de pendências e registro de conflitos no briefing; migration 0018; campo faltante com motivo, responsável, próxima ação e prazo; dois valores conflitantes preservados com confirmação humana; QA 0.0.52 passou e teste humano aprovado.
- 2026-08-31 · Fernanda / ETHOS (Bia) · DEBUG F1-T006: edição incremental corrompeu temporariamente o handler → causa raiz: bloco aplicado em posição inválida → corrigido com restauração controlada; QA 0.0.52 passou.
- 2026-08-31 · Fernanda / ETHOS (Bia) · Task F1-T005 concluída: template único de briefing com grupos condicionais; migrations 0016/0017; QA 0.0.47 passou e teste humano aprovado.
- 2026-08-31 · Fernanda / ETHOS (Bia) · Task F1-T008 concluída: catálogo versionado, rastreabilidade, estados de revisão, regra contra aprovação sem código/versão, índice único, fixtures e tela `/catalogo`; QA 0.0.44 passou e teste humano aprovado.
- 2026-08-28 · Fernanda / ETHOS (Bia) · Task F1-T007 concluída: inventário de fontes e B1-CAT-01 registrados; catálogo Emília 2026.1 como fonte vigente parcial; fornecedores apenas como fundamento técnico interno; revisão humana aprovada.
- 2026-08-28 · Fernanda / ETHOS (Bia) · Task F1-T004 concluída: briefing com busca incremental de cliente, opção de adicionar novo e subtipos corrigidos; QA 0.0.42 passou e aprovação humana confirmada.
- 2026-08-27 · ETHOS (Bia) · Task F1-T003 concluída: source_ref, decisão humana de duplicidade, histórico e rollback não destrutivo; QA 0.0.35 passou e teste aprovado.
- 2026-08-27 · ETHOS (Bia) · Task F1-T002 concluída: cadastro progressivo, Pessoa reaproveitável, origem/categoria, telefone e duplicidade; QA 0.0.33 passou e teste aprovado.
- 2026-08-27 · Fernanda · Confirmou categoria obrigatória para Origem por Indicação, com opção Não informado.
- 2026-08-27 · Fernanda · Validou a base da especificação e autorizou implementação.
- 2026-08-25 · ETHOS (Bia) · F1-T001 concluída: superfície de homologação e dicionário registrados; QA e teste humano aprovados.
- 2026-08-25 · ETHOS (Bia) · Projeto Nexus Emilia configurado com 5 SPECs e 15 tasks da Fase 1.
