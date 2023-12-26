import React, { useEffect } from 'react';
import { isEmpty } from 'lodash';
import InputEdit from 'components/common/input-edit';
import { withProfilePage } from 'hooks/with-profile-page';
import Section from 'components/common/section';
import { useProfile } from './hooks';
import WorkPlace from './components/work-place';
import Position from './components/position';

function UserProfilePage(pageProps) {
  const { data, schema, setInputs } = useProfile({ pageProps });

  return (
    <div className="flex flex-col gap-4">
      <Section title="Basic Information">
        <div className="flex flex-col gap-2">
          <InputEdit schema={schema} field="username" value={data?.username} setInputs={setInputs} />

          <InputEdit schema={schema} field="password" value={data?.password} setInputs={setInputs} />

          <InputEdit schema={schema} field="display_name" value={data?.display_name} setInputs={setInputs} />

          <InputEdit schema={schema} field="selfie" value={data?.selfie} setInputs={setInputs} />

          <InputEdit schema={schema} field="birthday" value={data?.birthday} setInputs={setInputs} />

          <InputEdit schema={schema} field="gender" value={data?.gender} setInputs={setInputs} />

          <WorkPlace schema={schema} field="work_place" value={data?.work_place} setInputs={setInputs} />

          <Position schema={schema} field="position" value={data?.position} setInputs={setInputs} />
        </div>
      </Section>
      <Section title="Permission">
        <InputEdit schema={schema} field="is_admin" value={data?.is_admin} setInputs={setInputs} />
      </Section>
    </div>
  );
}

export default withProfilePage(UserProfilePage);
