import React from 'react';
import { useInputDate } from './hooks';
import { DatePicker } from '@mui/x-date-pickers';

function InputDate({ field, value, setInputs, config }) {
  const { date, setDate } = useInputDate({ defaultValue: value, config, setInputs, field });

  const { readonly } = config;

  return (
    <DatePicker
      value={date}
      onChange={(newValue) => setDate(newValue)}
      format="YYYY-MM-DD"
      disabled={readonly}
      slotProps={{
        actionBar: { actions: ['clear', 'today'] }
      }}
      sx={{
        '.MuiOutlinedInput-input': {
          height: '40px',
          padding: 0,
          paddingLeft: '14px'
        }
      }}
    />
  );
}

export default InputDate;
