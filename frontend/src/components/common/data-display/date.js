import { parseISODateString } from 'lib/date';
import React from 'react';

function Date({ value, config }) {
  const { format, show_date_only, show_time_only } = config;
  return <p>{parseISODateString(value, { format, show_date_only, show_time_only })}</p>;
}

export default Date;
