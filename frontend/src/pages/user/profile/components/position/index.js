import InputEdit from 'components/common/input-edit';
import { usePosition } from './hooks';

function Position({ schema, field, value, setInputs }) {
  const { title } = usePosition({
    value,
    field,
    setInputs,
    schema
  });
  return (
    <div className="flex gap-2 items-end">
      <div className="grow">
        <InputEdit
          schema={{ freesolo: true, title, input_type: 'select', selectOptions: [] }}
          field="position"
          value={value}
          setInputs={setInputs}
        />
      </div>
    </div>
  );
}

export default Position;
