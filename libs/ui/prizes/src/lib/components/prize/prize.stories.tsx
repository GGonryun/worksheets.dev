import { Box } from '@mui/material';
import { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/wallpaper';

import { mockPrizes } from '../../data';
import { Prize } from './prize';

type Story = Meta<typeof Prize>;
const Default: Story = {
  component: Prize,
  args: {},
  decorators: [
    (Story) => (
      <StoryWallpaper>
        <Story />
      </StoryWallpaper>
    ),
  ],
};

export default Default;

export const Primary: Story = {
  args: mockPrizes[4],
  decorators: [
    (Story) => (
      <Box height={160} width={160} m={4}>
        <Story />
      </Box>
    ),
  ],
};
