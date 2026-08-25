# Recibo F1-T002 — Modelo de clientes, parceiros e eventos

- **Data**: 2026-08-25
- **Task**: F1-T002
- **SPEC**: SPEC-1-001 — Registro canônico de cliente e oportunidade
- **Executor**: ETHOS (Bia)
- **Autorização**: Fernanda autorizou a implementação após análise.

## Implementado no Skip Cloud

Migração aplicada: `pocketbase/migrations/0002_revisao_clientes_parceiros.js`.

Coleções novas:

- `cerimonialistas`: empresa e endereço opcional.
- `contatos_cerimonialistas`: múltiplos contatos por cerimonialista, com nome e telefone obrigatórios.
- `grupos_parceiros`: grupo comercial, como Casa do Pão de Queijo ou Bisutti.
- `empresas_parceiros`: uma ou várias empresas/CNPJs por grupo.
- `contatos_parceiros`: um ou vários contatos por grupo, com nome e telefone obrigatórios.
- `unidades_parceiros`: uma ou várias unidades/endereço por empresa, com possibilidade de CNPJ específico da unidade.
- `contatos_unidades_parceiros`: relação entre contato e uma ou mais unidades.
- `eventos`: tipo de evento e campos específicos para casamento, aniversário, bodas, maternidade, chá de bebê, revelação, batizado e Outros.

Coleções existentes ajustadas:

- `clientes`: telefone principal obrigatório; segmentos atualizados para os nove segmentos aprovados; nome dos noivos removido do cadastro geral.
- `oportunidades`: estados ajustados para `novo`, `diagnosticando` e `aguardando_dados`; origem direta/cerimonialista/grupo parceiro; vínculos opcionais com cerimonialista, contato, grupo, empresa, unidade e contato parceiro.

## Regras aplicadas

- Maternidade contempla também chá de bebê e revelação.
- Parceiro pode ser simples, com um CNPJ e endereço, ou grupo com múltiplas empresas, CNPJs e unidades.
- Um grupo pode ter um ou vários contatos.
- Cada contato pode ser relacionado a uma ou mais unidades.
- Os pedidos poderão ser consolidados por grupo e detalhados por empresa, CNPJ, unidade, endereço e contato.
- Telefone principal do cliente é obrigatório.
- Outros exige tipo de evento e descrição livre no modelo de evento.
- Dados dos noivos ficam no evento, não no cadastro geral do cliente.

## Verificação automática

- Versão Skip: 0.0.7, hash `42e7477`.
- Migração 0002: aplicada.
- QA: setup OK; análise estática OK; build OK; integrações OK; testes OK.
- Coleções confirmadas no Skip Cloud: 15 no total, incluindo as 8 novas coleções e a coleção `eventos`.
- Produção: não publicada nem alterada.

## Teste humano pendente

A task aguarda a validação da Fernanda no preview. O teste deve confirmar:

1. acessar `https://nexus-emilia-49529--preview.goskip.app`;
2. abrir o cadastro de cliente e verificar telefone obrigatório e segmentos;
3. verificar que Maternidade inclui chá de bebê e revelação;
4. criar uma oportunidade em Novo, Diagnosticando ou Aguardando dados;
5. conferir os vínculos de origem disponíveis;
6. conferir o modelo de parceiro simples/grupo, contatos e unidades;
7. conferir o cadastro de eventos e os campos específicos;
8. confirmar que os registros anteriores continuam acessíveis.

A F1-T002 não deve ser considerada concluída antes desse teste humano.
