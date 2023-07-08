/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Divider,
  LinearProgress,
  Tooltip,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FC } from 'react';
import {
  ApplicationDetails,
  GetConnectionsDataTableResponse,
} from '../shared/types';
import { Webhook, Send, ReadMore } from '@mui/icons-material';
import { TinyLogo } from '../shared/tiny-logo';
import { trpc } from '@worksheets/trpc/ide';

const columns: GridColDef[] = [
  {
    field: 'apps',
    headerName: 'Applications',
    align: 'center',
    headerAlign: 'center',
    width: 200,
    disableColumnMenu: true,
    disableExport: true,
    renderCell: (params) => {
      return (
        <Box display="flex" alignItems="center">
          {params.value?.map((app: ApplicationDetails, i: number) => (
            <Box width="32px" key={i}>
              <Box display="flex" alignItems="center">
                {app.logo && <TinyLogo src={app.logo} label={app.name} />}
              </Box>
            </Box>
          ))}
        </Box>
      );
    },
  },
  {
    field: 'trigger',
    width: 40,
    minWidth: 40,
    sortable: false,
    disableColumnMenu: true,
    disableExport: true,
    disableReorder: true,
    renderHeader: () => null,
    renderCell: (params) => (
      <Tooltip title={'Triggered by Webhook'} placement="top">
        <Webhook />
      </Tooltip>
    ),
  },
  {
    field: 'description',
    headerName: 'Template description',
    flex: 1,
    renderCell: (params: any) => (
      <Box width="100%" overflow="hidden">
        <Typography variant="caption">{params.value}</Typography>
      </Box>
    ),
  },
  {
    field: 'createTemplate',
    width: 200,
    minWidth: 200,
    sortable: false,
    align: 'center',
    disableColumnMenu: true,
    disableExport: true,
    disableReorder: true,
    renderHeader: () => null,
    renderCell: (params: any) => (
      <Button
        startIcon={<Send />}
        size="small"
        variant="text"
        href={`/worksheets/create?templateId=${params.id}`}
      >
        Create template
      </Button>
    ),
  },
  {
    field: 'viewDetails',
    headerName: '',
    align: 'center',
    width: 120,
    minWidth: 120,
    sortable: false,
    disableColumnMenu: true,
    disableExport: true,
    disableReorder: true,
    renderHeader: () => null,
    renderCell: (params: any) => (
      <Button
        startIcon={<ReadMore />}
        size="small"
        variant="text"
        href={`/templates/${params.id}`}
      >
        Details
      </Button>
    ),
  },
];

export type TemplatesDataTableRow = GetConnectionsDataTableResponse[number];
export type TemplatesDataTableProps = {
  loading?: boolean;
  filterByApps?: ApplicationDetails[];
};

export const TemplatesDataTable: FC<TemplatesDataTableProps> = ({
  loading = false,
  filterByApps = [],
}) => {
  const { data: templates } = trpc.templates.list.useQuery({
    appIds: filterByApps?.map((app) => app.id).join(','),
  });
  return (
    <>
      <DataGrid
        sx={{ border: 0 }}
        rows={templates ?? []}
        rowHeight={42}
        autoHeight
        columns={columns}
        density="compact"
        showCellVerticalBorder={true}
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
        }}
        hideFooter
      />
      <Divider />
    </>
  );
};
