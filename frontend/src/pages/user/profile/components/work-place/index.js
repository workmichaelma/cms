import InputEdit from 'components/common/input-edit';
import { useWorkPlace } from './hooks';

function WorkPlace({ schema, field, value, setInputs }) {
  const { title, regionOptions, districtOptions, region, district, place, setPlace } = useWorkPlace({
    value,
    field,
    setInputs,
    schema
  });
  return (
    <div className="flex gap-2 items-end">
      <div className="grow">
        <InputEdit
          schema={{ title, input_type: 'select', selectOptions: regionOptions }}
          field="region"
          value={region}
          setInputs={setPlace}
        />
      </div>
      <div className="grow">
        {place?.region?.value && (
          <InputEdit
            schema={{
              input_type: 'select',
              selectOptions: districtOptions[place.region.value] || []
            }}
            field="district"
            value={district}
            setInputs={setPlace}
          />
        )}
      </div>
    </div>
  );
}

export default WorkPlace;
