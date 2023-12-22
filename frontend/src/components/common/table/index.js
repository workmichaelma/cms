import React from 'react';
import Filter from './components/filter';
import Page from './components/page';
import Thead from './components/thead';
import Tbody from './components/tbody';
import DownloadData from './components/download-data';

function Table({ context, ...props }) {
  const { download, destination } = props || {};
  return (
    <div className="flex flex-col shadow rounded-lg">
      <div className="flex flex-col bg-neutral-50 py-4 px-3 rounded-tr-lg rounded-tl-lg gap-2">
        <div className="flex justify-between">
          <Filter context={context} />
          {download?.active && <DownloadData context={context} title={download?.title} />}
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
