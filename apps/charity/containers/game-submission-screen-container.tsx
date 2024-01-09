import {
  GameSubmissionForm,
  GameSubmissionFormContextProvider,
  GameSubmissionScreen,
} from '@worksheets/ui/pages/game-submissions';

import { FC } from 'react';
import { useGameSubmissionForm } from '../hooks/use-game-submission-form';
import { Nullable } from '@worksheets/util/types';

export const GameSubmissionScreenContainer: FC<{
  submission: Nullable<GameSubmissionForm>;
  invalidProfile: boolean;
}> = ({ submission, invalidProfile }) => {
  const form = useGameSubmissionForm(submission);

  return (
    <GameSubmissionFormContextProvider value={form}>
      <GameSubmissionScreen invalidProfile={invalidProfile} />
    </GameSubmissionFormContextProvider>
  );
};
