import { atom, useAtomValue, useAtom } from 'jotai';
import { forEach, isEmpty } from 'lodash';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { queryString as _queryString } from 'store';
import Table from './index';
import { useFetch } from 'lib/fetch';

export const params = atom(null);

export const useTable = (props) => {
  const { tablePrefix = '', url } = props || {};
  const [urlParams, setUrlParams] = useAtom(params);
  const TableContext = createContext();

  const preset = usePreset(tablePrefix, props?.preset);
  const { isLoading, data, fieldsToDisplay, schema, metadata } = useDataFetch(url);

  useEffect(() => {
    if (preset?.ready) {
      let value = {
        page: 1,
        pageSize: 10
      };

      const { sort, page, pageSize } = preset || {};

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
      setUrlParams(value);
    }
  }, [preset]);

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

  const filters = useMemo(() => {
    const value = urlParams?.filters;
    if (value) {
      return {
        field: value.replace('-', ''),
        order: value.startsWith('-') ? -1 : 1
      };
    }
    return null;
  }, [urlParams]);

  const controllers = {
    nextPage,
    prevPage,
    toPage,
    setSort,
    setPageSize
  };

  const config = {
    sort
  };

  return {
    editData: () => {},
    nextPage,
    prevPage,
    toPage,
    setPageSize,
    controllers,
    config,
    Component: (
      <TableContext.Provider
        value={{
          data,
          fieldsToDisplay,
          schema,
          metadata,
          controllers,
          config
        }}
      >
        <Table context={TableContext} />
      </TableContext.Provider>
    )
  };
};

export const usePreset = (tablePrefix, preset) => {
  const queryString = useAtomValue(_queryString);
  const [urlPresetProps, setUrlPresetProps] = useState(null);
  const [isPresetReady, setIsPresetReady] = useState(false);
  useEffect(() => {
    if (!isEmpty(queryString)) {
      let params = {};
      forEach(queryString, (value, key) => {
        if (key.startsWith(tablePrefix)) {
          params[key.replace(tablePrefix, '').replace('table_', '')] = value;
        }
      });
      setUrlPresetProps(params);
    }
    setIsPresetReady(true);
  }, []);

  const result = useMemo(() => {
    const data = { ...urlPresetProps, ...preset };
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
      console.log(data?.filters);
    }

    setting.ready = isPresetReady;

    return setting;
  }, [isPresetReady, urlPresetProps, preset]);

  return result;
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
