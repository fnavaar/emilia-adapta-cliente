# AP-2026-08-27 — Valores de select devem respeitar o contrato do backend

- Status: candidato
- Escopo: projeto do cliente
- Task/SPEC: F1-T002 / SPEC-1-001
- Sinal: campos select persistidos em PocketBase rejeitam labels de apresentação e aceitam apenas os valores codificados definidos no schema.
- Evidência: testes diretos no backend; `pessoa_fisica` e `cliente_padrao` retornaram HTTP 200, enquanto `Pessoa Física` e `Cliente padrão` retornaram HTTP 400 com `validation_invalid_value`. Correção validada no preview com teste humano aprovado.
- Regra reutilizável: ao integrar selects de UI com campos enum/select do PocketBase, manter value codificado separado do label e validar o payload efetivo antes do teste humano.
- Quando aplicar: qualquer formulário que grave opções em coleções PocketBase com valores enumerados.
- Quando não aplicar: campos de texto livre ou APIs que documentem explicitamente labels como valores aceitos.
- Confiança: alta — causa reproduzida em teste positivo/negativo e corrigida no fluxo real.
- Privacidade: sem segredo, dado pessoal ou conteúdo bruto
