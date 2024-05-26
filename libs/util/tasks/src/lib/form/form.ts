export type BaseField = {
  key: string;
  label: string;
  description: string;
  required?: boolean;
  type: string;
};

export const TEXT_FIELD_VALIDATION = {
  EMAIL: 'EMAIL',
  PHONE: 'PHONE',
  URL: 'URL',
} as const;

export type TextFieldValidation =
  (typeof TEXT_FIELD_VALIDATION)[keyof typeof TEXT_FIELD_VALIDATION];

export type TextField = {
  type: 'text';
  min?: number;
  max?: number;
  validation?: TextFieldValidation;
  multiline?: number;
};

export type NumberField = {
  type: 'number';
  min?: number;
  max?: number;
};

export type SelectField = {
  type: 'select';
  options: string[];
};

export type ChoiceField = {
  type: 'choice';
  options: string[];
};

export type MultipleChoiceField = {
  type: 'multiple-choice';
  options: string[];
  min?: number;
  max?: number;
};

export type SliderField = {
  type: 'slider';
};

export const RATING_ICONS = {
  STAR: 'STAR',
  HEART: 'HEART',
} as const;

export type RatingFieldIcon = (typeof RATING_ICONS)[keyof typeof RATING_ICONS];

export type RatingField = {
  type: 'rating';
  icon: RatingFieldIcon;
};

export type FormField = BaseField &
  (
    | SelectField
    | ChoiceField
    | MultipleChoiceField
    | SliderField
    | NumberField
    | TextField
    | RatingField
  );

// a utility type that will allow us to get the type of the field based on the field type
export type FormFieldShape<T extends FormField['type']> = Extract<
  FormField,
  { type: T }
>;
