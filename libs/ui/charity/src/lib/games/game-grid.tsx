import { Box, useMediaQuery, useTheme } from '@mui/material';
import { FC } from 'react';
import { GameIcon, GameIconProps } from './game-icon';

type GameItem = Omit<GameIconProps, 'fill'> & {
  size?: number;
};

export type GameGridProps = {
  games: GameItem[];
};

export const GameGrid: FC<GameGridProps> = ({ games }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const clamp = (size?: number) => {
    if (!size) return 1;
    if (matches) return size;
    return Math.min(size, 2);
  };

  const itemSize = () => {
    if (matches) return '94px';
    return '80px';
  };

  return (
    <Box
      display="grid"
      gridTemplateColumns={`repeat(auto-fit, ${itemSize()})`}
      gridTemplateRows={`repeat(auto-fit, ${itemSize()})`}
      gridAutoFlow={'dense'}
      alignItems={'center'}
      justifyContent={'center'}
      gap={2}
    >
      {games.map((g, i) => (
        <Box
          key={g.id}
          gridColumn={`span ${clamp(g.size)}`}
          gridRow={`span ${clamp(g.size)}`}
        >
          <GameIcon key={g.id} fill {...g} />
        </Box>
      ))}
    </Box>
  );
};
