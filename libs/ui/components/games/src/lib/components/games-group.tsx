import { Box } from '@mui/material';
import React from 'react';

import { GameIcon, GameIconProps } from './game-icon';

export const GamesGroup: React.FC<{ games: GameIconProps[]; size?: number }> = (
  props
) => (
  <Box
    gap={2}
    sx={{
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fill, minmax(${
        props.size ?? 108
      }px, 1fr))`,
      gridGap: (theme) => theme.spacing(3),
      justifyContent: 'center',
    }}
  >
    {props.games.map((g) => (
      <GameIcon key={g.id} {...g} />
    ))}
  </Box>
);
