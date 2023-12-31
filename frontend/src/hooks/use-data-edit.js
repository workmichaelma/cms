import { useFetch } from 'lib/fetch';
import { isEmpty, isNull, isUndefined, reduce } from 'lodash';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
export const useDataEditSave = ({ body, canSave, mode, url, refetch, success }) => {
  const { fetch, result: saveResult, status } = useFetch();
  const method = mode === 'edit' ? 'PUT' : 'POST';
  const message = mode === 'edit' ? '成功更新' : '成功建立';

  const save = useCallback(() => {
    console.log(`User pressed save button`, body);
    if (canSave && url) {
      fetch(
        method,
        url,
        {
          params: body
        },
        {
          message
        }
      );
    }
  }, [body, canSave, url]);

  useEffect(() => {
    if (saveResult && !isEmpty(saveResult)) {
      if (success) {
        success(saveResult);
      } else {
        refetch();
      }
    }
  }, [saveResult, refetch, success]);
  return { save, saveResult };
};

export const useDataEdit = ({ mode, value, config, url, refetch, success }) => {
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

  const body = useMemo(() => {
    const raw = reduce(
      inputs,
      (v, value, key) => {
        const newValue = value?.value;
        const oldValue = data?.[key];

        const isNewValueEmpty = isNull(newValue) || isUndefined(newValue) || newValue === '';
        const isOldValueEmpty = isNull(oldValue) || isUndefined(oldValue) || oldValue === '';

        if (newValue !== oldValue && !(isNewValueEmpty && isOldValueEmpty)) {
          v[key] = value?.value;
        }
        return v;
      },
      {}
    );

    return raw;
  }, [data, inputs]);

  const canSave = useMemo(() => {
    return !hasError && !isEmpty(body);
  }, [hasError, body]);

  const { save } = useDataEditSave({ body, canSave, mode, url, refetch, success });

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
