import React from 'react';
import { withPage } from 'hooks/with-page';
import { useTable } from 'components/common/table/hooks';

function UserIndexPage() {
  const paramsPreset = {
    filters: []
  };
  const { Component } = useTable({
    url: '/api/collection/user/listing',
    paramsPreset,
    componentProps: {
      download: {
        title: 'user listing',
        active: true
      },
      destination: {
        prefix: `/user/profile/`
      }
    }
  });
  return Component;
}

export default withPage(UserIndexPage);
