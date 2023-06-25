import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Typography from '@mui/material/Typography';
import { SharedTextField } from '../../shared/shared-text-field';
import { Alert, Divider, Link, MenuItem } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  ReviewRow,
  ReviewRowText,
} from '../../shared/sidecar-components/review-row';
import { StepContentWithActions } from '../../shared/sidecar-components/step-content-with-actions';
import { StepLabelWithCaption } from '../../shared/sidecar-components/step-label-with-caption';
import { DynamicSettingsForm } from '../dynamic-form/dynamic-form';
import { ListApplicationsResponse } from '../../shared/types';
import { useConnectionBuilder } from '../useConnectionBuilder';
import { ModificationBanner } from './modification-banner';
import { AppLabel } from './app-label';
import { useEffect } from 'react';

const MAX_INDEX = 2;

export const ConnectionBuilderSteps: React.FC<{
  connectionId: string;
  apps: ListApplicationsResponse;
  onClose: () => void;
  canEdit?: boolean;
}> = ({ connectionId, apps, onClose, canEdit }) => {
  const {
    connection,
    fields,
    validation,
    app,
    editing,
    cannotEdit,
    relatedWorksheets,
    save,
    updateSettingsFieldHandler,
    updateConnection,
  } = useConnectionBuilder({ connectionId, canEdit });
  const [activeStep, setActiveStep] = React.useState(0);

  useEffect(() => {
    setActiveStep(editing ? 2 : 0);
  }, [editing]);

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
    <Stepper activeStep={activeStep} nonLinear orientation="vertical">
      <Step completed={editing} key={0}>
        {cannotEdit && <ModificationBanner connectionId={connectionId} />}
        <StepLabelWithCaption
          onClick={() => setActiveStep(0)}
          label={'Application details'}
          caption={`Select an application and method to connect to`}
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
              disabled={cannotEdit}
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
              disabled={cannotEdit}
              error={!validation.name.ok}
              value={connection.name}
              onChange={(value) =>
                updateConnection({ name: value.target.value })
              }
            />
          </Box>
        </StepContentWithActions>
      </Step>
      <Step completed={editing} key={1}>
        <StepLabelWithCaption
          onClick={validation.details.ok ? () => setActiveStep(1) : undefined}
          label={'Connection settings'}
          caption={`Save secure tokens or flags for access in worksheets`}
        />
        <StepContentWithActions
          description={
            'Connection settings are stored securely and get loaded into worksheets as context variables during execution.'
          }
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
              disabled={cannotEdit}
              fields={fields}
              settings={connection.settings}
              onFieldUpdate={updateSettingsFieldHandler}
            />
          </Box>
        </StepContentWithActions>
      </Step>
      <Step completed={editing} key={2}>
        <StepLabelWithCaption
          onClick={
            validation.details.ok && validation.authentication.ok
              ? () => setActiveStep(2)
              : undefined
          }
          label="Review"
          caption="Review and create your connection."
        />
        <StepContentWithActions
          description={
            'You can manage and delete your account credentials at any time. We will never ask you for your credentials or a way to identify them.'
          }
          index={2}
          disableNext={cannotEdit}
          maxIndex={MAX_INDEX}
          onBack={handleBack}
          onNext={handleNext}
        >
          <Box display="flex" flexDirection={'column'} my={1} gap={0.25}>
            <Typography variant="body1" py={1}>
              Connection details
            </Typography>
            <Divider />
            <ReviewRowText label="Application">
              {connection.appId}
            </ReviewRowText>
            <Divider />
            <ReviewRowText label="Connection name">
              {connection.name}
            </ReviewRowText>
            <Divider />
            <ReviewRowText label="Secure settings">
              {Object.keys(connection.settings ?? {}).length}
            </ReviewRowText>
            <Divider />
            <ReviewRow label="Connected worksheets">
              {!relatedWorksheets?.length && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight={900}
                >
                  no worksheets connected
                </Typography>
              )}
              <Typography variant="caption" color="text.secondary">
                <Box component="span" display="flex" gap={1}>
                  {relatedWorksheets?.map((r, i) => (
                    <Link href={`/worksheets?${r.id}`} key={i}>
                      {r.name}{' '}
                      <OpenInNewIcon fontSize="small" color="primary" />
                    </Link>
                  ))}
                </Box>
              </Typography>
            </ReviewRow>
            <Divider />
          </Box>
          {!editing && (
            <Box my={2}>
              <Alert icon={<InfoIcon color="primary" />} color="info">
                It may take a few minutes to provision your credentials. Check
                the status of your connection from the{' '}
                <Link href="/connections" target="_blank">
                  Connections page{' '}
                  <OpenInNewIcon color="primary" fontSize={'small'} />.
                </Link>
              </Alert>
            </Box>
          )}
        </StepContentWithActions>
      </Step>
    </Stepper>
  );
};
