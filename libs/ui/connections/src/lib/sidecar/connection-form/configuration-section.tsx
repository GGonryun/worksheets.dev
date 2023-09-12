import {
  Typography,
  Link,
  Tooltip,
  Switch,
  Button,
  CircularProgress,
  Collapse,
  Box,
  Alert,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { RequiredAsterisk, urls } from '@worksheets/ui/common';
import { Flex } from '@worksheets/ui-core';
import { CancelOutlined, Check, ErrorOutline, Save } from '@mui/icons-material';
import { SectionHeader } from './section-header';
import { trpc } from '@worksheets/trpc/ide';
import { GetConnectionDetailsResponse } from '@worksheets/schemas-connections';
import { TinyPill, TinyTextField } from '@worksheets/ui-basic-style';

const cancelButtonTooltip = 'You have no changes to restore';

export type DetailsForm = {
  name: string;
  enabled: boolean;
  errors: Record<string, string>;
};

export const ConfigurationSection: FC<{
  details: GetConnectionDetailsResponse;
  open: boolean;
  onToggle: () => void;
}> = ({ open, details, onToggle }) => {
  const utils = trpc.useContext();
  const updateConfig = trpc.connections.updateConfiguration.useMutation();

  const [isLoading, setIsLoading] = useState(false);
  const [formDetails, setFormDetails] = useState<DetailsForm>({
    ...details.configuration,
    errors: {},
  });
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setFormDetails({
      ...details.configuration,
      errors: {},
    });
    setHasChanges(false);
  }, [details.configuration]);

  const handleSave = async () => {
    try {
      setIsLoading(true);

      const results = await updateConfig.mutateAsync({
        connectionId: details.id,
        details: {
          name: formDetails.name,
          enabled: formDetails.enabled,
        },
      });

      // wait for 3 seconds
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setFormDetails((f) => ({
        ...f,
        errors: results.errors,
      }));

      await utils.connections.getDetails.invalidate({
        appId: details.appId,
        connectionId: details.id,
      });
      await utils.connections.list.invalidate({
        appId: details.appId,
      });
    } catch (error) {
      console.error('Failed to validate details', error);
      alert('Something unexepcted happened. Please try again.');
    } finally {
      setIsLoading(false);
      setHasChanges(false);
    }
  };

  const handleFormChange = (form: DetailsForm) => {
    if (form.name.length > 50) {
      form.errors['name'] = 'Name must be less than 50 characters';
    } else if (form.name.length < 3) {
      form.errors['name'] = 'Name must be at least 3 characters';
    } else if (!form.name.match(/^[a-zA-Z0-9\s-_@.]+$/)) {
      form.errors['name'] =
        'Name must contain only letters, numbers, spaces, and the following special characters: -_@.';
    } else {
      delete form.errors['name'];
    }

    setFormDetails(form);
    setHasChanges(true);
  };

  const handleCancel = () => {
    setFormDetails({
      ...details.configuration,
      errors: {},
    });
    setHasChanges(false);
  };

  const disabled = details.credentials.status === 'pending';
  const title = details.header.name;
  return (
    <Flex column>
      <SectionHeader
        disabled={disabled}
        status={details.configuration.enabled ? 'active' : 'pending'}
        title={'2. Configuration'}
        onToggle={onToggle}
        open={open}
      />
      <Collapse in={open}>
        <Flex column gap={2}>
          <Typography
            variant="body2"
            color={disabled ? 'text.disabled' : 'text.secondary'}
          >
            These settings contain general information about your connection to{' '}
            <b>{title}</b>. If you have any questions, please{' '}
            <Link
              color={disabled ? 'text.disabled' : 'text.secondary'}
              href={disabled ? undefined : urls.docs.contactUs}
            >
              contact support
            </Link>
            .
          </Typography>

          <Flex column gap={3}>
            {disabled && (
              <Alert severity="info">
                <Typography variant="body2">
                  You must complete the connection before you can configure it.
                </Typography>
                <Link sx={{ cursor: 'pointer' }} onClick={() => onToggle()}>
                  Connect to {title}
                </Link>
              </Alert>
            )}

            <NameField
              disabled={disabled}
              value={formDetails.name}
              onChange={(n) => handleFormChange({ ...formDetails, name: n })}
              comment={formDetails.errors['name']}
              severity={formDetails.errors['name'] ? 'error' : 'none'}
            />
            <EnabledField
              disabled={disabled}
              value={formDetails.enabled}
              onToggle={() =>
                handleFormChange({
                  ...formDetails,
                  enabled: !formDetails.enabled,
                })
              }
            />
          </Flex>

          <Flex spaceBetween>
            <Box
              visibility={
                Object.keys(formDetails.errors).length ? 'visible' : 'hidden'
              }
            >
              <TinyPill label="Invalid" color="error" />
            </Box>
            <Flex gap={2}>
              <Tooltip
                title={cancelButtonTooltip}
                placement="top"
                disableHoverListener={hasChanges}
              >
                <span>
                  <Button
                    disabled={!hasChanges}
                    color="inherit"
                    size="small"
                    startIcon={<CancelOutlined />}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </span>
              </Tooltip>
              <Tooltip
                title={
                  disabled
                    ? 'Complete the connection before configuring it'
                    : formDetails.errors['']
                }
              >
                <span>
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={
                      isLoading ? <CircularProgress size={16} /> : <Save />
                    }
                    disabled={
                      isLoading ||
                      !hasChanges ||
                      disabled ||
                      Object.keys(formDetails.errors).length > 0
                    }
                    onClick={handleSave}
                  >
                    {isLoading ? 'Loading' : 'Save'}
                  </Button>
                </span>
              </Tooltip>
            </Flex>
          </Flex>
        </Flex>
      </Collapse>
    </Flex>
  );
};

