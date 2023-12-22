import React from 'react';
import Filter from './components/filter';
import Page from './components/page';
import Thead from './components/thead';
import Tbody from './components/tbody';
import DownloadData from './components/download-data';
import NewEntry from './components/new-entry';

function Table({ context, ...props }) {
  const { destination } = props || {};
  return (
    <div className="flex flex-col shadow rounded-lg">
      <div className="flex flex-col bg-neutral-50 py-4 px-3 rounded-tr-lg rounded-tl-lg gap-2">
        <div className="flex justify-between">
          <Filter context={context} />
          <div className="flex gap-2">
            <DownloadData context={context} />
            <NewEntry context={context} />
          </div>
        </div>
        <Page context={context} />
      </div>
      <div className="pb-2 rounded-br-lg rounded-bl-lg">
        <table className="w-full">
          <Thead context={context} />
          <Tbody context={context} destination={destination} />
        </table>
      </div>
    </div>
  );
}

export default Table;
