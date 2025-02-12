import { Box, Container } from '@mui/material';
import { Categories } from '@worksheets/ui/components/categories';
import {
  GameCarousel,
  GamesGroup,
  RandomGameButton,
} from '@worksheets/ui/components/games';
import { BasicCategoryInfo, BasicGameInfo } from '@worksheets/util/types';
import { ReactNode } from 'react';

import { FeaturedGames, FeaturedGamesProps } from './featured-games';

export const ArcadeScreen: React.FC<{
  categories: BasicCategoryInfo[];
  featured: FeaturedGamesProps;
  topRaffles: ReactNode;
  topGames: BasicGameInfo[];
  newGames: BasicGameInfo[];
  allGames: BasicGameInfo[];
  recentGames: Omit<BasicGameInfo, 'cover'>[];
}> = (props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 2, sm: 4 },
        my: { xs: 2, sm: 4 },
      }}
    >
      <Categories
        categories={props.categories.map((c) => ({
          color: 'warning',
          text: c.name,
          id: c.id,
          imageSrc: c.image,
        }))}
        sx={{
          px: '24px',
        }}
      />
      <Container
        maxWidth="xl"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <FeaturedGames {...props.featured} />

        {props.topRaffles}

        {props.recentGames.length > 0 && (
          <GameCarousel title="Recently Played" items={props.recentGames} />
        )}

        <GameCarousel title="Best Games" items={props.topGames} />

        <GameCarousel title="Newest Games" items={props.newGames} />

        <GamesGroup
          title="All Games"
          header={<RandomGameButton />}
          games={props.allGames}
        />
      </Container>
    </Box>
  );
};
