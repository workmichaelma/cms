import { forEach, isEmpty } from 'lodash';
import { basename } from './config';

export const redirect = (url, options) => {
  const { newTab = false, query = {}, hash = '' } = options || {};

  let path = `${url ? `${window.location.origin}${basename}${url}` : window.location.pathname}`;

  if (!isEmpty(query)) {
    const queryParams = new URLSearchParams(window.location.search);
    forEach(query, (value, key) => {
      queryParams.set(key, value);
    });

    const newSearch = queryParams.toString();

    if (newSearch) {
      path += `?${newSearch}`;
    }
  }

  if (hash) {
    path += `#${hash}`;
  }

  if (newTab) {
    window.open(path, '_blank');
  } else {
    window.location.href = path;
  }
};
