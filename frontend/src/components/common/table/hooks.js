import { atom, useAtomValue, useAtom } from 'jotai';
import { compact, forEach, isArray, isEmpty, pull, reduce } from 'lodash';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { queryString as _queryString } from 'store';
import Table from './index';
import { useFetch } from 'lib/fetch';
import { urlStringToObj, queryOpMap, urlObjToString } from 'lib/query';

export const params = atom(null);

export const useFilters = () => {
  const [urlParams, setUrlParams] = useAtom(params);
  const filters = useMemo(() => {
    const value = urlParams?.filters;
    if (value) {
      const obj = urlStringToObj(`filters=${urlParams?.filters}`);
      if (obj && obj.filters) {
        return obj.filters;
      }
    }
    return null;
  }, [urlParams]);

  const removeFilter = (filter) => {
    const string = urlObjToString({ filters: [filter] }) || '';
    const value = string?.replace('filters=', '');
    if (value) {
      const newFilters = pull(urlParams.filters.split(','), value).join(',');
      setUrlParams((v) => ({
        ...v,
        filters: newFilters
      }));
    }
  };
  const addFilter = (filter) => {
    const string = urlObjToString({ filters: [filter] }) || '';
    const value = string?.replace('filters=', '');

    if (value) {
      setUrlParams((v) => ({
        ...v,
        filters: v.filters ? [v.filters || '', value].join(',') : value
      }));
    }
  };

  return {
    filters,
    removeFilter,
    addFilter
  };
};

export const useTable = (props) => {
  const { tablePrefix = '', url, paramsPreset = {}, componentProps = {} } = props || {};
  const [urlParams, setUrlParams] = useAtom(params);
  const TableContext = createContext();

  const preset = usePreset(tablePrefix, paramsPreset);
  const { isLoading, data, fieldsToDisplay, schema, metadata } = useDataFetch(url);

  const { nextPage, prevPage, toPage } = usePage(metadata);
  const { setPageSize } = usePageSize();

  const { sort, setSort } = useSort();

  const { filters, addFilter, removeFilter } = useFilters();

  useEffect(() => {
    if (preset?.ready) {
      let value = {
        page: 1,
        pageSize: 10
      };

      const { sort, page, pageSize, filters } = preset || {};

      if (sort && !isEmpty(sort)) {
        value = {
          ...value,
          sort: `${sort?.order === -1 ? '-' : ''}${sort?.field}`
        };
      }
      if (page) {
        value = {
          ...value,
          page
        };
      }
      if (pageSize) {
        value = {
          ...value,
          pageSize
        };
      }
      if (filters) {
        const filtersString = compact(
          filters.map((filter) => {
            const { field, op, value } = filter;
            if (field && op && queryOpMap[op]) {
              return `${field}^${queryOpMap[op]}${value}`;
            }
            return null;
          })
        ).join(',');
        if (filtersString) {
          value = {
            ...value,
            filters: filtersString
          };
        }
      }
      setUrlParams(value);
    }
  }, [preset]);

  const controllers = {
    nextPage,
    prevPage,
    toPage,
    setSort,
    setPageSize,
    addFilter,
    removeFilter
  };

  const config = {
    sort,
    filters
  };

  return {
    editData: () => {},
    controllers,
    config,
    Component: (
      <TableContext.Provider
        value={{
          params,
          data,
          fieldsToDisplay,
          schema,
          metadata,
          controllers,
          config
        }}
      >
        <Table context={TableContext} {...componentProps} />
      </TableContext.Provider>
    )
  };
};

export const usePreset = (tablePrefix, paramsPreset = {}) => {
  const queryString = useAtomValue(_queryString);
  const [urlPresetProps, setUrlPresetProps] = useState(null);
  const [isPresetReady, setIsPresetReady] = useState(false);
  useEffect(() => {
    let params = paramsPreset;
    console.log(queryString);
    if (!isEmpty(queryString)) {
      // forEach(queryString, (value, key) => {
      //   if (key.startsWith(tablePrefix)) {
      //     params[key.replace(tablePrefix, '').replace('table_', '')] = value;
      //   }
      // });
      params = { ...params, ...queryString };
    }
    setUrlPresetProps(params);
    setIsPresetReady(true);
  }, []);

  const result = useMemo(() => {
    const data = reduce(
      {
        ...urlPresetProps,
        ...paramsPreset
      },
      (acc, value, key) => {
        if (isArray(value)) {
          if (urlPresetProps && urlPresetProps[key]) {
            acc[key] = [...(acc[key] || []), ...urlPresetProps[key]];
          }
          if (paramsPreset && paramsPreset[key]) {
            acc[key] = [...(acc[key] || []), ...paramsPreset[key]];
          }
        } else {
          acc[key] = value;
        }

        return acc;
      },
      {}
    );
    let setting = { ...data };

    if (data?.sort) {
      setting.sort = {
        order: data.sort.startsWith('-') ? -1 : 1,
        field: data.sort.replace('-', '')
      };
    }

    if (data?.page) {
      setting.page = parseInt(data.page);
    }

    if (data?.filters) {
      setting.filters = data?.filters;
    }

    setting.ready = isPresetReady;

    console.log(data);

    return setting;
  }, [isPresetReady, urlPresetProps]);

  return result;
};

export const usePage = (metadata) => {
  const [urlParams, setUrlParams] = useAtom(params);
  const nextPage = useCallback(() => {
    if (metadata?.totalPage === urlParams?.page) {
      return;
    } else {
      setUrlParams((v) => ({
        ...v,
        page: v.page + 1
      }));
    }
  }, [urlParams?.page, metadata?.totalPage]);

  const prevPage = useCallback(() => {
    if (urlParams?.page === 1) {
      return;
    } else {
      setUrlParams((v) => ({
        ...v,
        page: v.page - 1
      }));
    }
  }, [urlParams?.page]);

  const toPage = useCallback(
    (page) => {
      if (page !== urlParams?.page) {
        setUrlParams((v) => ({
          ...v,
          page
        }));
      }
    },
    [urlParams?.page]
  );

  return {
    nextPage,
    prevPage,
    toPage
  };
};

export const usePageSize = () => {
  const [urlParams, setUrlParams] = useAtom(params);
  const setPageSize = useCallback(
    (size) => {
      if (size !== urlParams?.pageSize) {
        setUrlParams((v) => ({
          ...v,
          pageSize: size,
          page: 1
        }));
      }
    },
    [urlParams?.pageSize]
  );

  return {
    setPageSize
  };
};

export const useSort = () => {
  const [urlParams, setUrlParams] = useAtom(params);

  const setSort = (value) => {
    setUrlParams((v) => ({
      ...v,
      sort: `${value?.order === -1 ? '-' : ''}${value.field}`,
      page: 1
    }));
  };

  const sort = useMemo(() => {
    const value = urlParams?.sort;
    if (value) {
      return {
        field: value.replace('-', ''),
        order: value.startsWith('-') ? -1 : 1
      };
    }
    return null;
  }, [urlParams]);

  return {
    sort,
    setSort
  };
};

export const useDataFetch = (url, props) => {
  const { ready } = props || {};
  const _params = useAtomValue(params);
  const { fetch, result, isLoading } = useFetch();

  useEffect(() => {
    if (_params) {
      fetch('GET', url, { params: _params });
    }
  }, [url, _params, ready]);

  const data = useMemo(() => {
    if (result) {
      return {
        fieldsToDisplay: result?.fieldsToDisplay,
        data: result?.result?.records,
        metadata: result?.result?.metadata,
        schema: result?.schema
      };
    }
    return null;
  }, [result]);

  return { ...data, isLoading };
};
