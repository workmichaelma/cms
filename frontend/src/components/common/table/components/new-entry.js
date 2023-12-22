import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import To from 'components/common/to';

function NewEntry({ context }) {
  const { config } = useContext(context);
  const { components, collection } = config || {};

  const { newButton } = components || {};

  if (!newButton?.active) {
    return null;
  }
  return (
    <Button variant="contained" startIcon={<Add />}>
      <To href={newButton?.url || `/${collection}/new`}>新增紀錄</To>
    </Button>
  );
}

export default NewEntry;
