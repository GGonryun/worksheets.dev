import { Box, Button, Divider, Link, Typography } from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridActionsCellItemProps,
  GridColDef,
  GridRowId,
  GridRowParams,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import AddIcon from '@mui/icons-material/AddOutlined';
import { FC, RefAttributes } from 'react';
import { FilterTextInput } from '../../shared/filter-text-input';
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

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Connection Name',
    minWidth: 200,
    renderCell: (params) => (
      <Link href={`/worksheets/create?connections=${params.id}`}>
        {params.value}
      </Link>
    ),
  },
  { field: 'app', headerName: 'Application', minWidth: 200 },
  { field: 'status', headerName: 'Status', minWidth: 100 },
  { field: 'lastUpdated', headerName: 'Last Updated', minWidth: 175 },
  { field: 'expires', headerName: 'Expires', minWidth: 175 },
  {
    field: 'actions',
    headerName: 'Actions',
    type: 'actions',
    minWidth: 100,
    getActions: (params: GridRowParams<{ id: string }>) => {
      return [
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

export type ConnectionsDataRow = {
  id: string;
  name: string;
  app: string;
  status: string;
  lastUpdated: string;
  expires: string;
};

export type DataTableProps = {
  rows: ConnectionsDataRow[];
  selections: GridRowId[];
  onSelectionChange: (selections: GridRowId[]) => void;
};
export const DataTable: FC<DataTableProps> = ({
  rows,
  selections,
  onSelectionChange,
}) => {
  const { push } = useRouter();

  return (
    <Box>
      <Box paddingTop={1.25} paddingBottom={1} px={3} display="flex" gap={6}>
        <Typography variant="h6">Connections</Typography>
        <Button
          startIcon={<AddIcon />}
          size="small"
          onClick={() => push('/worksheets/create?connections=')}
        >
          Create
        </Button>
      </Box>
      <Divider />
      <FilterTextInput placeholder="Filter by name" />
      <Divider />
      <DataGrid
        sx={{ border: 0 }}
        rows={rows ?? []}
        autoHeight
        columns={columns}
        density="compact"
        rowSelection={true}
        rowSelectionModel={selections}
        onRowSelectionModelChange={(v) => onSelectionChange(v)}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 100,
            },
          },
        }}
        checkboxSelection
        hideFooter
      />
    </Box>
  );
};
