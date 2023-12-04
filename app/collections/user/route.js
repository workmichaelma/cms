// import { Router } from 'express';
import { decrypt, encrypt } from '../../lib/crypto';
import mongoose from 'mongoose';
import Route from '../base/route';

// const router = Router();

export default class UserRoute extends Route {
  constructor(model) {
    super(model);

    this.routes.get('/current-user', async (req, res) => {
      try {
        const userId = this.model.user;

        if (userId) {
          const record = await this.model.Model.findOne({ _id: new mongoose.Types.ObjectId(userId) }).lean();

          if (record) {
            return {
              _id: record._id,
              status: record.status,
              username: record.username,
              permissions: record.permissions,
              is_admin: record.is_admin
            };
          }
          return null;
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
      console.log(req.body);
      const { username, password } = req.body || {};
      const user = await this.model.login({ username, password });

      if (user && user?._id && !user.error) {
        req.session.user = {
          _id: user._id,
          username: user.username,
          is_admin: user.is_admin,
          logged_in: true
        };

        return {
          logined: true
        };
      }

      return user;
    });

    this.routes.post('/register', async (req, res) => {
      const { username, password, display_name, is_admin } = req.body || {};

      return this.model.register({ username, password, display_name, is_admin });
    });
  }

  async getEntity({ _id, fieldsToDisplay }) {
    try {
      const { data, metadata } = await super.getEntity({ _id, fieldsToDisplay });

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
