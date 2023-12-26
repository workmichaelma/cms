import { createContext, useState } from 'react';
import InputBoolean from './boolean';
import InputText from './text';
import InputFile from './file';
import { isUndefined } from 'lodash';
import InputDate from './date';
import InputDateRange from './date-range';
import InputRadio from './radio';
import InputSelect from './select';

export const useInputEdit = ({ config, value }) => {
  const { is_boolean, is_date, is_file, input_type, title } = config;

  let Component = null;
  const label = title;

  if (is_boolean) {
    Component = InputBoolean;
  } else if (is_file) {
    Component = InputFile;
  } else if (is_date) {
    Component = InputDate;
  } else if (input_type === 'radio') {
    Component = InputRadio;
  } else if (input_type === 'select') {
    Component = InputSelect;
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
