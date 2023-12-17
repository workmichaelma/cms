import React, { useEffect } from 'react';
import { isEmpty } from 'lodash';
import InputEdit from 'components/common/input-edit';
import { useDataEdit } from 'hooks/use-data-edit';
import { withProfilePage } from 'hooks/with-profile-page';
import Section from 'components/common/section';
import { useTopNav } from 'components/common/top-nav/hooks';

function UserProfilePage(pageProps) {
  const { setTopNav } = useTopNav();
  const { data, config, controller, save, canSave } = useDataEdit({
    mode: '',
    value: pageProps,
    config: { editable: false, ...pageProps },
    url: `/api/collection/user/edit/${pageProps?._id}`
  });

  const { schema, fieldsToDisplay = [] } = config;
  const { setInputs } = controller;

  useEffect(() => {
    setTopNav({ save, canSave });
  }, [save, canSave]);

  if (isEmpty(fieldsToDisplay) || !fieldsToDisplay || !data || isEmpty(data)) return null;

  return (
    <div className="flex flex-col gap-4">
      <Section title="Basic Information">
        <div className="flex flex-col gap-2">
          <InputEdit schema={schema} field="username" value={data?.username} setInputs={setInputs} />

          <InputEdit schema={schema} field="password" value={data?.password} setInputs={setInputs} />

          <InputEdit schema={schema} field="display_name" value={data?.display_name} setInputs={setInputs} />

          <InputEdit schema={schema} field="selfie" value={data?.selfie} setInputs={setInputs} />
        </div>
      </Section>
      <Section title="Permission">
        <InputEdit schema={schema} field="is_admin" value={data?.is_admin} setInputs={setInputs} />
      </Section>
    </div>
  );
}

export default withProfilePage(UserProfilePage);
