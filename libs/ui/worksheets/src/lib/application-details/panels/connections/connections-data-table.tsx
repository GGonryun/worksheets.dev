import { Edit, Delete } from '@mui/icons-material';
import { Typography, LinearProgress, Link } from '@mui/material';
import {
  GridColDef,
  GridRowParams,
  GridActionsCellItem,
  DataGrid,
} from '@mui/x-data-grid';
import { FC } from 'react';
import { ConnectionStatusPill } from '../../../connections-list/state-maps';
import { TinyLogo } from '../../../shared/tiny-logo';
import { Flex } from '@worksheets/ui/common';
import { NoConnectionsNotice } from './no-connections-notice';
import { UserConnection } from '@worksheets/schemas-connections';
import { MonoSpaceTextBox } from '../../../shared/mono-space-text-box';

type ColumnsGenerator = (
  isMobile: boolean,
  onDelete: (id: string) => void,
  onEdit: (id: string) => void
) => GridColDef[];

const columns: ColumnsGenerator = (isMobile, onDelete, onEdit) => {
  return [
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 200,
      flex: 1,
      renderHeader(params) {
        return (
          <Typography variant="body1" fontWeight={900}>
            {params.colDef.headerName}
          </Typography>
        );
      },
      renderCell: (params) => (
        <Flex gap={1}>
          <TinyLogo
            borderless
            area={32}
            src={params.row.app.logo}
            label={params.row.app.title}
          />
          <Flex column py={1}>
            <Typography variant="body2" fontWeight={900}>
              <Link
                sx={{ cursor: 'pointer' }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();

                  onEdit(params.row.id);
                }}
              >
                {params.value}
              </Link>
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {params.row.app.name}
            </Typography>
          </Flex>
        </Flex>
      ),
    },
    {
      field: 'id',
      headerName: 'Atomic ID',
      minWidth: 225,
      renderHeader(params) {
        return (
          <Typography variant="body1" fontWeight={900}>
            {params.colDef.headerName}
          </Typography>
        );
      },
      renderCell: (params) => <MonoSpaceTextBox code={params.value} copyable />,
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 125,
      renderHeader(params) {
        return (
          <Typography variant="body1" fontWeight={900}>
            {params.colDef.headerName}
          </Typography>
        );
      },
      renderCell: (params) => <ConnectionStatusPill status={params.value} />,
    },
    {
      field: 'createdAt',
      headerName: 'Created',
      minWidth: 150,
      renderHeader(params) {
        return (
          <Typography variant="body1" fontWeight={900}>
            {params.colDef.headerName}
          </Typography>
        );
      },
      renderCell: (params) => (
        <Typography variant="body2">{params.value}</Typography>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      sortable: false,
      disableColumnMenu: true,
      disableReorder: true,
      disableExport: true,
      disableColumnSelector: true,
      width: 50,
      minWidth: 50,
      renderHeader: () => null,
      getActions: (params: GridRowParams<{ id: string }>) => {
        return [
          <GridActionsCellItem
            dense
            icon={<Edit />}
            label="Edit"
            showInMenu
            onClick={() => onEdit(params.id.toString())}
          />,
          <GridActionsCellItem
            dense
            icon={<Delete />}
            label="Delete"
            showInMenu
            onClick={() => onDelete(params.id.toString())}
          />,
        ];
      },
    },
  ];
};

type ConnectionsDataTableProps = {
  rows: UserConnection[];
  loading?: boolean;
  onSelectionChange: (selectedIds: string[]) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
};

export const ConnectionsDataTable: FC<ConnectionsDataTableProps> = ({
  loading,
  rows,
  onSelectionChange,
  onDelete,
  onEdit,
}) => {
  const isMobile = true;
  const handleDelete = async (tokenId: string) => {
    onDelete(tokenId);
  };

  const handleEdit = async (tokenId: string) => {
    onEdit(tokenId);
  };

  if (!rows.length) {
    return <NoConnectionsNotice />;
  }

  return (
    <DataGrid
      columns={columns(isMobile, handleDelete, handleEdit)}
      loading={loading}
      columnHeaderHeight={32}
      autoHeight
      checkboxSelection
      onRowSelectionModelChange={(ids) =>
        onSelectionChange(ids.map((i) => i.toString()))
      }
      sx={{
        border: 'none',
      }}
      slots={{
        loadingOverlay: LinearProgress,
      }}
      rows={rows}
      hideFooter
    />
  );
};
