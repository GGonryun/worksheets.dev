import { Box } from '@mui/material';
import type { Meta } from '@storybook/react';

import { sampleCategories, sampleGames } from '../../data';
import { SearchResults } from './search-results';

const Story: Meta<typeof SearchResults> = {
  component: SearchResults,
  decorators: [
    (Story) => (
      <Box
        sx={{
          padding: '1rem',
          backgroundColor: (theme) => theme.palette.background['solid-blue'],
        }}
      >
        <Story />
      </Box>
    ),
  ],
};
export default Story;

export const Empty = {
  args: {
    games: [],
    categories: [],
  },
};

export const WithResults = {
  args: {
    games: sampleGames,
    categories: sampleCategories,
  },
};
