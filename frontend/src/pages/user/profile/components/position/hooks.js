import { find } from 'lodash';
import { useMemo } from 'react';

export const usePosition = ({ value, field, setInputs, schema }) => {
  const title = useMemo(() => {
    const a = find(schema, { field });
    return a?.title || '職位';
  }, [schema, field]);

  return {
    title
  };
};
