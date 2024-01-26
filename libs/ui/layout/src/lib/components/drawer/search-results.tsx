import { YoutubeSearchedFor } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Category } from '@worksheets/ui/components/categories';
import { GameIcon } from '@worksheets/ui/components/games';
import { useMediaQuery } from '@worksheets/ui/hooks/use-media-query';
import { BasicCategoryInfo, BasicGameInfo } from '@worksheets/util/types';
import { FC } from 'react';

export type SearchResultsProps = {
  games: BasicGameInfo[];
  categories: BasicCategoryInfo[];
};

export const SearchResults: FC<SearchResultsProps> = ({
  games,
  categories,
}) => {
  return (
    <>
      <Typography
        display={games.length ? 'block' : 'none'}
        variant="h6"
        color="text.arcade"
        sx={{ mt: 2 }}
      >
        Games
      </Typography>
      {!games.length && !categories.length && <NoResults />}
      <Box display="flex" flexWrap="wrap" pt={1} gap={2}>
        {games.map((game) => (
          <Box width={92} minWidth={92} key={game.name}>
            <GameIcon
              id={game.id}
              name={game.name}
              caption={''}
              imageUrl={game.image}
            />
          </Box>
        ))}
      </Box>
      <Typography
        display={categories.length ? 'block' : 'none'}
        variant="h6"
        color="text.arcade"
        sx={{ mt: 2 }}
      >
        Categories
      </Typography>
      <Box display="flex" flexWrap="wrap" pt={1} gap={2}>
        {categories.map((category) => (
          <Box key={category.name}>
            <Category
              key={category.id}
              id={category.id}
              imageSrc={category.image}
              color="warning"
              text={category.name}
            />
          </Box>
        ))}
      </Box>
    </>
  );
};

export const NoResults: FC = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  return (
    <Box
      sx={{
        mt: 2,
        padding: 2,
        display: 'flex',
        gap: 2,
        alignItems: 'center',
        backgroundColor: (theme) => theme.palette.background.paper,
        borderRadius: (theme) => theme.shape.borderRadius,
      }}
    >
      <YoutubeSearchedFor sx={{ fontSize: '3.5rem' }} />
      <Box>
        <Typography variant={isMobile ? 'h6' : 'h4'}>No Results</Typography>
        <Typography
          variant={isMobile ? 'body3' : 'body1'}
          sx={{
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          Try searching for something else?
        </Typography>
      </Box>
    </Box>
  );
};
