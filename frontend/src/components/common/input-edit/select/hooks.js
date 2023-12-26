import dayjs from 'dayjs';
import { find, isNull, isObject } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';

export const useInputSelect = ({ defaultValue, field, setInputs, config }) => {
  const [text, setText] = useState(null);
  const isTouched = useRef(null);

  const { selectOptions, selectGroupBy } = config;

  const options = useMemo(() => {
    return selectOptions || [];
  }, [selectOptions]);

  const groupBy = useMemo(() => {
    return selectGroupBy || undefined;
  }, [selectGroupBy]);

  useEffect(() => {
    if (defaultValue) {
      if (isObject(defaultValue) && defaultValue._id && defaultValue.label) {
        setText(defaultValue);
      } else {
        const option = find(options, { _id: defaultValue });
        if (option) {
          setText(option);
        } else {
          setText({ _id: defaultValue, label: defaultValue });
        }
      }
    } else {
      setText(defaultValue);
    }
  }, [defaultValue, options]);

  useEffect(() => {
    setInputs((v) => {
      const option = find(options, { _id: text?._id || text });
      return {
        ...v,
        [field]: {
          value: option?._id || text,
          touched: !!isTouched.current
        }
      };
    });
  }, [field, text]);

  return {
    options,
    groupBy,
    text,
    setText: (v) => {
      if (!isTouched.current) {
        isTouched.current = true;
      }
      if (isObject(v) && v._id) {
        setText(v._id);
      } else {
        setText(v);
      }
    }
  };
};
