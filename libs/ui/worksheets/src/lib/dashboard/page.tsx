import { PageLayout } from '../page-layout';
import { ApplicationExecutionHistory } from './application-execution-history';
import { trpc } from '@worksheets/trpc/ide';
import { RefreshOutlined, Warning } from '@mui/icons-material';
import { Box, Divider, Typography } from '@mui/material';

export function DashboardPage() {
  const utils = trpc.useContext();
  return (
    <PageLayout
      title={'Dashboard'}
      primary={{
        children: 'Refresh',
        startIcon: <RefreshOutlined />,
        size: 'small',
        async onClick() {
          await utils.method.executions.list.invalidate();
        },
      }}
    >
      <Box display="flex" alignItems="center" py={1} px={1} gap={3}>
        <Warning color="warning" />
        <Typography variant="caption">
          Our system is currently in beta. We are only showing your most recent
          25 executions.
        </Typography>
      </Box>
      <Divider />
      <Box height={'80%'}>
        <ApplicationExecutionHistory />
      </Box>
    </PageLayout>
  );
}
