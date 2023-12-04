import React from 'react';
import { useAtom } from 'jotai';

import { topnav } from './hooks';

function TopNav() {
  const [{ title, save, canSave }] = useAtom(topnav);
  return (
    <div className="h-16 flex items-center text-zinc-900">
      <div className="text-lg capitalize mx-4">{title}</div>
    </div>
  );
}

export default TopNav;
