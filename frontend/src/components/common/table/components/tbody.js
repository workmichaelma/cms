import React, { useContext } from 'react';
import Tr from './tr';
import Td from './td';
import { isEmpty } from 'lodash';

function Tbody({ context }) {
  const { data, fieldsToDisplay, schema } = useContext(context);

  if (isEmpty(data)) {
    return (
      <tbody className="h-40 text-lg text-center">
        <tr>
          <td colSpan={fieldsToDisplay?.length || 1}>沒有資料</td>
        </tr>
      </tbody>
    );
  }
  return (
    <tbody>
      {data?.map((row, index) => (
        <Tr key={`table-tr-${index}`}>
          {fieldsToDisplay.map((field) => (
            <Td value={row[field]} key={field} schema={schema} field={field} />
          ))}
        </Tr>
      ))}
    </tbody>
  );
}

export default Tbody;
