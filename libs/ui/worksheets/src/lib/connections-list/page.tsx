import {
  Box,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { PageLayout } from '../page-layout';
import Grid from '@mui/material/Unstable_Grid2';
import { Search } from '@mui/icons-material';
import { ConnectionSidecar } from './connections-sidecar/container';
import { ConnectionItem } from './connection-item';
import { trpc } from '@worksheets/trpc/ide';

export const ConnectionsPage: React.FC<{ appId?: string }> = ({ appId }) => {
  return (
    <PageLayout
      title={'Connections'}
      primary={{
        disabled: true,
        variant: 'contained',
        children: 'All',
        size: 'small',
      }}
      secondary={{
        disabled: true,
        variant: 'outlined',
        children: 'Connected',
        size: 'small',
      }}
      tertiary={{
        disabled: true,
        variant: 'outlined',
        children: 'New',
        size: 'small',
      }}
    >
      <>
        <Grid container p={3} spacing={2}>
          <Grid xs={12} sm={12} md={8}>
            <Box display="flex" flexDirection="column">
              <Typography variant="h4">Connections</Typography>
              <Typography variant="body1">
                Manage your connected applications and services.
              </Typography>
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={4}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <ConnectionItems appId={appId} />
        <ConnectionSidecar appId={appId} />
      </>
    </PageLayout>
  );
};

export const ConnectionItems: React.FC<{ appId?: string }> = ({ appId }) => {
  const { data: connections, isLoading } =
    trpc.connections.getPage.useQuery(null);

  if (isLoading)
    return (
      <Box
        display="flex"
        alignItems="center"
        width="100%"
        height="50%"
        justifyContent="center"
      >
        <CircularProgress size={72} />
      </Box>
    );

  return (
    <Box px={3} display="flex" flexDirection="column" gap={3}>
      <Grid container spacing={2} width="100%">
        {connections?.map((connection, i) => (
          <Grid xs={6} sm={4} md={3} xl={2} key={i}>
            <ConnectionItem
              {...connection}
              loading={appId === connection.appId}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
