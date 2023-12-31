import React from 'react';

import { withSchemaConfig } from 'hooks/with-schema-config';
import { useInputEdit } from './hooks';
import InputLabel from './label';

function InputEdit({ config, value, field, schema, setInputs, className = '' }) {
  const props = {
    setInputs,
    schema,
    field,
    value,
    config
  };

  const { Component, label, ...rest } = useInputEdit({ config, value });
  return (
    <div className={`${className}`}>
      <InputLabel field={field} label={label} />
      <Component {...props} {...rest} />
    </div>
  );
}

export default withSchemaConfig(InputEdit);
