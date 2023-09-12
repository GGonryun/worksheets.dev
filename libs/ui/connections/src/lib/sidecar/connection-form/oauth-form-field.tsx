import { OpenInNew, RefreshOutlined } from '@mui/icons-material';
import {
  Box,
  Paper,
  Tooltip,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { PresentationalField } from '@worksheets/schemas-connections';
import { trpc } from '@worksheets/trpc/ide';
import { useState } from 'react';
import { OpenInNewLink, urls } from '@worksheets/ui/common';
import { TinyLogo } from '@worksheets/ui-basic-style';

export const completeConnectionDetailsMessage =
  'Complete connection details above to unlock this field';

export const OAuthFormField: React.FC<{
  appId: string;
  label: string;
  logo: string;
  field: PresentationalField;
  disabled?: boolean;
  connectionId: string;
  onConnect: (connectionId: string) => void;
}> = ({ connectionId: id, label, logo, field, appId, disabled, onConnect }) => {
  const createUrl = trpc.connections.createOAuthUrl.useMutation();
  const [loading, setLoading] = useState(false);

  const icon = (
    <Box>
      <Paper
        variant="outlined"
        sx={{ visibility: disabled ? 'hidden' : 'visible' }}
      >
        <TinyLogo borderless label={label} src={logo} />
      </Paper>
    </Box>
  );

  const handleBeginOAuth = async () => {
    try {
      setLoading(true);
      const { url, connectionId } = await createUrl.mutateAsync({
        appId,
        fieldId: field.key,
        connectionId: id,
      });

      window.oauthcallback = () => {
        window.oauthcallback = undefined;
        setLoading(false);
        console.log('connecting to connectionId', connectionId);
        onConnect(connectionId);
      };

      // open window.
      const win = window.open(url, '_blank');
      if (!win) {
        alert(`Failed to start oauth flow`);
        return console.error('Failed to open a new tab during oauth flow');
      }
      win.focus();
    } catch (error) {
      console.error('Failed to start oauth flow', error);
      alert(`Failed to start oauth flow`);
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="flex-start">
        <OpenInNewLink
          variant="caption"
          href={urls.docs.home}
          disabled={disabled}
        >
          Connecting with OAuth
        </OpenInNewLink>
      </Box>
      <Tooltip
        placement="top"
        title={
          disabled
            ? completeConnectionDetailsMessage
            : 'Complete your oauth connection in the opened tab'
        }
        disableHoverListener={!disabled && !loading}
      >
        <span style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}>
          {!field.value ? (
            <Button
              size="small"
              variant="contained"
              endIcon={icon}
              fullWidth
              startIcon={
                loading ? <CircularProgress size={16} /> : <OpenInNew />
              }
              disabled={loading || disabled}
              onClick={handleBeginOAuth}
            >
              Continue to {label}
            </Button>
          ) : (
            <Button
              size="small"
              variant="contained"
              fullWidth
              endIcon={<RefreshOutlined />}
              onClick={handleBeginOAuth}
              startIcon={
                loading ? <CircularProgress size={16} /> : <OpenInNew />
              }
              disabled={loading || disabled}
            >
              Update Connection
            </Button>
          )}
        </span>
      </Tooltip>
      {field.value && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          <b>Warning</b>: Updating your connection will require you to
          re-authenticate with {label}. This will invalidate any existing
          tokens.
        </Alert>
      )}
    </Box>
  );
};
