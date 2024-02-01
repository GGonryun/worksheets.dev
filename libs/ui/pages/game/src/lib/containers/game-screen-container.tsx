import { ReportReason } from '@prisma/client';
import { trpc } from '@worksheets/trpc-charity';
import { Snackbar, useSnackbar } from '@worksheets/ui/components/snackbar';
import { useGameVotes } from '@worksheets/ui/hooks/use-game-votes';
import { useRecentlyPlayedGames } from '@worksheets/ui/hooks/use-recently-played-games';
import { useReferralCode } from '@worksheets/ui/hooks/use-referral-code';
import {
  CastVote,
  DeveloperSchema,
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

  const userVotes = useGameVotes();

  const castVote = trpc.game.vote.cast.useMutation();
  const play = trpc.game.play.record.useMutation();
  const reportGame = trpc.game.report.useMutation();

  const rewardAuthorized = trpc.user.rewards.gamePlay.authorized.useMutation();
  const rewardAnonymous = trpc.user.rewards.gamePlay.anonymous.useMutation();

  const { data: suggestions } = trpc.game.suggestions.useQuery({
    gameId: game.id,
  });

  const { addRecentlyPlayed } = useRecentlyPlayedGames();

  const [showVoteWarning, setShowVoteWarning] = useState(false);

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
    await play.mutateAsync({ gameId: game.id });
  };

  const handlePlayGame = async () => {
    addRecentlyPlayed({
      id: game.id,
      name: game.name,
      image: game.iconUrl,
      playedLast: new Date().getTime(),
    });

    await Promise.all([handleRewardPlay(), handleIncrementPlayCount()]);
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
  };

  return (
    <>
      <GameScreen
        suggestions={suggestions ?? []}
        game={game}
        developer={developer}
        userVote={userVotes.getVote(game.id)?.liked}
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
