import dayjs from 'dayjs';
import { find, isEqual, isNull, isObject, isUndefined } from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export const useInputSelect = ({ defaultValue = undefined, field, setInputs, config }) => {
  const [text, setText] = useState(null);
  const isTouched = useRef(null);

  const { selectOptions, selectGroupBy } = config;

  const options = useMemo(() => {
    return selectOptions || [{ _id: '', label: '' }];
  }, [selectOptions]);

  const groupBy = useMemo(() => {
    return selectGroupBy || undefined;
  }, [selectGroupBy]);

  const updateInputs = useCallback(
    (text) => {
      setInputs((v) => {
        const option = find(options, { _id: text?._id || text });
        console.log(option, text, 'inputs');
        return {
          ...v,
          [field]: {
            value: option?._id || text?._id || text,
            touched: !!isTouched.current
          }
        };
      });
    },
    [options, field]
  );

  const customSetText = (value) => {
    const option = find(options, { label: value?.label || value });
    setText(value);
    updateInputs(option || value);
  };

  useEffect(() => {
    if (!isUndefined(defaultValue)) {
      const value = isObject(defaultValue) ? defaultValue?._id : defaultValue;
      if (isEqual(value, text?._id)) return;
      if (defaultValue) {
        if (isObject(defaultValue) && defaultValue._id && defaultValue.label) {
          customSetText(defaultValue);
        } else {
          const option = find(options, { _id: defaultValue });
          if (option) {
            customSetText(option);
          } else {
            customSetText({ _id: defaultValue, label: defaultValue });
          }
        }
      } else {
        customSetText(defaultValue);
      }
    }
  }, [defaultValue]);

  return {
    options,
    groupBy,
    text,
    setText: (v) => {
      if (!isTouched.current) {
        isTouched.current = true;
      }
      customSetText(v);
    }
  };
};
