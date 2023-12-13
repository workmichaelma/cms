import React from 'react';
import { Switch } from '@mui/material';
import { useInputBoolean } from './hooks';

function InputBoolean({ field, value, setInputs, saveBtnClicked }) {
  const { isOn, setIsOn } = useInputBoolean({ defaultValue: value, setInputs, field });

  return (
    <Switch
      checked={isOn}
      onChange={(e) => {
        const on = e.target.checked;
        setIsOn(on);
      }}
    />
  );
}

export default InputBoolean;
