import { Chip, Tooltip } from '@mui/material';
import { ConnectionStatuses } from '@worksheets/schemas-connections';
import {
  statusIcon,
  statusLabel,
  statusTooltip,
  statusColor,
} from '../state-maps';

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
