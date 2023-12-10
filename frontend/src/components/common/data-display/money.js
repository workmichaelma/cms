import React from 'react';

function Money({ value }) {
  return (
    <p className="flex">
      <span>$</span>
      <span>{value}</span>
    </p>
  );
}

export default Money;
