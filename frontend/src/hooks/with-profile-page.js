import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { withPage } from './with-page';
import { useFetch } from 'lib/fetch';
import { useCollectionConfig } from './use-collection-config';

export const withProfilePage = (WrappedComponent) => {
  const WithPageComponent = withPage(WrappedComponent);
  return (props) => {
    const { collection } = props || {};
    const { _id } = useParams() || {};

    const pageData = useProfilePageData({ collection, _id });
    const collectionConfig = useCollectionConfig({ collection });

    if (!pageData || !collectionConfig || pageData?.isLoading) {
      return null;
    }

    const dataProps = {
      _id,
      fetchPageData: pageData.refetch,
      schema: collectionConfig?.schema,
      data: pageData?.data,
      fieldsToDisplay: pageData?.fieldsToDisplay,
      metadata: pageData?.metadata
    };

    if (WithPageComponent) {
      return <WithPageComponent {...props} {...dataProps} />;
    }
    return <WrappedComponent {...props} {...dataProps} />;
  };
};

export const useProfilePageData = ({ collection, _id }) => {
  const { fetch, result, status, isLoading } = useFetch();

  const fetchPageData = (collection, _id) => {
    if (collection && _id) {
      fetch('GET', `/api/collection/${collection}/get/${_id}`);
    }
  };
  const refetch = useCallback(() => {
    fetchPageData(collection, _id);
  }, [collection, _id]);

  useEffect(() => {
    fetchPageData(collection, _id);
  }, []);

  return {
    ...(result || {}),
    refetch,
    isLoading
  };
};
