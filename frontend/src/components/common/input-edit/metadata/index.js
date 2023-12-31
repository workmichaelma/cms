import React, { useContext } from 'react';
import { isEmpty } from 'lodash';
import { parseISODateString } from 'lib/date';

function Metadata({ context }) {
  const { metadata } = useContext(context);

  if (!metadata || isEmpty(metadata)) return null;
  return (
    <div className="text-zinc-400">
      {metadata?.updated_at && (
        <div className="flex">
          <div className="">於{parseISODateString(metadata?.updated_at)}更新</div>
        </div>
      )}

      {metadata?.updated_at && (
        <div className="flex">
          <div className="">於{parseISODateString(metadata?.updated_at)}建立</div>
        </div>
      )}
    </div>
  );
}

export default Metadata;
