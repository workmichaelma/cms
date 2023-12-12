import React from 'react';
import Metadata from './metadata';

function DataEdit({ context }) {
  return (
    <div className="p-4 border-2 border-zinc-300 shadow-md">
      <div className="">
        <Metadata context={context} />
      </div>

      <div className=""></div>
    </div>
  );
}

export default DataEdit;
