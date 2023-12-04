export const urlParseToObj = (url) => {
  const { filters, sort, page = 1, pageSize = 50, ...rest } = qs.parse(req?.query);
  let _filters = [];

  if (filters) {
    filters.split(',').forEach((filter) => {
      const [field, value] = filter.split('^');
      const operator = value.startsWith('=')
        ? '$eq'
        : value.startsWith('>')
        ? '$gt'
        : value.startsWith('>=')
        ? '$gte'
        : value.startsWith('<')
        ? '$lt'
        : value.startsWith('<=')
        ? '$lte'
        : value.startsWith('~=')
        ? '$regex'
        : '$eq';
      const _parsedValue =
        value.startsWith('>=') || value.startsWith('<=') || value.startsWith('~=')
          ? value.slice(2)
          : value.startsWith('=') || value.startsWith('<') || value.startsWith('>')
          ? value.slice(1)
          : value;
      const parsedValue =
        _parsedValue === 'true'
          ? true
          : _parsedValue === 'false'
          ? false
          : operator === '$regex'
          ? new RegExp(_parsedValue, 'i')
          : _parsedValue;
      _filters.push({ [field]: { [operator]: parsedValue } });
    });
  }

  return { filters: _filters, page: parseInt(page), pageSize: parseInt(pageSize), sort, ...rest };
};
