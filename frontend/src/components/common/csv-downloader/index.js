import React from 'react';

import { Button } from '@mui/material';
import { Download } from '@mui/icons-material';

function CsvDownloader({ download, title }) {
  return (
    <Button variant="outlined" startIcon={<Download />} onClick={download}>
      {title || '下載數據'}
    </Button>
  );
}

export default CsvDownloader;
