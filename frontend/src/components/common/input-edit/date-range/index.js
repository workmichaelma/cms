import React from 'react';
import { useInputDateRange } from './hooks';
import dayjs from 'dayjs';

function InputDateRange({ field, value, setInputs, config }) {
  const { date, setDate } = useInputDateRange({ defaultValue: value, config, setInputs, field });

  const { readonly } = config;

  return null;
}

export default InputDateRange;
