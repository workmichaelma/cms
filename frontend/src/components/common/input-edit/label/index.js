import React from 'react';

function InputLabel({ label, field }) {
  return (
    <div className="text-md mb-1 ml-1">
      <label htmlFor={field}>{label}</label>
    </div>
  );
}

export default InputLabel;
