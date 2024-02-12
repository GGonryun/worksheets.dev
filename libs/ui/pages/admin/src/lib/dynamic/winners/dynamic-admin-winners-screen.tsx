import { Box, Link, Typography } from '@mui/material';
import { trpc } from '@worksheets/trpc-charity';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { printShortDateTime } from '@worksheets/util/time';
import { WinnerSummary } from '@worksheets/util/types';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import { CustomContainer } from '../../shared/custom-container';
import { CustomPaper } from '../../shared/custom-paper';
import { ListButton } from '../../shared/list-button';
import { ListFooter } from '../../shared/list-footer';

const PAGE_SIZE = 20;

const AdminWinnersScreen = () => {
  const [page, setPage] = useState(0);
  const winners = trpc.admin.winners.list.useQuery({
    take: PAGE_SIZE,
    skip: page * PAGE_SIZE,
  });

  if (winners.isLoading) return <LoadingScreen />;
  if (winners.error) return <ErrorScreen message={winners.error.message} />;

  return (
    <CustomContainer>
      <ListButton href="/admin">Directory</ListButton>
      <CustomPaper title="Winners List">
        <ListHeader />

        {winners.data.map((winner) => (
          <ListItem key={winner.winnerId} winner={winner} />
        ))}

        <ListFooter
          page={page}
          count={winners.data.length}
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
      gridTemplateColumns={'1fr 1fr 1fr'}
      color="text.arcade"
      pb={1}
    >
      <Typography variant="h6">Winner ID</Typography>
      <Typography variant="h6">Created At</Typography>
      <Typography variant="h6">Claimed At</Typography>
    </Box>
  );
};

const ListItem: React.FC<{
  winner: WinnerSummary;
}> = ({ winner }) => {
  return (
    <Box
      component={Link}
      color="text.arcade"
      href={`/admin/winners/${winner.winnerId}`}
      display="grid"
      gridTemplateColumns={'1fr 1fr 1fr'}
    >
      <Typography>{winner.winnerId}</Typography>
      <Typography>{printShortDateTime(winner.createdAt)}</Typography>
      <Typography>
        {winner.claimedAt
          ? printShortDateTime(winner.claimedAt)
          : 'Not Claimed'}
      </Typography>
    </Box>
  );
};

export const DynamicAdminWinnersScreen = dynamic(
  () => Promise.resolve(AdminWinnersScreen),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
