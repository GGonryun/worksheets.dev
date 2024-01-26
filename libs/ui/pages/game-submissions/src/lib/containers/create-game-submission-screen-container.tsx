import { trpc } from '@worksheets/trpc-charity';

import { CreateGameSubmissionScreen } from '../components';

const Container = () => {
  const createSubmission = trpc.game.submissions.create.useMutation();

  return (
    <CreateGameSubmissionScreen
      createSubmission={createSubmission.mutateAsync}
    />
  );
};

export default Container;
