# Recibo F2-T004 — Retenção, formato e acesso de comprovantes

**Status:** contrato funcional formalizado; implementação técnica ainda não realizada
**Data:** 2026-09-10
**Dona da decisão:** Fernanda

## B2-FIN-02 aprovado

### Arquivos aceitos

- PDF
- JPG/JPEG
- PNG

### Limites

- Até 10 MB por arquivo.
- Até 3 arquivos por pagamento.
- Arquivo fora do formato ou do limite deve ser recusado com mensagem clara.
- Não receber comprovantes reais nesta task.

### Retenção e histórico

- Não há prazo automático de retenção definido.
- O sistema não deve excluir comprovantes automaticamente.
- A substituição cria nova versão.
- A versão anterior permanece preservada para histórico e auditoria.
- Não há sobrescrita ou exclusão destrutiva pela equipe.

### Permissões

| Papel | Comprovantes | Pagamento/status | Limites |
|---|---|---|---|
| Atendimento | Pode incluir e consultar comprovantes dos pedidos sob sua responsabilidade | Pode consultar status financeiro do pedido | Não edita pagamento confirmado, não confirma, não exclui e não abona dívida |
| Financeiro | Pode consultar e conferir | Pode marcar conferido ou divergente conforme permissão | Não deve apagar histórico |
| Administrador | Acesso administrativo conforme alçada | Pode atuar nas exceções autorizadas | Toda exceção deve ser auditada |
| Produção | Sem acesso | Sem acesso | Recebe apenas dados operacionais necessários |
| Cliente/externo | Não acessa sistema interno | Não acessa sistema interno | Fornece dados pelo canal autorizado |

### Alteração de pagamento

Quando a cliente trocar a forma de pagamento:

1. o pagamento confirmado não é editado;
2. os valores já pagos permanecem preservados;
3. o plano de pagamento recebe uma nova versão;
4. parcelas, datas e forma de pagamento futura são registradas na nova versão;
5. autor, motivo e data da alteração ficam no histórico.

### Fora do escopo

- Integração Stone, Pix ou conciliação bancária.
- Política técnica definitiva de armazenamento e LGPD.
- Exclusão manual excepcional e seu fluxo operacional detalhado.
- Relatórios de total de vendas, comparativo mensal, férias e atribuição de pedidos compartilhados.
- Recebimento de arquivo real.
- Liberação de produção.

## Evidência esperada nas tasks de construção

- formatos, tamanho e quantidade inválidos são bloqueados;
- três arquivos válidos são aceitos e o quarto é recusado;
- substituição preserva a versão anterior;
- Atendimento consegue incluir/consultar, mas ações proibidas são bloqueadas;
- Produção não consegue consultar comprovantes ou dados financeiros;
- pagamento confirmado não pode ser editado;
- mudança de forma de pagamento cria versão sucessora;
- nenhuma exclusão automática ocorre sem política posterior;
- acessos ficam auditáveis e protegidos por RLS.

## Resultado da task

A F2-T004 entrega o contrato funcional B2-FIN-02. A implementação, a política técnica de armazenamento e os critérios CA-2-101 a CA-2-106 permanecem para as tasks de construção e regressão.
