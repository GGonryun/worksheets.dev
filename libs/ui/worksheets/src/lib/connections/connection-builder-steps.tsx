import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';
import { SharedTextField } from '../shared/shared-text-field';
import { Alert, Divider, Link, MenuItem, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export type ConnectionForm = {
  name: string;
  app: string;
  description: string;
  // before doing the handshake, the user sends an idempotent key (uuid) to the server to create the handshake for the oauth with.
  // if the oauth succeeds, then the server returns an ack, and the user can send the same idempotent key again to the server to create the connection. the server uses the idempotent key to pull the oauth token out from the handshake and into the new connection. then we return the connection id to the user.
  properties: Record<string, string>;
};

const MAX_INDEX = 2;

export const ConnectionBuilderSteps: React.FC<{
  onConnect: (options: ConnectionForm) => void;
}> = ({ onConnect }) => {
  const [form, setForm] = React.useState<ConnectionForm>({
    name: '',
    description: '',
    app: '',
    properties: {},
  });

  const [activeStep, setActiveStep] = React.useState(0);

  const updateForm = (updates: Partial<ConnectionForm>) => {
    setForm({ ...form, ...updates });
  };

  const handleNext = () => {
    if (activeStep === 2) {
      onConnect(form);
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Stepper activeStep={activeStep} orientation="vertical">
      <Step key={0}>
        <StepLabelWithCaption
          label={'Connection details'}
          caption={`Select an application and method to connect to.`}
        />
        <StepContentWithActions
          description={
            'Connections serve as bridges between different applications and systems, enabling seamless data exchange and interaction.'
          }
          index={0}
          disableNext={form.name.length < 3 || form.app === ''}
          tooltip="You must set all required fields to continue."
          onBack={handleBack}
          onNext={handleNext}
        >
          <Box my={3} display="flex" flexDirection={'column'} gap={3}>
            <SharedTextField
              label="Application name"
              helperText="The application to create a connection to."
              select
              required
              value={form.app}
              onChange={(value) => updateForm({ app: value.target.value })}
            >
              {apps.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </SharedTextField>
            <SharedTextField
              label="Connection name"
              helperText="An user friendly name for your connection."
              required
              value={form.name}
              onChange={(value) => updateForm({ name: value.target.value })}
            />
            <SharedTextField
              label="Connection description"
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
          label={'Authentication'}
          caption={`Set secure tokens for access.`}
        />
        <StepContentWithActions
          description={'This will be used to authenticate your connection.'}
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
              Connection details
            </Typography>
            <Divider />
            <ReviewRow label="Application">{form.app}</ReviewRow>
            <Divider />
            <ReviewRow label="Connection name">{form.name}</ReviewRow>
            <Divider />
            <ReviewRow label="Connection description">
              {form.description}
            </ReviewRow>
            <Divider />
            <ReviewRow label="Changed properties">
              {form.properties.length ?? 0}
            </ReviewRow>
            <Divider />
          </Box>
          <Box my={2}>
            <Alert icon={<InfoIcon color="primary" />} color="info">
              It may take a few minutes to provision your credentials. Check the
              status of your connection from the{' '}
              <Link href="/connections" target="_blank">
                Connections page{' '}
                <OpenInNewIcon color="primary" fontSize={'small'} />.
              </Link>
            </Alert>
          </Box>
        </StepContentWithActions>
      </Step>
    </Stepper>
  );
};

const ReviewRow: React.FC<{ label: string; children: ReactNode }> = ({
  label,
  children,
}) => {
  return (
    <Box display="flex" alignItems="center" p={0} m={0}>
      <Box width="190px">
        <Typography variant="body2" fontWeight={900}>
          {label}:
        </Typography>
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary">
          {children}
        </Typography>
      </Box>
    </Box>
  );
};

const StepLabelWithCaption: React.FC<{ caption?: string; label: string }> = ({
  caption,
  label,
}) => {
  return (
    <StepLabel
      optional={
        caption ? <Typography variant="caption">{caption}</Typography> : null
      }
    >
      {label}
    </StepLabel>
  );
};

const StepContentWithActions: React.FC<{
  children: ReactNode;
  description: string;
  index: number;
  disableNext?: boolean;
  tooltip?: string;
  onBack: () => void;
  onNext: () => void;
}> = ({
  index,
  description,
  children,
  disableNext,
  tooltip,
  onBack,
  onNext,
}) => {
  return (
    <StepContent>
      <Typography fontSize={14}>{description}</Typography>
      {children}
      <Box sx={{ mb: 2 }}>
        <div>
          <Tooltip
            title={tooltip}
            disableHoverListener={Boolean(tooltip) && !disableNext}
          >
            <span>
              <Button
                disabled={disableNext}
                variant="contained"
                onClick={onNext}
                sx={{ mt: 1, mr: 1 }}
              >
                {index === MAX_INDEX ? 'Finish' : 'Continue'}
              </Button>
            </span>
          </Tooltip>
          <Button disabled={index === 0} onClick={onBack} sx={{ mt: 1, mr: 1 }}>
            Back
          </Button>
        </div>
      </Box>
    </StepContent>
  );
};

// TODO: dynamic app selection
const apps = [
  { value: 'google-sheets', label: 'Google Sheets' },
  { value: 'google-analytics', label: 'Google Analytics' },
  { value: 'google-search-console', label: 'Google Search Console' },
  { value: 'google-ads', label: 'Google Ads' },
  { value: 'google-bigquery', label: 'Google BigQuery' },
];
