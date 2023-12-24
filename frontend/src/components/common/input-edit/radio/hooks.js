import { useEffect, useState } from 'react';

export const useInputRadio = ({ defaultValue, field, setInputs }) => {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (defaultValue) {
      setSelected(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    setInputs((v) => {
      return {
        ...v,
        [field]: {
          value: selected
        }
      };
    });
  }, [field, selected, setInputs]);

  return {
    selected,
    setSelected
  };
};
