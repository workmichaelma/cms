import React from 'react';

function Section({ children, title, size, className = '', id }) {
  return (
    <div className={`flex flex-col gap-8 p-4 rounded-xl shadow-md bg-white ${className}`} id={id || title || undefined}>
      {title && <div className="text-md uppercase text-zinc-800 tracking-wide">{title}</div>}
      <div>{children}</div>
    </div>
  );
}

export default Section;
