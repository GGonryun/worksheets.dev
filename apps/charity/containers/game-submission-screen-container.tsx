import { trpc } from '@worksheets/trpc-charity';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import {
  GameSubmissionFormContextProvider,
  GameSubmissionScreen,
} from '@worksheets/ui/pages/game-submissions';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { Snackbar } from '@worksheets/ui/snackbar';
import { useSession } from 'next-auth/react';

import { useGameSubmissionForm } from '../hooks/use-game-submission-form';

export const GameSubmissionScreenContainer: React.FC<{
  submissionId: string;
}> = ({ submissionId }) => {
  const session = useSession();

  const enableQueries = session.status === 'authenticated';
  const terms = trpc.user.profile.terms.get.useQuery(undefined, {
    enabled: enableQueries,
  });

  const submission = trpc.game.submissions.get.useQuery(
    { id: submissionId },
    { enabled: enableQueries }
  );

  const { form, snackbar } = useGameSubmissionForm(
    submissionId,
    submission.data
  );

  if (submission.isLoading || terms.isLoading) {
    return <LoadingScreen />;
  }

  if (submission.error || terms.error) {
    return (
      <ErrorScreen
        onRetry={() => {
          submission.refetch();
        }}
      />
    );
  }

  return (
    <GameSubmissionFormContextProvider value={form}>
      <GameSubmissionScreen invalidProfile={!terms.data.hasApproved} />
      <Snackbar {...snackbar} />
    </GameSubmissionFormContextProvider>
  );
};
