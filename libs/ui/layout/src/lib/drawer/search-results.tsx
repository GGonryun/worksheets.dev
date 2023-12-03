import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  CategoryPill,
  CategoryPillProps,
  GamePill,
  GamePillProps,
} from '@worksheets/ui/pills';
import { FC } from 'react';

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
    <>
      {!games.length && !categories.length && <NoResults />}
      <Box
        display="grid"
        gridTemplateColumns={{ xs: '100%', sm: '50% 50%' }}
        pt={1}
        overflow="auto"
        className="search-results"
      >
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
    </>
  );
};

export const NoResults: FC = () => {
  return (
    <Box
      sx={{
        my: 2,
        padding: 2,
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <Typography variant="h4">We couldn't find anything</Typography>
      <Typography
        variant="body3"
        sx={{
          color: (theme) => theme.palette.text.secondary,
        }}
      >
        Try searching for something else?
      </Typography>
    </Box>
  );
};
