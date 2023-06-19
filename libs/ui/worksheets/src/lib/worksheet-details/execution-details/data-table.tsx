import { Box, Chip, Link } from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridActionsCellItemProps,
  GridColDef,
  GridRowParams,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { FC, RefAttributes } from 'react';
import PlayIcon from '@mui/icons-material/PlayArrowOutlined';
import { TaskState } from '@worksheets/data-access/tasks';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import ErrorIcon from '@mui/icons-material/Error';
import { useRouter } from 'next/router';
type GridLinkActionProps = { href: string } & GridActionsCellItemProps &
  RefAttributes<HTMLButtonElement>;

const GridLinkAction = ({ href, ...props }: GridLinkActionProps) => {
  return (
    <Link href={href} underline="none" color="inherit" variant="body1">
      <GridActionsCellItem {...props} />
    </Link>
  );
};

const columns = (worksheetId: string): GridColDef[] => [
  {
    field: 'status',
    renderHeader(params) {
      return <Box />;
    },
    sortable: false,
    disableColumnMenu: true,
    disableReorder: true,
    disableExport: true,
    width: 50,
    renderCell: (params) => (
      <Box display="flex" alignItems="center">
        {params.value === 'ok' && (
          <Box>
            <CheckCircleIcon color="success" fontSize="small" />
          </Box>
        )}
        {params.value === 'pending' && (
          <Box>
            <PendingIcon color="disabled" fontSize="small" />
          </Box>
        )}
        {params.value === 'error' && (
          <Box>
            <ErrorIcon color="error" fontSize="small" />
          </Box>
        )}
      </Box>
    ),
  },
  {
    field: 'state',
    headerName: 'State',
    minWidth: 75,
    renderCell: (params) => <Chip size="small" label={params.value} />,
  },
  {
    field: 'id',
    headerName: 'Execution ID',
    minWidth: 300,
    sortable: false,
    renderCell: (params) => (
      <Link href={`/worksheets/${worksheetId}/execution/${params.id}`}>
        {params.value}
      </Link>
    ),
  },
  { field: 'createdAt', headerName: 'Start time', minWidth: 200 },
  {
    field: 'duration',
    headerName: 'Duration',
    width: 75,
    disableColumnMenu: true,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    type: 'actions',
    minWidth: 100,
    getActions: (params: GridRowParams<{ id: string }>) => {
      return [
        <GridLinkAction
          href={`/worksheets/${worksheetId}/execute?id=${params.id}`}
          dense
          icon={<PlayIcon />}
          label="Replay"
          showInMenu
        />,
        <GridLinkAction
          href={`/worksheets/${params.id}/delete`}
          dense
          icon={<DeleteIcon />}
          label="Delete"
          showInMenu
        />,
      ];
    },
  },
];

export type ExecutionDetailsDataRow = {
  id: string;
  status: 'ok' | 'error' | 'pending';
  state: TaskState;
  createdAt: string;
  duration: string;
  worksheetId: string;
};

export type ExecutionDetailsDataTableProps = {
  rows: ExecutionDetailsDataRow[];
};
export const ExecutionDetailsDataTable: FC<ExecutionDetailsDataTableProps> = ({
  rows,
}) => {
  const { query } = useRouter();
  return (
    <DataGrid
      sx={(theme) => ({
        border: 0,
      })}
      rows={rows ?? []}
      autoHeight
      columns={columns(query.id as string)}
      density="compact"
      hideFooter
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
