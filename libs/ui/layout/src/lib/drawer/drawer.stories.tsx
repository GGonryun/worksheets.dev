import type { Meta } from '@storybook/react';
import { Drawer } from './drawer';
import { GameRecommendations } from './game-recommendations';
import { SearchResults } from './search-results';
import { Box } from '@mui/material';
import { sampleRecommendations } from '@worksheets/ui/mocks';

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
    children: <GameRecommendations recommendations={sampleRecommendations} />,
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
      </Box>
    ),
  },
};

export const WithSuccessfulSearch = {
  args: {
    open: true,
    children: (
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
    ),
  },
};
