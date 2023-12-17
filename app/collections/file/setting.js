import { setting } from '../../lib/permission';

export const permissions = setting;

export const schema = [
  {
    field: 'filename',
    type: 'text'
  },
  {
    field: 'name',
    title: '檔案名稱',
    type: 'text'
  },
  {
    field: 'url',
    type: 'text'
  },
  {
    field: 'size',
    title: '檔案大小',
    type: 'text'
  },
  {
    field: 'mimetype',
    title: 'MIMEType',
    type: 'text'
  }
];

export const fieldsToDisplay = [
  {
    page: 'listing',
    fields: ['filename', 'name', 'size', 'mimetype']
  },
  {
    page: 'get',
    fields: ['filename', 'name', 'url', 'size', 'mimetype']
  }
];
