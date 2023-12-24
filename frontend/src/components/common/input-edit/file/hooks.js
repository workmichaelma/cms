import { isUndefined } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';

import { getErrorMessage } from 'lib/input';

export const useInputFile = ({ defaultValue, config, setInputs, field }) => {
  const { customErrorHandler, accept: defaultAccept, file_type } = config;
  const isTouched = useRef(null);
  const [file, setFile] = useState(null);

  const errorMessage = useMemo(() => {
    if (customErrorHandler && file) {
      return customErrorHandler(file);
    }
    return getErrorMessage({ schema: config, value: file });
  }, [config, file, customErrorHandler]);

  const accept = useMemo(() => {
    if (defaultAccept) {
      return defaultAccept;
    } else {
      if (file_type === 'image') {
        return '.jpg, .jpeg, .png';
      } else if (file_type === 'pdf') {
        return '.pdf';
      }
    }
  }, [defaultAccept, file_type]);

  useEffect(() => {
    if (!isUndefined(defaultValue)) {
      setFile(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    setInputs((v) => {
      return {
        ...v,
        [field]: {
          value: file,
          error: !!errorMessage,
          touched: !!isTouched.current
        }
      };
    });
  }, [errorMessage, field, setInputs, file]);

  return {
    accept,
    errorMessage,
    file,
    setFile: (file) => {
      if (!isTouched.current) {
        isTouched.current = true;
      }
      setFile(file);
    }
  };
};

export const convertFileSize = (sizeInBytes) => {
  if (!sizeInBytes) return '';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = sizeInBytes;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  return size.toFixed(2) + ' ' + units[unitIndex];
};
