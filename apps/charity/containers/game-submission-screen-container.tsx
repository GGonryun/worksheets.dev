import {
  FormContextProvider,
  GameSubmissionScreen,
} from '@worksheets/ui/pages/contributions';
import { FC } from 'react';
import { useConnectedForm } from '../hooks/useConnectedForm';

export const GameSubmissionScreenContainer: FC = () => {
  const form = useConnectedForm();

  return (
    <FormContextProvider value={form}>
      <GameSubmissionScreen invalidProfile={true} />
    </FormContextProvider>
  );
};
