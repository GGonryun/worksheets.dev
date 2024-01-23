import { Box } from '@mui/material';
import { Meta } from '@storybook/react';

import { GAME_CATEGORIES } from '../data/categories';
import { Categories } from './categories';

type Story = Meta<typeof Categories>;

export default {
  component: Categories,
  args: {},
  decorators: [
    (Story) => (
      <Box>
        <Story />
      </Box>
    ),
  ],
} as Story;

export const Primary: Story = {
  args: {
    categories: GAME_CATEGORIES,
  },
};
