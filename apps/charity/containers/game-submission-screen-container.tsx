import {
  GameSubmissionForm,
  GameSubmissionFormContextProvider,
  GameSubmissionScreen,
} from '@worksheets/ui/pages/game-submissions';

import { FC } from 'react';
import { useGameSubmissionForm } from '../hooks/use-game-submission-form';
import { Nullable } from '@worksheets/util/types';

export const GameSubmissionScreenContainer: FC<{
  submissionId: string;
  form: Nullable<GameSubmissionForm>;
  invalidProfile: boolean;
}> = ({ submissionId, form: existingData, invalidProfile }) => {
  const form = useGameSubmissionForm(submissionId, existingData);

  return (
    <GameSubmissionFormContextProvider value={form}>
      <GameSubmissionScreen invalidProfile={invalidProfile} />
    </GameSubmissionFormContextProvider>
  );
};
