import React, { useContext } from 'react';
import { CircularProgress } from '@mui/material';
import { isEmpty } from 'lodash';

import Tr from './tr';
import Td from './td';
import { redirect } from 'lib/location';

function Tbody({ context, destination }) {
  const { isLoading, data, fieldsToDisplay, schema } = useContext(context);

  if (isEmpty(data) || isLoading) {
    return (
      <tbody className="h-40 text-lg text-center">
        <tr>
          <td colSpan={fieldsToDisplay?.length || 1}>{isLoading ? <CircularProgress /> : '沒有資料'}</td>
        </tr>
      </tbody>
    );
  }
  return (
    <tbody>
      {data?.map((row, index) => {
        const { prefix, onClick } = destination || {};

        const rowClick = () => {
          if (onClick) {
            onClick(row);
          } else {
            redirect(`${prefix}${row?._id}`);
          }
        };
        return (
          <Tr key={`table-tr-${index}`} onClick={rowClick}>
            {fieldsToDisplay.map((field) => (
              <Td value={row[field]} key={field} schema={schema} field={field} />
            ))}
          </Tr>
        );
      })}
    </tbody>
  );
}

export default Tbody;
