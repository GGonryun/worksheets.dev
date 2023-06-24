import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Typography from '@mui/material/Typography';
import { SharedTextField } from '../shared/shared-text-field';
import { Alert, Divider, Link, MenuItem } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { ReviewRow } from '../shared/sidecar-components/review-row';
import { StepContentWithActions } from '../shared/sidecar-components/step-content-with-actions';
import { StepLabelWithCaption } from '../shared/sidecar-components/step-label-with-caption';
import { DynamicSettingsForm } from './dynamic-form/dynamic-form';
import {
  GetApplicationResponse,
  ListApplicationsResponse,
} from '../shared/types';
import Image from 'next/image';
import { useConnectionBuilder } from './useConnectionBuilder';

const MAX_INDEX = 2;

export const ConnectionBuilderSteps: React.FC<{
  connectionId: string;
  apps: ListApplicationsResponse;
  onClose: () => void;
}> = ({ connectionId, apps, onClose }) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const {
    connection,
    fields,
    validation,
    app,
    save,
    updateSettingsFieldHandler,
    updateConnection,
  } = useConnectionBuilder({ connectionId });

  const handleNext = () => {
    if (activeStep === 2) {
      save();
      onClose();
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
          maxIndex={MAX_INDEX}
          index={0}
          disableNext={!validation.details.ok}
          tooltip={validation.details.message}
          onBack={handleBack}
          onNext={handleNext}
        >
          <Box my={3} display="flex" flexDirection={'column'} gap={3}>
            <SharedTextField
              label="Application name"
              helperText={'The application to create a connection to.'}
              select
              required
              value={connection.appId}
              onChange={(value) =>
                updateConnection({ appId: value.target.value })
              }
            >
              {apps?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </SharedTextField>
            <SharedTextField
              label="Connection name"
              helperText={
                validation.name.ok
                  ? 'A user friendly name for your connection.'
                  : validation.name.message
              }
              required
              error={!validation.name.ok}
              value={connection.name}
              onChange={(value) =>
                updateConnection({ name: value.target.value })
              }
            />
          </Box>
        </StepContentWithActions>
      </Step>
      <Step key={1}>
        <StepLabelWithCaption
          label={'Authentication'}
          caption={`Set secure tokens for access in worksheets.`}
        />
        <StepContentWithActions
          description={''}
          maxIndex={MAX_INDEX}
          index={1}
          disableNext={!validation.authentication.ok}
          tooltip={validation.authentication.message}
          onBack={handleBack}
          onNext={handleNext}
        >
          <Box m={1} display="flex" flexDirection={'column'} gap={1}>
            {app && <AppLabel app={app} />}
            <DynamicSettingsForm
              fields={fields}
              settings={connection.settings}
              onFieldUpdate={updateSettingsFieldHandler}
            />
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
          maxIndex={MAX_INDEX}
          onBack={handleBack}
          onNext={handleNext}
        >
          <Box display="flex" flexDirection={'column'} my={1} gap={0.25}>
            <Typography variant="body1" py={1}>
              Connection details
            </Typography>
            <Divider />
            <ReviewRow label="Application">{connection.appId}</ReviewRow>
            <Divider />
            <ReviewRow label="Connection name">{connection.name}</ReviewRow>
            <Divider />
            <ReviewRow label="Changed properties">
              {Object.keys(connection.settings ?? {}).length}
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

const AppLabel: React.FC<{ app: GetApplicationResponse }> = ({ app }) => (
  <Box display="flex" alignItems="center" gap={1}>
    {app?.name && app?.logo && (
      <Box
        border={({ palette }) => `1px solid ${palette.divider}`}
        display="flex"
        alignItems="center"
        justifyContent={'center'}
        padding={0.25}
      >
        <Image
          height={20}
          width={20}
          src={app.logo}
          alt={`${app?.name} logo`}
        />
      </Box>
    )}
    <Box>{app?.name}</Box>
  </Box>
);
