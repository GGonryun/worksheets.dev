import { Login } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { trpc } from '@worksheets/trpc-charity';
import { GlobalAchievementsList } from '@worksheets/ui/components/achievements';
import { Description } from '@worksheets/ui/components/description';
import { ErrorComponent } from '@worksheets/ui/components/errors';
import { Column } from '@worksheets/ui/components/flex';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { toPercentage } from '@worksheets/util/numbers';
import { SessionContextValue, useSession } from 'next-auth/react';

import { gameRedirectLogin } from '../util';

export const GameAchievements: React.FC<{ gameId: string }> = ({ gameId }) => {
  const session = useSession();

  return (
    <Box mt={2}>
      <Description
        title="Achievements"
        description={
          <AchievementContent gameId={gameId} status={session.status} />
        }
        ancillary={
          session.status === 'unauthenticated' ? (
            <Button
              href={gameRedirectLogin(gameId)}
              startIcon={<Login />}
              variant="arcade"
              color="warning"
              size="small"
            >
              Save My Progress
            </Button>
          ) : null
        }
        // TODO: Add a button for the user to view their own achievements only.
      />
    </Box>
  );
};

const AchievementContent: React.FC<{
  gameId: string;
  status: SessionContextValue['status'];
}> = ({ gameId, status }) => {
  const total = trpc.maybe.games.popularity.players.useQuery({ gameId });
  const global = trpc.maybe.games.achievements.list.useQuery({ gameId });
  const player = trpc.user.game.achievements.list.useQuery(
    { gameId },
    {
      enabled: status === 'authenticated',
    }
  );

  if (total.isLoading || global.isLoading || status === 'loading')
    return <LoadingBar />;
  if (total.isError || global.isError) return <ErrorComponent />;

  return (
    <Column gap={2}>
      <AchievementsHeader
        gameId={gameId}
        player={player.data?.length}
        total={total.data}
        global={global.data.length}
        status={status}
      />
      <GlobalAchievementsList
        global={global.data}
        player={player.data ?? []}
        total={total.data}
      />
    </Column>
  );
};

const AchievementsHeader: React.FC<
  PlayerProgressOptions & {
    gameId: string;
    total: number;
    status: SessionContextValue['status'];
  }
> = ({ gameId, player, total, global, status }) => {
  const loginHref = gameRedirectLogin(gameId);
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 64px',
        gap: 2,
      }}
    >
      <Column>
        <Typography typography="body2">
          Total achievements: <b>{global}</b>
        </Typography>
        <Typography typography="body2">
          Total players: <b>{total}</b>
        </Typography>
        {status === 'authenticated' ? (
          <PlayerProgressText player={player} global={global} />
        ) : (
          <Button
            color="white"
            href={loginHref}
            sx={{
              mt: 0.5,
              width: 'fit-content',
            }}
          >
            Login to track your progress
          </Button>
        )}
      </Column>
      <Typography typography="body2" component="span" alignSelf="flex-end">
        % of all players
      </Typography>
    </Box>
  );
};

type PlayerProgressOptions = {
  global: number;
  player: number | undefined;
};

const PlayerProgressText: React.FC<PlayerProgressOptions> = ({
  global,
  player,
}) => {
  return (
    <Typography variant="body2">
      {player == null ? (
        'Loading...'
      ) : (
        <>
          Your progress:{' '}
          <b>
            {player} / {global}
          </b>{' '}
          ({toPercentage(player, global, 1)})
        </>
      )}
    </Typography>
  );
};
