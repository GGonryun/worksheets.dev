import { ArrowForward, Check } from '@mui/icons-material';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export const VIPScreen: React.FC<{
  waitlisted: boolean;
  join: () => Promise<void>;
}> = ({ waitlisted, join }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (waitlisted) {
      setShowConfirmation(true);
    }
  }, [waitlisted]);

  const handleClick = async () => {
    await join();
    setShowConfirmation(true);
  };

  return (
    <Container component={Box} maxWidth="lg" py={{ xs: 2, sm: 4 }}>
      <Paper
        sx={{
          p: 4,
          color: 'text.arcade',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          backgroundColor: 'background.solid-blue',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Typography variant="h4">VIP Membership Program</Typography>
          <Button
            variant="arcade"
            color="secondary"
            endIcon={<ArrowForward />}
            sx={{
              width: { xs: '100%', sm: 'fit-content' },
            }}
          >
            Learn more
          </Button>
        </Box>
        <Typography fontWeight={500}>
          Join the VIP waitlist to be notified when VIP Membership becomes
          available.{' '}
        </Typography>

        <Box mt={6}>
          <Button
            variant="arcade"
            color="success"
            disabled={showConfirmation}
            startIcon={showConfirmation ? <Check /> : undefined}
            onClick={handleClick}
          >
            {showConfirmation ? "You're on the waitlist!" : 'Join the Waitlist'}
          </Button>
          <Typography
            variant="body3"
            color="text.arcade"
            fontWeight={500}
            sx={{
              pt: 1,
              display: showConfirmation ? 'block' : 'none',
            }}
          >
            We've added you to the waitlist!
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};
