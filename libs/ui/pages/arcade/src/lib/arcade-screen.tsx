import { Box, Container } from '@mui/material';
import { GameProps } from '@worksheets/ui/games';
import { PrizeProps } from '@worksheets/ui/prizes';

import { AllGames } from './all-games';
import { CategoryProps } from './categories';
import { Categories } from './categories/categories';
import { FeaturedGames, FeaturedGamesProps } from './featured-games';
import { HottestRaffles } from './hottest-raffles';
import { TopGames } from './top-games';

export const ArcadeScreen: React.FC<{
  categories: CategoryProps[];
  featured: FeaturedGamesProps;
  topRaffles: PrizeProps[];
  topGames: GameProps[];
  allGames: GameProps[];
}> = (props) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: { xs: 2, sm: 4 },
      my: { xs: 2, sm: 4 },
    }}
  >
    <Categories categories={props.categories} />
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
      <TopGames games={props.topGames} />
      <AllGames games={props.allGames} />
    </Container>
  </Box>
);
