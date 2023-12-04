import { isEmpty, map, reduce } from 'lodash';
import { parseQuery } from './query';

export class AggregateBuilder {
  constructor(model) {
    this.model = model;
  }
  init(props) {
    this.pipeline = [];
    this.fieldsToDisplay = [];

    this.page = 1;
    this.pageSize = 50;
    this.sort = null;
    this.sortOrder = null;

    this.projectionPipeline = [];
    this.searchPipeline = [];
    this.customFilterFields = [];
    this.filters = [];

    this.records = null;
    this.metadata = null;

    const { settings, options, req } = props;

    if (req) {
      const { filters, page, pageSize, sort } = parseQuery(req);

      if (filters) this.filters = filters;
      if (page) this.page = page;
      if (pageSize) this.pageSize = pageSize;
      if (sort) this.sort = sort;
    }

    if (options) {
      const { filters, page, pageSize, sort } = options;

      if (filters) this.filters = filters;
      if (page) this.page = page;
      if (pageSize) this.pageSize = pageSize;
      if (sort) this.sort = sort;
    }

    if (settings) {
      const { customFilterFields, fieldsToDisplay, searchPipeline, projectionPipeline, sortObj } = settings;

      if (fieldsToDisplay) this.fieldsToDisplay = fieldsToDisplay;
      if (customFilterFields) this.customFilterFields = customFilterFields;
      if (searchPipeline) this.searchPipeline = searchPipeline;
      if (projectionPipeline) this.projectionPipeline = projectionPipeline;
      if (sortObj) this.sortObj = sortObj;
    }
  }

  buildPipeline() {
    try {
      let pipeline = [];
      const skip = (this.page - 1) * this.pageSize;
      const limit = this.pageSize;

      if (!isEmpty(this.filters)) {
        const filters = reduce(
          this.filters,
          (prev, curr) => {
            const key = Object.keys(curr);
            if (!this.customFilterFields.includes(key)) {
              prev[key] = curr[key];
            }
            return prev;
          },
          {}
        );
        pipeline.push({
          $match: {
            $and: map(filters, (filter, key) => {
              console.log({ key, filter });
              return { [key]: filter };
            })
          }
        });
      }
      if (!isEmpty(this.searchPipeline)) {
        pipeline = [...pipeline, ...this.searchPipeline];
      }
      const projection = this.fieldsToDisplay.reduce((fields, field) => {
        fields[field] = `$${field}`;
        return fields;
      }, {});
      this.projectionPipeline.push({
        $project: projection
      });

      if (this.sort || this.sortObj) {
        let sortObj = this.sortObj;
        if (this.sort) {
          const [first, second] = this.sort.split('-');
          const order = second ? -1 : 1;
          sortObj = {
            [second || first]: order
          };
        }
        pipeline.push({
          $facet: {
            records: [...this.projectionPipeline, { $sort: sortObj }, { $skip: skip }, { $limit: limit }],
            totalCount: [{ $count: 'count' }]
          }
        });
      } else {
        pipeline.push({
          $facet: {
            records: [
              {
                $sort: {
                  createdAt: -1
                }
              },
              { $skip: skip },
              { $limit: limit },
              ...this.projectionPipeline
            ],
            totalCount: [{ $count: 'count' }]
          }
        });
      }

      this.pipeline = pipeline;
    } catch (err) {
      console.error(`Failed to build pipeline, err: ${err}`);
    }
  }

  async exec() {
    try {
      this.buildPipeline();

      const result = await this.model.aggregate(this.pipeline);
      if (result) {
        const [{ records, totalCount }] = result || {};

        const count = !isEmpty(records) ? totalCount[0]?.count : 0;

        this.records = records;
        this.metadata = {
          total: count,
          page: this.page,
          pageSize: this.pageSize,
          hasNextPage: (this.page - 1) * this.pageSize + records?.length < count,
          hasPrevPage: this.page > 1,
          pipeline: this.pipeline,
          totalPage: Math.ceil(count / this.pageSize)
        };
      } else {
        console.log(`Fail to get aggregation result.`);
        return [];
      }
    } catch (err) {
      console.error(`Failed to exec aggregation, err: ${err}`);
      return [];
    }
  }

  get result() {
    return {
      records: this.records,
      metadata: this.metadata
    };
  }
}
