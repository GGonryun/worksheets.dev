import { assertNever } from '@worksheets/util/errors';
import {
  validateEmail,
  validateHttpsUrl,
  validatePhone,
} from '@worksheets/util/strings';

import { ValidationOptions } from '../task';
import { FormField } from './form';
import { parseTaskFormData, parseTaskFormState } from './parse';

export const validateFormInput = (opts: ValidationOptions) => {
  const { fields } = parseTaskFormData(opts.data);
  parseTaskFormState(fields, opts.state);
};

export const validate = ({
  field,
  value,
}: {
  field: FormField;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}) => {
  const { type } = field;
  switch (type) {
    case 'number':
      if (value === '' || value == null) {
        if (field.required) return 'Value is required';
        return undefined;
      }
      if (isNaN(value)) return 'Value must be a number';
      if (field.min && value < field.min)
        return `Value must be greater than ${field.min}`;
      if (field.max && value > field.max)
        return `Value must be less than ${field.max}`;
      return undefined;
    case 'text':
      if (value === '' || value == null) {
        if (field.required) return 'Value is required';
        return undefined;
      }
      if (field.min && value.length < field.min)
        return `Value must be at least ${field.min} characters`;
      if (field.max && value.length > field.max)
        return `Value must be less than ${field.max} characters`;
      if (field.validation) {
        if (field.validation === 'EMAIL' && !validateEmail(value))
          return 'Please enter a valid email address';
        if (field.validation === 'URL') {
          if (!value.startsWith('https://')) {
            return 'Please enter a valid URL starting with https://';
          }
          if (!validateHttpsUrl(value)) {
            return 'Please enter a valid URL';
          }
        }
        if (field.validation === 'PHONE' && !validatePhone(value)) {
          return 'Please enter a valid phone number';
        }
      }
      return undefined;
    case 'select':
      if (field.required && !value) return 'Value is required';
      return undefined;
    case 'choice':
      if (field.required && !value) return 'Value is required';

      return undefined;
    case 'multiple-choice':
      if (field.required && !value) return 'At least one option is required';
      if (!Array.isArray(value)) return 'Value must be an array';
      if (field.required && value.length === 0)
        return 'At least one option is required';
      if (field.min && value.length < field.min)
        return `Please select at least ${field.min} options`;
      if (field.max && value.length > field.max)
        return `Please select less than ${field.max} options`;
      return undefined;
    case 'rating':
      if (field.required && !value) return 'Select a rating';
      return undefined;
    case 'slider':
      if (field.required && value == null) return 'Select a value';
      if (isNaN(value)) return 'Value must be a number';
      return undefined;
    default:
      throw assertNever(type);
  }
};
