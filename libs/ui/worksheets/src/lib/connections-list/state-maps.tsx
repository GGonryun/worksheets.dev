import {
  CheckCircleOutline,
  Close,
  ErrorOutline,
  WarningAmberOutlined,
  PowerOutlined,
} from '@mui/icons-material';
import { ChipProps } from '@mui/material';
import { ConnectionStatuses } from '@worksheets/schemas-connections';

export const statusIcon: Record<ConnectionStatuses, JSX.Element> = {
  active: <CheckCircleOutline />,
  disabled: <Close />,
  error: <ErrorOutline />,
  warning: <WarningAmberOutlined />,
  uninstalled: <PowerOutlined />,
  // eslint-disable-next-line react/jsx-no-useless-fragment
  unknown: <></>,
};

export const statusLabel: Record<ConnectionStatuses, string> = {
  active: 'Active',
  disabled: 'Disabled',
  error: 'Error',
  warning: 'Warning',
  uninstalled: 'Uninstalled',
  unknown: '',
};

export const statusTooltip: Record<ConnectionStatuses, string> = {
  active: 'Your connection is active',
  disabled: 'Your connection is disabled',
  error: 'Your connection is broken, disconnect to fix it',
  warning: 'Your connection needs attention',
  uninstalled: 'Connect this app to your account',
  unknown: '',
};

export const statusColor: Record<ConnectionStatuses, ChipProps['color']> = {
  active: 'success',
  disabled: 'warning',
  error: 'error',
  warning: 'warning',
  uninstalled: 'primary',
  unknown: 'default',
};

export const isActive: Record<ConnectionStatuses, boolean> = {
  active: true,
  disabled: false,
  error: true,
  warning: true,
  uninstalled: false,
  unknown: false,
};

export const isConnected: Record<ConnectionStatuses, boolean> = {
  active: true,
  disabled: true,
  error: true,
  warning: true,
  // disable uninstalling if the app is not installed or failed to detect the state
  uninstalled: false,
  unknown: false,
};
