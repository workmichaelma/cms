import { withSchemaConfig } from 'hooks/with-schema-config';
import React from 'react';

function Td({ value, config, Component }) {
  return <td className="p-3 rounded-sm text-base text-zinc-800">{Component}</td>;
}

export default withSchemaConfig(Td);
