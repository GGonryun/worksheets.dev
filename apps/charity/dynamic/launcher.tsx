import { trpc } from '@worksheets/trpc-charity';
import { CannotVoteModal, GameLauncher } from '@worksheets/ui/pages/game';
import {
  CastVote,
  DeveloperSchema,
  GameAnalyticsSchema,
  SerializableGameSchema,
} from '@worksheets/util/types';
import { useSession } from 'next-auth/react';
import { FC, useState } from 'react';

import { useRecentlyPlayedGames } from '../hooks/useRecentlyPlayedGames';

const DynamicGameLauncher: FC<{
  game: SerializableGameSchema;
  developer: DeveloperSchema;
  analytics: GameAnalyticsSchema;
}> = ({ game, developer, analytics }) => {
  const session = useSession();
  const hasUser = !!session.data?.user?.id;

  const util = trpc.useUtils();
  const castVote = trpc.game.vote.cast.useMutation();
  const play = trpc.game.play.useMutation();
  const { data: userVote } = trpc.game.vote.get.useQuery(
    {
      gameId: game.id,
    },
    {
      enabled: hasUser,
    }
  );

  const { addRecentlyPlayed } = useRecentlyPlayedGames();

  const [showVoteWarning, setShowVoteWarning] = useState(false);

  const invalidateStatistics = async () => {
    await util.game.analytics.invalidate({ gameId: game.id });
    await util.game.vote.get.invalidate({ gameId: game.id });
  };

  const handlePlayGame = async () => {
    addRecentlyPlayed({
      gameId: game.id,
      playedLast: new Date().getTime(),
    });

    await play.mutateAsync({ gameId: game.id });

    await invalidateStatistics();
  };

  const handleMakeVote = async (newVote: CastVote['vote']) => {
    if (!hasUser) {
      setShowVoteWarning(true);
      return;
    }

    await castVote.mutateAsync({
      gameId: game.id,
      vote: newVote,
    });

    await invalidateStatistics();
  };

  const loginHref = `/login?redirect=${encodeURIComponent(`/play/${game.id}`)}`;

  return (
    <>
      <CannotVoteModal
        href={loginHref}
        open={showVoteWarning}
        onClose={() => setShowVoteWarning(false)}
      />
      <GameLauncher
        analytics={analytics}
        game={game}
        developer={developer}
        onPlay={handlePlayGame}
        onVote={handleMakeVote}
        userVote={userVote?.vote ?? 'none'}
      />
    </>
  );
};

export default DynamicGameLauncher;
