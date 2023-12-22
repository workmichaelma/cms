import { createContext, useState } from 'react';
import InputBoolean from './boolean';
import InputText from './text';
import InputFile from './file';
import { isUndefined } from 'lodash';

export const useInputEdit = ({ config, value }) => {
  const { is_boolean, is_file, title } = config;

  let Component = null;
  const label = title;

  if (is_boolean) {
    Component = InputBoolean;
  } else if (is_file) {
    Component = InputFile;
  } else {
    Component = InputText;
  }

  return {
    Component,
    label,
    value: !isUndefined(value) ? value : config?.default
  };
};

export const useErrorMessage = () => {};
