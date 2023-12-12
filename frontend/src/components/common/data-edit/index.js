import React from 'react';
import Metadata from './metadata';
import { Save } from '@mui/icons-material';
import { Button } from '@mui/material';

function DataEdit({ context }) {
  return (
    <div className="p-4 border-2 border-zinc-300 shadow-md">
      <div className="flex justify-between">
        <Metadata context={context} />
        <Button>
          <Save />
        </Button>
      </div>

      <div className=""></div>
    </div>
  );
}

export default DataEdit;
