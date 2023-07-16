import {
  Box,
  Divider,
  Tooltip,
  Typography,
  darken,
  lighten,
  styled,
} from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { trpc } from '@worksheets/trpc/ide';
import { ApplicationDetails } from '../shared/types';
import { TinyLogo } from '../shared/tiny-logo';
import { useUser } from '@worksheets/util/auth/client';
import { SpotlightButton } from '../shared/spotlight-button';
import { Search } from '@mui/icons-material';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import ErrorIcon from '@mui/icons-material/Error';
import HelpIcon from '@mui/icons-material/Help';
import { NowRowsOverlay } from '../shared/no-rows-overlay';
import {
  formatTimestamp,
  prettyPrintMilliseconds,
} from '@worksheets/util/time';
import { getReasonPhrase } from 'http-status-codes';

const columns: (onClick: (worksheetId: string) => void) => GridColDef[] = (
  onClick
) => [
  {
    field: 'status',
    headerName: 'Status',
    renderHeader() {
      return (
        <Tooltip placement="top" title="Hover over icons for status message">
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
    renderCell: (params) => {
      const status = params.value;
      return (
        <Box display="flex" alignItems="center">
          <Tooltip placement="top" title={`${getReasonPhrase(status)}`}>
            {status > 499 ? (
              <NewReleasesIcon color="error" fontSize="small" />
            ) : status > 399 ? (
              <ErrorIcon color="error" fontSize="small" />
            ) : status < 300 && status > 199 ? (
              <CheckCircleIcon color="success" fontSize="small" />
            ) : (
              <HelpIcon color="inherit" fontSize="small" />
            )}
          </Tooltip>
        </Box>
      );
    },
  },
  {
    field: 'code',
    headerName: 'Status',
    renderHeader() {
      return null;
    },
    sortable: false,
    disableColumnMenu: true,
    disableReorder: true,
    disableExport: true,
    width: 40,
    minWidth: 40,
    renderCell: (params) => {
      const status = params.row.status;
      return (
        <Tooltip placement="top" title={`${getReasonPhrase(status)}`}>
          <Typography variant="caption">{status}</Typography>
        </Tooltip>
      );
    },
  },

  {
    field: 'app',
    headerName: 'Application',
    flex: 1,
    minWidth: 150,
    maxWidth: 300,
    renderCell: (params) => {
      console.log('field');
      const app: ApplicationDetails = params.value;
      return (
        <Box display="flex" alignItems="center" gap={2}>
          <TinyLogo key={app.id} label={app.name} src={app.logo} />
          <Typography variant="caption">
            {app.id}.{params.row.method}
          </Typography>
        </Box>
      );
    },
  },
  {
    field: 'id',
    headerName: 'ID',
    width: 180,
    renderCell: (params) => (
      <Typography variant="caption">{params.value}</Typography>
    ),
  },
  {
    field: 'startedAt',
    headerName: 'Started At',
    minWidth: 125,
    renderCell: (params) => (
      <Typography variant="caption">{formatTimestamp(params.value)}</Typography>
    ),
  },
  {
    field: 'duration',
    headerName: 'Duration',
    align: 'right',
    headerAlign: 'right',
    width: 75,
    renderCell: (params) => (
      <Typography variant="caption">
        {prettyPrintMilliseconds(params.value)}
      </Typography>
    ),
  },
  {
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
          onClick={() => {
            onClick(params.id.toString());
          }}
        />,
      ];
    },
  },
];

export function ApplicationExecutionHistory() {
  const utils = trpc.useContext();
  const { user } = useUser();
  const { data: executions, isLoading } = trpc.method.executions.list.useQuery(
    {},
    {
      enabled: !!user,
    }
  );

  const deleteMethodExecutionItem = trpc.method.executions.delete.useMutation();

  const handleDeleteMethodHistoryItem = async (executionId: string) => {
    if (
      // eslint-disable-next-line no-restricted-globals
      confirm('Are you sure?')
    ) {
      try {
        await deleteMethodExecutionItem.mutateAsync({ executionId });
        await utils.method.executions.list.invalidate();
      } catch (error) {
        alert(`Error deleting execution: ${error}`);
      }
    }
  };

  return (
    <>
      <StyledDataGrid
        sx={{ border: 0 }}
        rows={executions ?? []}
        autoHeight={executions?.length ? true : false}
        rowHeight={42}
        getRowClassName={(params) => {
          if (params.row.status > 399) {
            return 'execution-failure';
          }
          return 'execution-success';
        }}
        showCellVerticalBorder
        showColumnVerticalBorder
        loading={isLoading}
        columns={columns(handleDeleteMethodHistoryItem)}
        density="compact"
        hideFooter
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 100,
            },
          },
        }}
        slots={{
          noRowsOverlay: () => (
            <NowRowsOverlay
              title="Get Started"
              subtext="Execute your first application in as little as 5 minutes"
              action={{
                variant: 'contained',
                href: SERVER_SETTINGS.WEBSITES.DOCS_URL('/docs/faq'),
                children: <>Learn More</>,
              }}
            >
              <SpotlightButton
                label="Follow a tutorial"
                caption="Learn how to execute your first application"
                icon={<ListAltIcon fontSize="large" />}
                href={SERVER_SETTINGS.WEBSITES.DOCS_URL(
                  '/docs/tutorials/quick-start'
                )}
              />
              <SpotlightButton
                label="Browse applications"
                caption="Search our application registry"
                icon={<Search fontSize="large" />}
                href={'/applications'}
              />
            </NowRowsOverlay>
          ),
        }}
      />
      {Boolean(executions?.length) && <Divider />}
    </>
  );
}

const getBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.7) : lighten(color, 0.7);

const getHoverBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

const getSelectedBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);

const getSelectedHoverBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.4) : lighten(color, 0.4);

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .execution-failure': {
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
