import { Box, Link } from '@mui/material';
import { FC, ReactNode } from 'react';
import { ItemCarousel } from '../layout/drawer/item-carousel';
import { GameSectionHeader } from '../typography/game-section-header/game-section-header';
import { ArrowUpRight } from '../icons/arrow-up-right';

export type GameSectionProps = {
  title: string;
  href?: string;
  children?: ReactNode;
};
export const GameSection: FC<GameSectionProps> = ({
  title,
  children,
  href,
}) => (
  <Box>
    <GameSectionHeader
      sx={{
        userSelect: 'none',
        display: 'flex',
        gap: 1,
        alignItems: 'center',
      }}
    >
      <Link underline="hover" color="inherit" href={href}>
        {title}
      </Link>
      <ArrowUpRight sx={{ fontSize: '2rem' }} />
    </GameSectionHeader>
    <ItemCarousel sx={{ gap: 2, px: 2 }}>{children}</ItemCarousel>
  </Box>
);
