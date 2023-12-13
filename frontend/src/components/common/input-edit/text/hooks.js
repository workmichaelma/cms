import { getErrorMessage } from 'lib/input';

const { isUndefined } = require('lodash');
const { useState, useEffect, useMemo } = require('react');

export const useInputText = ({ defaultValue, config, setInputs, field }) => {
  const { is_password = false, customErrorHandler } = config;

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
          error: errorMessage
        }
      };
    });
  }, [errorMessage, field, setInputs, text]);

  return {
    textFieldType,
    errorMessage,
    text,
    setText,
    showPassword,
    setShowPassword
  };
};
