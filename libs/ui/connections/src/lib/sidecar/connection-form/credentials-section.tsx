import { CancelOutlined, Check, Save, Sync } from '@mui/icons-material';
import { Box, Tooltip, Button, Typography, Alert } from '@mui/material';
import { GetConnectionDetailsResponse } from '@worksheets/schemas-connections';
import { FC, useEffect, useState } from 'react';
import { SensitiveFormField } from './sensitive-form-field';
import { Flex } from '@worksheets/ui-core';
import { CredentialsSectionLayout } from './credentials-section-layout';
import { OAuthFormField } from './oauth-form-field';
import { trpc } from '@worksheets/trpc/ide';

export const CredentialsSection: FC<{
  details: GetConnectionDetailsResponse;
  onToggle: () => void;
  onConnect: (connectionId: string) => void;
  open?: boolean;
}> = ({
  details: {
    id,
    appId,
    header: { logo, name: headerName },
    credentials: { status, fields },
    configuration: { enabled },
  },
  open,
  onToggle,
  onConnect,
}) => {
  const [data, setData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [validationStatus, setValidationStatus] = useState<
    'success' | 'error' | 'none'
  >('none');

  useEffect(() => {
    setData(
      fields.reduce((acc, field) => {
        acc[field.key] = field.value;
        return acc;
      }, {} as Record<string, string>)
    );
  }, [fields]);

  const hasOAuth = fields.some((field) => field.type === 'oauth');
  // const hasData = Object.values(data).filter(Boolean).length > 0;
  const hasChanges = !fields.every((field) => data[field.key] === field.value);

  const mustChangeToTestText = 'Make changes to the connection before testing';
  const unexpectedValidateErrorText =
    'Unexpected error occured during validation, try again. If the error persisted contact customer support.';
  const testConnectionText = 'Test your connection before saving it';
  const title = hasOAuth ? '1. OAuth Credentials' : '1. API Credentials';

  const description = hasOAuth ? (
    <>
      You'll be redirected to <b>{headerName}</b> to complete your OAuth
      connection. We'll do our best to protect your credentials.
    </>
  ) : (
    <>
      These are your credentials to <b>{headerName}</b>. We'll do our best to
      protect them.
    </>
  );

  const testConnection = trpc.connections.testConnection.useMutation();
  const upsertConnection = trpc.connections.upsertConnection.useMutation();

  const handleTest = async () => {
    try {
      const result = await testConnection.mutateAsync({
        appId: appId,
        data,
      });

      setErrors(result.errors);
      setValidationStatus(result.ok ? 'success' : 'error');
    } catch (error) {
      console.log('Unexpected error handling validate', error);
      setErrors({
        '': unexpectedValidateErrorText,
      });
    }
  };

  const handleCancel = () => {
    setData(
      fields.reduce((acc, field) => {
        acc[field.key] = field.value;
        return acc;
      }, {} as Record<string, string>)
    );
    setErrors({});
    setValidationStatus('none');
  };

  const handleConnect = async () => {
    // allow a user to submit a connection if there are no errors.
    // then notify callback that a new connection id was created.
    if (hasChanges && validationStatus === 'success') {
      const { connectionId } = await upsertConnection.mutateAsync({
        appId,
        data,
        connectionId: id,
      });
      onConnect(connectionId);
    }
  };

  const handleDataChange = (key: string, value: string) => {
    setData((d) => ({ ...d, [key]: value }));
    // clear errors for that field.
    setErrors((e) => ({ ...e, [key]: '' }));
    setValidationStatus('none');
  };

  return (
    <CredentialsSectionLayout
      title={title}
      description={description}
      onToggle={onToggle}
      open={open}
      status={enabled ? status : 'pending'}
    >
      {errors[''] && (
        <Alert severity="error">
          <Typography variant="body2">{errors['']}</Typography>
        </Alert>
      )}

      {fields.map((field, i) => (
        <Box key={i}>
          {(field.type === 'sensitive' || field.type === 'text') && (
            <SensitiveFormField
              field={field}
              data={data[field.key]}
              onChange={(d) => handleDataChange(field.key, d)}
              error={errors[field.key]}
            />
          )}

          {field.type === 'oauth' && (
            <OAuthFormField
              connectionId={id}
              onConnect={onConnect}
              appId={appId}
              logo={logo}
              field={field}
              label={headerName}
            />
          )}
        </Box>
      ))}

      {!hasOAuth && (
        <Flex gap={2} spaceBetween>
          <Flex gap={1}>
            <Tooltip
              title={mustChangeToTestText}
              placement="top"
              disableHoverListener={hasChanges}
            >
              <span>
                <Button
                  disabled={!hasChanges}
                  color={
                    validationStatus === 'success'
                      ? 'success'
                      : validationStatus === 'error'
                      ? 'error'
                      : 'warning'
                  }
                  size="small"
                  variant="contained"
                  startIcon={<Sync />}
                  onClick={handleTest}
                >
                  Test
                </Button>
              </span>
            </Tooltip>
            {validationStatus && (
              <Typography
                color={
                  validationStatus === 'success' ? 'success.main' : 'error'
                }
                variant="caption"
                display="flex"
                alignItems="center"
              >
                {validationStatus === 'success' && (
                  <>
                    <Check sx={{ height: 16, mt: -0.3, mr: 0.5 }} />
                    'Success!'
                  </>
                )}
                {validationStatus === 'error' && 'Error!'}
              </Typography>
            )}
          </Flex>
          <Flex gap={2}>
            <Tooltip
              title={testConnectionText}
              placement="top"
              disableHoverListener={validationStatus === 'success'}
            >
              <span>
                <Button
                  disabled={validationStatus !== 'success'}
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
              title={testConnectionText}
              placement="top"
              disableHoverListener={validationStatus === 'success'}
            >
              <span>
                <Button
                  disabled={validationStatus !== 'success'}
                  size="small"
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleConnect}
                >
                  Save
                </Button>
              </span>
            </Tooltip>
          </Flex>
        </Flex>
      )}
    </CredentialsSectionLayout>
  );
};
