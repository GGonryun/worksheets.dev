import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { AbsolutelyCentered } from '@worksheets/ui-core';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { waitFor } from '@worksheets/util/time';

export const CreateGameSubmissionScreen: React.FC<{
  createSubmission: () => Promise<{ id: string }>;
}> = ({ createSubmission }) => {
  const router = useRouter();
  const [error, setError] = useState(false);

  useEffect(() => {
    // arbitrary wait for 1 second to prevent request from happening too fast.
    waitFor(1000).then(() => {
      createSubmission()
        .then(({ id }) => {
          router.replace(`/submit/edit/${id}`);
        })
        .catch((e) => {
          setError(true);
        });
    });
    // only run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AbsolutelyCentered>
      <Box
        sx={{
          mt: -12,
          p: 3,
          display: 'grid',
          placeItems: 'center',
        }}
      >
        {error ? <ErrorView /> : <LoadingView />}
      </Box>
    </AbsolutelyCentered>
  );
};
const ErrorView: React.FC = () => (
  <>
    <WarningAmberIcon
      color="warning"
      sx={{
        height: { xs: 75, sm: 100 },
        width: { xs: 75, sm: 100 },
      }}
    />
    <Box py={3} />
    <Typography variant="h5" textAlign="center">
      Something went wrong, refresh the page to try again.
    </Typography>
    <Typography variant="body1" textAlign="center">
      If the problem persists, please <Link href="/contact">contact us.</Link>
    </Typography>
  </>
);
const LoadingView: React.FC = () => (
  <>
    <CircularProgress
      size="large"
      color="success"
      sx={{
        height: { xs: 75, sm: 100 },
        width: { xs: 75, sm: 100 },
      }}
    />
    <Box py={3} />
    <Typography variant="h5" textAlign="center">
      We&apos;re creating your game submission.
    </Typography>
  </>
);
