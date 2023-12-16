import { useFetch } from 'lib/fetch';
import { reduce } from 'lodash';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
export const useDataSave = ({ body, canSave, url }) => {
  const { fetch, result: saveResult, status } = useFetch();
  const save = useCallback(() => {
    if (canSave && url) {
      fetch('PUT', url, {
        params: body
      });
    }
  }, [body, canSave, url]);
  return { save, saveResult };
};

export const useDataEdit = ({ mode, value, config, url }) => {
  const [inputs, setInputs] = useState({});
  const { data, metadata } = value;
  const { editable, fieldsToDisplay, schema } = config;

  const isEdit = mode === 'edit';
  const isCopy = mode === 'copy';
  const isNew = mode === 'new';

  const hasError = useMemo(() => {
    return reduce(
      inputs,
      (v, value) => {
        if (value?.error) {
          v = true;
        }
        return v;
      },
      false
    );
  }, [inputs]);

  const canSave = useMemo(() => {
    return !hasError;
  }, [hasError]);

  const body = useMemo(() => {
    const raw = reduce(
      inputs,
      (v, value, key) => {
        v[key] = value?.value;
        return v;
      },
      {}
    );

    return raw;
  }, [data, inputs]);

  const { save } = useDataSave({ body, canSave, url });

  useEffect(() => {
    console.log(inputs, hasError);
  }, [inputs, hasError]);

  const setting = {
    mode,
    isCopy,
    isEdit,
    isNew
  };

  const controller = {
    setInputs
  };

  return {
    data,
    metadata,
    save,
    canSave,
    hasError,
    controller,
    inputs,
    config: {
      ...config,
      ...setting
    }
  };
};
