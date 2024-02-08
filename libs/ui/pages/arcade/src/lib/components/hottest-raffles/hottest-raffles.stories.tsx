import { Box, Container } from '@mui/material';
import { Meta } from '@storybook/react';
import { mockRaffles } from '@worksheets/ui/components/raffles';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';

import { HottestRaffles } from './hottest-raffles';

type Story = Meta<typeof HottestRaffles>;

export default {
  component: HottestRaffles,
  args: {},
  decorators: [
    (Story) => (
      <StoryWallpaper>
        <Container component={Box} maxWidth="xl" py={2}>
          <Story />
        </Container>
      </StoryWallpaper>
    ),
  ],
} as Story;

export const Primary: Story = {
  args: {
    prizes: mockRaffles,
  },
};
