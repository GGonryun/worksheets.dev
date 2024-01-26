import { Box } from '@mui/material';
import { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';

import { mockPrizes } from '../../data';
import { TitledPrizeCarousel } from './titled-prize-carousel';

type Story = Meta<typeof TitledPrizeCarousel>;
const Default: Story = {
  component: TitledPrizeCarousel,
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
    items: mockPrizes,
  },
};
