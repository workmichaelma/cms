import React, { useContext } from 'react';
import Tr from './tr';
import Td from './td';
import { isEmpty } from 'lodash';

function Tbody({ context }) {
  const { data, fieldsToDisplay } = useContext(context);

  if (isEmpty(data)) {
    return <div className="flex items-center justify-center h-40 text-lg text-center">沒有資料</div>;
  }
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
