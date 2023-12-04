import React from 'react';
import Page from './components/page';
import Thead from './components/thead';
import Tbody from './components/tbody';

function Table({ context }) {
  return (
    <div className="flex flex-col gap-4">
      <Page context={context} />
      <table className="w-full">
        <Thead context={context} />
        <Tbody context={context} />
      </table>
    </div>
  );
}

export default Table;
