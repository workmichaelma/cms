import { reduce } from 'lodash';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

export const useDataEdit = ({ mode, value, config }) => {
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

  const save = useCallback(() => {
    console.log('save');
  }, [inputs]);

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
