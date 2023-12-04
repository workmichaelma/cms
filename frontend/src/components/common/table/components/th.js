import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import React, { useContext } from 'react';

function Th({ text, field, context }) {
  const { setSort, sort } = useContext(context);
  return (
    <th className="p-3 rounded-sm text-left text-base bg-stone-50">
      <div
        className="flex cursor-pointer"
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
