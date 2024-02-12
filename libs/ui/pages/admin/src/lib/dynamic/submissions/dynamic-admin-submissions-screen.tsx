import { Box, Link, Typography } from '@mui/material';
import { trpc } from '@worksheets/trpc-charity';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { printShortDateTime } from '@worksheets/util/time';
import { GameSubmissionSummary } from '@worksheets/util/types';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import { CustomContainer } from '../../shared/custom-container';
import { CustomPaper } from '../../shared/custom-paper';
import { ListButton } from '../../shared/list-button';
import { ListFooter } from '../../shared/list-footer';

const PAGE_SIZE = 20;

const AdminSubmissionsScreen = () => {
  const [page, setPage] = useState(0);
  const submissions = trpc.admin.submissions.list.useQuery({
    take: PAGE_SIZE,
    skip: page * PAGE_SIZE,
  });

  if (submissions.isLoading) return <LoadingScreen />;
  if (submissions.error)
    return <ErrorScreen message={submissions.error.message} />;

  return (
    <CustomContainer>
      <ListButton href="/admin">Directory</ListButton>
      <CustomPaper title="Game Submissions List">
        <ListHeader />

        {submissions.data.map((submission) => (
          <ListItem key={submission.submissionId} submission={submission} />
        ))}

        <ListFooter
          page={page}
          count={submissions.data.length}
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
      <Typography variant="h6">Submission ID</Typography>
      <Typography variant="h6">User ID</Typography>
      <Typography variant="h6">Title</Typography>
      <Typography variant="h6">Created At</Typography>
    </Box>
  );
};

const ListItem: React.FC<{
  submission: GameSubmissionSummary;
}> = ({ submission }) => {
  return (
    <Box
      component={Link}
      color="text.arcade"
      href={`/admin/submissions/${submission.submissionId}`}
      display="grid"
      gridTemplateColumns={'1fr 1fr 1fr 1fr'}
    >
      <Typography>{submission.submissionId}</Typography>
      <Typography>{submission.userId}</Typography>
      <Typography>{submission.title ?? 'UNTITLED DRAFT'}</Typography>
      <Typography>{printShortDateTime(submission.createdAt)}</Typography>
    </Box>
  );
};

export const DynamicAdminSubmissionsScreen = dynamic(
  () => Promise.resolve(AdminSubmissionsScreen),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
