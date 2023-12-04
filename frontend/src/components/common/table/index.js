import React from 'react';
import Filter from './components/filter';
import Page from './components/page';
import Thead from './components/thead';
import Tbody from './components/tbody';

function Table({ context }) {
  return (
    <div className="flex flex-col shadow rounded-lg">
      <div className="flex flex-col bg-neutral-50 py-4 px-3 rounded-tr-lg rounded-tl-lg">
        <Page context={context} />
        <Filter context={context} />
      </div>
      <div className="pb-2 rounded-br-lg rounded-bl-lg">
        <table className="w-full">
          <Thead context={context} />
          <Tbody context={context} />
        </table>
      </div>
    </div>
  );
}

export default Table;
