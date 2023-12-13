import InputEdit from 'components/common/input-edit';
import { useDataEdit } from 'hooks/use-data-edit';
import { withProfilePage } from 'hooks/with-profile-page';
import { isEmpty } from 'lodash';
import React from 'react';

function LogProfilePage(pageProps) {
  const { data, config, controller } = useDataEdit({
    mode: '',
    value: pageProps,
    config: { editable: false, ...pageProps }
  });

  const { schema, fieldsToDisplay = [] } = config;
  const { setInputs } = controller;

  if (isEmpty(fieldsToDisplay) || !fieldsToDisplay || !data || isEmpty(data)) return null;

  return (
    <div className="">
      {fieldsToDisplay.map((field) => {
        return <InputEdit schema={schema} field={field} value={data[field]} setInputs={setInputs} />;
      })}
    </div>
  );
}

export default withProfilePage(LogProfilePage);
