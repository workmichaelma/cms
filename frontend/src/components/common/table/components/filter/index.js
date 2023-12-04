import React, { useContext, useState } from 'react';
import { FilterAlt } from '@mui/icons-material';

import Tags from './tags';

function TableFilter({ context }) {
  const { config } = useContext(context);
  const [showRow, setShowRow] = useState(false);

  return (
    <div className="flex">
      <div className="shadow-md rounded-md p-2 text-grey-50 cursor-pointer hover:bg-gray-100">
        <FilterAlt style={{ fontSize: 16, fill: '#464F60' }} />
      </div>
      <Tags context={context} />
    </div>
  );
}

export default TableFilter;
