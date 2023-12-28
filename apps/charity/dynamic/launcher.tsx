import {
  GameLauncher,
  NoUserAuthModal,
  TopPlayersModal,
} from '@worksheets/ui/pages/game';
import {
  DeveloperSchema,
  GameAnalyticsSchema,
  SerializableGameSchema,
} from '@worksheets/util/types';
import { FC, useState } from 'react';
import { useRecentlyPlayedGames } from '../hooks/useRecentlyPlayedGames';
import { trpc } from '@worksheets/trpc-charity';
import { useSession } from 'next-auth/react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';

const DynamicGameLauncher: FC<{
  game: SerializableGameSchema;
  developer: DeveloperSchema;
  analytics: GameAnalyticsSchema;
}> = ({ game, developer, analytics }) => {
  const session = useSession();
  const hasUser = !!session.data?.user?.id;
  const { data: details } = trpc.user.game.details.useQuery(
    {
      gameId: game.id,
    },
    {
      enabled: hasUser,
    }
  );

  const util = trpc.useUtils();
  const favorite = trpc.user.game.favorite.useMutation();
  const vote = trpc.user.game.vote.useMutation();
  const play = trpc.game.play.useMutation();

  const [showPlayers, setShowPlayers] = useState(false);
  const [showVoteWarning, setShowVoteWarning] = useState(false);
  const [showFavoriteWarning, setShowFavoriteWarning] = useState(false);
  const { addRecentlyPlayed } = useRecentlyPlayedGames();

  const invalidateStatistics = async () => {
    await util.user.game.details.invalidate({ gameId: game.id });
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

  const handleToggleFavorite = async () => {
    if (!hasUser) {
      setShowFavoriteWarning(true);
    } else {
      await favorite.mutateAsync({
        gameId: game.id,
      });

      await invalidateStatistics();
    }
  };

  const handleMakeVote = async (action: 'up' | 'down') => {
    if (!hasUser) {
      setShowVoteWarning(true);
    } else {
      await vote.mutateAsync({ gameId: game.id, vote: action });

      await invalidateStatistics();
    }
  };

  const handleShowPlayers = () => {
    setShowPlayers(true);
  };

  const redirectToLogin = `/login?redirect=${encodeURIComponent(
    `/play/${game.id}`
  )}`;

  return (
    <>
      <NoUserAuthModal
        text="Save your favorite games"
        icon={<FavoriteIcon fontSize="large" color="error" />}
        href={redirectToLogin}
        open={showFavoriteWarning}
        onClose={() => setShowFavoriteWarning(false)}
      />
      <NoUserAuthModal
        text="Vote for the best games"
        href={redirectToLogin}
        icon={<ThumbsUpDownIcon fontSize="large" color="success" />}
        open={showVoteWarning}
        onClose={() => setShowVoteWarning(false)}
      />
      <TopPlayersModal
        players={analytics?.topPlayers ?? []}
        open={showPlayers}
        onClose={() => setShowPlayers(false)}
      />
      <GameLauncher
        analytics={analytics}
        game={game}
        developer={developer}
        onFavorite={handleToggleFavorite}
        onPlay={handlePlayGame}
        onVote={handleMakeVote}
        onViewGamePlay={handleShowPlayers}
        isFavorite={details?.favorite ?? false}
        userVote={details?.vote ?? null}
      />
    </>
  );
};

export default DynamicGameLauncher;
