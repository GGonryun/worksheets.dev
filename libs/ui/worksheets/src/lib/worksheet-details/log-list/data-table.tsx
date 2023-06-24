import { Box, LinearProgress } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FC } from 'react';
import { useRouter } from 'next/router';
import { formatTimestampLong } from '@worksheets/util/time';
import OpenIcon from '@mui/icons-material/OpenInNewOutlined';
const columns = (worksheetId: string): GridColDef[] => [
  {
    sortable: false,
    disableReorder: true,
    field: 'level',
    headerName: 'Level',
    width: 50,
    renderCell: (params) => (
      <Box>
        {params.value === 'trace' && <Box>Trace</Box>}
        {params.value === 'info' && <Box>Info</Box>}
        {params.value === 'debug' && <Box>Debug</Box>}
        {params.value === 'warn' && <Box>Warn</Box>}
        {params.value === 'error' && <Box>Error</Box>}
        {params.value === 'fatal' && <Box>Fatal</Box>}
      </Box>
    ),
  },
  {
    field: 'createdAt',
    headerName: 'Timestamp',
    sortingOrder: ['desc'],
    minWidth: 200,
    renderCell: (params) => <Box>{formatTimestampLong(params.value)}</Box>,
  },
  {
    field: 'message',
    headerName: 'Message',
    flex: 1,
    sortable: false,
  },
];

type LogDataTableRows = {
  data?: undefined;
  level: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal' | 'silent';
}[];

export type LogListDataTableProps = {
  rows: LogDataTableRows;
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
      })}
      rows={rows ?? []}
      autoHeight
      columns={columns(query.id as string)}
      density="compact"
      hideFooter
      getDetailPanelContent={(params) => <Box>Test</Box>}
      slots={{
        detailPanelExpandIcon: OpenIcon,
        detailPanelCollapseIcon: OpenIcon,
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
