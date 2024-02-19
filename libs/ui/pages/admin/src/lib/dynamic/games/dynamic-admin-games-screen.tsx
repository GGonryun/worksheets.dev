import { Box, Link, Typography } from '@mui/material';
import { trpc } from '@worksheets/trpc-charity';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { routes } from '@worksheets/ui/routes';
import { printShortDateTime } from '@worksheets/util/time';
import { GameSummary } from '@worksheets/util/types';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import { CustomContainer } from '../../shared/custom-container';
import { CustomPaper } from '../../shared/custom-paper';
import { ListButton } from '../../shared/list-button';
import { ListFooter } from '../../shared/list-footer';

const PAGE_SIZE = 100;

const AdminGameScreen = () => {
  const [page, setPage] = useState(0);

  const games = trpc.admin.games.list.useQuery({
    take: PAGE_SIZE,
    skip: page * PAGE_SIZE,
  });

  if (games.isLoading) return <LoadingScreen />;
  if (games.error) return <ErrorScreen message={games.error.message} />;

  return (
    <CustomContainer>
      <ListButton href={routes.admin.path()}>Directory</ListButton>

      <CustomPaper title={`Games List`}>
        <ListTitle />

        {games.data.map((game) => (
          <GameItem key={game.gameId} game={game} />
        ))}

        <ListFooter
          pageSize={PAGE_SIZE}
          count={games.data.length}
          page={page}
          onPrevious={() => setPage(page - 1)}
          onNext={() => setPage(page + 1)}
        />
      </CustomPaper>
    </CustomContainer>
  );
};

const ListTitle = () => (
  <Box display="grid" gridTemplateColumns="1fr 1fr 1fr 1fr">
    <Typography fontWeight={700} typography="h6">
      Game ID
    </Typography>

    <Typography fontWeight={700} typography="h6">
      Title
    </Typography>
    <Typography fontWeight={700} typography="h6">
      Status
    </Typography>
    <Typography fontWeight={700} typography="h6">
      Created At
    </Typography>
  </Box>
);

const GameItem: React.FC<{ game: GameSummary }> = ({ game }) => {
  return (
    <Box
      component={Link}
      color="text.arcade"
      href={routes.admin.game.path({ params: { gameId: game.gameId } })}
      display="grid"
      gridTemplateColumns={'1fr 1fr 1fr 1fr'}
    >
      <Typography>{game.gameId}</Typography>
      <Typography>{game.title}</Typography>
      <Typography>{game.status}</Typography>
      <Typography>{printShortDateTime(game.createdAt)}</Typography>
    </Box>
  );
};

export const DynamicAdminGamesScreen = dynamic(
  () => Promise.resolve(AdminGameScreen),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
