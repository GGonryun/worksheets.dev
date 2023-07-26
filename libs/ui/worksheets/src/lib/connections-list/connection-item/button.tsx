import {
  PowerOffOutlined,
  ErrorOutline,
  WarningAmberOutlined,
  QuestionMark,
  PowerOutlined,
  SettingsOutlined,
} from '@mui/icons-material';
import { ButtonProps, Button } from '@mui/material';
import { ConnectionStatuses } from '@worksheets/schemas-connections';

const connectionButtonText: Record<ConnectionStatuses, string> = {
  active: 'Manage',
  disabled: 'Manage (Off)',
  error: 'Manage (Error)',
  warning: 'Manage (Warning)',
  uninstalled: 'Connect',
  unknown: 'Unknown',
};

const connectionButtonColors: Record<ConnectionStatuses, ButtonProps['color']> =
  {
    active: 'success',
    disabled: 'primary',
    error: 'error',
    warning: 'warning',
    uninstalled: 'primary',
    unknown: 'inherit',
  };

const connectionButtonVariants: Record<
  ConnectionStatuses,
  ButtonProps['variant']
> = {
  active: 'contained',
  disabled: 'contained',
  error: 'contained',
  warning: 'contained',
  uninstalled: 'outlined',
  unknown: 'outlined',
};

const connectionButtonIcons: Record<ConnectionStatuses, JSX.Element> = {
  active: <SettingsOutlined />,
  disabled: <PowerOffOutlined />,
  error: <ErrorOutline />,
  warning: <WarningAmberOutlined />,
  uninstalled: <PowerOutlined />,
  unknown: <QuestionMark />,
};

export const ConnectionItemButton: React.FC<{
  status?: ConnectionStatuses;
}> = ({ status = 'unknown' }) => {
  const message = connectionButtonText[status];
  const color = connectionButtonColors[status];
  const variant = connectionButtonVariants[status];
  const icon = connectionButtonIcons[status];

  return (
    <Button
      variant={variant}
      color={color}
      size="small"
      startIcon={icon}
      fullWidth
    >
      {message}
    </Button>
  );
};
