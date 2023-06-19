import { Box, Link } from '@mui/material';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import PlayArrowIcon from '@mui/icons-material/PlayArrowOutlined';
import ModeEditIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import { request, useUser } from '@worksheets/util/auth/client';
import { WorksheetsDataTable } from '@worksheets/feat/worksheets-management';
import { GridLinkAction } from '../shared/grid-action-link';

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Worksheet Name',
    minWidth: 150,
    renderCell: (params) => (
      <Link href={`/worksheets/${params.id}`}>{params.value}</Link>
    ),
  },
  { field: 'id', headerName: 'Identifier', minWidth: 200 },
  { field: 'lastUpdated', headerName: 'Last Updated', minWidth: 150 },
  { field: 'lastExecution', headerName: 'Last Execution', minWidth: 150 },

  {
    field: 'actions',
    headerName: 'Actions',
    type: 'actions',
    minWidth: 100,

    getActions: (params: GridRowParams<{ id: string }>) => {
      return [
        <GridLinkAction
          href={`/worksheets/${params.id}/execute`}
          dense
          icon={<PlayArrowIcon />}
          label="Execute"
          showInMenu
        />,
        <GridLinkAction
          href={`/worksheets/${params.id}/edit`}
          dense
          icon={<ModeEditIcon />}
          label="Edit"
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

export default function DataTable() {
  const { user } = useUser();
  // Get the data from the API
  const { data: worksheets } = request.query.usePrivate<WorksheetsDataTable>(
    '/api/worksheets/datatable',
    user
  );

  return (
    <Box>
      <DataGrid
        sx={{ border: 0 }}
        rows={worksheets ?? []}
        autoHeight
        columns={columns}
        density="compact"
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 100,
            },
          },
        }}
        hideFooter
      />
    </Box>
  );
}
