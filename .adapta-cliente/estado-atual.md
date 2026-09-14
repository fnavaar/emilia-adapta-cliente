# Estado atual — Adapta Cliente

- task_id: F3-T004
- champion: Fernanda (CEO)
- spec: 04_fase-atual/specs/spec-3-002-jornadas-especiais.md
- etapa: aguardando_teste_humano
- autorizacao_implementacao: confirmada em 2026-09-14 12:40; "Pode implementar a F3-T004"
- teste_humano: pendente
- verificacao_automatica: passou; RED confirmado (7 FAILs) antes do GREEN; suíte 23/23 invariantes (16 T001 + 7 T004: CA-3-009..014/031); tsc/lint/format/build/audit limpos; QA Skip 0.0.121 e 0.0.122 PASS (migrations 0040/0041 aplicadas como 0040/0042 na instância — offset de ordinais documentado no arquivo); verificação na instância: config_jornadas com 4 jornadas semeadas, RLS CA-3-031 (atendimento/produção PATCH negado; leitura operacional OK), campos novos presentes, hook validar_minimos_jornada provado com 5 fixtures (degustação enviada sem frete → pendência RN-3-101; presencial cortesia → avança; revendedor data duplicada → pendência RN-3-103; bem-nascido completo → avança sem liberar produção; evento sem mínimos → 3 pendências nomeadas), 7 pendências + 7 históricos com origem jornada_*
- aprendizado: pendente (registrar no fechamento: offset de ordinais Skip vs repo; findFirstRecordByFilter lança "no rows" em tabela vazia — sempre try/catch; select de status da instância difere do repo; tipos de evento sociais mapeiam para config "evento")
- ultima_acao: implementação concluída e verificada na instância; branch feat/f3-t004-jornadas-especiais no GitHub (commits 0fd50d9, a7247fc, 0e1b70c, 53fd0ef, d094dd3); Skip 0.0.122; recibo em 05_entregas/F3-T004-recibo-jornadas-especiais.md
- proxima_acao: aguardar teste humano da Fê para concluir a task
- atualizado_em: 2026-09-14T13:10:00-03:00
