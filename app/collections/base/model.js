import mongoose from 'mongoose';
import { buildSchema } from '../../lib/schema';
import { AggregateBuilder } from '../../lib/listing';

import { Models } from '../index';
import Route from './route';

export default class Model {
  constructor(collection, setting) {
    this.collection = collection;
    this.route = new Route(this);

    this.user = null;

    const { schema, fieldsToDisplay } = setting;

    this.schema = [
      ...schema,
      {
        field: 'created_at',
        title: '建立時間',
        type: 'date'
      },
      {
        field: 'updated_at',
        title: '更新時間',
        type: 'date'
      },
      {
        field: 'created_by',
        title: '建立者',
        type: 'text'
      },
      {
        field: 'update_at',
        title: '更新者',
        type: 'text'
      }
    ];
    this.Model = mongoose.model(collection, new mongoose.Schema(buildSchema(schema)));

    this.aggregateBuilder = new AggregateBuilder(this.Model, fieldsToDisplay);
    this.fieldsToDisplay = fieldsToDisplay;
  }

  get selectLabel() {
    const label = this.schema.find((item) => item.is_select_label);

    return label?.field || '_id';
  }

  async insertOne({ data, metadata }) {
    try {
      console.log(`Inserting data for collection ${this.collection}: ${JSON.stringify(data)}`);

      const _doc = await this.Model.create({
        ...data,
        created_by: this.user ? new mongoose.Types.ObjectId(this.user) : null
      });
      if (_doc) {
        Models.Log.insertOne({
          data: {
            collection: this.collection,
            action: 'INSERT',
            doc: _doc
          }
        });
        return { _doc };
      }
      return {
        err: 'Failed to insert entity, something went wrong...'
      };
    } catch (err) {
      console.error(`Failed to insert, reason: ${err}`);
      return {
        err
      };
    }
  }

  async updateOne({ filter, data, metadata }) {
    try {
      console.log(`Update data for collection ${this.collection}: ${JSON.stringify(data)}`);

      const old_doc = await this.Model.findOne(filter).lean();

      const _doc = await this.Model.findOneAndUpdate(
        filter,
        { ...data, updated_by: new mongoose.Types.ObjectId(this.user) },
        {
          new: true,
          upsert: true,
          ...metadata
        }
      );
      if (_doc) {
        Models.Log.insertOne({
          data: {
            collection: this.collection,
            action: 'UPDATE',
            doc: _doc,
            old_doc,
            ...metadata
          }
        });
        return { _doc };
      }
      return {
        err: 'Failed to insert entity, something went wrong...'
      };
    } catch (err) {
      console.error(`Failed to insert, reason: ${err}`);
      return {
        err
      };
    }
  }

  async deleteOne({ filter, metadata }) {
    try {
      console.log(`Delete data for collection ${this.collection}: ${JSON.stringify(filter)}`);

      const old_doc = await this.Model.findOne(filter).lean();

      const _doc = await this.Model.findOneAndRemove(filter);
      if (_doc) {
        Models.Log.insertOne({
          data: {
            collection: this.collection,
            action: 'DELETE',
            old_doc,
            ...metadata
          }
        });
        return { _doc };
      }
      return {
        err: 'Failed to delete entity, something went wrong...'
      };
    } catch (err) {
      console.error(`Failed to delete, reason: ${err}`);
      return {
        err
      };
    }
  }

  async listing() {}
}
