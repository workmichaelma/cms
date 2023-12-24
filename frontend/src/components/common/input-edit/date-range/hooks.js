import dayjs from 'dayjs';
import { isNull } from 'lodash';
import { useEffect, useRef, useState } from 'react';

export const useInputDateRange = ({ defaultValue, field, setInputs }) => {
  const [date, setDate] = useState(null);
  const isTouched = useRef(null);

  useEffect(() => {
    const value = dayjs(defaultValue);
    if (defaultValue && value.isValid()) {
      setDate(value);
    } else {
      setDate(null);
    }
  }, [defaultValue]);

  useEffect(() => {
    setInputs((v) => {
      return {
        ...v,
        [field]: {
          value: isNull(date) ? '' : date,
          touched: !!isTouched.current
        }
      };
    });
  }, [field, date, setInputs]);

  return {
    date,
    setDate: (date) => {
      if (!isTouched.current) {
        isTouched.current = true;
      }
      const value = dayjs(date);
      if (value.isValid()) {
        setDate(date.toISOString());
      } else {
        setDate(null);
      }
    }
  };
};
