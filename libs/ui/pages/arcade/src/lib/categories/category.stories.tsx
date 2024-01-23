import { Box } from '@mui/material';
import { Meta } from '@storybook/react';

import { Category } from './category';

type Story = Meta<typeof Category>;

export default {
  component: Category,
  args: {},
  decorators: [
    (Story) => (
      <Box p={{ xs: 2, sm: 4 }}>
        <Story />
      </Box>
    ),
  ],
} as Story;

export const WordGames: Story = {
  args: {
    href: '#',
    color: 'warning',
    text: 'Word\nGames',
    imageSrc: '/games/c/game.png',
  },
};

export const AllCategories: Story = {
  args: {
    href: '#',
    color: 'success',
    text: 'All\nCategories',
    imageSrc: '/games/c/game.png',
  },
};
