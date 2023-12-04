export const setting = [
  {
    key: 'page-user',
    title: '用戶',
    type: 'page'
  },
  {
    key: 'page-log',
    title: 'Log',
    type: 'page'
  }
];

export class Permission {
  constructor(user) {
    this.setting = setting;
    this.userReadPermission = user.permission_read;
    this.userWritePermission = user.permission_write;
  }

  get permissions() {
    return this.setting.map((item) => item.key);
  }

  isReadable(key) {
    return this.userReadPermission.includes('*') || this.userReadPermission.includes(key);
  }

  isWritable(key) {
    return this.userWritePermission.includes('*') || this.userWritePermission.includes(key);
  }
}
