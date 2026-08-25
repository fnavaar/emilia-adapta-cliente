# Debug Summary — F1-T002 — Campos condicionais

- **Task e problema**: F1-T002; o campo Nome dos Noivos permanecia visível independentemente do segmento selecionado.
- **Reprodução**: o formulário antigo renderizava `nome_noivos` sempre. Após a correção, login no preview foi reproduzido com sucesso e o formulário abriu.
- **Causa raiz confirmada**: `src/pages/NovoCliente.tsx` mantinha o campo fixo e usava as opções antigas de segmento, sem renderização condicional.
- **Correção**: migração 0005 adicionou campos de apoio; `NovoCliente.tsx` passou a mostrar os campos conforme o segmento:
  - Casamento / Noiva: Nome dos Noivos.
  - Eventos sociais: Nome do Aniversariante e Nome do Casal.
  - Maternidade: Nome do Bebê.
  - Corporativo: Empresa e contato principal.
  - Cerimonialista: Empresa e contato obrigatórios.
  - Revenda / Parceiros: Grupo ou empresa.
  - Presentes: Pessoa presenteada.
  - Outros: Tipo e descrição do evento obrigatórios.
  - Consumo próprio: nenhum campo adicional.
- **Verificação automática**: versão 0.0.10; setup, análise estática, build, integrações e testes passaram.
- **Verificação no navegador**: login de Fernanda abriu o painel; no cadastro, Casamento / Noiva exibiu Nome dos Noivos e Eventos sociais exibiu os campos próprios. O campo não ficou fixo.
- **Produção**: não publicada nem alterada.
- **Gate atual**: aguardando teste humano final da Fernanda.
