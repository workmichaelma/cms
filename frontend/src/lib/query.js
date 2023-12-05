import qs from 'query-string';
export const queryOpMap = {
  eq: '=',
  gt: '>',
  lt: '<',
  gte: '>=',
  lte: '<=',
  regex: '~=',
  ne: '!='
};

export const urlStringToObj = (url) => {
  const { filters, sort, page = 1, pageSize = 50, ...rest } = qs.parse(url);
  let _filters = [];

  if (filters) {
    filters.split(',').forEach((filter) => {
      const [field, value] = filter.split('^');
      const operator = value.startsWith('=')
        ? 'eq'
        : value.startsWith('>')
        ? 'gt'
        : value.startsWith('>=')
        ? 'gte'
        : value.startsWith('<')
        ? 'lt'
        : value.startsWith('<=')
        ? 'lte'
        : value.startsWith('~=')
        ? 'regex'
        : 'eq';
      const parsedValue =
        value.startsWith('>=') || value.startsWith('<=') || value.startsWith('~=')
          ? value.slice(2)
          : value.startsWith('=') || value.startsWith('<') || value.startsWith('>')
          ? value.slice(1)
          : value;
      _filters.push({ field, op: operator, value: parsedValue });
    });
  }

  return { filters: _filters, page: parseInt(page), pageSize: parseInt(pageSize), sort, ...rest };
};

export const urlObjToString = (urlObject) => {
  const { filters, sort, page, pageSize, ...rest } = urlObject;
  let queryString = '';

  if (filters && filters.length > 0) {
    const filterStrings = filters.map((filter) => {
      const { field, op, value } = filter;

      let filterString = `${field}^`;

      switch (op) {
        case 'eq':
          filterString += `=${value}`;
          break;
        case 'gt':
          filterString += `>${value}`;
          break;
        case 'gte':
          filterString += `>=${value}`;
          break;
        case 'lt':
          filterString += `<${value}`;
          break;
        case 'lte':
          filterString += `<=${value}`;
          break;
        case 'regex':
          filterString += `~=${value}`;
          break;
        default:
          filterString += `=${value}`;
      }

      return filterString;
    });

    queryString += `filters=${filterStrings.join(',')}`;
  }

  if (sort) {
    if (queryString) queryString += '&';
    queryString += `sort=${sort}`;
  }

  if (page) {
    if (queryString) queryString += '&';
    queryString += `page=${page}`;
  }

  if (pageSize) {
    if (queryString) queryString += '&';
    queryString += `pageSize=${pageSize}`;
  }

  const queryParams = qs.stringify(rest, { encode: false });

  if (queryParams) {
    queryString += queryParams;
  }

  return queryString;
};
