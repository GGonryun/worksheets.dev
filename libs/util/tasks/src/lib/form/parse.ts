import {
  BaseField,
  FormField,
  FormFieldShape,
  RATING_ICONS,
  TEXT_FIELD_VALIDATION,
} from './form';
import { aggregateErrors, defer, objectIncludes } from './util';

export const parseTaskFormState = (fields: FormField[], state: unknown) => {
  if (!state) {
    throw new Error('Dynamic import form data is missing');
  }

  if (typeof state !== 'object') {
    throw new Error('Dynamic import form data is not an object');
  }

  for (const key in state) {
    if (!fields.some((field) => field.key === key)) {
      throw new Error(`Unknown field key: ${key}`);
    }
  }
  // otherwise, return the parsed data
  return fields.map((field) => {
    const value = (
      state as {
        [key: string]: string | string[];
      }
    )[field.key];
    return {
      ...field,
      value,
    };
  });
};

export const parseTaskFormData = (data: unknown): { fields: FormField[] } => {
  if (!data) {
    throw new Error('Dynamic import form data is missing');
  }

  if (typeof data !== 'object') {
    throw new Error('Dynamic import form data is not an object');
  }

  if (!('fields' in data) || !Array.isArray(data.fields)) {
    throw new Error("Dynamic import form data is missing 'fields' property");
  }

  return { fields: aggregateErrors(data.fields.map(defer(parseFormField))) };
};

const parseFormField = (raw: unknown): FormField => {
  if (!raw) {
    throw new Error('Field is missing');
  }

  if (typeof raw !== 'object') {
    throw new Error('Field is not an object');
  }

  const field = parseBaseField(raw);
  const props = {
    ...raw,
    ...field,
  };

  switch (field.type) {
    case 'text':
      return parseTextField(props);
    case 'number':
      return parseNumberField(props);
    case 'select':
      return parseSelectField(props);
    case 'choice':
      return parseChoiceField(props);
    case 'multiple-choice':
      return parseMultipleChoiceField(props);
    case 'slider':
      return parseSliderField(props);
    case 'rating':
      return parseRatingField(props);
    default:
      throw new Error(`Unknown field type: ${field.type}`);
  }
};

const parseBaseField = (raw: object): BaseField => {
  const field: BaseField = {
    key: '',
    label: '',
    description: '',
    type: '',
  };

  if (!('key' in raw) || typeof raw.key !== 'string') {
    throw new Error('Field is missing key');
  }
  field.key = raw.key;

  if (!('label' in raw) || typeof raw.label !== 'string') {
    throw new Error('Field is missing label');
  }
  field.label = raw.label;

  if ('description' in raw) {
    if (typeof raw.description !== 'string')
      throw new Error('Field description is not a string');
    field.description = raw.description;
  }

  if (!('type' in raw) || typeof raw.type !== 'string') {
    throw new Error('Field is missing type');
  }
  field.type = raw.type;

  if ('required' in raw) {
    if (typeof raw.required !== 'boolean') {
      throw new Error('Field is missing required');
    } else {
      field.required = raw.required;
    }
  }

  return field;
};

const parseTextField = (raw: BaseField & unknown): FormFieldShape<'text'> => {
  const field: FormFieldShape<'text'> = {
    ...raw,
    type: 'text',
  };

  if ('min' in raw) {
    if (typeof raw.min !== 'number') {
      throw new Error('Field min is not a number');
    }
    field.min = raw.min;
  }

  if ('max' in raw) {
    if (typeof raw.max !== 'number') {
      throw new Error('Field max is not a number');
    }
    field.max = raw.max;
  }

  if ('validation' in raw) {
    if (typeof raw.validation !== 'string') {
      throw new Error('Field validation is not a string');
    }
    if (!objectIncludes(TEXT_FIELD_VALIDATION, raw.validation)) {
      throw new Error('Field validation is not a valid value');
    }

    field.validation = raw.validation;
  }

  return field;
};

const parseNumberField = (
  raw: BaseField & unknown
): FormFieldShape<'number'> => {
  const field: FormFieldShape<'number'> = {
    ...raw,
    type: 'number',
  };

  if ('min' in raw) {
    if (typeof raw.min !== 'number') {
      throw new Error('Field min is not a number');
    }
    field.min = raw.min;
  }

  if ('max' in raw) {
    if (typeof raw.max !== 'number') {
      throw new Error('Field max is not a number');
    }
    field.max = raw.max;
  }

  return field;
};

const parseSelectField = (
  raw: BaseField & unknown
): FormFieldShape<'select'> => {
  const field: FormFieldShape<'select'> = {
    ...raw,
    type: 'select',
    options: [],
  };

  if (!('options' in raw) || !Array.isArray(raw.options)) {
    throw new Error('Field is missing options');
  }

  if (raw.options.some((option) => typeof option !== 'string')) {
    throw new Error('Field options are not strings');
  }

  field.options = raw.options;

  return field;
};

const parseChoiceField = (
  raw: BaseField & unknown
): FormFieldShape<'choice'> => {
  const field: FormFieldShape<'choice'> = {
    ...raw,
    type: 'choice',
    options: [],
  };

  if (!('options' in raw) || !Array.isArray(raw.options)) {
    throw new Error('Field is missing options');
  }

  if (raw.options.some((option) => typeof option !== 'string')) {
    throw new Error('Field options are not strings');
  }

  field.options = raw.options;

  return field;
};

const parseMultipleChoiceField = (
  raw: BaseField & unknown
): FormFieldShape<'multiple-choice'> => {
  const field: FormFieldShape<'multiple-choice'> = {
    ...raw,
    type: 'multiple-choice',
    options: [],
  };

  if (!('options' in raw) || !Array.isArray(raw.options)) {
    throw new Error('Field is missing options');
  }

  if (raw.options.some((option) => typeof option !== 'string')) {
    throw new Error('Field options are not strings');
  }

  field.options = raw.options;

  if ('min' in raw) {
    if (typeof raw.min !== 'number') {
      throw new Error('Field min is not a number');
    }
    field.min = raw.min;
  }

  if ('max' in raw) {
    if (typeof raw.max !== 'number') {
      throw new Error('Field max is not a number');
    }
    field.max = raw.max;
  }

  return field;
};

const parseSliderField = (
  raw: BaseField & unknown
): FormFieldShape<'slider'> => {
  const field: FormFieldShape<'slider'> = {
    ...raw,
    type: 'slider',
  };

  return field;
};

const parseRatingField = (
  raw: BaseField & unknown
): FormFieldShape<'rating'> => {
  const field: FormFieldShape<'rating'> = {
    ...raw,
    type: 'rating',
    icon: 'STAR',
  };

  if (
    !('icon' in raw) ||
    typeof raw.icon !== 'string' ||
    !objectIncludes(RATING_ICONS, raw.icon)
  ) {
    throw new Error('Field is missing icon');
  }
  field.icon = raw.icon;

  return field;
};
