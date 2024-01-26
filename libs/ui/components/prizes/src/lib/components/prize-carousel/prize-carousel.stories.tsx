import { Box } from '@mui/material';
import { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';

import { mockPrizes } from '../../data';
import { PrizeCarousel } from './prize-carousel';

type Story = Meta<typeof PrizeCarousel>;
const Default: Story = {
  component: PrizeCarousel,
  args: {},
  decorators: [
    (Story) => (
      <StoryWallpaper>
        <Box p={8}>
          <Story />
        </Box>
      </StoryWallpaper>
    ),
  ],
};

export default Default;

export const Primary: Story = {
  args: {
    items: mockPrizes,
  },
};
