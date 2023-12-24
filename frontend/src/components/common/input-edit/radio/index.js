import React from 'react';
import { Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { useInputRadio } from './hooks';

function InputRadio({ config, field, value, setInputs }) {
  const { selected, setSelected } = useInputRadio({ defaultValue: value, setInputs, field, config });

  const { readonly, radio_options } = config;

  return (
    <RadioGroup
      value={selected}
      onChange={(e) => {
        setSelected(e.target.value);
      }}
    >
      <div className="flex gap-x-2 ml-2 flex-wrap">
        {radio_options?.map((option) => {
          return (
            <FormControlLabel
              disabled={readonly}
              key={option?._id}
              value={option?._id}
              control={<Radio size="small" />}
              label={option?.label}
              sx={{
                '.MuiFormControlLabel-label': {
                  fontSize: '14px'
                }
              }}
            />
          );
        })}
      </div>
    </RadioGroup>
  );
}

export default InputRadio;
