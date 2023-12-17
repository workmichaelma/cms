// import { Router } from 'express';
import Route from '../base/route';

export default class UserRoute extends Route {
  constructor(model) {
    super(model);

    this.routes.get('/current-user', async (req, res) => {
      try {
        await this.model.refreshUser(req);

        if (req?.session?.user?._id) {
          return req.session.user;
        }

        return null;
      } catch (err) {
        console.error(`Failed to get current user, error: ${err}`);
        return null;
      }
    });

    this.routes.get('/permissions', async (req, res) => {
      return this.model.permissions.map((item) => {
        return {
          _id: item.key,
          label: item.title,
          type: item.type
        };
      });
    });

    this.routes.post('/login', async (req, res) => {
      const { username, password } = req.body || {};
      const user = await this.model.login({ username, password });

      if (user && user?._id && !user.error) {
        console.log(`${username} logged in.`);
        await this.model.refreshUser(req, user);
        return {
          logined: true
        };
      }
      console.log(`${username} faied to login.`);

      return user;
    });

    this.routes.post('/register', async (req, res) => {
      const { username, password, display_name, is_admin } = req.body || {};

      return this.model.register({ username, password, display_name, is_admin });
    });
  }

  async getEntity({ _id, fieldsToDisplay }) {
    try {
      const { data, metadata } = await super.getEntity({
        _id,
        fieldsToDisplay,
        populate: [
          {
            path: 'selfie',
            model: 'file'
          }
        ]
      });

      return {
        data: {
          ...data,
          password: this.model.decryptPassword(data.password)
        },
        metadata
      };
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async editEntity({ data, filter, metadata }) {
    try {
      if (data?.password) {
        return super.editEntity({
          data: {
            ...data,
            password: this.model.encryptPassword(data.password)
          },
          filter,
          metadata
        });
      } else {
        return super.editEntity({ data, filter, metadata });
      }
    } catch (err) {
      return null;
    }
  }
  async register(data) {}

  async listing(req) {
    const aggregateBuilder = this.model.aggregateBuilder;
    const fieldsToDisplay = this.getFieldsToDisplay('listing');

    aggregateBuilder.init({
      req,
      settings: {
        fieldsToDisplay
      }
    });

    await aggregateBuilder.exec();

    aggregateBuilder.records = aggregateBuilder.records.map((record) => ({
      ...record,
      password: this.model.decryptPassword(record.password)
    }));

    const result = aggregateBuilder?.result || {};

    return {
      result,
      fieldsToDisplay,
      schema: this.model.schema
    };
  }
}
