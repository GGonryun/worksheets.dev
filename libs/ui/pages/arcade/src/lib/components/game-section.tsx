import { Box } from '@mui/material';
import {
  TitledSection,
  TitledSectionProps,
} from '@worksheets/ui/components/arcade';
import { GameIcon, GameIconProps } from '@worksheets/ui/components/games';
import { useMediaQuery } from '@worksheets/ui/hooks/use-media-query';
import React from 'react';

export const GameSection: React.FC<{
  games: GameIconProps[];
  title: string;
  action?: TitledSectionProps['action'];
}> = ({ games, title, action }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const isDesktop1 = useMediaQuery((theme) =>
    theme.breakpoints.down('desktop1')
  );
  const isMedium = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const isLarge = useMediaQuery((theme) => theme.breakpoints.down('xl'));

  if (isMobile) {
    games = games.slice(0, 6);
  } else if (isSmall) {
    games = games.slice(0, 6);
  } else if (isDesktop1) {
    games = games.slice(0, 4);
  } else if (isMedium) {
    games = games.slice(0, 5);
  } else if (isLarge) {
    games = games.slice(0, 6);
  } else {
    games = games.slice(0, 6);
  }

  return (
    <TitledSection title={title} action={action}>
      {games.map((game) => (
        <Box key={game.id}>
          <GameIcon {...game} />
        </Box>
      ))}
    </TitledSection>
  );
};
