import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { LogLevel } from '@worksheets/data-access/tasks';
import { FormLayout } from '../form-layout';
import { WorksheetNameField } from './fields/worksheet-name';
import { checkValidWorksheetName } from '../../shared/util';
import { WorksheetDescriptionField } from './fields/worksheet-description';
import { WorksheetLogLevelField } from './fields/worksheet-log-level';
import { WorksheetTimeoutField } from './fields/worksheet-timeout';

export type ConfigFormValues = {
  name: string;
  description: string;
  logLevel: LogLevel;
  timeout?: number;
};

export type ConfigFormProps = {
  state: Partial<ConfigFormValues>;
  onSubmit: (values: ConfigFormValues) => void;
  onCancel: () => void;
};

const DEFAULT_CONFIG_FORM_VALUES = {
  name: '',
  description: '',
  logLevel: 'trace' as const,
  timeout: undefined,
};

export const ConfigureForm: React.FC<ConfigFormProps> = ({
  state,
  onSubmit,
  onCancel,
}) => {
  const [form, setForm] = useState<ConfigFormValues>(
    DEFAULT_CONFIG_FORM_VALUES
  );

  useEffect(() => {
    setForm({ ...DEFAULT_CONFIG_FORM_VALUES, ...state });
  }, [state]);

  console.log('new form', form);

  const hasRequiredFields = form.name.length > 0 && Boolean(form.logLevel);

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
          onUpdate={(description) => setForm({ ...form, description })}
        />

        <WorksheetLogLevelField
          level={form.logLevel}
          onUpdate={(logLevel) => setForm({ ...form, logLevel })}
        />

        <WorksheetTimeoutField
          timeout={form.timeout ?? 600}
          onUpdate={(timeout) => setForm({ ...form, timeout })}
        />
      </Box>
    </FormLayout>
  );
};
