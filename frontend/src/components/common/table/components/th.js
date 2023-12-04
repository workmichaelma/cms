import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import React, { useContext } from 'react';

function Th({ text, field, context }) {
  const { controllers, config } = useContext(context);
  const { setSort } = controllers;
  const { sort } = config;
  return (
    <th className="px-3 rounded-sm text-left text-xs bg-neutral-50 font-normal h-10">
      <div
        className="flex cursor-pointer items-center"
        onClick={() =>
          setSort({
            field,
            order: sort?.field === field ? (sort?.order === -1 ? 1 : -1) : -1
          })
        }
      >
        {text}
        <div className="inline w-8">
          {sort && sort?.field === field && (sort?.order === -1 ? <ArrowDropDown /> : <ArrowDropUp />)}
        </div>
      </div>
    </th>
  );
}

export default Th;
