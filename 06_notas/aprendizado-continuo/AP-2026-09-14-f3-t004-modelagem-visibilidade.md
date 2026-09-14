# AP-2026-09-14 — F3-T004: modelagem validada por teste humano e visibilidade operacional

**Task:** F3-T004 · **Data:** 2026-09-14 · **Tipo:** sinal reutilizável

## Sinal

O teste humano da Champion corrigiu uma modelagem que a análise e a implementação não pegaram: "degustação" estava no select de Tipo de Evento, mas Tipo de Evento responde "para que a pessoa busca o bem-casado" — a degustação é uma solicitação que pode existir em qualquer evento. Além disso, o card de pendências mostrava apenas o número; a Champion precisa ver a lista para agir. E o teste humano travou em preview×produção: a validação na URL errada parecia regressão.

## Regra confirmada

1. Antes de implementar variantes de jornada, validar a semântica de cada campo com a Champion: tipo de evento = motivo da busca; degustação = marcador transversal (`solicitou_degustacao`).
2. Toda entidade operacional que gera ação precisa de superfície de consulta visível (lista, não só contador) — regra já registrada na F2-T009, agora aplicada a pendências.
3. Antes do teste humano, confirmar em qual URL a Champion vai validar e publicar/verificar essa URL explicitamente (regra da F2-T008 aplicada ao fluxo de aceite).
4. `findFirstRecordByFilter` lança "no rows in result set" em tabela vazia — toda busca em migration/hook precisa de try/catch.
5. Offset de ordinais Skip vs repo é recorrente (0041 no repo = 0042/0043 na instância): documentar no cabeçalho do arquivo e não "corrigir" o nome no Skip.

## Evidência

- 3 rodadas de teste humano; correções aplicadas e reprovadas na instância (Skip 0.0.121–0.0.125)
- Prova do marcador no núcleo: casamento + `solicitou_degustacao` + Entrega sem frete → pendência RN-3-101; Presencial → avança
