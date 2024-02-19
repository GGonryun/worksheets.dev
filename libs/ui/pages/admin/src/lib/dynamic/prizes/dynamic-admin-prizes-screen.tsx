import { Box, Link, Typography } from '@mui/material';
import { trpc } from '@worksheets/trpc-charity';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { routes } from '@worksheets/ui/routes';
import { printShortDateTime } from '@worksheets/util/time';
import { PrizeSummary } from '@worksheets/util/types';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import { CustomContainer } from '../../shared/custom-container';
import { CustomPaper } from '../../shared/custom-paper';
import { ListButton } from '../../shared/list-button';
import { ListFooter } from '../../shared/list-footer';

const PAGE_SIZE = 20;

const AdminPrizesScreen = () => {
  const [page, setPage] = useState(0);
  const prizes = trpc.admin.prizes.list.useQuery({
    take: PAGE_SIZE,
    skip: page * PAGE_SIZE,
  });

  if (prizes.isLoading) return <LoadingScreen />;
  if (prizes.error) return <ErrorScreen message={prizes.error.message} />;

  return (
    <CustomContainer>
      <ListButton href={routes.admin.path()}>Directory</ListButton>
      <CustomPaper title="Prizes List">
        <ListHeader />

        {prizes.data.map((prize) => (
          <ListItem key={prize.prizeId} prize={prize} />
        ))}

        <ListFooter
          page={page}
          count={prizes.data.length}
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
      <Typography variant="h6">Prize ID</Typography>
      <Typography variant="h6">Name</Typography>
      <Typography variant="h6">Raffles</Typography>
      <Typography variant="h6">Created At</Typography>
    </Box>
  );
};

const ListItem: React.FC<{
  prize: PrizeSummary;
}> = ({ prize }) => {
  return (
    <Box
      component={Link}
      color="text.arcade"
      href={routes.admin.prize.path({
        params: {
          prizeId: prize.prizeId,
        },
      })}
      display="grid"
      gridTemplateColumns={'1fr 1fr 1fr 1fr'}
    >
      <Typography>{prize.prizeId}</Typography>
      <Typography>{prize.name}</Typography>
      <Typography>{prize.raffles}</Typography>
      <Typography>{printShortDateTime(prize.createdAt)}</Typography>
    </Box>
  );
};

export const DynamicAdminPrizesScreen = dynamic(
  () => Promise.resolve(AdminPrizesScreen),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
