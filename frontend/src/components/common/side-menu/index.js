import React from 'react';
import { NavigateBefore } from '@mui/icons-material';

import Divider from '@mui/material/Divider';
import Items from './items';
import User from './user';
import Toggle from './toggle';

function SideMenu() {
  return (
    <div className="flex flex-col min-h-full justify-around align-center relative h-full text-zinc-800 font-light ">
      <div className="h-16 mb-3"></div>
      <User />
      <div className="grow shrink">
        <Items />
      </div>
      <div className="absolute right-0 bottom-8">
        <Toggle />
      </div>
    </div>
  );
}

export default SideMenu;
