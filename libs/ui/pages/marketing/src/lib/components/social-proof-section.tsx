import { Container, Link, Theme, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { SystemCssProperties } from '@mui/system';
import { FillImage } from '@worksheets/ui/components/images';
import { GradientTypography } from '@worksheets/ui/components/typography';
import { useMediaQueryDown } from '@worksheets/ui/hooks/use-media-query';
import { shorthandNumber } from '@worksheets/util/numbers';
import { NonEmptyArray } from '@worksheets/util/types';
import React from 'react';

type TwitterWinner = {
  username: string;
  tweetUrl: string;
};

type Props = {
  prizesWon: number;
  moneyRaised: number;
  winners: NonEmptyArray<TwitterWinner>;
};

export const SocialProofSection: React.FC<Props> = ({
  prizesWon,
  moneyRaised,
  winners,
}) => {
  const primaryWinner = winners[0];
  const otherWinners = winners.slice(1);
  return (
    <Box
      sx={{
        position: 'relative',
        my: -6,
        pt: { xs: 12, sm: 14, md: 16 },
        pb: { xs: 20, sm: 22, md: 24 },
        background: (theme) =>
          theme.palette.background.marketing.gradients.blue.primary,
        borderRadius: (theme) => theme.shape.borderRadius * 2,
        zIndex: 4,
      }}
    >
      <Container
        component={Box}
        maxWidth="xl"
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          position: 'relative',
          gap: { xs: 6, sm: 6, md: 6, lg: 8, xl: 10 },
        }}
      >
        <WinnersText />

        <PrimaryWinner
          prizesWon={prizesWon}
          moneyRaised={moneyRaised}
          winner={primaryWinner}
        />

        <WinnerCarousel winners={otherWinners} />
      </Container>
      <ConfettiLeft />
    </Box>
  );
};

const ConfettiLeft = () => (
  <Box
    sx={{
      top: { xs: 150, sm: 175, md: 125 },
      left: { xs: -50, sm: -30, md: -20, lg: -10, xl: 0 },
      position: 'absolute',
      aspectRatio: '381/801',
      height: { xs: '30%', sm: '35%', md: '40%', lg: '45%' },
    }}
  >
    <FillImage src="/marketing/confetti-left.png" alt="Confetti " />
  </Box>
);

const WinnerCarousel: React.FC<{ winners: TwitterWinner[] }> = ({
  winners,
}) => {
  const isMobile = useMediaQueryDown('sm');
  const isSmall = useMediaQueryDown('md');
  const isMedium = useMediaQueryDown('lg');

  let count = 10;
  if (isMobile) {
    count = 6;
  } else if (isSmall) {
    count = 9;
  } else if (isMedium) {
    count = 9;
  }

  if (winners.length < 1) {
    return null;
  }

  return (
    <Box
      sx={{
        mt: 2,
        width: '100%',
        py: 4,
        px: { xs: 2, sm: 4 },
        display: 'flex',

        boxShadow: (theme) => theme.shadows[10],
        background: (theme) => theme.palette.background['gradient-soft'],
        borderRadius: (theme) => theme.shape.borderRadius * 2,
      }}
    >
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(2, 1fr)',
          mobile1: 'repeat(3, 1fr)',
          sm: 'repeat(3, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(5, 1fr)',
        }}
        width="100%"
        gap={{ xs: 2, sm: 4 }}
      >
        {winners.slice(0, count).map((winner) => (
          <WinnerItem key={winner.username} {...winner} />
        ))}
      </Box>
    </Box>
  );
};

const WinnerItem: React.FC<{ username: string; tweetUrl: string }> = ({
  username,
  tweetUrl,
}) => (
  <Box
    display="flex"
    alignItems="center"
    flexDirection="column"
    component={Link}
    href={tweetUrl}
    gap={{ xs: 0.5, sm: 1 }}
    sx={{
      textDecoration: 'none',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    }}
  >
    <WinnerIcon
      username={username}
      size={{ xs: 80, sm: 110, md: 140 }}
      boxShadow={(theme) => theme.shadows[4]}
    />
    <Typography
      color={'text.blue.main'}
      typography={{ xs: 'body3', sm: 'body2', md: 'body1' }}
      fontWeight={{ xs: 600, sm: 600, md: 600 }}
    >
      @{username}
    </Typography>
  </Box>
);

const PrimaryWinner: React.FC<
  Pick<Props, 'moneyRaised' | 'prizesWon'> & { winner: TwitterWinner }
