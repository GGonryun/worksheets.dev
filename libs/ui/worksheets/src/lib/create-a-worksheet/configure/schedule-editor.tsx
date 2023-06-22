import {
  Stepper,
  Step,
  Box,
  MenuItem,
  Typography,
  Divider,
  Alert,
  Link,
} from '@mui/material';
import {
  StepContentWithActions,
  ReviewRow,
  StepLabelWithCaption,
} from '../../connections/connection-builder-steps';
import { SharedTextField } from '../../shared/shared-text-field';
import { SidecarLayout } from '../../shared/sidecar-layout';
import { LogLevel } from '@worksheets/data-access/tasks';
import React from 'react';
import InfoIcon from '@mui/icons-material/Info';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  safelyParseCronSchedule,
  validateCronSchedule,
} from '@worksheets/util/cron';
import PanToolIcon from '@mui/icons-material/PanToolOutlined';
export type ScheduleForm = {
  name: string;
  description: string;
  frequency: string;
  timezone: string;
  arguments: string; //jsonified input arguments
  logLevel: LogLevel;
};
export type ScheduleEditorProps = {
  onSubmit: (form: ScheduleForm) => void;
};
export const ScheduleEditor: React.FC<ScheduleEditorProps> = ({ onSubmit }) => {
  const [form, setForm] = React.useState<ScheduleForm>({
    name: '',
    description: '',
    frequency: '',
    timezone: '',
    arguments: '{}',
    logLevel: 'silent',
  });

  const [activeStep, setActiveStep] = React.useState(0);

  const updateForm = (updates: Partial<ScheduleForm>) => {
    setForm({ ...form, ...updates });
  };

  const handleNext = () => {
    if (activeStep === 2) {
      onSubmit(form);
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const cron = safelyParseCronSchedule(form.frequency);
  return (
    <SidecarLayout
      open={true}
      onClose={function (): void {
        throw new Error('Function not implemented.');
      }}
      title={'Execute your task on a schedule'}
    >
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step key={0}>
          <StepLabelWithCaption
            label={'Schedule'}
            caption={"Set the frequency and timezone for your task's schedule."}
          />
          <StepContentWithActions
            description={
              'Schedules let you trigger execution of your worksheet on a regular basis.'
            }
            index={0}
            disableNext={form.name.length < 3 || !cron.ok}
            tooltip="You must set all required fields to continue."
            onBack={handleBack}
            onNext={handleNext}
          >
            <Box my={3} display="flex" flexDirection={'column'} gap={3}>
              <SharedTextField
                label="Name"
                helperText="A user friendly name for your schedule."
                required
                value={form.name}
                onChange={(value) => updateForm({ name: value.target.value })}
              />
              <Box display="flex" flexDirection={'column'} gap={0}>
                <SharedTextField
                  label="Frequency"
                  helperText={
                    <>
                      {!cron.ok
                        ? cron.error
                        : 'Schedules must be specified using a unix-cron format. '}
                      Build advanced <b>cron</b> expressions with our partners
                      at{' '}
                      <Link href="https://crontab.guru/" target="_blank">
                        crontab.guru <OpenInNewIcon />
                      </Link>
                      .
                    </>
                  }
                  required
                  error={!validateCronSchedule(form.frequency)}
                  value={form.frequency}
                  onChange={(value) =>
                    updateForm({ frequency: value.target.value })
                  }
                />
                <Alert
                  icon={<InfoIcon color="action" />}
                  sx={(theme) => ({
                    color: theme.palette.text.primary,
                    whiteSpace: 'pre-line',
                    fontFamily: 'monospace',
                    backgroundColor: theme.palette.grey[200],
                  })}
                >
                  {sample.trim()}
                </Alert>
              </Box>
              <SharedTextField
                label="Timezone"
                helperText=""
                select
                required
                defaultValue={'UTC'}
                value={form.timezone}
                onChange={(value) =>
                  updateForm({ timezone: value.target.value })
                }
              >
                {timezones.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </SharedTextField>
              <Alert
                icon={<PanToolIcon color="action" />}
                sx={(theme) => ({
                  color: theme.palette.text.primary,
                  whiteSpace: 'pre-line',
                  fontFamily: 'monospace',
                  backgroundColor: theme.palette.grey[200],
                })}
              >
                <Typography variant="body2">
                  Jobs set in timezones affected by Daylight Saving Time (DST)
                  may execute outside of their scheduled cadence. Use UTC or a
                  non-DST timezone to avoid this problem.{' '}
                  <Link href="/docs/cron" target="_blank">
                    Learn more <OpenInNewIcon fontSize="small" />
                  </Link>
                  .
                </Typography>
              </Alert>

              <SharedTextField
                label="Description"
                multiline
                rows={2}
                value={form.description}
                onChange={(value) =>
                  updateForm({ description: value.target.value })
                }
              />
            </Box>
          </StepContentWithActions>
        </Step>
        <Step key={1}>
          <StepLabelWithCaption
            label={'Configuration'}
            caption={`Provide inputs and logging to your worksheet.`}
          />
          <StepContentWithActions
            description={
              'You can pass an optional JSON object as input everytime a schedule executes your worksheet.'
            }
            index={1}
            onBack={handleBack}
            onNext={handleNext}
          >
            <Box my={3} display="flex" flexDirection={'column'} gap={3}>
              TODO: Dynamic form based on app
            </Box>
          </StepContentWithActions>
        </Step>
        <Step key={2}>
          <StepLabelWithCaption
            label="Review"
            caption="Review and create your connection."
          />
          <StepContentWithActions
            description={
              'You can manage and delete your account credentials at any time. We will never ask you for your credentials or a way to identify them.'
            }
            index={2}
            onBack={handleBack}
            onNext={handleNext}
          >
            <Box display="flex" flexDirection={'column'} my={1} gap={0.25}>
              <Typography variant="body1" py={1}>
                Schedule details
              </Typography>
              <Divider />
              <ReviewRow label="TODO">{'TODO'}</ReviewRow>
              <Divider />
            </Box>
          </StepContentWithActions>
        </Step>
      </Stepper>
    </SidecarLayout>
  );
};

const timezones = [
  {
    value: 'UTC',
    label: 'UTC',
  },
  {
    value: 'America/New_York',
    label: 'Eastern Time',
  },
  {
    value: 'America/Chicago',
    label: 'Central Time',
  },
  {
    value: 'America/Denver',
    label: 'Mountain Time',
  },
  {
    value: 'America/Phoenix',
    label: 'Mountain Time (no DST)',
  },
  {
    value: 'America/Los_Angeles',
    label: 'Pacific Time',
  },
  {
    value: 'America/Anchorage',
    label: 'Alaska Time',
  },
];

const sample = `
* * * * *
| | | | |
| | | | +----- Day of the Week   (0 - 7) (Sunday=0/7)
| | | +------- Month             (1 - 12)
| | +--------- Day of the Month  (1 - 31)
| +----------- Hour              (0 - 23)
+------------- Minute            (0 - 59)`;
