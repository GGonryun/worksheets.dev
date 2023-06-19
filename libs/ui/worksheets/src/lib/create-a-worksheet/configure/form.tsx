import {
  Box,
  TextField,
  MenuItem,
  Button,
  TextFieldProps,
  Typography,
  Tooltip,
} from '@mui/material';
import styles from './form.module.scss';
import HelpIcon from '@mui/icons-material/Help';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react';
import { TriggerMenu } from './menu';
import { LogLevel } from '@worksheets/data-access/tasks';
import { FormLayout } from '../form-layout';

export type ConfigFormValues = {
  name: string;
  description: string;
  logging: LogLevel;
};

export type ConfigFormProps = {
  state: ConfigFormValues;
  onSubmit: (values: ConfigFormValues) => void;
  onCancel: () => void;
};

export const ConfigureForm: React.FC<ConfigFormProps> = ({
  state,
  onSubmit,
  onCancel,
}) => {
  const [form, setForm] = useState<ConfigFormValues>(
    state ?? {
      name: '',
      description: '',
      logging: 'trace',
    }
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpenTriggerMenu = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseTriggerMenu = () => {
    setAnchorEl(null);
  };

  const handleTriggerMenuSelection = () => {
    alert('TODO');
    setAnchorEl(null);
  };

  const labelProps: Partial<TextFieldProps> = {
    size: 'small',
    InputLabelProps: {
      shrink: true,
      sx(theme) {
        return {
          color: theme.palette.text.primary,
          fontWeight: 'bold',
        };
      },
      classes: { asterisk: styles['asterisk'] },
    },
  };

  const hasRequiredFields = form.name.length > 0 && Boolean(form.logging);

  const checkValidWorksheetName = (name: string) => {
    // regex check name for valid alphanumeric characters and no spaces and special characters '-','_' are allowed
    const regex = /^[a-zA-Z0-9_-]*$/;
    return regex.test(name);
  };

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
      <TriggerMenu
        anchorEl={anchorEl}
        onSelect={handleTriggerMenuSelection}
        onClose={handleCloseTriggerMenu}
      />
      <Box display="flex" flexDirection="column" py={4} px={3} gap={4}>
        <TextField
          {...labelProps}
          error={!isWorksheetNameValid}
          helperText={
            !isWorksheetNameValid
              ? 'Name must only contain letters, numbers, hyphens and underscores'
              : ''
          }
          label="Name"
          required
          value={form.name}
          onChange={(value) =>
            setForm({ ...form, name: value.currentTarget.value })
          }
        />

        <TextField
          {...labelProps}
          label="Description"
          size="small"
          multiline
          rows={2}
          helperText="Describe what your worksheet does."
          value={form.description}
          onChange={(value) =>
            setForm({ ...form, description: value.currentTarget.value })
          }
        />
        <TextField
          {...labelProps}
          label="Log Level"
          helperText="We'll record only logs at this level or higher."
          select
          required
          value={form.logging}
          onChange={(value) =>
            setForm({
              ...form,
              logging: value.target.value as LogLevel,
            })
          }
        >
          {logLevels.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography fontWeight={900} variant="caption">
            Triggers (optional)
          </Typography>
          <Tooltip
            title="Invoke your worksheet on a schedule or in response to an event."
            placement="top-start"
          >
            <HelpIcon fontSize="small" />
          </Tooltip>
        </Box>
        <Box>
          <Button
            variant="contained"
            size="small"
            startIcon={<AddIcon fontSize="small" />}
            endIcon={<ArrowDropDownIcon fontSize="small" />}
            onClick={handleOpenTriggerMenu}
          >
            Triggers
          </Button>
        </Box>
      </Box>
    </FormLayout>
  );
};

const logLevels: { label: string; value: LogLevel }[] = [
  {
    label: 'All',
    value: 'trace',
  },
  {
    label: 'Info',
    value: 'info',
  },
  {
    label: 'Debug',
    value: 'debug',
  },
  {
    label: 'Warn',
    value: 'warn',
  },
  {
    label: 'Error',
    value: 'error',
  },
  {
    label: 'Fatal',
    value: 'fatal',
  },
];
