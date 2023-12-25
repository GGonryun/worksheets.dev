import type { Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Drawer } from './drawer';
import { GameRecommendations } from './game-recommendations';
import { SearchResults } from './search-results';
import { Box } from '@mui/material';
import { sampleRecommendations } from '@worksheets/ui/mocks';
import { DrawerActions } from './drawer-actions';
import { RecentGamesSection } from '../recent-games-section';

const Story: Meta<typeof Drawer> = {
  component: Drawer,
  title: 'Layout/Drawer',
  decorators: [],
};
export default Story;

export const Empty = {
  args: {
    open: true,
  },
};

export const WithRecommendations = {
  args: {
    open: true,
    children: (
      <>
        <GameRecommendations recommendations={sampleRecommendations} />
        <RecentGamesSection recent={sampleRecommendations.popular} />
        <DrawerActions onRandomGame={action('onRandomGame')} />
      </>
    ),
  },
};

export const WithoutRecentGames = {
  args: {
    open: true,
    children: (
      <>
        <GameRecommendations recommendations={sampleRecommendations} />
        <RecentGamesSection recent={[]} />
        <DrawerActions onRandomGame={action('onRandomGame')} />
      </>
    ),
  },
};

export const WithEmptySearch = {
  args: {
    open: true,
    children: (
      <Box width="100%">
        <SearchResults games={[]} categories={[]} />
        <GameRecommendations
          recommendations={sampleRecommendations}
          hideCategories={true}
        />
        <RecentGamesSection recent={sampleRecommendations.popular} />
        <DrawerActions onRandomGame={action('onRandomGame')} />
      </Box>
    ),
  },
};

export const WithSuccessfulSearch = {
  args: {
    open: true,
    children: (
      <>
        <SearchResults
          games={[
            {
              href: '#',
              name: 'Game Name 1 Game Name 1 Game Name 1',
              developer: 'Developer Name',
              imageUrl: 'https://via.placeholder.com/150',
            },
            {
              href: '#',
              name: 'Game Name 2',
              developer: 'Developer Name',
              imageUrl: 'https://via.placeholder.com/150',
            },
            {
              href: '#',
              name: 'Game Name 3',
              developer: 'Developer Name',
              imageUrl: 'https://via.placeholder.com/150',
            },
            {
              href: '#',
              name: 'Game Name 4',
              developer: 'Developer Name',
              imageUrl: 'https://via.placeholder.com/150',
            },
          ]}
          categories={[
            {
              id: '1',
              href: '#',
              name: 'Category Name 1',
              imageUrl: 'https://via.placeholder.com/150',
            },
            {
              id: '2',
              href: '#',
              name: 'Category Name 2',
              imageUrl: 'https://via.placeholder.com/150',
            },
            {
              id: '3',
              href: '#',
              name: 'Category Name 3',
              imageUrl: 'https://via.placeholder.com/150',
            },
          ]}
        />
        <DrawerActions onRandomGame={action('onRandomGame')} />
      </>
    ),
  },
};
