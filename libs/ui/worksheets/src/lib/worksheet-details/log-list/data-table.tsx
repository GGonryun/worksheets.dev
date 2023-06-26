import { Box, LinearProgress, Tooltip, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FC } from 'react';
import { useRouter } from 'next/router';
import { formatTimestampLong } from '@worksheets/util/time';
import { Help } from '@mui/icons-material';
import { LogLevelVerbosityIcon } from '../../shared/log-level-verbosity-chip';
import { LogLevel } from '@worksheets/data-access/tasks';
import { capitalizeFirstLetter } from '@worksheets/util/strings';
import ReadMoreOutlinedIcon from '@mui/icons-material/ReadMoreOutlined';
import { LogListDataTableRows } from '../../shared/types';
const columns = (worksheetId: string): GridColDef[] => [
  {
    sortable: false,
    disableColumnMenu: true,
    disableReorder: true,
    disableExport: true,
    field: 'level',
    headerName: 'Level',
    width: 40,
    minWidth: 40,
    renderCell: (params) => (
      <Tooltip title={capitalizeFirstLetter(params.value)} placement="top">
        <span>
          <LogLevelVerbosityIcon verbosity={params.value as LogLevel} />
        </span>
      </Tooltip>
    ),
    renderHeader() {
      return (
        <Tooltip placement="top" title="View log level name">
          <Help color="primary" fontSize="small" />
        </Tooltip>
      );
    },
  },
  {
    field: 'createdAt',
    headerName: 'Timestamp',
    sortingOrder: ['desc'],
    minWidth: 200,
    renderCell: (params) => (
      <Typography variant="caption">
        {formatTimestampLong(params.value)}
      </Typography>
    ),
  },
  {
    field: 'message',
    headerName: 'Message',
    flex: 1,
    sortable: false,
    disableColumnMenu: true,
    renderHeader: (params) => (
      <Box
        display="flex"
        width="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="body2">{params.colDef.headerName}</Typography>
        <Tooltip title={'Click a log for more details'} placement="top">
          <span>
            <Help fontSize="small" color="primary" />
          </span>
        </Tooltip>
      </Box>
    ),

    renderCell: (params) => (
      <Box
        display="flex"
        width="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="caption">{params.value}</Typography>

        <Tooltip title={'View more details'} placement="top">
          <span>
            <ReadMoreOutlinedIcon fontSize="small" />
          </span>
        </Tooltip>
      </Box>
    ),
  },
];

export type LogListDataTableProps = {
  rows: LogListDataTableRows;
  loading?: boolean;
  onClick: (logId: string) => void;
};
export const LogListDataTable: FC<LogListDataTableProps> = ({
  rows,
  loading,
  onClick,
}) => {
  const { query } = useRouter();

  return (
    <DataGrid
      sx={() => ({
        border: 0,
        cursor: loading ? 'progress' : 'pointer',
        '& .MuiDataGrid-columnHeaderTitleContainerContent': {
          width: '100%',
        },
      })}
      rows={rows ?? []}
      rowHeight={42}
      autoHeight
      showCellVerticalBorder
      showColumnVerticalBorder
      columns={columns(query.id as string)}
      density="compact"
      hideFooter
      slots={{
        loadingOverlay: LinearProgress,
      }}
      onRowClick={(params) => {
        onClick(params.id.toString());
      }}
      loading={loading}
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
