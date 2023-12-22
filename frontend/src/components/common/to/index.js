import React from 'react';
import { withTo } from './hooks';

function To({ children, className, href, target }) {
  return (
    <a href={href} target={target} className={className}>
      {children}
    </a>
  );
}

export default withTo(To);
