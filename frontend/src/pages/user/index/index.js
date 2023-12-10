import React from 'react';
import { withPage } from 'hooks/with-page';
import { useTable } from 'components/common/table/hooks';

function UserIndexPage() {
  const paramsPreset = {
    filters: []
  };
  const { Component, nextPage } = useTable({
    url: '/api/collection/user/listing',
    paramsPreset,
    componentProps: { download: false }
  });
  return Component;
}

export default withPage(UserIndexPage);
