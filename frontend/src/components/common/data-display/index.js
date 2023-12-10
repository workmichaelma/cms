import Boolean from './boolean';
import Money from './money';
import Numeral from './numeral';
import Date from './date';

export const getDataDisplayComponent = (props) => {
  const { value, config } = props;
  const { is_boolean, is_date, is_integer, is_money, is_number } = config;

  if (is_boolean) {
    return <Boolean {...props} />;
  }
  if (is_money) {
    return <Money {...props} />;
  }
  if (is_number || is_integer) {
    return <Numeral {...props} />;
  }
  if (is_date) {
    return <Date {...props} />;
  }

  return <p>{value}</p>;
};
