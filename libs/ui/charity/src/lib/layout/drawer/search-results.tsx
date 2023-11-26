import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { GamePill, GamePillProps } from '../../games/game-pill';
import { CategoryPill, CategoryPillProps } from '../../games/category-pill';

export type SearchResultsProps = {
  games: GamePillProps[];
  categories: CategoryPillProps[];
};

export const SearchResults: FC<SearchResultsProps> = ({
  games,
  categories,
}) => {
  // shuffle the games and categories
  // to simulate a random search result

  return (
    <Box
      display="grid"
      gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }}
      pt={1}
      overflow="auto"
      className="search-results"
    >
      {!games.length && !categories.length && <NoResults />}
      {games.map((game) => (
        <Box height={80} p={1} key={game.name}>
          <GamePill {...game} />
        </Box>
      ))}
      {categories.map((category) => (
        <Box height={80} p={1} key={category.name}>
          <CategoryPill key={category.id} {...category} />
        </Box>
      ))}
    </Box>
  );
};

export const NoResults: FC = () => {
  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <Typography
        sx={{
          fontSize: '1.4rem',
          fontWeight: 900,
          fontFamily: (theme) => theme.typography.mPlus1p.fontFamily,
        }}
      >
        We couldn't find anything.
      </Typography>
      <Typography
        sx={{
          fontSize: '0.8rem',
          color: (theme) => theme.palette.text.secondary,
          fontFamily: (theme) => theme.typography.mPlus1p.fontFamily,
        }}
      >
        Try searching for something else?
      </Typography>
    </Box>
  );
};
