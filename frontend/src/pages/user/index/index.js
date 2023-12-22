import React from 'react';
import { withPage } from 'hooks/with-page';
import { useTable } from 'components/common/table/hooks';

function UserIndexPage() {
  const paramsPreset = {
    filters: []
  };
  const { Component } = useTable({
    collection: 'user',
    url: '/api/collection/user/listing',
    paramsPreset,
    components: {
      downloadButton: {
        title: 'user listing',
        active: true
      },
      newButton: {
        active: true,
        url: '/user/new'
      }
    },
    componentProps: {
      destination: {
        prefix: `/user/profile/`
      }
    }
  });
  return Component;
}

export default withPage(UserIndexPage);
