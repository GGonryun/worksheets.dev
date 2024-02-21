import { ArrowForward } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { Countdown } from '@worksheets/ui/components/marketing';
import { useMediaQueryDown } from '@worksheets/ui/hooks/use-media-query';
import { routes } from '@worksheets/ui/routes';
import { BasicRaffleDetails } from '@worksheets/util/types';

export const NextRaffle: React.FC<{
  raffle: BasicRaffleDetails;
}> = ({ raffle }) => {
  const isMobile = useMediaQueryDown('sm');
  const raffleHref = routes.raffle.path({
    params: { raffleId: raffle.id },
  });
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
      my={{ xs: 2, sm: 4, md: 6 }}
    >
      <Typography
        typography={{ xs: 'h3', sm: 'h2', md: 'h1' }}
        align="center"
        textTransform="uppercase"
        fontWeight={{ xs: 800, sm: 800, md: 800 }}
        sx={{
          color: 'error.main',
          background: `linear-gradient(180deg, rgba(255,174,156,1) 0%, rgba(255,113,113,1) 15%, rgba(244,36,60,1) 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          WebkitTextStrokeColor: 'rgba(255, 255, 255, 0.5)',
          WebkitTextStrokeWidth: { xs: 1, sm: 1.5, md: 2 },
        }}
      >
        Next Raffle
      </Typography>
      <Box py={{ xs: 0.25, sm: 0.5, md: 0.75 }} />
      <Countdown expiresAt={raffle.expiresAt} href={raffleHref} />
      <br />
      <Button
        variant="arcade"
        color="warning"
        size={isMobile ? 'medium' : 'large'}
        href={raffleHref}
        endIcon={<ArrowForward />}
      >
        Enter Now
      </Button>
    </Box>
  );
};
