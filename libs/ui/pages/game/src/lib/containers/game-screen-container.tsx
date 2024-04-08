import { ReportReason } from '@prisma/client';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { useGameVotes } from '@worksheets/ui/hooks/use-game-votes';
import { useRecentlyPlayedGames } from '@worksheets/ui/hooks/use-recently-played-games';
import { useReferralCode } from '@worksheets/ui/hooks/use-referral-code';
import { MS_TO_S, S_TO_MS } from '@worksheets/util/time';
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
} from '../components';
import { useGameTracker } from '../hooks/use-game-tracker';

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

  const trackGamePlay = trpc.user.rewards.gamePlay.track.useMutation();
  const trackGameTime = trpc.user.rewards.gameTime.track.useMutation();

  const { data: suggestions } = trpc.public.games.suggestions.useQuery(
    {
      gameId: game.id,
    },
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const { addRecentlyPlayed } = useRecentlyPlayedGames();

  const [showVoteWarning, setShowVoteWarning] = useState(false);
  const gameTracker = useGameTracker({
    // TODO: increase this if performance is bad or expensive.
    duration: S_TO_MS(15),
    onElapsed: (increment) =>
      trackGameTime.mutate({
        gameId: game.id,
        increment: MS_TO_S(increment),
      }),
  });

  const handleRewardPlay = async () => {
    if (authenticated) {
      await trackGamePlay.mutateAsync({
        gameId: game.id,
      });
    } else if (referralCode) {
      snackbar.info(<LoginToEarnTokensSnackbarMessage href={loginHref} />);
    }
  };

  const handleIncrementPlayCount = async () => {
    await play.mutateAsync({ gameId: game.id });
  };

  const handlePlayGame = async () => {
    // TODO: when someone clicks play game start the game tracker
    gameTracker.start();
    addRecentlyPlayed({
      id: game.id,
      title: game.name,
      thumbnail: game.iconUrl,
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
