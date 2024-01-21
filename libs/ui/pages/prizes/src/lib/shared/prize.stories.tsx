import { Box } from '@mui/material';
import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import { StoryWallpaper, WebsiteBackground } from '@worksheets/ui/wallpaper';

import { mockPrizes } from '../__mock__/prizes';
import { Prize } from './prize';

type Story = Meta<typeof Prize>;
const Default: Story = {
  component: Prize,
  args: {},
};

export default Default;

export const Primary: Story = {
  args: mockPrizes[4],
  decorators: [
    (Story) => (
      <Box
        sx={{
          backgroundColor: 'red',
          height: 256,
          width: 256,
        }}
      >
        <Story />
      </Box>
    ),
  ],
};
