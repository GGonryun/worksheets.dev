import {
  Chip,
  ChipProps,
  Link,
  SvgIconTypeMap,
  Tooltip,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { FC } from 'react';
import { useRouter } from 'next/router';
import { GridLinkAction } from '../../shared/grid-action-link';
import { trpc } from '@worksheets/trpc/ide';
import { TaskState } from '@worksheets/data-access/tasks';
import { capitalizeFirstLetter } from '@worksheets/util/strings';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import {
  Alarm,
  PlayArrowOutlined,
  CancelPresentation,
  Check,
  Delete,
  DirectionsRun,
  MoreHoriz,
  Pause,
  PriorityHigh,
  QuestionMark,
  WarningAmber,
} from '@mui/icons-material';
import { printMillisecondsAsDuration } from '@worksheets/util/time';

const selectStatusIcon: (state: TaskState) => OverridableComponent<
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

const selectStatusColor = (state: TaskState): ChipProps['color'] => {
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

const columns = (worksheetId: string): GridColDef[] => [
  {
    field: 'state',
    headerName: 'State',
    minWidth: 125,

    renderCell: (params) => {
      const Icon = selectStatusIcon(params.value as TaskState);
      const color = selectStatusColor(params.value as TaskState);
      return (
        <Tooltip placement="top" title={capitalizeFirstLetter(params.value)}>
          <Chip
            icon={<Icon fontSize="small" />}
            color={color}
            size="small"
            label={params.value}
            sx={{ p: 0.5 }}
          />
        </Tooltip>
      );
    },
  },
  {
    field: 'id',
    headerName: 'Execution ID',
    minWidth: 300,
    sortable: false,
    renderCell: (params) => (
      <Link href={`/worksheets/${worksheetId}/executions/${params.id}`}>
        {params.value}
      </Link>
    ),
  },
  { field: 'createdAt', headerName: 'Start time', minWidth: 200 },
  {
    field: 'duration',
    headerName: 'Duration',
    minWidth: 100,
    disableColumnMenu: true,
    renderCell: (params) => <>{printMillisecondsAsDuration(params.value)}</>,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    type: 'actions',
    minWidth: 75,
    width: 75,
    getActions: (params: GridRowParams<{ id: string }>) => {
      return [
        <GridLinkAction
          href={`/worksheets/${worksheetId}/execute?id=${params.id}`}
          dense
          icon={<PlayArrowOutlined />}
          label="Replay"
          showInMenu
        />,
        <GridLinkAction
          href={`/worksheets/${params.id}/delete`}
          dense
          icon={<Delete />}
          label="Delete"
          showInMenu
        />,
      ];
    },
  },
];

export type ExecutionDetailsDataTableProps = {
  //
};

export const ExecutionDetailsDataTable: FC<
  ExecutionDetailsDataTableProps
> = () => {
  const { query } = useRouter();
  const worksheetId = query.id as string;
  const { data: executions } = trpc.worksheets.tasks.history.useQuery(
    worksheetId,
    { enabled: !!worksheetId }
  );
  return (
    <DataGrid
      sx={() => ({
        border: 0,
      })}
      rows={executions ?? []}
      autoHeight
      columns={columns(worksheetId)}
      density="compact"
      hideFooter
      showCellVerticalBorder={true}
      showColumnVerticalBorder={true}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 100,
          },
        },
      }}
    />
  );
};
