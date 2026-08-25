# Debug Summary — F1-T002 — Login no preview

- **Data**: 2026-08-25
- **Sintoma**: Fernanda informou que o preview continuava igual e não permitia login.
- **Reprodução**: preview abriu em `/login`; ao usar `fernanda@emiliabemcasados.local` e `Emilia@2026`, a API respondeu 400 `Failed to authenticate` e a tela permaneceu no login.
- **Evidência**: log de request do Skip Cloud registrou `POST /api/collections/users/auth-with-password` com status 400.
- **Causa raiz**: as contas de homologação não estavam disponíveis com credenciais válidas. A primeira migração tentou criar senha como campos comuns; a migração posterior de correção só ajustava registros existentes e não garantia a criação da conta.
- **Correção**: criada a migração `pocketbase/migrations/0004_criar_contas_homologacao.js`, idempotente, que localiza ou cria Fernanda, Mara e Anie, usa `setPassword('Emilia@2026')` e marca as contas como verificadas.
- **Verificação automática**: versão 0.0.9; setup, análise estática, build, integrações e testes passaram.
- **Verificação no navegador**: login de Fernanda realizado com sucesso; URL mudou para `/`; painel exibiu “Olá, Fernanda”, “Painel de Controle”, Clientes, Oportunidades e Pendências.
- **Produção**: não publicada nem alterada.
- **Escopo preservado**: nenhuma coleção existente foi apagada; a correção tratou somente o acesso de homologação.
