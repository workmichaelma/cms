import { isUndefined } from 'lodash';
import { useState, useEffect, useMemo, useRef } from 'react';
import { getErrorMessage } from 'lib/input';

export const useInputText = ({ defaultValue, config, setInputs, field }) => {
  const { is_password = false, customErrorHandler } = config;

  const isTouched = useRef(null);
  const [showPassword, setShowPassword] = useState(is_password);
  const [text, setText] = useState('');
  const textFieldType = is_password && showPassword ? 'password' : 'text';

  const errorMessage = useMemo(() => {
    if (customErrorHandler && text) {
      return customErrorHandler(text);
    }
    return getErrorMessage({ schema: config, text });
  }, [config, text, customErrorHandler]);

  useEffect(() => {
    if (!isUndefined(defaultValue)) {
      setText(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    setInputs((v) => {
      return {
        ...v,
        [field]: {
          value: text,
          error: errorMessage,
          touched: !!isTouched.current
        }
      };
    });
  }, [errorMessage, field, setInputs, text]);

  return {
    textFieldType,
    errorMessage,
    isTouched,
    text,
    setText: (text) => {
      if (!isTouched.current) {
        isTouched.current = true;
      }

      setText(text);
    },
    showPassword,
    setShowPassword
  };
};
