import { Box, Paper } from '@mui/material';
import { Meta } from '@storybook/react';
import { StoryWallpaper } from '@worksheets/ui/components/wallpaper';
import { hoursFromNow } from '@worksheets/util/time';

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
    prizes: [],
  },
};

export const Primary: Story = {
  args: {
    prizes: Array.from({ length: 10 }, (_, i) => ({
      id: `${i}-prize`,
      name: `Prize ${i}`,
      imageUrl: 'https://via.placeholder.com/150',
      expires: hoursFromNow(5 * i).getTime(),
      type: 'steam-key',
    })),
  },
};
