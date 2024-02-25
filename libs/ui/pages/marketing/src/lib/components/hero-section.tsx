import { Box, Container, Typography } from '@mui/material';
import { ContainImage, FillImage } from '@worksheets/ui/components/images';
import { GradientTypography } from '@worksheets/ui/components/typography';
import React from 'react';

export const HeroSection = () => (
  <Box
    sx={{
      position: 'relative',
      display: 'grid',
      placeItems: 'center',
      mt: -5,
      pt: 12,
      pb: 6,
      px: 4,
      background: (theme) =>
        theme.palette.background.marketing.gradients.blue.secondary,
      borderRadius: (theme) => theme.shape.borderRadius * 2,
      boxShadow: (theme) => theme.shadows[7],
      zIndex: 7,
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
        textAlign: 'center',
      }}
    >
      <Shines />

      <Bar left={'0'} />
      <Bar right={'0'} />

      <Subheading />
      <Heading />

      <HeroImage />
    </Container>

    <YellowTicket />
    <RightGifts />
  </Box>
);

const YellowTicket = () => (
  <Box
    position="absolute"
    sx={{
      aspectRatio: '222/383',
      height: {
        xs: '30%',
        mobile1: '34%',
        mobile2: '36%',
        sm: '38%',
        md: '40%',
      },
      transform: 'rotate(270deg)',
      left: 0,
      bottom: { xs: -50, mobile1: -60, sm: -100, md: -120 },
    }}
  >
    <FillImage
      src="/marketing/yellow-ticket.png"
      alt="yellow ticket"
      priority
    />
  </Box>
);

const RightGifts = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        aspectRatio: '445/1016',
        bottom: { xs: -130, sm: -200, md: -280, lg: -320, xl: -360 },
        right: 0,
        height: { xs: '60%', sm: '75%', md: '80%', lg: '90%', xl: '100%' },
      }}
    >
      <FillImage src="/marketing/gifts-1-right.png" alt="gifts" priority />
    </Box>
  );
};

const Subheading = () => (
  <Typography
    color="text.white"
    textTransform="uppercase"
    mb={0}
    typography={{ xs: 'body1', sm: 'h6', md: 'h5' }}
    fontWeight={{ xs: 500, sm: 500, md: 500 }}
    letterSpacing={{ xs: 2, sm: 3, md: 4 }}
  >
    Play . Enjoy . Win
  </Typography>
);

const Heading = () => (
  <GradientTypography
    textTransform="uppercase"
    typography={{ xs: 'h3', sm: 'h2', md: 'h1' }}
    fontWeight={{ xs: 600, sm: 600, md: 600 }}
    letterSpacing={{ xs: 6, sm: 10, md: 12 }}
    background={(theme) => theme.palette.text.marketing.gradients.blue.main}
  >
    Play & Win
  </GradientTypography>
);

const Shines = () => (
  <Box
    sx={{
      position: 'absolute',
      height: '100%',
      width: '90%',
    }}
  >
    <ContainImage src="/marketing/shines.png" alt="shines" priority />
  </Box>
);

const HeroImage = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        mt: { xs: -6, sm: -10, md: -14 },
        mb: { xs: -14, sm: -16, md: -18 },
        height: { xs: 200, mobile1: 250, mobile2: 300, sm: 400, md: 500 },
        width: { xs: 200, mobile1: 250, mobile2: 300, sm: 400, md: 500 },
      }}
    >
      <FillImage src="/marketing/controller.png" alt="hero-image" priority />
    </Box>
  );
};

const Bar: React.FC<{ left?: string; right?: string }> = ({ left, right }) => (
  <Box
    position="absolute"
    top="0"
    left={left}
    right={right}
    bottom="2rem"
    width="8px"
    sx={{
      background: (theme) => theme.palette.primary.gradient,
      borderRadius: 4,
    }}
  />
);
