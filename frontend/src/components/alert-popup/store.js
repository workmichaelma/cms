import { atom, useAtom, useAtomValue } from 'jotai';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { queryString } from 'store';
export const alert = atom(null);

export const useAlert = () => {
  const [alertSetting, setAlertSetting] = useAtom(alert);
  const [active, setActive] = useState(false);
  const qs = useAtomValue(queryString);

  const setup = (props) => {
    const { message = '', type = 'success', duration = 5000, delay = 0, timeout = null, onClose } = props;
    if (message) {
      setAlertSetting({
        message,
        type,
        duration,
        delay,
        timeout,
        onClose
      });
    }
  };

  useEffect(() => {
    if (!isEmpty(qs)) {
      const { alertMsg, alertType, alertDuration, alertDelay, alertTimeout } = qs;

      if (alertMsg) {
        setup({
          message: alertMsg,
          type: alertType,
          duration: alertDuration,
          delay: alertDelay,
          timeout: alertTimeout
        });
      }
    }
  }, []);

  useEffect(() => {
    if (alertSetting?.message) {
      setActive(true);
      setTimeout(() => {
        setActive(false);
        setAlertSetting(null);
      }, [alertSetting.duration]);
    }
  }, [alertSetting]);

  return {
    ...alertSetting,
    active,
    setAlert: setup
  };
};
