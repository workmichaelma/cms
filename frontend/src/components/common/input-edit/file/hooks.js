import { isUndefined } from 'lodash';
import { useEffect, useMemo, useState } from 'react';

export const useInputFile = ({ defaultValue, config, setInputs, field }) => {
  const { customErrorHandler, accept: defaultAccept, file_type } = config;
  const [file, setFile] = useState(null);
  // const errorMessage = useMemo(() => {
  //   if (customErrorHandler && text) {
  //     return customErrorHandler(text);
  //   }
  //   return getErrorMessage({ schema: config, text });
  // }, [config, text, customErrorHandler]);

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
          error: null,
          touched: true
        }
      };
    });
  }, [field, setInputs, file]);

  return {
    accept,
    // errorMessage
    file,
    setFile
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
