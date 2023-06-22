import { Link } from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
} from '@mui/x-data-grid';
import PlayArrowIcon from '@mui/icons-material/PlayArrowOutlined';
import ModeEditIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { GridLinkAction } from '../shared/grid-action-link';
import { trpc } from '@worksheets/trpc/ide';

const columns: (onClick: (worksheetId: string) => void) => GridColDef[] = (
  onClick
) => [
  {
    field: 'name',
    headerName: 'Worksheet Name',
    flex: 1,
    minWidth: 150,
    maxWidth: 300,
    renderCell: (params) => (
      <Link href={`/worksheets/${params.id}`}>{params.value}</Link>
    ),
  },
  {
    field: 'id',
    headerName: 'Identifier',
    flex: 1,
    minWidth: 150,
    maxWidth: 250,
  },
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
          href={`/worksheets/${params.id}/worksheet`}
          dense
          icon={<ModeEditIcon />}
          label="Edit"
          showInMenu
        />,
        <GridActionsCellItem
          dense
          icon={<DeleteIcon />}
          label="Delete"
          showInMenu
          onClick={() => {
            onClick(params.id.toString());
          }}
        />,
      ];
    },
  },
];

export function WorksheetsDataTable() {
  const utils = trpc.useContext();
  const { data: worksheets } = trpc.worksheets.table.useQuery();
  const deleteWorksheet = trpc.worksheets.delete.useMutation();

  const handleDeleteWorksheet = async (worksheetId: string) => {
    if (
      // eslint-disable-next-line no-restricted-globals
      confirm(
        "This will also delete your worksheet's execution history and logs. Are you sure?"
      )
    ) {
      await deleteWorksheet.mutateAsync({ id: worksheetId });
      utils.worksheets.table.invalidate();
    }
  };

  return (
    <DataGrid
      sx={{ border: 0 }}
      rows={worksheets ?? []}
      autoHeight
      columns={columns(handleDeleteWorksheet)}
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
  );
}
