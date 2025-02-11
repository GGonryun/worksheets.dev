'use client';

import { NavigateNext } from '@mui/icons-material';
import { Box, Button, Container } from '@mui/material';
import { contestsRoutes } from '@worksheets/routes';
import { Categories } from '@worksheets/ui/components/categories';
import {
  GameCarousel,
  GamesGroup,
  RandomGameButton,
} from '@worksheets/ui/components/games';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { RaffleCarousel } from '@worksheets/ui/components/raffles';
import { useMediaQueryDown } from '@worksheets/ui/hooks/use-media-query';
import { useRecentlyPlayedGames } from '@worksheets/ui/hooks/use-recently-played-games';
import {
  BasicCategoryInfo,
  BasicGameInfo,
  BasicRaffleDetails,
} from '@worksheets/util/types';

import { FeaturedGames, FeaturedGamesProps } from './featured-games';

export type ArcadeScreenProps = {
  categories: BasicCategoryInfo[];
  featured: FeaturedGamesProps;
  topGames: BasicGameInfo[];
  newGames: BasicGameInfo[];
  allGames: BasicGameInfo[];
  topRaffles: BasicRaffleDetails[];
};

export const ArcadeScreen: React.FC<ArcadeScreenProps> = (props) => {
  const isMobile = useMediaQueryDown('sm');
  const { recentlyPlayed } = useRecentlyPlayedGames();

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

        {props.topRaffles && (
          <RaffleCarousel
            items={props.topRaffles}
            placeholder={<LoadingBar />}
            title={'Active Raffles'}
            action={
              <Button
                href={contestsRoutes.raffles.url()}
                size={isMobile ? 'small' : 'medium'}
                variant="arcade"
                color="error"
                endIcon={isMobile ? undefined : <NavigateNext />}
              >
                All Raffles
              </Button>
            }
          />
        )}

        {recentlyPlayed.length > 0 && (
          <GameCarousel title="Recently Played" items={recentlyPlayed} />
        )}

        <GameCarousel title="Top Games" items={props.topGames} />

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