> = ({ moneyRaised, prizesWon, winner }) => (
  <Box
    display="flex"
    flexDirection={{ xs: 'column', desktop1: 'row' }}
    gap={{ xs: 2, desktop1: 0 }}
  >
    <Box alignSelf="center" mb={{ xs: -2, md: -4 }}>
      <PrizesWon count={prizesWon} />
    </Box>
    <LargeWinner {...winner} />
    <Box alignSelf="flex-start">
      <MoneyRaised count={moneyRaised} />
    </Box>
  </Box>
);

const LargeWinner: React.FC<TwitterWinner> = ({ username, tweetUrl }) => {
  const gradientProps: React.ComponentProps<typeof GradientTypography> = {
    typography: { xs: 'h6', sm: 'h5', md: 'h4' },
    letterSpacing: { xs: 1, sm: 2, md: 3 },
    background: (theme) => theme.palette.text.marketing.gradients.yellow.main,
  };
  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      component={Link}
      href={tweetUrl}
      gap={{ xs: 1, sm: 2 }}
      sx={{
        textDecoration: 'none',
      }}
    >
      <GradientTypography {...gradientProps}>Latest Winner</GradientTypography>
      <WinnerIcon
        username={username}
        boxShadow={(theme) => theme.shadows[10]}
        size={{ xs: 180, sm: 200, md: 240 }}
      />
      <GradientTypography
        typography={{ xs: 'h6', sm: 'h5', md: 'h4' }}
        letterSpacing={{ xs: 1, sm: 2, md: 3 }}
        background={(theme) =>
          theme.palette.text.marketing.gradients.yellow.main
        }
      >
        @{username}
      </GradientTypography>
    </Box>
  );
};

const WinnerIcon: React.FC<{
  username: string;
  size: SystemCssProperties<Theme>['height'];
  boxShadow?: SystemCssProperties<Theme>['boxShadow'];
}> = ({ username, boxShadow, size }) => (
  <Box
    sx={{
      position: 'relative',
      height: size,
      width: size,
      borderRadius: '50%',
      overflow: 'hidden',
      boxShadow,
    }}
  >
    <FillImage
      src={`https://unavatar.io/twitter/${username}?fallback=https://avatar.vercel.sh/${username}?size=400`}
      alt={username}
    />
  </Box>
);

const PrizesWon: React.FC<{ count: number }> = ({ count }) => (
  <Box display="flex" alignItems="center">
    <PrizeText label="Prizes Won" value={shorthandNumber(count)} />
    <Box
      sx={{
        position: 'relative',
        aspectRatio: '383/404',
        height: { xs: 140, sm: 160, md: 180, lg: 200, xl: 220 },
        ml: { xs: -0.5, sm: -1, md: -1.5 },
      }}
    >
      <FillImage src="/marketing/giftbox-2.png" alt="Giftbox" />
    </Box>
  </Box>
);

const MoneyRaised: React.FC<{ count: number }> = ({ count }) => (
  <Box display="flex" alignItems="center">
    <Box
      sx={{
        position: 'relative',
        aspectRatio: '369/363',
        height: { xs: 120, sm: 140, md: 160, lg: 180, xl: 200 },
        mr: { xs: -0.5, sm: -1, md: -1.5 },
      }}
    >
      <FillImage src="/marketing/trophy.png" alt="Giftbox" />
    </Box>
    <PrizeText label="Money Raised" value={`$${shorthandNumber(count)}`} />
  </Box>
);

const PrizeText: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <Box display="flex" alignItems="center" flexDirection="column">
    <Typography
      whiteSpace="nowrap"
      typography={{ xs: 'body2', sm: 'body1' }}
      fontWeight={{
        xs: 700,
        sm: 700,
        md: 700,
      }}
      color={'text.white'}
    >
      {label}
    </Typography>
    <GradientTypography
      typography={{ xs: 'h4', sm: 'h4', md: 'h3', lg: 'h2' }}
      background={(theme) => theme.palette.text.marketing.gradients.yellow.main}
    >
      {value}
    </GradientTypography>
  </Box>
);

const WinnersText = () => (
  <Box textAlign="center" px={2}>
    <Typography
      typography={{ xs: 'h3', sm: 'h2' }}
      component="span"
      textTransform="uppercase"
      letterSpacing={{ xs: 1, sm: 2, md: 3 }}
      color={'white.main'}
    >
      Lucky{' '}
    </Typography>
    <GradientTypography
      typography={{ xs: 'h3', sm: 'h2' }}
      component="span"
      textTransform="uppercase"
      letterSpacing={{ xs: 1, sm: 2, md: 3 }}
      background={(theme) => theme.palette.text.marketing.gradients.orange.main}
    >
      Winners
    </GradientTypography>
  </Box>
);
