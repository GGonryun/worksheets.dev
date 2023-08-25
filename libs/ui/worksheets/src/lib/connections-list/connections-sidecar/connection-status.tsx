import { Tooltip } from '@mui/material';
import { ConnectionStatuses } from '@worksheets/schemas-connections';
import { statusIcon, statusLabel, statusColor } from '../state-maps';
import { TinyPill } from '../../shared/tiny-pill';

const sidecarStatusTooltip: Record<ConnectionStatuses, string> = {
  active: 'Your connection is working',
  disabled: 'Your connection is disabled',
  error: 'Your connection is not working, check your credentials',
  warning: 'Your connection is not ready yet, update your selections',
  pending: "This connection hasn't been saved yet",
  unknown:
    "Something went wrong, but we don't know why. Refresh the page and contact support if this issue persists.",
};

export const ConnectionStatus: React.FC<{
  status: ConnectionStatuses;
}> = ({ status }) => {
  const icon = statusIcon[status];
  const label = statusLabel[status];
  const tooltip = sidecarStatusTooltip[status];
  const color = statusColor[status];

  return (
    <Tooltip title={tooltip} placement="top">
      <span>
        <TinyPill icon={icon} color={color} label={label} />
      </span>
    </Tooltip>
  );
};
