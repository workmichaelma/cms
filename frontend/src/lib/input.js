import { isEmpty } from 'lodash';

export const getErrorMessage = ({ schema, value }) => {
  const {
    regExp,
    is_required = false,
    is_email,
    is_phone,
    is_number_only,
    is_positive,
    is_short_date,
    foreign
  } = schema;
  let message = null;

  if (is_required && isEmpty(value)) {
    message = '此欄位不能為空';
  }

  if (value !== null && value !== '' && typeof value !== 'undefined') {
    if (foreign) {
      if (foreign === 'file' && value?.size > 5242880) {
        message = '檔案不能大於5MB';
      }
    } else {
      if (is_email && !/^\S+@\S+\.\S+$/.test(value)) {
        message = '請輸入正確電郵';
      }

      if (is_phone && !/^[1-9]\d{7}$/.test(value)) {
        message = '請輸入正確電話號碼';
      }

      if (is_number_only && !/^[-]?\d+(\.\d+)?$/.test(value)) {
        message = '請輸入數字';

        if (!message && is_positive && !/^\d+(\.\d+)?$/.test(value)) {
          message = '請輸入正數';
        }
      }

      if (is_short_date && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        message = '請輸入有效日期';
      }
      if (regExp && !isEmpty(regExp)) {
        const test = new RegExp(regExp);

        if (!test.test(value)) {
          message = '請輸入正確格式';
        }
      }
    }
  }

  return message;
};
