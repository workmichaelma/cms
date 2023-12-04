import React, { useContext } from 'react';
import Tr from './tr';
import Td from './td';

function Tbody({ context }) {
  const { data, fieldsToDisplay } = useContext(context);
  return (
    <tbody>
      {data?.map((row, index) => (
        <Tr key={`table-tr-${index}`}>
          {fieldsToDisplay.map((field) => (
            <Td text={row[field]} key={field} />
          ))}
        </Tr>
      ))}
    </tbody>
  );
}

export default Tbody;
