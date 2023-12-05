import React, { useContext } from 'react';
import { opStringMap } from './hooks';

import { Chip } from '@mui/material';

function Tag({ filter, onDelete }) {
  const { field, op, value } = filter;
  const label = `${field} ${opStringMap[op]} ${value}`;
  return <Chip label={label} onDelete={onDelete}></Chip>;
}

export default Tag;
