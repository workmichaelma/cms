import React, { useContext } from 'react';

import Tag from './tag';

function Tags({ context }) {
  const { config, controllers } = useContext(context);
  const { filters } = config;
  const { removeFilter } = controllers;
  if (!filters) return null;
  return (
    <div className="flex gap-2">
      {filters.map((filter) => (
        <Tag filter={filter} onDelete={() => removeFilter(filter)} />
      ))}
    </div>
  );
}

export default Tags;
