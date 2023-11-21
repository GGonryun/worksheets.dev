import type { Meta } from '@storybook/react';
import { SearchResults } from './search-results';
import { Box, lighten } from '@mui/material';

const Story: Meta<typeof SearchResults> = {
  component: SearchResults,
  title: 'Layout/Drawer/SearchResults',
  decorators: [
    (Story) => (
      <Box
        sx={{
          padding: '1rem',
          backgroundColor: (theme) => lighten(theme.palette.error.light, 0.7),
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
    games: [
      {
        href: '#',
        name: 'Game Name 1',
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
    ],
    categories: [
      {
        href: '#',
        name: 'Category Name 1',
        imageUrl: 'https://via.placeholder.com/150',
      },
      {
        href: '#',
        name: 'Category Name 2',
        imageUrl: 'https://via.placeholder.com/150',
      },
      {
        href: '#',
        name: 'Category Name 3',
        imageUrl: 'https://via.placeholder.com/150',
      },
    ],
  },
};
