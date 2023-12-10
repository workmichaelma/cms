import React from 'react';

function Boolean({ value }) {
  const v = value === true ? '是' : '否';
  return (
    <p
      className={`px-4 w-fit border-2 ${
        value === true ? 'text-emerald-500 border-emerald-200 bg-emerald-50' : 'text-red-400 border-red-100 bg-red-50'
      }`}
    >
      {v}
    </p>
  );
}

export default Boolean;
