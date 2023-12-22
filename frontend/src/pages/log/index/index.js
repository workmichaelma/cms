import React from 'react';
import { withPage } from 'hooks/with-page';
import { useTable } from 'components/common/table/hooks';

function LogIndexPage() {
  const paramsPreset = {
    filters: []
  };
  const { Component, nextPage } = useTable({
    collection: 'log',
    url: '/api/collection/log/listing',
    paramsPreset,
    components: {
      downloadButton: {
        active: true,
        title: 'log listing'
      },
      newButton: {
        active: true,
        url: '/log/new'
      }
    },
    componentProps: {
      destination: {
        prefix: `/log/profile/`
      }
    }
  });
  return Component;
}

export default withPage(LogIndexPage);
