import {
  GameSubmissionForm,
  GameSubmissionFormContextProvider,
  GameSubmissionScreen,
} from '@worksheets/ui/pages/game-submissions';

import { FC } from 'react';
import { useGameSubmissionForm } from '../hooks/use-game-submission-form';
import { Nullable } from '@worksheets/util/types';
import { Snackbar } from '@worksheets/ui/snackbar';

export const GameSubmissionScreenContainer: FC<{
  submissionId: string;
  form: Nullable<GameSubmissionForm>;
  invalidProfile: boolean;
}> = ({ submissionId, form: existingData, invalidProfile }) => {
  const { form, snackbar } = useGameSubmissionForm(submissionId, existingData);

  return (
    <GameSubmissionFormContextProvider value={form}>
      <GameSubmissionScreen invalidProfile={invalidProfile} />
      <Snackbar {...snackbar} />
    </GameSubmissionFormContextProvider>
  );
};
