import React from 'react';

function Tr({ children }) {
  return <tr className="hover:bg-blue-50 even:bg-stone-50">{children}</tr>;
}

export default Tr;
