import { darken, lighten, styled } from '@mui/material/styles';

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Divider,
  LinearProgress,
  Link,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { FC } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import HelpIcon from '@mui/icons-material/Help';
import PendingIcon from '@mui/icons-material/Pending';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { trpc } from '@worksheets/trpc/ide';
import { GetConnectionsDataTableResponse } from '../shared/types';
import { TinyLogo } from '../shared/tiny-logo';
import { NowRowsOverlay } from '../shared/no-rows-overlay';
import { SpotlightButton } from '../shared/spotlight-button';
import CableIcon from '@mui/icons-material/Cable';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';

const columns: (
  onClick: (id: string) => void,
  onDelete: (id: string) => void,
  canModify: boolean
) => GridColDef[] = (onClick, onDelete, canModify) => {
  const defs = [
    {
      field: 'validation',
      headerName: 'Status',
      renderHeader() {
        return (
          <Tooltip placement="top" title="Hover over icons for details">
            <HelpIcon color="primary" fontSize="small" />
          </Tooltip>
        );
      },
      sortable: false,
      disableColumnMenu: true,
      disableReorder: true,
      disableExport: true,
      width: 40,
      minWidth: 40,
      renderCell: (params: any) => {
        const status = params.value?.status;
        const message = params.value?.message || 'Connection is active';
        return (
          <Box display="flex" alignItems="center">
            <Tooltip
              placement="top"
              title={message}
              disableHoverListener={!message}
            >
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
          <Box width="32px" />
          <Box>{params.colDef.headerName}</Box>
        </Box>
      ),
      renderCell: (params: any) => {
        const label = params.value?.label;
        const logo = params.value?.logo;
        return (
          <Box display="flex" alignItems="center">
            <Box width="32px">
              <Box display="flex" alignItems="center">
                {logo && <TinyLogo label={label} src={logo} />}
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

  canModify &&
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
  selections?: string[number][];
  onSelectionChange?: (selections: string[]) => void;
  validateRow?: (
    connection?: GetConnectionsDataTableResponse[number]
  ) => boolean;
  canModify?: boolean;
  onConnectionClick: (id: string) => void;
  fill?: boolean;
  readonly?: boolean;
  connections: GetConnectionsDataTableResponse[number][];
  loading?: boolean;
};

export const ConnectionsDataTable: FC<DataTableProps> = ({
  onConnectionClick,
  onSelectionChange,
  validateRow,
  readonly = false,
  selections: defaultSelections,
  canModify = false,
  fill = true,
  connections,
  loading = false,
}) => {
  const utils = trpc.useContext();

  const deleteConnection = trpc.connections.delete.useMutation();

  const handleDelete = async (id: string) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure you want to delete this connection?')) {
      await deleteConnection.mutateAsync({ connectionId: id });
      utils.connections.dataTable.invalidate();
    }
  };

  return (
    <>
      <StyledDataGrid
        sx={{ border: 0 }}
        rows={connections ?? []}
        rowHeight={42}
        autoHeight={connections?.length ? fill : false}
        columns={columns(onConnectionClick, handleDelete, canModify)}
        density="compact"
        rowSelection={true}
        getRowClassName={(params) => {
          if (
            validateRow &&
            !validateRow(connections?.find((c) => c.id === params.row.id))
          ) {
            return 'invalid-connection';
          }
          return '';
        }}
        rowSelectionModel={defaultSelections ?? []}
        onRowSelectionModelChange={(v) => {
          if (!readonly && onSelectionChange) {
            onSelectionChange(v.map((id) => id.toString()).filter(Boolean));
          }
        }}
        showCellVerticalBorder={true}
        showColumnVerticalBorder={true}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 100,
            },
          },
        }}
        loading={loading}
        slots={{
          loadingOverlay: LinearProgress,
          noRowsOverlay: () => (
            <NowRowsOverlay
              title="No connections found"
              subtext="Create your first connection and start integrating with external applications."
              action={{
                variant: 'contained',
                href: `/connections?create=true`,
                target: '_self',
                children: <>Create a connection</>,
              }}
            >
              <SpotlightButton
                label="See the tutorial"
                caption="Connect your first application in 1 minute or less"
                icon={<CableIcon fontSize="large" />}
                href={SERVER_SETTINGS.WEBSITES.DOCS_URL(
                  '/docs/tutorials/connections'
                )}
              />
              <SpotlightButton
                label="Browse applications"
                caption="Select from a growing list of pre-built integrations"
                icon={<HubOutlinedIcon fontSize="large" />}
                href={'/applications'}
              />
            </NowRowsOverlay>
          ),
        }}
        isRowSelectable={() => !readonly}
        checkboxSelection={Boolean(onSelectionChange)}
        hideFooter
      />
      <Divider />
    </>
  );
};
const getBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.7) : lighten(color, 0.7);

const getHoverBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

const getSelectedBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);

const getSelectedHoverBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.4) : lighten(color, 0.4);

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .invalid-connection': {
    backgroundColor: getBackgroundColor(
      theme.palette.error.main,
      theme.palette.mode
    ),
    '&:hover': {
      backgroundColor: getHoverBackgroundColor(
        theme.palette.error.main,
        theme.palette.mode
      ),
    },
    '&.Mui-selected': {
      backgroundColor: getSelectedBackgroundColor(
        theme.palette.error.main,
        theme.palette.mode
      ),
      '&:hover': {
        backgroundColor: getSelectedHoverBackgroundColor(
          theme.palette.error.main,
          theme.palette.mode
        ),
      },
    },
  },
}));
