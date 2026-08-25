# Debug Summary — F1-T002 — Cadastro de cerimonialista e telefones

- **Sintoma**: nome da empresa era solicitado novamente para cerimonialista; telefones eram texto livre; cadastro retornava erro ao salvar.
- **Causa**: a tela ainda exigia `empresa_nome` para cerimonialista, não tinha máscara/país do telefone e enviava o campo `nome_noivos` sem garantia de existência no schema final.
- **Correção**: migração 0006 restaurou `nome_noivos` para compatibilidade do cadastro de casamento; formulário atualizado para usar o nome do cliente como empresa da cerimonialista sem pedir repetição, validar campos obrigatórios, aplicar máscara brasileira e permitir outro país.
- **Telefone Brasil**: Brasil (+55) é o padrão; telefone brasileiro recebe máscara `(XX) XXXXX-XXXX`.
- **Telefone internacional**: opção Outro país aceita código e número em formato internacional.
- **Verificação automática**: versão 0.0.12; setup, análise estática, build, integrações e testes passaram.
- **Verificação no navegador**: login OK; caso Romy Godoy Assessoria preenchido com telefone principal e contato; segmento Cerimonialista exibiu aviso sem campo duplicado de empresa; telefone exibido com máscara `(11) 99999-9999`; cadastro salvo; dashboard mostrou 1 cliente.
- **Produção**: não publicada nem alterada.
- **Gate atual**: aguardando teste humano final da Fernanda.
