import { Box } from '@mui/material';
import { TitledSection } from '@worksheets/ui/arcade';
import { GameIcon, GameProps } from '@worksheets/ui/games';
import { useMediaQuery } from '@worksheets/ui/hooks/use-media-query';
import React from 'react';

export const TopGames: React.FC<{ games: GameProps[] }> = ({ games }) => {
  const { isMobile, isDesktop1, isSmall, isMedium, isLarge } = useMediaQuery();

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
    <TitledSection
      title={'Top Games'}
      action={{
        color: 'success',
        text: 'Popular Games',
        href: '/tags/popular',
      }}
    >
      {games.map((game) => (
        <Box key={game.id}>
          <GameIcon {...game} />
        </Box>
      ))}
    </TitledSection>
  );
};
