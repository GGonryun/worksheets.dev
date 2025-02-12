import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { waitFor } from '@worksheets/util/time';
import React, { useEffect, useState } from 'react';

export const CreateGameSubmissionScreen: React.FC<{
  createSubmission: () => Promise<{ id: string }>;
}> = ({ createSubmission }) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    // arbitrary wait for 1 second to prevent request from happening too fast.
    waitFor(1000).then(() => {
      createSubmission()
        .then(({ id }) => {
          // no-op
        })
        .catch((e) => {
          setError(true);
        });
    });
    // only run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <ErrorScreen message="Something went wrong, please try again." />;
  }

  return <LoadingScreen />;
};
