import { useDataEdit } from 'components/common/data-edit/hooks';
import { withProfilePage } from 'hooks/with-profile-page';
import React from 'react';

function LogProfilePage({ data, schema, fieldsToDisplay, metadata }) {
  const { Component } = useDataEdit('', { data, metadata }, { editable: false, schema, fieldsToDisplay });
  return <div>{Component}</div>;
}

export default withProfilePage(LogProfilePage);
