# B2-POL-02 — Frete, descontos e adicionais

**Task:** F2-T002 — Aprovar frete, desconto, adicionais, validade, termos e alçadas  
**SPEC:** SPEC-2-001 — Composição versionada e proposta comercial  
**Status:** concluída e validada pela Gestão  
**Data da aprovação:** 2026-09-10  
**Gestão:** Fernanda

## Frete

- Frete é uma **regra de exceção**, não um componente automático obrigatório.
- Quando um frete for informado na proposta, deve existir um campo opcional para registrar sua justificativa.
- A proposta deve conservar o valor do frete e a justificativa utilizada na versão enviada.
- Nenhum valor ou fórmula de frete foi inventado nesta task.

## Descontos via Pix por quantidade

Aplicam-se à quantidade total de bem-casados, conforme a política confirmada:

| Quantidade | Desconto via Pix |
|---|---:|
| 50 a 149 unidades | 3% |
| 150 a 399 unidades | 5% |
| 400 unidades ou mais | 7% |

- Descontos maiores que os limites acima somente podem ser concedidos e autorizados por perfil Administrador.
- A autorização de desconto excepcional deve guardar identificador do autorizador e motivo.
- Não foi definida acumulação com outros descontos; permanece bloqueada para decisão antes do cálculo automático.

## Adicionais e composição especial

A proposta pode conter componentes adicionais, inclusive mais de um, conforme a composição aprovada:

- caixinha;
- laço externo da caixinha, com fita, largura e cor;
- acessórios, como concha, medalha, botão, pingente, tag, flor ou alfinete;
- tecido ou fralda;
- embalagem fornecida pelo cliente;
- manuseio de material fornecido pelo cliente;
- formatos especiais, como bem-casado em fralda com alfinete, sem fita.

Os valores específicos desses componentes ainda precisam ser atualizados/confirmados a partir do mix de vendas e permanecem bloqueados para cálculo automático até decisão. Itens “sob consulta” não devem gerar valor silenciosamente.

## Limites

- Este recibo formaliza regras; não cria cálculo automático.
- Não ativa frete, desconto ou adicional em produção.
- Não substitui a definição de validade, termos, pagamento e alçadas registrada em B2-POL-03.
- Não há integração externa nem liberação de produção.

## Critério

**B2-POL-02 atendido:** frete como exceção, descontos via Pix por quantidade e restrição de descontos excepcionais estão registrados e validados. Lacunas de adicionais e acumulação de descontos ficaram explicitamente bloqueadas, sem inventar valores.