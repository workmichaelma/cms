import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { useLoading } from './store';

function Loading({ children }) {
  const { isLoading, isBlockedScreen } = useLoading();
  return (
    <div className="">
      {isLoading && (
        <div className="z-50">
          <LinearProgress />
        </div>
      )}

      <div className={`${isBlockedScreen && 'opacity-80'}`}>{children}</div>
    </div>
  );
}

export default Loading;
