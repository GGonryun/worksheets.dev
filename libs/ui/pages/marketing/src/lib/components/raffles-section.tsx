import { Box, Button, Container } from '@mui/material';
import { contestsRoutes } from '@worksheets/routes';
import { FillImage } from '@worksheets/ui/components/images';
import { Countdown } from '@worksheets/ui/components/marketing';
import { GradientTypography } from '@worksheets/ui/components/typography';
import { useMediaQueryDown } from '@worksheets/ui/hooks/use-media-query';
import React from 'react';

import { deepDropShadow } from '../style';

export const RafflesSection: React.FC<{ raffleExpiration: number }> = ({
  raffleExpiration,
}) => {
  const isMobile = useMediaQueryDown('sm');
  return (
    <Box
      sx={{
        position: 'relative',
        background: (theme) => theme.palette.background.soft,
        mt: -6,
        pt: 16,
        pb: { xs: 8, sm: 10, md: 12 },
        px: 2,
        borderRadius: (theme) => theme.shape.borderRadius * 2,
        boxShadow: deepDropShadow,
        zIndex: 6,
      }}
    >
      <Container
        component={Box}
        maxWidth="lg"
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <GradientTypography
          typography={{ xs: 'h4', mobile2: 'h3', sm: 'h2', md: 'h1' }}
          textAlign="center"
          textTransform="uppercase"
          fontWeight={{ xs: 600, sm: 600, md: 600 }}
          letterSpacing={{ xs: 2, sm: 5, md: 6 }}
          gutterBottom={isMobile}
          color="error.main"
          background={(theme) =>
            theme.palette.text.marketing.gradients.red.main
          }
        >
          Give Away
        </GradientTypography>
        <Countdown expiresAt={raffleExpiration} href={'/'} />
        <Button
          variant="arcade"
          color="warning"
          size={isMobile ? 'small' : 'medium'}
          href={contestsRoutes.raffles.url()}
          sx={{
            mt: { xs: 2, sm: 3, md: 4 },
          }}
        >
          See Raffles
        </Button>
      </Container>{' '}
      <LeftGifts />
      <RightConfetti />
    </Box>
  );
};

const RightConfetti = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        zIndex: 5,
        aspectRatio: '400/800',
        height: { xs: '80%', sm: '90%', md: '100%' },
        right: 0,
        bottom: { xs: -180, sm: -240, md: -380, lg: -440 },
      }}
    >
      <FillImage src="/marketing/confetti-right.png" alt="confetti" priority />
    </Box>
  );
};

const LeftGifts = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        zIndex: 5,
        aspectRatio: '487/1016',
        height: { xs: '60%', sm: '75%', md: '80%', lg: '90%', xl: '100%' },
        left: 0,
        bottom: { xs: -100, sm: -140, md: -160, lg: -180 },
      }}
    >
      <FillImage src="/marketing/gifts-1-left.png" alt="gifts" priority />
    </Box>
  );
};
