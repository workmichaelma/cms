import React, { useMemo } from 'react';
import { useInputDate, useInputSelect } from './hooks';
import { Autocomplete, TextField } from '@mui/material';
import { filter, find, isObject, isString } from 'lodash';

function InputSelect({ field, value, setInputs, config }) {
  const { text, setText, options, groupBy } = useInputSelect({ defaultValue: value, config, setInputs, field });

  const { freesolo = false } = config;

  return (
    <Autocomplete
      size="small"
      freeSolo={freesolo}
      value={text}
      options={options}
      groupBy={groupBy}
      getOptionLabel={(v) => {
        if (isObject(v) && v?.label) {
          return v.label;
        } else if (isString(v)) {
          const option = find(options, { _id: v });
          return option?.label || v;
        }
        return v;
      }}
      onInputChange={(event, v, r) => {
        if (event) {
          if (r === 'clear') {
            setText('');
          } else {
            setText(v);
          }
        }
      }}
      renderInput={(params) => <TextField {...params} />}
    />
  );
}

export default InputSelect;
