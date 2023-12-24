import { setting } from '../../lib/permission';

export const permissions = setting;

export const schema = [
  {
    field: 'username',
    title: 'Username',
    type: 'text',
    is_required: true,
    is_select_label: true
  },
  {
    field: 'password',
    title: 'Password',
    type: 'text',
    is_required: true,
    is_password: true
  },
  {
    field: 'display_name',
    title: 'Display Name',
    type: 'text',
    is_required: false
  },
  {
    field: 'is_admin',
    title: 'Is Admin',
    type: 'boolean',
    default: true
  },
  {
    field: 'selfie',
    title: '個人相片',
    type: 'relation',
    foreign: 'file',
    foreign_label: '_id',
    placeholder: '照片: ',
    file_type: 'image'
  },
  {
    field: 'birthday',
    title: '生日',
    type: 'date'
  },
  {
    field: 'gender',
    title: '性別',
    type: 'text',
    input_type: 'radio',
    radio_options: [
      {
        _id: 'male',
        label: '男'
      },
      {
        _id: 'female',
        label: '女'
      }
    ]
  },
  {
    field: 'permissions_read',
    title: '讀取權限',
    type: 'text',
    is_multiple: true,
    checkbox: setting.map((item) => item.key),
    default: ['*']
  },
  {
    field: 'permissions_write',
    title: '寫入權限',
    type: 'text',
    is_multiple: true,
    checkbox: setting.map((item) => item.key),
    default: ['*']
  }
];

export const fieldsToDisplay = [
  {
    page: 'listing',
    fields: ['username', 'password', 'display_name', 'birthday', 'is_admin']
  },
  {
    page: 'get',
    fields: [
      'username',
      'password',
      'display_name',
      'is_admin',
      'permissions_read',
      'permissions_write',
      'selfie',
      'birthday',
      'gender'
    ]
  }
];
