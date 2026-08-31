# AP-2026-08-31-1335 — Campos condicionais devem excluir campos de outro tipo

- Status: candidato
- Escopo: projeto do cliente
- Task/SPEC: F1-T005 / SPEC-1-002
- Sinal: durante a verificação do briefing, campos gerais de evento apareceram inicialmente para degustação; a correção passou a renderizar os grupos por tipo, evitando herança indevida entre contextos.
- Evidência: preview `/oportunidades/nova` após a versão 0.0.47; degustação exibiu modalidade/referência, revendedor exibiu datas/tipo de cliente, bem-nascido exibiu parto/maternidade/acompanhamento e casamento exibiu campos de evento.
- Regra reutilizável: ao implementar briefing condicional, testar cada tipo isoladamente e também a troca entre tipos; campos não aplicáveis devem desaparecer sem apagar valores persistidos.
- Quando aplicar: em formulários com grupos condicionais por tipo de pedido, evento, cliente ou canal.
- Quando não aplicar: campos realmente gerais e comuns a todos os tipos devem permanecer fora dos grupos condicionais.
- Confiança: alta — comportamento foi observado no preview e validado pela Fernanda.
- Privacidade: sem segredo, dado pessoal ou conteúdo bruto.
