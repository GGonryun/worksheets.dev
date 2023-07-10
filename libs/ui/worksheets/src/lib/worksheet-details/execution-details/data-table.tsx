import { Box, Link, Tooltip, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { FC } from 'react';
import { useRouter } from 'next/router';
import { GridLinkAction } from '../../shared/grid-action-link';
import { trpc } from '@worksheets/trpc/ide';
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
import { useUser } from '@worksheets/util/auth/client';
import { NowRowsOverlay } from '../../shared/no-rows-overlay';
import { SpotlightButton } from '../../shared/spotlight-button';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import LocalLibraryIcon from '@mui/icons-material/LocalLibraryOutlined';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';
import { TaskState } from '@worksheets/schemas-executions';

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
  const { user } = useUser();
  const { data: executions, isLoading } =
    trpc.worksheets.tasks.history.useQuery(
      { worksheetId },
      { enabled: !!worksheetId && !!user }
    );
  return (
    <DataGrid
      sx={() => ({
        border: 0,
      })}
      rows={executions ?? []}
      autoHeight={!!executions?.length}
      rowHeight={42}
      loading={isLoading}
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
      slots={{
        noRowsOverlay: () => (
          <NowRowsOverlay
            title="No executions found"
            subtext="Executing a worksheet will create an execution and display history."
            action={{
              variant: 'contained',
              href: `/worksheets/${worksheetId}/execute`,
              children: <>Execute worksheet</>,
            }}
          >
            <SpotlightButton
              label="Read the docs"
              caption="Learn how to execute a worksheet"
              icon={<LocalLibraryIcon fontSize="large" />}
              href={SERVER_SETTINGS.WEBSITES.DOCS_URL(
                '/docs/tutorials/quick-start'
              )}
            />
            <SpotlightButton
              label="Watch the video"
              caption="See our 1 minute interactive demo"
              icon={<OndemandVideoIcon fontSize="large" />}
              href={SERVER_SETTINGS.WEBSITES.DOCS_URL('/docs/intro')}
            />
          </NowRowsOverlay>
        ),
      }}
    />
  );
};
