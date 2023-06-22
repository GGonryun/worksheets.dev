import { Box, Button, Typography, Tooltip } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react';
import { TriggerMenu } from './menu';
import { LogLevel } from '@worksheets/data-access/tasks';
import { FormLayout } from '../form-layout';
import { WorksheetNameField } from './fields/worksheet-name';
import { checkValidWorksheetName } from '../../shared/util';
import { WorksheetDescriptionField } from './fields/worksheet-description';
import { WorksheetLogLevelField } from './fields/worksheet-log-level';
import { ScheduleEditor } from './schedule-editor';

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

  const [showScheduleEditor, setShowScheduleEditor] = useState(false);
  const [showEventEditor, setShowEventEditor] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpenTriggerMenu = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseTriggerMenu = () => {
    setAnchorEl(null);
  };

  const handleTriggerMenuSelection = (value: 'schedule' | 'event') => {
    alert(`TODO: Implement trigger menu '${value}' selection.`);
    setAnchorEl(null);
  };

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
      <TriggerMenu
        anchorEl={anchorEl}
        onSelect={handleTriggerMenuSelection}
        onClose={handleCloseTriggerMenu}
      />
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
