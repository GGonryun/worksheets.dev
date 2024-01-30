import { Box, Container } from '@mui/material';
import { Categories } from '@worksheets/ui/components/categories';
import {
  GameIconProps,
  PaginatedGamesList,
} from '@worksheets/ui/components/games';
import {
  BasicCategoryInfo,
  BasicGameInfo,
  BasicPrizeDetails,
} from '@worksheets/util/types';

import { FeaturedGames, FeaturedGamesProps } from './featured-games';
import { GameSection } from './game-section';
import { HottestRaffles } from './hottest-raffles';

export const ArcadeScreen: React.FC<{
  categories: BasicCategoryInfo[];
  featured: FeaturedGamesProps;
  topRaffles: BasicPrizeDetails[];
  topGames: BasicGameInfo[];
  allGames: BasicGameInfo[];
  recentGames: BasicGameInfo[];
}> = (props) => (
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

      {props.topRaffles.length > 0 && (
        <HottestRaffles prizes={props.topRaffles} />
      )}

      {props.recentGames.length > 0 && (
        <GameSection
          title="Recently Played"
          games={props.recentGames.map(translateGames)}
        />
      )}

      <GameSection
        title="Top Games"
        games={props.topGames.map(translateGames)}
      />

      <PaginatedGamesList
        title="All Games"
        games={props.allGames.map(translateGames)}
      />
    </Container>
  </Box>
);

const translateGames = (game: BasicGameInfo): GameIconProps => ({
  id: game.id,
  imageUrl: game.image,
  name: game.name,
  caption: '',
});