const NameField: FC<{
  disabled?: boolean;
  value: string;
  onChange: (newValue: string) => void;
  comment: string;
  severity: 'error' | 'success' | 'none';
}> = ({ value, onChange, comment, severity, disabled }) => {
  const friendlyTooltip =
    "Use a name without special characters that is at least 3 characters long to help you remember what this connection is for. Or not, it's up to you.";

  const primaryColor = disabled
    ? 'text.disabled'
    : severity === 'error'
    ? 'error'
    : 'text.primary';

  const secondaryColor = disabled
    ? 'text.disabled'
    : severity === 'error'
    ? 'error'
    : severity === 'success'
    ? 'success.main'
    : 'text.secondary';

  return (
    <Flex column gap={0.5}>
      <Flex gap={3}>
        <Typography fontWeight={900} color={primaryColor}>
          Name
          <RequiredAsterisk disabled={disabled} />
        </Typography>
        <TinyTextField
          fullWidth
          disabled={disabled}
          placeholder="Enter a user-friendly name"
          value={value}
          onChange={(v) => onChange(v)}
        />
      </Flex>
      {disabled ? (
        <Typography variant="caption" color="text.disabled">
          {friendlyTooltip}
        </Typography>
      ) : (
        <Flex gap={1}>
          <Typography variant="caption" color={secondaryColor}>
            {severity === 'error' && (
              <ErrorOutline
                sx={{ height: 16, width: 16, mb: -0.25, mr: 0.5 }}
              />
            )}
            {severity === 'success' && (
              <Check sx={{ height: 16, width: 16, mb: -0.25, mr: 0.5 }} />
            )}
            {comment || friendlyTooltip}
          </Typography>
        </Flex>
      )}
    </Flex>
  );
};

const EnabledField: FC<{
  disabled?: boolean;
  value: boolean;
  onToggle: () => void;
}> = ({ value, onToggle, disabled }) => (
  <Flex column gap={0.5}>
    <Flex gap={2}>
      <Typography
        fontWeight={900}
        color={disabled ? 'text.disabled' : 'text.primary'}
      >
        Enabled
      </Typography>
      <Switch
        size="small"
        onClick={() => onToggle()}
        checked={value}
        disabled={disabled}
      />
    </Flex>
    <Typography
      variant="caption"
      color={disabled ? 'text.disabled' : 'text.secondary'}
    >
      Disabling your connection will prevent it from being used in your app, but
      will not delete your credentials.
    </Typography>
  </Flex>
);
