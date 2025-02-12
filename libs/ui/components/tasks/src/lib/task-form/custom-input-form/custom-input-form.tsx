/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Divider, FormHelperText, Typography } from '@mui/material';
import { Column } from '@worksheets/ui/components/flex';
import { assertNever } from '@worksheets/util/errors';
import {
  FormField,
  parseTaskFormData,
  parseTaskFormState,
  TaskFormProps,
  TextFieldValidation,
  validate,
} from '@worksheets/util/tasks';
import { useState } from 'react';

import {
  BaseChoiceField,
  BaseMultipleChoiceField,
  BaseRatingField,
  BaseSelectField,
  BaseSliderField,
  BaseTextField,
} from './fields';

export const CustomInputForm: React.FC<TaskFormProps> = ({ task, actions }) => {
  if (task.status === 'COMPLETED') return <CompletedForm task={task} />;
  return <Form task={task} actions={actions} />;
};

const CompletedForm: React.FC<Omit<TaskFormProps, 'actions'>> = ({ task }) => {
  const { fields } = parseTaskFormData(task.data);
  const state = parseTaskFormState(fields, task.state);

  return (
    <Column mt={-1} gap={1}>
      {task.createdAt && (
        <Typography typography={'body2'}>
          <b>Submitted at:</b> {new Date(task.createdAt).toLocaleString()}
        </Typography>
      )}
      {task.expiresAt && (
        <Typography typography={'body2'}>
          <b>Expires at:</b> {new Date(task.expiresAt).toLocaleString()}
        </Typography>
      )}
      <Divider />
      <Column mt={1}>
        <Typography typography={'body1'} fontWeight={700}>
          Your Submission
        </Typography>
        {state.map((field) => (
          <Typography key={field.key} typography={'body2'}>
            <u>{field.label}</u>:{' '}
            {!field.value ? (
              <i>No Response</i>
            ) : Array.isArray(field.value) ? (
              field.value.join(', ')
            ) : (
              field.value
            )}
          </Typography>
        ))}
      </Column>
    </Column>
  );
};

const Form: React.FC<TaskFormProps> = ({ task, actions }) => {
  const { fields } = parseTaskFormData(task.data);
  const [data, setData] = useState<any>({});
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const handleChange = (field: FormField) => (value: any) => {
    // set the new value.
    setData((prev: any) => ({ ...prev, [field.key]: value }));
    // set any new errors or clear old ones.
    setErrors((prev) => ({ ...prev, [field.key]: validate({ field, value }) }));
  };

  const handleSubmit = () => {
    // validate all fields.
    const newErrors: Record<string, string | undefined> = Object.fromEntries(
      fields.map((field) => [
        field.key,
        validate({ field, value: data[field.key] }),
      ])
    );

    setErrors(newErrors);

    // if there are no errors, submit the form.
    if (!Object.values(newErrors).some((e) => e && e.length > 0)) {
      actions.onSubmit({ repetitions: 1, state: data });
    }
  };

  return (
    <Column gap={1}>
      <Column gap={2}>
        {fields.map((field) => (
          <PolymorphicField
            key={field.key}
            field={field}
            value={data[field.key]}
            error={errors[field.key]}
            onChange={handleChange(field)}
          />
        ))}
      </Column>
      <Button
        variant="arcade"
        onClick={handleSubmit}
        disabled={Object.values(errors).some((e) => e && e.length > 0)}
      >
        Submit
      </Button>
      <FormHelperText>
        You cannot change your responses after submitting.
      </FormHelperText>
    </Column>
  );
};

const PolymorphicField: React.FC<{
  field: FormField;
  value: any;
  error: string | undefined;
  onChange: (value: any) => void;
}> = ({ field, error, value, onChange }) => {
  const type = field.type;
  switch (type) {
    case 'text':
      return (
        <BaseTextField
          label={field.label}
          type={convertFieldValidation(field.validation)}
          id={`text-${field.key}`}
          err={error}
          description={field.description}
          value={value}
          required={field.required}
          onChange={(e) => onChange(e.target.value)}
          rows={field.multiline}
          multiline={Boolean(field.multiline)}
        />
      );
    case 'number':
      return (
        <BaseTextField
          label={field.label}
          type="number"
          id={`number-${field.key}`}
          err={error}
          description={field.description}
          value={value}
          required={field.required}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case 'select':
      return (
        <BaseSelectField
          label={field.label}
          id={`select-${field.key}`}
          err={error}
          description={field.description}
          value={value}
          options={field.options}
          required={field.required}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case 'choice':
      return (
        <BaseChoiceField
          id={`choice-${field.key}`}
          label={field.label}
          err={error}
          description={field.description}
          value={value}
          options={field.options}
          required={field.required}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case 'multiple-choice':
      return (
        <BaseMultipleChoiceField
          id={`multiple-choice-${field.key}`}
          label={field.label}
          err={error}
          description={field.description}
          value={value ?? []}
          options={field.options}
          required={field.required}
          onChange={(v) => onChange(v)}
        />
      );
    case 'rating':
      return (
        <BaseRatingField
          id={`rating-${field.key}`}
          value={value}
          onChange={(_, v) => onChange(v)}
          label={field.label}
          description={field.description}
          required={field.required}
          err={error}
          icon={field.icon}
        />
      );
    case 'slider':
      return (
        <BaseSliderField
          id={`slider-${field.key}`}
          value={value ?? 0}
          onChange={(_, v) => onChange(v)}
          description={field.description}
          label={field.label}
          required={field.required}
          err={error}
        />
      );
    default:
      throw assertNever(type);
  }
};

const convertFieldValidation = (
  validation?: TextFieldValidation
): 'text' | 'email' | 'tel' | 'url' => {
  switch (validation) {
    case 'EMAIL':
      return 'email';
    case 'PHONE':
      return 'tel';
    case 'URL':
      return 'url';
    case undefined:
      return 'text';
    default:
      throw assertNever(validation);
  }
};
