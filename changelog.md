# Changelog — Projeto Mara Cristina Amaral Santos - ME

> Registro de tudo que acontece no projeto, em ordem cronológica inversa (mais recente no topo).
> Formato: `- AAAA-MM-DD · [quem] · o que aconteceu`
> **Dúvidas para o consultor** entram como: `- AAAA-MM-DD · [quem] · DÚVIDA: …` — ele responde
> na próxima sincronização.

## Registro

- 2026-08-27 · ETHOS (Bia) · F1-T002 implementada parcialmente conforme especificação funcional validada: migration 0009/0010 criou Pessoas, vínculo Cliente↔Pessoa, Natureza PF/PJ, Classificação única, cadastro progressivo, Origem/Categoria/Referência, vínculos de indicador e cerimonialista, endereços, banco de locais e Canal do Pedido. QA completo 0.0.20 OK; preview verificado. Aguardando teste humano da base.
- 2026-08-27 · Fernanda · Confirmou que, quando a Origem do Cliente for Indicação, a categoria da indicação é obrigatória, com a opção "Não informado". Categorias: profissional do mercado, outra noiva/cliente, parente, amigo/conhecido, outro ou não informado.
- 2026-08-27 · Fernanda · Refinou a regra da Origem por Indicação: primeiro buscar Pessoa/contato existente; se não existir, permitir cadastro mínimo apenas com nome ou referência livre, como "indicação da sogra". Permitir complementar/vincular depois preservando o histórico.
- 2026-08-27 · Fernanda · Enviou a "Especificação Funcional — Base de Cadastro de Clientes do ERP" para validação: modelo com Situação, Natureza PF/PJ, Classificação Comercial, Origem vs Canal do Pedido, Pessoa reaproveitável, endereços, banco de locais, grupos empresariais e cerimonialista. F1-T002 pausada até validação.
- 2026-08-27 · Fernanda · Autorizou prosseguir com a implementação após validar a estrutura e o funcionamento da especificação.
- 2026-08-25 · ETHOS (Bia) · F1-T002 revisada e implementada conforme modelo anterior, posteriormente supersedida pela especificação funcional de 2026-08-27.
- 2026-08-25 · ETHOS (Bia) · F1-T001 concluída: superfície de homologação, dicionário e não-escrita em produção registrados; QA e teste humano aprovados.
- 2026-08-25 · ETHOS (Bia) · Projeto Nexus Emilia configurado com 5 SPECs e 15 tasks da Fase 1; execução sequencial por levas.