# AP-2026-09-22 — F3-T010: valores de select em migration dependem do estado da instância

## Sinal reutilizável
**Causa:** a migration 0046 falhou 3 vezes no QA do Skip (0.0.131–0.133) porque presumiu valores de select a partir dos arquivos do repositório (clientes `tipo_cliente='outros'`, oportunidades `status='fechado'`, `ordem` iniciando em 0), mas migrations posteriores (0007/0008 e o modelo de clientes de 27/08) já tinham mudado esses valores na instância.

**Padrão:** o estado real de selects/RLS vive na INSTÂNCIA (backend compartilhado), não no repo. O QA do Skip aplica migrations de verdade — erro de seed aparece no estágio `integrations`, não no `test`.

## Orientação
Antes de escrever migration que cria registros (seed/importação): consultar os valores reais com `skip_cloud_get_collection_details` da instância-alvo, nunca presumir do código do repo. Tratar falha do estágio `integrations` como erro de migration a corrigir no MESMO arquivo (guardrail do Skip reenvia o arquivo como está).

## Evidência
QA 0.0.131 (tipo_cliente inválido), 0.0.132 (status/tipo_pedido inválidos), 0.0.133 (ordem blank) → 0.0.134 PASS após consulta à instância e correção.
