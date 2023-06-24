import { Box } from '@mui/material';
import { useState } from 'react';
import { LogLevel } from '@worksheets/data-access/tasks';
import { FormLayout } from '../form-layout';
import { WorksheetNameField } from './fields/worksheet-name';
import { checkValidWorksheetName } from '../../shared/util';
import { WorksheetDescriptionField } from './fields/worksheet-description';
import { WorksheetLogLevelField } from './fields/worksheet-log-level';

export type ConfigFormValues = {
  name: string;
  description: string;
  logging: LogLevel;
};

export type ConfigFormProps = {
  state: Partial<ConfigFormValues>;
  onSubmit: (values: ConfigFormValues) => void;
  onCancel: () => void;
};

export const ConfigureForm: React.FC<ConfigFormProps> = ({
  state,
  onSubmit,
  onCancel,
}) => {
  const [form, setForm] = useState<ConfigFormValues>({
    name: '',
    description: '',
    logging: 'trace',
    ...state,
  });

  const hasRequiredFields = form.name.length > 0 && Boolean(form.logging);

  const isWorksheetNameValid = checkValidWorksheetName(form.name);

  const tooltipMessage = !hasRequiredFields
    ? 'Set required fields to continue.'
    : !isWorksheetNameValid
    ? 'Correct invalid fields to continue.'
    : 'Continue to next step.';

  return (
    <FormLayout
      actions={{
        primary: {
          label: 'Next',
          disabled: !hasRequiredFields || !isWorksheetNameValid,
          onClick: () => onSubmit(form),
          tooltip: tooltipMessage,
        },
        tertiary: {
          label: 'Cancel',
          onClick: onCancel,
          color: 'inherit',
          sx: { fontWeight: 900 },
        },
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        py={4}
        px={3}
        gap={4}
        maxWidth={700}
      >
        <WorksheetNameField
          name={form.name}
          onUpdate={(name) => {
            setForm({ ...form, name });
          }}
        />

        <WorksheetDescriptionField
          description={form.description ?? ''}
          onUpdate={(description) => ({ ...form, description })}
        />

        <WorksheetLogLevelField
          level={form.logging}
          onUpdate={(logging) => ({ ...form, logging })}
        />
      </Box>
    </FormLayout>
  );
};
