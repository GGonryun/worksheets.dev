import { Box } from '@mui/material';
import type { Meta } from '@storybook/react';

import {
  sampleCategories,
  sampleGames,
  sampleRecommendations,
} from '../../data';
import { Actions } from './actions';
import { Drawer } from './drawer';
import { GameRecommendations } from './game-recommendations';
import { SearchResults } from './search-results';

const Story: Meta<typeof Drawer> = {
  component: Drawer,
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
        <Actions />
      </>
    ),
  },
};

export const WithoutRecentGames = {
  args: {
    open: true,
    children: (
      <>
        <GameRecommendations
          recommendations={{ ...sampleRecommendations, recent: [] }}
        />
        <Actions />
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
        <Actions />
      </Box>
    ),
  },
};

export const WithSuccessfulSearch = {
  args: {
    open: true,
    children: (
      <>
        <SearchResults games={sampleGames} categories={sampleCategories} />
        <Actions />
      </>
    ),
  },
};
