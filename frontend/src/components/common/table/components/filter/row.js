import React, { useContext, useEffect, useState } from 'react';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import { find, findIndex, isEmpty, map } from 'lodash';

import { opStringMap } from './hooks';
import { Add } from '@mui/icons-material';

function Row({ context }) {
  const { fieldsToDisplay, schema, controllers } = useContext(context);
  const { addFilter } = controllers;
  const [filter, setFilter] = useState({
    field: '',
    op: '',
    value: '',
    edited: false
  });

  useEffect(() => {
    if (fieldsToDisplay && schema && !isEmpty(fieldsToDisplay)) {
      setFilter({
        field: fieldsToDisplay[0],
        op: 'eq',
        value: '',
        edited: false
      });
    }
  }, [fieldsToDisplay, schema]);

  const updateField = (field, value) => {
    setFilter((v) => ({
      ...v,
      [field]: value,
      edited: true
    }));
  };

  const submit = () => {
    if (filter.edited && !isEmpty(filter.value)) {
      addFilter({
        field: filter.field,
        op: filter.op,
        value: filter.value
      });
    }
  };

  if (!fieldsToDisplay || !schema || isEmpty(fieldsToDisplay)) return null;

  return (
    <div className="flex gap-1">
      <Select
        sx={{
          '.MuiInputBase-input': {
            fontSize: '12px'
          }
        }}
        value={filter.field}
        size="small"
        onChange={(e) => {
          updateField('field', e.target.value);
        }}
      >
        {fieldsToDisplay?.map((field) => {
          const title = find(schema, { field })?.title || field;
          return (
            <MenuItem value={field} key={title}>
              {title}
            </MenuItem>
          );
        })}
      </Select>
      <Select
        sx={{
          '.MuiInputBase-input': {
            fontSize: '12px'
          }
        }}
        value={filter.op}
        size="small"
        onChange={(e) => {
          updateField('op', e.target.value);
        }}
      >
        {map(opStringMap, (title, op) => {
          return (
            <MenuItem value={op} key={title}>
              {title}
            </MenuItem>
          );
        })}
      </Select>

      <TextField
        size="small"
        value={filter.value}
        onChange={(e) => {
          updateField('value', e.target.value);
        }}
      />
      <Button variant="contained" size="small" endIcon={<Add />} onClick={submit}>
        添加
      </Button>
    </div>
  );
}

export default Row;
