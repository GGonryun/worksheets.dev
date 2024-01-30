import { Box, Theme, useMediaQuery } from '@mui/material';
import { PromotedGame } from '@worksheets/util/types';
import React from 'react';

import { PrimaryFeatured } from './primary-featured';

export const FeaturedGames: React.FC<{
  primary: PromotedGame[];
  secondary: PromotedGame;
}> = (props) => {
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const primary = isSmall ? [...props.primary, props.secondary] : props.primary;

  return (
    <Box display="flex" gap={3} alignItems="center" justifyContent="center">
      <Box
        sx={{
          flexGrow: 1.95,
          height: { xs: 200, mobile1: 280, sm: 'unset' },
          maxHeight: 480,
          maxWidth: 890,
          aspectRatio: { xs: 'unset', sm: '890/480' },
        }}
      >
        <PrimaryFeatured items={primary} />
      </Box>
      <Box
        sx={{
          display: { xs: 'none', mobile1: 'none', sm: 'none', md: 'block' },
          maxHeight: 480,
          maxWidth: 485,
          aspectRatio: '485/480',
          flexGrow: 1,
        }}
      >
        <PrimaryFeatured items={[props.secondary]} actionColor="warning" />
      </Box>
    </Box>
  );
};

export type FeaturedGamesProps = React.ComponentProps<typeof FeaturedGames>;
