import Model from '../base/model';
import Route from './route';
import * as setting from './setting';

export default class LogModel extends Model {
  constructor() {
    super('log', setting);
    this.route = new Route(this);
  }

  async on9() {
    return this.collection + 'on99';
  }

  async insertOne({ data }) {
    try {
      console.log(`Inserting Collection[${data.collection}] log`);

      const action = data?.action;

      const _doc = await this.Model.create({
        action,
        created_by: this.user,
        database: data?.collection,
        doc_id: data?.doc?._id,
        new_doc: data?.doc ? JSON.stringify(data.doc) : '',
        old_doc: data?.old_doc ? JSON.stringify(data.old_doc) : '',
        is_import: data?.is_import
      });
      if (_doc) {
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
}
