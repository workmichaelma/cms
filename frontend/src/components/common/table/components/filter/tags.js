import React, { useContext } from 'react';

function Tags({ context }) {
  const { config } = useContext(context);
  const { filters } = config;
  console.log(config);
  return <div>tags</div>;
}

export default Tags;
