import React from 'react';
import { DateRangePicker } from '@mui/x-date-pickers-pro';
import { useInputDateRange } from './hooks';
import dayjs from 'dayjs';

function InputDateRange({ field, value, setInputs, config }) {
  const { date, setDate } = useInputDateRange({ defaultValue: value, config, setInputs, field });

  const { readonly } = config;

  return (
    <DateRangePicker
      value={[dayjs('2022-04-17'), dayjs('2022-04-21')]}
      onChange={(v) => {
        console.log(v);
      }}
    />
  );
}

export default InputDateRange;
