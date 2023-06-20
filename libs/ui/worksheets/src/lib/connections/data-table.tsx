import { Link } from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridRowParams,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { FC } from 'react';

const columns: (
  onClick: (id: string) => void,
  onDelete?: (id: string) => void
) => GridColDef[] = (onClick, onDelete) => {
  const defs = [
    {
      field: 'name',
      headerName: 'Connection Name',
      minWidth: 200,

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      renderCell: (params: any) => (
        <Link
          sx={{ cursor: 'pointer' }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClick(params.id.toString());
          }}
        >
          {params.value}
        </Link>
      ),
    },
    { field: 'app', headerName: 'Application', minWidth: 200 },
    { field: 'status', headerName: 'Status', minWidth: 100 },
    { field: 'lastUpdated', headerName: 'Last Updated', minWidth: 175 },
    { field: 'expires', headerName: 'Expires', minWidth: 175 },
  ];

  onDelete &&
    defs.push({
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      minWidth: 100,
      getActions: (params: GridRowParams<{ id: string }>) => {
        return [
          <GridActionsCellItem
            dense
            icon={<DeleteIcon />}
            label="Delete"
            showInMenu
            onClick={() => onDelete(params.id.toString())}
          />,
        ];
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

  return defs;
};

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
  onConnectionClick: (id: string) => void;
  onConnectionDelete?: (id: string) => void;
};
export const ConnectionsDataTable: FC<DataTableProps> = ({
  rows,
  selections,
  onSelectionChange,
  onConnectionClick,
  onConnectionDelete,
}) => {
  return (
    <DataGrid
      sx={{ border: 0 }}
      rows={rows ?? []}
      autoHeight
      columns={columns(onConnectionClick, onConnectionDelete)}
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
  );
};
