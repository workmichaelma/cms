import { useEffect } from 'react';
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

  useEffect(() => {
    if (collection && _id) {
      fetch('GET', `/api/collection/${collection}/get/${_id}`);
    }
  }, []);

  return {
    ...(result || {}),
    isLoading
  };
};
