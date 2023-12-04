import { decrypt, encrypt } from '../../lib/crypto';
import Model from '../base/model';
import Route from './route';
import * as setting from './setting';

export default class UserModel extends Model {
  constructor() {
    super('user', setting);
    this.route = new Route(this);

    this.permissions = setting.permissions;
  }

  decryptPassword(password) {
    return decrypt(password);
  }

  encryptPassword(password) {
    return encrypt(password);
  }

  async register(data) {
    const { username, password, ..._data } = data;
    try {
      if (!username || !password) {
        throw new Error('Failed to register, username and password are required');
      } else {
        const doc = await this.Model.findOne({ username });
        if (doc) {
          throw new Error('Failed to register, user already registered');
        }

        const { _doc } = await this.insertOne({
          data: {
            username,
            password: encryptPassword(password),
            ..._data
          }
        });

        return _doc;
      }
    } catch (err) {
      console.error(`<${username}> Failed to register, reason: ${err}`);
    }
  }

  async login({ username, password }) {
    try {
      const doc = await this.Model.findOne({ username });

      if (!doc) {
        throw new Error('User not found!');
      } else {
        const { _doc } = doc;
        if (_doc.status === true) {
          if (this.decryptPassword(_doc.password) === password) {
            console.log(`User <${_doc.username}> logged in`);
            return _doc;
          }
        } else {
          throw new Error('status is false');
        }
        throw new Error('Password is incorrect');
      }
    } catch (err) {
      console.error(`<${username}> Failed to login, reason: ${err}`);
      if (err?.stack) {
        return {
          error: err.message
        };
      }
      return null;
    }
  }
}
