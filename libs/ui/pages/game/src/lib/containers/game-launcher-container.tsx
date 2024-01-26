import { trpc } from '@worksheets/trpc-charity';
import { Snackbar, useSnackbar } from '@worksheets/ui/components/snackbar';
import { useRecentlyPlayedGames } from '@worksheets/ui/hooks/use-recently-played-games';
import { useReferralCode } from '@worksheets/ui/hooks/use-referral-code';
import {
  CastVote,
  DeveloperSchema,
  GameAnalyticsSchema,
  SerializableGameSchema,
} from '@worksheets/util/types';
import { useSession } from 'next-auth/react';
import { FC, useState } from 'react';

import {
  CannotVoteModal,
  GameLauncher,
  LoginToEarnTokensSnackbarMessage,
  TokensEarnedSnackbarMessage,
} from '../components';

const GameLauncherContainer: FC<{
  game: SerializableGameSchema;
  developer: DeveloperSchema;
  analytics: GameAnalyticsSchema;
}> = ({ game, developer, analytics }) => {
  const loginHref = `/login?redirect=${encodeURIComponent(`/play/${game.id}`)}`;

  const session = useSession();
  const authenticated = session.status === 'authenticated';

  const snackbar = useSnackbar();
  const [referralCode] = useReferralCode();

  const util = trpc.useUtils();

  const castVote = trpc.game.vote.cast.useMutation();
  const playAnonymous = trpc.game.play.anonymous.useMutation();
  const playAuthorized = trpc.game.play.authorized.useMutation();

  const rewardAuthorized = trpc.user.rewards.gamePlay.authorized.useMutation();
  const rewardAnonymous = trpc.user.rewards.gamePlay.anonymous.useMutation();

  const { data: userVote } = trpc.game.vote.get.useQuery(
    {
      gameId: game.id,
    },
    {
      enabled: authenticated,
    }
  );

  const { addRecentlyPlayed } = useRecentlyPlayedGames();

  const [showVoteWarning, setShowVoteWarning] = useState(false);

  const invalidateStatistics = async () => {
    await util.game.analytics.invalidate({ gameId: game.id });
    await util.game.vote.get.invalidate({ gameId: game.id });
  };

  const handleRewardPlay = async () => {
    if (authenticated) {
      const result = await rewardAuthorized.mutateAsync({
        gameId: game.id,
      });

      snackbar.trigger({
        message: (
          <TokensEarnedSnackbarMessage
            earnedGiftBox={result.earnedGiftBox}
            tokensEarned={result.tokensEarned}
          />
        ),
        severity: 'success',
      });
    } else {
      await rewardAnonymous.mutateAsync({ referralCode });
      snackbar.trigger({
        message: <LoginToEarnTokensSnackbarMessage href={loginHref} />,
        severity: 'info',
      });
    }
  };

  const handleIncrementPlayCount = async () => {
    if (authenticated) {
      await playAuthorized.mutateAsync({ gameId: game.id });
    } else {
      await playAnonymous.mutateAsync({ gameId: game.id });
    }
  };

  const handlePlayGame = async () => {
    addRecentlyPlayed({
      gameId: game.id,
      playedLast: new Date().getTime(),
    });

    await Promise.all([handleRewardPlay(), handleIncrementPlayCount()]);

    await invalidateStatistics();
  };

  const handleMakeVote = async (newVote: CastVote['vote']) => {
    if (!authenticated) {
      setShowVoteWarning(true);
      return;
    }

    await castVote.mutateAsync({
      gameId: game.id,
      vote: newVote,
    });

    await invalidateStatistics();
  };

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
      <Snackbar {...snackbar} />
    </>
  );
};

export default GameLauncherContainer;
