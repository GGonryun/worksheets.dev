import {
  Alert,
  Box,
  Button,
  Chip,
  ChipProps,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  CheckCircleOutline,
  Close,
  ErrorOutline,
  OpenInNew,
  PowerOutlined,
  Save,
  WarningAmberOutlined,
} from '@mui/icons-material';
import { TinyLogo } from '../../shared/tiny-logo';
import { ConnectionStatuses } from '@worksheets/schemas-connections';

export const ConnectionForm: React.FC = () => {
  const connected = true;
  const enabled = true;
  const tooltip = connected
    ? enabled
      ? 'Disable your connection'
      : 'Enable your connection'
    : 'Connect your account';

  return (
    <Box pt={1} pb={1} display="flex" flexDirection="column" gap={2}>
      {/* Header portion */}

      <Box display="flex" flexDirection="column" gap={1}>
        <Box display="flex" alignItems="center" gap={3}>
          <Typography fontWeight={900} variant="body2">
            Status
          </Typography>
          <ConnectionStatus status={'uninstalled'} />
        </Box>
        <Box display="flex" alignItems="center">
          <Typography fontWeight={900} variant="body2">
            Enabled
          </Typography>
          <Tooltip title={tooltip} placement="top">
            <span>
              <Switch
                inputProps={{ 'aria-label': 'Switch demo' }}
                checked={enabled}
                disabled={!connected}
              />
            </span>
          </Tooltip>
        </Box>
      </Box>

      {/* Body portion */}
      {/* <ButtonFormField /> */}
      <SensitiveFormField />

      {/* Footer portion */}
      <Alert severity="error">
        Your access token has been revoked, please add a new one to continue.
      </Alert>
    </Box>
  );
};

export const ButtonFormField: React.FC = () => {
  return (
    <Box>
      <Box display="flex" justifyContent="flex-end">
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

      <Button
        variant="contained"
        fullWidth
        startIcon={
          <Box pr={1}>
            <Paper variant="outlined">
              <TinyLogo
                borderless
                label={'Google Apps'}
                src={
                  'https://storage.googleapis.com/worksheets-test-app-logos/openai-svgrepo-com.svg'
                }
              />
            </Paper>
          </Box>
        }
      >
        Connect to Google Apps
      </Button>
    </Box>
  );
};

export const SensitiveFormField: React.FC = () => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body2" fontWeight={900}>
          API Token
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
            How to generate an API token
            <OpenInNew fontSize="inherit" />
          </Typography>
        </Link>
      </Box>
      <TextField
        fullWidth
        size="small"
        type="password"
        value={'some masked value'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" size="small">
                <Close fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Box display="flex" justifyContent="space-between" pt={3}>
        <Tooltip title={'Please complete form to save'} placement="top">
          <span>
            <Button startIcon={<Save />} disabled variant="contained">
              Update
            </Button>
          </span>
        </Tooltip>
      </Box>
    </Box>
  );
};

const statusIcon: Record<ConnectionStatuses, JSX.Element> = {
  active: <CheckCircleOutline />,
  disabled: <Close />,
  error: <ErrorOutline />,
  warning: <WarningAmberOutlined />,
  uninstalled: <PowerOutlined />,
  // eslint-disable-next-line react/jsx-no-useless-fragment
  unknown: <></>,
};

const statusLabel: Record<ConnectionStatuses, string> = {
  active: 'Active',
  disabled: 'Disabled',
  error: 'Error',
  warning: 'Warning',
  uninstalled: 'Uninstalled',
  unknown: '',
};

const statusTooltip: Record<ConnectionStatuses, string> = {
  active: 'Your connectoin is active',
  disabled: 'Your connection is working but needs attention',
  error: 'Your connection is broken, reconnect to fix',
  warning: 'Your connection is working but needs attention',
  uninstalled: 'Connect this app to your account',
  unknown: '',
};

const statusColor: Record<ConnectionStatuses, ChipProps['color']> = {
  active: 'success',
  disabled: 'warning',
  error: 'error',
  warning: 'warning',
  uninstalled: 'primary',
  unknown: 'default',
};

export const ConnectionStatus: React.FC<{
  status: ConnectionStatuses;
}> = ({ status }) => {
  const icon = statusIcon[status];
  const label = statusLabel[status];
  const tooltip = statusTooltip[status];
  const color = statusColor[status];

  return (
    <Tooltip title={tooltip} placement="top">
      <span>
        <Chip icon={icon} label={label} color={color} size="small" />
      </span>
    </Tooltip>
  );
};
