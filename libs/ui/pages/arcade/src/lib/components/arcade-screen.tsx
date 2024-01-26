import { Box, Container } from '@mui/material';
import { Categories } from '@worksheets/ui/components/categories';
import {
  GameIconProps,
  PaginatedGamesList,
} from '@worksheets/ui/components/games';
import { PrizeProps } from '@worksheets/ui/components/prizes';
import { BasicCategoryInfo, BasicGameInfo } from '@worksheets/util/types';

import { FeaturedGames, FeaturedGamesProps } from './featured-games';
import { HottestRaffles } from './hottest-raffles';
import { TopGames } from './top-games';

export const ArcadeScreen: React.FC<{
  categories: BasicCategoryInfo[];
  featured: FeaturedGamesProps;
  topRaffles: PrizeProps[];
  topGames: BasicGameInfo[];
  allGames: BasicGameInfo[];
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
      <HottestRaffles prizes={props.topRaffles} />
      <TopGames games={props.topGames.map(translateGames)} />
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
