import { Box, Link, Typography } from '@mui/material';
import { trpc } from '@worksheets/trpc-charity';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { routes } from '@worksheets/ui/routes';
import { printShortDateTime } from '@worksheets/util/time';
import { RaffleSummary } from '@worksheets/util/types';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import { CustomContainer } from '../../shared/custom-container';
import { CustomPaper } from '../../shared/custom-paper';
import { ListButton } from '../../shared/list-button';
import { ListFooter } from '../../shared/list-footer';

const PAGE_SIZE = 20;

const AdminRafflesScreen = () => {
  const [page, setPage] = useState(0);
  const raffles = trpc.admin.raffles.list.useQuery({
    take: PAGE_SIZE,
    skip: page * PAGE_SIZE,
  });

  if (raffles.isLoading) return <LoadingScreen />;
  if (raffles.error) return <ErrorScreen message={raffles.error.message} />;

  return (
    <CustomContainer>
      <ListButton href={routes.admin.path()}>Directory</ListButton>
      <CustomPaper title="Raffles List">
        <ListHeader />

        {raffles.data.map((raffle) => (
          <ListItem key={raffle.raffleId} raffle={raffle} />
        ))}

        <ListFooter
          page={page}
          count={raffles.data.length}
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
      gridTemplateColumns={'1fr 1fr 1fr 1fr 1fr'}
      color="text.arcade"
      pb={1}
    >
      <Typography variant="h6">Raffle ID</Typography>
      <Typography variant="h6">Status</Typography>
      <Typography variant="h6">Entries</Typography>
      <Typography variant="h6">Created At</Typography>
      <Typography variant="h6">Expires At</Typography>
    </Box>
  );
};

const ListItem: React.FC<{
  raffle: RaffleSummary;
}> = ({ raffle }) => {
  return (
    <Box
      component={Link}
      color="text.arcade"
      href={routes.admin.raffle.path({
        params: {
          raffleId: raffle.raffleId,
        },
      })}
      display="grid"
      gridTemplateColumns={'1fr 1fr 1fr 1fr 1fr'}
    >
      <Typography>{raffle.raffleId}</Typography>
      <Typography>{raffle.status}</Typography>
      <Typography>{raffle.participants}</Typography>
      <Typography>{printShortDateTime(raffle.createdAt)}</Typography>
      <Typography>{printShortDateTime(raffle.expiresAt)}</Typography>
    </Box>
  );
};

export const DynamicAdminRafflesScreen = dynamic(
  () => Promise.resolve(AdminRafflesScreen),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
