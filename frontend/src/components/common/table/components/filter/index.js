import React, { useContext, useState } from 'react';
import { FilterAlt } from '@mui/icons-material';

import Row from './row';
import Tags from './tags';

function TableFilter({ context }) {
  const { config } = useContext(context);
  const [showRow, setShowRow] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4 h-10 flex">
        <div
          className="shadow-md rounded-md p-2 text-grey-50 cursor-pointer hover:bg-gray-100"
          onClick={() => {
            setShowRow((v) => !v);
          }}
        >
          <FilterAlt style={{ fontSize: 16, fill: '#464F60' }} />
        </div>
        {showRow && <Row context={context} />}
      </div>
      <Tags context={context} />
    </div>
  );
}

export default TableFilter;
