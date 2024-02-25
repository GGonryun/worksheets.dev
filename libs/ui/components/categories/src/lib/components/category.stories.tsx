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
    id: '1',
    color: 'warning',
    text: 'Word\nGames',
    imageSrc: 'https://via.placeholder.com/150',
  },
};

export const AllCategories: Story = {
  args: {
    id: '1',
    color: 'success',
    text: 'All\nCategories',
    imageSrc: 'https://via.placeholder.com/150',
  },
};
