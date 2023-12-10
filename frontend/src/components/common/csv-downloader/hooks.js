import { useState } from 'react';
import { saveAs } from 'file-saver';
import { Parser } from '@json2csv/plainjs';
import CsvDownloader from './index';

export const useCsvDownloader = (filename = 'csv') => {
  const [csvData, setCsvData] = useState(null);
  const [csvUrl, setCsvUrl] = useState(null);

  const downloadCsvData = () => {
    try {
      if (!!new Blob()) {
        const parser = new Parser({});
        const file = parser.parse(csvData);

        var blob = new Blob([file], { type: 'text/csv;charset=utf-8' });

        saveAs(blob, `${filename}.csv`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return {
    setCsvData,
    setCsvUrl,
    downloadCsvData,
    Component: <CsvDownloader download={downloadCsvData} />
  };
};
