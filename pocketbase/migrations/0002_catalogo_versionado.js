migrate(
  (app) => {
    const auth = app.findCollectionByNameOrId('_pb_users_auth_')

    const catalogo = new Collection({
      name: 'catalogo_itens',
      type: 'base',
      listRule: '@request.auth.id != ""',
      viewRule: '@request.auth.id != ""',
      createRule: '@request.auth.id != ""',
      updateRule: '@request.auth.id != ""',
      deleteRule: null,
      fields: [
        { name: 'codigo', type: 'text', required: false },
        { name: 'categoria', type: 'select', values: ['produto', 'sabor', 'papel', 'cor_papel', 'tecido', 'fita', 'largura_fita', 'cor_fita', 'modelo_laco', 'acessorio', 'caixinha', 'modelo_sem_fita', 'outro'], required: true, maxSelect: 1 },
        { name: 'nome', type: 'text', required: true },
        { name: 'tipo', type: 'text', required: false },
        { name: 'variante', type: 'text', required: false },
        { name: 'cor', type: 'text', required: false },
        { name: 'largura', type: 'text', required: false },
        { name: 'display_label', type: 'text', required: true },
        { name: 'source_document', type: 'text', required: false },
        { name: 'source_version', type: 'text', required: false },
        { name: 'source_locator', type: 'text', required: false },
        { name: 'review_status', type: 'select', values: ['rascunho', 'aprovado', 'conflito', 'inativo'], required: true, maxSelect: 1 },
        { name: 'reviewed_by', type: 'relation', required: false, collectionId: auth.id, cascadeDelete: false, maxSelect: 1 },
        { name: 'reviewed_at', type: 'date', required: false },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: [
        'CREATE INDEX idx_catalogo_categoria ON catalogo_itens (categoria)',
        'CREATE INDEX idx_catalogo_codigo ON catalogo_itens (codigo)',
        'CREATE INDEX idx_catalogo_status ON catalogo_itens (review_status)',
      ],
    })
    app.save(catalogo)
  },
  (app) => {
    try { app.delete(app.findCollectionByNameOrId('catalogo_itens')) } catch (e) {}
  },
)
