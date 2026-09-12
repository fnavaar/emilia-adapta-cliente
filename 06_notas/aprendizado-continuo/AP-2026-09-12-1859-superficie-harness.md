# AP-2026-09-12-1859 — superfície de acesso do harness

- Status: candidato
- Escopo: projeto do cliente
- Task/SPEC: F2-T010 / SPEC-2-002
- Sinal: o harness estava implementado e protegido, mas o acesso só aparecia ao final de uma seção secundária; a usuária não o encontrou no teste humano.
- Evidência: `06_notas/debug/debug-2026-09-12-f2-t010-acesso-harness.md`; QA 0.0.113; verificação visual no Preview confirmou link no menu lateral e botão no cabeçalho após a correção.
- Regra reutilizável: recursos administrativos de homologação precisam ter rota protegida e pelo menos um ponto de acesso primário e evidente na navegação, além de qualquer atalho contextual.
- Quando aplicar: ao criar harnesses, telas de QA, auditoria ou ferramentas internas que dependem de um perfil administrativo.
- Quando não aplicar: não expor a ferramenta a perfis sem autorização nem transformar um recurso temporário em navegação pública.
- Confiança: alta — causa reproduzida, correção mínima aplicada e superfície verificada no Preview.
- Privacidade: sem segredo, dado pessoal ou conteúdo bruto.
