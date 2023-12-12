import React from 'react';

function Tr({ children, onClick }) {
  return (
    <tr className="hover:bg-blue-50 even:bg-stone-50 cursor-pointer" onClick={onClick}>
      {children}
    </tr>
  );
}

export default Tr;
