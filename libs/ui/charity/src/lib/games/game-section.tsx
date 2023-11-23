import { Box } from '@mui/material';
import { FC, ReactNode } from 'react';
import { ItemCarousel } from '../layout/drawer/item-carousel';
import { GameSectionHeader } from '../typography/game-section-header/game-section-header';

export type GameSectionProps = { title: string; children: ReactNode };
export const GameSection: FC<GameSectionProps> = ({ title, children }) => (
  <Box mb={2}>
    <GameSectionHeader sx={{ userSelect: 'none' }}>{title}</GameSectionHeader>
    <ItemCarousel sx={{ gap: 2, px: 2 }}>{children}</ItemCarousel>
  </Box>
);
