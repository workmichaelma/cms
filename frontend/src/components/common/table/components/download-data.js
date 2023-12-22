import { useCsvDownloader } from 'components/common/csv-downloader/hooks';
import { isEmpty } from 'lodash';
import React, { useContext, useEffect } from 'react';

function DownloadData({ context }) {
  const { data, config } = useContext(context);
  const { components } = config || {};

  const { downloadButton } = components || {};

  const { Component, setCsvData } = useCsvDownloader(downloadButton?.title || 'table-data');

  useEffect(() => {
    if (!isEmpty(data)) {
      setCsvData(data);
    }
  }, [data]);

  if (!downloadButton?.active) return null;

  return Component;
}

export default DownloadData;
