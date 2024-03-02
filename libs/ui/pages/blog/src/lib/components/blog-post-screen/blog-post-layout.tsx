import { Box, Container } from '@mui/material';
import { Game } from '@worksheets/ui/components/games';
import { GradientShadowedTypography } from '@worksheets/ui/components/typography';
import { BasicGameInfo } from '@worksheets/util/types';
import React from 'react';

export const BlogPostLayout: React.FC<{
  children: React.ReactNode;
  games: BasicGameInfo[];
}> = ({ children, games }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '3fr 1fr' },
          gap: 2,
        }}
      >
        {children}
        <PopularGames games={games} />
      </Box>
    </Container>
  );
};

const PopularGames: React.FC<{ games: BasicGameInfo[] }> = ({ games }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      height: 'fit-content',
      gap: 2,
    }}
  >
    <GradientShadowedTypography
      typography={{ xs: 'h5', lg: 'h4' }}
      textShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      background={(theme) => theme.palette.text.marketing.gradients.orange.main}
    >
      Popular Games
    </GradientShadowedTypography>
    <Box
      sx={{
        display: 'grid',
        width: '100%',
        gap: 2,
        gridTemplateColumns: {
          xs: '1fr 1fr',
          sm: '1fr 1fr 1fr',
          md: '1fr',
        },
      }}
    >
      {games.map((game) => (
        <Game {...game} />
      ))}
    </Box>
  </Box>
);
