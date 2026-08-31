# Matriz incremental de papéis — Fase 1

**Task:** F1-T010  
**SPEC:** SPEC-1-004  
**Versão:** 1.0 — escopo da Fase 1  
**Aprovadora:** Fernanda, CEO  
**Data:** 2026-08-31

## Objetivo

Registrar somente os acessos necessários para as funções existentes na Fase 1. Esta matriz é provisória e será ampliada quando novas funcionalidades forem construídas. O que ainda não existe não é liberado por antecipação.

## Papéis e ações atuais

| Papel | Pode fazer agora | Não pode fazer agora |
|---|---|---|
| Atendimento | criar e editar briefing; consultar catálogo; selecionar item aprovado; registrar pendência | aprovar item de catálogo; alterar configurações; liberar produção |
| Gestão | consultar registros; revisar catálogo; aprovar/inativar item; consultar histórico | liberar produção ou acessar funções ainda não existentes |
| Financeiro | consultar identidade e pedido quando necessário | alterar briefing, catálogo ou status operacional |
| Produção | consultar briefing e opções aprovadas | alterar cliente, briefing ou fila; liberar produção nesta fase |
| Cliente/externo | fornecer dados pelo canal autorizado | acessar o sistema interno ou consultar auditoria |

## Regras provisórias

1. Usuário só recebe acesso às ações já implementadas e necessárias ao seu papel.
2. Funcionalidade futura começa bloqueada até ser analisada e incluída na matriz.
3. Nenhuma definição desta matriz libera produção, estoque, preço, desconto, frete ou integração externa.
4. A matriz será revisada quando uma nova task criar uma ação ou dado relevante.
5. A matriz não substitui a prova técnica de RLS e auditoria; ela define o que deverá ser testado.

## Veredito da T010

- **Matriz inicial:** definida para a Fase 1.
- **Escopo futuro:** deliberadamente não definido e não necessário para esta task.
- **Capacidade técnica atual:** RLS por papel e auditoria completa ainda precisam ser configurados e testados na T011/T012.
- **Decisão de segurança:** enquanto a capacidade não for comprovada, não liberar acesso real além do escopo atual autenticado.
- **B1-SEC-01:** resolvida quanto ao escopo da matriz; permanece como dependência técnica para a configuração e os testes seguintes.
