import dayjs from 'dayjs';

export const isISODateString = (str) => {
  try {
    const day = new Date(str);
    return day.toISOString() === str;
  } catch {
    return false;
  }
};

export const toISOString = (str) => {
  try {
    if (str) {
      const day = dayjs(str);
      if (day.isValid()) {
        return day.toISOString();
      }
    }
    return undefined;
  } catch {
    return undefined;
  }
};

export const parseISODateString = (str, config) => {
  try {
    if (isISODateString(str)) {
      const day = dayjs(str);
      if (day.isValid()) {
        const { format, show_date_only, show_time_only, show_datetime } = config || {};
        return day.format(
          format
            ? format
            : show_date_only
            ? 'YYYY-MM-DD'
            : show_time_only
            ? 'hh:mm'
            : show_datetime
            ? 'YYYY-MM-DD hh:mm:ss'
            : 'YYYY-MM-DD'
        );
      }
    }
    return str;
  } catch (err) {
    return str;
  }
};
