import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { AbsolutelyCentered, useWindowSize } from '@worksheets/ui-core';
import { ColoredGestureThumbsUp } from '@worksheets/ui/icons';
import { convertSecondsToMilliseconds } from '@worksheets/util/time';
import { useState } from 'react';
import Confetti from 'react-confetti';

const STOP_CONFETTI_TIMER = convertSecondsToMilliseconds(15);

export const GameSubmissionSuccessScreen = () => {
  const [width, height] = useWindowSize();

  const [recycle, setRecycle] = useState(true);
  setTimeout(() => {
    setRecycle(false);
    console.log('stopped recycling');
  }, STOP_CONFETTI_TIMER);

  return (
    <AbsolutelyCentered>
      <Paper
        sx={{
          mx: 4,
          p: 4,
          mb: 12,
          maxWidth: 400,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <ColoredGestureThumbsUp
          sx={{
            height: 164,
            width: 164,
          }}
        />
        <Typography
          variant="h3"
          fontSize={{
            xs: '2rem',
            sm: '3rem',
          }}
          sx={{
            textTransform: 'uppercase',
            letterSpacing: '0.4rem',
            mb: 4,
            color: 'error.main',
          }}
        >
          Thank You!
        </Typography>

        <Typography variant="body1" textAlign="center">
          Your submission has been received and we'll be in touch soon.
        </Typography>
        <Typography variant="body3" textAlign="center">
          If you have any questions, please{' '}
          <Link href="/contact">contact us</Link>
        </Typography>
        <Button
          href="/account/submissions"
          variant="round"
          color="error"
          size="large"
          endIcon={<ArrowRightAltIcon sx={{ ml: '2px', mt: '-2px' }} />}
          sx={{
            mt: 4,
            width: 'fit-content',
          }}
        >
          My Submissions
        </Button>
      </Paper>
      <Confetti
        numberOfPieces={200}
        width={width}
        height={height}
        recycle={recycle}
      />
    </AbsolutelyCentered>
  );
};
