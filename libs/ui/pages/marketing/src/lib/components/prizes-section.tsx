import { Box, Container, Link, Typography } from '@mui/material';
import { ContainImage } from '@worksheets/ui/components/images';
import { GradientShadowedTypography } from '@worksheets/ui/components/typography';
import { useMediaQueryDown } from '@worksheets/ui/hooks/use-media-query';
import { routes } from '@worksheets/ui/routes';

export const PrizesSection = () => (
  <Box
    sx={{
      position: 'relative',
      display: 'grid',
      placeItems: 'center',
      background: (theme) =>
        theme.palette.background.marketing.gradients.blue.primary,
      borderRadius: (theme) => theme.shape.borderRadius * 2,
      zIndex: 5,
      my: -6,
      py: { xs: 12, sm: 14, md: 16 },
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
      <Title />
      <Box py={{ xs: 2, sm: 3, md: 4 }} />
      <Prizes />
      <Disclaimer />
    </Container>
  </Box>
);

const Title = () => (
  <Box>
    <Typography
      textTransform="uppercase"
      typography={{ xs: 'h5', sm: 'h4', md: 'h3' }}
      color="text.white"
      mb={-1}
    >
      Win Best
    </Typography>
    <GradientShadowedTypography
      textTransform="uppercase"
      typography={{ xs: 'h4', sm: 'h3', md: 'h2' }}
      textShadow={'0 3px 21px #00315F'}
      background={(theme) => theme.palette.text.marketing.gradients.orange.main}
    >
      Digital Prizes
    </GradientShadowedTypography>
  </Box>
);

const Prizes = () => {
  const isSmall = useMediaQueryDown('sm');
  const count = isSmall ? 4 : 6;
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: '1fr',
          desktop1: '1fr 1fr',
          md: '1fr 1fr',
        },
        gridAutoRows: {
          xs: 128,
          sm: 200,
          desktop1: 150,
          md: 180,
          desktop2: 210,
          lg: 240,
        },
        gap: { xs: 2, sm: 3, md: 4 },
      }}
    >
      {PRIZE_ITEMS.slice(0, count).map((prize) => (
        <Box
          component={Link}
          href={routes.prizes.path()}
          key={prize.alt}
          sx={{
            cursor: 'pointer',
            position: 'relative',
            aspectRatio: '754/352',
            height: '100%',
          }}
        >
          <ContainImage {...prize} />
        </Box>
      ))}
    </Box>
  );
};

const Disclaimer = () => (
  <Box
    mt={{ xs: 2, sm: 3, md: 4 }}
    width="70%"
    display="flex"
    flexDirection="column"
    gap={{ xs: 1, sm: 2 }}
  >
    <Typography
      typography={{ xs: 'body2', sm: 'body1' }}
      fontWeight={{ xs: 600, sm: 600 }}
      color={(theme) => theme.palette.text.blue.lightest}
    >
      Prizes shown are for illustrative purposes only. Actual prizes may vary
      depending on sponsorships and availability. Please visit the Prizes page
      for more details.
    </Typography>
    <Typography
      variant="h6"
      component={Link}
      href={routes.prizes.path()}
      color="text.white"
      underline="hover"
      textTransform="uppercase"
      sx={{
        textDecorationColor: 'text.white',
      }}
    >
      & Many More!
    </Typography>
  </Box>
);

const PRIZE_ITEMS = [
  {
    alt: 'Steam Gift Cards',
    src: '/marketing/prizes/steam.png',
  },
  {
    alt: 'Google Gift Cards',
    src: '/marketing/prizes/google.png',
  },
  {
    alt: 'Apple Gift Cards',
    src: '/marketing/prizes/apple.png',
  },
  {
    alt: 'Amazon Gift Cards',
    src: '/marketing/prizes/amazon.png',
  },
  {
    alt: 'PlayStation Gift Cards',
    src: '/marketing/prizes/sony.png',
  },
  {
    alt: 'Xbox Gift Cards',
    src: '/marketing/prizes/xbox.png',
  },
  {
    alt: 'Starbucks Gift Cards',
    src: '/marketing/prizes/starbucks.png',
  },
  {
    alt: 'Nintendo Cards',
    src: '/marketing/prizes/nintendo.png',
  },
];
