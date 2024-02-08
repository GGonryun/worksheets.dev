import { Box } from '@mui/material';
import { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';

import { mockRaffles } from '../../data';
import { RaffleCarousel } from './raffle-carousel';

type Story = Meta<typeof RaffleCarousel>;
const Default: Story = {
  component: RaffleCarousel,
  args: {},
  decorators: [
    (Story) => (
      <StoryWallpaper>
        <Box p={4}>
          <Story />
        </Box>
      </StoryWallpaper>
    ),
  ],
};

export default Default;

export const Primary: Story = {
  args: {
    title: 'Hottest Raffles',
    items: mockRaffles,
  },
};
