import qs from 'qs';
import Routes from '../../router';

import { compact, isEmpty, isFunction, find, pick, reduce } from 'lodash';
import { parseQuery } from '../../lib/query';
import { parseJSONToCSV } from '../../lib/csv';

export default class Route {
  constructor(model) {
    const routes = new Routes();
    this.model = model;
    this.routes = routes;

    this.routes.get('/schema', (req, res) => {
      return this.model.schema;
    });

    this.routes.get('/get/:_id', async (req, res) => {
      const { metadata } = qs.parse(req?.query);
      const { _id } = req.params;

      const fieldsToDisplay = this.getFieldsToDisplay('get');
      const data = (await this.getEntity({ _id, fieldsToDisplay })) || {};
      return {
        ...data,
        fieldsToDisplay
      };
    });

    this.routes.get('/listing', async (req, res) => {
      return this.listing(req);
    });

    this.routes.put('/edit/:_id', async (req, res) => {
      const { _id } = req.params;
      const data = req.body || {};

      return this.editEntity({ data, filter: { _id }, metadata: {} });
    });

    this.routes.delete('/delete/:_id', async (req, res) => {
      const { _id } = req.params;

      return this.deleteEntity({ filter: { _id }, metadata: {} });
    });

    this.routes.get('/select', async (req, res) => {
      const { label, filters, sort } = parseQuery(req);
      console.log(label, filters, sort);

      return this.getSelectList({ label, filters, sort });
    });

    this.routes.post('/import', async (req, res) => {
      return this.import(req.body);
    });

    this.routes.get('/field/:field', async (req, res) => {
      const { field } = req.params;
      return this.getDistinctField(field);
    });

    this.routes.get(
      '/listing-csv',
      async (req, res) => {
        try {
          const result = await this.listingCsv(req);

          if (result) {
            return parseJSONToCSV(result.records);
          }
          return [];
        } catch (err) {
          console.error(`Failed to parse CSV file: ${err}`);
          return [];
        }
      },
      { sendCsv: true }
    );
  }

  getFieldsToDisplay(page) {
    return this.model?.fieldsToDisplay?.find((pages) => pages.page === page)?.fields || [];
  }

  async getEntity({ _id, fieldsToDisplay, populate = [] }) {
    try {
      const record = await this.model.Model.findOne({ _id }).populate([
        { path: 'updated_by', model: 'user' },
        { path: 'created_by', model: 'user' },
        ...populate
      ]);

      const data = reduce(
        pick(record, fieldsToDisplay),
        (output, value, key) => {
          output[key] = value;
          const schema = find(this.model.schema, { field: key });
          if (schema) {
            if (schema?.foreign === 'file') {
              output[key] = {
                _id: value?._id,
                filename: value?.filename,
                mimetype: value?.mimetype
              };
            }
          }
          return output;
        },
        {}
      );

      return {
        data,
        metadata: {
          status: record?.status,
          updated_at: record?.updated_at,
          updated_by: record?.updated_by?.username,
          created_at: record?.created_at,
          created_by: record?.created_by?.username
        }
      };
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async editEntity({ data, filter, metadata }) {
    try {
      const record = await this.model.updateOne({ filter, data });

      return record;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async deleteEntity({ filter, metadata }) {
    try {
      const record = await this.model.deleteOne({ filter });

      return record;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async listing(req) {
    const aggregateBuilder = this.model.aggregateBuilder;

    aggregateBuilder.init({
      req,
      settings: {
        fieldsToDisplay: this.getFieldsToDisplay('listing')
      }
    });

    await aggregateBuilder.exec();

    const result = aggregateBuilder?.result || {};
    const fieldsToDisplay = this.getFieldsToDisplay('listing');

    return {
      result,
      fieldsToDisplay,
      schema: this.model.schema
    };
  }

  async getSelectList(options) {
    const { filters = {}, sort = { _id: -1 }, label = this.model.selectLabel } = options;
    try {
      const _filters = !isEmpty(filters)
        ? filters.reduce((prev, value) => {
            const key = Object.keys(value);
            prev[key] = value[key];
            return prev;
          }, {})
        : {};
      const records = await this.model.Model.find(_filters).sort(sort);

      if (records) {
        return records.map((record) => ({
          _id: record?._id,
          label: record[label]
        }));
      } else {
        return [];
      }
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  async import(body) {
    return body;
  }

  async getDistinctField(field) {
    try {
      const result = await this.model.Model.distinct(field);

      if (result) {
        return compact(result).map((r) => {
          return {
            _id: r,
            label: r
          };
        });
      }
      return [];
    } catch (err) {
      console.error(`Failed to getDistinctField, err: ${err}`);
      return [];
    }
  }

  async listingCsv(req) {
    return this.listing(req);
  }
}
