import { useEffect } from 'react';
import { useFetch } from 'lib/fetch';

export const useCollectionConfig = (config) => {
  const { fetch, result, isLoading } = useFetch();
  const { collection } = config;

  useEffect(() => {
    if (collection) {
      fetch('GET', `/api/collection/${collection}/schema`);
    }
  }, []);

  return {
    schema: result,
    isLoading
  };
};
