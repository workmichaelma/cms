import React, { useMemo } from 'react';
import { useInputDate, useInputSelect } from './hooks';
import { Autocomplete, TextField } from '@mui/material';
import { find, isObject, isString } from 'lodash';

function InputSelect({ field, value, setInputs, config }) {
  const { text, setText, options, groupBy } = useInputSelect({ defaultValue: value, config, setInputs, field });

  return (
    <Autocomplete
      size="small"
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
      onChange={(e, v, reason) => {
        if (v) {
          if (isObject(v) && v.value) {
            setText(v);
          } else {
            setText({ _id: v, label: v });
          }
        } else {
          setText('');
        }
      }}
      renderInput={(params) => <TextField {...params} />}
    />
  );
}

export default InputSelect;
