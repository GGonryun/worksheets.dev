import { Box, Link, Typography } from '@mui/material';
import { trpc } from '@worksheets/trpc-charity';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { printShortDateTime } from '@worksheets/util/time';
import { ReportSummary } from '@worksheets/util/types';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import { CustomContainer } from '../../shared/custom-container';
import { CustomPaper } from '../../shared/custom-paper';
import { ListButton } from '../../shared/list-button';
import { ListFooter } from '../../shared/list-footer';

const PAGE_SIZE = 20;

const AdminReportsScreen = () => {
  const [page, setPage] = useState(0);
  const reports = trpc.admin.reports.list.useQuery({
    take: PAGE_SIZE,
    skip: page * PAGE_SIZE,
  });

  if (reports.isLoading) return <LoadingScreen />;
  if (reports.error) return <ErrorScreen message={reports.error.message} />;

  return (
    <CustomContainer>
      <ListButton href="/admin">Directory</ListButton>
      <CustomPaper title="Game Reports List">
        <ListHeader />

        {reports.data.map((report) => (
          <ListItem key={report.reportId} report={report} />
        ))}

        <ListFooter
          page={page}
          count={reports.data.length}
          pageSize={PAGE_SIZE}
          onPrevious={() => setPage((prev) => prev - 1)}
          onNext={() => setPage((prev) => prev + 1)}
        />
      </CustomPaper>
    </CustomContainer>
  );
};

const ListHeader = () => {
  return (
    <Box
      display="grid"
      gridTemplateColumns={'1fr 1fr 1fr 1fr'}
      color="text.arcade"
      pb={1}
    >
      <Typography variant="h6">Report ID</Typography>
      <Typography variant="h6">Game ID</Typography>
      <Typography variant="h6">Reason</Typography>
      <Typography variant="h6">Created At</Typography>
    </Box>
  );
};

const ListItem: React.FC<{
  report: ReportSummary;
}> = ({ report }) => {
  return (
    <Box
      component={Link}
      color="text.arcade"
      href={`/admin/reports/${report.reportId}`}
      display="grid"
      gridTemplateColumns={'1fr 1fr 1fr 1fr'}
    >
      <Typography>{report.reportId}</Typography>
      <Typography>{report.gameId}</Typography>
      <Typography>{report.reason}</Typography>
      <Typography>{printShortDateTime(report.createdAt)}</Typography>
    </Box>
  );
};

export const DynamicAdminReportsScreen = dynamic(
  () => Promise.resolve(AdminReportsScreen),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
