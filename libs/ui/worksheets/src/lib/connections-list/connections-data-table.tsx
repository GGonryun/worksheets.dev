/* eslint-disable @typescript-eslint/no-explicit-any */
import { Edit, Delete } from '@mui/icons-material';
import { Typography, LinearProgress, Link } from '@mui/material';
import { GridColDef, GridActionsCellItem, DataGrid } from '@mui/x-data-grid';
import { FC } from 'react';
import { ConnectionStatusPill } from './state-maps';
import { Flex } from '@worksheets/ui-core';
import { NoConnectionsNotice } from './no-connections-notice';
import { UserConnection } from '@worksheets/schemas-connections';
import { MonoSpaceTextBox } from '../shared/mono-space-text-box';
import { TinyLogo } from '@worksheets/ui-basic-style';
import { useLayout } from '@worksheets/ui/common';

type ColumnsGenerator = (
  isMobile: boolean,
  onDelete: (id: string) => void,
  onEdit: (opts: { connectionId: string; appId: string }) => void
) => GridColDef[];

const columns: ColumnsGenerator = (isMobile, onDelete, onEdit) => {
  return [
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 200,
      flex: 1,
      renderHeader(params: any) {
        return (
          <Typography variant="body1" fontWeight={900}>
            {params?.colDef?.headerName}
          </Typography>
        );
      },
      renderCell: (params: any) => (
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

                  onEdit({
                    connectionId: params.row.id,
                    appId: params.row.app.id,
                  });
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
      renderHeader(params: any) {
        return (
          <Typography variant="body1" fontWeight={900}>
            {params?.colDef?.headerName}
          </Typography>
        );
      },
      renderCell: (params: any) => (
        <MonoSpaceTextBox code={params.value} copyable />
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      align: isMobile ? ('right' as const) : ('center' as const),
      headerAlign: isMobile ? ('right' as const) : ('center' as const),
      minWidth: 125,
      renderHeader(params: any) {
        return (
          <Typography variant="body1" fontWeight={900}>
            {params?.colDef?.headerName}
          </Typography>
        );
      },
      renderCell: (params: any) => (
        <ConnectionStatusPill status={params.value} />
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Created',
      minWidth: 150,
      renderHeader(params: any) {
        return (
          <Typography variant="body1" fontWeight={900}>
            {params?.colDef?.headerName}
          </Typography>
        );
      },
      renderCell: (params: any) => (
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
      getActions: (params: any) => {
        return [
          <GridActionsCellItem
            dense
            icon={<Edit />}
            label="Edit"
            showInMenu
            onClick={() =>
              onEdit({
                connectionId: params.row.id,
                appId: params.row.app.id,
              })
            }
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
  ].filter(
    (c) =>
      !isMobile ||
      (isMobile &&
        c.headerName !== 'Atomic ID' &&
        c.headerName !== 'Created' &&
        c.headerName !== 'Actions')
  );
};

type ConnectionsDataTableProps = {
  rows: UserConnection[];
  loading?: boolean;
  onSelectionChange: (selectedIds: string[]) => void;
  onDelete: (id: string) => void;
  onEdit: (opts: { connectionId: string; appId: string }) => void;
};

export const ConnectionsDataTable: FC<ConnectionsDataTableProps> = ({
  loading,
  rows,
  onSelectionChange,
  onDelete,
  onEdit,
}) => {
  const { isMobile } = useLayout();

  const handleDelete = async (connectionId: string) => {
    onDelete(connectionId);
  };

  const handleEdit = async (opts: { connectionId: string; appId: string }) => {
    onEdit(opts);
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
