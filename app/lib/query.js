import qs from 'qs';
import { isEmpty } from 'lodash';

export const parseQuery = (req) => {
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
        : value.startsWith('!=')
        ? '$ne'
        : value.startsWith('!~=')
        ? '$nregex'
        : '$eq';

      const text = value.startsWith('!~=')
        ? value.slice(3)
        : value.startsWith('>=') || value.startsWith('<=') || value.startsWith('~=') || value.startsWith('!=')
        ? value.slice(2)
        : value.startsWith('=') || value.startsWith('<') || value.startsWith('>')
        ? value.slice(1)
        : value;

      const parsedValue = parseValue(text, operator);

      if (operator === '$nregex') {
        _filters.push({
          [field]: {
            $not: {
              $regex: parsedValue
            }
          }
        });
      } else {
        switch (parsedValue) {
          case '$$empty':
            if (operator === '$ne') {
              _filters.push({ [field]: { $exists: true } });
            } else {
              _filters.push({ [field]: { $exists: false } });
            }
            break;
          case true:
          case false:
            _filters.push({ [field]: { $eq: parsedValue } });
            break;
          case null:
            _filters.push({ [field]: { $eq: null } });
            break;
          default:
            if (parsedValue) {
              _filters.push({ [field]: { [operator]: parsedValue } });
            }
            break;
        }
      }
    });
  }

  return { filters: _filters, page: parseInt(page), pageSize: parseInt(pageSize), sort, ...rest };
};

const parseValue = (text, operator) => {
  let value = text;

  // [[text]] handle special case
  const specialValuePattern = /^\[\[(.*?)\]\]$/;
  if (specialValuePattern.test(text)) {
    const extractText = text.match(specialValuePattern);

    if (extractText?.[1]) {
      switch (extractText[1]) {
        case 'true':
          value = true;
          break;
        case 'false':
          value = false;
          break;
        case 'null':
          value = null;
          break;
        case '$$empty':
          value = '$$empty';
        default:
          const _text = extractText[1];
          // if (typeof Number(_text) === 'number' && !isNaN(Number(_text))) {
          //   value = Number(_text);
          // }
          value = _text;
          break;
      }
    }
  }
  // [[text]] handle date case
  const dateValuePattern = /^\[\[(\d{4}-\d{2}-\d{2})\]\]$/;
  if (dateValuePattern.test(text)) {
    const extractText = text.match(dateValuePattern);

    const date = dayjs(extractText, 'YYYY-MM-DD');
  }

  if (operator === '$regex' && typeof value === 'string' && value !== '$$empty') {
    value = new RegExp(value, 'i');
  }

  return value;
};
