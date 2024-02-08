import { Box } from '@mui/material';
import { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';

import { mockRaffles } from '../../data';
import { Raffle } from './raffle';

type Story = Meta<typeof Raffle>;
const Default: Story = {
  component: Raffle,
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
  args: mockRaffles[4],
  decorators: [
    (Story) => (
      <Box height={160} width={160} m={4}>
        <Story />
      </Box>
    ),
  ],
};
