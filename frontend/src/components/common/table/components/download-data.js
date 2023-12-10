import { useCsvDownloader } from 'components/common/csv-downloader/hooks';
import { isEmpty } from 'lodash';
import React, { useContext, useEffect } from 'react';

function DownloadData({ context }) {
  const { data } = useContext(context);
  const { Component, setCsvData } = useCsvDownloader('table-data');

  useEffect(() => {
    if (!isEmpty(data)) {
      setCsvData(data);
    }
  }, [data]);

  return Component;
}

export default DownloadData;
