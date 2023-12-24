import React from 'react';
import { Switch } from '@mui/material';
import { useInputBoolean } from './hooks';

function InputBoolean({ field, value, setInputs, config }) {
  const { isOn, setIsOn } = useInputBoolean({ defaultValue: value, setInputs, field, config });

  const { readonly } = config;

  return (
    <Switch
      checked={isOn}
      disabled={readonly}
      onChange={(e) => {
        const on = e.target.checked;
        setIsOn(on);
      }}
    />
  );
}

export default InputBoolean;
