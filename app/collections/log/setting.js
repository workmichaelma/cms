export const schema = [
  {
    field: 'database',
    title: 'Database',
    type: 'text',
    is_required: true
  },
  {
    field: 'action',
    title: 'Action',
    type: 'text',
    is_required: false
  },
  {
    field: 'doc_id',
    title: 'ID',
    type: 'text'
  },
  {
    field: 'new_doc',
    title: 'New Doc',
    type: 'text'
  },
  {
    field: 'old_doc',
    title: 'Old Doc',
    type: 'text'
  }
];

export const fieldsToDisplay = [
  {
    page: 'listing',
    fields: ['collection_name', 'operation', 'doc_id', 'created_by', 'created_at']
  }
];
