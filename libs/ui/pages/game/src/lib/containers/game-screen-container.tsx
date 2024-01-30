import { ReportReason } from '@prisma/client';
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
import { useState } from 'react';

import {
  CannotVoteModal,
  GameScreen,
  LoginToEarnTokensSnackbarMessage,
  ReportIssueModal,
  ShareGameModal,
  TokensEarnedSnackbarMessage,
} from '../components';

const emptyAnalyticsPayload: GameAnalyticsSchema = {
  plays: '0',
  votes: { up: '0', down: '0' },
  score: '0',
};

const GameScreenContainer: React.FC<{
  game: SerializableGameSchema;
  developer: DeveloperSchema;
}> = ({ game, developer }) => {
  const loginHref = `/login?redirect=${encodeURIComponent(`/play/${game.id}`)}`;

  const session = useSession();
  const authenticated = session.status === 'authenticated';

  const [showShare, setShowShare] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const snackbar = useSnackbar();

  const [referralCode] = useReferralCode();

  const util = trpc.useUtils();

  const castVote = trpc.game.vote.cast.useMutation();
  const playAnonymous = trpc.game.play.anonymous.useMutation();
  const playAuthorized = trpc.game.play.authorized.useMutation();
  const reportGame = trpc.game.report.useMutation();

  const rewardAuthorized = trpc.user.rewards.gamePlay.authorized.useMutation();
  const rewardAnonymous = trpc.user.rewards.gamePlay.anonymous.useMutation();

  const { data: analytics } = trpc.game.analytics.useQuery({
    gameId: game.id,
  });

  const { data: suggestions } = trpc.game.suggestions.useQuery({
    gameId: game.id,
  });

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

  const handleReportGame = async (reason: ReportReason, text: string) => {
    reportGame.mutateAsync({
      gameId: game.id,
      reason,
      text,
    });
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
      <GameScreen
        suggestions={suggestions ?? []}
        game={game}
        analytics={analytics ?? emptyAnalyticsPayload}
        developer={developer}
        userVote={userVote ?? 'none'}
        onPlay={handlePlayGame}
        onVote={handleMakeVote}
        onShare={() => setShowShare(true)}
        onReport={() => setShowReport(true)}
      />
      <Snackbar {...snackbar.props} />
      <CannotVoteModal
        href={loginHref}
        open={showVoteWarning}
        onClose={() => setShowVoteWarning(false)}
      />
      <ShareGameModal
        open={showShare}
        onClose={() => setShowShare(false)}
        id={game.id}
        name={game.name}
      />
      <ReportIssueModal
        open={showReport}
        onClose={() => setShowReport(false)}
        onReport={handleReportGame}
      />
    </>
  );
};

export default GameScreenContainer;
