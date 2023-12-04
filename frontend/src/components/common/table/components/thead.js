import React, { useContext } from 'react';
import Th from './th';
import { find } from 'lodash';

function Thead({ context }) {
  const { fieldsToDisplay, schema } = useContext(context);
  if (!fieldsToDisplay) return null;
  return (
    <thead className="text-md border-b-2">
      <tr>
        {fieldsToDisplay.map((field) => {
          const text = find(schema, { field })?.title;
          return <Th text={text} field={field} key={field} context={context} />;
        })}
      </tr>
    </thead>
  );
}

export default Thead;
