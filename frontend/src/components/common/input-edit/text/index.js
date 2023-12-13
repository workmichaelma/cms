import { TextField, OutlinedInput } from '@mui/material';
import React, { useEffect, useMemo, useState, useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import { InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { useInputText } from './hooks';

function InputText({ setInputs, field, value, config }) {
  const { type, placeholder, is_required = false, editable, is_password, disabled, maxlength } = config;
  const [touched, setTouched] = useState(false);
  const ref = useRef();

  const { errorMessage, setText, text, showPassword, setShowPassword, textFieldType } = useInputText({
    defaultValue: value,
    config,
    setInputs,
    field
  });

  if (!config) return null;
  return (
    <TextField
      type={textFieldType}
      inputRef={ref}
      onChange={(e) => {
        const v = e.target.value;
        setText(v);
        setTouched(true);
      }}
      fullWidth
      multiline={type === 'textarea'}
      size="small"
      value={text}
      rows={5}
      inputProps={{ maxLength: maxlength }}
      disabled={(value && editable === false) || disabled}
      InputProps={{
        endAdornment: is_password ? (
          <InputAdornment position="end">
            {is_required && editable ? <InputAdornment position="start">必填</InputAdornment> : null}
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => {
                setShowPassword((v) => {
                  return !v;
                });
              }}
              onMouseDown={() => {
                setShowPassword((v) => {
                  return !v;
                });
              }}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ) : is_required && editable ? (
          <InputAdornment position="start">必填</InputAdornment>
        ) : null
      }}
      error={!!errorMessage}
      helperText={errorMessage}
      placeholder={placeholder}
      sx={
        {
          //   '.MuiFormHelperText-root': {
          //     display: !touched && !saveBtnClicked ? 'none' : 'inherit'
          //   },
          //   '.Mui-error .MuiOutlinedInput-notchedOutline': {
          //     borderColor: !touched && !saveBtnClicked ? 'rgba(0, 0, 0, 0.23) !important' : '#d32f2f'
          //   }
        }
      }
    />
  );
}

export default InputText;
