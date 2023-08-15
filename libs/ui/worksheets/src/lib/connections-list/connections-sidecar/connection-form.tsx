import {
  Alert,
  AlertProps,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { Close, Delete, OpenInNew, Save } from '@mui/icons-material';
import { TinyLogo } from '../../shared/tiny-logo';
import {
  GetConnectionDetailsResponse,
  PresentationalField,
} from '@worksheets/schemas-connections';
import { ConnectionStatus } from './connection-status';
import { isActive, isConnected, statusTooltip } from '../state-maps';
import { trpc } from '@worksheets/trpc/ide';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

declare global {
  interface Window {
    oauthcallback: unknown;
  }
}

export const ConnectionForm: React.FC<{
  details: GetConnectionDetailsResponse;
}> = ({
  details: {
    appId,
    header: { name, logo },
    form: { status, dialog, fields },
  },
}) => {
  const utils = trpc.useContext();
  const toggle = trpc.connections.toggleStatus.useMutation();

  const handleToggleConnection = async () => {
    await toggle.mutateAsync({ appId });
    await utils.connections.getDetails.invalidate({ appId });
    await utils.connections.getPage.invalidate();
  };

  return (
    <Box pt={1} pb={1} display="flex" flexDirection="column" gap={2}>
      {/* Header portion */}
      <Box display="flex" flexDirection="column" gap={1}>
        <Box display="flex" alignItems="center" gap={3}>
          <Typography fontWeight={900} variant="body2">
            Status
          </Typography>
          <ConnectionStatus status={status} />
        </Box>
        <Box display="flex" alignItems="center">
          <Typography fontWeight={900} variant="body2">
            Enabled
          </Typography>
          <Tooltip title={statusTooltip[status]} placement="top">
            <span>
              <Switch
                onClick={handleToggleConnection}
                inputProps={{ 'aria-label': 'Switch demo' }}
                checked={isActive[status]}
                disabled={!isConnected[status]}
              />
            </span>
          </Tooltip>
        </Box>
      </Box>

      {/* Body portion */}
      {fields.map((field, i) => (
        <Box key={i}>
          {field.type === 'button' && (
            <ButtonFormField
              appId={appId}
              logo={logo}
              field={field}
              label={name}
            />
          )}
          {(field.type === 'sensitive' || field.type === 'text') && (
            <SensitiveFormField field={field} appId={appId} />
          )}
        </Box>
      ))}

      {/* Footer portion */}
      {dialog.content && status !== 'disabled' && (
        <Alert severity={dialog.severity as AlertProps['severity']}>
          {dialog.content}
        </Alert>
      )}
    </Box>
  );
};

export const ButtonFormField: React.FC<{
  appId: string;
  label: string;
  logo: string;
  field: PresentationalField;
}> = ({ label, logo, field, appId }) => {
  const { push } = useRouter();
  const utils = trpc.useContext();
  const uninstall = trpc.connections.deleteByApplication.useMutation();
  const createUrl = trpc.connections.createOAuthUrl.useMutation();
  const [loading, setLoading] = useState(false);

  const icon = (
    <Box pr={1}>
      <Paper variant="outlined">
        <TinyLogo borderless label={label} src={logo} />
      </Paper>
    </Box>
  );

  const handleBeginOAuth = async () => {
    setLoading(true);
    // perform trpc mutation to get url
    const { url } = await createUrl.mutateAsync({ appId, fieldId: field.key });

    // assign the completion callback.
    window.oauthcallback = () => {
      // clear the callback.
      window.oauthcallback = undefined;
      setLoading(false);
      utils.connections.getDetails.invalidate({ appId });
      utils.connections.getPage.invalidate();
    };

    // open window.
    const win = window.open(url, '_blank');
    if (!win)
      return console.error('failed to open a new tab during oauth flow');
    win.focus();
  };

  const handleDeleteField = async () => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm('Are you sure you want to delete your connection?')) return;
    uninstall.mutateAsync({ appId });
    await utils.connections.getDetails.invalidate();
    await utils.connections.getPage.invalidate();
    push('/connections');
  };

  return (
    <Box>
      <Box display="flex" justifyContent="flex-start" pb={0.5}>
        <Link href="" target="_blank">
          <Typography
            variant="caption"
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            Connecting with OAuth
            <OpenInNew fontSize="inherit" />
          </Typography>
        </Link>
      </Box>

      {!field.value ? (
        <Tooltip
          title="Complete your oauth connection in the opened tab"
          disableHoverListener={!loading}
        >
          <span>
            <Button
              size="small"
              variant="contained"
              endIcon={icon}
              fullWidth
              startIcon={
                loading ? <CircularProgress size={16} /> : <OpenInNew />
              }
              disabled={loading}
              onClick={handleBeginOAuth}
            >
              Connect to {label}
            </Button>
          </span>
        </Tooltip>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={1}
        >
          <Tooltip
            title={`You are already connected to ${label}`}
            placement="top"
          >
            <span>
              <Button
                size="small"
                variant="contained"
                color={field.value === 'error' ? 'error' : 'success'}
                startIcon={icon}
                onClick={() =>
                  alert(
                    `You are connected to ${label}, to reconnect, please delete the connection first.`
                  )
                }
              >
                Connected to {label}
              </Button>
            </span>
          </Tooltip>
          <Tooltip
            title={`Delete your stored ${label} ${field.label} credentials`}
            placement="top"
          >
            <span>
              <Button color="inherit" onClick={handleDeleteField}>
                <Delete fontSize="small" />
              </Button>
            </span>
          </Tooltip>
        </Box>
      )}
    </Box>
  );
};

export const SensitiveFormField: React.FC<{
  appId: string;
  field: PresentationalField;
}> = ({ appId, field }) => {
  const [value, setValue] = useState(field.value);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const utils = trpc.useContext();
  const updateProperty = trpc.connections.updateProperty.useMutation();

  useEffect(() => {
    setValue(field.value);
  }, [field.value]);

  const updateValue = async (updatedValue: string) => {
    setValue(updatedValue);
    setUpdating(updatedValue !== field.value);
  };

  const revertChanges = () => {
    updateValue('');
  };

  const commitChanges = async () => {
    setLoading(true);
    await updateProperty.mutateAsync({
      appId: appId,
      fieldId: field.key,
      value,
    });
    await utils.connections.getDetails.invalidate();
    setLoading(false);
    setUpdating(false);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" pb={0.5}>
        <Typography variant="body2" fontWeight={900}>
          {field.label}
          <Box
            component="span"
            sx={(theme) => ({
              color: 'red',
              pl: 0.5,
            })}
          >
            *
          </Box>
        </Typography>

        <Link href="" target="_blank">
          <Typography
            variant="caption"
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            How to generate an {field.label}
            <OpenInNew fontSize="inherit" />
          </Typography>
        </Link>
      </Box>
      {loading && <CircularProgress size={16} />}
      {!loading && (
        <Box display="flex" alignItems="center" gap={1}>
          <TextField
            fullWidth
            size="small"
            type="text"
            value={value}
            onChange={(e) => updateValue(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" size="small" onClick={revertChanges}>
                    <Close fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box display="flex" justifyContent="space-between">
            <Tooltip
              title={`Make changes to field ${field.label} before saving`}
              disableHoverListener={updating}
              placement="top"
            >
              <span>
                <Button
                  startIcon={<Save />}
                  disabled={!updating}
                  variant="contained"
                  size="small"
                  onClick={commitChanges}
                >
                  Update
                </Button>
              </span>
            </Tooltip>
          </Box>
        </Box>
      )}
    </Box>
  );
};
