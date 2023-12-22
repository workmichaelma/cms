import React, { useEffect } from 'react';
import { useDataEdit } from 'hooks/use-data-edit';
import { useTopNav } from 'components/common/top-nav/hooks';
import { redirect } from 'lib/location';

export const useProfile = ({ pageProps }) => {
  const { _id, mode } = pageProps;
  const url = mode === 'edit' ? `/api/collection/user/edit/${_id}` : `/api/collection/user/register`;
  const { setTopNav } = useTopNav();
  const { data, config, controller, save, canSave } = useDataEdit({
    mode,
    value: pageProps,
    config: { editable: false, ...pageProps },
    url,
    refetch: pageProps?.fetchPageData,
    success: (result) => {
      if (result && result?._id) {
        redirect(`/user/profile/${result._id}`);
      }
    }
  });

  const { schema, fieldsToDisplay = [] } = config;
  const { setInputs } = controller;

  useEffect(() => {
    setTopNav({ save, canSave });
  }, [save, canSave]);

  return { data, config, controller, save, canSave, schema, fieldsToDisplay, setInputs };
};
