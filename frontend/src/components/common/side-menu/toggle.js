import React from 'react';
import { NavigateBefore } from '@mui/icons-material';

import { useSideMenu } from './hooks';

function SideMenuToggle() {
  const { open, setSideMenuOpen } = useSideMenu();
  return (
    <div
      className={`relative left-4 shadow-md rounded-full bg-white border-2 border-zinc-300 cursor-pointer text-zinc-300 hover:bg-blue-800 hover:text-zinc-100 ${
        !open && 'rotate-180'
      }`}
    >
      <NavigateBefore
        sx={{ width: 24, height: 24 }}
        onClick={() => {
          setSideMenuOpen(!open);
        }}
      />
    </div>
  );
}

export default SideMenuToggle;
