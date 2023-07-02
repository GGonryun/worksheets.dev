import { Box, Link, Tooltip, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { FC } from 'react';
import { useRouter } from 'next/router';
import { GridLinkAction } from '../../shared/grid-action-link';
import { trpc } from '@worksheets/trpc/ide';
import { TaskState } from '@worksheets/data-access/tasks';
import {
  PlayArrowOutlined,
  Delete,
  Webhook,
  InfoOutlined,
} from '@mui/icons-material';

import {
  formatTimestampLong,
  prettyPrintMilliseconds,
} from '@worksheets/util/time';
import { TaskExecutionStatusChip } from '../../shared/task-execution-status-chip';

const columns = (worksheetId: string): GridColDef[] => [
  {
    field: 'state',
    headerName: 'State',
    maxWidth: 110,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => (
      <TaskExecutionStatusChip state={params.value as TaskState} />
    ),
  },

  {
    field: 'id',
    headerName: 'Execution ID',
    minWidth: 265,
    sortable: false,
    renderCell: (params) => (
      <Typography variant="caption">
        <Link href={`/worksheets/${worksheetId}/executions/${params.id}`}>
          {params.value}
        </Link>
      </Typography>
    ),
  },

  {
    // TODO: support more trigger srouces
    field: 'source',
    headerName: 'Source',
    width: 40,
    minWidth: 40,
    align: 'center',
    headerAlign: 'center',
    sortable: false,
    disableColumnMenu: true,
    disableExport: true,
    disableReorder: true,
    renderHeader: () => (
      <Box>
        <Tooltip title={'Trigger source'} placement="top">
          <InfoOutlined fontSize="small" />
        </Tooltip>
      </Box>
    ),
    renderCell: (params) => (
      <Tooltip title={'Triggered by Webhook'} placement="top">
        <Webhook />
      </Tooltip>
    ),
  },
  {
    field: 'createdAt',
    headerName: 'Start time',
    minWidth: 180,
    renderCell: (params) => (
      <Typography variant="caption">
        {formatTimestampLong(params.value)}
      </Typography>
    ),
  },
  {
    field: 'duration',
    headerName: 'Duration',
    width: 80,
    headerAlign: 'right',
    align: 'right',
    disableColumnMenu: true,
    renderCell: (params) => (
      <Typography variant="caption">
        {prettyPrintMilliseconds(params.value)}
      </Typography>
    ),
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
          href={`/worksheets/${worksheetId}/execute?replayId=${params.id}`}
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
    { worksheetId },
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
