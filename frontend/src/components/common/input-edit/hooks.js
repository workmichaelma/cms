import { createContext, useState } from 'react';
import InputBoolean from './boolean';
import InputText from './text';

export const useInputEdit = ({ config, value }) => {
  const { is_boolean, title } = config;

  let Component = null;
  const label = title;

  if (is_boolean) {
    Component = InputBoolean;
  } else {
    Component = InputText;
  }

  return {
    Component,
    label
  };
};

export const useErrorMessage = () => {};
