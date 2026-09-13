# Índice — SPECs da Fase 3

**Estado:** preparada para execução sequencial. A SPEC-3-001 é corretiva e bloqueante; nenhuma entrega funcional começa antes da recertificação e do teste humano.

| SPEC | Resultado | Requisitos | Critérios | Estado |
|---|---|---|---|---|
| SPEC-3-001 | Estabilizar e recertificar F1–F2 | RQ-005/006/013/014 | CA-3-001–008, 029–030 | F3-T001 elegível |
| SPEC-3-002 | Jornadas especiais no núcleo | RQ-002/008/009/010/011 | CA-3-009–014, 031 | bloqueada |
| SPEC-3-003 | Produção e liberação controlada | RQ-003/006/009/011/012 | CA-3-015–021 | bloqueada |
| SPEC-3-004 | Expedição, entrega e ocorrência | RQ-009/011/012/013 | CA-3-022–028 | bloqueada |

## Gates

- G3-COR-01: patch técnico aplicado e provado no Preview.
- G3-SEC-01: secrets, RLS, revogação e contas recertificados.
- G3-OPS-01: líder, SLA/capacidade, campos mínimos e piloto aprovados.
- G3-ENT-01: protocolo, responsáveis e estados terminais aprovados.

Produção externa permanece proibida até novo gate humano.

## Equivalência de gates

- G1/G2 do escopo → G3-COR-01/G3-SEC-01 na recertificação.
- G4 do escopo → G3-OPS-01 na produção.
- G6 do escopo → G3-ENT-01 e aceite final da fase.
- B3-ENV-01 é bloqueio adicional: topologia de backend e efeito compartilhado.
