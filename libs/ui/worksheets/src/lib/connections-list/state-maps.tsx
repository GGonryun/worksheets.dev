import {
  CheckCircleOutline,
  Close,
  ErrorOutline,
  WarningAmberOutlined,
  PowerOutlined,
  QuestionMarkOutlined,
} from '@mui/icons-material';
import { ChipProps } from '@mui/material';
import { ConnectionStatuses } from '@worksheets/schemas-connections';
import { TinyPill } from '../shared/tiny-pill';

export const statusIcon: Record<ConnectionStatuses, JSX.Element> = {
  active: <CheckCircleOutline />,
  disabled: <Close />,
  error: <ErrorOutline />,
  warning: <WarningAmberOutlined />,
  pending: <PowerOutlined />,
  unknown: <QuestionMarkOutlined />,
};

export const statusLabel: Record<ConnectionStatuses, string> = {
  active: 'Active',
  disabled: 'Disabled',
  error: 'Error',
  warning: 'Warning',
  pending: 'Disconnected',
  unknown: 'Unknown',
};

export const statusTooltip: Record<ConnectionStatuses, string> = {
  active: 'Click to disable your connection',
  disabled: 'Click to enable your connection',
  error: 'Your connection is broken, reconnect to fix it',
  warning: 'Your connection needs attention',
  pending: 'You must save this connection before you can toggle the status',
  unknown: '',
};

export const statusColor: Record<ConnectionStatuses, ChipProps['color']> = {
  active: 'success',
  disabled: 'default',
  error: 'error',
  warning: 'warning',
  pending: 'primary',
  unknown: 'default',
};

export const isActive: Record<ConnectionStatuses, boolean> = {
  active: true,
  disabled: false,
  error: true,
  warning: true,
  pending: false,
  unknown: false,
};

export const isConnected: Record<ConnectionStatuses, boolean> = {
  active: true,
  disabled: true,
  error: true,
  warning: true,
  // disable uninstalling if the app is not installed or failed to detect the state
  pending: false,
  unknown: false,
};

export const ConnectionStatusPill: React.FC<{ status: ConnectionStatuses }> = ({
  status,
}) => {
  return (
    <TinyPill
      icon={statusIcon[status]}
      label={statusLabel[status]}
      color={statusColor[status]}
    />
  );
};
