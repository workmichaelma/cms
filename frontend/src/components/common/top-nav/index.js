import React from 'react';
import { useAtom } from 'jotai';
import { Save } from '@mui/icons-material';
import { Button } from '@mui/material';

import { topnav } from './hooks';

function TopNav() {
  const [{ title, save, canSave }] = useAtom(topnav);
  return (
    <div className="h-16 flex items-center text-zinc-900">
      <div className="text-lg capitalize mx-4">{title}</div>
      <div className="grow"></div>
      <div className="">
        {save && (
          <Button onClick={save} disabled={!canSave}>
            <Save />
          </Button>
        )}
      </div>
    </div>
  );
}

export default TopNav;
