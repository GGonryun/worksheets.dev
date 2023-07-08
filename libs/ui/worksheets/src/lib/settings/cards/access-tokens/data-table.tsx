/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, LinearProgress, Tooltip, Typography } from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { FC } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HelpIcon from '@mui/icons-material/Help';
import { trpc } from '@worksheets/trpc/ide';
import { ListTokensResponse } from '../../../shared/types';
import { Alarm } from '@mui/icons-material';
import { OpenInNewTabLink } from '@worksheets/ui/common';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';

const columns: (onDelete: (id: string) => void) => GridColDef[] = (
  onDelete
) => [
  {
    field: 'expired',
    headerName: 'Expired',
    renderHeader() {
      return (
        <Tooltip placement="top" title="Hover over icons for expiration dates">
          <HelpIcon
            fontSize="small"
            sx={(theme) => ({
              color: theme.palette.background.paper,
            })}
          />
        </Tooltip>
      );
    },
    sortable: false,
    disableColumnMenu: true,
    disableReorder: true,
    disableExport: true,
    width: 40,
    minWidth: 40,
    renderCell: (params: GridRenderCellParams<TokensTableRow>) => {
      return (
        <Box display="flex" alignItems="center">
          <Tooltip
            placement="top"
            title={
              params.row.expired
                ? 'Expired'
                : `Expires in ${params.row.expiresOn}`
            }
          >
            {!params.row.expired ? (
              <CheckCircleIcon color="success" fontSize="small" />
            ) : (
              <Alarm color="error" fontSize="small" />
            )}
          </Tooltip>
        </Box>
      );
    },
  },
  {
    field: 'name',
    headerName: 'Token name',
    minWidth: 200,
    flex: 1,
    renderHeader(params) {
      return (
        <Typography color="background.paper" variant="body2" fontWeight={900}>
          {params.colDef.headerName}
        </Typography>
      );
    },
    renderCell: (params: any) => (
      <Typography variant="caption">{params.value}</Typography>
    ),
  },
  {
    field: 'createdAt',
    headerName: 'Created',
    minWidth: 200,
    renderHeader(params) {
      return (
        <Typography color="background.paper" variant="body2" fontWeight={900}>
          {params.colDef.headerName}
        </Typography>
      );
    },
    renderCell: (params: any) => (
      <Typography variant="caption">{params.value}</Typography>
    ),
  },
  {
    field: 'actions',
    headerName: 'Actions',
    type: 'actions',
    minWidth: 100,
    renderHeader(params) {
      return (
        <Typography color="background.paper" variant="body2" fontWeight={900}>
          {params.colDef.headerName}
        </Typography>
      );
    },
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
  },
];

export type TokensTableRow = ListTokensResponse[number];
export type TokensDataTableProps = {
  tokens: TokensTableRow[];
  loading?: boolean;
};

export const TokensDataTable: FC<TokensDataTableProps> = ({
  tokens,
  loading,
}) => {
  const utils = trpc.useContext();

  const deleteToken = trpc.user.tokens.delete.useMutation();

  const handleDelete = async (tokenId: string) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure?')) {
      await deleteToken.mutateAsync({ tokenId });
      utils.connections.dataTable.invalidate();
    }
  };

  return (
    <DataGrid
      sx={(theme) => ({
        borderRight: 0,
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: theme.palette.primary.main,
        },
      })}
      autoHeight
      columns={columns(handleDelete)}
      density="compact"
      showCellVerticalBorder={true}
      showColumnVerticalBorder={true}
      loading={loading}
      slots={{
        loadingOverlay: LinearProgress,
        noRowsOverlay: () => (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100%"
            width="100%"
          >
            <Typography>
              Fill out the form above to create a new token or go to docs to{' '}
              <OpenInNewTabLink
                href={SERVER_SETTINGS.WEBSITES.DOCS_URL(
                  '/docs/api/overview#api-tokens'
                )}
              >
                learn more
              </OpenInNewTabLink>
            </Typography>
          </Box>
        ),
      }}
      rows={tokens}
      hideFooter
    />
  );
};
