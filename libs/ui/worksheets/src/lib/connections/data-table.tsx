/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Link, Tooltip, Typography } from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridRowParams,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { FC } from 'react';
import { ConnectionDataTableRow as ConnectionDataTable } from '../shared/types';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import HelpIcon from '@mui/icons-material/Help';
import Image from 'next/image';
import PendingIcon from '@mui/icons-material/Pending';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
const columns: (
  onClick: (id: string) => void,
  onDelete?: (id: string) => void
) => GridColDef[] = (onClick, onDelete) => {
  const defs = [
    {
      field: 'validation',
      headerName: 'Status',
      renderHeader() {
        return <HelpIcon color="primary" fontSize="small" />;
      },
      sortable: false,
      disableColumnMenu: true,
      disableReorder: true,
      disableExport: true,
      width: 40,
      minWidth: 40,
      renderCell: (params: any) => {
        const status = params.value?.status;
        const message = params.value?.message;
        return (
          <Box display="flex" alignItems="center">
            <Tooltip title={message} disableHoverListener={!message}>
              {status === 'active' ? (
                <CheckCircleIcon color="success" fontSize="small" />
              ) : status === 'inactive' ? (
                <ErrorIcon color="error" fontSize="small" />
              ) : status === 'incomplete' ? (
                <PendingIcon color="inherit" fontSize="small" />
              ) : (
                <HelpIcon color="primary" fontSize="small" />
              )}
            </Tooltip>
          </Box>
        );
      },
    },
    {
      field: 'app',
      headerName: 'Application',
      minWidth: 200,
      renderHeader: (params: any) => (
        <Box display="flex">
          <Box width="40px" />
          <Box>{params.colDef.headerName}</Box>
        </Box>
      ),
      renderCell: (params: any) => {
        const label = params.value?.label;
        const logo = params.value?.logo;
        return (
          <Box display="flex" alignItems="center">
            <Box width="40px">
              <Box display="flex" alignItems="center">
                {logo && (
                  <Box
                    border={({ palette }) => `1px solid ${palette.divider}`}
                    display="flex"
                    alignItems="center"
                    justifyContent={'center'}
                    padding={0.25}
                  >
                    <Image
                      height={20}
                      width={20}
                      src={logo}
                      alt={`${label} logo`}
                    />
                  </Box>
                )}
              </Box>
            </Box>
            <Typography variant="caption">{label}</Typography>
          </Box>
        );
      },
    },
    {
      field: 'connectionName',
      headerName: 'Connection Name',
      minWidth: 200,
      renderCell: (params: any) => (
        <Link
          sx={{ cursor: 'pointer' }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClick(params.id.toString());
          }}
        >
          <Typography variant="caption">{params.value}</Typography>
        </Link>
      ),
    },
    {
      field: 'updatedAt',
      headerName: 'Updated At',
      minWidth: 200,
      renderCell: (params: any) => (
        <Typography variant="caption">{params.value}</Typography>
      ),
    },
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
            icon={<EditOutlinedIcon />}
            label="Edit"
            showInMenu
            onClick={() => onClick(params.id.toString())}
          />,
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

export type DataTableProps = {
  rows: ConnectionDataTable;
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
