import axios from 'axios';
import { apikey, backend } from './config';
import { useLoading } from 'components/loading/store';
import { useState } from 'react';
import { isEmpty } from 'lodash';
import { useAlert } from 'components/alert-popup/store';

axios.defaults.withCredentials = true;

export const fetcher = {
  get: async (url, { params, options }) => {
    console.log(`[GET] fetching... ${url}`);
    try {
      const result = await axios
        .get(`${backend}${url}`, {
          params,
          headers: {
            apikey: 'y6bslj9t15YkjqGDbkdOf2qLScLsef1A'
          }
        })
        .then(({ data, status }) => {
          return {
            status,
            data
          };
        })
        .catch((err) => {
          console.error(err);
          return null;
        });
      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  },
  post: async (url, { params, options = {}, alert = {} }) => {
    console.log(`[POST] fetching... ${url}`);
    const { contentType } = options;
    const requestOptions = {
      headers: { 'Content-Type': 'multipart/form-data', apikey }
    };

    if (contentType === 'json') {
      requestOptions.headers['Content-Type'] = 'application/json';
    }
    try {
      const result = await axios
        .post(`${backend}${url}`, params, requestOptions)
        .then(({ data, status }) => {
          return {
            status,
            data
          };
        })
        .catch((err) => {
          console.error(err);
          return null;
        });
      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  },
  put: async (url, { params, options = {} }) => {
    console.log(`[PUT] fetching... ${url}`);
    const { contentType } = options;
    const requestOptions = {
      headers: { 'Content-Type': 'multipart/form-data', apikey }
    };

    if (contentType === 'json') {
      requestOptions.headers['Content-Type'] = 'application/json';
    }
    try {
      const result = await axios
        .put(`${backend}${url}`, params, requestOptions)
        .then(({ data, status }) => {
          return {
            status,
            data
          };
        })
        .catch((err) => {
          console.error(err);
          return null;
        });
      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
};

export const useFetch = () => {
  const { setLoading, isLoading } = useLoading();
  const { setAlert } = useAlert();
  const [result, setResult] = useState();
  const [status, setStatus] = useState();

  const fetch = async (method, url, setting = {}, alert = {}) => {
    setLoading(true);
    setResult(null);

    if (method === 'GET') {
      fetcher.get(url, setting).then((res) => {
        const { data, status } = res || {};
        setResult(data);
        setStatus(status);
        if (!isEmpty(alert)) {
          setAlert(alert);
        }
      });
    }

    if (method === 'POST') {
      fetcher.post(url, setting).then((res) => {
        const { data, status } = res || {};
        setResult(data);
        setStatus(status);

        if (!isEmpty(alert)) {
          setAlert(alert);
        }
      });
    }

    if (method === 'PUT') {
      fetcher.put(url, setting).then((res) => {
        const { data, status } = res || {};
        setResult(data);
        setStatus(status);

        if (!isEmpty(alert)) {
          setAlert(alert);
        }
      });
    }
  };

  return {
    fetch,
    result,
    status,
    isLoading
  };
};
