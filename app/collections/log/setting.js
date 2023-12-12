export const schema = [
  {
    field: 'database',
    title: '資料庫',
    type: 'text',
    is_required: true
  },
  {
    field: 'action',
    title: '操作',
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
    fields: ['database', 'action', 'doc_id', 'created_by', 'created_at']
  },
  {
    page: 'get',
    fields: ['database', 'action', 'doc_id', 'new_doc', 'old_doc']
  }
];
