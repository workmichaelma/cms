import { find, forEach, isObject, isPlainObject } from 'lodash';
import { getDataDisplayComponent } from 'components/common/data-display';

export const withSchemaConfig = (WrappedComponent) => {
  return (props) => {
    const { schema = [], field, value, config = {} } = props || {};
    let Component = null;
    let setting = {
      readonly: false,
      is_boolean: false,
      is_money: false,
      is_integer: false,
      is_id: false,
      is_phone: false,
      is_email: false,
      is_password: false,
      is_date: false,
      is_percentage: false,
      is_file: false,

      show_date_only: false,
      show_time_only: false
    };

    let fieldSchema = null;
    if (field) {
      fieldSchema = find(schema, { field });
    } else if (isPlainObject(schema)) {
      fieldSchema = schema;
    }

    if (fieldSchema) {
      setting = {
        ...setting,
        ...fieldSchema
      };

      switch (fieldSchema.type) {
        case 'boolean':
          setting.is_boolean = true;
          break;
        case 'date':
          setting.is_date = true;
          setting.format = config?.format || 'YYYY-MM-DD hh:mm:ss';
          break;
        case 'relation':
          if (fieldSchema?.foreign === 'file') {
            setting.is_file = true;
          }

          break;
        default:
          break;
      }
    }

    Component = getDataDisplayComponent({ value, config: setting });

    return <WrappedComponent {...props} config={setting} Component={Component} />;
  };
};
