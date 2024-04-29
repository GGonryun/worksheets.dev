import { NavigateNext } from '@mui/icons-material';
import { Box, Button, Container } from '@mui/material';
import { routes } from '@worksheets/routes';
import { BattlesCarousel } from '@worksheets/ui/components/battles';
import { Categories } from '@worksheets/ui/components/categories';
import {
  GameCarousel,
  GamesGroup,
  RandomGameButton,
} from '@worksheets/ui/components/games';
import { RaffleCarousel } from '@worksheets/ui/components/raffles';
import { useMediaQueryDown } from '@worksheets/ui/hooks/use-media-query';
import {
  BasicCategoryInfo,
  BasicGameInfo,
  BasicRaffleDetails,
  BattleSchema,
} from '@worksheets/util/types';

import { FeaturedGames, FeaturedGamesProps } from './featured-games';

export const ArcadeScreen: React.FC<{
  categories: BasicCategoryInfo[];
  featured: FeaturedGamesProps;
  topRaffles: BasicRaffleDetails[];
  topBattles: BattleSchema[];
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

        {props.topRaffles.length > 0 && (
          <RaffleCarousel
            items={props.topRaffles}
            title={'Active Raffles'}
            action={<AllRafflesButton />}
          />
        )}

        {props.topBattles.length > 0 && (
          <BattlesCarousel
            items={props.topBattles}
            title={'Boss Battles'}
            action={<AllBattlesButton />}
          />
        )}

        {props.recentGames.length > 0 && (
          <GameCarousel title="Recently Played" items={props.recentGames} />
        )}

        <GameCarousel title="Top Games" items={props.topGames} />

        <GameCarousel title="New Games" items={props.newGames} />

        <GamesGroup
          title="All Games"
          header={<RandomGameButton />}
          games={props.allGames}
        />
      </Container>
    </Box>
  );
};

const AllRafflesButton = () => {
  const isMobile = useMediaQueryDown('sm');

  return (
    <Button
      href={routes.raffles.path()}
      size={isMobile ? 'small' : 'medium'}
      variant="arcade"
      color="error"
      endIcon={isMobile ? undefined : <NavigateNext />}
    >
      All Raffles
    </Button>
  );
};

const AllBattlesButton = () => {
  const isMobile = useMediaQueryDown('sm');
  return (
    <Button
      href={routes.battles.path()}
      size={isMobile ? 'small' : 'medium'}
      variant="arcade"
      color="error"
      endIcon={isMobile ? undefined : <NavigateNext />}
    >
      All Battles
    </Button>
  );
};
