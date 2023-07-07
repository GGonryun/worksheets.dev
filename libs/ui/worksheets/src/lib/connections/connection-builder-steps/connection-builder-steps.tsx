import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Typography from '@mui/material/Typography';
import { SharedTextField } from '../../shared/shared-text-field';
import {
  Divider,
  IconButton,
  Link,
  MenuItem,
  StepLabel,
  StepContent,
  Alert,
  Tooltip,
  CircularProgress,
  Button,
} from '@mui/material';
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
import { useEffect, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { OpenInNewTabLink } from '@worksheets/ui/common';
import { useUser } from '@worksheets/util/auth/client';
import { trpc } from '@worksheets/trpc/ide';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';

const MAX_INDEX = 2;

export const ConnectionBuilderSteps: React.FC<{
  connectionId: string;
  apps: ListApplicationsResponse;
  onClose: () => void;
  canEdit?: boolean;
  onSaved?: (connectionId: string) => void;
}> = ({ connectionId, apps, onClose, canEdit, onSaved }) => {
  const { user } = useUser();
  const {
    connection,
    fields,
    validation,
    app,
    editing,
    cannotEdit,
    relatedWorksheets,
    loading,
    save,
    updateSettingsFieldHandler,
    updateConnection,
  } = useConnectionBuilder({ connectionId, canEdit, onSaved });
  const [activeStep, setActiveStep] = React.useState(2);

  const { data: canBuild } = trpc.user.connections.canCreate.useQuery(
    undefined,
    { enabled: !!user && !editing }
  );

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

  if (loading) {
    return (
      <Stepper activeStep={0} orientation="vertical">
        <Step completed={true} key={0}>
          <StepContent>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap={2}
              pt={4}
            >
              <CircularProgress />
            </Box>
          </StepContent>
        </Step>
      </Stepper>
    );
  }

  if (!editing && canBuild) {
    return (
      <Stepper activeStep={0} orientation="vertical">
        <Step completed={true} key={0}>
          {cannotEdit && <ModificationBanner connectionId={connectionId} />}

          <StepLabel
            icon={<ErrorOutlinedIcon color="error" />}
            optional={
              <Typography variant="caption">
                Remove a connection to continue.
              </Typography>
            }
          >
            You have too many connections.
          </StepLabel>
          <StepContent>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap={2}
              pt={4}
            >
              <Typography variant="h6">
                Delete inactive or unused connections from the
              </Typography>
              <Button
                fullWidth
                variant="contained"
                endIcon={<OpenInNewIcon />}
                href="/connections"
                target="_blank"
                size="large"
              >
                connections page
              </Button>
              <Typography variant="body2">
                Return to this page when you're done and the creation form will
                appear if you've deleted enough connections.
              </Typography>
              <CircularProgress />
            </Box>
          </StepContent>
        </Step>
      </Stepper>
    );
  }

  return (
    <Stepper activeStep={activeStep} nonLinear orientation="vertical">
      <Step completed={editing || activeStep > 0} key={0}>
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
      <Step completed={editing || activeStep > 1} key={1}>
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
      <Step completed={editing || activeStep > 2} key={2}>
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
          tooltip={'You are viewing this connection in read-only mode.'}
          maxIndex={MAX_INDEX}
          onBack={handleBack}
          onNext={handleNext}
        >
          <Box display="flex" flexDirection={'column'} my={1} gap={0.25}>
            <Typography variant="body1" py={1}>
              Connection details
            </Typography>
            <Divider />
            <ReviewRowText label="ID" nonText>
              <HiddenField text={connection.id} />
            </ReviewRowText>
            <Divider />
            <ReviewRowText label="Application">
              <OpenInNewTabLink href={`/applications/${app?.id}`}>
                {app?.name}{' '}
              </OpenInNewTabLink>
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
                  variant="body2"
                  color="text.secondary"
                  fontWeight={900}
                >
                  no worksheets connected
                </Typography>
              )}
              <Typography variant="body2" color="text.secondary">
                <Box component="span" display="flex" gap={1}>
                  {relatedWorksheets?.map((r, i) => (
                    <OpenInNewTabLink href={`/worksheets/${r.id}`} key={i}>
                      {r.name}{' '}
                    </OpenInNewTabLink>
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

const HiddenField: React.FC<{ text: string }> = ({ text }) => {
  const [showText, setShowText] = useState(false);
  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Tooltip
        title="View your connection id. Protect this ID like you would a password."
        placement="top"
      >
        <span>
          <IconButton
            size="small"
            sx={{ p: 0 }}
            onClick={() => setShowText((p) => !p)}
          >
            <VisibilityIcon sx={{ fontSize: 16 }} color="primary" />
          </IconButton>
        </span>
      </Tooltip>
      <Typography variant="caption">
        {showText ? text : text.replace(/./g, '*')}
      </Typography>
    </Box>
  );
};
