import React from 'react';

import { Button } from '@mui/material';
import { Download } from '@mui/icons-material';

function CsvDownloader({ download, title }) {
  return (
    <div>
      <Button variant="outlined" startIcon={<Download />} onClick={download}>
        {title || '下載數據'}
      </Button>
    </div>
  );
}

export default CsvDownloader;
