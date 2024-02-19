import { ReportReason } from '@prisma/client';
import { trpc } from '@worksheets/trpc-charity';
import { Snackbar, useSnackbar } from '@worksheets/ui/components/snackbar';
import { useGameVotes } from '@worksheets/ui/hooks/use-game-votes';
import { useRecentlyPlayedGames } from '@worksheets/ui/hooks/use-recently-played-games';
import { useReferralCode } from '@worksheets/ui/hooks/use-referral-code';
import { routes } from '@worksheets/ui/routes';
import {
  DeveloperSchema,
  SerializableGameSchema,
  Vote,
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
  const loginHref = routes.login.path({
    query: {
      redirect: routes.game.path({
        params: { gameId: game.id },
      }),
    },
  });

  const session = useSession();
  const authenticated = session.status === 'authenticated';

  const [showShare, setShowShare] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const snackbar = useSnackbar();

  const [referralCode] = useReferralCode();

  const userVotes = useGameVotes();

  const castVote = trpc.public.games.vote.cast.useMutation();
  const play = trpc.public.games.play.record.useMutation();
  const reportGame = trpc.public.games.report.useMutation();

  const rewardAuthorized = trpc.user.rewards.gamePlay.authorized.useMutation();
  const rewardAnonymous = trpc.user.rewards.gamePlay.anonymous.useMutation();

  const { data: suggestions } = trpc.public.games.suggestions.useQuery({
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
    } else if (referralCode) {
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
      imageUrl: game.iconUrl,
      plays: game.plays,
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

  const handleMakeVote = async (newVote: Vote) => {
    if (!authenticated) {
      setShowVoteWarning(true);
      return;
    }

    const currentVote = userVotes.getVote(game.id);

    await castVote.mutateAsync({
      gameId: game.id,
      currentVote: currentVote?.vote,
      newVote,
    });

    userVotes.addGameVote({
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
        userVote={userVotes.getVote(game.id)?.vote}
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
