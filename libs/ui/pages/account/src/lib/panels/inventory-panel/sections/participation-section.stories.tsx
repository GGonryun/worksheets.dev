import { Box, Paper } from '@mui/material';
import { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';

import { mockEnteredRaffles } from '../../../mocks';
import { ParticipationSection } from './participation-section';

type Story = Meta<typeof ParticipationSection>;

export default {
  component: ParticipationSection,
  args: {},
  decorators: [
    (Story) => (
      <StoryWallpaper>
        <Paper component={Box} p={{ xs: 2, sm: 4 }}>
          <Story />
        </Paper>
      </StoryWallpaper>
    ),
  ],
} satisfies Story;

export const Empty: Story = {
  args: {
    raffles: [],
  },
};

export const Primary: Story = {
  args: {
    raffles: mockEnteredRaffles,
  },
};
