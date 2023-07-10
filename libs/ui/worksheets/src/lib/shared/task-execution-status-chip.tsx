import {
  Check,
  Pause,
  MoreHoriz,
  DirectionsRun,
  PriorityHigh,
  Alarm,
  CancelPresentation,
  WarningAmber,
  QuestionMark,
} from '@mui/icons-material';
import { SvgIconTypeMap, ChipProps, Tooltip, Chip } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { TaskState } from '@worksheets/schemas-executions';
import { capitalizeFirstLetter } from '@worksheets/util/strings';

const selectStatusIcon: (state?: TaskState) => OverridableComponent<
  SvgIconTypeMap<object, 'svg'>
> & {
  muiName: string;
} = (state) => {
  switch (state) {
    case 'done':
      return Check;
    case 'pending':
      return Pause;
    case 'queued':
      return MoreHoriz;
    case 'running':
      return DirectionsRun;
    case 'failed':
      return PriorityHigh;
    case 'expired':
      return Alarm;
    case 'cancelled':
      return CancelPresentation;
    case 'internal':
      return WarningAmber;
    default:
      return QuestionMark;
  }
};

const selectStatusColor = (state?: TaskState): ChipProps['color'] => {
  switch (state) {
    case 'done':
      return 'success';
    case 'pending':
      return 'default';
    case 'queued':
      return 'primary';
    case 'running':
      return 'secondary';
    case 'failed':
      return 'error';
    case 'expired':
      return 'warning';
    case 'cancelled':
      return 'primary';
    case 'internal':
      return 'error';
    default:
      return 'default';
  }
};

export const TaskExecutionStatusChip: React.FC<{ state?: TaskState }> = ({
  state,
}) => {
  const Icon = selectStatusIcon(state);
  const color = selectStatusColor(state);
  return (
    <Tooltip placement="top" title={capitalizeFirstLetter(state ?? '')}>
      <Chip
        icon={<Icon fontSize="small" />}
        color={color}
        size="small"
        label={state}
        sx={{ p: 0.5 }}
      />
    </Tooltip>
  );
};
