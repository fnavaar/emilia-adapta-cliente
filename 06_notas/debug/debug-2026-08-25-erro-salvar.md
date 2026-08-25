# Debug Summary — F1-T002 — Erro ao salvar e ajuste de campos

- **Sintoma**: cadastro de cerimonialista retornava erro 400 "Failed to create record"; campo "Segmento" deveria ser "Tipo de Cliente" e ficar primeiro.
- **Causa**: o formulário antigo misturava estados complexos e mantinha campos desnecessários; além disso, enviava telefones formatados para o banco.
- **Correção**: reescrevi o formulário com estados individuais, renomeei o campo para "Tipo de Cliente", movi para o topo, envio de telefones apenas com dígitos e melhorei a validação antes do envio.
- **Telefone**: Brasil (+55) é o padrão; dígitos são enviados ao banco sem formatação.
- **Cerimonialista**: não repete o nome da empresa; empresa é preenchida automaticamente a partir do nome do cliente.
- **Verificação automática**: versão 0.0.13; QA completo OK.
- **Verificação no navegador**: Romy Godoy Assessoria salva com sucesso; painel mostrou 2 clientes.
- **Produção**: não publicada nem alterada.
- **Gate atual**: aguardando teste humano final.
