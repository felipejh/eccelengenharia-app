const ChecklistsSchema = {
  name: 'Checklists',
  primaryKey: 'id',
  properties: {
    id: 'int',
    item_conferir: 'string',
    tolerancia: 'string',
    ativo: 'int',
    createdAt: 'string',
    updatedAt: 'string?',
    gruposapontamentoId: 'int',
    usuarioCreateId: 'int',
    usuarioUpdateId: 'int?',
  },
};

export default ChecklistsSchema;
