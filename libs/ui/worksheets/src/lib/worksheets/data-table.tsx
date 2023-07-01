import { Box, Link, Typography } from '@mui/material';
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
import { ApplicationDetails } from '../shared/types';
import { TinyLogo } from '../shared/tiny-logo';

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
      <Typography variant="caption">
        <Link href={`/worksheets/${params.id}`}>{params.value}</Link>
      </Typography>
    ),
  },
  {
    field: 'apps',
    headerName: 'Applications',
    align: 'center',
    headerAlign: 'center',
    width: 100,
    renderCell: (params) => (
      <Box>
        {params.value.map((app: ApplicationDetails) => (
          <TinyLogo key={app.id} label={app.name} src={app.logo} />
        ))}
      </Box>
    ),
  },
  {
    field: 'id',
    headerName: 'Identifier',
    flex: 1,
    minWidth: 150,
    maxWidth: 250,
    renderCell: (params) => (
      <Typography variant="caption">
        <Link href={`/worksheets/${params.id}`}>{params.value}</Link>
      </Typography>
    ),
  },
  {
    field: 'lastUpdated',
    headerName: 'Last Updated',
    minWidth: 150,
    renderCell: (params) => (
      <Typography variant="caption">{params.value}</Typography>
    ),
  },
  {
    field: 'lastExecution',
    headerName: 'Last Execution',
    minWidth: 150,
    renderCell: (params) => (
      <Typography variant="caption">{params.value}</Typography>
    ),
  },
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
      rowHeight={42}
      showCellVerticalBorder
      showColumnVerticalBorder
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
