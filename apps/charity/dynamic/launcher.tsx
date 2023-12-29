import { GameLauncher } from '@worksheets/ui/pages/game';
import {
  DeveloperSchema,
  GameAnalyticsSchema,
  SerializableGameSchema,
  UserVoteSchema,
} from '@worksheets/util/types';
import { FC } from 'react';
import { useRecentlyPlayedGames } from '../hooks/useRecentlyPlayedGames';
import { trpc } from '@worksheets/trpc-charity';
import { useVoteHistory } from '../hooks/useVoteHistory';

const DynamicGameLauncher: FC<{
  game: SerializableGameSchema;
  developer: DeveloperSchema;
  analytics: GameAnalyticsSchema;
}> = ({ game, developer, analytics }) => {
  const util = trpc.useUtils();
  const vote = trpc.game.vote.useMutation();
  const play = trpc.game.play.useMutation();

  const voting = useVoteHistory();

  const { addRecentlyPlayed } = useRecentlyPlayedGames();

  const invalidateStatistics = async () => {
    await util.game.analytics.invalidate({ gameId: game.id });
  };

  const handlePlayGame = async () => {
    addRecentlyPlayed({
      gameId: game.id,
      playedLast: new Date().getTime(),
    });

    await play.mutateAsync({ gameId: game.id });

    await invalidateStatistics();
  };

  const handleMakeVote = async (newVote: UserVoteSchema['vote']) => {
    const submitVote = voting.addToVoteHistory({
      vote: newVote,
      gameId: game.id,
    });
    if (!submitVote) return;

    // send a vote.
    await vote.mutateAsync({
      gameId: game.id,
      vote: newVote,
    });
  };

  const handleShowPlayers = () => {
    // Do nothing.
  };

  return (
    <GameLauncher
      analytics={analytics}
      game={game}
      developer={developer}
      onPlay={handlePlayGame}
      onVote={handleMakeVote}
      onViewGamePlay={handleShowPlayers}
      userVote={voting.getVote(game.id)}
    />
  );
};

export default DynamicGameLauncher;
