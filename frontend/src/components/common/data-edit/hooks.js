import { createContext, useState } from 'react';
import DataEdit from './index';

export const useDataEdit = (mode, value, config) => {
  const [inputs, setInputs] = useState({});
  const { data, metadata } = value;
  const EditContext = createContext();

  const { editable, fieldsToDisplay, schema, componentProps } = config;

  const isEdit = mode === 'edit';
  const isCopy = mode === 'copy';
  const isNew = mode === 'new';

  console.log(value, config);

  return {
    save: null,
    canSave: null,
    Component: (
      <EditContext.Provider
        value={{
          data,
          config,
          metadata
        }}
      >
        <DataEdit context={EditContext} {...componentProps} />
      </EditContext.Provider>
    )
  };
};
