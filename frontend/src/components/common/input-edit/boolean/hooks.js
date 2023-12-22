import { useEffect, useState } from 'react';

export const useInputBoolean = ({ defaultValue, field, setInputs }) => {
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    setIsOn(defaultValue || false);
  }, [defaultValue]);

  useEffect(() => {
    setInputs((v) => {
      return {
        ...v,
        [field]: {
          value: isOn
        }
      };
    });
  }, [field, isOn, setInputs]);

  return {
    isOn,
    setIsOn
  };
};
