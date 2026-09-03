# B2-POL-01 — Tabela de preços, moeda e vigência

**Task:** F2-T001 — Aprovar tabela de preços, moeda e vigência  
**SPEC:** SPEC-2-001 — Composição versionada e proposta comercial  
**Status:** concluída  
**Data da aprovação:** 2026-09-03  
**Aprovadoras:** Fernanda e Mara

## Fonte oficial

- **Arquivo:** `TABELA_2026.xlsx`
- **Arquivo recebido:** `uploads/bb1aec5b-TABELA_2026.xlsx`
- **SHA-256:** `bb35dead8239199ad15b373a71dfc70d7a7d78b99b1d9b0540f840b4b6542911`
- **Moeda:** Real brasileiro (R$)
- **Vigência:** 01/01/2026 a 31/12/2026
- **Versão operacional:** TABELA 2026

## Estrutura de tabelas comerciais confirmada

A planilha contém referências de preços para diferentes contextos, mas os nomes das abas não devem virar categorias fixas ou limitantes do sistema.

- **TABELA CF:** referência atual para cliente final.
- **TABELA REV:** referência atual para revendedores.
- **TABELA CB:** referência atual para colaboradores/funcionários.
- **TABELA BUFFET A:** referência atual para um conjunto de buffets; não significa que exista uma única tabela universal para todos os buffets.
- **TABELA APOGEO:** referência de uma parceria específica; não deve ser tratada como categoria fixa ou tabela obrigatória do sistema.
- **Planilha2:** referências de condições específicas por casa/parceiro.

## Regra de tabelas personalizadas por cliente ou grupo

O sistema deverá permitir:

1. criar tabelas comerciais com nome configurável;
2. atribuir uma tabela específica a um cliente individual;
3. atribuir uma tabela a um grupo de revenda, buffet, parceiro ou outra relação comercial;
4. permitir que clientes ou grupos diferentes tenham valores-base diferentes;
5. manter tabelas gerais/base, como cliente final, revendedor e colaborador, sem impedir exceções específicas;
6. versionar cada tabela, com vigência, fonte, aprovadores e estado;
7. definir a precedência da tabela específica sobre a tabela-base antes de calcular uma proposta;
8. preservar no snapshot da proposta qual tabela e versão foram utilizadas.

Portanto, “Buffet A”, “Apogeo” e nomes semelhantes são apenas identificadores da fonte atual. O modelo correto é **tabela comercial configurável e vinculável**, não um conjunto fechado de categorias.

## Regra de composição confirmada

O preço não é um valor único por bem-casado. É uma combinação de:

1. sabor/versão do bem-casado;
2. tipo de papel ou embrulho;
3. tipo, largura e cor da fita, quando houver;
4. tipo de laço;
5. um ou mais acessórios, como concha, medalha, botão, pingente, tag ou outros;
6. embalagem externa/caixinha, quando houver, incluindo sua composição e o laço externo;
7. embalagem fornecida pelo cliente, quando aplicável, com o respectivo manuseio e materiais;
8. quantidade;
9. tabela comercial aplicável ao cliente ou grupo.

São exemplos confirmados de composição especial:

- 200 bem-casados em 100 caixinhas com 2 unidades: quantidade de unidades e quantidade/tipo de caixinhas são componentes distintos; laço externo também pode acrescentar valor.
- Bem-casado em fralda com alfinete: bem-casado com papel crepom encerado, tecido de fralda e alfinete dourado ou prateado; sem fita, mas com acessório.
- Embalagem fornecida pelo cliente: valor calculado conforme o tipo de embalagem e o manuseio necessário.

## Limites e lacunas para próximas tasks

- Esta aprovação **não cria cálculo automático** nem aplica preço no sistema.
- Valores de caixinhas, laços externos, algumas embalagens especiais e manuseios precisam ser atualizados/confirmados antes de entrarem como política calculável.
- A planilha atual possui referências, mas será necessário definir quais linhas e combinações estão vigentes em cada tabela personalizada.
- Itens marcados como “sob consulta” permanecem sem cálculo automático até decisão específica.
- Não foram inventados valores para lacunas.
- A aba APOGEO aparece como tabela de parceria 2025 dentro de um arquivo 2026; sua validade comercial para 2026 deve ser confirmada antes de uso em proposta.
- A precedência entre tabela-base, tabela do grupo e condição específica do cliente ainda deve ser definida antes do cálculo automático.

## Critério da F2-T001

**B2-POL-01 atendido:** fonte, versão operacional, moeda, vigência, aprovadoras e regra de tabelas configuráveis por cliente/grupo estão registrados. As lacunas de composição e precedência foram separadas para as decisões seguintes, sem inventar valores.

## Próxima dependência

F2-T002 deve definir frete, descontos, adicionais, validade, termos e alçadas, incluindo a atualização dos componentes especiais, dos produtos que mais saem e da precedência entre tabelas-base e tabelas específicas.