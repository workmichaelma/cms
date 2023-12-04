import mongoose from 'mongoose';
import { forEach, isUndefined, isEmpty } from 'lodash';

export const buildSchema = (schema) => {
  const fields = {
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },
    status: {
      type: Boolean,
      default: true
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  };

  forEach(schema, (item) => {
    const { field: name } = item;
    if (item.type === 'text') {
      fields[name] = {
        type: item.is_multiple ? [String] : String,
        required: item.is_required,
        select: item.select
      };
    } else if (item.type === 'textarea') {
      fields[name] = {
        type: item.is_multiple ? [String] : String
      };
    } else if (item.type === 'upload') {
      fields[name] = {
        type: item.is_multiple ? [String] : String
      };
    } else if (item.type === 'date') {
      fields[name] = {
        type: item.is_multiple ? [Date] : Date,
        required: item.is_required || false
      };
    } else if (item.type === 'object') {
      const childFields = buildSchema(item.child);
      fields[name] = {
        type: item.is_multiple ? [childFields] : childFields
      };
    } else if (item.type === 'relation') {
      fields[name] = {
        type: item.is_multiple ? [mongoose.Schema.Types.ObjectId] : mongoose.Schema.Types.ObjectId,
        ref: item.foreign,
        required: item.is_required || false
      };
    } else if (item.type === 'number') {
      fields[name] = {
        type: item.is_multiple ? [String] : String,
        required: item.is_required || false
      };
    } else if (item.type === 'boolean') {
      fields[name] = {
        type: Boolean,
        required: item.is_required || false
      };
    } else if (item.type === 'phone') {
      fields[name] = {
        type: item.is_multiple ? [String] : String,
        required: item.is_required || false,
        validate: {
          validator: function (v) {
            return /\d{8}/.test(v);
          },
          message: (props) => `${props.value} is not a valid phone number!`
        }
      };
    }

    if (!isUndefined(item.default) && !isEmpty(fields[name])) {
      fields[name] = {
        ...fields[name],
        default: item.default
      };
    }

    if (item.is_multiple) {
      fields[name] = {
        ...fields[name],
        default: item.default || []
      };
    }
  });

  return fields;
};
