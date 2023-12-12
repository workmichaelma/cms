import React from 'react';
import { withPage } from 'hooks/with-page';
import { useTable } from 'components/common/table/hooks';

function LogIndexPage() {
  const paramsPreset = {
    filters: []
  };
  const { Component, nextPage } = useTable({
    url: '/api/collection/log/listing',
    paramsPreset,
    componentProps: {
      download: false,
      destination: {
        prefix: `/log/profile/`
      }
    }
  });
  return Component;
}

export default withPage(LogIndexPage);
