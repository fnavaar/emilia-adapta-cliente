# B2-POL-01 — Tabela de preços, moeda e vigência

**Task:** F2-T001 — Aprovar tabela de preços, moeda e vigência  
**SPEC:** SPEC-2-001 — Composição versionada e proposta comercial  
**Status:** aprovada pela Gestão  
**Data da aprovação:** 2026-09-03  
**Aprovadoras:** Fernanda e Mara

## Fonte oficial

- **Arquivo:** `TABELA_2026.xlsx`
- **Arquivo recebido:** `uploads/bb1aec5b-TABELA_2026.xlsx`
- **SHA-256:** `bb35dead8239199ad15b373a71dfc70d7a7d78b99b1d9b0540f840b4b6542911`
- **Moeda:** Real brasileiro (R$)
- **Vigência:** 01/01/2026 a 31/12/2026
- **Versão operacional:** TABELA 2026

## Tabelas comerciais confirmadas

A fonte contém bases distintas para:

- **TABELA CF:** cliente final
- **TABELA REV:** revendedores
- **TABELA CB:** colaboradores/funcionários
- **TABELA BUFFET A:** buffets (Bisutti, Noma, Gallo e Wood)
- **TABELA APOGEO:** parceria
- **Planilha2:** valores específicos por casa/parceiro, a serem tratados como condições vinculadas ao parceiro

## Regra de composição confirmada

O preço não é um valor único por bem-casado. É uma combinação de:

1. sabor/versão do bem-casado;
2. tipo de papel ou embrulho;
3. tipo, largura e cor da fita, quando houver;
4. tipo de laço;
5. um ou mais acessórios, como concha, medalha, botão, pingente, tag ou outros;
6. embalagem externa/caixinha, quando houver, incluindo sua composição e o laço externo;
7. embalagem fornecida pelo cliente, quando aplicável, com o respectivo manuseio e materiais;
8. quantidade e perfil comercial da tabela aplicável.

São exemplos confirmados de composição especial:

- 200 bem-casados em 100 caixinhas com 2 unidades: quantidade de unidades e quantidade/tipo de caixinhas são componentes distintos; laço externo também pode acrescentar valor.
- Bem-casado em fralda com alfinete: bem-casado com papel crepom encerado, tecido de fralda e alfinete dourado ou prateado; sem fita, mas com acessório.
- Embalagem fornecida pelo cliente: valor calculado conforme o tipo de embalagem e o manuseio necessário.

## Limites e lacunas para próximas tasks

- Esta aprovação **não cria cálculo automático** nem aplica preço no sistema.
- Valores de caixinhas, laços externos, algumas embalagens especiais e manuseios precisam ser atualizados/confirmados antes de entrarem como política calculável.
- Condições diferenciadas por cliente, revendedor, buffet, colaborador e parceiro devem ser selecionadas por perfil/tabela autorizada, nunca por regra informal.
- Itens marcados como “sob consulta” permanecem sem cálculo automático até decisão específica.
- Não foram inventados valores para lacunas.
- A aba APOGEO está identificada como tabela de parceria 2025 dentro de um arquivo 2026; sua validade comercial para 2026 deve ser confirmada antes de uso em proposta.

## Critério da F2-T001

**B2-POL-01 atendido:** a fonte, versão operacional, moeda, vigência e aprovadoras estão registradas. As lacunas foram separadas para as decisões seguintes, sem bloquear a aprovação da existência da tabela nem autorizar cálculo incompleto.

## Próxima dependência

F2-T002 deve definir frete, descontos, adicionais, validade, termos e alçadas, incluindo a atualização dos componentes especiais e dos produtos que mais saem antes da construção do cálculo.