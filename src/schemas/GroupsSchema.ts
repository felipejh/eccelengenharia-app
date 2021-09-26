const GroupsSchema = {
  name: 'Groups',
  primaryKey: 'id',
  properties: {
    id: 'int',
    titulo: 'string',
    ativo: 'int',
    createdAt: 'string?',
    updatedAt: 'string?',
    usuarioCreateId: 'int?',
    usuarioUpdateId: 'int?',
  },
};

export default GroupsSchema;
